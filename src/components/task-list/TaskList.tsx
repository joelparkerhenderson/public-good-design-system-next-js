'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';
import { Tag, TagProps } from '../tag';

export interface TaskListTitle {
  /** Text content for the title */
  text?: string;
  /** HTML content for the title (takes precedence over text) */
  html?: string;
  /** Additional CSS classes for the title */
  classes?: string;
}

export interface TaskListHint {
  /** Text content for the hint */
  text?: string;
  /** HTML content for the hint (takes precedence over text) */
  html?: string;
}

export interface TaskListStatus {
  /** Tag component for visual status indicator */
  tag?: TagProps;
  /** Text content for status (used if no tag provided) */
  text?: string;
  /** HTML content for status (used if no tag provided) */
  html?: string;
  /** Additional CSS classes for the status container */
  classes?: string;
}

export interface TaskListItem {
  /** Title configuration for the task */
  title: TaskListTitle;
  /** Optional hint text to provide additional context */
  hint?: TaskListHint;
  /** Status configuration for the task */
  status: TaskListStatus;
  /** Link URL for the task (makes the task clickable) */
  href?: string;
  /** Additional CSS classes for the task item */
  classes?: string;
}

export interface TaskListProps extends BaseComponentProps {
  /** Array of task items */
  items: TaskListItem[];
  /** ID prefix for generating unique IDs */
  idPrefix?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const TaskListContainer = styled.ul`
  margin: 0 0 ${({ theme }) => theme.spacing[5]} 0;
  padding: 0;
  list-style-type: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const TaskListItemContainer = styled.li<{ $hasLink: boolean }>`
  display: table;
  position: relative;
  width: 100%;
  margin-bottom: 0;
  padding: calc(${({ theme }) => theme.spacing[2]} + 4px) 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  
  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.grey4};
  }
  
  ${({ $hasLink, theme }) => $hasLink && `
    &:hover {
      background-color: #eaeef1; /* Slightly darker than grey5 for hover */
    }
  `}
`;

const TaskListNameAndHint = styled.div`
  display: table-cell;
  vertical-align: top;
  color: ${({ theme }) => theme.colors.black};
`;

const TaskListLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration-thickness: 3px;
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
  }
  
  /* Create clickable area for whole row */
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const TaskListTitle = styled.div<{ $hasClasses?: boolean }>`
  ${({ $hasClasses }) => !$hasClasses && `
    /* Default title styling when no custom classes */
  `}
`;

const TaskListHintContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.grey1};
`;

const TaskListStatusContainer = styled.div<{ $hasClasses?: boolean }>`
  display: table-cell;
  padding-left: ${({ theme }) => theme.spacing[2]};
  text-align: right;
  vertical-align: top;
  color: ${({ theme }) => theme.colors.black};
  
  ${({ $hasClasses }) => $hasClasses && `
    /* Custom status styling will be applied via classes */
  `}
`;

const TaskListStatusText = styled.div<{ $statusType?: 'completed' | 'cannot-start-yet' }>`
  ${({ $statusType, theme }) => ($statusType === 'completed' || $statusType === 'cannot-start-yet') && `
    padding: calc(${theme.spacing[1]} + 2px) ${theme.spacing[2]} ${theme.spacing[1]} ${theme.spacing[2]};
    text-decoration: none;
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.normal};
    line-height: 1;
  `}
  
  ${({ $statusType, theme }) => $statusType === 'cannot-start-yet' && `
    color: ${theme.colors.grey1};
  `}
`;

/**
 * TaskList Component
 * 
 * A component for displaying a list of tasks with their completion status. 
 * Each task can include a title, optional hint text, and a status indicator 
 * (either as a tag or plain text). Tasks can optionally be clickable links.
 * 
 * @example
 * ```tsx
 * // Basic task list
 * <TaskList 
 *   items={[
 *     {
 *       title: { text: "Complete health assessment" },
 *       href: "/health-assessment",
 *       status: {
 *         tag: {
 *           text: "Incomplete",
 *           variant: "blue"
 *         }
 *       }
 *     },
 *     {
 *       title: { text: "Review medications" },
 *       status: {
 *         text: "Completed",
 *         classes: "nhsuk-task-list__status--completed"
 *       }
 *     }
 *   ]}
 * />
 * ```
 */
