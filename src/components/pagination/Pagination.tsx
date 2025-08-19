'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface PaginationProps extends BaseComponentProps {
  /** URL for the previous page link */
  previousUrl?: string;
  /** Text for the previous page link */
  previousPage?: string;
  /** URL for the next page link */
  nextUrl?: string;
  /** Text for the next page link */
  nextPage?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const PaginationContainer = styled.nav`
  margin-top: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const PaginationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const PaginationItem = styled.li<{ $position: 'previous' | 'next' }>`
  ${({ $position }) => $position === 'previous' && `
    margin-right: auto;
  `}
  
  ${({ $position }) => $position === 'next' && `
    margin-left: auto;
  `}
  
  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
  }
`;

const PaginationLink = styled.a<{ $direction: 'prev' | 'next' }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  min-height: 44px;
  
  ${({ $direction }) => $direction === 'prev' && `
    flex-direction: row;
    text-align: left;
  `}
  
  ${({ $direction }) => $direction === 'next' && `
    flex-direction: row-reverse;
    text-align: right;
  `}
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey5};
    color: ${({ theme }) => theme.colors.darkBlue};
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 0;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

const PaginationContent = styled.div<{ $direction: 'prev' | 'next' }>`
  display: flex;
  flex-direction: column;
  ${({ $direction }) => $direction === 'prev' ? 'margin-left: 12px;' : 'margin-right: 12px;'}
  
  @media (max-width: 768px) {
    ${({ $direction }) => $direction === 'prev' ? 'margin-left: 0; margin-right: 12px;' : 'margin-right: 0; margin-left: 12px;'}
  }
`;

const PaginationTitle = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.grey1};
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

const PaginationPage = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: inherit;
`;

const PaginationIcon = styled.svg`
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  fill: currentColor;
`;

const ArrowLeft: React.FC = () => (
  <PaginationIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M4.1 12.3l2.7 3c.2.2.5.2.7 0 .1-.1.1-.2.1-.3v-2h11c.6 0 1-.4 1-1s-.4-1-1-1h-11V9c0-.2-.1-.4-.3-.5h-.2c-.1 0-.3.1-.4.2l-2.7 3c0 .2 0 .4.1.6z" />
  </PaginationIcon>
);

const ArrowRight: React.FC = () => (
  <PaginationIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19.6 11.66l-2.73-3A.51.51 0 0 0 16 9v2H5a1 1 0 0 0 0 2h11v2a.5.5 0 0 0 .32.46.39.39 0 0 0 .18 0 .52.52 0 0 0 .37-.16l2.73-3a.5.5 0 0 0 0-.64z" />
  </PaginationIcon>
);

/**
 * Pagination Component
 * 
 * A navigation component for moving between pages or sections of content.
 * Commonly used in multi-page guides, forms, and content that spans multiple pages.
 * 
 * @example
 * ```tsx
 * // Basic pagination with both previous and next
 * <Pagination 
 *   previousUrl="/diabetes/symptoms"
 *   previousPage="Symptoms"
 *   nextUrl="/diabetes/treatment"
 *   nextPage="Treatment"
 * />
 * 
 * // Only previous page (last page scenario)
 * <Pagination 
 *   previousUrl="/guide/step-4"
 *   previousPage="Step 4: Review your information"
 * />
 * 
 * // Only next page (first page scenario)
 * <Pagination 
 *   nextUrl="/guide/step-2"
 *   nextPage="Step 2: Medical history"
 * />
 * 
 * // Healthcare guide pagination
 * <Pagination 
 *   previousUrl="/heart-disease/prevention"
 *   previousPage="Prevention"
 *   nextUrl="/heart-disease/living-with"
 *   nextPage="Living with heart disease"
 * />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = ({
  previousUrl,
  previousPage,
  nextUrl,
  nextPage,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const hasPrevious = previousUrl && previousPage;
  const hasNext = nextUrl && nextPage;

  if (!hasPrevious && !hasNext) {
    return null;
  }

  return (
    <PaginationContainer
      className={`nhsuk-pagination${className ? ` ${className}` : ''}`}
      role="navigation"
      aria-label="Pagination"
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      <PaginationList className="nhsuk-list nhsuk-pagination__list">
        {hasPrevious && (
          <PaginationItem className="nhsuk-pagination-item--previous" $position="previous">
            <PaginationLink
              className="nhsuk-pagination__link nhsuk-pagination__link--prev"
              href={previousUrl}
              $direction="prev"
            >
              <ArrowLeft />
              <PaginationContent $direction="prev">
                <PaginationTitle className="nhsuk-pagination__title">
                  Previous
                </PaginationTitle>
                <VisuallyHidden>:</VisuallyHidden>
                <PaginationPage className="nhsuk-pagination__page">
                  {previousPage}
                </PaginationPage>
              </PaginationContent>
            </PaginationLink>
          </PaginationItem>
        )}
        
        {hasNext && (
          <PaginationItem className="nhsuk-pagination-item--next" $position="next">
            <PaginationLink
              className="nhsuk-pagination__link nhsuk-pagination__link--next"
              href={nextUrl}
              $direction="next"
            >
              <ArrowRight />
              <PaginationContent $direction="next">
                <PaginationTitle className="nhsuk-pagination__title">
                  Next
                </PaginationTitle>
                <VisuallyHidden>:</VisuallyHidden>
                <PaginationPage className="nhsuk-pagination__page">
                  {nextPage}
                </PaginationPage>
              </PaginationContent>
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationList>
    </PaginationContainer>
  );
};

Pagination.displayName = 'Pagination';