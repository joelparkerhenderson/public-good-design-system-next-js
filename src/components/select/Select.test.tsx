import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Select } from './Select';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Select', () => {
  describe('Basic functionality', () => {
    it('renders select with label and options', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Sort by" }}
            items={[
              { value: "published", text: "Recently published" },
              { value: "updated", text: "Recently updated" },
              { value: "views", text: "Most views" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Sort by')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Recently published' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Recently updated' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Most views' })).toBeInTheDocument();
    });

    it('handles select value change', () => {
      const onChange = vi.fn();
      
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Sort by" }}
            onChange={onChange}
            items={[
              { value: "published", text: "Recently published" },
              { value: "updated", text: "Recently updated" },
              { value: "views", text: "Most views" }
            ]}
          />
        </TestWrapper>
      );

      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'updated' } });
      
      expect(onChange).toHaveBeenCalledWith('updated');
      expect(select).toHaveValue('updated');
    });

    it('respects controlled value', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            value="views"
            label={{ text: "Sort by" }}
            items={[
              { value: "published", text: "Recently published" },
              { value: "updated", text: "Recently updated" },
              { value: "views", text: "Most views" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('combobox')).toHaveValue('views');
    });

    it('uses custom id when provided', () => {
      render(
        <TestWrapper>
          <Select 
            id="custom-select"
            name="test-select"
            label={{ text: "Sort by" }}
            items={[
              { value: "published", text: "Recently published" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('combobox')).toHaveAttribute('id', 'custom-select');
    });

    it('defaults id to name when not provided', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Sort by" }}
            items={[
              { value: "published", text: "Recently published" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('combobox')).toHaveAttribute('id', 'test-select');
    });
  });

  describe('HTML content and formatting', () => {
    it('renders label with HTML content', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ html: "Sort by <strong>preference</strong>" }}
            items={[
              { value: "published", text: "Recently published" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('preference')).toBeInTheDocument();
      expect(screen.getByText('preference').tagName).toBe('STRONG');
    });

    it('handles options with value undefined', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Choose" }}
            items={[
              { text: "Default option" },
              { value: "specific", text: "Specific option" }
            ]}
          />
        </TestWrapper>
      );

      const options = screen.getAllByRole('option');
      expect(options[0]).toHaveValue('Default option'); // Uses text as value
      expect(options[1]).toHaveValue('specific'); // Uses provided value
    });
  });

  describe('Hint functionality', () => {
    it('renders hint text', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Choose location" }}
            hint={{ text: "This can be different to where you went before" }}
            items={[
              { value: "london", text: "London" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('This can be different to where you went before')).toBeInTheDocument();
    });

    it('renders hint with HTML content', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Choose" }}
            hint={{ html: "This can be <strong>different</strong>" }}
            items={[
              { value: "option", text: "Option" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('different')).toBeInTheDocument();
      expect(screen.getByText('different').tagName).toBe('STRONG');
    });

    it('associates hint with select via aria-describedby', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Choose" }}
            hint={{ text: "Hint text" }}
            items={[
              { value: "option", text: "Option" }
            ]}
          />
        </TestWrapper>
      );

      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', 'test-select-hint');
    });
  });

  describe('Error handling', () => {
    it('renders error message', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Choose location" }}
            errorMessage={{ text: "Select a location" }}
            items={[
              { value: "london", text: "London" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Select a location')).toBeInTheDocument();
    });

    it('renders error message with HTML content', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Choose" }}
            errorMessage={{ html: "You <strong>must</strong> select an option" }}
            items={[
              { value: "option", text: "Option" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('must')).toBeInTheDocument();
      expect(screen.getByText('must').tagName).toBe('STRONG');
    });

    it('applies error styling to form group', () => {
      const { container } = render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Choose" }}
            errorMessage={{ text: "Error message" }}
            items={[
              { value: "option", text: "Option" }
            ]}
          />
        </TestWrapper>
      );

      const formGroup = container.querySelector('.nhsuk-form-group');
      expect(formGroup).toHaveClass('nhsuk-form-group--error');
    });

    it('applies error styling to select', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Choose" }}
            errorMessage={{ text: "Error message" }}
            items={[
              { value: "option", text: "Option" }
            ]}
          />
        </TestWrapper>
      );

      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('nhsuk-select--error');
    });

    it('associates error message with select via aria-describedby', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Choose" }}
            errorMessage={{ text: "Error message" }}
            items={[
              { value: "option", text: "Option" }
            ]}
          />
        </TestWrapper>
      );

      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', 'test-select-error');
    });
  });

  describe('Disabled state', () => {
    it('renders disabled select', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            disabled
            label={{ text: "Choose" }}
            items={[
              { value: "option", text: "Option" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('renders disabled individual options', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Choose" }}
            items={[
              { value: "enabled", text: "Enabled option" },
              { value: "disabled", text: "Disabled option", disabled: true }
            ]}
          />
        </TestWrapper>
      );

      const options = screen.getAllByRole('option');
      expect(options[0]).not.toBeDisabled();
      expect(options[1]).toBeDisabled();
    });
  });

  describe('Label as page heading', () => {
    it('renders label as page heading', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ 
              text: "Sort by",
              classes: "nhsuk-label--l",
              isPageHeading: true 
            }}
            items={[
              { value: "option", text: "Option" }
            ]}
          />
        </TestWrapper>
      );

      const label = screen.getByText('Sort by');
      expect(label.tagName).toBe('LABEL');
    });
  });

  describe('ARIA and accessibility', () => {
    it('associates select with hint and error via aria-describedby', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Choose" }}
            hint={{ text: "Hint text" }}
            errorMessage={{ text: "Error message" }}
            items={[
              { value: "option", text: "Option" }
            ]}
          />
        </TestWrapper>
      );

      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', 'test-select-hint test-select-error');
    });

    it('respects custom describedBy', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            describedBy="custom-desc"
            hint={{ text: "Hint text" }}
            label={{ text: "Choose" }}
            items={[
              { value: "option", text: "Option" }
            ]}
          />
        </TestWrapper>
      );

      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', 'custom-desc test-select-hint');
    });
  });

  describe('Selected options', () => {
    it('respects selected property on individual items', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Choose" }}
            items={[
              { value: "option1", text: "Option 1" },
              { value: "option2", text: "Option 2", selected: true },
              { value: "option3", text: "Option 3" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('combobox')).toHaveValue('option2');
    });

    it('value prop overrides selected property', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            value="option3"
            label={{ text: "Choose" }}
            items={[
              { value: "option1", text: "Option 1" },
              { value: "option2", text: "Option 2", selected: true },
              { value: "option3", text: "Option 3" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('combobox')).toHaveValue('option3');
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to select', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            classes="custom-select-class"
            label={{ text: "Choose" }}
            items={[
              { value: "option", text: "Option" }
            ]}
          />
        </TestWrapper>
      );

      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('custom-select-class');
    });

    it('applies custom attributes to select', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            attributes={{ 'data-custom': 'value' }}
            label={{ text: "Choose" }}
            items={[
              { value: "option", text: "Option" }
            ]}
          />
        </TestWrapper>
      );

      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('data-custom', 'value');
    });

    it('applies custom attributes to options', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            label={{ text: "Choose" }}
            items={[
              { 
                value: "option", 
                text: "Option",
                attributes: { 'data-test': 'option-data' }
              }
            ]}
          />
        </TestWrapper>
      );

      const option = screen.getByRole('option', { name: 'Option' });
      expect(option).toHaveAttribute('data-test', 'option-data');
    });

    it('applies custom form group attributes', () => {
      render(
        <TestWrapper>
          <Select 
            name="test-select"
            formGroup={{ 
              classes: "custom-form-group",
              attributes: { 'data-form': 'test' }
            }}
            label={{ text: "Choose" }}
            items={[
              { value: "option", text: "Option" }
            ]}
            data-testid="select-wrapper"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('select-wrapper');
      expect(wrapper).toHaveClass('custom-form-group');
      expect(wrapper).toHaveAttribute('data-form', 'test');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders location selection', () => {
      render(
        <TestWrapper>
          <Select 
            name="location"
            label={{ text: "Choose your preferred hospital" }}
            hint={{ text: "Select the hospital closest to you" }}
            items={[
              { value: "", text: "Choose hospital" },
              { value: "royal-london", text: "Royal London Hospital" },
              { value: "guys", text: "Guy's Hospital" },
              { value: "st-thomas", text: "St Thomas' Hospital" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Choose your preferred hospital')).toBeInTheDocument();
      expect(screen.getByText('Select the hospital closest to you')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Royal London Hospital' })).toBeInTheDocument();
    });

    it('renders appointment type selection', () => {
      render(
        <TestWrapper>
          <Select 
            name="appointment-type"
            label={{ text: "Type of appointment" }}
            items={[
              { value: "", text: "Select appointment type" },
              { value: "routine", text: "Routine check-up" },
              { value: "follow-up", text: "Follow-up appointment" },
              { value: "urgent", text: "Urgent consultation" },
              { value: "specialist", text: "Specialist referral" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Type of appointment')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Routine check-up' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Urgent consultation' })).toBeInTheDocument();
    });

    it('renders priority selection with validation', () => {
      render(
        <TestWrapper>
          <Select 
            name="priority"
            label={{ text: "Urgency level" }}
            errorMessage={{ text: "Please select the urgency level" }}
            items={[
              { value: "", text: "Select urgency" },
              { value: "low", text: "Low - Routine care" },
              { value: "medium", text: "Medium - Within 2 weeks" },
              { value: "high", text: "High - Within 48 hours" },
              { value: "urgent", text: "Urgent - Same day" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Urgency level')).toBeInTheDocument();
      expect(screen.getByText('Please select the urgency level')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'High - Within 48 hours' })).toBeInTheDocument();
    });

    it('renders disabled options for unavailable services', () => {
      render(
        <TestWrapper>
          <Select 
            name="service"
            label={{ text: "Available services" }}
            hint={{ text: "Some services may be temporarily unavailable" }}
            items={[
              { value: "", text: "Choose service" },
              { value: "gp", text: "GP consultation" },
              { value: "blood-test", text: "Blood test", disabled: true },
              { value: "x-ray", text: "X-ray" },
              { value: "vaccination", text: "Vaccination", disabled: true }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('option', { name: 'GP consultation' })).not.toBeDisabled();
      expect(screen.getByRole('option', { name: 'Blood test' })).toBeDisabled();
      expect(screen.getByRole('option', { name: 'Vaccination' })).toBeDisabled();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Select.displayName).toBe('Select');
    });
  });
});