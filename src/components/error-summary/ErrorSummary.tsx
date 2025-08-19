'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface ErrorSummaryItem {
  /** Error text content */
  text?: string;
  /** Error HTML content (takes precedence over text) */
  html?: string;
  /** Link href for navigating to the error field */
  href?: string;
  /** Additional attributes for the error link */
  attributes?: Record<string, string>;
}

export interface ErrorSummaryProps extends BaseComponentProps {
  /** Title text for the error summary */
  titleText?: string;
  /** Title HTML (takes precedence over titleText) */
  titleHtml?: string;
  /** Description text explaining the errors */
  descriptionText?: string;
  /** Description HTML (takes precedence over descriptionText) */
  descriptionHtml?: string;
  /** Children content for the description (takes precedence over description text/html) */
  children?: ReactNode;
  /** Array of error items to display */
  errorList: ErrorSummaryItem[];
  /** Additional CSS classes */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
  /** Whether to auto-focus the error summary on mount */
  autoFocus?: boolean;
}

const ErrorSummaryContainer = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  border: 4px solid ${({ theme }) => theme.colors.red};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 0;
  }
`;

const ErrorSummaryTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: ${({ theme }) => theme.colors.red};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`;

const ErrorSummaryBody = styled.div`
  /* Empty styled div for structure */
`;

const ErrorSummaryDescription = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.black};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ErrorSummaryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ErrorSummaryLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.red};
  text-decoration: underline;
  
  &:hover {
    color: ${({ theme }) => theme.colors.red};
    text-decoration: none;
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 0;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
  }
  
  &:visited {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const ErrorSummaryText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.red};
`;

/**
 * ErrorSummary Component
 * 
 * A component for displaying a summary of validation errors at the top of a form.
 * Provides a clear overview of all errors with links to jump to the relevant fields.
 * Includes proper accessibility features including auto-focus and ARIA attributes.
 * Converted from NHS UK Design System error-summary component.
 * 
 * @example
 * ```tsx
 * // Basic error summary
 * <ErrorSummary
 *   titleText="There is a problem"
 *   errorList={[
 *     {
 *       text: "Enter your full name",
 *       href: "#full-name"
 *     },
 *     {
 *       text: "Enter a valid email address",
 *       href: "#email"
 *     }
 *   ]}
 * />
 * 
 * // Error summary with description
 * <ErrorSummary
 *   titleText="There is a problem"
 *   descriptionText="Please fix the following errors before continuing"
 *   errorList={[
 *     {
 *       text: "NHS number must be 10 digits",
 *       href: "#nhs-number"
 *     }
 *   ]}
 * />
 * 
 * // Error summary with HTML content
 * <ErrorSummary
 *   titleHtml="<strong>Form validation failed</strong>"
 *   errorList={[
 *     {
 *       html: "Date of birth must include <strong>day</strong>, <strong>month</strong> and <strong>year</strong>",
 *       href: "#date-of-birth"
 *     }
 *   ]}
 * />
 * 
 * // Error summary with children description
 * <ErrorSummary
 *   titleText="There is a problem"
 *   errorList={[
 *     { text: "Select an appointment type", href: "#appointment-type" }
 *   ]}
 * >
 *   <p>Please review and correct the following information:</p>
 * </ErrorSummary>
 * ```
 */
export const ErrorSummary: React.FC<ErrorSummaryProps> = ({
  titleText,
  titleHtml,
  descriptionText,
  descriptionHtml,
  children,
  errorList,
  classes,
  attributes,
  autoFocus = true,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-focus the error summary when it mounts
  useEffect(() => {
    if (autoFocus && containerRef.current) {
      containerRef.current.focus();
    }
  }, [autoFocus]);

  const renderTitle = () => {
    const titleContent = titleHtml || titleText;
    if (!titleContent) return null;

    return (
      <ErrorSummaryTitle 
        id="error-summary-title"
        className="error-summary__title"
      >
        {titleHtml ? (
          <span dangerouslySetInnerHTML={{ __html: titleHtml }} />
        ) : (
          titleText
        )}
      </ErrorSummaryTitle>
    );
  };

  const renderDescription = () => {
    // Children take precedence over description text/html
    if (children) {
      return <ErrorSummaryDescription className="error-summary__description">
        {children}
      </ErrorSummaryDescription>;
    }

    const descriptionContent = descriptionHtml || descriptionText;
    if (!descriptionContent) return null;

    return (
      <ErrorSummaryDescription className="error-summary__description">
        {descriptionHtml ? (
          <span dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        ) : (
          descriptionText
        )}
      </ErrorSummaryDescription>
    );
  };

  const renderErrorItem = (item: ErrorSummaryItem, index: number) => {
    const content = item.html || item.text;
    if (!content) return null;

    if (item.href) {
      return (
        <ErrorSummaryLink
          href={item.href}
          className="error-summary__link"
          {...item.attributes}
        >
          {item.html ? (
            <span dangerouslySetInnerHTML={{ __html: item.html }} />
          ) : (
            item.text
          )}
        </ErrorSummaryLink>
      );
    }

    return (
      <ErrorSummaryText className="error-summary__text">
        {item.html ? (
          <span dangerouslySetInnerHTML={{ __html: item.html }} />
        ) : (
          item.text
        )}
      </ErrorSummaryText>
    );
  };

  const containerClasses = [
    'error-summary',
    classes
  ].filter(Boolean).join(' ');

  return (
    <ErrorSummaryContainer
      ref={containerRef}
      className={`${containerClasses}${className ? ` ${className}` : ''}`}
      aria-labelledby="error-summary-title"
      role="alert"
      tabIndex={-1}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      {renderTitle()}
      <ErrorSummaryBody className="error-summary__body">
        {renderDescription()}
        <ErrorSummaryList 
          className="error-summary__list"
          role="list"
        >
          {errorList.map((item, index) => (
            <li key={index} className="error-summary__item">
              {renderErrorItem(item, index)}
            </li>
          ))}
        </ErrorSummaryList>
      </ErrorSummaryBody>
    </ErrorSummaryContainer>
  );
};

ErrorSummary.displayName = 'ErrorSummary';