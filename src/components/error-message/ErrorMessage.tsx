'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface ErrorMessageProps extends BaseComponentProps {
  /** Error message text content */
  text?: string;
  /** Error message HTML content (takes precedence over text) */
  html?: string;
  /** Children content (takes precedence over html/text) */
  children?: ReactNode;
  /** ID for the error message element */
  id?: string;
  /** Additional CSS classes */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
  /** Visually hidden prefix text for screen readers (defaults to "Error") */
  visuallyHiddenText?: string;
}

const ErrorMessageSpan = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: ${({ theme }) => theme.colors.red};
  display: block;
  margin-top: ${({ theme }) => theme.spacing[1]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  
  &:before {
    content: "Error: ";
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const VisuallyHidden = styled.span`
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  clip: rect(0 0 0 0) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  border: 0 !important;
  white-space: nowrap !important;
`;

/**
 * ErrorMessage Component
 * 
 * A component for displaying validation error messages in forms.
 * Provides clear, accessible error feedback with proper styling and screen reader support.
 * Includes a visually hidden "Error:" prefix for assistive technologies.
 * Converted from NHS UK Design System error-message component.
 * 
 * @example
 * ```tsx
 * // Basic error message with text
 * <ErrorMessage text="Please enter your full name" />
 * 
 * // Error message with HTML content
 * <ErrorMessage html="Please enter a valid <strong>email address</strong>" />
 * 
 * // Error message with children (most flexible)
 * <ErrorMessage>
 *   <span>Please enter your date of birth</span>
 * </ErrorMessage>
 * 
 * // Error message with custom ID for form association
 * <ErrorMessage
 *   id="full-name-error"
 *   text="Please enter your full name"
 * />
 * 
 * // Error message with custom visually hidden text
 * <ErrorMessage
 *   text="NHS number must be 10 digits"
 *   visuallyHiddenText="Validation error"
 * />
 * ```
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  text,
  html,
  children,
  id,
  classes,
  attributes,
  visuallyHiddenText,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const renderContent = () => {
    // Children take precedence over html/text
    if (children) {
      return children;
    }

    if (html) {
      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    }

    if (text) {
      return text;
    }

    return null;
  };

  const content = renderContent();
  
  // Don't render if no content
  if (!content && !children) {
    return null;
  }

  // Set default visually hidden text only if not explicitly provided
  const hiddenText = visuallyHiddenText !== undefined ? visuallyHiddenText : 'Error';

  const errorClasses = [
    'error-message',
    classes
  ].filter(Boolean).join(' ');

  return (
    <ErrorMessageSpan
      id={id}
      className={`${errorClasses}${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      {hiddenText && (
        <VisuallyHidden className="error-message__visually-hidden">
          {hiddenText}:
        </VisuallyHidden>
      )}
      {content}
    </ErrorMessageSpan>
  );
};

ErrorMessage.displayName = 'ErrorMessage';