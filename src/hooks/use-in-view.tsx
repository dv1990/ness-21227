/**
 * @deprecated This hook has been consolidated into use-intersection-observer
 * Please migrate to: import { useIntersectionWithRef } from '@/hooks/use-intersection-observer'
 * 
 * This file is kept for backward compatibility only.
 */

import { useIntersectionWithRef } from './use-intersection-observer';

export const useInView = useIntersectionWithRef;
