import { Link, LinkProps } from 'react-router-dom';
import { useLinkPrefetch } from '@/hooks/use-route-prefetch';

interface PrefetchLinkProps extends LinkProps {
  prefetch?: boolean;
}

/**
 * Enhanced Link component with intelligent prefetching
 * Automatically prefetches route chunks on hover
 */
export const PrefetchLink = ({ 
  to, 
  prefetch = true, 
  children, 
  ...props 
}: PrefetchLinkProps) => {
  const route = typeof to === 'string' ? to : to.pathname || '';
  const { handleMouseEnter, handleMouseLeave } = useLinkPrefetch(route);

  return (
    <Link
      to={to}
      onMouseEnter={prefetch ? handleMouseEnter : undefined}
      onMouseLeave={prefetch ? handleMouseLeave : undefined}
      onFocus={prefetch ? handleMouseEnter : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};
