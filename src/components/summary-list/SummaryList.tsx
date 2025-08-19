'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface SummaryListAction {
  /** The value of the link's href attribute */
  href: string;
  /** Text to use within the action link */
  text?: string;
  /** HTML to use within the action link */
  html?: string;
  /** Visually hidden text for accessibility */
  visuallyHiddenText?: string;
}

export interface SummaryListRow {
  /** Additional classes for the row */
  classes?: string;
  /** The key (label) for this row */
  key: {
    /** Text for the key */
    text?: string;
    /** HTML for the key */
    html?: string;
    /** Additional classes for the key */
    classes?: string;
  };
  /** The value for this row */
  value: {
    /** Text for the value */
    text?: string;
    /** HTML for the value */
    html?: string;
    /** Additional classes for the value */
    classes?: string;
  };
  /** Action links for this row */
  actions?: {
    /** Array of action items */
    items?: SummaryListAction[];
    /** Additional classes for the actions */
    classes?: string;
  };
}

export interface SummaryListProps extends BaseComponentProps {
  /** Array of rows for the summary list */
  rows: SummaryListRow[];
  /** Additional CSS classes for the summary list */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const SummaryListContainer = styled.dl`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  margin: 0 0 ${({ theme }) => theme.spacing[6]} 0;
  
  &.nhsuk-summary-list--no-border .nhsuk-summary-list__row {
    border-bottom: none;
  }
`;

const SummaryListRow = styled.div<{ $hasActions?: boolean; $noActions?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[3]} 0;
  
  &:first-child {
    padding-top: 0;
  }
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  &.nhsuk-summary-list__row--no-border {
    border-bottom: none;
  }
  
  /* Adjust spacing when no actions column */
  ${({ $noActions }) => $noActions && `
    .nhsuk-summary-list__key,
    .nhsuk-summary-list__value {
      flex-basis: 50%;
    }
  `}
  
  @media (max-width: 768px) {
    display: block;
    
    .nhsuk-summary-list__key,
    .nhsuk-summary-list__value,
    .nhsuk-summary-list__actions {
      flex-basis: 100%;
    }
  }
`;

const SummaryListKey = styled.dt`
  flex-basis: 30%;
  flex-shrink: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  padding-right: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing[1]};
    padding-right: 0;
  }
`;

const SummaryListValue = styled.dd`
  flex-basis: 50%;
  flex-grow: 1;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  word-wrap: break-word;
  
  p {
    margin: 0 0 ${({ theme }) => theme.spacing[2]} 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (max-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }
`;

const SummaryListActions = styled.dd`
  flex-basis: 20%;
  flex-shrink: 0;
  margin: 0;
  text-align: right;
  
  @media (max-width: 768px) {
    text-align: left;
    margin-bottom: 0;
  }
`;

const ActionLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover || theme.colors.primary};
    text-decoration: none;
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.focus};
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
  }
`;

const ActionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ActionsListItem = styled.li`
  margin: 0 0 ${({ theme }) => theme.spacing[1]} 0;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (min-width: 769px) {
    display: inline;
    
    &:not(:last-child)::after {
      content: ' ';
      margin: 0 ${({ theme }) => theme.spacing[2]};
      color: ${({ theme }) => theme.colors.textMuted};
    }
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
 * Summary List Component
 * 
 * Used to summarize information, for example, a user's responses at the end of a form.
 * Often used for check your answers patterns and displaying structured data with
 * optional action links.
 * 
 * @example
 * ```tsx
 * // Basic summary list
 * <SummaryList 
 *   rows={[
 *     {
 *       key: { text: "Name" },
 *       value: { text: "Sarah Philips" }
 *     },
 *     {
 *       key: { text: "Date of birth" },
 *       value: { text: "5 January 1978" }
 *     }
 *   ]}
 * />
 * 
 * // With actions
 * <SummaryList 
 *   rows={[
 *     {
 *       key: { text: "Name" },
 *       value: { text: "Sarah Philips" },
 *       actions: {
 *         items: [
 *           { 
 *             href: "/edit-name", 
 *             text: "Change",
 *             visuallyHiddenText: "name"
 *           }
 *         ]
 *       }
 *     }
 *   ]}
 * />
 * ```
 */
export const SummaryList: React.FC<SummaryListProps> = ({
  rows,
  classes,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  // Check if any row has actions to determine layout
  const hasAnyActions = rows.some(row => row.actions?.items && row.actions.items.length > 0);

  const renderActionLink = (action: SummaryListAction) => {
    return (
      <ActionLink href={action.href}>
        {action.html ? (
          <span dangerouslySetInnerHTML={{ __html: action.html }} />
        ) : (
          action.text
        )}
        {action.visuallyHiddenText && (
          <VisuallyHidden> {action.visuallyHiddenText}</VisuallyHidden>
        )}
      </ActionLink>
    );
  };

  const renderRow = (row: SummaryListRow, index: number) => {
    const hasRowActions = row.actions?.items && row.actions.items.length > 0;
    const noActionsInRow = hasAnyActions && !hasRowActions;

    const rowClasses = [
      'nhsuk-summary-list__row',
      noActionsInRow ? 'nhsuk-summary-list__row--no-actions' : '',
      row.classes
    ].filter(Boolean).join(' ');

    const keyClasses = [
      'nhsuk-summary-list__key',
      row.key.classes
    ].filter(Boolean).join(' ');

    const valueClasses = [
      'nhsuk-summary-list__value',
      row.value.classes
    ].filter(Boolean).join(' ');

    return (
      <SummaryListRow 
        key={index}
        className={rowClasses}
        $hasActions={hasAnyActions}
        $noActions={noActionsInRow}
      >
        <SummaryListKey className={keyClasses}>
          {row.key.html ? (
            <span dangerouslySetInnerHTML={{ __html: row.key.html }} />
          ) : (
            row.key.text
          )}
        </SummaryListKey>
        
        <SummaryListValue className={valueClasses}>
          {row.value.html ? (
            <span dangerouslySetInnerHTML={{ __html: row.value.html }} />
          ) : (
            row.value.text
          )}
        </SummaryListValue>
        
        {hasRowActions && (
          <SummaryListActions 
            className={`nhsuk-summary-list__actions ${row.actions?.classes || ''}`.trim()}
          >
            {row.actions!.items!.length === 1 ? (
              renderActionLink(row.actions!.items![0])
            ) : (
              <ActionsList className="nhsuk-summary-list__actions-list">
                {row.actions!.items!.map((action, actionIndex) => (
                  <ActionsListItem 
                    key={actionIndex}
                    className="nhsuk-summary-list__actions-list-item"
                  >
                    {renderActionLink(action)}
                  </ActionsListItem>
                ))}
              </ActionsList>
            )}
          </SummaryListActions>
        )}
      </SummaryListRow>
    );
  };

  const summaryListClasses = [
    'nhsuk-summary-list',
    classes
  ].filter(Boolean).join(' ');

  return (
    <SummaryListContainer
      className={`${summaryListClasses}${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      {rows.map(renderRow)}
    </SummaryListContainer>
  );
};

SummaryList.displayName = 'SummaryList';