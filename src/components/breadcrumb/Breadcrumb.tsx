'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface BreadcrumbItem {
  /** Text to display for the breadcrumb item */
  text: string;
  /** URL for the breadcrumb link */
  href?: string;
  /** Additional attributes for the item */
  attributes?: Record<string, string>;
}

export interface BreadcrumbProps extends BaseComponentProps {
  /** Array of breadcrumb items (excluding the current page) */
  items: BreadcrumbItem[];
  /** Text for the current page */
  text?: string;
  /** URL for the current page */
  href?: string;
  /** Accessible label for the breadcrumb navigation */
  labelText?: string;
  /** Whether to use reverse styling for dark backgrounds */
  reverse?: boolean;
}

const Nav = styled.nav<{ $reverse?: boolean }>`
  padding-top: ${({ theme }) => theme.spacing[3]};

  ${({ theme }) => theme.media.md} {
    padding-top: ${({ theme }) => theme.spacing[4]};
  }

  @media print {
    display: none;
  }

  ${({ $reverse, theme }) => $reverse && `
    .breadcrumb-link {
      color: white;
      
      &:link,
      &:visited,
      &:hover {
        color: white;
      }
      
      &:focus {
        color: ${theme.colors.black};
      }
    }
    
    .breadcrumb-item:not(:last-child)::after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23aeb7bd' height='18' width='18' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z'%3E%3C/path%3E%3C/svg%3E") !important;
    }
    
    .breadcrumb-backlink {
      color: white;
      
      &:link,
      &:visited,
      &:hover {
        color: white;
      }
      
      &:focus {
        color: ${theme.colors.black};
      }
      
      &::before {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' height='24' width='24' viewBox='8 0 24 24'%3E%3Cpath d='M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z'%3E%3C/path%3E%3C/svg%3E") !important;
      }
      
      &:focus::before {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23212b32' height='24' width='24' viewBox='8 0 24 24'%3E%3Cpath d='M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z'%3E%3C/path%3E%3C/svg%3E") !important;
      }
    }
  `}
`;

const BreadcrumbList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  ${({ theme }) => theme.media.md} {
    display: block;
  }

  display: none;
`;

const BreadcrumbItem = styled.li.attrs({
  className: 'breadcrumb-item',
})`
  display: inline-block;
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  &:not(:last-child)::after {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23768692' height='18' width='18' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z'%3E%3C/path%3E%3C/svg%3E") no-repeat 0 0;
    content: "";
    display: inline-block;
    height: 19px;
    margin-left: 9px;
    margin-right: 2px;
    vertical-align: middle;
    width: 18px;
  }
`;

const BreadcrumbLink = styled.a.attrs({
  className: 'breadcrumb-link',
})`
  color: ${({ theme }) => theme.semanticColors.interactive.primary};
  text-decoration: underline;

  &:link,
  &:visited {
    color: ${({ theme }) => theme.semanticColors.interactive.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.semanticColors.interactive.hover};
  }

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
  }

  &:active {
    color: ${({ theme }) => theme.semanticColors.interactive.active};
  }
`;

const BackContainer = styled.p`
  margin: 0;
  line-height: 1;

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;

const BackLink = styled.a.attrs({
  className: 'breadcrumb-backlink',
})`
  background: none;
  border: 0;
  cursor: pointer;
  display: inline-block;
  padding: 0 0 0 16px;
  position: relative;
  color: ${({ theme }) => theme.semanticColors.interactive.primary};
  text-decoration: underline;
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  &:link,
  &:visited {
    color: ${({ theme }) => theme.semanticColors.interactive.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.semanticColors.interactive.hover};
  }

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
  }

  &:active {
    color: ${({ theme }) => theme.semanticColors.interactive.active};
  }

  &::before {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23005eb8' height='24' width='24' viewBox='8 0 24 24'%3E%3Cpath d='M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z'%3E%3C/path%3E%3C/svg%3E") no-repeat 8px 0;
    content: "";
    display: block;
    height: 24px;
    left: -8px;
    position: absolute;
    top: -1px;
    width: 24px;

    ${({ theme }) => theme.media.md} {
      top: 0;
    }
  }

  &:hover::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%237c2855' height='24' width='24' viewBox='8 0 24 24'%3E%3Cpath d='M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z'%3E%3C/path%3E%3C/svg%3E");
  }

  &:focus::before,
  &:active::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23212b32' height='24' width='24' viewBox='8 0 24 24'%3E%3Cpath d='M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z'%3E%3C/path%3E%3C/svg%3E");
  }
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

/**
 * Breadcrumb Component
 * 
 * A navigation component that shows users where they are in a website's hierarchy
 * and allows them to navigate back to higher levels.
 * Converted from NHS UK Design System breadcrumb component.
 * 
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { text: 'Home', href: '/' },
 *     { text: 'Health A-Z', href: '/health-a-z' },
 *     { text: 'Mental health', href: '/health-a-z/mental-health' }
 *   ]}
 *   text="Depression"
 *   href="/health-a-z/mental-health/depression"
 * />
 * ```
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  text,
  href,
  labelText = 'Breadcrumb',
  reverse = false,
  className,
  'data-testid': dataTestId,
  id,
  ...rest
}) => {
  // Get the last item for the mobile back link
  const lastItem = text && href 
    ? { text, href }
    : items[items.length - 1];

  return (
    <Nav
      aria-label={labelText}
      className={className}
      id={id}
      data-testid={dataTestId}
      $reverse={reverse}
      {...rest}
    >
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <BreadcrumbLink href={item.href} {...item.attributes}>
                {item.text}
              </BreadcrumbLink>
            ) : (
              <span>{item.text}</span>
            )}
          </BreadcrumbItem>
        ))}
        {text && href && (
          <BreadcrumbItem>
            <BreadcrumbLink href={href}>
              {text}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
      
      {lastItem && (
        <BackContainer>
          <BackLink href={lastItem.href || '#'}>
            <VisuallyHidden>Back to&nbsp;</VisuallyHidden>
            {lastItem.text}
          </BackLink>
        </BackContainer>
      )}
    </Nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';