import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Pagination } from './Pagination';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Pagination', () => {
  describe('Basic functionality', () => {
    it('renders pagination with both previous and next links', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/previous"
            previousPage="Previous Page"
            nextUrl="/next"
            nextPage="Next Page"
          />
        </TestWrapper>
      );

      expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Previous.*Previous Page/i })).toHaveAttribute('href', '/previous');
      expect(screen.getByRole('link', { name: /Next.*Next Page/i })).toHaveAttribute('href', '/next');
    });

    it('renders only previous link when next is not provided', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/previous"
            previousPage="Previous Page"
          />
        </TestWrapper>
      );

      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Previous.*Previous Page/i })).toBeInTheDocument();
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
    });

    it('renders only next link when previous is not provided', () => {
      render(
        <TestWrapper>
          <Pagination 
            nextUrl="/next"
            nextPage="Next Page"
          />
        </TestWrapper>
      );

      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Next.*Next Page/i })).toBeInTheDocument();
      expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    });

    it('returns null when no links are provided', () => {
      const { container } = render(
        <TestWrapper>
          <Pagination />
        </TestWrapper>
      );

      expect(container.firstChild).toBeNull();
    });

    it('does not render if only URL is provided without page text', () => {
      const { container } = render(
        <TestWrapper>
          <Pagination previousUrl="/previous" nextUrl="/next" />
        </TestWrapper>
      );

      expect(container.firstChild).toBeNull();
    });

    it('does not render if only page text is provided without URL', () => {
      const { container } = render(
        <TestWrapper>
          <Pagination previousPage="Previous Page" nextPage="Next Page" />
        </TestWrapper>
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('Content and structure', () => {
    it('displays correct titles and page names', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/symptoms"
            previousPage="Symptoms"
            nextUrl="/treatments"
            nextPage="Treatments"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(screen.getByText('Symptoms')).toBeInTheDocument();
      expect(screen.getByText('Treatments')).toBeInTheDocument();
    });

    it('includes visually hidden colons for screen readers', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/previous"
            previousPage="Previous Page"
            nextUrl="/next"
            nextPage="Next Page"
          />
        </TestWrapper>
      );

      const colons = screen.getAllByText(':');
      expect(colons).toHaveLength(2);
      // The colons should be visually hidden (we can check they exist)
      colons.forEach(colon => {
        expect(colon).toBeInTheDocument();
      });
    });

    it('renders arrow icons', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/previous"
            previousPage="Previous Page"
            nextUrl="/next"
            nextPage="Next Page"
          />
        </TestWrapper>
      );

      // Find the SVG elements by their aria-hidden attribute
      const container = screen.getByRole('navigation');
      const svgs = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(svgs).toHaveLength(2);
      svgs.forEach(svg => {
        expect(svg).toHaveAttribute('aria-hidden', 'true');
        expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      });
    });
  });

  describe('CSS classes and structure', () => {
    it('applies correct CSS classes to navigation', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/previous"
            previousPage="Previous Page"
          />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('nhsuk-pagination');
    });

    it('applies correct CSS classes to list and items', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/previous"
            previousPage="Previous Page"
            nextUrl="/next"
            nextPage="Next Page"
          />
        </TestWrapper>
      );

      const list = screen.getByRole('list');
      expect(list).toHaveClass('nhsuk-list');
      expect(list).toHaveClass('nhsuk-pagination__list');

      const items = screen.getAllByRole('listitem');
      expect(items[0]).toHaveClass('nhsuk-pagination-item--previous');
      expect(items[1]).toHaveClass('nhsuk-pagination-item--next');
    });

    it('applies correct CSS classes to links', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/previous"
            previousPage="Previous Page"
            nextUrl="/next"
            nextPage="Next Page"
          />
        </TestWrapper>
      );

      const links = screen.getAllByRole('link');
      expect(links[0]).toHaveClass('nhsuk-pagination__link');
      expect(links[0]).toHaveClass('nhsuk-pagination__link--prev');
      expect(links[1]).toHaveClass('nhsuk-pagination__link');
      expect(links[1]).toHaveClass('nhsuk-pagination__link--next');
    });

    it('applies correct CSS classes to titles and pages', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/previous"
            previousPage="Previous Page"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Previous')).toHaveClass('nhsuk-pagination__title');
      expect(screen.getByText('Previous Page')).toHaveClass('nhsuk-pagination__page');
    });
  });

  describe('Custom attributes and props', () => {
    it('applies data-testid', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/previous"
            previousPage="Previous Page"
            data-testid="pagination-test"
          />
        </TestWrapper>
      );

      expect(screen.getByTestId('pagination-test')).toBeInTheDocument();
    });

    it('applies additional className', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/previous"
            previousPage="Previous Page"
            className="custom-class"
          />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('nhsuk-pagination');
      expect(nav).toHaveClass('custom-class');
    });

    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/previous"
            previousPage="Previous Page"
            attributes={{ 'data-track': 'pagination-nav', 'aria-labelledby': 'custom-label' }}
          />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('data-track', 'pagination-nav');
      expect(nav).toHaveAttribute('aria-labelledby', 'custom-label');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders diabetes guide pagination', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/diabetes/symptoms"
            previousPage="Symptoms"
            nextUrl="/diabetes/treatment"
            nextPage="Treatment and management"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Symptoms')).toBeInTheDocument();
      expect(screen.getByText('Treatment and management')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Previous.*Symptoms/i })).toHaveAttribute('href', '/diabetes/symptoms');
      expect(screen.getByRole('link', { name: /Next.*Treatment and management/i })).toHaveAttribute('href', '/diabetes/treatment');
    });

    it('renders cancer treatment guide pagination', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/cancer/diagnosis"
            previousPage="Getting a diagnosis"
            nextUrl="/cancer/support"
            nextPage="Support and resources"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Getting a diagnosis')).toBeInTheDocument();
      expect(screen.getByText('Support and resources')).toBeInTheDocument();
    });

    it('renders multi-step form pagination', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/appointment/step-2"
            previousPage="Medical history"
            nextUrl="/appointment/step-4"
            nextPage="Review and submit"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Medical history')).toBeInTheDocument();
      expect(screen.getByText('Review and submit')).toBeInTheDocument();
    });

    it('renders NHS service guide pagination', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/nhs-services/gp"
            previousPage="GP services"
            nextUrl="/nhs-services/emergency"
            nextPage="Emergency services"
          />
        </TestWrapper>
      );

      expect(screen.getByText('GP services')).toBeInTheDocument();
      expect(screen.getByText('Emergency services')).toBeInTheDocument();
    });

    it('renders medication guide pagination', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/medications/side-effects"
            previousPage="Side effects and interactions"
            nextUrl="/medications/storage"
            nextPage="Storage and disposal"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Side effects and interactions')).toBeInTheDocument();
      expect(screen.getByText('Storage and disposal')).toBeInTheDocument();
    });

    it('renders pregnancy guide pagination', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/pregnancy/week-20"
            previousPage="Week 20: Your baby's development"
            nextUrl="/pregnancy/week-22"
            nextPage="Week 22: Preparing for baby"
          />
        </TestWrapper>
      );

      expect(screen.getByText("Week 20: Your baby's development")).toBeInTheDocument();
      expect(screen.getByText('Week 22: Preparing for baby')).toBeInTheDocument();
    });

    it('renders mental health guide pagination', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/mental-health/recognising-signs"
            previousPage="Recognising the signs"
            nextUrl="/mental-health/getting-help"
            nextPage="Getting help and support"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Recognising the signs')).toBeInTheDocument();
      expect(screen.getByText('Getting help and support')).toBeInTheDocument();
    });
  });

  describe('Accessibility features', () => {
    it('has proper navigation role and aria-label', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/previous"
            previousPage="Previous Page"
            nextUrl="/next"
            nextPage="Next Page"
          />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Pagination');
    });

    it('provides accessible link text with screen reader content', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/symptoms"
            previousPage="Symptoms"
            nextUrl="/treatment"
            nextPage="Treatment"
          />
        </TestWrapper>
      );

      const previousLink = screen.getByRole('link', { name: /Previous.*Symptoms/i });
      const nextLink = screen.getByRole('link', { name: /Next.*Treatment/i });

      expect(previousLink).toBeInTheDocument();
      expect(nextLink).toBeInTheDocument();
    });

    it('maintains keyboard navigation', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/previous"
            previousPage="Previous Page"
            nextUrl="/next"
            nextPage="Next Page"
          />
        </TestWrapper>
      );

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link.getAttribute('href')).toBeTruthy();
      });
    });
  });

  describe('Edge cases and validation', () => {
    it('handles long page titles gracefully', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/long"
            previousPage="This is a very long page title that might wrap to multiple lines in some layouts"
            nextUrl="/also-long"
            nextPage="Another extremely long page title that tests how the component handles lengthy text content"
          />
        </TestWrapper>
      );

      expect(screen.getByText('This is a very long page title that might wrap to multiple lines in some layouts')).toBeInTheDocument();
      expect(screen.getByText('Another extremely long page title that tests how the component handles lengthy text content')).toBeInTheDocument();
    });

    it('handles special characters in page titles', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/special"
            previousPage='Page with "quotes" & symbols <>'
            nextUrl="/unicode"
            nextPage="Página en español & français"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Page with "quotes" & symbols <>')).toBeInTheDocument();
      expect(screen.getByText('Página en español & français')).toBeInTheDocument();
    });

    it('handles empty string values gracefully', () => {
      const { container } = render(
        <TestWrapper>
          <Pagination 
            previousUrl=""
            previousPage=""
            nextUrl=""
            nextPage=""
          />
        </TestWrapper>
      );

      expect(container.firstChild).toBeNull();
    });

    it('handles partial data correctly', () => {
      render(
        <TestWrapper>
          <Pagination 
            previousUrl="/valid"
            previousPage=""
            nextUrl=""
            nextPage="Valid Next"
          />
        </TestWrapper>
      );

      // Should not render since required pairs are incomplete
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Pagination.displayName).toBe('Pagination');
    });
  });
});