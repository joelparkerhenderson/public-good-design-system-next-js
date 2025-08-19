'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export type LabelSize = 's' | 'm' | 'l' | 'xl';

export interface LabelProps extends BaseComponentProps {
  /** Plain text content for the label */
  text?: string;
  /** HTML content for the label (takes precedence over text) */
  html?: string;
  /** React children content (takes precedence over html and text) */
  children?: ReactNode;
  /** The id of the input the label is associated with */
  htmlFor?: string;
  /** Whether the label also acts as the heading for the page */
  isPageHeading?: boolean;
  /** Size of the label */
  size?: LabelSize;
  /** Additional CSS classes for the label */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const LabelWrapper = styled.h1`
  margin: 0;
  padding: 0;
  border: 0;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
`;

const LabelElement = styled.label<{ 
  $size?: LabelSize; 
  $isPageHeading?: boolean;
}>`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  
  ${({ $size, $isPageHeading, theme }) => {
    // Determine the actual size to use
    const actualSize = $size || ($isPageHeading ? 'xl' : 'm');
    
    const sizeMap = {
      's': {
        fontSize: theme.typography.fontSize.base,
        lineHeight: theme.typography.lineHeight.normal,
        fontWeight: theme.typography.fontWeight.semibold
      },
      'm': {
        fontSize: theme.typography.fontSize.lg,
        lineHeight: theme.typography.lineHeight.tight,
        fontWeight: theme.typography.fontWeight.semibold
      },
      'l': {
        fontSize: theme.typography.fontSize.xl,
        lineHeight: theme.typography.lineHeight.tight,
        fontWeight: theme.typography.fontWeight.bold
      },
      'xl': {
        fontSize: theme.typography.fontSize['2xl'],
        lineHeight: theme.typography.lineHeight.tight,
        fontWeight: theme.typography.fontWeight.bold
      }
    };
    
    const styles = sizeMap[actualSize];
    
    return `
      font-size: ${styles.fontSize};
      line-height: ${styles.lineHeight};
      font-weight: ${styles.fontWeight};
      
      ${$isPageHeading ? `
        margin-bottom: ${theme.spacing[4]};
      ` : ''}
    `;
  }}
  
  /* Support for HTML content */
  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
  
  em {
    font-style: italic;
  }
  
  /* Link styling within labels */
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    
    &:hover {
      text-decoration: none;
    }
    
    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.focus};
      outline-offset: 2px;
      background-color: ${({ theme }) => theme.colors.focus};
      color: ${({ theme }) => theme.colors.background};
      text-decoration: none;
    }
    
    &:visited {
      color: ${({ theme }) => theme.colors.visited || theme.colors.primary};
    }
  }
  
  /* Code styling within labels */
  code {
    font-family: ${({ theme }) => theme.typography.fontFamily.mono || 'monospace'};
    background-color: ${({ theme }) => theme.colors.backgroundMuted};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
    font-size: 0.9em;
  }
`;

/**
 * Label Component
 * 
 * A form label component that can be used to label form inputs. Supports various sizes,
 * HTML content, and can optionally be used as a page heading. Provides proper semantic
 * markup and accessibility features for form elements.
 * Converted from NHS UK Design System label component.
 * 
 * @example
 * ```tsx
 * // Basic label
 * <Label htmlFor="nhs-number" text="NHS Number" />
 * 
 * // Label with HTML content
 * <Label htmlFor="email" html="Email address <span>(optional)</span>" />
 * 
 * // Label as page heading
 * <Label 
 *   htmlFor="main-input"
 *   text="What is your NHS number?"
 *   isPageHeading={true}
 *   size="xl"
 * />
 * 
 * // Label with React children
 * <Label htmlFor="name">
 *   Full name <span className="optional">(optional)</span>
 * </Label>
 * ```
 */
export const Label: React.FC<LabelProps> = ({
  text,
  html,
  children,
  htmlFor,
  isPageHeading = false,
  size,
  classes,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const renderContent = () => {
    if (children) {
      return children;
    } else if (html) {
      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } else if (text) {
      return text;
    }
    return null;
  };

  // Extract size from classes if not provided via size prop
  const sizeFromClasses = classes?.match(/nhsuk-label--(s|m|l|xl)/)?.[1] as LabelSize;
  const actualSize = size || sizeFromClasses;

  const labelClasses = [
    'nhsuk-label',
    classes
  ].filter(Boolean).join(' ');

  const labelElement = (
    <LabelElement
      htmlFor={htmlFor}
      className={`${labelClasses}${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      $size={actualSize}
      $isPageHeading={isPageHeading}
      {...attributes}
      {...rest}
    >
      {renderContent()}
    </LabelElement>
  );

  if (isPageHeading) {
    return (
      <LabelWrapper className="nhsuk-label-wrapper">
        {labelElement}
      </LabelWrapper>
    );
  }

  return labelElement;
};

Label.displayName = 'Label';