import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { NotificationBanner } from './NotificationBanner';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('NotificationBanner', () => {
  describe('Basic functionality', () => {
    it('renders notification banner with default important type', () => {
      render(
        <TestWrapper>
          <NotificationBanner text="The patient record was updated." />
        </TestWrapper>
      );

      expect(screen.getByRole('region')).toBeInTheDocument();
      expect(screen.getByText('Important')).toBeInTheDocument();
      expect(screen.getByText('The patient record was updated.')).toBeInTheDocument();
    });

    it('renders success notification banner', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            type="success"
            text="Email sent to example@email.com" 
          />
        </TestWrapper>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Email sent to example@email.com')).toBeInTheDocument();
    });

    it('renders with custom title text', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            titleText="Custom Title"
            text="Custom message content" 
          />
        </TestWrapper>
      );

      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom message content')).toBeInTheDocument();
    });

    it('renders with custom title HTML', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            titleHtml="<strong>HTML Title</strong>"
            text="Message with HTML title" 
          />
        </TestWrapper>
      );

      expect(screen.getByText('HTML Title')).toBeInTheDocument();
      expect(screen.getByText('HTML Title').tagName).toBe('STRONG');
      expect(screen.getByText('Message with HTML title')).toBeInTheDocument();
    });
  });

  describe('Content rendering', () => {
    it('renders HTML content', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            html="<p>HTML content with <strong>bold text</strong></p>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('HTML content with')).toBeInTheDocument();
      expect(screen.getByText('bold text')).toBeInTheDocument();
      expect(screen.getByText('bold text').tagName).toBe('STRONG');
    });

    it('renders children content', () => {
      render(
        <TestWrapper>
          <NotificationBanner titleText="Appointment Details">
            <p className="nhsuk-notification-banner__heading">
              Your appointment has been confirmed
            </p>
            <p>Date: Monday, 15 January 2024</p>
            <p>Time: 2:30 PM</p>
          </NotificationBanner>
        </TestWrapper>
      );

      expect(screen.getByText('Your appointment has been confirmed')).toBeInTheDocument();
      expect(screen.getByText('Date: Monday, 15 January 2024')).toBeInTheDocument();
      expect(screen.getByText('Time: 2:30 PM')).toBeInTheDocument();
    });

    it('prioritizes children over HTML and text', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            text="This should not appear"
            html="<p>This should also not appear</p>"
          >
            <p>This should appear</p>
          </NotificationBanner>
        </TestWrapper>
      );

      expect(screen.getByText('This should appear')).toBeInTheDocument();
      expect(screen.queryByText('This should not appear')).not.toBeInTheDocument();
      expect(screen.queryByText('This should also not appear')).not.toBeInTheDocument();
    });

    it('prioritizes HTML over text', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            text="This should not appear"
            html="<p>This should appear</p>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('This should appear')).toBeInTheDocument();
      expect(screen.queryByText('This should not appear')).not.toBeInTheDocument();
    });

    it('renders text with proper heading class', () => {
      render(
        <TestWrapper>
          <NotificationBanner text="Simple text message" />
        </TestWrapper>
      );

      const textElement = screen.getByText('Simple text message');
      expect(textElement).toBeInTheDocument();
      expect(textElement).toHaveClass('nhsuk-notification-banner__heading');
      expect(textElement.tagName).toBe('P');
    });
  });

  describe('Heading levels', () => {
    it('uses h2 as default heading level', () => {
      render(
        <TestWrapper>
          <NotificationBanner text="Default heading level" />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.tagName).toBe('H2');
      expect(heading).toHaveClass('nhsuk-notification-banner__title');
    });

    it('uses custom heading level when specified', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            titleHeadingLevel={3}
            text="Custom heading level" 
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
            <NotificationBanner 
              titleText={`Level ${level} Title`}
              titleHeadingLevel={level}
              text="Content"
            />
          </TestWrapper>
        );

        const heading = screen.getByRole('heading', { level });
        expect(heading.tagName).toBe(`H${level}`);
      });
    });
  });

  describe('ARIA attributes and roles', () => {
    it('has role="region" for important notifications', () => {
      render(
        <TestWrapper>
          <NotificationBanner text="Important message" />
        </TestWrapper>
      );

      const banner = screen.getByRole('region');
      expect(banner).toBeInTheDocument();
      expect(banner).toHaveAttribute('aria-labelledby', 'nhsuk-notification-banner-title');
    });

    it('has role="alert" for success notifications', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            type="success"
            text="Success message" 
          />
        </TestWrapper>
      );

      const banner = screen.getByRole('alert');
      expect(banner).toBeInTheDocument();
      expect(banner).toHaveAttribute('aria-labelledby', 'nhsuk-notification-banner-title');
    });

    it('allows custom role override', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            type="success"
            role="region"
            text="Success with custom role" 
          />
        </TestWrapper>
      );

      const banner = screen.getByRole('region');
      expect(banner).toBeInTheDocument();
    });

    it('uses custom titleId for aria-labelledby', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            titleId="custom-title-id"
            text="Custom title ID" 
          />
        </TestWrapper>
      );

      const banner = screen.getByRole('region');
      expect(banner).toHaveAttribute('aria-labelledby', 'custom-title-id');
      
      const heading = screen.getByRole('heading');
      expect(heading).toHaveAttribute('id', 'custom-title-id');
    });
  });

  describe('CSS classes and styling', () => {
    it('applies base CSS classes', () => {
      render(
        <TestWrapper>
          <NotificationBanner text="Base classes test" />
        </TestWrapper>
      );

      const banner = screen.getByRole('region');
      expect(banner).toHaveClass('nhsuk-notification-banner');
    });

    it('applies success modifier class', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            type="success"
            text="Success classes test" 
          />
        </TestWrapper>
      );

      const banner = screen.getByRole('alert');
      expect(banner).toHaveClass('nhsuk-notification-banner');
      expect(banner).toHaveClass('nhsuk-notification-banner--success');
    });

    it('applies additional className', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            className="custom-class"
            text="Custom class test" 
          />
        </TestWrapper>
      );

      const banner = screen.getByRole('region');
      expect(banner).toHaveClass('nhsuk-notification-banner');
      expect(banner).toHaveClass('custom-class');
    });
  });

  describe('Data attributes and custom attributes', () => {
    it('applies data-testid', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            text="Test ID"
            data-testid="notification-test"
          />
        </TestWrapper>
      );

      expect(screen.getByTestId('notification-test')).toBeInTheDocument();
    });

    it('applies data-module and data-disable-auto-focus attributes', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            type="success"
            disableAutoFocus={true}
            text="Auto focus disabled"
          />
        </TestWrapper>
      );

      const banner = screen.getByRole('alert');
      expect(banner).toHaveAttribute('data-module', 'nhsuk-notification-banner');
      expect(banner).toHaveAttribute('data-disable-auto-focus', 'true');
    });

    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            text="Custom attributes"
            attributes={{ 'data-track': 'banner-view', 'aria-live': 'polite' }}
          />
        </TestWrapper>
      );

      const banner = screen.getByRole('region');
      expect(banner).toHaveAttribute('data-track', 'banner-view');
      expect(banner).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders appointment confirmation notification', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            type="success"
            titleText="Appointment confirmed"
          >
            <p className="nhsuk-notification-banner__heading">
              Your GP appointment has been booked
            </p>
            <p>Date: Tuesday, 23 January 2024</p>
            <p>Time: 10:15 AM</p>
            <p>GP Practice: Riverside Medical Centre</p>
            <p>Address: 123 High Street, Manchester M1 2AB</p>
          </NotificationBanner>
        </TestWrapper>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Appointment confirmed')).toBeInTheDocument();
      expect(screen.getByText('Your GP appointment has been booked')).toBeInTheDocument();
      expect(screen.getByText('Date: Tuesday, 23 January 2024')).toBeInTheDocument();
    });

    it('renders prescription ready notification', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            type="success"
            titleText="Prescription ready"
            text="Your repeat prescription is ready for collection at Boots Pharmacy, High Street."
          />
        </TestWrapper>
      );

      expect(screen.getByText('Prescription ready')).toBeInTheDocument();
      expect(screen.getByText(/Your repeat prescription is ready for collection/)).toBeInTheDocument();
    });

    it('renders test results notification with complex content', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            titleText="Test results available"
            html={`
              <h3 class="nhsuk-notification-banner__heading">Your blood test results are now available</h3>
              <p>Results for tests taken on 15 January 2024:</p>
              <ul class="nhsuk-list nhsuk-list--bullet">
                <li><a href="#" class="nhsuk-notification-banner__link">Full Blood Count</a> - Normal</li>
                <li><a href="#" class="nhsuk-notification-banner__link">Cholesterol Test</a> - Slightly elevated</li>
                <li><a href="#" class="nhsuk-notification-banner__link">Blood Sugar</a> - Normal</li>
              </ul>
              <p>Your GP will contact you if any follow-up is needed.</p>
            `}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Test results available')).toBeInTheDocument();
      expect(screen.getByText('Your blood test results are now available')).toBeInTheDocument();
      expect(screen.getByText('Full Blood Count')).toBeInTheDocument();
      expect(screen.getByText('Cholesterol Test')).toBeInTheDocument();
      expect(screen.getByText('Blood Sugar')).toBeInTheDocument();
    });

    it('renders vaccination reminder notification', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            titleText="Vaccination reminder"
            text="Your annual flu vaccination is due. Book your appointment online or call your GP practice."
          />
        </TestWrapper>
      );

      expect(screen.getByText('Vaccination reminder')).toBeInTheDocument();
      expect(screen.getByText(/Your annual flu vaccination is due/)).toBeInTheDocument();
    });

    it('renders NHS app update notification', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            type="success"
            titleText="Profile updated"
            html={`
              <h3 class="nhsuk-notification-banner__heading">Your NHS profile has been updated</h3>
              <p>Changes saved:</p>
              <ul class="nhsuk-list nhsuk-list--bullet nhsuk-u-margin-bottom-0">
                <li>Mobile phone number</li>
                <li>Email address</li>
                <li>Emergency contact</li>
              </ul>
            `}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Profile updated')).toBeInTheDocument();
      expect(screen.getByText('Your NHS profile has been updated')).toBeInTheDocument();
      expect(screen.getByText('Mobile phone number')).toBeInTheDocument();
      expect(screen.getByText('Emergency contact')).toBeInTheDocument();
    });

    it('renders medication reminder notification', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            titleText="Medication reminder"
          >
            <p className="nhsuk-notification-banner__heading">
              Time to order your repeat prescription
            </p>
            <p>You have <strong>3 days</strong> of medication remaining for:</p>
            <ul>
              <li>Metformin 500mg tablets</li>
              <li>Ramipril 5mg tablets</li>
              <li>Atorvastatin 20mg tablets</li>
            </ul>
            <p>
              <a href="#" className="nhsuk-notification-banner__link">
                Order online
              </a> or call your GP practice on 0161 123 4567.
            </p>
          </NotificationBanner>
        </TestWrapper>
      );

      expect(screen.getByText('Medication reminder')).toBeInTheDocument();
      expect(screen.getByText('Time to order your repeat prescription')).toBeInTheDocument();
      expect(screen.getByText('Metformin 500mg tablets')).toBeInTheDocument();
      expect(screen.getByText('3 days')).toBeInTheDocument();
    });
  });

  describe('Auto focus behavior', () => {
    it('does not set tabindex for important notifications', () => {
      render(
        <TestWrapper>
          <NotificationBanner text="Important message" />
        </TestWrapper>
      );

      const banner = screen.getByRole('region');
      expect(banner).not.toHaveAttribute('tabindex');
    });

    it('handles disableAutoFocus correctly', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            type="success"
            disableAutoFocus={true}
            text="Success with disabled focus"
          />
        </TestWrapper>
      );

      const banner = screen.getByRole('alert');
      expect(banner).toHaveAttribute('data-disable-auto-focus', 'true');
    });
  });

  describe('Complex content rendering', () => {
    it('renders notification with lists and links', () => {
      render(
        <TestWrapper>
          <NotificationBanner 
            titleText="Files uploaded"
            html={`
              <h3 class="nhsuk-notification-banner__heading">4 files uploaded successfully</h3>
              <ul class="nhsuk-list nhsuk-list--bullet">
                <li><a href="#" class="nhsuk-notification-banner__link">medical-history.pdf</a></li>
                <li><a href="#" class="nhsuk-notification-banner__link">test-results.pdf</a></li>
                <li><a href="#" class="nhsuk-notification-banner__link">prescription.pdf</a></li>
                <li><a href="#" class="nhsuk-notification-banner__link">referral-letter.pdf</a></li>
              </ul>
            `}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Files uploaded')).toBeInTheDocument();
      expect(screen.getByText('4 files uploaded successfully')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'medical-history.pdf' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'test-results.pdf' })).toBeInTheDocument();
    });

    it('handles empty content gracefully', () => {
      render(
        <TestWrapper>
          <NotificationBanner titleText="Only Title" />
        </TestWrapper>
      );

      expect(screen.getByText('Only Title')).toBeInTheDocument();
      const content = screen.getByRole('region').querySelector('.nhsuk-notification-banner__content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(NotificationBanner.displayName).toBe('NotificationBanner');
    });
  });
});