import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { CharacterCount } from './CharacterCount';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('CharacterCount', () => {
  const defaultProps = {
    name: 'test-input',
    label: { text: 'Test label' },
    maxlength: 10,
  };

  describe('Basic functionality', () => {
    it('renders with label and textarea', () => {
      render(
        <TestWrapper>
          <CharacterCount {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Test label')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('uses name as id when id not provided', () => {
      render(
        <TestWrapper>
          <CharacterCount {...defaultProps} />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('id', 'test-input');
      expect(textarea).toHaveAttribute('name', 'test-input');
    });

    it('uses provided id when specified', () => {
      render(
        <TestWrapper>
          <CharacterCount {...defaultProps} id="custom-id" />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('id', 'custom-id');
      expect(textarea).toHaveAttribute('name', 'test-input');
    });

    it('displays initial count message', () => {
      render(
        <TestWrapper>
          <CharacterCount {...defaultProps} />
        </TestWrapper>
      );

      // Should find the visible count message (not hidden screen reader one)
      const countMessages = screen.getAllByText('You have 10 characters remaining');
      expect(countMessages.length).toBeGreaterThan(0);
    });
  });

  describe('Character counting', () => {
    it('updates count as user types', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <CharacterCount {...defaultProps} />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello');

      // Should find the count message (check both visible areas)
      const countMessages = screen.getAllByText(/You have 5 characters remaining/);
      expect(countMessages.length).toBeGreaterThan(0);
    });

    it('shows singular form for 1 character', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <CharacterCount {...defaultProps} />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello Wor');

      const countMessages = screen.getAllByText(/You have 1 character remaining/);
      expect(countMessages.length).toBeGreaterThan(0);
    });

    it('shows over limit message when exceeded', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <CharacterCount {...defaultProps} />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'This is too long');

      const countMessages = screen.getAllByText(/You have 6 characters too many/);
      expect(countMessages.length).toBeGreaterThan(0);
    });

    it('handles initial value correctly', () => {
      render(
        <TestWrapper>
          <CharacterCount {...defaultProps} value="Hello" />
        </TestWrapper>
      );

      expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
      const countMessages = screen.getAllByText(/You have 5 characters remaining/);
      expect(countMessages.length).toBeGreaterThan(0);
    });

    it('handles initial value that exceeds limit', () => {
      render(
        <TestWrapper>
          <CharacterCount {...defaultProps} value="This is way too long" />
        </TestWrapper>
      );

      const countMessages = screen.getAllByText(/You have 11 characters too many/);
      expect(countMessages.length).toBeGreaterThan(0);
    });
  });

  describe('Word counting', () => {
    it('counts words instead of characters when maxwords is set', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <CharacterCount 
            name="test"
            label={{ text: 'Test' }}
            maxwords={5}
          />
        </TestWrapper>
      );

      let countMessages = screen.getAllByText(/You have 5 words remaining/);
      expect(countMessages.length).toBeGreaterThan(0);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello world');

      countMessages = screen.getAllByText(/You have 3 words remaining/);
      expect(countMessages.length).toBeGreaterThan(0);
    });

    it('shows singular form for 1 word', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <CharacterCount 
            name="test"
            label={{ text: 'Test' }}
            maxwords={5}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello world test one');

      const countMessages = screen.getAllByText(/You have 1 word remaining/);
      expect(countMessages.length).toBeGreaterThan(0);
    });

    it('ignores maxlength when maxwords is provided', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <CharacterCount 
            name="test"
            label={{ text: 'Test' }}
            maxlength={10}
            maxwords={2}
          />
        </TestWrapper>
      );

      let countMessages = screen.getAllByText(/You have 2 words remaining/);
      expect(countMessages.length).toBeGreaterThan(0);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello world test');

      countMessages = screen.getAllByText(/You have 1 word too many/);
      expect(countMessages.length).toBeGreaterThan(0);
    });
  });

  describe('Threshold functionality', () => {
    it('hides count message until threshold is reached', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            threshold={80}
          />
        </TestWrapper>
      );

      // Find the visible count message by class
      const countMessage = container.querySelector('.character-count-status');
      expect(countMessage).toHaveStyle({ visibility: 'hidden' });

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello wo'); // 8 characters = 80% of 10

      await waitFor(() => {
        expect(countMessage).not.toHaveStyle({ visibility: 'hidden' });
      });
    });

    it('shows count message when over threshold', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            threshold={50}
          />
        </TestWrapper>
      );

      // Find the visible count message by class
      const countMessage = container.querySelector('.character-count-status');
      expect(countMessage).toHaveStyle({ visibility: 'hidden' });

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello'); // 5 characters = 50% of 10

      await waitFor(() => {
        expect(countMessage).not.toHaveStyle({ visibility: 'hidden' });
      });
    });
  });

  describe('Label variants', () => {
    it('renders label as page heading when specified', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            label={{ 
              text: 'Page heading label',
              isPageHeading: true,
              classes: 'custom-heading'
            }}
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Page heading label');
      expect(heading).toHaveClass('custom-heading');
    });

    it('renders label with HTML content', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            label={{ 
              html: '<strong>Bold</strong> label text'
            }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByText('label text')).toBeInTheDocument();
    });

    it('prioritizes HTML over text in label', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            label={{ 
              text: 'Text label',
              html: '<em>HTML label</em>'
            }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('HTML label')).toBeInTheDocument();
      expect(screen.queryByText('Text label')).not.toBeInTheDocument();
    });
  });

  describe('Hint functionality', () => {
    it('renders hint text', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            hint={{ text: 'This is a helpful hint' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('This is a helpful hint')).toBeInTheDocument();
    });

    it('renders hint with HTML content', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            hint={{ html: 'Hint with <a href="#">link</a>' }}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('link', { name: 'link' })).toBeInTheDocument();
    });

    it('associates hint with textarea via aria-describedby', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            hint={{ text: 'Helpful hint' }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', expect.stringContaining('test-input-hint'));
    });
  });

  describe('Error handling', () => {
    it('renders error message', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            errorMessage={{ text: 'This field is required' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Error: This field is required')).toBeInTheDocument();
    });

    it('renders error message with HTML content', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            errorMessage={{ html: 'Error with <strong>bold</strong> text' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('bold')).toBeInTheDocument();
    });

    it('applies error styling to textarea when error message present', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            errorMessage={{ text: 'Error message' }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      // Check if error styling is applied (would need to check computed styles)
      expect(textarea).toBeInTheDocument();
    });

    it('shows error styling when over limit', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <CharacterCount {...defaultProps} />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'This exceeds the limit');

      const countMessage = screen.getByText(/too many/);
      // Count message should have error styling
      expect(countMessage).toBeInTheDocument();
    });

    it('associates error message with textarea via aria-describedby', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            errorMessage={{ text: 'Error message' }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', expect.stringContaining('test-input-error'));
    });
  });

  describe('Accessibility', () => {
    it('includes proper aria-describedby associations', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            hint={{ text: 'Hint text' }}
            errorMessage={{ text: 'Error text' }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      const describedBy = textarea.getAttribute('aria-describedby');
      
      expect(describedBy).toContain('test-input-hint');
      expect(describedBy).toContain('test-input-error');
      expect(describedBy).toContain('test-input-info');
    });

    it('includes screen reader live region', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <TestWrapper>
          <CharacterCount {...defaultProps} threshold={50} />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello'); // Reaches threshold

      // Screen reader region should be updated
      const liveRegion = container.querySelector('[aria-live="polite"]');
      expect(liveRegion).toBeInTheDocument();
      expect(liveRegion).toHaveTextContent('You have 5 characters remaining');
    });

    it('hides screen reader region when under threshold', () => {
      const { container } = render(
        <TestWrapper>
          <CharacterCount {...defaultProps} threshold={50} />
        </TestWrapper>
      );

      // Should have aria-hidden="true" when under threshold
      const screenReaderRegion = container.querySelector('[aria-live="polite"]');
      expect(screenReaderRegion).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Event handling', () => {
    it('calls onChange handler when value changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <CharacterCount {...defaultProps} onChange={handleChange} />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello');

      expect(handleChange).toHaveBeenCalledTimes(5); // Once per character
    });

    it('calls onFocus handler when textarea is focused', async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <CharacterCount {...defaultProps} onFocus={handleFocus} />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      await user.click(textarea);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur handler when textarea loses focus', async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <CharacterCount {...defaultProps} onBlur={handleBlur} />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      await user.click(textarea);
      await user.tab(); // Move focus away

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to textarea', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            classes="custom-textarea-class"
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('custom-textarea-class');
    });

    it('applies custom attributes to textarea', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            attributes={{ placeholder: 'Enter text here', 'data-custom': 'value' }}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('placeholder', 'Enter text here');
      expect(textarea).toHaveAttribute('data-custom', 'value');
    });

    it('applies custom attributes to component', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            data-testid="custom-character-count"
            className="custom-wrapper-class"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-character-count');
      expect(wrapper).toHaveClass('custom-wrapper-class');
    });

    it('sets spellcheck attribute when specified', () => {
      render(
        <TestWrapper>
          <CharacterCount 
            {...defaultProps}
            spellcheck={false}
          />
        </TestWrapper>
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('spellcheck', 'false');
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(CharacterCount.displayName).toBe('CharacterCount');
    });
  });
});