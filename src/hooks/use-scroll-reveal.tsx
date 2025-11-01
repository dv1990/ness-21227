/**
 * @deprecated This hook has been consolidated into use-intersection-observer
 * Please migrate to: import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
 * 
 * This file is kept for backward compatibility only.
 */

import { useIntersectionObserver } from './use-intersection-observer';

export const useScrollReveal = (options?: any) => {
  const { ref, isIntersecting } = useIntersectionObserver(options);
  // Map to old property name for backwards compatibility
  return { ref, isVisible: isIntersecting };
};
