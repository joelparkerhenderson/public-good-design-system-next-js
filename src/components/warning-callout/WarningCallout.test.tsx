import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { WarningCallout } from './WarningCallout';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('WarningCallout', () => {
  describe('Basic functionality', () => {
    it('renders warning callout with heading and text', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Important"
            text="This is important information."
          />
        </TestWrapper>
      );

      expect(screen.getByText('Important')).toBeInTheDocument();
      expect(screen.getByText('This is important information.')).toBeInTheDocument();
    });

    it('renders with HTML content', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Safety Notice"
            html="<p>This is <strong>very important</strong> information.</p>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Safety Notice')).toBeInTheDocument();
      expect(screen.getByText('very important')).toBeInTheDocument();
      expect(screen.getByText('very important').tagName).toBe('STRONG');
    });

    it('renders with children content', () => {
      render(
        <TestWrapper>
          <WarningCallout heading="Medication Safety">
            <p>Always check with your healthcare provider before:</p>
            <ul>
              <li>Starting new medications</li>
              <li>Stopping current treatments</li>
            </ul>
          </WarningCallout>
        </TestWrapper>
      );

      expect(screen.getByText('Medication Safety')).toBeInTheDocument();
      expect(screen.getByText('Always check with your healthcare provider before:')).toBeInTheDocument();
      expect(screen.getByText('Starting new medications')).toBeInTheDocument();
      expect(screen.getByText('Stopping current treatments')).toBeInTheDocument();
    });

    it('prioritizes children over HTML and text', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Test"
            text="This should not appear"
            html="<p>This should also not appear</p>"
          >
            <p>This should appear</p>
          </WarningCallout>
        </TestWrapper>
      );

      expect(screen.getByText('This should appear')).toBeInTheDocument();
      expect(screen.queryByText('This should not appear')).not.toBeInTheDocument();
      expect(screen.queryByText('This should also not appear')).not.toBeInTheDocument();
    });

    it('prioritizes HTML over text', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Test"
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
    it('uses h3 as default heading level', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Default Heading"
            text="Content"
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading.tagName).toBe('H3');
    });

    it('uses custom heading level when specified', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Custom Heading"
            headingLevel={2}
            text="Content"
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.tagName).toBe('H2');
    });

    it('supports all heading levels 1-6', () => {
      const headingLevels = [1, 2, 3, 4, 5, 6] as const;
      
      headingLevels.forEach(level => {
        render(
          <TestWrapper>
            <WarningCallout 
              heading={`Level ${level} Heading`}
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

  describe('Accessibility features', () => {
    it('adds "Important:" prefix for screen readers when heading does not contain "important"', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Safety Notice"
            text="Important information"
          />
        </TestWrapper>
      );

      const heading = screen.getByText('Safety Notice');
      expect(heading).toBeInTheDocument();
      
      // Check for visually hidden "Important:" text
      const importantPrefix = screen.getByText('Important:', { exact: false });
      expect(importantPrefix).toBeInTheDocument();
    });

    it('adds colon suffix for screen readers when heading contains "important"', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Important Information"
            text="Please read carefully"
          />
        </TestWrapper>
      );

      const heading = screen.getByText('Important Information');
      expect(heading).toBeInTheDocument();
      
      // Check for visually hidden colon
      const colonSuffix = screen.getByText(':', { exact: false });
      expect(colonSuffix).toBeInTheDocument();
    });

    it('handles "important" case-insensitively', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="IMPORTANT NOTICE"
            text="This is urgent"
          />
        </TestWrapper>
      );

      const heading = screen.getByText('IMPORTANT NOTICE');
      expect(heading).toBeInTheDocument();
      
      // Should have colon, not "Important:" prefix
      expect(screen.getByText(':', { exact: false })).toBeInTheDocument();
      expect(screen.queryByText('Important:', { exact: false })).not.toBeInTheDocument();
    });

    it('has proper role attributes', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Test Heading"
            text="Test content"
          />
        </TestWrapper>
      );

      const roleText = screen.getByRole('text');
      expect(roleText).toBeInTheDocument();
    });
  });

  describe('Custom attributes', () => {
    it('applies data-testid', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Test"
            text="Content"
            data-testid="warning-test"
          />
        </TestWrapper>
      );

      expect(screen.getByTestId('warning-test')).toBeInTheDocument();
    });

    it('applies additional className', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Test"
            text="Content"
            className="custom-class"
          />
        </TestWrapper>
      );

      const container = screen.getByText('Test').closest('.nhsuk-warning-callout');
      expect(container).toHaveClass('custom-class');
      expect(container).toHaveClass('nhsuk-warning-callout');
    });

    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Test"
            text="Content"
            attributes={{ 'data-track': 'warning-view', 'aria-label': 'Important warning' }}
          />
        </TestWrapper>
      );

      const container = screen.getByText('Test').closest('.nhsuk-warning-callout');
      expect(container).toHaveAttribute('data-track', 'warning-view');
      expect(container).toHaveAttribute('aria-label', 'Important warning');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders medication safety warning', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Important"
            text="For safety, tell your doctor or pharmacist if you're taking any other medicines, including herbal medicines, vitamins or supplements."
          />
        </TestWrapper>
      );

      expect(screen.getByText('Important')).toBeInTheDocument();
      expect(screen.getByText(/For safety, tell your doctor/)).toBeInTheDocument();
    });

    it('renders appointment preparation warning', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Before your appointment"
            html="<p>Please bring:</p><ul><li>Your NHS card or medical insurance information</li><li>A list of current medications</li><li>Any relevant medical records or test results</li></ul>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Before your appointment')).toBeInTheDocument();
      expect(screen.getByText('Please bring:')).toBeInTheDocument();
      expect(screen.getByText('Your NHS card or medical insurance information')).toBeInTheDocument();
    });

    it('renders emergency contact warning', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Emergency contact"
            headingLevel={2}
          >
            <p>If you experience any of the following symptoms, seek immediate medical attention:</p>
            <ul>
              <li>Severe chest pain</li>
              <li>Difficulty breathing</li>
              <li>Loss of consciousness</li>
              <li>Severe allergic reaction</li>
            </ul>
            <p><strong>Call 999 immediately</strong></p>
          </WarningCallout>
        </TestWrapper>
      );

      expect(screen.getByText('Emergency contact')).toBeInTheDocument();
      expect(screen.getByText(/If you experience any of the following symptoms/)).toBeInTheDocument();
      expect(screen.getByText('Call 999 immediately')).toBeInTheDocument();
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.tagName).toBe('H2');
    });

    it('renders treatment compliance warning', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Treatment compliance"
            text="Do not stop taking your medication without consulting your healthcare provider, even if you feel better. Stopping treatment early may lead to complications or treatment failure."
          />
        </TestWrapper>
      );

      expect(screen.getByText('Treatment compliance')).toBeInTheDocument();
      expect(screen.getByText(/Do not stop taking your medication/)).toBeInTheDocument();
    });

    it('renders infection control warning', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Infection prevention"
          >
            <p>To prevent the spread of infection:</p>
            <ul>
              <li>Wash your hands frequently with soap and water</li>
              <li>Use hand sanitizer when soap is not available</li>
              <li>Avoid touching your face, especially eyes, nose, and mouth</li>
              <li>Stay home if you feel unwell</li>
              <li>Wear a face covering in healthcare settings</li>
            </ul>
          </WarningCallout>
        </TestWrapper>
      );

      expect(screen.getByText('Infection prevention')).toBeInTheDocument();
      expect(screen.getByText('To prevent the spread of infection:')).toBeInTheDocument();
      expect(screen.getByText('Wash your hands frequently with soap and water')).toBeInTheDocument();
    });
  });

  describe('Content rendering', () => {
    it('wraps text content in paragraph', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Test"
            text="This is text content"
          />
        </TestWrapper>
      );

      const paragraph = screen.getByText('This is text content');
      expect(paragraph.tagName).toBe('P');
    });

    it('renders complex HTML content correctly', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Complex Content"
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

    it('handles empty content gracefully', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Only Heading"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Only Heading')).toBeInTheDocument();
      // Should not crash or render empty content containers
    });
  });

  describe('Semantic structure', () => {
    it('has correct CSS classes', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Test"
            text="Content"
          />
        </TestWrapper>
      );

      const container = screen.getByText('Test').closest('.nhsuk-warning-callout');
      expect(container).toHaveClass('nhsuk-warning-callout');
      
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('nhsuk-warning-callout__label');
    });

    it('maintains proper heading hierarchy', () => {
      render(
        <TestWrapper>
          <WarningCallout 
            heading="Main Warning"
            headingLevel={1}
            html="<h2>Subheading</h2><p>Content</p>"
          />
        </TestWrapper>
      );

      const mainHeading = screen.getByRole('heading', { level: 1 });
      const subHeading = screen.getByRole('heading', { level: 2 });
      
      expect(mainHeading.tagName).toBe('H1');
      expect(subHeading.tagName).toBe('H2');
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(WarningCallout.displayName).toBe('WarningCallout');
    });
  });
});