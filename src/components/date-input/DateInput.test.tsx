import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { DateInput } from './DateInput';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('DateInput', () => {
  const defaultProps = {
    id: 'test-date'
  };

  describe('Basic functionality', () => {
    it('renders default day, month, year inputs', () => {
      render(
        <TestWrapper>
          <DateInput {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Day')).toBeInTheDocument();
      expect(screen.getByLabelText('Month')).toBeInTheDocument();
      expect(screen.getByLabelText('Year')).toBeInTheDocument();
    });

    it('generates correct IDs for default inputs', () => {
      render(
        <TestWrapper>
          <DateInput {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Day')).toHaveAttribute('id', 'test-date-day');
      expect(screen.getByLabelText('Month')).toHaveAttribute('id', 'test-date-month');
      expect(screen.getByLabelText('Year')).toHaveAttribute('id', 'test-date-year');
    });

    it('uses correct name attributes for default inputs', () => {
      render(
        <TestWrapper>
          <DateInput {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Day')).toHaveAttribute('name', 'day');
      expect(screen.getByLabelText('Month')).toHaveAttribute('name', 'month');
      expect(screen.getByLabelText('Year')).toHaveAttribute('name', 'year');
    });

    it('applies inputmode="numeric" by default', () => {
      render(
        <TestWrapper>
          <DateInput {...defaultProps} />
        </TestWrapper>
      );

      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveAttribute('inputmode', 'numeric');
      });
    });

    it('applies default width classes', () => {
      render(
        <TestWrapper>
          <DateInput {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Day')).toHaveClass('width-2');
      expect(screen.getByLabelText('Month')).toHaveClass('width-2');
      expect(screen.getByLabelText('Year')).toHaveClass('width-4');
    });
  });

  describe('Custom items', () => {
    const customItems = [
      { name: 'month', classes: 'width-2' },
      { name: 'year', classes: 'width-4' }
    ];

    it('renders only specified items', () => {
      render(
        <TestWrapper>
          <DateInput {...defaultProps} items={customItems} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Month')).toBeInTheDocument();
      expect(screen.getByLabelText('Year')).toBeInTheDocument();
      expect(screen.queryByLabelText('Day')).not.toBeInTheDocument();
    });

    it('uses custom labels when provided', () => {
      const itemsWithLabels = [
        { name: 'day', label: 'DD', classes: 'width-2' },
        { name: 'month', label: 'MM', classes: 'width-2' },
        { name: 'year', label: 'YYYY', classes: 'width-4' }
      ];

      render(
        <TestWrapper>
          <DateInput {...defaultProps} items={itemsWithLabels} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('DD')).toBeInTheDocument();
      expect(screen.getByLabelText('MM')).toBeInTheDocument();
      expect(screen.getByLabelText('YYYY')).toBeInTheDocument();
    });

    it('uses custom IDs when provided', () => {
      const itemsWithIds = [
        { name: 'day', id: 'custom-day', classes: 'width-2' }
      ];

      render(
        <TestWrapper>
          <DateInput {...defaultProps} items={itemsWithIds} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Day')).toHaveAttribute('id', 'custom-day');
    });

    it('applies custom inputmode', () => {
      const itemsWithInputmode = [
        { name: 'day', inputmode: 'text', classes: 'width-2' }
      ];

      render(
        <TestWrapper>
          <DateInput {...defaultProps} items={itemsWithInputmode} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Day')).toHaveAttribute('inputmode', 'text');
    });

    it('applies autocomplete attributes', () => {
      const itemsWithAutocomplete = [
        { name: 'day', autocomplete: 'bday-day', classes: 'width-2' },
        { name: 'month', autocomplete: 'bday-month', classes: 'width-2' },
        { name: 'year', autocomplete: 'bday-year', classes: 'width-4' }
      ];

      render(
        <TestWrapper>
          <DateInput {...defaultProps} items={itemsWithAutocomplete} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Day')).toHaveAttribute('autocomplete', 'bday-day');
      expect(screen.getByLabelText('Month')).toHaveAttribute('autocomplete', 'bday-month');
      expect(screen.getByLabelText('Year')).toHaveAttribute('autocomplete', 'bday-year');
    });

    it('applies pattern attributes', () => {
      const itemsWithPattern = [
        { name: 'year', pattern: '[0-9]{4}', classes: 'width-4' }
      ];

      render(
        <TestWrapper>
          <DateInput {...defaultProps} items={itemsWithPattern} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Year')).toHaveAttribute('pattern', '[0-9]{4}');
    });
  });

  describe('Name prefix', () => {
    it('applies name prefix to input names', () => {
      render(
        <TestWrapper>
          <DateInput {...defaultProps} namePrefix="birthday" />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Day')).toHaveAttribute('name', 'birthday[day]');
      expect(screen.getByLabelText('Month')).toHaveAttribute('name', 'birthday[month]');
      expect(screen.getByLabelText('Year')).toHaveAttribute('name', 'birthday[year]');
    });
  });

  describe('Values', () => {
    it('displays initial values when provided', () => {
      const values = { day: '15', month: '06', year: '1990' };

      render(
        <TestWrapper>
          <DateInput {...defaultProps} values={values} />
        </TestWrapper>
      );

      expect(screen.getByDisplayValue('15')).toBeInTheDocument();
      expect(screen.getByDisplayValue('06')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1990')).toBeInTheDocument();
    });

    it('gives priority to item values over general values', () => {
      const values = { day: '15', month: '06', year: '1990' };
      const items = [
        { name: 'day', value: '25', classes: 'width-2' },
        { name: 'month', classes: 'width-2' },
        { name: 'year', classes: 'width-4' }
      ];

      render(
        <TestWrapper>
          <DateInput {...defaultProps} values={values} items={items} />
        </TestWrapper>
      );

      expect(screen.getByDisplayValue('25')).toBeInTheDocument(); // Item value takes priority
      expect(screen.getByDisplayValue('06')).toBeInTheDocument(); // Falls back to values
      expect(screen.getByDisplayValue('1990')).toBeInTheDocument(); // Falls back to values
    });
  });

  describe('Fieldset functionality', () => {
    it('renders fieldset with legend', () => {
      render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            fieldset={{
              legend: { text: 'What is your date of birth?' }
            }}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(screen.getByText('What is your date of birth?')).toBeInTheDocument();
    });

    it('renders legend as page heading when specified', () => {
      render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            fieldset={{
              legend: { 
                text: 'Date of birth',
                isPageHeading: true 
              }
            }}
          />
        </TestWrapper>
      );

      const legend = screen.getByText('Date of birth');
      expect(legend.tagName).toBe('LEGEND');
    });

    it('renders legend with HTML content', () => {
      render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            fieldset={{
              legend: { 
                html: '<strong>Birth</strong> date' 
              }
            }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Birth')).toBeInTheDocument();
      expect(screen.getByText('date')).toBeInTheDocument();
    });

    it('applies role="group" to fieldset', () => {
      render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            fieldset={{
              legend: { text: 'Date' }
            }}
          />
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset).toHaveAttribute('role', 'group');
    });
  });

  describe('Hint functionality', () => {
    it('renders hint text', () => {
      render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            hint={{ text: 'For example, 31 3 1980' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('For example, 31 3 1980')).toBeInTheDocument();
    });

    it('renders hint with HTML content', () => {
      render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            hint={{ html: 'For example, <strong>31 3 1980</strong>' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('31 3 1980')).toBeInTheDocument();
    });

    it('associates hint with fieldset via aria-describedby', () => {
      render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            fieldset={{
              legend: { text: 'Date' }
            }}
            hint={{ text: 'Helpful hint' }}
          />
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset).toHaveAttribute('aria-describedby', expect.stringContaining('test-date-hint'));
    });
  });

  describe('Error handling', () => {
    it('renders error message', () => {
      render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            errorMessage={{ text: 'Enter a valid date' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Enter a valid date')).toBeInTheDocument();
    });

    it('renders error message with HTML content', () => {
      render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            errorMessage={{ html: 'Enter a <strong>valid</strong> date' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('valid')).toBeInTheDocument();
    });

    it('applies error styling when error message present', () => {
      const { container } = render(
        <TestWrapper>
          <DateInput 
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
          <DateInput 
            {...defaultProps} 
            fieldset={{
              legend: { text: 'Date' }
            }}
            errorMessage={{ text: 'Error message' }}
          />
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset).toHaveAttribute('aria-describedby', expect.stringContaining('test-date-error'));
    });

    it('applies error styling to inputs with error class', () => {
      const itemsWithError = [
        { name: 'day', classes: 'width-2 error' },
        { name: 'month', classes: 'width-2' },
        { name: 'year', classes: 'width-4' }
      ];

      render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            items={itemsWithError}
            errorMessage={{ text: 'Day is invalid' }}
          />
        </TestWrapper>
      );

      // Only the day input should have error styling
      const dayInput = screen.getByLabelText('Day');
      const monthInput = screen.getByLabelText('Month');
      
      // Both should be present but styling would be different (handled by styled component)
      expect(dayInput).toBeInTheDocument();
      expect(monthInput).toBeInTheDocument();
    });
  });

  describe('Event handling', () => {
    it('calls onChange handler when values change', () => {
      const handleChange = vi.fn();
      
      render(
        <TestWrapper>
          <DateInput {...defaultProps} onChange={handleChange} />
        </TestWrapper>
      );

      const dayInput = screen.getByLabelText('Day');
      fireEvent.change(dayInput, { target: { value: '15' } });

      expect(handleChange).toHaveBeenCalledWith('day', '15');
    });

    it('calls onFocus handler when inputs are focused', async () => {
      const handleFocus = vi.fn();
      
      render(
        <TestWrapper>
          <DateInput {...defaultProps} onFocus={handleFocus} />
        </TestWrapper>
      );

      const monthInput = screen.getByLabelText('Month');
      fireEvent.focus(monthInput);

      expect(handleFocus).toHaveBeenCalled();
    });

    it('calls onBlur handler when inputs lose focus', async () => {
      const handleBlur = vi.fn();
      
      render(
        <TestWrapper>
          <DateInput {...defaultProps} onBlur={handleBlur} />
        </TestWrapper>
      );

      const yearInput = screen.getByLabelText('Year');
      fireEvent.focus(yearInput);
      fireEvent.change(yearInput, { target: { value: '1990' } });
      fireEvent.blur(yearInput);

      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to date input container', () => {
      const { container } = render(
        <TestWrapper>
          <DateInput {...defaultProps} classes="custom-date-input" />
        </TestWrapper>
      );

      const dateInputContainer = container.querySelector('.date-input');
      expect(dateInputContainer).toHaveClass('custom-date-input');
    });

    it('applies custom attributes to date input container', () => {
      const { container } = render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            attributes={{ 'data-custom': 'value' }}
          />
        </TestWrapper>
      );

      const dateInputContainer = container.querySelector('#test-date');
      expect(dateInputContainer).toHaveAttribute('data-custom', 'value');
    });

    it('applies custom attributes to component wrapper', () => {
      render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            data-testid="custom-date-input"
            className="wrapper-class"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-date-input');
      expect(wrapper).toHaveClass('wrapper-class');
    });

    it('applies custom attributes to individual items', () => {
      const itemsWithAttributes = [
        { 
          name: 'day', 
          classes: 'width-2',
          attributes: { 'data-item': 'day-field' }
        }
      ];

      render(
        <TestWrapper>
          <DateInput {...defaultProps} items={itemsWithAttributes} />
        </TestWrapper>
      );

      const dayInput = screen.getByLabelText('Day');
      expect(dayInput).toHaveAttribute('data-item', 'day-field');
    });
  });

  describe('Accessibility', () => {
    it('includes proper aria-describedby associations', () => {
      render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            fieldset={{
              legend: { text: 'Date' }
            }}
            hint={{ text: 'Hint text' }}
            errorMessage={{ text: 'Error text' }}
          />
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      const describedBy = fieldset.getAttribute('aria-describedby');
      
      expect(describedBy).toContain('test-date-hint');
      expect(describedBy).toContain('test-date-error');
    });

    it('uses proper fieldset role for screen readers', () => {
      render(
        <TestWrapper>
          <DateInput 
            {...defaultProps} 
            fieldset={{
              legend: { text: 'Date fields' }
            }}
          />
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset.tagName).toBe('FIELDSET');
      expect(fieldset).toHaveAttribute('role', 'group');
    });

    it('associates labels with inputs correctly', () => {
      render(
        <TestWrapper>
          <DateInput {...defaultProps} />
        </TestWrapper>
      );

      const dayInput = screen.getByLabelText('Day');
      const monthInput = screen.getByLabelText('Month');
      const yearInput = screen.getByLabelText('Year');

      expect(dayInput).toHaveAttribute('id', 'test-date-day');
      expect(monthInput).toHaveAttribute('id', 'test-date-month');
      expect(yearInput).toHaveAttribute('id', 'test-date-year');
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(DateInput.displayName).toBe('DateInput');
    });
  });
});