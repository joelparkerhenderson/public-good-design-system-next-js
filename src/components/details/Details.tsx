'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export type DetailsVariant = 'default' | 'expander';

export interface DetailsProps extends BaseComponentProps {
  /** Summary text (the clickable part) */
  summaryText?: string;
  /** Summary HTML (takes precedence over summaryText) */
  summaryHtml?: string;
  /** Content text */
  text?: string;
  /** Content HTML (takes precedence over text) */
  html?: string;
  /** Children content (takes precedence over text/html) */
  children?: ReactNode;
  /** Component ID */
  id?: string;
  /** Whether details should be open by default */
  open?: boolean;
  /** Details variant */
  variant?: DetailsVariant;
  /** Additional classes */
  classes?: string;
  /** Container attributes */
  attributes?: Record<string, string>;
  /** Toggle event handler */
  onToggle?: (isOpen: boolean) => void;
}

const DetailsElement = styled.details<{ $variant?: DetailsVariant }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  border: ${({ $variant, theme }) => $variant === 'expander' ? `1px solid ${theme.colors.grey4}` : 'none'};
  border-radius: ${({ $variant }) => $variant === 'expander' ? '4px' : '0'};
  
  &[open] {
    ${({ $variant, theme }) => $variant === 'expander' && `
      border-color: ${theme.colors.primary};
    `}
  }
`;

const DetailsSummary = styled.summary<{ $variant?: DetailsVariant }>`
  display: block;
  position: relative;
  padding: ${({ $variant, theme }) => 
    $variant === 'expander' 
      ? `${theme.spacing[3]} ${theme.spacing[4]} ${theme.spacing[3]} ${theme.spacing[12]}`
      : `${theme.spacing[1]} 0 ${theme.spacing[1]} ${theme.spacing[8]}`
  };
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  background-color: ${({ $variant, theme }) => $variant === 'expander' ? theme.colors.grey5 : 'transparent'};
  border: ${({ $variant, theme }) => $variant === 'expander' ? 'none' : `1px solid transparent`};
  margin: ${({ $variant, theme }) => $variant === 'expander' ? '0' : `0 0 ${theme.spacing[1]} 0`};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;

  &:hover {
    background-color: ${({ $variant, theme }) => 
      $variant === 'expander' ? theme.colors.grey4 : theme.colors.grey5
    };
    text-decoration: none;
  }

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 0;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
  }

  &::-webkit-details-marker {
    display: none;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: ${({ $variant, theme }) => $variant === 'expander' ? theme.spacing[3] : '0'};
    width: 0;
    height: 0;
    margin-top: -6px;
    border: 7px solid transparent;
    border-left: 10px solid ${({ theme }) => theme.colors.black};
    transform: rotate(0deg);
    transition: transform 0.15s ease-in-out;
  }

  details[open] & {
    &::before {
      transform: rotate(90deg);
    }
  }
`;

const DetailsSummaryText = styled.span`
  display: block;
`;

const DetailsText = styled.div<{ $variant?: DetailsVariant }>`
  padding: ${({ $variant, theme }) => 
    $variant === 'expander' 
      ? `0 ${theme.spacing[4]} ${theme.spacing[4]} ${theme.spacing[4]}`
      : `${theme.spacing[3]} 0 0 ${theme.spacing[8]}`
  };
  border-top: ${({ $variant, theme }) => 
    $variant === 'expander' ? `1px solid ${theme.colors.grey4}` : 'none'
  };

  /* Reset margins for child elements */
  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  /* Ensure proper spacing for lists and other elements */
  ul, ol {
    margin: ${({ theme }) => `${theme.spacing[3]} 0`};
    padding-left: ${({ theme }) => theme.spacing[5]};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing[1]};
  }

  p {
    margin: ${({ theme }) => `0 0 ${theme.spacing[4]} 0`};
  }

  h1, h2, h3, h4, h5, h6 {
    margin: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[2]} 0`};
  }
`;

/**
 * Details Component
 * 
 * A collapsible content component that provides progressive disclosure.
 * Built on the semantic HTML `<details>` element for accessibility.
 * Supports both standard and expander variants with proper focus management.
 * Converted from NHS UK Design System details component.
 * 
 * @example
 * ```tsx
 * // Basic details with text content
 * <Details
 *   summaryText="Where can I find my NHS number?"
 *   text="An NHS number is a 10 digit number, like 485 777 3456."
 * />
 * 
 * // Details with HTML content
 * <Details
 *   summaryText="More information"
 *   html="<p>This is <strong>important</strong> information.</p>"
 * />
 * 
 * // Details with children (most flexible)
 * <Details summaryText="Contact information">
 *   <p>You can contact us by:</p>
 *   <ul>
 *     <li>Phone: 0123 456 7890</li>
 *     <li>Email: info@example.com</li>
 *   </ul>
 * </Details>
 * 
 * // Expander variant (different styling)
 * <Details
 *   summaryText="Opening times"
 *   variant="expander"
 *   open={true}
 * >
 *   <Table>
 *     <tbody>
 *       <tr><td>Monday</td><td>9am - 5pm</td></tr>
 *       <tr><td>Tuesday</td><td>9am - 5pm</td></tr>
 *     </tbody>
 *   </Table>
 * </Details>
 * ```
 */
export const Details: React.FC<DetailsProps> = ({
  summaryText,
  summaryHtml,
  text,
  html,
  children,
  id,
  open = false,
  variant = 'default',
  classes,
  attributes,
  onToggle,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
    if (onToggle) {
      const detailsElement = event.currentTarget;
      // The open state will be toggled after this event, so we pass the new state
      onToggle(detailsElement.open);
    }
  };

  const renderSummary = () => {
    const summaryContent = summaryHtml || summaryText;
    if (!summaryContent) return null;

    return (
      <DetailsSummary $variant={variant} className="details__summary">
        <DetailsSummaryText className="details__summary-text">
          {summaryHtml ? (
            <span dangerouslySetInnerHTML={{ __html: summaryHtml }} />
          ) : (
            summaryText
          )}
        </DetailsSummaryText>
      </DetailsSummary>
    );
  };

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

  const detailsClasses = [
    'details',
    variant === 'expander' ? 'details--expander' : '',
    classes
  ].filter(Boolean).join(' ');

  return (
    <DetailsElement
      id={id}
      open={open}
      className={`${detailsClasses}${className ? ` ${className}` : ''}`}
      $variant={variant}
      onToggle={handleToggle}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      {renderSummary()}
      <DetailsText $variant={variant} className="details__text">
        {renderContent()}
      </DetailsText>
    </DetailsElement>
  );
};

Details.displayName = 'Details';