export const TaskList: React.FC<TaskListProps> = ({
  items,
  idPrefix = 'task-list',
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const renderTaskTitle = (item: TaskListItem, index: number) => {
    const hintId = item.hint ? `${idPrefix}-${index + 1}-hint` : undefined;
    const statusId = `${idPrefix}-${index + 1}-status`;
    const ariaDescribedBy = [hintId, statusId].filter(Boolean).join(' ');
    
    const titleContent = item.title.html ? (
      <span dangerouslySetInnerHTML={{ __html: item.title.html }} />
    ) : (
      item.title.text
    );
    
    if (item.href) {
      return (
        <TaskListLink
          href={item.href}
          className={`nhsuk-link nhsuk-task-list__link${item.title.classes ? ` ${item.title.classes}` : ''}`}
          aria-describedby={ariaDescribedBy}
        >
          {titleContent}
        </TaskListLink>
      );
    }
    
    return (
      <TaskListTitle 
        className={item.title.classes}
        $hasClasses={!!item.title.classes}
      >
        {titleContent}
      </TaskListTitle>
    );
  };
  
  const renderTaskHint = (item: TaskListItem, index: number) => {
    if (!item.hint) return null;
    
    const hintId = `${idPrefix}-${index + 1}-hint`;
    const hintContent = item.hint.html ? (
      <span dangerouslySetInnerHTML={{ __html: item.hint.html }} />
    ) : (
      item.hint.text
    );
    
    return (
      <TaskListHintContainer 
        id={hintId}
        className="nhsuk-task-list__hint"
      >
        {hintContent}
      </TaskListHintContainer>
    );
  };
  
  const renderTaskStatus = (item: TaskListItem, index: number) => {
    const statusId = `${idPrefix}-${index + 1}-status`;
    
    if (item.status.tag) {
      return (
        <TaskListStatusContainer 
          id={statusId}
          className={`nhsuk-task-list__status${item.status.classes ? ` ${item.status.classes}` : ''}`}
          $hasClasses={!!item.status.classes}
        >
          <Tag {...item.status.tag} />
        </TaskListStatusContainer>
      );
    }
    
    const statusContent = item.status.html ? (
      <span dangerouslySetInnerHTML={{ __html: item.status.html }} />
    ) : (
      item.status.text
    );
    
    // Determine status type for styling
    const isCompleted = item.status.classes?.includes('--completed');
    const isCannotStart = item.status.classes?.includes('--cannot-start-yet');
    const statusType = isCompleted ? 'completed' : isCannotStart ? 'cannot-start-yet' : undefined;
    
    return (
      <TaskListStatusContainer 
        id={statusId}
        className={`nhsuk-task-list__status${item.status.classes ? ` ${item.status.classes}` : ''}`}
        $hasClasses={!!item.status.classes}
      >
        <TaskListStatusText $statusType={statusType}>
          {statusContent}
        </TaskListStatusText>
      </TaskListStatusContainer>
    );
  };

  return (
    <TaskListContainer
      className={`nhsuk-task-list${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      {items.map((item, index) => (
        <TaskListItemContainer
          key={index}
          className={`nhsuk-task-list__item${item.href ? ' nhsuk-task-list__item--with-link' : ''}${item.classes ? ` ${item.classes}` : ''}`}
          $hasLink={!!item.href}
        >
          <TaskListNameAndHint className="nhsuk-task-list__name-and-hint">
            {renderTaskTitle(item, index)}
            {renderTaskHint(item, index)}
          </TaskListNameAndHint>
          {renderTaskStatus(item, index)}
        </TaskListItemContainer>
      ))}
    </TaskListContainer>
  );
};

TaskList.displayName = 'TaskList';