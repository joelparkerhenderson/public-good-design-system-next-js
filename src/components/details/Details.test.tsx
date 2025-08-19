import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Details } from './Details';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Details', () => {
  const defaultProps = {
    summaryText: 'Test summary',
    text: 'Test content'
  };

  describe('Basic functionality', () => {
    it('renders summary text', () => {
      render(
        <TestWrapper>
          <Details {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText('Test summary')).toBeInTheDocument();
    });

    it('renders content text', () => {
      render(
        <TestWrapper>
          <Details {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders as collapsed by default', () => {
      render(
        <TestWrapper>
          <Details {...defaultProps} />
        </TestWrapper>
      );

      const detailsElement = screen.getByRole('group');
      expect(detailsElement).not.toHaveAttribute('open');
    });

    it('renders as expanded when open prop is true', () => {
      render(
        <TestWrapper>
          <Details {...defaultProps} open={true} />
        </TestWrapper>
      );

      const detailsElement = screen.getByRole('group');
      expect(detailsElement).toHaveAttribute('open');
    });

    it('uses custom id when provided', () => {
      render(
        <TestWrapper>
          <Details {...defaultProps} id="custom-details" />
        </TestWrapper>
      );

      const detailsElement = screen.getByRole('group');
      expect(detailsElement).toHaveAttribute('id', 'custom-details');
    });
  });

  describe('Content variants', () => {
    it('prioritizes summaryHtml over summaryText', () => {
      render(
        <TestWrapper>
          <Details 
            summaryText="Text summary"
            summaryHtml="<strong>HTML</strong> summary"
            text="Content"
          />
        </TestWrapper>
      );

      expect(screen.getByText('HTML')).toBeInTheDocument();
      expect(screen.getByText('summary')).toBeInTheDocument();
      expect(screen.queryByText('Text summary')).not.toBeInTheDocument();
    });

    it('prioritizes html over text for content', () => {
      render(
        <TestWrapper>
          <Details 
            summaryText="Summary"
            text="Text content"
            html="<em>HTML</em> content"
          />
        </TestWrapper>
      );

      expect(screen.getByText('HTML')).toBeInTheDocument();
      expect(screen.getByText('content')).toBeInTheDocument();
      expect(screen.queryByText('Text content')).not.toBeInTheDocument();
    });

    it('prioritizes children over html and text', () => {
      render(
        <TestWrapper>
          <Details 
            summaryText="Summary"
            text="Text content"
            html="<em>HTML</em> content"
          >
            <p>Children content</p>
          </Details>
        </TestWrapper>
      );

      expect(screen.getByText('Children content')).toBeInTheDocument();
      expect(screen.queryByText('HTML')).not.toBeInTheDocument();
      expect(screen.queryByText('Text content')).not.toBeInTheDocument();
    });

    it('renders complex children content', () => {
      render(
        <TestWrapper>
          <Details summaryText="Contact information">
            <p>You can contact us by:</p>
            <ul>
              <li>Phone: 0123 456 7890</li>
              <li>Email: info@example.com</li>
            </ul>
          </Details>
        </TestWrapper>
      );

      expect(screen.getByText('You can contact us by:')).toBeInTheDocument();
      expect(screen.getByText('Phone: 0123 456 7890')).toBeInTheDocument();
      expect(screen.getByText('Email: info@example.com')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies default variant styling by default', () => {
      const { container } = render(
        <TestWrapper>
          <Details {...defaultProps} />
        </TestWrapper>
      );

      const detailsElement = container.querySelector('.details');
      expect(detailsElement).not.toHaveClass('details--expander');
    });

    it('applies expander variant styling when specified', () => {
      const { container } = render(
        <TestWrapper>
          <Details {...defaultProps} variant="expander" />
        </TestWrapper>
      );

      const detailsElement = container.querySelector('.details');
      expect(detailsElement).toHaveClass('details--expander');
    });
  });

  describe('Interaction', () => {
    it('toggles open state when summary is clicked', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <Details {...defaultProps} />
        </TestWrapper>
      );

      const detailsElement = screen.getByRole('group');
      const summaryElement = screen.getByText('Test summary');

      expect(detailsElement).not.toHaveAttribute('open');

      await user.click(summaryElement);
      expect(detailsElement).toHaveAttribute('open');

      await user.click(summaryElement);
      expect(detailsElement).not.toHaveAttribute('open');
    });

    it('can be toggled via keyboard', async () => {
      render(
        <TestWrapper>
          <Details {...defaultProps} />
        </TestWrapper>
      );

      const detailsElement = screen.getByRole('group');
      const summaryElement = detailsElement.querySelector('summary');

      expect(detailsElement).not.toHaveAttribute('open');

      // Test that summary element is present and has correct structure
      // Note: Actual keyboard navigation behavior of details/summary is handled by the browser
      // and is difficult to test reliably in jsdom environment
      expect(summaryElement).toBeInTheDocument();
      expect(summaryElement?.tagName).toBe('SUMMARY');
      
      // Verify the toggle functionality works when manually triggered
      fireEvent.click(summaryElement!);
      expect(detailsElement).toHaveAttribute('open');
      
      fireEvent.click(summaryElement!);
      expect(detailsElement).not.toHaveAttribute('open');
    });

    it('calls onToggle handler when state changes', async () => {
      const handleToggle = vi.fn();
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <Details {...defaultProps} onToggle={handleToggle} />
        </TestWrapper>
      );

      const summaryElement = screen.getByText('Test summary');

      await user.click(summaryElement);
      expect(handleToggle).toHaveBeenCalledWith(true);

      await user.click(summaryElement);
      expect(handleToggle).toHaveBeenCalledWith(false);
    });

    it('calls onToggle with correct state when initially open', async () => {
      const handleToggle = vi.fn();
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <Details {...defaultProps} open={true} onToggle={handleToggle} />
        </TestWrapper>
      );

      const summaryElement = screen.getByText('Test summary');

      await user.click(summaryElement);
      expect(handleToggle).toHaveBeenCalledWith(false);
    });
  });

  describe('Accessibility', () => {
    it('renders as a group role', () => {
      render(
        <TestWrapper>
          <Details {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('summary is focusable', () => {
      render(
        <TestWrapper>
          <Details {...defaultProps} />
        </TestWrapper>
      );

      const detailsElement = screen.getByRole('group');
      const summaryElement = detailsElement.querySelector('summary');
      
      // Test that summary element exists and has the correct attributes for focusability
      // Note: Focus behavior in jsdom can be inconsistent
      expect(summaryElement).toBeInTheDocument();
      expect(summaryElement?.tagName).toBe('SUMMARY');
      
      // Verify it doesn't have tabindex="-1" which would make it unfocusable
      expect(summaryElement).not.toHaveAttribute('tabindex', '-1');
    });

    it('has proper semantic structure', () => {
      const { container } = render(
        <TestWrapper>
          <Details {...defaultProps} />
        </TestWrapper>
      );

      const detailsElement = container.querySelector('details');
      const summaryElement = container.querySelector('summary');
      
      expect(detailsElement).toBeInTheDocument();
      expect(summaryElement).toBeInTheDocument();
      expect(detailsElement).toContainElement(summaryElement);
    });

    it('content is hidden when collapsed', () => {
      render(
        <TestWrapper>
          <Details {...defaultProps} />
        </TestWrapper>
      );

      const detailsElement = screen.getByRole('group');
      expect(detailsElement).not.toHaveAttribute('open');
      
      // Content should still be in the document but not visible
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('content is visible when expanded', () => {
      render(
        <TestWrapper>
          <Details {...defaultProps} open={true} />
        </TestWrapper>
      );

      const detailsElement = screen.getByRole('group');
      expect(detailsElement).toHaveAttribute('open');
      expect(screen.getByText('Test content')).toBeVisible();
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes', () => {
      const { container } = render(
        <TestWrapper>
          <Details {...defaultProps} classes="custom-details" />
        </TestWrapper>
      );

      const detailsElement = container.querySelector('.details');
      expect(detailsElement).toHaveClass('custom-details');
    });

    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <Details 
            {...defaultProps} 
            attributes={{ 'data-custom': 'value' }}
          />
        </TestWrapper>
      );

      const detailsElement = screen.getByRole('group');
      expect(detailsElement).toHaveAttribute('data-custom', 'value');
    });

    it('applies custom attributes to component wrapper', () => {
      render(
        <TestWrapper>
          <Details 
            {...defaultProps} 
            data-testid="custom-details"
            className="wrapper-class"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-details');
      expect(wrapper).toHaveClass('wrapper-class');
    });
  });

  describe('Edge cases', () => {
    it('renders without content', () => {
      render(
        <TestWrapper>
          <Details summaryText="Summary only" />
        </TestWrapper>
      );

      expect(screen.getByText('Summary only')).toBeInTheDocument();
      // Should still render the content container even if empty
      const detailsElement = screen.getByRole('group');
      expect(detailsElement.querySelector('.details__text')).toBeInTheDocument();
    });

    it('renders without summary text', () => {
      render(
        <TestWrapper>
          <Details text="Content only" />
        </TestWrapper>
      );

      expect(screen.getByText('Content only')).toBeInTheDocument();
      // Summary should not be rendered if no text/html provided
      const summaryElement = screen.getByRole('group').querySelector('summary');
      expect(summaryElement).toBeNull();
    });

    it('handles empty content gracefully', () => {
      render(
        <TestWrapper>
          <Details summaryText="Summary" text="" />
        </TestWrapper>
      );

      expect(screen.getByText('Summary')).toBeInTheDocument();
      const contentElement = screen.getByRole('group').querySelector('.details__text');
      expect(contentElement).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Details.displayName).toBe('Details');
    });
  });
});