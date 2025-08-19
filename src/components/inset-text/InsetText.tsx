'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface InsetTextProps extends BaseComponentProps {
  /** Plain text content for the inset text */
  text?: string;
  /** HTML content for the inset text (takes precedence over text) */
  html?: string;
  /** React children content (takes precedence over html and text) */
  children?: ReactNode;
  /** Additional CSS classes for the inset text */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const InsetTextContainer = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  margin: ${({ theme }) => theme.spacing[6]} 0;
  padding: ${({ theme }) => theme.spacing[4]};
  border-left: 4px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.backgroundMuted};
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  /* Content styling */
  p {
    margin: 0 0 ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  /* Link styling */
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
  
  /* List styling */
  ul, ol {
    margin: 0 0 ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[4]};
    padding: 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  /* Emphasis styling */
  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
  
  em {
    font-style: italic;
  }
  
  /* Code styling */
  code {
    font-family: ${({ theme }) => theme.typography.fontFamily.mono || 'monospace'};
    background-color: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
    font-size: 0.9em;
  }
  
  /* Heading styling */
  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 ${({ theme }) => theme.spacing[3]};
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  h1 { font-size: ${({ theme }) => theme.typography.fontSize['2xl']}; }
  h2 { font-size: ${({ theme }) => theme.typography.fontSize.xl}; }
  h3 { font-size: ${({ theme }) => theme.typography.fontSize.lg}; }
  h4 { font-size: ${({ theme }) => theme.typography.fontSize.base}; }
  h5 { font-size: ${({ theme }) => theme.typography.fontSize.sm}; }
  h6 { font-size: ${({ theme }) => theme.typography.fontSize.sm}; }
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
 * Inset Text Component
 * 
 * A component for displaying important information that needs to stand out from the main content.
 * Typically used for warnings, important notes, or supplementary information. 
 * Converted from NHS UK Design System inset text component.
 * 
 * @example
 * ```tsx
 * // Basic inset text
 * <InsetText text="You can report any suspected side effects to the UK safety scheme." />
 * 
 * // Inset text with HTML content
 * <InsetText html="You can report any suspected side effects to the <a href='#'>UK safety scheme</a>." />
 * 
 * // Inset text with React children
 * <InsetText>
 *   <p>You can report any suspected side effects to the UK safety scheme.</p>
 *   <p>Call 111 for urgent but non-life-threatening symptoms.</p>
 * </InsetText>
 * ```
 */
export const InsetText: React.FC<InsetTextProps> = ({
  text,
  html,
  children,
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
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    } else if (text) {
      return <p>{text}</p>;
    }
    return null;
  };

  const insetTextClasses = [
    'nhsuk-inset-text',
    classes
  ].filter(Boolean).join(' ');

  return (
    <InsetTextContainer
      className={`${insetTextClasses}${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      <VisuallyHidden className="nhsuk-u-visually-hidden">Information: </VisuallyHidden>
      {renderContent()}
    </InsetTextContainer>
  );
};

InsetText.displayName = 'InsetText';