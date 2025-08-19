import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Input } from './Input';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Input', () => {
  describe('Basic functionality', () => {
    it('renders input with required props', () => {
      render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Label" }}
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      const label = screen.getByText('Test Label');
      
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('name', 'test-input');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('id', 'test-input');
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('for', 'test-input');
    });

    it('renders input with custom ID', () => {
      render(
        <TestWrapper>
          <Input 
            id="custom-id"
            name="test-input"
            label={{ text: "Test Label" }}
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      const label = screen.getByText('Test Label');
      
      expect(input).toHaveAttribute('id', 'custom-id');
      expect(label).toHaveAttribute('for', 'custom-id');
    });

    it('renders input with different types', () => {
      const { rerender } = render(
        <TestWrapper>
          <Input 
            name="email-input"
            type="email"
            label={{ text: "Email" }}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

      rerender(
        <TestWrapper>
          <Input 
            name="password-input"
            type="password"
            label={{ text: "Password" }}
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    });

    it('renders input with initial value', () => {
      render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Label" }}
            value="Initial value"
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('Initial value');
    });
  });

  describe('Label variations', () => {
    it('renders label with HTML content', () => {
      render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ html: "Label with <strong>bold</strong> text" }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('bold')).toBeInTheDocument();
      expect(screen.getByText('bold').tagName).toBe('STRONG');
    });

    it('renders label as page heading', () => {
      render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ 
              text: "Page Heading Label",
              isPageHeading: true
            }}
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Page Heading Label');
    });

    it('renders label with custom classes', () => {
      const { container } = render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ 
              text: "Custom Label",
              classes: "nhsuk-label--l custom-class"
            }}
          />
        </TestWrapper>
      );

      const label = container.querySelector('label');
      expect(label).toHaveClass('nhsuk-label');
      expect(label).toHaveClass('nhsuk-label--l');
      expect(label).toHaveClass('custom-class');
    });
  });

  describe('Hint functionality', () => {
    it('renders input with hint text', () => {
      render(
        <TestWrapper>
          <Input 
            name="nhs-number"
            label={{ text: "NHS Number" }}
            hint={{ text: "It's a 10-digit number, for example 485 777 3456" }}
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      const hint = screen.getByText("It's a 10-digit number, for example 485 777 3456");
      
      expect(hint).toBeInTheDocument();
      expect(hint).toHaveAttribute('id', 'nhs-number-hint');
      expect(input).toHaveAttribute('aria-describedby', 'nhs-number-hint');
    });

    it('renders hint with HTML content', () => {
      render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Label" }}
            hint={{ html: "Hint with <strong>bold</strong> text" }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('bold')).toBeInTheDocument();
      expect(screen.getByText('bold').tagName).toBe('STRONG');
    });

    it('renders hint with custom classes', () => {
      const { container } = render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Label" }}
            hint={{ 
              text: "Custom hint",
              classes: "custom-hint-class"
            }}
          />
        </TestWrapper>
      );

      const hint = container.querySelector('.nhsuk-hint');
      expect(hint).toHaveClass('custom-hint-class');
    });
  });

  describe('Error handling', () => {
    it('renders input with error message', () => {
      render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Label" }}
            errorMessage={{ text: "Enter a valid value" }}
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      const error = screen.getByText('Enter a valid value');
      
      expect(error).toBeInTheDocument();
      expect(error).toHaveAttribute('id', 'test-input-error');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
      expect(input).toHaveClass('nhsuk-input--error');
    });

    it('renders error message with HTML content', () => {
      render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Label" }}
            errorMessage={{ html: "Error with <strong>bold</strong> text" }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('bold')).toBeInTheDocument();
      expect(screen.getByText('bold').tagName).toBe('STRONG');
    });

    it('renders input with both hint and error', () => {
      render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Label" }}
            hint={{ text: "Help text" }}
            errorMessage={{ text: "Error message" }}
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-hint test-input-error');
      expect(screen.getByText('Help text')).toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('applies error styling to form group', () => {
      const { container } = render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Label" }}
            errorMessage={{ text: "Error message" }}
          />
        </TestWrapper>
      );

      const formGroup = container.querySelector('.nhsuk-form-group');
      expect(formGroup).toHaveClass('nhsuk-form-group--error');
    });
  });

  describe('Prefix and suffix', () => {
    it('renders input with prefix', () => {
      render(
        <TestWrapper>
          <Input 
            name="cost"
            label={{ text: "Cost" }}
            prefix="£"
          />
        </TestWrapper>
      );

      const prefix = screen.getByText('£');
      expect(prefix).toBeInTheDocument();
      expect(prefix).toHaveAttribute('aria-hidden', 'true');
      expect(prefix).toHaveClass('nhsuk-input__prefix');
    });

    it('renders input with suffix', () => {
      render(
        <TestWrapper>
          <Input 
            name="weight"
            label={{ text: "Weight" }}
            suffix="kg"
          />
        </TestWrapper>
      );

      const suffix = screen.getByText('kg');
      expect(suffix).toBeInTheDocument();
      expect(suffix).toHaveAttribute('aria-hidden', 'true');
      expect(suffix).toHaveClass('nhsuk-input__suffix');
    });

    it('renders input with both prefix and suffix', () => {
      render(
        <TestWrapper>
          <Input 
            name="cost-per-item"
            label={{ text: "Cost per item" }}
            prefix="£"
            suffix="per item"
          />
        </TestWrapper>
      );

      expect(screen.getByText('£')).toBeInTheDocument();
      expect(screen.getByText('per item')).toBeInTheDocument();
    });

    it('renders wrapper when prefix or suffix present', () => {
      const { container } = render(
        <TestWrapper>
          <Input 
            name="cost"
            label={{ text: "Cost" }}
            prefix="£"
          />
        </TestWrapper>
      );

      const wrapper = container.querySelector('.nhsuk-input__wrapper');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Width variations', () => {
    it('applies width classes correctly', () => {
      const widths = ['2', '3', '4', '5', '10', '20', '30'];
      
      widths.forEach(width => {
        const { container } = render(
          <TestWrapper>
            <Input 
              name={`width-${width}`}
              label={{ text: `Width ${width}` }}
              classes={`nhsuk-input--width-${width}`}
            />
          </TestWrapper>
        );

        const input = container.querySelector('input');
        expect(input).toHaveClass(`nhsuk-input--width-${width}`);
      });
    });
  });

  describe('Attributes and accessibility', () => {
    it('applies autocomplete attribute', () => {
      render(
        <TestWrapper>
          <Input 
            name="postcode"
            label={{ text: "Postcode" }}
            autocomplete="postal-code"
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('autocomplete', 'postal-code');
    });

    it('applies pattern attribute', () => {
      render(
        <TestWrapper>
          <Input 
            name="phone"
            label={{ text: "Phone" }}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('pattern', '[0-9]{3}-[0-9]{3}-[0-9]{4}');
    });

    it('applies inputmode attribute', () => {
      render(
        <TestWrapper>
          <Input 
            name="phone"
            label={{ text: "Phone" }}
            inputMode="tel"
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('inputmode', 'tel');
    });

    it('applies spellcheck attribute', () => {
      render(
        <TestWrapper>
          <Input 
            name="name"
            label={{ text: "Name" }}
            spellcheck={false}
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('spellcheck', 'false');
    });

    it('applies custom describedBy', () => {
      render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Label" }}
            describedBy="custom-description"
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'custom-description');
    });

    it('combines custom describedBy with hint and error IDs', () => {
      render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Label" }}
            describedBy="custom-description"
            hint={{ text: "Help text" }}
            errorMessage={{ text: "Error message" }}
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'custom-description test-input-hint test-input-error');
    });

    it('applies custom attributes to input', () => {
      render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Label" }}
            attributes={{ 'data-custom': 'value' }}
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Form group customization', () => {
    it('applies custom form group classes', () => {
      const { container } = render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Label" }}
            formGroup={{ classes: "custom-form-group" }}
          />
        </TestWrapper>
      );

      const formGroup = container.querySelector('.nhsuk-form-group');
      expect(formGroup).toHaveClass('custom-form-group');
    });

    it('applies custom form group attributes', () => {
      const { container } = render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Label" }}
            formGroup={{ attributes: { 'data-testid': 'form-group' } }}
          />
        </TestWrapper>
      );

      const formGroup = container.querySelector('.nhsuk-form-group');
      expect(formGroup).toHaveAttribute('data-testid', 'form-group');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders NHS number input', () => {
      render(
        <TestWrapper>
          <Input 
            name="nhs-number"
            label={{ text: "NHS Number" }}
            hint={{ text: "It's a 10-digit number, for example 485 777 3456" }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]{10}"
            autocomplete="off"
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('inputmode', 'numeric');
      expect(input).toHaveAttribute('pattern', '[0-9]{10}');
      expect(screen.getByText(/10-digit number/)).toBeInTheDocument();
    });

    it('renders email input for patient communications', () => {
      render(
        <TestWrapper>
          <Input 
            name="email"
            type="email"
            label={{ text: "Email address" }}
            hint={{ text: "We'll only use this to send you appointment confirmations and test results" }}
            autocomplete="email"
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('autocomplete', 'email');
      expect(screen.getByText(/appointment confirmations/)).toBeInTheDocument();
    });

    it('renders postcode input with validation', () => {
      render(
        <TestWrapper>
          <Input 
            name="postcode"
            label={{ text: "Postcode" }}
            hint={{ text: "For example, SW1A 1AA" }}
            classes="nhsuk-input--width-10"
            autocomplete="postal-code"
            pattern="[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2}"
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('autocomplete', 'postal-code');
      expect(input).toHaveClass('nhsuk-input--width-10');
      expect(screen.getByText('For example, SW1A 1AA')).toBeInTheDocument();
    });

    it('renders phone number input', () => {
      render(
        <TestWrapper>
          <Input 
            name="phone"
            type="tel"
            label={{ text: "Mobile phone number" }}
            hint={{ text: "We may send appointment reminders by text message" }}
            inputMode="tel"
            autocomplete="tel"
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'tel');
      expect(input).toHaveAttribute('inputmode', 'tel');
      expect(input).toHaveAttribute('autocomplete', 'tel');
    });

    it('renders date of birth input', () => {
      render(
        <TestWrapper>
          <Input 
            name="date-of-birth"
            label={{ text: "Date of birth" }}
            hint={{ text: "For example, 27 3 1980" }}
            type="text"
            inputMode="numeric"
            autocomplete="bday"
            pattern="[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}"
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('autocomplete', 'bday');
      expect(input).toHaveAttribute('inputmode', 'numeric');
      expect(screen.getByText('For example, 27 3 1980')).toBeInTheDocument();
    });

    it('renders prescription cost input with prefix', () => {
      render(
        <TestWrapper>
          <Input 
            name="prescription-cost"
            label={{ text: "Prescription charge" }}
            hint={{ text: "Most prescriptions cost £9.65 per item" }}
            prefix="£"
            type="number"
            inputMode="decimal"
            classes="nhsuk-input--width-5"
          />
        </TestWrapper>
      );

      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('type', 'number');
      expect(input).toHaveAttribute('inputmode', 'decimal');
      expect(screen.getByText('£')).toBeInTheDocument();
      expect(screen.getByText(/£9.65 per item/)).toBeInTheDocument();
    });

    it('renders weight input with suffix', () => {
      render(
        <TestWrapper>
          <Input 
            name="weight"
            label={{ text: "Your current weight" }}
            hint={{ text: "Enter your weight in kilograms" }}
            suffix="kg"
            type="number"
            inputMode="decimal"
            classes="nhsuk-input--width-5"
          />
        </TestWrapper>
      );

      expect(screen.getByText('kg')).toBeInTheDocument();
      expect(screen.getByText(/weight in kilograms/)).toBeInTheDocument();
    });

    it('renders GP practice search input', () => {
      render(
        <TestWrapper>
          <Input 
            name="gp-search"
            type="search"
            label={{ text: "Find your GP practice" }}
            hint={{ text: "Search by practice name, address, or postcode" }}
            placeholder="Enter practice name or postcode"
            spellcheck={false}
          />
        </TestWrapper>
      );

      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('type', 'search');
      expect(input).toHaveAttribute('spellcheck', 'false');
      expect(input).toHaveAttribute('placeholder', 'Enter practice name or postcode');
    });
  });

  describe('Error validation examples', () => {
    it('renders NHS number with validation error', () => {
      render(
        <TestWrapper>
          <Input 
            name="nhs-number"
            label={{ text: "NHS Number" }}
            hint={{ text: "It's a 10-digit number, for example 485 777 3456" }}
            errorMessage={{ text: "Enter your NHS number" }}
            value=""
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('nhsuk-input--error');
      expect(screen.getByText('Enter your NHS number')).toBeInTheDocument();
      expect(input).toHaveAttribute('aria-describedby', 'nhs-number-hint nhs-number-error');
    });

    it('renders email with format validation error', () => {
      render(
        <TestWrapper>
          <Input 
            name="email"
            type="email"
            label={{ text: "Email address" }}
            errorMessage={{ html: "Enter an email address in the correct format, like <strong>name@example.com</strong>" }}
            value="invalid-email"
          />
        </TestWrapper>
      );

      expect(screen.getByText('name@example.com')).toBeInTheDocument();
      expect(screen.getByText('name@example.com').tagName).toBe('STRONG');
    });

    it('renders postcode with format validation error', () => {
      render(
        <TestWrapper>
          <Input 
            name="postcode"
            label={{ text: "Postcode" }}
            hint={{ text: "For example, SW1A 1AA" }}
            errorMessage={{ text: "Enter a postcode, like AA1 1AA" }}
            classes="nhsuk-input--width-10"
            value="INVALID"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Enter a postcode, like AA1 1AA')).toBeInTheDocument();
    });
  });

  describe('Input interaction', () => {
    it('handles user input correctly', () => {
      render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Input" }}
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'User typed text' } });
      expect(input).toHaveValue('User typed text');
    });

    it('handles focus and blur events', () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      
      render(
        <TestWrapper>
          <Input 
            name="test-input"
            label={{ text: "Test Input" }}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      
      fireEvent.focus(input);
      expect(onFocus).toHaveBeenCalledTimes(1);
      
      fireEvent.blur(input);
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Input.displayName).toBe('Input');
    });
  });

  describe('Forward ref functionality', () => {
    it('forwards ref to input element', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      
      render(
        <TestWrapper>
          <Input 
            ref={inputRef}
            name="test-input"
            label={{ text: "Test Input" }}
          />
        </TestWrapper>
      );

      expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
      expect(inputRef.current?.name).toBe('test-input');
    });
  });
});