import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Checkboxes } from './Checkboxes';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Checkboxes', () => {
  const defaultProps = {
    name: 'test-checkboxes',
    items: [
      { value: 'option1', text: 'Option 1' },
      { value: 'option2', text: 'Option 2' },
      { value: 'option3', text: 'Option 3' }
    ]
  };

  describe('Basic functionality', () => {
    it('renders checkbox items with labels', () => {
      render(
        <TestWrapper>
          <Checkboxes {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
    });

    it('uses correct name attribute for all checkboxes', () => {
      render(
        <TestWrapper>
          <Checkboxes {...defaultProps} />
        </TestWrapper>
      );

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach(checkbox => {
        expect(checkbox).toHaveAttribute('name', 'test-checkboxes');
      });
    });

    it('generates correct IDs when idPrefix not provided', () => {
      render(
        <TestWrapper>
          <Checkboxes {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Option 1')).toHaveAttribute('id', 'test-checkboxes');
      expect(screen.getByLabelText('Option 2')).toHaveAttribute('id', 'test-checkboxes-2');
      expect(screen.getByLabelText('Option 3')).toHaveAttribute('id', 'test-checkboxes-3');
    });

    it('uses custom idPrefix when provided', () => {
      render(
        <TestWrapper>
          <Checkboxes {...defaultProps} idPrefix="custom-prefix" />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Option 1')).toHaveAttribute('id', 'custom-prefix');
      expect(screen.getByLabelText('Option 2')).toHaveAttribute('id', 'custom-prefix-2');
      expect(screen.getByLabelText('Option 3')).toHaveAttribute('id', 'custom-prefix-3');
    });

    it('handles pre-selected values', () => {
      render(
        <TestWrapper>
          <Checkboxes {...defaultProps} values={['option1', 'option3']} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Option 1')).toBeChecked();
      expect(screen.getByLabelText('Option 2')).not.toBeChecked();
      expect(screen.getByLabelText('Option 3')).toBeChecked();
    });
  });

  describe('Checkbox selection', () => {
    it('allows multiple selections by default', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Checkboxes {...defaultProps} />
        </TestWrapper>
      );

      const option1 = screen.getByLabelText('Option 1');
      const option2 = screen.getByLabelText('Option 2');

      await user.click(option1);
      await user.click(option2);

      expect(option1).toBeChecked();
      expect(option2).toBeChecked();
    });

    it('can uncheck selected items', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Checkboxes {...defaultProps} values={['option1']} />
        </TestWrapper>
      );

      const option1 = screen.getByLabelText('Option 1');
      expect(option1).toBeChecked();

      await user.click(option1);
      expect(option1).not.toBeChecked();
    });

    it('calls onChange handler when selection changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <Checkboxes {...defaultProps} onChange={handleChange} />
        </TestWrapper>
      );

      const option1 = screen.getByLabelText('Option 1');
      await user.click(option1);

      expect(handleChange).toHaveBeenCalledWith(['option1']);
    });
  });

  describe('Fieldset functionality', () => {
    it('renders fieldset with legend', () => {
      render(
        <TestWrapper>
          <Checkboxes 
            {...defaultProps} 
            fieldset={{
              legend: { text: 'What is your preference?' }
            }}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(screen.getByText('What is your preference?')).toBeInTheDocument();
    });

    it('renders legend as page heading when specified', () => {
      render(
        <TestWrapper>
          <Checkboxes 
            {...defaultProps} 
            fieldset={{
              legend: { 
                text: 'Page Heading',
                isPageHeading: true 
              }
            }}
          />
        </TestWrapper>
      );

      const legend = screen.getByText('Page Heading');
      expect(legend.tagName).toBe('LEGEND');
    });

    it('renders legend with HTML content', () => {
      render(
        <TestWrapper>
          <Checkboxes 
            {...defaultProps} 
            fieldset={{
              legend: { 
                html: '<strong>Bold</strong> legend' 
              }
            }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByText('legend')).toBeInTheDocument();
    });
  });

  describe('Hint functionality', () => {
    it('renders hint text', () => {
      render(
        <TestWrapper>
          <Checkboxes 
            {...defaultProps} 
            hint={{ text: 'Select all that apply' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Select all that apply')).toBeInTheDocument();
    });

    it('renders hint with HTML content', () => {
      render(
        <TestWrapper>
          <Checkboxes 
            {...defaultProps} 
            hint={{ html: 'Select <em>all</em> that apply' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('all')).toBeInTheDocument();
    });

    it('associates hint with fieldset via aria-describedby', () => {
      render(
        <TestWrapper>
          <Checkboxes 
            {...defaultProps} 
            fieldset={{
              legend: { text: 'Legend' }
            }}
            hint={{ text: 'Helpful hint' }}
          />
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset).toHaveAttribute('aria-describedby', expect.stringContaining('test-checkboxes-hint'));
    });
  });

  describe('Error handling', () => {
    it('renders error message', () => {
      render(
        <TestWrapper>
          <Checkboxes 
            {...defaultProps} 
            errorMessage={{ text: 'Please select an option' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Please select an option')).toBeInTheDocument();
    });

    it('renders error message with HTML content', () => {
      render(
        <TestWrapper>
          <Checkboxes 
            {...defaultProps} 
            errorMessage={{ html: 'Please select <strong>at least one</strong> option' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('at least one')).toBeInTheDocument();
    });

    it('applies error styling when error message present', () => {
      const { container } = render(
        <TestWrapper>
          <Checkboxes 
            {...defaultProps} 
            errorMessage={{ text: 'Error message' }}
          />
        </TestWrapper>
      );

      const formGroup = container.querySelector('.form-group');
      expect(formGroup).toHaveClass('form-group--error');
    });

    it('associates error message with fieldset via aria-describedby', () => {
      render(
        <TestWrapper>
          <Checkboxes 
            {...defaultProps} 
            fieldset={{
              legend: { text: 'Legend' }
            }}
            errorMessage={{ text: 'Error message' }}
          />
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset).toHaveAttribute('aria-describedby', expect.stringContaining('test-checkboxes-error'));
    });
  });

  describe('Individual item hints', () => {
    const itemsWithHints = [
      { 
        value: 'option1', 
        text: 'Option 1',
        hint: { text: 'Hint for option 1' }
      },
      { 
        value: 'option2', 
        text: 'Option 2',
        hint: { text: 'Hint for option 2' }
      }
    ];

    it('renders hints for individual items', () => {
      render(
        <TestWrapper>
          <Checkboxes name="test" items={itemsWithHints} />
        </TestWrapper>
      );

      expect(screen.getByText('Hint for option 1')).toBeInTheDocument();
      expect(screen.getByText('Hint for option 2')).toBeInTheDocument();
    });

    it('associates item hints with checkboxes via aria-describedby', () => {
      render(
        <TestWrapper>
          <Checkboxes name="test" items={itemsWithHints} />
        </TestWrapper>
      );

      const option1 = screen.getByLabelText('Option 1');
      expect(option1).toHaveAttribute('aria-describedby', 'test-item-hint');
    });
  });

  describe('Disabled items', () => {
    const itemsWithDisabled = [
      { value: 'option1', text: 'Option 1' },
      { value: 'option2', text: 'Option 2', disabled: true },
      { value: 'option3', text: 'Option 3' }
    ];

    it('renders disabled items correctly', () => {
      render(
        <TestWrapper>
          <Checkboxes name="test" items={itemsWithDisabled} />
        </TestWrapper>
      );

      const option2 = screen.getByLabelText('Option 2');
      expect(option2).toBeDisabled();
    });

    it('prevents interaction with disabled items', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Checkboxes name="test" items={itemsWithDisabled} />
        </TestWrapper>
      );

      const option2 = screen.getByLabelText('Option 2');
      await user.click(option2);

      expect(option2).not.toBeChecked();
    });
  });

  describe('Dividers', () => {
    const itemsWithDivider = [
      { value: 'option1', text: 'Option 1' },
      { value: 'option2', text: 'Option 2' },
      { divider: 'or' },
      { value: 'none', text: 'None of the above' }
    ];

    it('renders dividers between items', () => {
      render(
        <TestWrapper>
          <Checkboxes name="test" items={itemsWithDivider} />
        </TestWrapper>
      );

      expect(screen.getByText('or')).toBeInTheDocument();
    });

    it('does not render dividers as checkboxes', () => {
      render(
        <TestWrapper>
          <Checkboxes name="test" items={itemsWithDivider} />
        </TestWrapper>
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(3); // Should not include divider
    });
  });

  describe('Exclusive behavior', () => {
    const itemsWithExclusive = [
      { value: 'option1', text: 'Option 1' },
      { value: 'option2', text: 'Option 2' },
      { divider: 'or' },
      { value: 'none', text: 'None of the above', exclusive: true }
    ];

    it('unchecks other items when exclusive item is checked', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Checkboxes name="test" items={itemsWithExclusive} />
        </TestWrapper>
      );

      const option1 = screen.getByLabelText('Option 1');
      const option2 = screen.getByLabelText('Option 2');
      const noneOption = screen.getByLabelText('None of the above');

      // Check regular options first
      await user.click(option1);
      await user.click(option2);
      expect(option1).toBeChecked();
      expect(option2).toBeChecked();

      // Check exclusive option
      await user.click(noneOption);
      expect(noneOption).toBeChecked();
      expect(option1).not.toBeChecked();
      expect(option2).not.toBeChecked();
    });

    it('unchecks exclusive item when regular item is checked', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Checkboxes name="test" items={itemsWithExclusive} values={['none']} />
        </TestWrapper>
      );

      const option1 = screen.getByLabelText('Option 1');
      const noneOption = screen.getByLabelText('None of the above');

      expect(noneOption).toBeChecked();

      await user.click(option1);
      expect(option1).toBeChecked();
      expect(noneOption).not.toBeChecked();
    });
  });

  describe('Conditional content', () => {
    const itemsWithConditional = [
      {
        value: 'email',
        text: 'Email',
        conditional: {
          html: <div data-testid="email-conditional">Enter email address</div>
        }
      },
      {
        value: 'phone',
        text: 'Phone',
        conditional: {
          html: <div data-testid="phone-conditional">Enter phone number</div>
        }
      }
    ];

    it('shows conditional content when item is checked', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Checkboxes name="contact" items={itemsWithConditional} />
        </TestWrapper>
      );

      const emailOption = screen.getByLabelText('Email');
      
      // Conditional content should be hidden initially
      expect(screen.queryByTestId('email-conditional')).not.toBeVisible();

      await user.click(emailOption);
      
      // Conditional content should be visible after checking
      await waitFor(() => {
        expect(screen.getByTestId('email-conditional')).toBeVisible();
      });
    });

    it('hides conditional content when item is unchecked', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Checkboxes name="contact" items={itemsWithConditional} values={['email']} />
        </TestWrapper>
      );

      const emailOption = screen.getByLabelText('Email');
      
      // Conditional content should be visible initially
      expect(screen.getByTestId('email-conditional')).toBeVisible();

      await user.click(emailOption);
      
      // Conditional content should be hidden after unchecking
      await waitFor(() => {
        expect(screen.queryByTestId('email-conditional')).not.toBeVisible();
      });
    });

    it('sets correct ARIA attributes for conditional content', () => {
      render(
        <TestWrapper>
          <Checkboxes name="contact" items={itemsWithConditional} values={['email']} />
        </TestWrapper>
      );

      const emailOption = screen.getByLabelText('Email');
      expect(emailOption).toHaveAttribute('aria-controls', 'conditional-contact');
      expect(emailOption).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to container', () => {
      const { container } = render(
        <TestWrapper>
          <Checkboxes {...defaultProps} classes="custom-checkboxes" />
        </TestWrapper>
      );

      const checkboxesContainer = container.querySelector('.checkboxes');
      expect(checkboxesContainer).toHaveClass('custom-checkboxes');
    });

    it('applies custom attributes to container', () => {
      const { container } = render(
        <TestWrapper>
          <Checkboxes 
            {...defaultProps} 
            attributes={{ 'data-custom': 'value' }}
          />
        </TestWrapper>
      );

      const checkboxesContainer = container.querySelector('[data-module="checkboxes"]');
      expect(checkboxesContainer).toHaveAttribute('data-custom', 'value');
    });

    it('applies custom attributes to component wrapper', () => {
      render(
        <TestWrapper>
          <Checkboxes 
            {...defaultProps} 
            data-testid="custom-checkboxes"
            className="wrapper-class"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-checkboxes');
      expect(wrapper).toHaveClass('wrapper-class');
    });

    it('applies custom attributes to individual items', () => {
      const itemsWithAttributes = [
        { 
          value: 'option1', 
          text: 'Option 1',
          attributes: { 'data-item': 'first' }
        }
      ];

      render(
        <TestWrapper>
          <Checkboxes name="test" items={itemsWithAttributes} />
        </TestWrapper>
      );

      const option1 = screen.getByLabelText('Option 1');
      expect(option1).toHaveAttribute('data-item', 'first');
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Checkboxes.displayName).toBe('Checkboxes');
    });
  });
});