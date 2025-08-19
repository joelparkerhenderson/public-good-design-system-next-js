import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { ContentsList, ContentsListItem } from './ContentsList';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('ContentsList', () => {
  const basicItems: ContentsListItem[] = [
    { href: '#what-is-amd', text: 'What is AMD?', current: true },
    { href: '#symptoms', text: 'Symptoms' },
    { href: '#diagnosis', text: 'Getting diagnosed' },
    { href: '#treatment', text: 'Treatments' },
    { href: '#living-with', text: 'Living with AMD' }
  ];

  describe('Basic functionality', () => {
    it('renders contents list with navigation role and ARIA label', () => {
      render(
        <TestWrapper>
          <ContentsList items={basicItems} />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation', { name: 'Pages in this guide' });
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass('nhsuk-contents-list');
    });

    it('renders visually hidden "Contents" heading', () => {
      render(
        <TestWrapper>
          <ContentsList items={basicItems} />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { name: 'Contents' });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('renders ordered list with proper structure', () => {
      render(
        <TestWrapper>
          <ContentsList items={basicItems} />
        </TestWrapper>
      );

      const list = screen.getByRole('list');
      expect(list.tagName).toBe('OL');
      expect(list).toHaveClass('nhsuk-contents-list__list');
      
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(5);
    });

    it('renders current page item as span with aria-current', () => {
      render(
        <TestWrapper>
          <ContentsList items={basicItems} />
        </TestWrapper>
      );

      const currentItem = screen.getByText('What is AMD?');
      expect(currentItem.tagName).toBe('SPAN');
      expect(currentItem).toHaveClass('nhsuk-contents-list__current');
      
      const currentListItem = currentItem.closest('li');
      expect(currentListItem).toHaveAttribute('aria-current', 'page');
    });

    it('renders non-current items as links', () => {
      render(
        <TestWrapper>
          <ContentsList items={basicItems} />
        </TestWrapper>
      );

      const symptomLink = screen.getByRole('link', { name: 'Symptoms' });
      expect(symptomLink).toBeInTheDocument();
      expect(symptomLink).toHaveAttribute('href', '#symptoms');
      expect(symptomLink).toHaveClass('nhsuk-contents-list__link');

      const diagnosisLink = screen.getByRole('link', { name: 'Getting diagnosed' });
      expect(diagnosisLink).toHaveAttribute('href', '#diagnosis');
    });

    it('renders all items with correct text', () => {
      render(
        <TestWrapper>
          <ContentsList items={basicItems} />
        </TestWrapper>
      );

      expect(screen.getByText('What is AMD?')).toBeInTheDocument();
      expect(screen.getByText('Symptoms')).toBeInTheDocument();
      expect(screen.getByText('Getting diagnosed')).toBeInTheDocument();
      expect(screen.getByText('Treatments')).toBeInTheDocument();
      expect(screen.getByText('Living with AMD')).toBeInTheDocument();
    });
  });

  describe('Current page handling', () => {
    it('handles single current page correctly', () => {
      const items: ContentsListItem[] = [
        { href: '/page1', text: 'Page 1' },
        { href: '/page2', text: 'Page 2', current: true },
        { href: '/page3', text: 'Page 3' }
      ];

      render(
        <TestWrapper>
          <ContentsList items={items} />
        </TestWrapper>
      );

      // Current page should not be a link
      expect(screen.queryByRole('link', { name: 'Page 2' })).not.toBeInTheDocument();
      expect(screen.getByText('Page 2')).toHaveClass('nhsuk-contents-list__current');

      // Other pages should be links
      expect(screen.getByRole('link', { name: 'Page 1' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Page 3' })).toBeInTheDocument();
    });

    it('handles no current page', () => {
      const items: ContentsListItem[] = [
        { href: '/page1', text: 'Page 1' },
        { href: '/page2', text: 'Page 2' },
        { href: '/page3', text: 'Page 3' }
      ];

      render(
        <TestWrapper>
          <ContentsList items={items} />
        </TestWrapper>
      );

      // All should be links
      expect(screen.getByRole('link', { name: 'Page 1' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Page 2' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Page 3' })).toBeInTheDocument();

      // No aria-current attributes
      const listItems = screen.getAllByRole('listitem');
      listItems.forEach(item => {
        expect(item).not.toHaveAttribute('aria-current');
      });
    });

    it('handles multiple current pages (edge case)', () => {
      const items: ContentsListItem[] = [
        { href: '/page1', text: 'Page 1', current: true },
        { href: '/page2', text: 'Page 2', current: true },
        { href: '/page3', text: 'Page 3' }
      ];

      render(
        <TestWrapper>
          <ContentsList items={items} />
        </TestWrapper>
      );

      // Both current pages should not be links
      expect(screen.queryByRole('link', { name: 'Page 1' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Page 2' })).not.toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Page 3' })).toBeInTheDocument();
    });
  });

  describe('Custom attributes and styling', () => {
    it('applies data-testid', () => {
      render(
        <TestWrapper>
          <ContentsList 
            items={basicItems}
            data-testid="contents-test"
          />
        </TestWrapper>
      );

      expect(screen.getByTestId('contents-test')).toBeInTheDocument();
    });

    it('applies additional className', () => {
      render(
        <TestWrapper>
          <ContentsList 
            items={basicItems}
            className="custom-class"
          />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('nhsuk-contents-list');
      expect(nav).toHaveClass('custom-class');
    });

    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <ContentsList 
            items={basicItems}
            attributes={{ 'data-track': 'contents-view', 'aria-labelledby': 'custom-heading' }}
          />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('data-track', 'contents-view');
      expect(nav).toHaveAttribute('aria-labelledby', 'custom-heading');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders medical condition guide contents', () => {
      const medicalItems: ContentsListItem[] = [
        { href: '/diabetes/overview', text: 'What is diabetes?', current: true },
        { href: '/diabetes/types', text: 'Types of diabetes' },
        { href: '/diabetes/symptoms', text: 'Symptoms and diagnosis' },
        { href: '/diabetes/treatment', text: 'Treatment and management' },
        { href: '/diabetes/complications', text: 'Complications' },
        { href: '/diabetes/prevention', text: 'Prevention' }
      ];

      render(
        <TestWrapper>
          <ContentsList items={medicalItems} />
        </TestWrapper>
      );

      expect(screen.getByText('What is diabetes?')).toBeInTheDocument();
      expect(screen.getByText('Types of diabetes')).toBeInTheDocument();
      expect(screen.getByText('Symptoms and diagnosis')).toBeInTheDocument();
      expect(screen.getByText('Treatment and management')).toBeInTheDocument();
      expect(screen.getByText('Complications')).toBeInTheDocument();
      expect(screen.getByText('Prevention')).toBeInTheDocument();

      // Current page should not be a link
      expect(screen.queryByRole('link', { name: 'What is diabetes?' })).not.toBeInTheDocument();
      
      // Other pages should be links
      expect(screen.getByRole('link', { name: 'Types of diabetes' })).toBeInTheDocument();
    });

    it('renders treatment process navigation', () => {
      const treatmentItems: ContentsListItem[] = [
        { href: '/cancer-treatment/diagnosis', text: 'Getting a diagnosis' },
        { href: '/cancer-treatment/team', text: 'Your healthcare team' },
        { href: '/cancer-treatment/options', text: 'Treatment options', current: true },
        { href: '/cancer-treatment/side-effects', text: 'Managing side effects' },
        { href: '/cancer-treatment/support', text: 'Support and resources' },
        { href: '/cancer-treatment/follow-up', text: 'Follow-up care' }
      ];

      render(
        <TestWrapper>
          <ContentsList items={treatmentItems} />
        </TestWrapper>
      );

      expect(screen.getByText('Getting a diagnosis')).toBeInTheDocument();
      expect(screen.getByText('Your healthcare team')).toBeInTheDocument();
      expect(screen.getByText('Treatment options')).toBeInTheDocument();
      expect(screen.getByText('Managing side effects')).toBeInTheDocument();
      expect(screen.getByText('Support and resources')).toBeInTheDocument();
      expect(screen.getByText('Follow-up care')).toBeInTheDocument();

      // Current page (Treatment options) should not be a link
      expect(screen.queryByRole('link', { name: 'Treatment options' })).not.toBeInTheDocument();
    });

    it('renders multi-page form navigation', () => {
      const formItems: ContentsListItem[] = [
        { href: '/appointment/personal-details', text: 'Your personal details' },
        { href: '/appointment/medical-history', text: 'Medical history' },
        { href: '/appointment/current-symptoms', text: 'Current symptoms', current: true },
        { href: '/appointment/preferences', text: 'Appointment preferences' },
        { href: '/appointment/review', text: 'Review and submit' }
      ];

      render(
        <TestWrapper>
          <ContentsList items={formItems} />
        </TestWrapper>
      );

      expect(screen.getByText('Your personal details')).toBeInTheDocument();
      expect(screen.getByText('Medical history')).toBeInTheDocument();
      expect(screen.getByText('Current symptoms')).toBeInTheDocument();
      expect(screen.getByText('Appointment preferences')).toBeInTheDocument();
      expect(screen.getByText('Review and submit')).toBeInTheDocument();

      // Current step should not be a link
      expect(screen.queryByRole('link', { name: 'Current symptoms' })).not.toBeInTheDocument();
    });

    it('renders service information pages', () => {
      const serviceItems: ContentsListItem[] = [
        { href: '/nhs-services/overview', text: 'NHS services overview' },
        { href: '/nhs-services/gp', text: 'GP services', current: true },
        { href: '/nhs-services/emergency', text: 'Emergency services' },
        { href: '/nhs-services/mental-health', text: 'Mental health services' },
        { href: '/nhs-services/prescriptions', text: 'Prescriptions and pharmacy' },
        { href: '/nhs-services/appointments', text: 'Booking appointments' }
      ];

      render(
        <TestWrapper>
          <ContentsList items={serviceItems} />
        </TestWrapper>
      );

      expect(screen.getByText('NHS services overview')).toBeInTheDocument();
      expect(screen.getByText('GP services')).toBeInTheDocument();
      expect(screen.getByText('Emergency services')).toBeInTheDocument();
      expect(screen.getByText('Mental health services')).toBeInTheDocument();
      expect(screen.getByText('Prescriptions and pharmacy')).toBeInTheDocument();
      expect(screen.getByText('Booking appointments')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(
        <TestWrapper>
          <ContentsList items={basicItems} />
        </TestWrapper>
      );

      // Should be wrapped in nav element
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();

      // Should have proper ARIA label
      expect(nav).toHaveAttribute('aria-label', 'Pages in this guide');

      // Should contain an ordered list
      const list = screen.getByRole('list');
      expect(list.tagName).toBe('OL');

      // Current page should have aria-current
      const currentItem = screen.getByText('What is AMD?').closest('li');
      expect(currentItem).toHaveAttribute('aria-current', 'page');
    });

    it('provides proper heading structure', () => {
      render(
        <TestWrapper>
          <ContentsList items={basicItems} />
        </TestWrapper>
      );

      // Should have visually hidden heading
      const heading = screen.getByRole('heading', { name: 'Contents' });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('supports keyboard navigation through links', () => {
      render(
        <TestWrapper>
          <ContentsList items={basicItems} />
        </TestWrapper>
      );

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link.getAttribute('href')).toBeTruthy();
      });
    });
  });

  describe('Empty and edge cases', () => {
    it('handles empty items array', () => {
      render(
        <TestWrapper>
          <ContentsList items={[]} />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const items = screen.queryAllByRole('listitem');
      expect(items).toHaveLength(0);
    });

    it('handles single item', () => {
      const singleItem: ContentsListItem[] = [
        { href: '/single', text: 'Single Page', current: true }
      ];

      render(
        <TestWrapper>
          <ContentsList items={singleItem} />
        </TestWrapper>
      );

      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(1);
      expect(screen.getByText('Single Page')).toBeInTheDocument();
    });

    it('handles items with special characters', () => {
      const specialItems: ContentsListItem[] = [
        { href: '/special', text: 'Page with "quotes" & symbols', current: true },
        { href: '/unicode', text: 'Página en español' },
        { href: '/numbers', text: '123 Numbers & More!' }
      ];

      render(
        <TestWrapper>
          <ContentsList items={specialItems} />
        </TestWrapper>
      );

      expect(screen.getByText('Page with "quotes" & symbols')).toBeInTheDocument();
      expect(screen.getByText('Página en español')).toBeInTheDocument();
      expect(screen.getByText('123 Numbers & More!')).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(ContentsList.displayName).toBe('ContentsList');
    });
  });
});