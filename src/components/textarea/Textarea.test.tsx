import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Textarea } from './Textarea';
import { vi } from 'vitest';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Textarea', () => {
  describe('Basic functionality', () => {
    it('renders textarea with label', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Test textarea')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('uses name as id when no id provided', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test-name"
            label={{ text: "Test textarea" }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('id', 'test-name');
      expect(textarea).toHaveAttribute('name', 'test-name');
    });

    it('uses custom id when provided', () => {
      render(
        <TestWrapper>
          <Textarea 
            id="custom-id"
            name="test-name"
            label={{ text: "Test textarea" }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('id', 'custom-id');
      expect(textarea).toHaveAttribute('name', 'test-name');
    });

    it('sets default number of rows', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
    });

    it('sets custom number of rows', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            rows={10}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '10');
    });
  });

  describe('Label integration', () => {
    it('associates label with textarea', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test label" }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      const label = screen.getByText('Test label');
      
      expect(label).toHaveAttribute('for', 'test');
      expect(textarea).toHaveAttribute('id', 'test');
    });

    it('renders label as page heading when specified', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ 
              text: "Page heading label",
              isPageHeading: true,
              size: 'l'
            }}
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Page heading label');
    });
  });

  describe('Hint functionality', () => {
    it('renders hint text when provided', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            hint={{ text: "This is a helpful hint" }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('This is a helpful hint')).toBeInTheDocument();
    });

    it('associates hint with textarea using aria-describedby', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            hint={{ text: "This is a helpful hint" }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', 'test-hint');
      
      const hint = screen.getByText('This is a helpful hint');
      expect(hint).toHaveAttribute('id', 'test-hint');
    });

    it('renders hint with HTML content', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            hint={{ html: "This is <strong>important</strong> hint" }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('important')).toBeInTheDocument();
      expect(screen.getByText('important').tagName).toBe('STRONG');
    });
  });

  describe('Error message functionality', () => {
    it('renders error message when provided', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            errorMessage={{ text: "This field has an error" }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('This field has an error')).toBeInTheDocument();
    });

    it('adds error styling when error message provided', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            errorMessage={{ text: "Error message" }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('nhsuk-textarea--error');
      
      const formGroup = textarea.closest('.nhsuk-form-group');
      expect(formGroup).toHaveClass('nhsuk-form-group--error');
    });

    it('associates error message with textarea using aria-describedby', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            errorMessage={{ text: "Error message" }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', 'test-error');
      
      const errorMessage = screen.getByText('Error message');
      expect(errorMessage).toHaveAttribute('id', 'test-error');
    });
  });

  describe('Combined hint and error', () => {
    it('includes both hint and error in aria-describedby', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            hint={{ text: "Helpful hint" }}
            errorMessage={{ text: "Error message" }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      const ariaDescribedBy = textarea.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toContain('test-hint');
      expect(ariaDescribedBy).toContain('test-error');
    });

    it('includes custom describedBy in aria-describedby', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            describedBy="custom-description"
            hint={{ text: "Helpful hint" }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      const ariaDescribedBy = textarea.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toContain('custom-description');
      expect(ariaDescribedBy).toContain('test-hint');
    });
  });

  describe('Value and change handling', () => {
    it('renders with initial value', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            value="Initial value"
            onChange={() => {}}
          />
        </TestWrapper>
      );

      expect(screen.getByDisplayValue('Initial value')).toBeInTheDocument();
    });

    it('renders with default value for uncontrolled component', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            defaultValue="Default value"
          />
        </TestWrapper>
      );

      expect(screen.getByDisplayValue('Default value')).toBeInTheDocument();
    });

    it('calls onChange when text is typed', () => {
      const handleChange = vi.fn();

      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            defaultValue=""
            onChange={handleChange}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, { target: { value: 'Hello' } });

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when textarea loses focus', () => {
      const handleBlur = vi.fn();

      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            onBlur={handleBlur}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      fireEvent.focus(textarea);
      fireEvent.blur(textarea);

      expect(handleBlur).toHaveBeenCalled();
    });

    it('calls onFocus when textarea gains focus', () => {
      const handleFocus = vi.fn();

      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            onFocus={handleFocus}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      fireEvent.focus(textarea);

      expect(handleFocus).toHaveBeenCalled();
    });
  });

  describe('Attributes and properties', () => {
    it('applies autocomplete attribute', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            autocomplete="street-address"
          />
        </TestWrapper>
      );

      expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'street-address');
    });

    it('applies disabled state', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            disabled
          />
        </TestWrapper>
      );

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('applies readonly state', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            readOnly
          />
        </TestWrapper>
      );

      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    it('applies placeholder text', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            placeholder="Enter your text here"
          />
        </TestWrapper>
      );

      expect(screen.getByPlaceholderText('Enter your text here')).toBeInTheDocument();
    });

    it('applies required attribute', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            required
          />
        </TestWrapper>
      );

      expect(screen.getByRole('textbox')).toBeRequired();
    });

    it('applies maxLength attribute', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            maxLength={100}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '100');
    });

    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            attributes={{ 'data-track': 'textarea-input' }}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('textbox')).toHaveAttribute('data-track', 'textarea-input');
    });

    it('applies data-testid', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            data-testid="textarea-test"
          />
        </TestWrapper>
      );

      expect(screen.getByTestId('textarea-test')).toBeInTheDocument();
    });

    it('applies additional className', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            className="custom-class"
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('custom-class');
      expect(textarea).toHaveClass('nhsuk-textarea');
    });
  });

  describe('Form group customization', () => {
    it('applies custom form group classes', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            formGroup={{ classes: 'custom-form-group' }}
          />
        </TestWrapper>
      );

      const formGroup = screen.getByRole('textbox').closest('.nhsuk-form-group');
      expect(formGroup).toHaveClass('custom-form-group');
    });

    it('applies custom form group attributes', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            formGroup={{ attributes: { 'data-form': 'contact' } }}
          />
        </TestWrapper>
      );

      const formGroup = screen.getByRole('textbox').closest('.nhsuk-form-group');
      expect(formGroup).toHaveAttribute('data-form', 'contact');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders patient symptoms textarea', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="symptoms"
            label={{ text: "Describe your symptoms" }}
            hint={{ text: "Please provide as much detail as possible about when symptoms started, severity, and any triggers" }}
            rows={6}
            required
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Describe your symptoms')).toBeInTheDocument();
      expect(screen.getByText(/Please provide as much detail/)).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeRequired();
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6');
    });

    it('renders medical notes textarea with validation', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="medical-notes"
            label={{ text: "Clinical notes" }}
            hint={{ text: "Document patient assessment, treatment plan, and observations" }}
            errorMessage={{ text: "Clinical notes are required for this consultation" }}
            value=""
            onChange={() => {}}
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Clinical notes')).toBeInTheDocument();
      expect(screen.getByText('Document patient assessment, treatment plan, and observations')).toBeInTheDocument();
      expect(screen.getByText('Clinical notes are required for this consultation')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveClass('nhsuk-textarea--error');
    });

    it('renders treatment instructions textarea', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="instructions"
            label={{ text: "Post-treatment instructions" }}
            hint={{ text: "Provide clear guidance for patient care after discharge" }}
            placeholder="Enter detailed instructions for patient care..."
            rows={8}
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Post-treatment instructions')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter detailed instructions for patient care...')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '8');
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="test"
            label={{ text: "Test textarea" }}
            hint={{ text: "Helpful hint" }}
            errorMessage={{ text: "Error message" }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      const label = screen.getByText('Test textarea');
      const hint = screen.getByText('Helpful hint');
      const error = screen.getByText('Error message');

      // Check that all elements have proper IDs and associations
      expect(label).toHaveAttribute('for', 'test');
      expect(textarea).toHaveAttribute('id', 'test');
      expect(hint).toHaveAttribute('id', 'test-hint');
      expect(error).toHaveAttribute('id', 'test-error');
      
      const ariaDescribedBy = textarea.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toContain('test-hint');
      expect(ariaDescribedBy).toContain('test-error');
    });

    it('works with screen readers', () => {
      render(
        <TestWrapper>
          <Textarea 
            name="accessible-textarea"
            label={{ text: "Accessible textarea" }}
            hint={{ text: "This textarea is fully accessible" }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox', { name: 'Accessible textarea' });
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAccessibleName('Accessible textarea');
      expect(textarea).toHaveAccessibleDescription('This textarea is fully accessible');
    });
  });

  describe('Forward ref', () => {
    it('forwards ref to textarea element', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      
      render(
        <TestWrapper>
          <Textarea 
            ref={ref}
            name="test"
            label={{ text: "Test textarea" }}
          />
        </TestWrapper>
      );

      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
      expect(ref.current).toBe(screen.getByRole('textbox'));
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Textarea.displayName).toBe('Textarea');
    });
  });
});