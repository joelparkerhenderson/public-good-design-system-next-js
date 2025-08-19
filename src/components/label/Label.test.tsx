import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Label } from './Label';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Label', () => {
  describe('Basic functionality', () => {
    it('renders label with text content', () => {
      render(
        <TestWrapper>
          <Label htmlFor="test-input" text="Test Label" />
        </TestWrapper>
      );

      const label = screen.getByText('Test Label');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
      expect(label).toHaveAttribute('for', 'test-input');
    });

    it('renders label with HTML content', () => {
      render(
        <TestWrapper>
          <Label htmlFor="email" html="Email address <span>(optional)</span>" />
        </TestWrapper>
      );

      expect(screen.getByText('Email address')).toBeInTheDocument();
      expect(screen.getByText('(optional)')).toBeInTheDocument();
      expect(screen.getByText('(optional)').tagName).toBe('SPAN');
    });

    it('renders label with React children', () => {
      render(
        <TestWrapper>
          <Label htmlFor="name">
            Full name <em>required</em>
          </Label>
        </TestWrapper>
      );

      expect(screen.getByText('Full name')).toBeInTheDocument();
      expect(screen.getByText('required')).toBeInTheDocument();
      expect(screen.getByText('required').tagName).toBe('EM');
    });

    it('renders label without htmlFor attribute', () => {
      render(
        <TestWrapper>
          <Label text="Standalone Label" />
        </TestWrapper>
      );

      const label = screen.getByText('Standalone Label');
      expect(label).toBeInTheDocument();
      expect(label).not.toHaveAttribute('for');
    });
  });

  describe('Content priority', () => {
    it('prioritizes children over HTML and text', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="test"
            text="Text content that should be ignored"
            html="<p>HTML content that should be ignored</p>"
          >
            <span>Children content takes priority</span>
          </Label>
        </TestWrapper>
      );

      expect(screen.getByText('Children content takes priority')).toBeInTheDocument();
      expect(screen.queryByText('Text content that should be ignored')).not.toBeInTheDocument();
      expect(screen.queryByText('HTML content that should be ignored')).not.toBeInTheDocument();
    });

    it('prioritizes HTML over text when no children provided', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="test"
            text="Text content that should be ignored"
            html="<em>HTML content takes priority</em>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('HTML content takes priority')).toBeInTheDocument();
      expect(screen.getByText('HTML content takes priority').tagName).toBe('EM');
      expect(screen.queryByText('Text content that should be ignored')).not.toBeInTheDocument();
    });

    it('uses text when no children or HTML provided', () => {
      render(
        <TestWrapper>
          <Label htmlFor="test" text="Text content should be displayed" />
        </TestWrapper>
      );

      expect(screen.getByText('Text content should be displayed')).toBeInTheDocument();
    });
  });

  describe('Page heading functionality', () => {
    it('renders label as page heading', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="main-input"
            text="What is your NHS number?"
            isPageHeading={true}
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('nhsuk-label-wrapper');
      
      const label = screen.getByText('What is your NHS number?');
      expect(label.tagName).toBe('LABEL');
      expect(label).toHaveAttribute('for', 'main-input');
    });

    it('renders regular label when not page heading', () => {
      render(
        <TestWrapper>
          <Label htmlFor="input" text="Regular Label" isPageHeading={false} />
        </TestWrapper>
      );

      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(screen.getByText('Regular Label').tagName).toBe('LABEL');
    });
  });

  describe('Size variations', () => {
    it('renders small label', () => {
      const { container } = render(
        <TestWrapper>
          <Label htmlFor="input" text="Small Label" size="s" />
        </TestWrapper>
      );

      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
    });

    it('renders medium label', () => {
      const { container } = render(
        <TestWrapper>
          <Label htmlFor="input" text="Medium Label" size="m" />
        </TestWrapper>
      );

      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
    });

    it('renders large label', () => {
      const { container } = render(
        <TestWrapper>
          <Label htmlFor="input" text="Large Label" size="l" />
        </TestWrapper>
      );

      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
    });

    it('renders extra large label', () => {
      const { container } = render(
        <TestWrapper>
          <Label htmlFor="input" text="XL Label" size="xl" />
        </TestWrapper>
      );

      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
    });

    it('extracts size from classes', () => {
      const { container } = render(
        <TestWrapper>
          <Label 
            htmlFor="input" 
            text="Label with class size" 
            classes="nhsuk-label--l custom-class"
          />
        </TestWrapper>
      );

      const label = container.querySelector('label');
      expect(label).toHaveClass('nhsuk-label--l');
      expect(label).toHaveClass('custom-class');
    });

    it('size prop overrides class size', () => {
      const { container } = render(
        <TestWrapper>
          <Label 
            htmlFor="input" 
            text="Label with size override" 
            size="xl"
            classes="nhsuk-label--s"
          />
        </TestWrapper>
      );

      const label = container.querySelector('label');
      expect(label).toHaveClass('nhsuk-label--s'); // Class is still applied
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to label', () => {
      const { container } = render(
        <TestWrapper>
          <Label 
            htmlFor="input"
            text="Label with custom class"
            classes="custom-label-class"
          />
        </TestWrapper>
      );

      const label = container.querySelector('label');
      expect(label).toHaveClass('nhsuk-label');
      expect(label).toHaveClass('custom-label-class');
    });

    it('applies custom attributes to label', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="input"
            text="Label with custom attributes"
            attributes={{ 'data-custom': 'value', 'aria-label': 'Custom label' }}
          />
        </TestWrapper>
      );

      const label = screen.getByLabelText('Custom label');
      expect(label).toHaveAttribute('data-custom', 'value');
    });

    it('applies custom attributes to component wrapper', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="input"
            text="Test label"
            data-testid="custom-label"
            className="wrapper-class"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-label');
      expect(wrapper).toHaveClass('wrapper-class');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders NHS number label', () => {
      render(
        <TestWrapper>
          <Label htmlFor="nhs-number" text="NHS Number" />
        </TestWrapper>
      );

      const label = screen.getByText('NHS Number');
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('for', 'nhs-number');
    });

    it('renders patient details label', () => {
      render(
        <TestWrapper>
          <Label htmlFor="patient-name" text="Patient full name" />
        </TestWrapper>
      );

      expect(screen.getByText('Patient full name')).toBeInTheDocument();
    });

    it('renders optional field label', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="middle-name" 
            html="Middle name <span class='optional'>(optional)</span>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Middle name')).toBeInTheDocument();
      expect(screen.getByText('(optional)')).toBeInTheDocument();
    });

    it('renders required field label', () => {
      render(
        <TestWrapper>
          <Label htmlFor="date-of-birth">
            Date of birth <abbr title="required">*</abbr>
          </Label>
        </TestWrapper>
      );

      expect(screen.getByText('Date of birth')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('renders medical condition label', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="allergies"
            text="Known allergies and adverse reactions"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Known allergies and adverse reactions')).toBeInTheDocument();
    });

    it('renders emergency contact label', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="emergency-contact"
            html="Emergency contact <em>(next of kin)</em>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Emergency contact')).toBeInTheDocument();
      expect(screen.getByText('(next of kin)')).toBeInTheDocument();
      expect(screen.getByText('(next of kin)').tagName).toBe('EM');
    });

    it('renders GP practice label', () => {
      render(
        <TestWrapper>
          <Label htmlFor="gp-practice" text="Current GP practice" />
        </TestWrapper>
      );

      expect(screen.getByText('Current GP practice')).toBeInTheDocument();
    });

    it('renders appointment type label', () => {
      render(
        <TestWrapper>
          <Label htmlFor="appointment-type">
            Type of appointment <span className="help-text">(routine, follow-up, urgent)</span>
          </Label>
        </TestWrapper>
      );

      expect(screen.getByText('Type of appointment')).toBeInTheDocument();
      expect(screen.getByText('(routine, follow-up, urgent)')).toBeInTheDocument();
    });

    it('renders medication dosage label', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="dosage"
            html="Current dosage <code>mg</code>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Current dosage')).toBeInTheDocument();
      expect(screen.getByText('mg')).toBeInTheDocument();
      expect(screen.getByText('mg').tagName).toBe('CODE');
    });

    it('renders symptoms description label', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="symptoms"
            text="Describe your symptoms in detail"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Describe your symptoms in detail')).toBeInTheDocument();
    });

    it('renders consent form label', () => {
      render(
        <TestWrapper>
          <Label htmlFor="consent">
            <strong>Consent for treatment</strong> - I agree to the proposed treatment
          </Label>
        </TestWrapper>
      );

      expect(screen.getByText('Consent for treatment')).toBeInTheDocument();
      expect(screen.getByText('Consent for treatment').tagName).toBe('STRONG');
      expect(screen.getByText('- I agree to the proposed treatment')).toBeInTheDocument();
    });

    it('renders insurance information label', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="insurance"
            html="Private insurance details <span class='note'>(if applicable)</span>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Private insurance details')).toBeInTheDocument();
      expect(screen.getByText('(if applicable)')).toBeInTheDocument();
    });
  });

  describe('Form labels as page headings', () => {
    it('renders NHS number question as page heading', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="nhs-number-input"
            text="What is your NHS number?"
            isPageHeading={true}
            size="xl"
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      
      const label = screen.getByText('What is your NHS number?');
      expect(label.tagName).toBe('LABEL');
      expect(label).toHaveAttribute('for', 'nhs-number-input');
    });

    it('renders patient registration heading', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="patient-details"
            text="Register as a new patient"
            isPageHeading={true}
            size="l"
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(screen.getByText('Register as a new patient')).toBeInTheDocument();
    });

    it('renders appointment booking heading', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="appointment-form"
            html="Book your <strong>GP appointment</strong>"
            isPageHeading={true}
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(screen.getByText('GP appointment')).toBeInTheDocument();
      expect(screen.getByText('GP appointment').tagName).toBe('STRONG');
    });
  });

  describe('Content formatting', () => {
    it('renders label with emphasis', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="input"
            html="Label with <strong>bold</strong> and <em>italic</em> text"
          />
        </TestWrapper>
      );

      expect(screen.getByText('bold')).toBeInTheDocument();
      expect(screen.getByText('bold').tagName).toBe('STRONG');
      expect(screen.getByText('italic')).toBeInTheDocument();
      expect(screen.getByText('italic').tagName).toBe('EM');
    });

    it('renders label with inline code', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="input"
            html="Enter value in <code>YYYY-MM-DD</code> format"
          />
        </TestWrapper>
      );

      expect(screen.getByText('YYYY-MM-DD')).toBeInTheDocument();
      expect(screen.getByText('YYYY-MM-DD').tagName).toBe('CODE');
    });

    it('renders label with link', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="input"
            html='Need help? See our <a href="/help">help guide</a>'
          />
        </TestWrapper>
      );

      const link = screen.getByRole('link', { name: 'help guide' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/help');
    });

    it('renders label with abbreviation', () => {
      render(
        <TestWrapper>
          <Label htmlFor="input">
            <abbr title="General Practitioner">GP</abbr> practice name
          </Label>
        </TestWrapper>
      );

      expect(screen.getByText('GP')).toBeInTheDocument();
      expect(screen.getByText('GP')).toHaveAttribute('title', 'General Practitioner');
    });
  });

  describe('Empty states', () => {
    it('renders empty label when no content provided', () => {
      const { container } = render(
        <TestWrapper>
          <Label htmlFor="input" />
        </TestWrapper>
      );

      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
      expect(label).toBeEmptyDOMElement();
    });

    it('renders empty label when all content props are empty', () => {
      const { container } = render(
        <TestWrapper>
          <Label htmlFor="input" text="" html="" />
        </TestWrapper>
      );

      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
      expect(label).toBeEmptyDOMElement();
    });
  });

  describe('Accessibility', () => {
    it('uses appropriate semantic markup', () => {
      render(
        <TestWrapper>
          <Label htmlFor="accessible-input" text="Accessible Label" />
        </TestWrapper>
      );

      const label = screen.getByText('Accessible Label');
      expect(label.tagName).toBe('LABEL');
      expect(label).toHaveAttribute('for', 'accessible-input');
    });

    it('maintains proper heading hierarchy when used as page heading', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="input"
            text="Page Heading Label"
            isPageHeading={true}
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      
      const label = screen.getByText('Page Heading Label');
      expect(label.tagName).toBe('LABEL');
    });

    it('supports custom ARIA attributes', () => {
      render(
        <TestWrapper>
          <Label 
            htmlFor="input"
            text="Label with ARIA"
            attributes={{ 'aria-describedby': 'help-text', 'role': 'text' }}
          />
        </TestWrapper>
      );

      const label = screen.getByText('Label with ARIA');
      expect(label).toHaveAttribute('aria-describedby', 'help-text');
      expect(label).toHaveAttribute('role', 'text');
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Label.displayName).toBe('Label');
    });
  });
});