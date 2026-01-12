/**
 * Performance optimization utilities
 * Includes lazy loading, prefetching, and resource hints
 */

import logger from './logger';

/**
 * Prefetch a URL resource
 * Tells the browser to fetch the resource in advance
 */
export const prefetchResource = (url: string, type: 'document' | 'script' | 'style' | 'font' | 'fetch' = 'fetch'): void => {
  if (typeof window === 'undefined') return;

  // Check if already prefetched
  const existing = document.querySelector(`link[rel="prefetch"][href="${url}"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  link.as = type;

  document.head.appendChild(link);

  logger.debug('Prefetched resource', { url, type });
};

/**
 * Preconnect to a domain
 * Establishes early connection to improve performance
 */
export const preconnect = (url: string, crossOrigin?: boolean): void => {
  if (typeof window === 'undefined') return;

  // Check if already exists
  const existing = document.querySelector(`link[rel="preconnect"][href="${url}"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = url;

  if (crossOrigin) {
    link.crossOrigin = 'anonymous';
  }

  document.head.appendChild(link);

  logger.debug('Preconnected to domain', { url });
};

/**
 * DNS prefetch for external domains
 */
export const dnsPrefetch = (url: string): void => {
  if (typeof window === 'undefined') return;

  const existing = document.querySelector(`link[rel="dns-prefetch"][href="${url}"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = url;

  document.head.appendChild(link);

  logger.debug('DNS prefetched', { url });
};

/**
 * Lazy load images with IntersectionObserver
 */
export const setupLazyImages = (): void => {
  if (typeof window === 'undefined') return;

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;

            if (src) {
              img.src = src;
              img.classList.add('loaded');
              observer.unobserve(img);

              logger.debug('Lazy loaded image', { src });
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll('img[data-src]').forEach((img) => {
      const element = img as HTMLImageElement;
      const src = element.dataset.src;
      if (src) {
        element.src = src;
      }
    });
  }
};

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Measure and log page performance metrics
 */
export const logPerformanceMetrics = (): void => {
  if (typeof window === 'undefined') return;

  // Wait for page load
  if (document.readyState === 'complete') {
    measureMetrics();
  } else {
    window.addEventListener('load', measureMetrics);
  }
};

function measureMetrics(): void {
  if ('performance' in window && 'getEntriesByType' in window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    if (navigation) {
      const metrics = {
        // Time to First Byte
        ttfb: navigation.responseStart - navigation.requestStart,

        // DOM Content Loaded
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,

        // Page Load Time
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,

        // Full Page Load
        fullLoadTime: navigation.loadEventEnd - navigation.fetchStart,

        // DNS Lookup
        dnsTime: navigation.domainLookupEnd - navigation.domainLookupStart,

        // TCP Connection
        tcpTime: navigation.connectEnd - navigation.connectStart,

        // Request Time
        requestTime: navigation.responseEnd - navigation.requestStart,

        // Response Time
        responseTime: navigation.responseEnd - navigation.responseStart,

        // DOM Processing
        domProcessing: navigation.domComplete - navigation.domInteractive,
      };

      logger.info('Performance Metrics', metrics);

      // Log slow metrics
      if (metrics.ttfb > 600) {
        logger.warn('Slow TTFB detected', { ttfb: metrics.ttfb });
      }

      if (metrics.fullLoadTime > 3000) {
        logger.warn('Slow page load detected', { loadTime: metrics.fullLoadTime });
      }
    }
  }

  // Web Vitals (if available)
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        logger.info('LCP (Largest Contentful Paint)', {
          value: lastEntry.startTime,
          element: (lastEntry as any).element,
        });

        if (lastEntry.startTime > 2500) {
          logger.warn('Poor LCP detected', { lcp: lastEntry.startTime });
        }
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP not supported
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          const fid = (entry as any).processingStart - entry.startTime;

          logger.info('FID (First Input Delay)', { value: fid });

          if (fid > 100) {
            logger.warn('Poor FID detected', { fid });
          }
        });
      });

      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // FID not supported
    }
  }
}

/**
 * Optimize resource loading based on connection speed
 */
export const adaptToConnection = (): 'slow' | 'fast' | 'unknown' => {
  if (typeof window === 'undefined' || !('connection' in navigator)) {
    return 'unknown';
  }

  const connection = (navigator as any).connection;

  if (!connection) return 'unknown';

  // Check if user has data saver enabled
  if (connection.saveData) {
    logger.info('Data saver detected - using low bandwidth mode');
    return 'slow';
  }

  // Check effective connection type
  const effectiveType = connection.effectiveType;

  if (effectiveType === '4g') {
    return 'fast';
  } else if (effectiveType === '3g' || effectiveType === '2g' || effectiveType === 'slow-2g') {
    logger.info('Slow connection detected', { effectiveType });
    return 'slow';
  }

  return 'unknown';
};

/**
 * Request idle callback wrapper with fallback
 */
export const requestIdleCallback = (callback: () => void, timeout: number = 2000): void => {
  if (typeof window === 'undefined') return;

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout });
  } else {
    // Fallback to setTimeout
    setTimeout(callback, 1);
  }
};

/**
 * Prefetch pages for faster navigation
 */
export const prefetchPage = (pathname: string): void => {
  if (typeof window === 'undefined') return;

  // For Gatsby, use the __gatsby global
  if ((window as any).___loader && (window as any).___loader.enqueue) {
    (window as any).___loader.enqueue(pathname);
    logger.debug('Prefetched page', { pathname });
  }
};

/**
 * Setup hover prefetch for links
 */
export const setupHoverPrefetch = (): void => {
  if (typeof window === 'undefined') return;

  const prefetchOnHover = debounce((href: string) => {
    prefetchPage(href);
  }, 100);

  // Prefetch internal links on hover
  document.addEventListener('mouseover', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a');

    if (link && link.href && link.origin === window.location.origin) {
      const pathname = new URL(link.href).pathname;
      prefetchOnHover(pathname);
    }
  });
};

/**
 * Initialize all performance optimizations
 */
export const initPerformanceOptimizations = (): void => {
  if (typeof window === 'undefined') return;

  // Setup lazy image loading
  requestIdleCallback(() => {
    setupLazyImages();
  });

  // Setup hover prefetch
  requestIdleCallback(() => {
    setupHoverPrefetch();
  });

  // Log performance metrics
  logPerformanceMetrics();

  // Preconnect to common external domains
  const externalDomains = [
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
  ];

  externalDomains.forEach((domain) => {
    dnsPrefetch(domain);
  });

  logger.info('Performance optimizations initialized');
};
