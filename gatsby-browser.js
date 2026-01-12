// Gatsby browser APIs
import { initPerformanceOptimizations } from './src/utils/performance';
import logger from './src/utils/logger';

// Initialize performance optimizations when the app loads
export const onClientEntry = () => {
  logger.info('Client app initialized');

  // Initialize performance optimizations
  if (typeof window !== 'undefined') {
    initPerformanceOptimizations();
  }
};

// Track route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  logger.debug('Route changed', {
    from: prevLocation?.pathname,
    to: location.pathname,
  });
};
