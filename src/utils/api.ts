import logger from './logger';

/**
 * API utilities with retry logic and error handling
 */

export interface RetryConfig {
  maxRetries: number;
  baseDelay: number; // milliseconds
  maxDelay: number; // milliseconds
  shouldRetry?: (error: any, attempt: number) => boolean;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  shouldRetry: (error: any, attempt: number) => {
    // Retry on network errors or 5xx status codes
    if (!error.response) return true; // Network error
    const status = error.response?.status;
    return status >= 500 && status < 600;
  },
};

/**
 * Delays execution for specified milliseconds
 */
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Calculates exponential backoff delay with jitter
 */
const calculateDelay = (attempt: number, config: RetryConfig): number => {
  // Exponential backoff: baseDelay * 2^attempt
  const exponentialDelay = config.baseDelay * Math.pow(2, attempt);

  // Add jitter (±25% random variance)
  const jitter = exponentialDelay * 0.25 * (Math.random() * 2 - 1);
  const delayWithJitter = exponentialDelay + jitter;

  // Cap at maxDelay
  return Math.min(delayWithJitter, config.maxDelay);
};

/**
 * Fetch with retry logic
 */
export async function fetchWithRetry<T = any>(
  url: string,
  options: RequestInit = {},
  retryConfig: Partial<RetryConfig> = {}
): Promise<Response> {
  const config: RetryConfig = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
  let lastError: any;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      logger.debug(`API Request (attempt ${attempt + 1}/${config.maxRetries + 1})`, {
        url,
        method: options.method || 'GET',
      });

      const response = await fetch(url, options);

      // Check if we should retry based on status code
      if (!response.ok) {
        const error = {
          response: {
            status: response.status,
            statusText: response.statusText,
          },
          message: `HTTP ${response.status}: ${response.statusText}`,
        };

        // Don't retry client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          logger.warn('API Client Error', {
            url,
            status: response.status,
            statusText: response.statusText,
          });
          return response; // Return the error response for client errors
        }

        // Check if we should retry
        if (
          attempt < config.maxRetries &&
          config.shouldRetry &&
          config.shouldRetry(error, attempt)
        ) {
          lastError = error;
          const delayMs = calculateDelay(attempt, config);

          logger.warn(`API request failed, retrying in ${delayMs}ms`, {
            url,
            attempt: attempt + 1,
            maxRetries: config.maxRetries,
            error: error.message,
          });

          await delay(delayMs);
          continue;
        }

        return response; // Return the error response
      }

      // Success
      logger.debug('API Request successful', { url, status: response.status });
      return response;
    } catch (error: any) {
      lastError = error;

      // Check if we should retry
      if (
        attempt < config.maxRetries &&
        config.shouldRetry &&
        config.shouldRetry({ response: null, message: error.message }, attempt)
      ) {
        const delayMs = calculateDelay(attempt, config);

        logger.warn(`API request failed with network error, retrying in ${delayMs}ms`, {
          url,
          attempt: attempt + 1,
          maxRetries: config.maxRetries,
          error: error.message,
        });

        await delay(delayMs);
        continue;
      }

      // Max retries reached or shouldn't retry
      logger.error('API request failed after retries', error, {
        url,
        attempts: attempt + 1,
      });

      throw error;
    }
  }

  // Should never reach here, but just in case
  logger.error('API request failed after all retries', lastError, {
    url,
    maxRetries: config.maxRetries,
  });

  throw lastError || new Error('Request failed after maximum retries');
}

/**
 * Wrapper for POST requests with retry
 */
export async function postWithRetry<T = any>(
  url: string,
  data: any,
  options: RequestInit = {},
  retryConfig?: Partial<RetryConfig>
): Promise<Response> {
  return fetchWithRetry(
    url,
    {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
    },
    retryConfig
  );
}

/**
 * Wrapper for GET requests with retry
 */
export async function getWithRetry<T = any>(
  url: string,
  options: RequestInit = {},
  retryConfig?: Partial<RetryConfig>
): Promise<Response> {
  return fetchWithRetry(
    url,
    {
      ...options,
      method: 'GET',
    },
    retryConfig
  );
}

/**
 * Circuit breaker pattern for API calls
 * Prevents overwhelming failing services
 */
class CircuitBreaker {
  private failures: number = 0;
  private lastFailureTime: number = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(
    private threshold: number = 5,
    private timeout: number = 60000 // 1 minute
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      const now = Date.now();
      if (now - this.lastFailureTime > this.timeout) {
        logger.info('Circuit breaker: transitioning to half-open');
        this.state = 'half-open';
      } else {
        const error = new Error('Circuit breaker is open');
        logger.warn('Circuit breaker prevented API call', {
          failures: this.failures,
          timeUntilRetry: this.timeout - (now - this.lastFailureTime),
        });
        throw error;
      }
    }

    try {
      const result = await fn();

      // Success - reset if half-open
      if (this.state === 'half-open') {
        logger.info('Circuit breaker: successful call in half-open state, closing');
        this.state = 'closed';
        this.failures = 0;
      }

      return result;
    } catch (error) {
      this.failures++;
      this.lastFailureTime = Date.now();

      if (this.failures >= this.threshold) {
        logger.error('Circuit breaker: threshold reached, opening circuit', error as Error, {
          failures: this.failures,
          threshold: this.threshold,
        });
        this.state = 'open';
      }

      throw error;
    }
  }

  reset(): void {
    this.failures = 0;
    this.state = 'closed';
    logger.info('Circuit breaker: manually reset');
  }

  getState(): string {
    return this.state;
  }
}

// Export circuit breaker for contact form API
export const contactApiCircuitBreaker = new CircuitBreaker(5, 60000);

/**
 * Request timeout wrapper
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string = 'Request timeout'
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => {
        const error = new Error(errorMessage);
        logger.error('Request timeout', error, { timeoutMs });
        reject(error);
      }, timeoutMs);
    }),
  ]);
}

/**
 * Batch multiple requests with concurrency limit
 */
export async function batchRequests<T>(
  requests: (() => Promise<T>)[],
  concurrency: number = 3
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const request of requests) {
    const p = request().then((result) => {
      results.push(result);
      executing.splice(executing.indexOf(p), 1);
    });

    executing.push(p);

    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);
  return results;
}
