'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface SkipLinkProps extends BaseComponentProps {
  /** Text to use within the skip link component */
  text?: string;
  /** The value of the skip link's href attribute */
  href?: string;
  /** Additional CSS classes for the skip link */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const SkipLinkElement = styled.a`
  position: absolute;
  z-index: 1000;
  left: ${({ theme }) => theme.spacing[3]};
  top: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.colors.focus};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 2px solid ${({ theme }) => theme.colors.text};
  
  /* Hide by default - only visible when focused */
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  
  &:focus {
    /* Make visible when focused */
    clip: auto;
    clip-path: none;
    height: auto;
    overflow: visible;
    position: absolute;
    white-space: normal;
    width: auto;
    
    /* Ensure high visibility */
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.focusHover || theme.colors.focus};
    text-decoration: underline;
  }
  
  /* Respect safe area for devices with notches */
  @supports (left: max(0px)) {
    left: max(${({ theme }) => theme.spacing[3]}, env(safe-area-inset-left));
  }
`;

/**
 * Skip Link Component
 * 
 * A hidden link that becomes visible when focused, allowing keyboard users to skip 
 * directly to the main content. This is essential for accessibility and follows
 * WCAG guidelines for keyboard navigation.
 * 
 * @example
 * ```tsx
 * // Basic skip link (defaults to #maincontent)
 * <SkipLink />
 * 
 * // Custom skip link
 * <SkipLink 
 *   href="#main-content"
 *   text="Skip to main content"
 * />
 * 
 * // Skip to specific section
 * <SkipLink 
 *   href="#search-results"
 *   text="Skip to search results"
 * />
 * ```
 */
export const SkipLink: React.FC<SkipLinkProps> = ({
  text = 'Skip to main content',
  href = '#maincontent',
  classes,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  useEffect(() => {
    // Handle skip link activation
    const handleSkipLinkClick = (event: Event) => {
      const target = event.target as HTMLAnchorElement;
      const targetId = target.getAttribute('href');
      
      if (targetId?.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Set focus on the target element for screen reader users
          // Remove any existing focus styles that might be distracting
          (targetElement as HTMLElement).focus();
          
          // Add class to target element to handle focus styling
          targetElement.classList.add('nhsuk-skip-link-focused-element');
          
          // Remove the class after a short delay
          setTimeout(() => {
            targetElement.classList.remove('nhsuk-skip-link-focused-element');
          }, 100);
        }
      }
    };

    // Add click handler to all skip links
    const skipLinks = document.querySelectorAll('.nhsuk-skip-link');
    skipLinks.forEach(link => {
      link.addEventListener('click', handleSkipLinkClick);
    });

    // Cleanup
    return () => {
      skipLinks.forEach(link => {
        link.removeEventListener('click', handleSkipLinkClick);
      });
    };
  }, []);

  const skipLinkClasses = [
    'nhsuk-skip-link',
    classes
  ].filter(Boolean).join(' ');

  return (
    <SkipLinkElement
      href={href}
      className={`${skipLinkClasses}${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      data-module="nhsuk-skip-link"
      {...attributes}
      {...rest}
    >
      {text}
    </SkipLinkElement>
  );
};

SkipLink.displayName = 'SkipLink';