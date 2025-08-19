import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Button } from './Button';
import type { ButtonVariant } from './Button';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Button', () => {
  describe('Basic functionality', () => {
    it('renders button with text content', () => {
      render(
        <TestWrapper>
          <Button text="Save and continue" />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Save and continue');
      expect(button.tagName).toBe('BUTTON');
    });

    it('renders button with HTML content', () => {
      render(
        <TestWrapper>
          <Button html="<strong>Save</strong> and continue" />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button.querySelector('strong')).toHaveTextContent('Save');
    });

    it('prioritizes HTML content over text', () => {
      render(
        <TestWrapper>
          <Button text="Text content" html="<em>HTML content</em>" />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button.querySelector('em')).toHaveTextContent('HTML content');
      expect(button).not.toHaveTextContent('Text content');
    });

    it('handles click events', () => {
      const handleClick = vi.fn();
      render(
        <TestWrapper>
          <Button text="Click me" onClick={handleClick} />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Element types', () => {
    it('renders as anchor when href is provided', () => {
      render(
        <TestWrapper>
          <Button text="Link button" href="/test" />
        </TestWrapper>
      );

      const link = screen.getByRole('button');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveAttribute('draggable', 'false');
    });

    it('renders as input when element is set to input', () => {
      render(
        <TestWrapper>
          <Button text="Input button" element="input" />
        </TestWrapper>
      );

      const input = screen.getByRole('button');
      expect(input.tagName).toBe('INPUT');
      expect(input).toHaveAttribute('value', 'Input button');
    });

    it('renders as button when element is explicitly set', () => {
      render(
        <TestWrapper>
          <Button text="Button element" element="button" href="/test" />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
      expect(button).not.toHaveAttribute('href');
    });

    it('renders as anchor when element is explicitly set', () => {
      render(
        <TestWrapper>
          <Button text="Anchor element" element="a" />
        </TestWrapper>
      );

      const link = screen.getByRole('button');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '#');
    });
  });

  describe('Button attributes', () => {
    it('sets button type attribute', () => {
      render(
        <TestWrapper>
          <Button text="Submit" type="submit" />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('sets name attribute for button', () => {
      render(
        <TestWrapper>
          <Button text="Named button" name="test-button" />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('name', 'test-button');
    });

    it('sets value attribute for button', () => {
      render(
        <TestWrapper>
          <Button text="Value button" value="button-value" />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('value', 'button-value');
    });

    it('handles disabled state', () => {
      render(
        <TestWrapper>
          <Button text="Disabled button" disabled />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Button variants', () => {
    const variants: ButtonVariant[] = ['primary', 'secondary', 'secondary-solid', 'reverse', 'warning', 'login'];

    variants.forEach((variant) => {
      it(`renders ${variant} variant`, () => {
        render(
          <TestWrapper>
            <Button text={`${variant} button`} variant={variant} />
          </TestWrapper>
        );

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(`${variant} button`);
        // Note: Testing actual styles would require additional setup for styled-components testing
      });
    });
  });

  describe('Double click prevention', () => {
    it('prevents double clicks when enabled', async () => {
      const handleClick = vi.fn();
      render(
        <TestWrapper>
          <Button text="Prevent double click" preventDoubleClick onClick={handleClick} />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      
      // First click should work
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Second immediate click should be prevented
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Wait for the prevention to be removed
      await waitFor(() => {
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(2);
      }, { timeout: 1100 });
    });

    it('does not prevent double clicks when disabled', () => {
      const handleClick = vi.fn();
      render(
        <TestWrapper>
          <Button text="No prevention" preventDoubleClick={false} onClick={handleClick} />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      
      fireEvent.click(button);
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('does not prevent double clicks for anchor elements', () => {
      const handleClick = vi.fn();
      render(
        <TestWrapper>
          <Button text="Link button" href="/test" preventDoubleClick onClick={handleClick} />
        </TestWrapper>
      );

      const link = screen.getByRole('button');
      
      fireEvent.click(link);
      fireEvent.click(link);
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Accessibility', () => {
    it('has correct role for button element', () => {
      render(
        <TestWrapper>
          <Button text="Button" />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('has correct role for anchor element', () => {
      render(
        <TestWrapper>
          <Button text="Link" href="/test" />
        </TestWrapper>
      );

      const link = screen.getByRole('button');
      expect(link).toHaveAttribute('role', 'button');
    });

    it('has correct role for input element', () => {
      render(
        <TestWrapper>
          <Button text="Input" element="input" />
        </TestWrapper>
      );

      const input = screen.getByRole('button');
      expect(input).toBeInTheDocument();
    });

    it('sets aria-disabled for disabled buttons', () => {
      render(
        <TestWrapper>
          <Button text="Disabled" disabled />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Custom attributes', () => {
    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <Button 
            text="Custom button"
            data-testid="custom-button"
            className="custom-class"
            id="button-id"
          />
        </TestWrapper>
      );

      const button = screen.getByTestId('custom-button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveAttribute('id', 'button-id');
    });

    it('includes data-module attribute', () => {
      render(
        <TestWrapper>
          <Button text="Module button" />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-module', 'button');
    });
  });

  describe('Edge cases', () => {
    it('renders with empty text', () => {
      render(
        <TestWrapper>
          <Button text="" />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('');
    });

    it('handles missing text and html', () => {
      render(
        <TestWrapper>
          <Button />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('');
    });

    it('defaults href to # for anchor elements', () => {
      render(
        <TestWrapper>
          <Button text="Link" element="a" />
        </TestWrapper>
      );

      const link = screen.getByRole('button');
      expect(link).toHaveAttribute('href', '#');
    });

    it('defaults type to submit for button elements', () => {
      render(
        <TestWrapper>
          <Button text="Default type" />
        </TestWrapper>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Button.displayName).toBe('Button');
    });
  });
});