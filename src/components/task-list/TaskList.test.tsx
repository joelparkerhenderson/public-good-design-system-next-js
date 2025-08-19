import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { TaskList } from './TaskList';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockTaskItems = [
  {
    title: {
      text: 'Exercise'
    },
    href: '#',
    status: {
      text: 'Completed',
      classes: 'nhsuk-task-list__status--completed'
    }
  },
  {
    title: {
      text: 'Personal health'
    },
    href: '#',
    status: {
      text: 'Completed',
      classes: 'nhsuk-task-list__status--completed'
    }
  },
  {
    title: {
      text: 'Family health history'
    },
    hint: {
      text: 'Details of your parents, brothers and sisters'
    },
    href: '#',
    status: {
      tag: {
        text: 'Incomplete',
        variant: 'blue'
      }
    }
  },
  {
    title: {
      text: 'Smoking history'
    },
    href: '#',
    status: {
      tag: {
        text: 'Incomplete',
        variant: 'blue'
      }
    }
  },
  {
    title: {
      text: 'Blood test'
    },
    status: {
      text: 'Cannot start yet',
      classes: 'nhsuk-task-list__status--cannot-start-yet'
    }
  }
];

describe('TaskList', () => {
  describe('Basic functionality', () => {
    it('renders task list with items', () => {
      render(
        <TestWrapper>
          <TaskList items={mockTaskItems} />
        </TestWrapper>
      );

      expect(screen.getByText('Exercise')).toBeInTheDocument();
      expect(screen.getByText('Personal health')).toBeInTheDocument();
      expect(screen.getByText('Family health history')).toBeInTheDocument();
      expect(screen.getByText('Smoking history')).toBeInTheDocument();
      expect(screen.getByText('Blood test')).toBeInTheDocument();
    });

    it('renders as unordered list', () => {
      const { container } = render(
        <TestWrapper>
          <TaskList items={mockTaskItems} />
        </TestWrapper>
      );

      const taskList = container.querySelector('.nhsuk-task-list');
      expect(taskList?.tagName).toBe('UL');
    });

    it('renders task items as list items', () => {
      render(
        <TestWrapper>
          <TaskList items={mockTaskItems} />
        </TestWrapper>
      );

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(5);
    });
  });

  describe('Task titles', () => {
    it('renders task titles with text content', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Test task' },
            status: { text: 'Pending' }
          }]} />
        </TestWrapper>
      );

      expect(screen.getByText('Test task')).toBeInTheDocument();
    });

    it('renders task titles with HTML content', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { html: '<strong>Important task</strong>' },
            status: { text: 'Pending' }
          }]} />
        </TestWrapper>
      );

      const element = screen.getByText('Important task');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('STRONG');
    });

    it('renders clickable task titles when href provided', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Clickable task' },
            href: '/task/1',
            status: { text: 'Pending' }
          }]} />
        </TestWrapper>
      );

      const link = screen.getByRole('link', { name: 'Clickable task' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/task/1');
    });

    it('applies custom classes to task titles', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Custom task', classes: 'custom-title-class' },
            status: { text: 'Pending' }
          }]} />
        </TestWrapper>
      );

      const titleElement = screen.getByText('Custom task').closest('a, div');
      expect(titleElement).toHaveClass('custom-title-class');
    });
  });

  describe('Task hints', () => {
    it('renders hint text when provided', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Task with hint' },
            hint: { text: 'This is helpful hint text' },
            status: { text: 'Pending' }
          }]} />
        </TestWrapper>
      );

      expect(screen.getByText('This is helpful hint text')).toBeInTheDocument();
    });

    it('renders hint HTML when provided', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Task with HTML hint' },
            hint: { html: '<em>Emphasized hint</em>' },
            status: { text: 'Pending' }
          }]} />
        </TestWrapper>
      );

      const element = screen.getByText('Emphasized hint');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('EM');
    });

    it('does not render hint when not provided', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Task without hint' },
            status: { text: 'Pending' }
          }]} />
        </TestWrapper>
      );

      const hintElement = document.querySelector('.nhsuk-task-list__hint');
      expect(hintElement).not.toBeInTheDocument();
    });
  });

  describe('Task status', () => {
    it('renders status with tag component', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Task with tag status' },
            status: {
              tag: {
                text: 'In Progress',
                variant: 'blue'
              }
            }
          }]} />
        </TestWrapper>
      );

      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toHaveClass('nhsuk-tag--blue');
    });

    it('renders status with text content', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Task with text status' },
            status: {
              text: 'Completed',
              classes: 'nhsuk-task-list__status--completed'
            }
          }]} />
        </TestWrapper>
      );

      expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    it('renders status with HTML content', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Task with HTML status' },
            status: {
              html: '<strong>Critical</strong>',
              classes: 'custom-status'
            }
          }]} />
        </TestWrapper>
      );

      const element = screen.getByText('Critical');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('STRONG');
    });

    it('applies custom classes to status', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Task with custom status' },
            status: {
              text: 'Custom',
              classes: 'custom-status-class'
            }
          }]} />
        </TestWrapper>
      );

      const statusElement = screen.getByText('Custom').closest('.nhsuk-task-list__status');
      expect(statusElement).toHaveClass('custom-status-class');
    });
  });

  describe('Accessibility', () => {
    it('generates proper IDs for hints and status', () => {
      render(
        <TestWrapper>
          <TaskList 
            idPrefix="test"
            items={[{
              title: { text: 'Task with hint' },
              hint: { text: 'Hint text' },
              href: '/task',
              status: { text: 'Pending' }
            }]} 
          />
        </TestWrapper>
      );

      expect(document.getElementById('test-1-hint')).toBeInTheDocument();
      expect(document.getElementById('test-1-status')).toBeInTheDocument();
    });

    it('links task titles to hints and status with aria-describedby', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Linked task' },
            hint: { text: 'Helpful hint' },
            href: '/task',
            status: { text: 'Pending' }
          }]} />
        </TestWrapper>
      );

      const link = screen.getByRole('link', { name: 'Linked task' });
      expect(link).toHaveAttribute('aria-describedby');
      const ariaDescribedBy = link.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toContain('task-list-1-hint');
      expect(ariaDescribedBy).toContain('task-list-1-status');
    });

    it('works without hints in aria-describedby', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Task without hint' },
            href: '/task',
            status: { text: 'Pending' }
          }]} />
        </TestWrapper>
      );

      const link = screen.getByRole('link', { name: 'Task without hint' });
      const ariaDescribedBy = link.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toBe('task-list-1-status');
      expect(ariaDescribedBy).not.toContain('hint');
    });
  });

  describe('Interactive behavior', () => {
    it('makes whole row clickable for linked tasks', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Clickable task' },
            href: '/task/1',
            status: { text: 'Pending' }
          }]} />
        </TestWrapper>
      );

      const link = screen.getByRole('link', { name: 'Clickable task' });
      await user.click(link);
      
      // The click should work (we can't easily test navigation in jsdom)
      expect(link).toHaveAttribute('href', '/task/1');
    });

    it('adds hover styling for linked tasks', () => {
      render(
        <TestWrapper>
          <TaskList items={[{
            title: { text: 'Linked task' },
            href: '/task',
            status: { text: 'Pending' }
          }]} />
        </TestWrapper>
      );

      const listItem = screen.getByRole('listitem');
      expect(listItem).toHaveClass('nhsuk-task-list__item--with-link');
    });
  });

  describe('Custom attributes', () => {
    it('applies data-testid', () => {
      render(
        <TestWrapper>
          <TaskList 
            items={mockTaskItems}
            data-testid="task-list-test" 
          />
        </TestWrapper>
      );

      expect(screen.getByTestId('task-list-test')).toBeInTheDocument();
    });

    it('applies additional className', () => {
      render(
        <TestWrapper>
          <TaskList 
            items={mockTaskItems}
            className="custom-class" 
          />
        </TestWrapper>
      );

      const taskList = screen.getByRole('list');
      expect(taskList).toHaveClass('custom-class');
      expect(taskList).toHaveClass('nhsuk-task-list');
    });

    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <TaskList 
            items={mockTaskItems}
            attributes={{ 'data-track': 'task-list', 'aria-label': 'Task checklist' }}
          />
        </TestWrapper>
      );

      const taskList = screen.getByRole('list');
      expect(taskList).toHaveAttribute('data-track', 'task-list');
      expect(taskList).toHaveAttribute('aria-label', 'Task checklist');
    });

    it('uses custom idPrefix', () => {
      render(
        <TestWrapper>
          <TaskList 
            idPrefix="custom"
            items={[{
              title: { text: 'Task' },
              hint: { text: 'Hint' },
              status: { text: 'Status' }
            }]}
          />
        </TestWrapper>
      );

      expect(document.getElementById('custom-1-hint')).toBeInTheDocument();
      expect(document.getElementById('custom-1-status')).toBeInTheDocument();
    });
  });

  describe('Healthcare use cases', () => {
    const healthcareTaskItems = [
      {
        title: { text: 'Complete pre-admission assessment' },
        hint: { text: 'Required before surgery' },
        href: '/assessment',
        status: {
          tag: {
            text: 'Incomplete',
            variant: 'blue' as const
          }
        }
      },
      {
        title: { text: 'Blood work' },
        status: {
          text: 'Completed',
          classes: 'nhsuk-task-list__status--completed'
        }
      },
      {
        title: { text: 'Medication review' },
        hint: { text: 'Check with pharmacist' },
        status: {
          text: 'Cannot start yet',
          classes: 'nhsuk-task-list__status--cannot-start-yet'
        }
      }
    ];

    it('renders healthcare task list correctly', () => {
      render(
        <TestWrapper>
          <TaskList items={healthcareTaskItems} />
        </TestWrapper>
      );

      expect(screen.getByText('Complete pre-admission assessment')).toBeInTheDocument();
      expect(screen.getByText('Required before surgery')).toBeInTheDocument();
      expect(screen.getByText('Blood work')).toBeInTheDocument();
      expect(screen.getByText('Medication review')).toBeInTheDocument();
      expect(screen.getByText('Incomplete')).toBeInTheDocument();
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.getByText('Cannot start yet')).toBeInTheDocument();
    });

    it('supports patient care workflow tasks', () => {
      render(
        <TestWrapper>
          <TaskList items={[
            {
              title: { text: 'Patient admission' },
              status: {
                tag: { text: 'Complete', variant: 'green' }
              }
            },
            {
              title: { text: 'Initial assessment' },
              status: {
                tag: { text: 'In progress', variant: 'blue' }
              }
            },
            {
              title: { text: 'Treatment plan' },
              status: {
                text: 'Not started',
                classes: 'nhsuk-task-list__status--cannot-start-yet'
              }
            }
          ]} />
        </TestWrapper>
      );

      expect(screen.getByText('Patient admission')).toBeInTheDocument();
      expect(screen.getByText('Complete')).toBeInTheDocument();
      expect(screen.getByText('In progress')).toBeInTheDocument();
      expect(screen.getByText('Not started')).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(TaskList.displayName).toBe('TaskList');
    });
  });
});