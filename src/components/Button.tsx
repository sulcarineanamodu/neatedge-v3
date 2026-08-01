'use client';

import React from 'react';
import type { ButtonProps } from '@/types';
import { cn } from '@/lib/utils';

/**
 * Button Component
 * Supports 3 variants (primary, secondary, ghost) and 3 sizes (sm, md, lg)
 * Fully accessible with keyboard navigation and focus indicators
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      type = 'button',
      onClick,
      children,
      className,
      ariaLabel,
    },
    ref,
  ) => {
    // Base styles
    const baseStyles = 'font-semibold rounded-base transition-all duration-standard';

    // Variant styles
    const variantStyles = {
      primary: 'bg-brand-navy text-white hover:bg-brand-midnight active:bg-brand-navy disabled:bg-grey-light disabled:text-grey-600',
      secondary: 'bg-grey-light border border-grey-300 text-brand-navy hover:bg-grey-300 active:bg-grey-400 disabled:bg-grey-100 disabled:text-grey-500',
      ghost: 'border-2 border-brand-navy text-brand-navy hover:bg-grey-light active:bg-grey-300 disabled:border-grey-300 disabled:text-grey-500',
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-5 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    };

    // Disabled state
    const disabledStyles = disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer';

    // Combine all styles
    const buttonClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      disabledStyles,
      className,
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={buttonClasses}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
