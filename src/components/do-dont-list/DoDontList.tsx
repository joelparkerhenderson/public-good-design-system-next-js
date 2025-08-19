'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export type DoDontListType = 'do' | 'dont';

export interface DoDontListItem {
  /** The text content of the list item */
  item: string;
}

export interface DoDontListProps extends BaseComponentProps {
  /** Title/heading for the do or don't list */
  title: string;
  /** Type of list - 'do' (tick/green) or 'dont' (cross/red) */
  type: DoDontListType;
  /** Array of list items */
  items: DoDontListItem[];
  /** For 'dont' lists, whether to hide the "do not" prefix (defaults to false) */
  hidePrefix?: boolean;
  /** Heading level for the title (defaults to 3) */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Additional CSS classes */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const DoDontContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DoDontHeading = styled.h3<{ as: keyof JSX.IntrinsicElements }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: ${({ theme }) => theme.colors.black};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const DoDontListElement = styled.ul<{ $type: DoDontListType }>`
  list-style: none;
  margin: 0;
  padding: 0;
  
  li {
    position: relative;
    margin-bottom: ${({ theme }) => theme.spacing[3]};
    padding-left: ${({ theme }) => theme.spacing[12]};
    font-family: ${({ theme }) => theme.typography.fontFamily.base};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    color: ${({ theme }) => theme.colors.black};
    
    &:last-child {
      margin-bottom: 0;
    }
    
    /* Icon positioning */
    svg {
      position: absolute;
      left: 0;
      top: 0;
      width: 34px;
      height: 34px;
      flex-shrink: 0;
    }
  }
`;

const TickIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    aria-hidden="true" 
    width="34" 
    height="34"
  >
    <path 
      strokeWidth="4" 
      strokeLinecap="round" 
      d="M18.4 7.8l-8.5 8.4L5.6 12" 
      stroke="#007f3b"
    />
  </svg>
);

const CrossIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    aria-hidden="true" 
    width="34" 
    height="34"
  >
    <path 
      d="M17 18.5c-.4 0-.8-.1-1.1-.4l-10-10c-.6-.6-.6-1.6 0-2.1.6-.6 1.5-.6 2.1 0l10 10c.6.6.6 1.5 0 2.1-.3.3-.6.4-1 .4z" 
      fill="#d5281b"
    />
    <path 
      d="M7 18.5c-.4 0-.8-.1-1.1-.4-.6-.6-.6-1.5 0-2.1l10-10c.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1l-10 10c-.3.3-.6.4-1 .4z" 
      fill="#d5281b"
    />
  </svg>
);

/**
 * DoDontList Component
 * 
 * A component for displaying lists of things users should do or should not do.
 * Provides clear visual distinction with green ticks for 'do' items and red crosses for 'don't' items.
 * Commonly used in healthcare guidance to provide clear, actionable advice.
 * Converted from NHS UK Design System do-dont-list component.
 * 
 * @example
 * ```tsx
 * // Do list with ticks
 * <DoDontList
 *   title="Do"
 *   type="do"
 *   items={[
 *     { item: "wash your hands regularly" },
 *     { item: "get plenty of rest" },
 *     { item: "drink lots of fluids" }
 *   ]}
 * />
 * 
 * // Don't list with crosses
 * <DoDontList
 *   title="Don't"
 *   type="dont"
 *   items={[
 *     { item: "smoke" },
 *     { item: "drink alcohol excessively" },
 *     { item: "ignore symptoms" }
 *   ]}
 * />
 * 
 * // Don't list without "do not" prefix
 * <DoDontList
 *   title="Avoid"
 *   type="dont"
 *   hidePrefix={true}
 *   items={[
 *     { item: "strenuous exercise" },
 *     { item: "heavy lifting" }
 *   ]}
 * />
 * ```
 */
export const DoDontList: React.FC<DoDontListProps> = ({
  title,
  type,
  items,
  hidePrefix = false,
  headingLevel = 3,
  classes,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const HeadingComponent = `h${headingLevel}` as keyof JSX.IntrinsicElements;
  
  const containerClasses = [
    'do-dont-list',
    classes
  ].filter(Boolean).join(' ');

  const renderListItem = (item: DoDontListItem, index: number) => {
    const prefix = type === 'dont' && !hidePrefix ? 'do not ' : '';
    
    return (
      <li key={index}>
        {type === 'do' ? (
          <TickIcon className="do-dont-list__icon do-dont-list__icon--tick" />
        ) : (
          <CrossIcon className="do-dont-list__icon do-dont-list__icon--cross" />
        )}
        {prefix}{item.item}
      </li>
    );
  };

  return (
    <DoDontContainer
      className={`${containerClasses}${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      <DoDontHeading 
        as={HeadingComponent}
        className="do-dont-list__label"
      >
        {title}
      </DoDontHeading>
      <DoDontListElement 
        $type={type}
        className={`do-dont-list__list do-dont-list__list--${type === 'do' ? 'tick' : 'cross'}`}
        role="list"
      >
        {items.map((item, index) => renderListItem(item, index))}
      </DoDontListElement>
    </DoDontContainer>
  );
};

DoDontList.displayName = 'DoDontList';