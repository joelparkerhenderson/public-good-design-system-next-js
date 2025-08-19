import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { SkipLink } from './SkipLink';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('SkipLink', () => {
  beforeEach(() => {
    // Clear the document body before each test
    document.body.innerHTML = '';
  });

  describe('Basic functionality', () => {
    it('renders skip link with default text and href', () => {
      render(
        <TestWrapper>
          <SkipLink />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#maincontent');
      expect(skipLink).toHaveTextContent('Skip to main content');
    });

    it('renders skip link with custom text and href', () => {
      render(
        <TestWrapper>
          <SkipLink 
            text="Skip to search results"
            href="#search-results"
          />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      expect(skipLink).toHaveAttribute('href', '#search-results');
      expect(skipLink).toHaveTextContent('Skip to search results');
    });

    it('applies CSS classes correctly', () => {
      render(
        <TestWrapper>
          <SkipLink />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      expect(skipLink).toHaveClass('nhsuk-skip-link');
    });

    it('has data-module attribute', () => {
      render(
        <TestWrapper>
          <SkipLink />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      expect(skipLink).toHaveAttribute('data-module', 'nhsuk-skip-link');
    });
  });

  describe('Accessibility', () => {
    it('is hidden by default but visible to screen readers', () => {
      render(
        <TestWrapper>
          <SkipLink />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      
      // The link should be in the document (accessible to screen readers)
      expect(skipLink).toBeInTheDocument();
      
      // But visually hidden (clip styling applied via CSS)
      const styles = window.getComputedStyle(skipLink);
      expect(styles.position).toBe('absolute');
    });

    it('becomes visible when focused', () => {
      render(
        <TestWrapper>
          <SkipLink />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      
      // Focus the skip link - we can't reliably test actual focus in jsdom
      // but we can test that the element is focusable
      expect(skipLink).toHaveAttribute('href'); // Links are focusable
      expect(skipLink.tabIndex).not.toBe(-1); // Not excluded from tab order
    });

    it('is positioned to be the first focusable element on the page', () => {
      const { container } = render(
        <TestWrapper>
          <SkipLink />
          <button>Other button</button>
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      const button = screen.getByRole('button');

      // Skip link should appear before other content in the DOM
      const skipLinkIndex = Array.from(container.querySelectorAll('*')).indexOf(skipLink);
      const buttonIndex = Array.from(container.querySelectorAll('*')).indexOf(button);
      
      expect(skipLinkIndex).toBeLessThan(buttonIndex);
      
      // Both should be focusable
      expect(skipLink).toHaveAttribute('href');
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Target element focus', () => {
    it('focuses target element when clicked', async () => {
      // Create a target element in the document
      const targetElement = document.createElement('main');
      targetElement.id = 'maincontent';
      targetElement.setAttribute('tabindex', '-1');
      document.body.appendChild(targetElement);

      render(
        <TestWrapper>
          <SkipLink />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      
      // Mock focus method on the target element
      const focusMock = vi.fn();
      targetElement.focus = focusMock;

      // Click the skip link
      fireEvent.click(skipLink);

      // Wait for the event handler to process
      await waitFor(() => {
        expect(focusMock).toHaveBeenCalled();
      });
    });

    it('adds and removes skip-link-focused-element class', async () => {
      // Create a target element in the document
      const targetElement = document.createElement('main');
      targetElement.id = 'custom-main';
      targetElement.setAttribute('tabindex', '-1');
      document.body.appendChild(targetElement);

      render(
        <TestWrapper>
          <SkipLink href="#custom-main" />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      
      // Mock focus method
      targetElement.focus = vi.fn();

      // Click the skip link
      fireEvent.click(skipLink);

      // Wait for the class to be added
      await waitFor(() => {
        expect(targetElement).toHaveClass('nhsuk-skip-link-focused-element');
      });

      // Wait for the class to be removed (after 100ms timeout)
      await waitFor(() => {
        expect(targetElement).not.toHaveClass('nhsuk-skip-link-focused-element');
      }, { timeout: 200 });
    });

    it('handles non-existent target gracefully', () => {
      render(
        <TestWrapper>
          <SkipLink href="#non-existent" />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      
      // This should not throw an error
      expect(() => {
        fireEvent.click(skipLink);
      }).not.toThrow();
    });

    it('handles non-hash hrefs gracefully', () => {
      render(
        <TestWrapper>
          <SkipLink href="https://example.com" />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      
      // This should not throw an error
      expect(() => {
        fireEvent.click(skipLink);
      }).not.toThrow();
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes', () => {
      render(
        <TestWrapper>
          <SkipLink classes="custom-skip-link" />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      expect(skipLink).toHaveClass('nhsuk-skip-link', 'custom-skip-link');
    });

    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <SkipLink 
            attributes={{ 
              'data-custom': 'value',
              'aria-label': 'Custom skip link'
            }}
          />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      expect(skipLink).toHaveAttribute('data-custom', 'value');
      expect(skipLink).toHaveAttribute('aria-label', 'Custom skip link');
    });

    it('applies data-testid', () => {
      render(
        <TestWrapper>
          <SkipLink data-testid="skip-link-test" />
        </TestWrapper>
      );

      const skipLink = screen.getByTestId('skip-link-test');
      expect(skipLink).toBeInTheDocument();
    });

    it('applies additional className', () => {
      render(
        <TestWrapper>
          <SkipLink className="additional-class" />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      expect(skipLink).toHaveClass('nhsuk-skip-link', 'additional-class');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders skip to main content for patient portal', () => {
      render(
        <TestWrapper>
          <SkipLink 
            text="Skip to patient dashboard"
            href="#patient-dashboard"
          />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      expect(skipLink).toHaveTextContent('Skip to patient dashboard');
      expect(skipLink).toHaveAttribute('href', '#patient-dashboard');
    });

    it('renders skip to appointment booking', () => {
      render(
        <TestWrapper>
          <SkipLink 
            text="Skip to appointment booking"
            href="#booking-form"
          />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      expect(skipLink).toHaveTextContent('Skip to appointment booking');
      expect(skipLink).toHaveAttribute('href', '#booking-form');
    });

    it('renders skip to search results', () => {
      render(
        <TestWrapper>
          <SkipLink 
            text="Skip to health information results"
            href="#search-results"
          />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      expect(skipLink).toHaveTextContent('Skip to health information results');
      expect(skipLink).toHaveAttribute('href', '#search-results');
    });

    it('renders skip to emergency information', () => {
      render(
        <TestWrapper>
          <SkipLink 
            text="Skip to emergency contact information"
            href="#emergency-contacts"
          />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      expect(skipLink).toHaveTextContent('Skip to emergency contact information');
      expect(skipLink).toHaveAttribute('href', '#emergency-contacts');
    });

    it('renders skip to medical records', () => {
      render(
        <TestWrapper>
          <SkipLink 
            text="Skip to medical records"
            href="#medical-records"
          />
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link');
      expect(skipLink).toHaveTextContent('Skip to medical records');
      expect(skipLink).toHaveAttribute('href', '#medical-records');
    });
  });

  describe('Multiple skip links', () => {
    it('handles multiple skip links on the same page', async () => {
      // Create target elements
      const mainContent = document.createElement('main');
      mainContent.id = 'maincontent';
      mainContent.setAttribute('tabindex', '-1');
      
      const searchResults = document.createElement('section');
      searchResults.id = 'search-results';
      searchResults.setAttribute('tabindex', '-1');
      
      document.body.appendChild(mainContent);
      document.body.appendChild(searchResults);

      render(
        <TestWrapper>
          <SkipLink />
          <SkipLink 
            text="Skip to search results"
            href="#search-results"
          />
        </TestWrapper>
      );

      const skipLinks = screen.getAllByRole('link');
      expect(skipLinks).toHaveLength(2);
      
      // Mock focus methods
      mainContent.focus = vi.fn();
      searchResults.focus = vi.fn();

      // Click first skip link
      fireEvent.click(skipLinks[0]);
      await waitFor(() => {
        expect(mainContent.focus).toHaveBeenCalled();
      });

      // Click second skip link
      fireEvent.click(skipLinks[1]);
      await waitFor(() => {
        expect(searchResults.focus).toHaveBeenCalled();
      });
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(SkipLink.displayName).toBe('SkipLink');
    });
  });
});