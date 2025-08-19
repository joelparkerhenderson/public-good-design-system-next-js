'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export type TagVariant = 
  | 'default'
  | 'white'
  | 'grey'
  | 'green'
  | 'aqua-green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow';

export interface TagProps extends BaseComponentProps {
  /** Text content for the tag */
  text?: string;
  /** HTML content for the tag (takes precedence over text) */
  html?: string;
  /** Visual variant of the tag */
  variant?: TagVariant;
  /** Remove the border from the tag */
  noBorder?: boolean;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const getVariantStyles = (variant: TagVariant, noBorder: boolean, theme: any) => {
  const baseStyle = {
    border: noBorder ? 'none' : '1px solid',
    outline: '2px solid transparent',
    outlineOffset: '-2px',
  };

  switch (variant) {
    case 'white':
      return {
        ...baseStyle,
        backgroundColor: theme.colors.white,
        borderColor: noBorder ? 'transparent' : theme.colors.text,
        color: theme.colors.text,
      };
    case 'grey':
      return {
        ...baseStyle,
        backgroundColor: '#f3f4f4',
        borderColor: noBorder ? 'transparent' : '#768692',
        color: '#768692',
      };
    case 'green':
      return {
        ...baseStyle,
        backgroundColor: '#d5e6d5',
        borderColor: noBorder ? 'transparent' : '#006633',
        color: '#006633',
      };
    case 'aqua-green':
      return {
        ...baseStyle,
        backgroundColor: '#d4f4e8',
        borderColor: noBorder ? 'transparent' : '#00664f',
        color: '#00664f',
      };
    case 'blue':
      return {
        ...baseStyle,
        backgroundColor: '#d4e5f7',
        borderColor: noBorder ? 'transparent' : '#005eb8',
        color: '#005eb8',
      };
    case 'purple':
      return {
        ...baseStyle,
        backgroundColor: '#e6d7e8',
        borderColor: noBorder ? 'transparent' : '#7c2855',
        color: '#7c2855',
      };
    case 'pink':
      return {
        ...baseStyle,
        backgroundColor: '#fce8e6',
        borderColor: noBorder ? 'transparent' : '#ae2a19',
        color: '#ae2a19',
      };
    case 'red':
      return {
        ...baseStyle,
        backgroundColor: '#fce8e6',
        borderColor: noBorder ? 'transparent' : '#ae2a19',
        color: '#ae2a19',
      };
    case 'orange':
      return {
        ...baseStyle,
        backgroundColor: '#fed37c',
        borderColor: noBorder ? 'transparent' : '#cc8a00',
        color: '#cc8a00',
      };
    case 'yellow':
      return {
        ...baseStyle,
        backgroundColor: '#fff2cc',
        borderColor: noBorder ? 'transparent' : '#cc9900',
        color: '#cc9900',
      };
    default: // 'default' variant
      return {
        ...baseStyle,
        backgroundColor: '#005eb8',
        borderColor: noBorder ? 'transparent' : '#005eb8',
        color: theme.colors.white,
      };
  }
};

const StyledTag = styled.strong<{ $variant: TagVariant; $noBorder: boolean }>`
  ${({ $variant, $noBorder, theme }) => getVariantStyles($variant, $noBorder, theme)}
  
  display: inline-block;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1;
  text-decoration: none;
  
  /* Ensure readability */
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 2px;
  }
`;

/**
 * Tag Component
 * 
 * A component for displaying status labels, categories, or other short pieces 
 * of information. Tags help users quickly identify and understand the status 
 * or type of content.
 * 
 * @example
 * ```tsx
 * // Basic tag
 * <Tag text="Active" />
 * 
 * // Tag with variant
 * <Tag text="In Progress" variant="blue" />
 * 
 * // Tag with HTML content
 * <Tag html="<strong>Important</strong>" variant="red" />
 * 
 * // Tag without border
 * <Tag text="Status" variant="green" noBorder />
 * ```
 */
export const Tag: React.FC<TagProps> = ({
  text,
  html,
  variant = 'default',
  noBorder = false,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const content = html ? (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    text
  );

  return (
    <StyledTag
      className={`nhsuk-tag${variant !== 'default' ? ` nhsuk-tag--${variant}` : ''}${noBorder ? ' nhsuk-tag--no-border' : ''}${className ? ` ${className}` : ''}`}
      $variant={variant}
      $noBorder={noBorder}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      {content}
    </StyledTag>
  );
};

Tag.displayName = 'Tag';