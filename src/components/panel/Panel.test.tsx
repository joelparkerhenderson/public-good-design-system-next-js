import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Panel } from './Panel';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Panel', () => {
  describe('Basic functionality', () => {
    it('renders panel with title text only', () => {
      render(
        <TestWrapper>
          <Panel titleText="Booking complete" />
        </TestWrapper>
      );

      expect(screen.getByText('Booking complete')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('renders panel with title and body text', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Appointment confirmed"
            text="We have sent you a confirmation email"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Appointment confirmed')).toBeInTheDocument();
      expect(screen.getByText('We have sent you a confirmation email')).toBeInTheDocument();
    });

    it('renders panel with HTML title', () => {
      render(
        <TestWrapper>
          <Panel 
            titleHtml="<strong>Registration</strong> complete"
            text="Thank you for registering"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Registration')).toBeInTheDocument();
      expect(screen.getByText('Registration').tagName).toBe('STRONG');
      expect(screen.getByText('complete')).toBeInTheDocument();
    });

    it('renders panel with HTML content', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Test Results"
            html="<p>Your results are <strong>normal</strong></p>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Test Results')).toBeInTheDocument();
      expect(screen.getByText('Your results are')).toBeInTheDocument();
      expect(screen.getByText('normal')).toBeInTheDocument();
      expect(screen.getByText('normal').tagName).toBe('STRONG');
    });

    it('renders panel with children content', () => {
      render(
        <TestWrapper>
          <Panel titleText="Prescription Ready">
            <p>Your prescription is ready for collection.</p>
            <ul>
              <li>Metformin 500mg tablets</li>
              <li>Ramipril 5mg tablets</li>
            </ul>
          </Panel>
        </TestWrapper>
      );

      expect(screen.getByText('Prescription Ready')).toBeInTheDocument();
      expect(screen.getByText('Your prescription is ready for collection.')).toBeInTheDocument();
      expect(screen.getByText('Metformin 500mg tablets')).toBeInTheDocument();
      expect(screen.getByText('Ramipril 5mg tablets')).toBeInTheDocument();
    });

    it('returns null when no title is provided', () => {
      const { container } = render(
        <TestWrapper>
          <Panel text="Body content without title" />
        </TestWrapper>
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('Content priority', () => {
    it('prioritizes titleHtml over titleText', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="This should not appear"
            titleHtml="<em>This should appear</em>"
            text="Body content"
          />
        </TestWrapper>
      );

      expect(screen.getByText('This should appear')).toBeInTheDocument();
      expect(screen.getByText('This should appear').tagName).toBe('EM');
      expect(screen.queryByText('This should not appear')).not.toBeInTheDocument();
    });

    it('prioritizes children over HTML and text', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Panel Title"
            text="This should not appear"
            html="<p>This should also not appear</p>"
          >
            <p>This should appear</p>
          </Panel>
        </TestWrapper>
      );

      expect(screen.getByText('This should appear')).toBeInTheDocument();
      expect(screen.queryByText('This should not appear')).not.toBeInTheDocument();
      expect(screen.queryByText('This should also not appear')).not.toBeInTheDocument();
    });

    it('prioritizes html over text', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Panel Title"
            text="This should not appear"
            html="<p>This should appear</p>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('This should appear')).toBeInTheDocument();
      expect(screen.queryByText('This should not appear')).not.toBeInTheDocument();
    });
  });

  describe('Heading levels', () => {
    it('uses h1 as default heading level', () => {
      render(
        <TestWrapper>
          <Panel titleText="Default Heading" />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.tagName).toBe('H1');
      expect(heading).toHaveClass('nhsuk-panel__title');
    });

    it('uses custom heading level when specified', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Custom Heading"
            headingLevel={3}
            text="Content"
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading.tagName).toBe('H3');
    });

    it('supports all heading levels 1-6', () => {
      const headingLevels = [1, 2, 3, 4, 5, 6] as const;
      
      headingLevels.forEach(level => {
        render(
          <TestWrapper>
            <Panel 
              titleText={`Level ${level} Heading`}
              headingLevel={level}
              text="Content"
            />
          </TestWrapper>
        );

        const heading = screen.getByRole('heading', { level });
        expect(heading.tagName).toBe(`H${level}`);
      });
    });
  });

  describe('CSS classes and structure', () => {
    it('applies correct CSS classes', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Test Title"
            text="Test content"
          />
        </TestWrapper>
      );

      const panel = screen.getByText('Test Title').closest('.nhsuk-panel');
      expect(panel).toHaveClass('nhsuk-panel');
      
      const title = screen.getByRole('heading');
      expect(title).toHaveClass('nhsuk-panel__title');
      
      const body = screen.getByText('Test content').closest('.nhsuk-panel__body');
      expect(body).toHaveClass('nhsuk-panel__body');
    });

    it('applies additional className', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Test Title"
            className="custom-class"
          />
        </TestWrapper>
      );

      const panel = screen.getByText('Test Title').closest('.nhsuk-panel');
      expect(panel).toHaveClass('nhsuk-panel');
      expect(panel).toHaveClass('custom-class');
    });

    it('does not render body when no content is provided', () => {
      render(
        <TestWrapper>
          <Panel titleText="Title Only" />
        </TestWrapper>
      );

      const panel = screen.getByText('Title Only').closest('.nhsuk-panel');
      expect(panel?.querySelector('.nhsuk-panel__body')).not.toBeInTheDocument();
    });
  });

  describe('Custom attributes and props', () => {
    it('applies data-testid', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Test Title"
            data-testid="panel-test"
          />
        </TestWrapper>
      );

      expect(screen.getByTestId('panel-test')).toBeInTheDocument();
    });

    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Test Title"
            attributes={{ 'data-track': 'panel-view', 'aria-live': 'polite' }}
          />
        </TestWrapper>
      );

      const panel = screen.getByText('Test Title').closest('.nhsuk-panel');
      expect(panel).toHaveAttribute('data-track', 'panel-view');
      expect(panel).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders appointment confirmation panel', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Appointment confirmed"
            html="<p>Your GP appointment has been booked for:</p><p><strong>Tuesday, 23 January 2024 at 10:15 AM</strong></p><p>Riverside Medical Centre<br>123 High Street, Manchester M1 2AB</p>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Appointment confirmed')).toBeInTheDocument();
      expect(screen.getByText('Your GP appointment has been booked for:')).toBeInTheDocument();
      expect(screen.getByText('Tuesday, 23 January 2024 at 10:15 AM')).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return element?.textContent === 'Riverside Medical Centre123 High Street, Manchester M1 2AB';
      })).toBeInTheDocument();
    });

    it('renders test results panel', () => {
      render(
        <TestWrapper>
          <Panel titleText="Blood test results available" headingLevel={2}>
            <p>Your blood test results from 15 January 2024 are now ready.</p>
            <ul>
              <li>Full Blood Count: Normal</li>
              <li>Cholesterol: 4.2 mmol/L (Normal)</li>
              <li>Blood Sugar: 5.8 mmol/L (Normal)</li>
              <li>Vitamin D: 45 nmol/L (Adequate)</li>
            </ul>
            <p>No follow-up appointment needed. Continue with your current medications.</p>
          </Panel>
        </TestWrapper>
      );

      expect(screen.getByText('Blood test results available')).toBeInTheDocument();
      expect(screen.getByText('Your blood test results from 15 January 2024 are now ready.')).toBeInTheDocument();
      expect(screen.getByText('Full Blood Count: Normal')).toBeInTheDocument();
      expect(screen.getByText('Cholesterol: 4.2 mmol/L (Normal)')).toBeInTheDocument();
    });

    it('renders prescription ready panel', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Prescription ready for collection"
            text="Your repeat prescription is ready at Boots Pharmacy, High Street. Please bring photo ID when collecting."
          />
        </TestWrapper>
      );

      expect(screen.getByText('Prescription ready for collection')).toBeInTheDocument();
      expect(screen.getByText(/Your repeat prescription is ready at Boots Pharmacy/)).toBeInTheDocument();
    });

    it('renders NHS registration confirmation', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="NHS registration complete"
            html="<p>Thank you for registering with Riverside Medical Centre.</p><p>Your NHS number: <strong>485 777 3456</strong></p><p>You will receive your NHS card within 10 working days.</p>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('NHS registration complete')).toBeInTheDocument();
      expect(screen.getByText('Thank you for registering with Riverside Medical Centre.')).toBeInTheDocument();
      expect(screen.getByText('485 777 3456')).toBeInTheDocument();
      expect(screen.getByText('485 777 3456').tagName).toBe('STRONG');
    });

    it('renders vaccination confirmation', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Vaccination recorded"
            headingLevel={3}
          >
            <p>Your COVID-19 vaccination has been successfully recorded.</p>
            <p><strong>Vaccine:</strong> Pfizer-BioNTech</p>
            <p><strong>Date:</strong> 15 January 2024</p>
            <p><strong>Location:</strong> Manchester Vaccination Centre</p>
            <p><strong>Batch number:</strong> FF7843</p>
            <p>Your vaccination certificate has been updated automatically.</p>
          </Panel>
        </TestWrapper>
      );

      expect(screen.getByText('Vaccination recorded')).toBeInTheDocument();
      expect(screen.getByText('Your COVID-19 vaccination has been successfully recorded.')).toBeInTheDocument();
      expect(screen.getByText('Pfizer-BioNTech')).toBeInTheDocument();
      expect(screen.getByText('Manchester Vaccination Centre')).toBeInTheDocument();
    });

    it('renders referral confirmation', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Referral submitted"
            text="Your referral to the Cardiology department has been submitted. You will receive an appointment letter within 2 weeks."
          />
        </TestWrapper>
      );

      expect(screen.getByText('Referral submitted')).toBeInTheDocument();
      expect(screen.getByText(/Your referral to the Cardiology department/)).toBeInTheDocument();
    });

    it('renders online consultation submission', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Consultation submitted"
            html="<p>Your online consultation has been submitted successfully.</p><p><strong>Reference:</strong> CON-2024-0123</p><p>A GP will review your consultation within 2 working days and contact you if needed.</p>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Consultation submitted')).toBeInTheDocument();
      expect(screen.getByText('Your online consultation has been submitted successfully.')).toBeInTheDocument();
      expect(screen.getByText('CON-2024-0123')).toBeInTheDocument();
    });
  });

  describe('Content formatting', () => {
    it('wraps text in paragraph element', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Test Title"
            text="This is plain text content"
          />
        </TestWrapper>
      );

      const paragraph = screen.getByText('This is plain text content');
      expect(paragraph.tagName).toBe('P');
    });

    it('renders complex HTML content correctly', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Complex Content"
            html="<h4>Subheading</h4><p>Paragraph with <em>emphasis</em> and <strong>strong</strong> text.</p><ol><li>First item</li><li>Second item</li></ol>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Subheading')).toBeInTheDocument();
      expect(screen.getByText('Subheading').tagName).toBe('H4');
      expect(screen.getByText('emphasis').tagName).toBe('EM');
      expect(screen.getByText('strong').tagName).toBe('STRONG');
      expect(screen.getByText('First item')).toBeInTheDocument();
      expect(screen.getByText('Second item')).toBeInTheDocument();
    });

    it('handles links in content', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="Content with Links"
            html='<p>Visit <a href="https://nhs.uk">NHS website</a> for more information.</p>'
          />
        </TestWrapper>
      );

      const link = screen.getByRole('link', { name: 'NHS website' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://nhs.uk');
    });

    it('handles empty content gracefully', () => {
      render(
        <TestWrapper>
          <Panel titleText="Title Only" />
        </TestWrapper>
      );

      expect(screen.getByText('Title Only')).toBeInTheDocument();
      // Should not have a body section
      const panel = screen.getByText('Title Only').closest('.nhsuk-panel');
      expect(panel?.querySelector('.nhsuk-panel__body')).not.toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('handles special characters in titles', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText='Title with "quotes" & symbols <>'
            text="Content"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Title with "quotes" & symbols <>')).toBeInTheDocument();
    });

    it('handles long titles gracefully', () => {
      render(
        <TestWrapper>
          <Panel 
            titleText="This is a very long title that might wrap to multiple lines depending on the screen size and should still be displayed correctly"
            text="Content"
          />
        </TestWrapper>
      );

      expect(screen.getByText(/This is a very long title that might wrap/)).toBeInTheDocument();
    });

    it('handles empty string values', () => {
      const { container } = render(
        <TestWrapper>
          <Panel 
            titleText=""
            text=""
          />
        </TestWrapper>
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Panel.displayName).toBe('Panel');
    });
  });
});