'use client';

import React from 'react';
import type { CardProps } from '@/types';
import { cn } from '@/lib/utils';

/**
 * Card Component
 * Base card with optional subcomponents (Header, Body, Footer)
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children }, ref) => {
    const baseStyles = 'rounded-lg border shadow-base transition-shadow duration-slow';

    const variantStyles = {
      default: 'bg-white border-grey-light hover:shadow-md',
      elevated: 'bg-white border-transparent shadow-md hover:shadow-lg',
      outlined: 'bg-white border-2 border-brand-navy',
    };

    const cardClasses = cn(baseStyles, variantStyles[variant], className);

    return (
      <div ref={ref} className={cardClasses}>
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

/**
 * Card Header Subcomponent
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className, children }, ref) => (
  <div ref={ref} className={cn('px-6 py-4 border-b border-grey-300', className)}>
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

/**
 * Card Body Subcomponent
 */
export const CardBody = React.forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className, children }, ref) => (
  <div ref={ref} className={cn('px-6 py-6', className)}>
    {children}
  </div>
));

CardBody.displayName = 'CardBody';

/**
 * Card Footer Subcomponent
 */
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 py-4 border-t border-grey-300 bg-grey-50', className)}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

export default Card;
