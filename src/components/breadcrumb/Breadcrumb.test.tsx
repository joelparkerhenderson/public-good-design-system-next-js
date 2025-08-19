import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Breadcrumb } from './Breadcrumb';
import type { BreadcrumbItem } from './Breadcrumb';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockItems: BreadcrumbItem[] = [
  { text: 'Home', href: '/' },
  { text: 'Health A-Z', href: '/health-a-z' },
  { text: 'Mental health', href: '/health-a-z/mental-health' },
];

describe('Breadcrumb', () => {
  describe('Basic functionality', () => {
    it('renders breadcrumb navigation with items', () => {
      const { container } = render(
        <TestWrapper>
          <Breadcrumb items={mockItems} />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');

      // Check breadcrumb links in the DOM (even if hidden on mobile)
      const homeLink = container.querySelector('a[href="/"]');
      expect(homeLink).toHaveTextContent('Home');

      const healthLink = container.querySelector('a[href="/health-a-z"]');
      expect(healthLink).toHaveTextContent('Health A-Z');

      const mentalHealthLink = container.querySelector('a[href="/health-a-z/mental-health"]');
      expect(mentalHealthLink).toHaveTextContent('Mental health');

      // Check back link exists and is visible
      const backLink = screen.getByRole('link', { name: /Back to Mental health/ });
      expect(backLink).toBeInTheDocument();
    });

    it('renders current page link when text and href provided', () => {
      const { container } = render(
        <TestWrapper>
          <Breadcrumb 
            items={mockItems} 
            text="Depression"
            href="/health-a-z/mental-health/depression"
          />
        </TestWrapper>
      );

      // Check for current page link in breadcrumb (in DOM even if hidden on mobile)
      const currentPageLink = container.querySelector('a[href="/health-a-z/mental-health/depression"]');
      expect(currentPageLink).toHaveTextContent('Depression');

      // Check back link now points to current page
      const backLink = screen.getByRole('link', { name: /Back to Depression/ });
      expect(backLink).toHaveAttribute('href', '/health-a-z/mental-health/depression');
    });

    it('renders back link for mobile', () => {
      render(
        <TestWrapper>
          <Breadcrumb 
            items={mockItems}
            text="Depression"
            href="/health-a-z/mental-health/depression"
          />
        </TestWrapper>
      );

      const backLink = screen.getByRole('link', { name: /Back to Depression/ });
      expect(backLink).toHaveAttribute('href', '/health-a-z/mental-health/depression');
    });

    it('uses last item for back link when no current page provided', () => {
      render(
        <TestWrapper>
          <Breadcrumb items={mockItems} />
        </TestWrapper>
      );

      const backLink = screen.getByRole('link', { name: /Back to Mental health/ });
      expect(backLink).toHaveAttribute('href', '/health-a-z/mental-health');
    });
  });

  describe('Accessibility', () => {
    it('uses custom aria-label when provided', () => {
      render(
        <TestWrapper>
          <Breadcrumb 
            items={mockItems} 
            labelText="Page navigation"
          />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Page navigation');
    });

    it('includes visually hidden text for back link', () => {
      render(
        <TestWrapper>
          <Breadcrumb items={mockItems} />
        </TestWrapper>
      );

      // The visually hidden text is part of the back link
      const backLink = screen.getByRole('link', { name: /Back to Mental health/ });
      expect(backLink).toBeInTheDocument();
    });

    it('renders as ordered list for proper semantics', () => {
      const { container } = render(
        <TestWrapper>
          <Breadcrumb items={mockItems} />
        </TestWrapper>
      );

      const list = container.querySelector('ol');
      expect(list).toBeInTheDocument();

      const listItems = container.querySelectorAll('li');
      expect(listItems).toHaveLength(3);
    });
  });

  describe('Styling variants', () => {
    it('applies reverse styling when enabled', () => {
      const { container } = render(
        <TestWrapper>
          <Breadcrumb items={mockItems} reverse />
        </TestWrapper>
      );

      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
      // Note: Testing reverse styles would require additional setup for styled-components testing
    });
  });

  describe('Edge cases', () => {
    it('renders with empty items array', () => {
      const { container } = render(
        <TestWrapper>
          <Breadcrumb 
            items={[]} 
            text="Current Page"
            href="/current"
          />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();

      // Should show current page in breadcrumb (in DOM even if hidden on mobile)
      const currentPageLink = container.querySelector('a[href="/current"]');
      expect(currentPageLink).toHaveTextContent('Current Page');

      const backLink = screen.getByRole('link', { name: /Back to Current Page/ });
      expect(backLink).toHaveAttribute('href', '/current');
    });

    it('renders items without href as plain text', () => {
      const itemsWithoutHref: BreadcrumbItem[] = [
        { text: 'Home', href: '/' },
        { text: 'Current Section' }, // no href
      ];

      const { container } = render(
        <TestWrapper>
          <Breadcrumb items={itemsWithoutHref} />
        </TestWrapper>
      );

      const homeLink = container.querySelector('a[href="/"]');
      expect(homeLink).toHaveTextContent('Home');

      const currentSectionText = container.querySelector('ol li span');
      expect(currentSectionText).toHaveTextContent('Current Section');

      // Back link should point to last item which has no href, so defaults to '#'
      const backLink = screen.getByRole('link', { name: /Back to Current Section/ });
      expect(backLink).toHaveAttribute('href', '#');
    });

    it('handles missing href for back link gracefully', () => {
      const itemsWithoutHref: BreadcrumbItem[] = [
        { text: 'Home' }, // no href
      ];

      render(
        <TestWrapper>
          <Breadcrumb items={itemsWithoutHref} />
        </TestWrapper>
      );

      const backLink = screen.getByRole('link', { name: /Back to Home/ });
      expect(backLink).toHaveAttribute('href', '#');
    });
  });

  describe('Custom attributes', () => {
    it('applies custom attributes to navigation element', () => {
      render(
        <TestWrapper>
          <Breadcrumb 
            items={mockItems}
            data-testid="custom-breadcrumb"
            className="custom-class"
            id="breadcrumb-nav"
          />
        </TestWrapper>
      );

      const nav = screen.getByTestId('custom-breadcrumb');
      expect(nav).toHaveClass('custom-class');
      expect(nav).toHaveAttribute('id', 'breadcrumb-nav');
    });

    it('applies custom attributes to breadcrumb items', () => {
      const itemsWithAttributes: BreadcrumbItem[] = [
        { 
          text: 'Home', 
          href: '/',
          attributes: { 'data-analytics': 'home-breadcrumb' }
        },
      ];

      const { container } = render(
        <TestWrapper>
          <Breadcrumb items={itemsWithAttributes} />
        </TestWrapper>
      );

      const link = container.querySelector('[data-analytics="home-breadcrumb"]');
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent('Home');
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Breadcrumb.displayName).toBe('Breadcrumb');
    });
  });
});