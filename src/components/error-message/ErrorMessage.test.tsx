import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { ErrorMessage } from './ErrorMessage';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('ErrorMessage', () => {
  describe('Basic functionality', () => {
    it('renders error message with text', () => {
      render(
        <TestWrapper>
          <ErrorMessage text="Please enter your full name" />
        </TestWrapper>
      );

      expect(screen.getByText('Please enter your full name')).toBeInTheDocument();
    });

    it('renders error message with HTML content', () => {
      render(
        <TestWrapper>
          <ErrorMessage html="Please enter a valid <strong>email address</strong>" />
        </TestWrapper>
      );

      expect(screen.getByText('email address')).toBeInTheDocument();
      const strong = screen.getByText('email address');
      expect(strong.tagName).toBe('STRONG');
    });

    it('renders error message with children', () => {
      render(
        <TestWrapper>
          <ErrorMessage>
            <span>Custom error content</span>
          </ErrorMessage>
        </TestWrapper>
      );

      expect(screen.getByText('Custom error content')).toBeInTheDocument();
    });

    it('renders with custom ID', () => {
      render(
        <TestWrapper>
          <ErrorMessage 
            id="test-error" 
            text="Error with ID" 
          />
        </TestWrapper>
      );

      const errorElement = screen.getByText('Error with ID').closest('span');
      expect(errorElement).toHaveAttribute('id', 'test-error');
    });
  });

  describe('Content priority', () => {
    it('prioritizes children over html and text', () => {
      render(
        <TestWrapper>
          <ErrorMessage 
            text="Text content"
            html="<em>HTML content</em>"
          >
            <span>Children content</span>
          </ErrorMessage>
        </TestWrapper>
      );

      expect(screen.getByText('Children content')).toBeInTheDocument();
      expect(screen.queryByText('Text content')).not.toBeInTheDocument();
      expect(screen.queryByText('HTML content')).not.toBeInTheDocument();
    });

    it('prioritizes html over text', () => {
      render(
        <TestWrapper>
          <ErrorMessage 
            text="Text content"
            html="<em>HTML content</em>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('HTML content')).toBeInTheDocument();
      expect(screen.queryByText('Text content')).not.toBeInTheDocument();
    });

    it('uses text when no html or children provided', () => {
      render(
        <TestWrapper>
          <ErrorMessage text="Only text content" />
        </TestWrapper>
      );

      expect(screen.getByText('Only text content')).toBeInTheDocument();
    });
  });

  describe('Visually hidden text', () => {
    it('includes default visually hidden "Error:" text', () => {
      render(
        <TestWrapper>
          <ErrorMessage text="Validation error" />
        </TestWrapper>
      );

      const hiddenText = screen.getByText('Error:', { exact: true });
      expect(hiddenText).toBeInTheDocument();
      expect(hiddenText).toHaveClass('error-message__visually-hidden');
    });

    it('uses custom visually hidden text when provided', () => {
      render(
        <TestWrapper>
          <ErrorMessage 
            text="Validation error" 
            visuallyHiddenText="Validation issue"
          />
        </TestWrapper>
      );

      const hiddenText = screen.getByText('Validation issue:', { exact: true });
      expect(hiddenText).toBeInTheDocument();
      expect(hiddenText).toHaveClass('error-message__visually-hidden');
      expect(screen.queryByText('Error:', { exact: true })).not.toBeInTheDocument();
    });

    it('omits visually hidden text when set to empty string', () => {
      render(
        <TestWrapper>
          <ErrorMessage 
            text="Validation error" 
            visuallyHiddenText=""
          />
        </TestWrapper>
      );

      expect(screen.queryByText('Error:')).not.toBeInTheDocument();
      expect(screen.getByText('Validation error')).toBeInTheDocument();
    });

    it('shows default "Error:" when visuallyHiddenText is undefined', () => {
      render(
        <TestWrapper>
          <ErrorMessage 
            text="Validation error" 
            visuallyHiddenText={undefined}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Error:', { exact: true })).toBeInTheDocument();
      expect(screen.getByText('Validation error')).toBeInTheDocument();
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes', () => {
      const { container } = render(
        <TestWrapper>
          <ErrorMessage 
            text="Test error" 
            classes="custom-error" 
          />
        </TestWrapper>
      );

      const errorElement = container.querySelector('.error-message');
      expect(errorElement).toHaveClass('custom-error');
    });

    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <ErrorMessage 
            text="Test error" 
            attributes={{ 'data-custom': 'value', 'aria-live': 'polite' }}
          />
        </TestWrapper>
      );

      const errorElement = screen.getByText('Test error').closest('span');
      expect(errorElement).toHaveAttribute('data-custom', 'value');
      expect(errorElement).toHaveAttribute('aria-live', 'polite');
    });

    it('applies custom attributes to component wrapper', () => {
      render(
        <TestWrapper>
          <ErrorMessage 
            text="Test error" 
            data-testid="custom-error"
            className="wrapper-class"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-error');
      expect(wrapper).toHaveClass('wrapper-class');
    });
  });

  describe('Empty content handling', () => {
    it('does not render when no content provided', () => {
      const { container } = render(
        <TestWrapper>
          <ErrorMessage />
        </TestWrapper>
      );

      expect(container.firstChild).toBeNull();
    });

    it('does not render when text is empty', () => {
      const { container } = render(
        <TestWrapper>
          <ErrorMessage text="" />
        </TestWrapper>
      );

      expect(container.firstChild).toBeNull();
    });

    it('does not render when html is empty', () => {
      const { container } = render(
        <TestWrapper>
          <ErrorMessage html="" />
        </TestWrapper>
      );

      expect(container.firstChild).toBeNull();
    });

    it('renders when children provided even if text/html empty', () => {
      render(
        <TestWrapper>
          <ErrorMessage text="" html="">
            <span>Valid children</span>
          </ErrorMessage>
        </TestWrapper>
      );

      expect(screen.getByText('Valid children')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses span element for semantic markup', () => {
      render(
        <TestWrapper>
          <ErrorMessage text="Accessible error" />
        </TestWrapper>
      );

      const errorElement = screen.getByText('Accessible error').closest('span');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement?.tagName).toBe('SPAN');
    });

    it('includes visually hidden text for screen readers', () => {
      const { container } = render(
        <TestWrapper>
          <ErrorMessage text="Screen reader error" />
        </TestWrapper>
      );

      const hiddenElement = container.querySelector('.error-message__visually-hidden');
      expect(hiddenElement).toBeInTheDocument();
      
      // Check that visually hidden styles are applied
      const computedStyle = window.getComputedStyle(hiddenElement!);
      expect(computedStyle.position).toBe('absolute');
    });

    it('can be associated with form controls via ID', () => {
      render(
        <TestWrapper>
          <div>
            <input aria-describedby="name-error" />
            <ErrorMessage 
              id="name-error" 
              text="Name is required" 
            />
          </div>
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      const errorElement = screen.getByText('Name is required').closest('span');
      
      expect(input).toHaveAttribute('aria-describedby', 'name-error');
      expect(errorElement).toHaveAttribute('id', 'name-error');
    });
  });

  describe('Form integration examples', () => {
    it('works with text input validation', () => {
      render(
        <TestWrapper>
          <div>
            <label htmlFor="email">Email address</label>
            <input 
              id="email" 
              type="email" 
              aria-describedby="email-error"
              aria-invalid="true"
            />
            <ErrorMessage 
              id="email-error" 
              text="Enter a valid email address" 
            />
          </div>
        </TestWrapper>
      );

      const input = screen.getByLabelText('Email address');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
    });

    it('works with complex validation messages', () => {
      render(
        <TestWrapper>
          <ErrorMessage 
            html="Password must contain at least <strong>8 characters</strong>, including <strong>1 uppercase letter</strong> and <strong>1 number</strong>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('8 characters')).toBeInTheDocument();
      expect(screen.getByText('1 uppercase letter')).toBeInTheDocument();
      expect(screen.getByText('1 number')).toBeInTheDocument();
    });
  });

  describe('Healthcare use cases', () => {
    it('renders NHS number validation error', () => {
      render(
        <TestWrapper>
          <ErrorMessage text="NHS number must be 10 digits" />
        </TestWrapper>
      );

      expect(screen.getByText('NHS number must be 10 digits')).toBeInTheDocument();
    });

    it('renders date of birth validation error', () => {
      render(
        <TestWrapper>
          <ErrorMessage html="Date of birth must include a <strong>day</strong>, <strong>month</strong> and <strong>year</strong>" />
        </TestWrapper>
      );

      expect(screen.getByText('day')).toBeInTheDocument();
      expect(screen.getByText('month')).toBeInTheDocument();
      expect(screen.getByText('year')).toBeInTheDocument();
    });

    it('renders appointment booking error', () => {
      render(
        <TestWrapper>
          <ErrorMessage>
            <span>
              Please select an appointment time that is at least 24 hours in advance
            </span>
          </ErrorMessage>
        </TestWrapper>
      );

      expect(screen.getByText('Please select an appointment time that is at least 24 hours in advance')).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(ErrorMessage.displayName).toBe('ErrorMessage');
    });
  });
});