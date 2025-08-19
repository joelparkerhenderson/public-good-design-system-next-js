import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Tag, TagVariant } from './Tag';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Tag', () => {
  describe('Basic functionality', () => {
    it('renders with text content', () => {
      render(
        <TestWrapper>
          <Tag text="Active" />
        </TestWrapper>
      );

      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('renders with HTML content', () => {
      render(
        <TestWrapper>
          <Tag html="<strong>Important</strong>" />
        </TestWrapper>
      );

      const element = screen.getByText('Important');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('STRONG');
    });

    it('prefers HTML content over text content', () => {
      render(
        <TestWrapper>
          <Tag text="Plain text" html="<em>HTML content</em>" />
        </TestWrapper>
      );

      expect(screen.getByText('HTML content')).toBeInTheDocument();
      expect(screen.queryByText('Plain text')).not.toBeInTheDocument();
    });

    it('renders as strong element', () => {
      render(
        <TestWrapper>
          <Tag text="Active" />
        </TestWrapper>
      );

      const tag = screen.getByText('Active');
      expect(tag.tagName).toBe('STRONG');
    });
  });

  describe('Variants', () => {
    const variants: TagVariant[] = [
      'default',
      'white',
      'grey',
      'green',
      'aqua-green',
      'blue',
      'purple',
      'pink',
      'red',
      'orange',
      'yellow'
    ];

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        render(
          <TestWrapper>
            <Tag text="Test" variant={variant} />
          </TestWrapper>
        );

        const tag = screen.getByText('Test');
        if (variant === 'default') {
          expect(tag).toHaveClass('nhsuk-tag');
          expect(tag).not.toHaveClass('nhsuk-tag--default');
        } else {
          expect(tag).toHaveClass(`nhsuk-tag--${variant}`);
        }
      });
    });
  });

  describe('No border variant', () => {
    it('adds no-border class when noBorder is true', () => {
      render(
        <TestWrapper>
          <Tag text="Test" noBorder />
        </TestWrapper>
      );

      const tag = screen.getByText('Test');
      expect(tag).toHaveClass('nhsuk-tag--no-border');
    });

    it('does not add no-border class when noBorder is false', () => {
      render(
        <TestWrapper>
          <Tag text="Test" noBorder={false} />
        </TestWrapper>
      );

      const tag = screen.getByText('Test');
      expect(tag).not.toHaveClass('nhsuk-tag--no-border');
    });
  });

  describe('Custom attributes', () => {
    it('applies data-testid', () => {
      render(
        <TestWrapper>
          <Tag text="Test" data-testid="tag-test" />
        </TestWrapper>
      );

      expect(screen.getByTestId('tag-test')).toBeInTheDocument();
    });

    it('applies additional className', () => {
      render(
        <TestWrapper>
          <Tag text="Test" className="custom-class" />
        </TestWrapper>
      );

      const tag = screen.getByText('Test');
      expect(tag).toHaveClass('custom-class');
      expect(tag).toHaveClass('nhsuk-tag');
    });

    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <Tag text="Test" attributes={{ 'data-track': 'tag-click', 'aria-label': 'Status tag' }} />
        </TestWrapper>
      );

      const tag = screen.getByText('Test');
      expect(tag).toHaveAttribute('data-track', 'tag-click');
      expect(tag).toHaveAttribute('aria-label', 'Status tag');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders patient status tag', () => {
      render(
        <TestWrapper>
          <Tag text="Admitted" variant="blue" />
        </TestWrapper>
      );

      expect(screen.getByText('Admitted')).toBeInTheDocument();
      expect(screen.getByText('Admitted')).toHaveClass('nhsuk-tag--blue');
    });

    it('renders medication status tag', () => {
      render(
        <TestWrapper>
          <Tag text="Active" variant="green" />
        </TestWrapper>
      );

      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Active')).toHaveClass('nhsuk-tag--green');
    });

    it('renders urgent alert tag', () => {
      render(
        <TestWrapper>
          <Tag text="Urgent" variant="red" />
        </TestWrapper>
      );

      expect(screen.getByText('Urgent')).toBeInTheDocument();
      expect(screen.getByText('Urgent')).toHaveClass('nhsuk-tag--red');
    });

    it('renders appointment status with HTML', () => {
      render(
        <TestWrapper>
          <Tag html="<strong>Confirmed</strong>" variant="green" />
        </TestWrapper>
      );

      const element = screen.getByText('Confirmed');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('STRONG');
    });

    it('renders priority levels', () => {
      const priorities = [
        { text: 'High', variant: 'red' as TagVariant },
        { text: 'Medium', variant: 'orange' as TagVariant },
        { text: 'Low', variant: 'green' as TagVariant }
      ];

      priorities.forEach(({ text, variant }) => {
        render(
          <TestWrapper>
            <Tag text={text} variant={variant} />
          </TestWrapper>
        );

        expect(screen.getByText(text)).toBeInTheDocument();
        expect(screen.getByText(text)).toHaveClass(`nhsuk-tag--${variant}`);
      });
    });
  });

  describe('Accessibility', () => {
    it('maintains semantic structure', () => {
      render(
        <TestWrapper>
          <Tag text="Status" />
        </TestWrapper>
      );

      const tag = screen.getByText('Status');
      expect(tag.tagName).toBe('STRONG');
    });

    it('supports aria-label for better accessibility', () => {
      render(
        <TestWrapper>
          <Tag 
            text="!" 
            variant="red" 
            attributes={{ 'aria-label': 'Alert: Critical status' }}
          />
        </TestWrapper>
      );

      const tag = screen.getByLabelText('Alert: Critical status');
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveTextContent('!');
    });

    it('works with screen readers', () => {
      render(
        <TestWrapper>
          <Tag 
            text="New Message" 
            variant="blue"
            attributes={{ 'role': 'status', 'aria-live': 'polite' }}
          />
        </TestWrapper>
      );

      const tag = screen.getByRole('status');
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Tag.displayName).toBe('Tag');
    });
  });
});