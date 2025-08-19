'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export type LegendSize = 'xl' | 'l' | 'm' | 's';

export interface FieldsetLegend {
  /** Legend text content */
  text?: string;
  /** Legend HTML content (takes precedence over text) */
  html?: string;
  /** Size variant for the legend */
  size?: LegendSize;
  /** Additional CSS classes for the legend */
  classes?: string;
  /** Whether the legend should also act as the page heading (wrapped in h1) */
  isPageHeading?: boolean;
}

export interface FieldsetProps extends BaseComponentProps {
  /** Legend configuration */
  legend?: FieldsetLegend;
  /** Children content (form elements) */
  children?: ReactNode;
  /** Element IDs for aria-describedby attribute */
  describedBy?: string;
  /** Additional CSS classes */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const FieldsetElement = styled.fieldset`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  margin: 0 0 ${({ theme }) => theme.spacing[6]} 0;
  padding: 0;
  border: 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FieldsetLegend = styled.legend<{ $size?: LegendSize; $isPageHeading?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding: 0;
  border: 0;
  display: block;
  width: 100%;
  
  /* Size variants */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'xl':
        return `
          font-size: ${theme.typography.fontSize['3xl']};
          line-height: ${theme.typography.lineHeight.tight};
          
          @media (min-width: ${theme.breakpoints.md}) {
            font-size: ${theme.typography.fontSize['4xl']};
          }
        `;
      case 'l':
        return `
          font-size: ${theme.typography.fontSize['2xl']};
          line-height: ${theme.typography.lineHeight.tight};
          
          @media (min-width: ${theme.breakpoints.md}) {
            font-size: ${theme.typography.fontSize['3xl']};
          }
        `;
      case 'm':
        return `
          font-size: ${theme.typography.fontSize.xl};
          line-height: ${theme.typography.lineHeight.tight};
          
          @media (min-width: ${theme.breakpoints.md}) {
            font-size: ${theme.typography.fontSize['2xl']};
          }
        `;
      case 's':
        return `
          font-size: ${theme.typography.fontSize.lg};
          line-height: ${theme.typography.lineHeight.tight};
          
          @media (min-width: ${theme.breakpoints.md}) {
            font-size: ${theme.typography.fontSize.xl};
          }
        `;
      default:
        return `
          font-size: ${theme.typography.fontSize.lg};
          line-height: ${theme.typography.lineHeight.normal};
          
          @media (min-width: ${theme.breakpoints.md}) {
            font-size: ${theme.typography.fontSize.xl};
          }
        `;
    }
  }}
`;

const FieldsetHeading = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
`;

/**
 * Fieldset Component
 * 
 * A semantic HTML fieldset element for grouping related form elements.
 * Provides proper accessibility with legend support and various sizing options.
 * Can optionally act as a page heading when used for primary form sections.
 * Converted from NHS UK Design System fieldset component.
 * 
 * @example
 * ```tsx
 * // Basic fieldset with legend
 * <Fieldset legend={{ text: "Personal information" }}>
 *   <Input label="First name" name="firstName" />
 *   <Input label="Last name" name="lastName" />
 * </Fieldset>
 * 
 * // Large legend as page heading
 * <Fieldset 
 *   legend={{ 
 *     text: "What is your address?", 
 *     size: "l",
 *     isPageHeading: true 
 *   }}
 * >
 *   <Input label="Address line 1" name="address1" />
 *   <Input label="Address line 2" name="address2" />
 *   <Input label="City" name="city" />
 * </Fieldset>
 * 
 * // With HTML legend content
 * <Fieldset legend={{ html: "<strong>Contact</strong> details" }}>
 *   <Input label="Phone number" name="phone" type="tel" />
 *   <Input label="Email address" name="email" type="email" />
 * </Fieldset>
 * 
 * // With aria-describedby for additional context
 * <Fieldset 
 *   legend={{ text: "Emergency contact" }}
 *   describedBy="emergency-hint"
 * >
 *   <div id="emergency-hint">
 *     Provide details for someone we can contact in an emergency
 *   </div>
 *   <Input label="Contact name" name="emergencyName" />
 *   <Input label="Contact phone" name="emergencyPhone" />
 * </Fieldset>
 * ```
 */
export const Fieldset: React.FC<FieldsetProps> = ({
  legend,
  children,
  describedBy,
  classes,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const renderLegend = () => {
    if (!legend || (!legend.text && !legend.html)) {
      return null;
    }

    const legendContent = legend.html || legend.text;
    const legendClasses = [
      'fieldset__legend',
      legend.size && `fieldset__legend--${legend.size}`,
      legend.classes
    ].filter(Boolean).join(' ');

    const content = legend.html ? (
      <span dangerouslySetInnerHTML={{ __html: legend.html }} />
    ) : (
      legend.text
    );

    return (
      <FieldsetLegend
        $size={legend.size}
        $isPageHeading={legend.isPageHeading}
        className={legendClasses}
      >
        {legend.isPageHeading ? (
          <FieldsetHeading className="fieldset__heading">
            {content}
          </FieldsetHeading>
        ) : (
          content
        )}
      </FieldsetLegend>
    );
  };

  const fieldsetClasses = [
    'fieldset',
    classes
  ].filter(Boolean).join(' ');

  return (
    <FieldsetElement
      className={`${fieldsetClasses}${className ? ` ${className}` : ''}`}
      aria-describedby={describedBy}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      {renderLegend()}
      {children}
    </FieldsetElement>
  );
};

Fieldset.displayName = 'Fieldset';