import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Radios } from './Radios';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Radios', () => {
  describe('Basic functionality', () => {
    it('renders radio group with fieldset and legend', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            fieldset={{
              legend: { text: "Have you changed your name?" }
            }}
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(screen.getByText('Have you changed your name?')).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'Yes' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'No' })).toBeInTheDocument();
    });

    it('renders radio group without fieldset', () => {
      render(
        <TestWrapper>
          <Radios 
            name="colors"
            items={[
              { value: "red", text: "Red" },
              { value: "green", text: "Green" },
              { value: "blue", text: "Blue" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.queryByRole('group')).not.toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'Red' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'Green' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'Blue' })).toBeInTheDocument();
    });

    it('handles radio selection', () => {
      const onChange = vi.fn();
      
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
            onChange={onChange}
          />
        </TestWrapper>
      );

      const yesRadio = screen.getByRole('radio', { name: 'Yes' });
      const noRadio = screen.getByRole('radio', { name: 'No' });

      fireEvent.click(yesRadio);
      expect(onChange).toHaveBeenCalledWith('yes');
      expect(yesRadio).toBeChecked();

      fireEvent.click(noRadio);
      expect(onChange).toHaveBeenCalledWith('no');
      expect(noRadio).toBeChecked();
      expect(yesRadio).not.toBeChecked();
    });

    it('respects controlled value', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            value="yes"
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('radio', { name: 'Yes' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'No' })).not.toBeChecked();
    });

    it('respects checked property on individual items', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            items={[
              { value: "yes", text: "Yes", checked: true },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('radio', { name: 'Yes' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'No' })).not.toBeChecked();
    });
  });

  describe('HTML content and formatting', () => {
    it('renders radio labels with HTML content', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            items={[
              { value: "yes", html: "Yes, <strong>I have</strong>" },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('I have')).toBeInTheDocument();
      expect(screen.getByText('I have').tagName).toBe('STRONG');
    });

    it('renders legend with HTML content', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            fieldset={{
              legend: { html: "Have you <em>ever</em> changed your name?" }
            }}
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('ever')).toBeInTheDocument();
      expect(screen.getByText('ever').tagName).toBe('EM');
    });
  });

  describe('Hint functionality', () => {
    it('renders hint text', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            fieldset={{
              legend: { text: "Have you changed your name?" }
            }}
            hint={{ text: "This includes changing your last name or spelling your name differently" }}
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('This includes changing your last name or spelling your name differently')).toBeInTheDocument();
    });

    it('renders hint with HTML content', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            fieldset={{
              legend: { text: "Question" }
            }}
            hint={{ html: "This includes <strong>all</strong> name changes" }}
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('all')).toBeInTheDocument();
      expect(screen.getByText('all').tagName).toBe('STRONG');
    });

    it('renders hints on individual radio items', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            fieldset={{
              legend: { text: "How do you want to sign in?" }
            }}
            items={[
              { 
                value: "gateway", 
                text: "Government Gateway",
                hint: { text: "You'll have a user ID if you've registered before" }
              },
              { 
                value: "verify", 
                text: "NHS.UK login",
                hint: { text: "You'll have an account if you've proved your identity" }
              }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText("You'll have a user ID if you've registered before")).toBeInTheDocument();
      expect(screen.getByText("You'll have an account if you've proved your identity")).toBeInTheDocument();
    });
  });

  describe('Error handling', () => {
    it('renders error message', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            fieldset={{
              legend: { text: "Have you changed your name?" }
            }}
            errorMessage={{ text: "Select yes if you have changed your name" }}
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Select yes if you have changed your name')).toBeInTheDocument();
    });

    it('renders error message with HTML content', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            fieldset={{
              legend: { text: "Question" }
            }}
            errorMessage={{ html: "You <strong>must</strong> select an option" }}
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
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
          <Radios 
            name="test-radios"
            errorMessage={{ text: "Error message" }}
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      const formGroup = container.querySelector('.nhsuk-form-group');
      expect(formGroup).toHaveClass('nhsuk-form-group--error');
    });
  });

  describe('Disabled state', () => {
    it('renders disabled radio items', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            items={[
              { value: "yes", text: "Yes", disabled: true },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      const yesRadio = screen.getByRole('radio', { name: 'Yes' });
      const noRadio = screen.getByRole('radio', { name: 'No' });

      expect(yesRadio).toBeDisabled();
      expect(noRadio).not.toBeDisabled();
    });

    it('does not respond to clicks on disabled items', () => {
      const onChange = vi.fn();
      
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            onChange={onChange}
            items={[
              { value: "yes", text: "Yes", disabled: true },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      const yesRadio = screen.getByRole('radio', { name: 'Yes' });
      fireEvent.click(yesRadio);
      
      expect(onChange).not.toHaveBeenCalled();
      expect(yesRadio).not.toBeChecked();
    });
  });

  describe('Dividers', () => {
    it('renders divider between radio items', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            fieldset={{
              legend: { text: "How do you want to sign in?" }
            }}
            items={[
              { value: "gateway", text: "Government Gateway" },
              { value: "nhs", text: "NHS.UK login" },
              { divider: "or" },
              { value: "create", text: "Create an account" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('or')).toBeInTheDocument();
      const divider = screen.getByText('or').parentElement;
      expect(divider).toHaveClass('nhsuk-radios__divider');
    });
  });

  describe('Inline layout', () => {
    it('applies inline styling when specified', () => {
      const { container } = render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            classes="nhsuk-radios--inline"
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      const radiosContainer = container.querySelector('.nhsuk-radios');
      expect(radiosContainer).toHaveClass('nhsuk-radios--inline');
    });
  });

  describe('Legend as page heading', () => {
    it('renders legend as page heading', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            fieldset={{
              legend: { 
                text: "Have you changed your name?",
                classes: "nhsuk-fieldset__legend--l",
                isPageHeading: true 
              }
            }}
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      // The legend should still be a legend element but styled as a heading
      expect(screen.getByText('Have you changed your name?').tagName).toBe('LEGEND');
    });
  });

  describe('Conditional content', () => {
    it('renders conditional content when radio is selected', () => {
      render(
        <TestWrapper>
          <Radios 
            name="contact"
            value="email"
            fieldset={{
              legend: { text: "How would you prefer to be contacted?" }
            }}
            items={[
              { 
                value: "email", 
                text: "Email",
                conditional: {
                  html: '<label for="email">Email address</label><input id="email" name="email" type="email" />'
                }
              },
              { value: "phone", text: "Phone" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Email address')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('hides conditional content when radio is not selected', () => {
      const { container } = render(
        <TestWrapper>
          <Radios 
            name="contact"
            value="phone"
            fieldset={{
              legend: { text: "How would you prefer to be contacted?" }
            }}
            items={[
              { 
                value: "email", 
                text: "Email",
                conditional: {
                  html: '<div data-testid="email-conditional">Email fields</div>'
                }
              },
              { value: "phone", text: "Phone" }
            ]}
          />
        </TestWrapper>
      );

      const conditional = container.querySelector('.nhsuk-radios__conditional--hidden');
      expect(conditional).toBeInTheDocument();
    });

    it('shows conditional content with React children', () => {
      render(
        <TestWrapper>
          <Radios 
            name="contact"
            value="email"
            items={[
              { 
                value: "email", 
                text: "Email",
                conditional: {
                  children: (
                    <div>
                      <label htmlFor="email-input">Email address</label>
                      <input id="email-input" name="email" type="email" />
                    </div>
                  )
                }
              },
              { value: "phone", text: "Phone" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    });
  });

  describe('ARIA and accessibility', () => {
    it('associates fieldset with hint and error via aria-describedby', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            fieldset={{
              legend: { text: "Question" }
            }}
            hint={{ text: "Help text" }}
            errorMessage={{ text: "Error message" }}
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset).toHaveAttribute('aria-describedby', 'test-radios-hint test-radios-error');
    });

    it('associates individual radio items with their hints', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            items={[
              { 
                value: "gateway", 
                text: "Gateway",
                hint: { text: "Gateway hint" }
              }
            ]}
          />
        </TestWrapper>
      );

      const radio = screen.getByRole('radio', { name: 'Gateway' });
      expect(radio).toHaveAttribute('aria-describedby', 'test-radios-item-hint');
    });

    it('sets aria-controls and aria-expanded for conditional content', () => {
      render(
        <TestWrapper>
          <Radios 
            name="contact"
            value="email"
            items={[
              { 
                value: "email", 
                text: "Email",
                conditional: {
                  html: '<div>Email fields</div>'
                }
              }
            ]}
          />
        </TestWrapper>
      );

      const radio = screen.getByRole('radio', { name: 'Email' });
      expect(radio).toHaveAttribute('aria-controls', 'conditional-contact');
      expect(radio).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to radios container', () => {
      const { container } = render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            classes="custom-radios-class"
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      const radiosContainer = container.querySelector('.nhsuk-radios');
      expect(radiosContainer).toHaveClass('custom-radios-class');
    });

    it('applies custom attributes to radios container', () => {
      const { container } = render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            attributes={{ 'data-custom': 'value' }}
            items={[
              { value: "yes", text: "Yes" },
              { value: "no", text: "No" }
            ]}
          />
        </TestWrapper>
      );

      const radiosContainer = container.querySelector('.nhsuk-radios');
      expect(radiosContainer).toHaveAttribute('data-custom', 'value');
    });

    it('applies custom attributes to individual radio items', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            items={[
              { 
                value: "yes", 
                text: "Yes",
                attributes: { 'data-test': 'yes-radio' }
              }
            ]}
          />
        </TestWrapper>
      );

      const radio = screen.getByRole('radio', { name: 'Yes' });
      expect(radio).toHaveAttribute('data-test', 'yes-radio');
    });

    it('applies custom form group attributes', () => {
      render(
        <TestWrapper>
          <Radios 
            name="test-radios"
            formGroup={{ 
              classes: "custom-form-group",
              attributes: { 'data-form': 'test' }
            }}
            items={[
              { value: "yes", text: "Yes" }
            ]}
            data-testid="radios-wrapper"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('radios-wrapper');
      expect(wrapper).toHaveClass('custom-form-group');
      expect(wrapper).toHaveAttribute('data-form', 'test');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders patient consent radios', () => {
      render(
        <TestWrapper>
          <Radios 
            name="consent"
            fieldset={{
              legend: { text: "Do you consent to treatment?" }
            }}
            items={[
              { value: "yes", text: "Yes, I consent to treatment" },
              { value: "no", text: "No, I do not consent" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Do you consent to treatment?')).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'Yes, I consent to treatment' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'No, I do not consent' })).toBeInTheDocument();
    });

    it('renders gender selection with hints', () => {
      render(
        <TestWrapper>
          <Radios 
            name="gender"
            fieldset={{
              legend: { text: "What is your gender?" }
            }}
            hint={{ text: "This is used for medical purposes only" }}
            items={[
              { value: "female", text: "Female" },
              { value: "male", text: "Male" },
              { value: "other", text: "Other" },
              { value: "prefer-not-to-say", text: "Prefer not to say" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('What is your gender?')).toBeInTheDocument();
      expect(screen.getByText('This is used for medical purposes only')).toBeInTheDocument();
    });

    it('renders appointment type selection', () => {
      render(
        <TestWrapper>
          <Radios 
            name="appointment-type"
            fieldset={{
              legend: { text: "What type of appointment do you need?" }
            }}
            items={[
              { 
                value: "routine", 
                text: "Routine appointment",
                hint: { text: "For regular check-ups and non-urgent issues" }
              },
              { 
                value: "urgent", 
                text: "Urgent appointment",
                hint: { text: "For issues that need attention within 48 hours" }
              },
              { 
                value: "emergency", 
                text: "Emergency",
                hint: { text: "For life-threatening conditions - call 999" }
              }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('What type of appointment do you need?')).toBeInTheDocument();
      expect(screen.getByText('For regular check-ups and non-urgent issues')).toBeInTheDocument();
      expect(screen.getByText('For life-threatening conditions - call 999')).toBeInTheDocument();
    });

    it('renders contact preference with conditional content', () => {
      render(
        <TestWrapper>
          <Radios 
            name="contact-preference"
            value="email"
            fieldset={{
              legend: { text: "How would you prefer to be contacted?" }
            }}
            items={[
              { 
                value: "email", 
                text: "Email",
                conditional: {
                  html: '<div><label for="email">Email address</label><input id="email" type="email" /></div>'
                }
              },
              { 
                value: "phone", 
                text: "Phone",
                conditional: {
                  html: '<div><label for="phone">Phone number</label><input id="phone" type="tel" /></div>'
                }
              },
              { value: "post", text: "Post" }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Email address')).toBeInTheDocument();
      
      // Phone conditional should be hidden but still in DOM
      const phoneInput = screen.getByLabelText('Phone number');
      expect(phoneInput).toBeInTheDocument();
      const phoneConditional = phoneInput.closest('.nhsuk-radios__conditional');
      expect(phoneConditional).toHaveClass('nhsuk-radios__conditional--hidden');
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Radios.displayName).toBe('Radios');
    });
  });
});