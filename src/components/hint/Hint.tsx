'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface HintProps extends BaseComponentProps {
  /** Plain text content for the hint */
  text?: string;
  /** HTML content for the hint (takes precedence over text) */
  html?: string;
  /** React children content (takes precedence over html and text) */
  children?: ReactNode;
  /** Unique ID for the hint element (useful for aria-describedby) */
  id?: string;
  /** Additional CSS classes for the hint */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const HintElement = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

/**
 * Hint Component
 * 
 * A component for displaying helpful guidance text, typically used with form fields
 * to provide additional context or instructions. Supports both plain text and HTML content.
 * Converted from NHS UK Design System hint component.
 * 
 * @example
 * ```tsx
 * // Basic hint with text
 * <Hint text="Enter your full legal name as it appears on official documents" />
 * 
 * // Hint with HTML content
 * <Hint html="Do not include personal information, like your <strong>name</strong> or <strong>NHS number</strong>" />
 * 
 * // Hint with React children
 * <Hint>
 *   Enter your postcode in the format <code>SW1A 1AA</code>
 * </Hint>
 * 
 * // Hint with ID for form association
 * <Hint 
 *   id="email-hint"
 *   text="We'll only use this to send you important updates about your health"
 * />
 * ```
 */
export const Hint: React.FC<HintProps> = ({
  text,
  html,
  children,
  id,
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

  const hintClasses = [
    'hint',
    classes
  ].filter(Boolean).join(' ');

  return (
    <HintElement
      id={id}
      className={`${hintClasses}${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      {renderContent()}
    </HintElement>
  );
};

Hint.displayName = 'Hint';