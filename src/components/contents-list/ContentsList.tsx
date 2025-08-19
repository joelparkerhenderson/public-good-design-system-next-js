'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface ContentsListItem {
  /** URL for the contents list item link */
  href: string;
  /** Text for the contents list item */
  text: string;
  /** Whether this item is the current page */
  current?: boolean;
}

export interface ContentsListProps extends BaseComponentProps {
  /** Array of contents list items */
  items: ContentsListItem[];
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const ContentsListContainer = styled.nav`
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  background-color: ${({ theme }) => theme.colors.grey5};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const ContentsListHeading = styled.h2`
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

const ContentsListOrderedList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ContentsListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContentsListLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  
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
`;

const ContentsListCurrent = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

/**
 * ContentsList Component
 * 
 * A navigation component that displays a table of contents with links to different 
 * sections or pages. Commonly used for multi-page forms, guides, or long content 
 * that spans multiple pages.
 * 
 * @example
 * ```tsx
 * // Basic contents list
 * <ContentsList 
 *   items={[
 *     { href: '/amd', text: 'What is AMD?', current: true },
 *     { href: '/amd/symptoms', text: 'Symptoms' },
 *     { href: '/amd/diagnosis', text: 'Getting diagnosed' },
 *     { href: '/amd/treatment', text: 'Treatments' },
 *     { href: '/amd/living-with', text: 'Living with AMD' }
 *   ]}
 * />
 * 
 * // Healthcare guide contents
 * <ContentsList 
 *   items={[
 *     { href: '/diabetes-guide/what-is-diabetes', text: 'What is diabetes?', current: true },
 *     { href: '/diabetes-guide/types', text: 'Types of diabetes' },
 *     { href: '/diabetes-guide/symptoms', text: 'Symptoms and diagnosis' },
 *     { href: '/diabetes-guide/treatment', text: 'Treatment and management' },
 *     { href: '/diabetes-guide/complications', text: 'Complications' },
 *     { href: '/diabetes-guide/prevention', text: 'Prevention' }
 *   ]}
 * />
 * ```
 */
export const ContentsList: React.FC<ContentsListProps> = ({
  items,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  return (
    <ContentsListContainer
      className={`nhsuk-contents-list${className ? ` ${className}` : ''}`}
      role="navigation"
      aria-label="Pages in this guide"
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      <ContentsListHeading>Contents</ContentsListHeading>
      <ContentsListOrderedList className="nhsuk-contents-list__list">
        {items.map((item, index) => (
          <ContentsListItem
            key={index}
            className="nhsuk-contents-list__item"
            aria-current={item.current ? 'page' : undefined}
          >
            {item.current ? (
              <ContentsListCurrent className="nhsuk-contents-list__current">
                {item.text}
              </ContentsListCurrent>
            ) : (
              <ContentsListLink
                className="nhsuk-contents-list__link"
                href={item.href}
              >
                {item.text}
              </ContentsListLink>
            )}
          </ContentsListItem>
        ))}
      </ContentsListOrderedList>
    </ContentsListContainer>
  );
};

ContentsList.displayName = 'ContentsList';