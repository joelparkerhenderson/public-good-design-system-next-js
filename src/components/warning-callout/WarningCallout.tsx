'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface WarningCalloutProps extends BaseComponentProps {
  /** Heading to be used on the warning callout */
  heading: string;
  /** Optional heading level for the heading. Defaults to 3 */
  headingLevel?: HeadingLevel;
  /** Text content to be used within the warning callout */
  text?: string;
  /** HTML content to be used within the warning callout (takes precedence over text) */
  html?: string;
  /** Children content (takes precedence over text and html) */
  children?: React.ReactNode;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const WarningContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.yellow};
  background-color: #fff9c4; /* pale yellow */
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[4]};
  padding-top: 0;
  position: relative;
  
  @include nhsuk-responsive-padding(5, "bottom");
  @include nhsuk-responsive-padding(5, "left");
  @include nhsuk-responsive-padding(5, "right");
`;

// Dynamic heading styles based on level
const getHeadingSize = (level: HeadingLevel) => {
  switch (level) {
    case 1: return '2rem';
    case 2: return '1.5rem';
    case 3: return '1.25rem';
    case 4: return '1.125rem';
    case 5: return '1rem';
    case 6: return '0.875rem';
    default: return '1.25rem';
  }
};

const WarningContent = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    padding-left: ${({ theme }) => theme.spacing[4]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing[1]};
  }
`;

const VisuallyHidden = styled.span`
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
`;

/**
 * WarningCallout Component
 * 
 * A component for displaying important warnings or notices that users need to be 
 * aware of. Uses distinctive yellow styling to draw attention and includes proper 
 * accessibility features for screen readers.
 * 
 * @example
 * ```tsx
 * // Basic warning callout
 * <WarningCallout 
 *   heading="Important"
 *   text="For safety, tell your doctor or pharmacist if you're taking any other medicines."
 * />
 * 
 * // Warning with HTML content
 * <WarningCallout 
 *   heading="Before your appointment"
 *   html="<p>Bring your <strong>NHS card</strong> and a list of current medications.</p>"
 * />
 * 
 * // Warning with children content
 * <WarningCallout heading="Medication Safety">
 *   <p>Always check with your healthcare provider before:</p>
 *   <ul>
 *     <li>Starting new medications</li>
 *     <li>Stopping current treatments</li>
 *     <li>Changing dosages</li>
 *   </ul>
 * </WarningCallout>
 * ```
 */
export const WarningCallout: React.FC<WarningCalloutProps> = ({
  heading,
  headingLevel = 3,
  text,
  html,
  children,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  // Determine if "Important" is already in the heading
  const hasImportantInHeading = heading.toLowerCase().includes('important');
  
  // Create the heading content
  const headingContent = hasImportantInHeading ? (
    <>
      {heading}
      <VisuallyHidden>:</VisuallyHidden>
    </>
  ) : (
    <span role="text">
      <VisuallyHidden>Important: </VisuallyHidden>
      {heading}
    </span>
  );
  
  // Determine content to render
  const renderContent = () => {
    if (children) {
      return <WarningContent>{children}</WarningContent>;
    }
    
    if (html) {
      return (
        <WarningContent>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </WarningContent>
      );
    }
    
    if (text) {
      return (
        <WarningContent>
          <p>{text}</p>
        </WarningContent>
      );
    }
    
    return null;
  };

  return (
    <WarningContainer
      className={`nhsuk-warning-callout${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
{React.createElement(
        `h${headingLevel}` as keyof JSX.IntrinsicElements,
        {
          className: "nhsuk-warning-callout__label",
          style: {
            backgroundColor: '#ffeb3b',
            color: '#212b32',
            display: 'inline-block',
            fontFamily: 'inherit',
            fontSize: getHeadingSize(headingLevel),
            fontWeight: 'bold',
            lineHeight: '1.2',
            margin: '0 -1.5rem 0.5rem -1.5rem',
            padding: '0.5rem 1.5rem',
            position: 'relative',
            top: '-0.5rem'
          }
        },
        headingContent
      )}
      
      {renderContent()}
    </WarningContainer>
  );
};

WarningCallout.displayName = 'WarningCallout';