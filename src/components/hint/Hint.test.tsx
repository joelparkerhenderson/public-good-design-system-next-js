import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Hint } from './Hint';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Hint', () => {
  describe('Basic functionality', () => {
    it('renders hint with text content', () => {
      render(
        <TestWrapper>
          <Hint text="This is a helpful hint" />
        </TestWrapper>
      );

      expect(screen.getByText('This is a helpful hint')).toBeInTheDocument();
    });

    it('renders hint with HTML content', () => {
      render(
        <TestWrapper>
          <Hint html="Do not include <strong>personal information</strong>" />
        </TestWrapper>
      );

      expect(screen.getByText('personal information')).toBeInTheDocument();
      expect(screen.getByText('personal information').tagName).toBe('STRONG');
    });

    it('renders hint with React children', () => {
      render(
        <TestWrapper>
          <Hint>
            <span>Custom React content</span>
            <em>with multiple elements</em>
          </Hint>
        </TestWrapper>
      );

      expect(screen.getByText('Custom React content')).toBeInTheDocument();
      expect(screen.getByText('with multiple elements')).toBeInTheDocument();
      expect(screen.getByText('with multiple elements').tagName).toBe('EM');
    });

    it('renders hint with custom ID', () => {
      render(
        <TestWrapper>
          <Hint 
            id="custom-hint-id"
            text="Hint with custom ID"
          />
        </TestWrapper>
      );

      const hintElement = screen.getByText('Hint with custom ID');
      expect(hintElement).toHaveAttribute('id', 'custom-hint-id');
    });
  });

  describe('Content priority', () => {
    it('prioritizes children over HTML and text', () => {
      render(
        <TestWrapper>
          <Hint 
            text="Text content that should be ignored"
            html="<p>HTML content that should be ignored</p>"
          >
            <span>Children content takes priority</span>
          </Hint>
        </TestWrapper>
      );

      expect(screen.getByText('Children content takes priority')).toBeInTheDocument();
      expect(screen.queryByText('Text content that should be ignored')).not.toBeInTheDocument();
      expect(screen.queryByText('HTML content that should be ignored')).not.toBeInTheDocument();
    });

    it('prioritizes HTML over text when no children provided', () => {
      render(
        <TestWrapper>
          <Hint 
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
          <Hint text="Text content should be displayed" />
        </TestWrapper>
      );

      expect(screen.getByText('Text content should be displayed')).toBeInTheDocument();
    });
  });

  describe('Empty states', () => {
    it('renders empty hint when no content provided', () => {
      const { container } = render(
        <TestWrapper>
          <Hint />
        </TestWrapper>
      );

      const hintElement = container.querySelector('.hint');
      expect(hintElement).toBeInTheDocument();
      expect(hintElement).toBeEmptyDOMElement();
    });

    it('renders empty hint when all content props are empty', () => {
      const { container } = render(
        <TestWrapper>
          <Hint text="" html="" />
        </TestWrapper>
      );

      const hintElement = container.querySelector('.hint');
      expect(hintElement).toBeInTheDocument();
      expect(hintElement).toBeEmptyDOMElement();
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to hint', () => {
      const { container } = render(
        <TestWrapper>
          <Hint 
            text="Hint with custom class"
            classes="custom-hint-class"
          />
        </TestWrapper>
      );

      const hintElement = container.querySelector('.hint');
      expect(hintElement).toHaveClass('hint');
      expect(hintElement).toHaveClass('custom-hint-class');
    });

    it('applies custom attributes to hint', () => {
      render(
        <TestWrapper>
          <Hint 
            text="Hint with custom attributes"
            attributes={{ 'data-custom': 'value', 'aria-label': 'Custom hint' }}
          />
        </TestWrapper>
      );

      const hintElement = screen.getByText('Hint with custom attributes');
      expect(hintElement).toHaveAttribute('data-custom', 'value');
      expect(hintElement).toHaveAttribute('aria-label', 'Custom hint');
    });

    it('applies custom attributes to component wrapper', () => {
      render(
        <TestWrapper>
          <Hint 
            text="Test hint"
            data-testid="custom-hint"
            className="wrapper-class"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-hint');
      expect(wrapper).toHaveClass('wrapper-class');
    });
  });

  describe('Form integration', () => {
    it('can be associated with form fields via ID', () => {
      render(
        <TestWrapper>
          <div>
            <label htmlFor="email">Email address</label>
            <Hint 
              id="email-hint"
              text="We'll only use this for important updates"
            />
            <input 
              id="email"
              type="email"
              aria-describedby="email-hint"
            />
          </div>
        </TestWrapper>
      );

      const hintElement = screen.getByText("We'll only use this for important updates");
      const inputElement = screen.getByRole('textbox');
      
      expect(hintElement).toHaveAttribute('id', 'email-hint');
      expect(inputElement).toHaveAttribute('aria-describedby', 'email-hint');
    });

    it('works with multiple form elements', () => {
      render(
        <TestWrapper>
          <div>
            <Hint 
              id="name-hint"
              text="Enter your full legal name"
            />
            <Hint 
              id="phone-hint"
              text="Include the area code"
            />
          </div>
        </TestWrapper>
      );

      expect(screen.getByText('Enter your full legal name')).toHaveAttribute('id', 'name-hint');
      expect(screen.getByText('Include the area code')).toHaveAttribute('id', 'phone-hint');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders NHS number hint', () => {
      render(
        <TestWrapper>
          <Hint text="Your NHS number is 10 digits long, for example 485 777 3456" />
        </TestWrapper>
      );

      expect(screen.getByText('Your NHS number is 10 digits long, for example 485 777 3456')).toBeInTheDocument();
    });

    it('renders personal information privacy hint', () => {
      render(
        <TestWrapper>
          <Hint html="Do not include personal information, like your <strong>name</strong>, <strong>date of birth</strong> or <strong>NHS number</strong>" />
        </TestWrapper>
      );

      expect(screen.getByText('name')).toBeInTheDocument();
      expect(screen.getByText('date of birth')).toBeInTheDocument();
      expect(screen.getByText('NHS number')).toBeInTheDocument();
      expect(screen.getByText('name').tagName).toBe('STRONG');
    });

    it('renders medical appointment hint', () => {
      render(
        <TestWrapper>
          <Hint>
            Appointments can be booked up to 8 weeks in advance. 
            For urgent appointments, please call <strong>111</strong>.
          </Hint>
        </TestWrapper>
      );

      expect(screen.getByText(/Appointments can be booked up to 8 weeks in advance/)).toBeInTheDocument();
      expect(screen.getByText('111')).toBeInTheDocument();
    });

    it('renders prescription repeat hint', () => {
      render(
        <TestWrapper>
          <Hint text="Allow 48 hours for repeat prescriptions to be processed" />
        </TestWrapper>
      );

      expect(screen.getByText('Allow 48 hours for repeat prescriptions to be processed')).toBeInTheDocument();
    });

    it('renders emergency contact hint', () => {
      render(
        <TestWrapper>
          <Hint>
            <p>In case of emergency, call <strong>999</strong></p>
            <p>For urgent but non-life-threatening situations, call <strong>111</strong></p>
          </Hint>
        </TestWrapper>
      );

      const emergencyNumbers = screen.getAllByText(/999|111/);
      expect(emergencyNumbers).toHaveLength(2);
    });

    it('renders health record access hint', () => {
      render(
        <TestWrapper>
          <Hint html="You can access your health records online using the <a href='/nhs-app'>NHS App</a> or patient portal" />
        </TestWrapper>
      );

      expect(screen.getByText('NHS App')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'NHS App' })).toHaveAttribute('href', '/nhs-app');
    });

    it('renders vaccine booking hint', () => {
      render(
        <TestWrapper>
          <Hint text="Bring a form of ID and your vaccination record if you have one" />
        </TestWrapper>
      );

      expect(screen.getByText('Bring a form of ID and your vaccination record if you have one')).toBeInTheDocument();
    });

    it('renders mental health support hint', () => {
      render(
        <TestWrapper>
          <Hint>
            If you're having thoughts of self-harm or suicide, please seek immediate help:
            <ul>
              <li>Call <strong>999</strong> for emergency services</li>
              <li>Call <strong>116 123</strong> for Samaritans (free, 24/7)</li>
              <li>Text <strong>SHOUT</strong> to <strong>85258</strong> for crisis text support</li>
            </ul>
          </Hint>
        </TestWrapper>
      );

      expect(screen.getByText(/If you're having thoughts of self-harm/)).toBeInTheDocument();
      expect(screen.getByText('999')).toBeInTheDocument();
      expect(screen.getByText('116 123')).toBeInTheDocument();
    });

    it('renders GP registration hint', () => {
      render(
        <TestWrapper>
          <Hint text="You can register with a GP even if you don't have proof of address or immigration status" />
        </TestWrapper>
      );

      expect(screen.getByText("You can register with a GP even if you don't have proof of address or immigration status")).toBeInTheDocument();
    });

    it('renders test results hint', () => {
      render(
        <TestWrapper>
          <Hint html="Test results are usually available within <strong>7-10 working days</strong>. You'll be contacted if any action is needed." />
        </TestWrapper>
      );

      expect(screen.getByText('7-10 working days')).toBeInTheDocument();
      expect(screen.getByText('7-10 working days').tagName).toBe('STRONG');
    });
  });

  describe('Accessibility', () => {
    it('uses appropriate semantic markup', () => {
      const { container } = render(
        <TestWrapper>
          <Hint text="Accessible hint text" />
        </TestWrapper>
      );

      const hintElement = container.querySelector('.hint');
      expect(hintElement?.tagName).toBe('DIV');
    });

    it('provides proper ID for form association', () => {
      render(
        <TestWrapper>
          <Hint 
            id="accessible-hint"
            text="This hint can be referenced by form fields"
          />
        </TestWrapper>
      );

      const hintElement = screen.getByText('This hint can be referenced by form fields');
      expect(hintElement).toHaveAttribute('id', 'accessible-hint');
    });

    it('works with aria-describedby relationship', () => {
      render(
        <TestWrapper>
          <div>
            <input aria-describedby="input-hint" />
            <Hint 
              id="input-hint"
              text="Hint text for screen readers"
            />
          </div>
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      const hint = screen.getByText('Hint text for screen readers');
      
      expect(input).toHaveAttribute('aria-describedby', 'input-hint');
      expect(hint).toHaveAttribute('id', 'input-hint');
    });

    it('supports custom ARIA attributes', () => {
      render(
        <TestWrapper>
          <Hint 
            text="Hint with ARIA attributes"
            attributes={{ 'aria-label': 'Additional context', 'role': 'note' }}
          />
        </TestWrapper>
      );

      const hintElement = screen.getByText('Hint with ARIA attributes');
      expect(hintElement).toHaveAttribute('aria-label', 'Additional context');
      expect(hintElement).toHaveAttribute('role', 'note');
    });
  });

  describe('Content formatting', () => {
    it('renders formatted text with line breaks', () => {
      render(
        <TestWrapper>
          <Hint html="Line one<br>Line two<br>Line three" />
        </TestWrapper>
      );

      const hintElement = screen.getByText(/Line one/);
      expect(hintElement.innerHTML).toContain('<br>');
    });

    it('renders lists in hint content', () => {
      render(
        <TestWrapper>
          <Hint>
            <p>Required documents:</p>
            <ul>
              <li>Photo ID</li>
              <li>Proof of address</li>
              <li>NHS number (if known)</li>
            </ul>
          </Hint>
        </TestWrapper>
      );

      expect(screen.getByText('Required documents:')).toBeInTheDocument();
      expect(screen.getByText('Photo ID')).toBeInTheDocument();
      expect(screen.getByText('Proof of address')).toBeInTheDocument();
      expect(screen.getByText('NHS number (if known)')).toBeInTheDocument();
    });

    it('renders links in hint content', () => {
      render(
        <TestWrapper>
          <Hint html='Find more information on the <a href="/help">help page</a>' />
        </TestWrapper>
      );

      const link = screen.getByRole('link', { name: 'help page' });
      expect(link).toHaveAttribute('href', '/help');
    });

    it('renders inline code elements', () => {
      render(
        <TestWrapper>
          <Hint>
            Enter your postcode in the format <code>SW1A 1AA</code>
          </Hint>
        </TestWrapper>
      );

      expect(screen.getByText('SW1A 1AA')).toBeInTheDocument();
      expect(screen.getByText('SW1A 1AA').tagName).toBe('CODE');
    });
  });

  describe('Multiple hints', () => {
    it('renders multiple independent hints', () => {
      render(
        <TestWrapper>
          <div>
            <Hint text="First hint" />
            <Hint text="Second hint" />
            <Hint text="Third hint" />
          </div>
        </TestWrapper>
      );

      expect(screen.getByText('First hint')).toBeInTheDocument();
      expect(screen.getByText('Second hint')).toBeInTheDocument();
      expect(screen.getByText('Third hint')).toBeInTheDocument();
    });

    it('handles multiple hints with different content types', () => {
      render(
        <TestWrapper>
          <div>
            <Hint text="Plain text hint" />
            <Hint html="<strong>HTML</strong> hint" />
            <Hint>
              <span>React children hint</span>
            </Hint>
          </div>
        </TestWrapper>
      );

      expect(screen.getByText('Plain text hint')).toBeInTheDocument();
      expect(screen.getByText('HTML')).toBeInTheDocument();
      expect(screen.getByText('React children hint')).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Hint.displayName).toBe('Hint');
    });
  });
});