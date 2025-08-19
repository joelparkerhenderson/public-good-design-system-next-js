'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface PanelProps extends BaseComponentProps {
  /** Title text for the panel */
  titleText?: string;
  /** Title HTML for the panel (takes precedence over titleText) */
  titleHtml?: string;
  /** Heading level for the title. Defaults to 1 */
  headingLevel?: HeadingLevel;
  /** Text content for the panel body */
  text?: string;
  /** HTML content for the panel body (takes precedence over text) */
  html?: string;
  /** Children content (takes precedence over text and html) */
  children?: React.ReactNode;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const PanelContainer = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.green};
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]};
  text-align: center;
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[3]};
  }
`;

const PanelTitle = styled.h1<{ $level: HeadingLevel }>`
  color: ${({ theme }) => theme.colors.green};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
  
  /* Dynamic font sizes based on heading level */
  font-size: ${({ $level, theme }) => {
    switch ($level) {
      case 1: return theme.typography.fontSize['3xl'];
      case 2: return theme.typography.fontSize['2xl'];
      case 3: return theme.typography.fontSize.xl;
      case 4: return theme.typography.fontSize.lg;
      case 5: return theme.typography.fontSize.base;
      case 6: return theme.typography.fontSize.sm;
      default: return theme.typography.fontSize['3xl'];
    }
  }};
  
  @media (max-width: 768px) {
    font-size: ${({ $level, theme }) => {
      switch ($level) {
        case 1: return theme.typography.fontSize['2xl'];
        case 2: return theme.typography.fontSize.xl;
        case 3: return theme.typography.fontSize.lg;
        case 4: return theme.typography.fontSize.base;
        case 5: return theme.typography.fontSize.sm;
        case 6: return theme.typography.fontSize.xs;
        default: return theme.typography.fontSize['2xl'];
      }
    }};
  }
`;

const PanelBody = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  
  p {
    margin: 0 0 ${({ theme }) => theme.spacing[3]} 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  ul, ol {
    text-align: left;
    margin: ${({ theme }) => theme.spacing[3]} 0;
    padding-left: ${({ theme }) => theme.spacing[4]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing[1]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    
    &:hover {
      color: ${({ theme }) => theme.colors.darkBlue};
      text-decoration: none;
    }
    
    &:focus {
      outline: 3px solid ${({ theme }) => theme.colors.yellow};
      outline-offset: 0;
      background-color: ${({ theme }) => theme.colors.yellow};
      color: ${({ theme }) => theme.colors.black};
      text-decoration: none;
    }
  }
  
  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
  
  em {
    font-style: italic;
  }
`;

/**
 * Panel Component
 * 
 * A component for displaying confirmation messages, success notifications, 
 * or other important information in a visually distinct container. Commonly 
 * used for completion pages, confirmations, and important announcements.
 * 
 * @example
 * ```tsx
 * // Basic confirmation panel
 * <Panel 
 *   titleText="Appointment booked"
 *   text="We have sent you a confirmation email with your appointment details."
 * />
 * 
 * // Panel with HTML content
 * <Panel 
 *   titleText="Registration complete"
 *   html="<p>Thank you for registering with our practice.</p><p>Your NHS number is <strong>485 777 3456</strong></p>"
 * />
 * 
 * // Panel with children content
 * <Panel titleText="Test results ready" headingLevel={2}>
 *   <p>Your blood test results are now available.</p>
 *   <ul>
 *     <li>Cholesterol: Normal</li>
 *     <li>Blood sugar: Normal</li>
 *     <li>Blood pressure: Slightly elevated</li>
 *   </ul>
 *   <p>Your GP will contact you to discuss the results.</p>
 * </Panel>
 * 
 * // Success notification panel
 * <Panel 
 *   titleText="Prescription ordered"
 *   text="Your repeat prescription has been sent to Boots Pharmacy on High Street."
 *   headingLevel={3}
 * />
 * ```
 */
export const Panel: React.FC<PanelProps> = ({
  titleText,
  titleHtml,
  headingLevel = 1,
  text,
  html,
  children,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  // Determine title content
  const getTitleContent = () => {
    if (titleHtml) {
      return <span dangerouslySetInnerHTML={{ __html: titleHtml }} />;
    }
    return titleText;
  };

  // Determine body content
  const renderBodyContent = () => {
    if (children) {
      return children;
    }
    
    if (html) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }
    
    if (text) {
      return <p>{text}</p>;
    }
    
    return null;
  };

  const bodyContent = renderBodyContent();
  const titleContent = getTitleContent();

  // Don't render if no title is provided
  if (!titleContent) {
    return null;
  }

  // Create the title element dynamically
  const TitleElement = React.createElement(
    `h${headingLevel}` as keyof JSX.IntrinsicElements,
    {
      className: 'nhsuk-panel__title',
    },
    titleContent
  ) as React.ReactElement;

  return (
    <PanelContainer
      className={`nhsuk-panel${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      <PanelTitle 
        as={TitleElement.type} 
        className={TitleElement.props.className}
        $level={headingLevel}
      >
        {TitleElement.props.children}
      </PanelTitle>
      
      {bodyContent && (
        <PanelBody className="nhsuk-panel__body">
          {bodyContent}
        </PanelBody>
      )}
    </PanelContainer>
  );
};

Panel.displayName = 'Panel';