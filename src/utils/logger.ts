/**
 * Error logging utility
 * Provides structured logging for errors, warnings, and info messages
 */

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  error?: Error;
  userAgent?: string;
  url?: string;
}

class Logger {
  private isDevelopment: boolean;
  private logBuffer: LogEntry[] = [];
  private maxBufferSize: number = 100;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  /**
   * Logs an error message
   */
  error(message: string, error?: Error, context?: Record<string, any>): void {
    this.log(LogLevel.ERROR, message, error, context);
  }

  /**
   * Logs a warning message
   */
  warn(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, undefined, context);
  }

  /**
   * Logs an info message
   */
  info(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, undefined, context);
  }

  /**
   * Logs a debug message (only in development)
   */
  debug(message: string, context?: Record<string, any>): void {
    if (this.isDevelopment) {
      this.log(LogLevel.DEBUG, message, undefined, context);
    }
  }

  /**
   * Core logging function
   */
  private log(
    level: LogLevel,
    message: string,
    error?: Error,
    context?: Record<string, any>
  ): void {
    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error: error ? this.serializeError(error) : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    // Add to buffer
    this.logBuffer.push(logEntry);
    if (this.logBuffer.length > this.maxBufferSize) {
      this.logBuffer.shift(); // Remove oldest entry
    }

    // Console output
    this.consoleLog(logEntry);

    // Send to external service (optional)
    if (level === LogLevel.ERROR && !this.isDevelopment) {
      this.sendToExternalService(logEntry);
    }
  }

  /**
   * Outputs log to console with appropriate styling
   */
  private consoleLog(entry: LogEntry): void {
    const { level, message, timestamp, context, error } = entry;

    const styles: Record<LogLevel, string> = {
      [LogLevel.ERROR]: 'color: #ff4444; font-weight: bold',
      [LogLevel.WARN]: 'color: #ffaa00; font-weight: bold',
      [LogLevel.INFO]: 'color: #00aaff',
      [LogLevel.DEBUG]: 'color: #888888',
    };

    if (typeof window !== 'undefined') {
      console.log(
        `%c[${level.toUpperCase()}] ${timestamp}`,
        styles[level],
        message
      );

      if (context) {
        console.log('Context:', context);
      }

      if (error) {
        console.error('Error:', error);
      }
    }
  }

  /**
   * Serializes error object for JSON transmission
   */
  private serializeError(error: Error): any {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  /**
   * Sends error to external logging service
   * In production, integrate with Sentry, LogRocket, or custom endpoint
   */
  private async sendToExternalService(entry: LogEntry): Promise<void> {
    try {
      // Option 1: Send to Netlify Function for logging
      // await fetch('/.netlify/functions/log', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(entry),
      // });

      // Option 2: Send to Sentry (if configured)
      // if (window.Sentry) {
      //   window.Sentry.captureException(entry.error, {
      //     level: entry.level,
      //     extra: entry.context,
      //   });
      // }

      // Option 3: Send to custom logging endpoint
      const logEndpoint = process.env.GATSBY_LOG_ENDPOINT;
      if (logEndpoint) {
        await fetch(logEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
          // Use keepalive to ensure logs are sent even during page unload
          keepalive: true,
        }).catch(() => {
          // Silently fail - don't want logging errors to break the app
        });
      }
    } catch (err) {
      // Silently fail - logging errors shouldn't break the app
      console.error('Failed to send log to external service', err);
    }
  }

  /**
   * Gets recent logs from buffer
   */
  getRecentLogs(count: number = 10): LogEntry[] {
    return this.logBuffer.slice(-count);
  }

  /**
   * Clears the log buffer
   */
  clearLogs(): void {
    this.logBuffer = [];
  }

  /**
   * Exports logs as JSON string
   */
  exportLogs(): string {
    return JSON.stringify(this.logBuffer, null, 2);
  }
}

// Singleton instance
const logger = new Logger();

// Global error handlers
if (typeof window !== 'undefined') {
  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logger.error(
      'Unhandled Promise Rejection',
      new Error(event.reason),
      {
        promise: event.promise,
      }
    );
  });

  // Catch global errors
  window.addEventListener('error', (event) => {
    logger.error(
      'Global Error',
      event.error || new Error(event.message),
      {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      }
    );
  });
}

export default logger;

// Convenience exports
export const logError = logger.error.bind(logger);
export const logWarn = logger.warn.bind(logger);
export const logInfo = logger.info.bind(logger);
export const logDebug = logger.debug.bind(logger);
