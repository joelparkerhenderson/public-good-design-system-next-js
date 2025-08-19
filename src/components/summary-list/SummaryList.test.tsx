import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { SummaryList } from './SummaryList';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('SummaryList', () => {
  describe('Basic functionality', () => {
    it('renders summary list with basic rows', () => {
      const { container } = render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { text: "Name" },
                value: { text: "Sarah Philips" }
              },
              {
                key: { text: "Date of birth" },
                value: { text: "5 January 1978" }
              }
            ]}
          />
        </TestWrapper>
      );

      expect(container.querySelector('dl')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Sarah Philips')).toBeInTheDocument();
      expect(screen.getByText('Date of birth')).toBeInTheDocument();
      expect(screen.getByText('5 January 1978')).toBeInTheDocument();
    });

    it('renders summary list with HTML content', () => {
      render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { html: "<strong>Name</strong>" },
                value: { html: "Sarah <em>Philips</em>" }
              }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Name').tagName).toBe('STRONG');
      expect(screen.getByText('Philips')).toBeInTheDocument();
      expect(screen.getByText('Philips').tagName).toBe('EM');
    });

    it('uses description list semantics', () => {
      const { container } = render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { text: "Name" },
                value: { text: "Sarah Philips" }
              }
            ]}
          />
        </TestWrapper>
      );

      const dl = container.querySelector('dl');
      const dt = container.querySelector('dt');
      const dd = container.querySelector('dd');

      expect(dl).toBeInTheDocument();
      expect(dt).toBeInTheDocument();
      expect(dd).toBeInTheDocument();
      expect(dl).toHaveClass('nhsuk-summary-list');
    });
  });

  describe('Actions', () => {
    it('renders single action link', () => {
      render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { text: "Name" },
                value: { text: "Sarah Philips" },
                actions: {
                  items: [
                    { 
                      href: "/edit-name", 
                      text: "Change",
                      visuallyHiddenText: "name"
                    }
                  ]
                }
              }
            ]}
          />
        </TestWrapper>
      );

      const changeLink = screen.getByRole('link', { name: /Change name/ });
      expect(changeLink).toBeInTheDocument();
      expect(changeLink).toHaveAttribute('href', '/edit-name');
      // Check that visually hidden text is present but visually hidden
      const visuallyHiddenText = screen.getByText('name');
      expect(visuallyHiddenText).toBeInTheDocument();
      // The element should have specific styling for screen readers only
      const styles = window.getComputedStyle(visuallyHiddenText);
      expect(styles.position).toBe('absolute');
    });

    it('renders multiple action links', () => {
      render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { text: "Contact details" },
                value: { text: "07700 900457" },
                actions: {
                  items: [
                    { 
                      href: "/add-contact", 
                      text: "Add",
                      visuallyHiddenText: "new contact details"
                    },
                    { 
                      href: "/edit-contact", 
                      text: "Change",
                      visuallyHiddenText: "contact details"
                    }
                  ]
                }
              }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('link', { name: /Add new contact details/ })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Change contact details/ })).toBeInTheDocument();
      
      const actionsList = screen.getByRole('list');
      expect(actionsList).toHaveClass('nhsuk-summary-list__actions-list');
    });

    it('renders action with HTML content', () => {
      render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { text: "Name" },
                value: { text: "Sarah Philips" },
                actions: {
                  items: [
                    { 
                      href: "/edit", 
                      html: "<strong>Edit</strong>"
                    }
                  ]
                }
              }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Edit').tagName).toBe('STRONG');
    });

    it('handles rows with and without actions', () => {
      render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { text: "Name" },
                value: { text: "Sarah Philips" },
                actions: {
                  items: [
                    { href: "/edit-name", text: "Change" }
                  ]
                }
              },
              {
                key: { text: "Date of birth" },
                value: { text: "5 January 1978" }
                // No actions for this row
              }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('link', { name: 'Change' })).toBeInTheDocument();
      expect(screen.getByText('Date of birth')).toBeInTheDocument();
      
      const { container } = render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { text: "Name" },
                value: { text: "Sarah Philips" },
                actions: {
                  items: [{ href: "/edit", text: "Change" }]
                }
              },
              {
                key: { text: "Date of birth" },
                value: { text: "5 January 1978" }
              }
            ]}
          />
        </TestWrapper>
      );
      
      const rowWithoutActions = container.querySelector('.nhsuk-summary-list__row--no-actions');
      expect(rowWithoutActions).toBeInTheDocument();
    });
  });

  describe('Styling variations', () => {
    it('applies no-border class', () => {
      const { container } = render(
        <TestWrapper>
          <SummaryList 
            classes="nhsuk-summary-list--no-border"
            rows={[
              {
                key: { text: "Name" },
                value: { text: "Sarah Philips" }
              }
            ]}
          />
        </TestWrapper>
      );

      const summaryList = container.querySelector('.nhsuk-summary-list');
      expect(summaryList).toHaveClass('nhsuk-summary-list--no-border');
    });

    it('applies row-specific classes', () => {
      const { container } = render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                classes: "nhsuk-summary-list__row--no-border",
                key: { text: "Name", classes: "custom-key-class" },
                value: { text: "Sarah Philips", classes: "custom-value-class" }
              }
            ]}
          />
        </TestWrapper>
      );

      const row = container.querySelector('.nhsuk-summary-list__row');
      const key = container.querySelector('.nhsuk-summary-list__key');
      const value = container.querySelector('.nhsuk-summary-list__value');
      
      expect(row).toHaveClass('nhsuk-summary-list__row--no-border');
      expect(key).toHaveClass('custom-key-class');
      expect(value).toHaveClass('custom-value-class');
    });

    it('applies action-specific classes', () => {
      const { container } = render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { text: "Name" },
                value: { text: "Sarah Philips" },
                actions: {
                  classes: "custom-actions-class",
                  items: [
                    { href: "/edit", text: "Change" }
                  ]
                }
              }
            ]}
          />
        </TestWrapper>
      );

      const actions = container.querySelector('.nhsuk-summary-list__actions');
      expect(actions).toHaveClass('custom-actions-class');
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to summary list', () => {
      const { container } = render(
        <TestWrapper>
          <SummaryList 
            classes="custom-summary-list"
            rows={[
              {
                key: { text: "Name" },
                value: { text: "Sarah Philips" }
              }
            ]}
          />
        </TestWrapper>
      );

      const summaryList = container.querySelector('.nhsuk-summary-list');
      expect(summaryList).toHaveClass('custom-summary-list');
    });

    it('applies custom attributes to summary list', () => {
      const { container } = render(
        <TestWrapper>
          <SummaryList 
            attributes={{ 'data-custom': 'value' }}
            rows={[
              {
                key: { text: "Name" },
                value: { text: "Sarah Philips" }
              }
            ]}
          />
        </TestWrapper>
      );

      const summaryList = container.querySelector('.nhsuk-summary-list');
      expect(summaryList).toHaveAttribute('data-custom', 'value');
    });

    it('applies data-testid', () => {
      render(
        <TestWrapper>
          <SummaryList 
            data-testid="summary-list-test"
            rows={[
              {
                key: { text: "Name" },
                value: { text: "Sarah Philips" }
              }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByTestId('summary-list-test')).toBeInTheDocument();
    });

    it('applies additional className', () => {
      const { container } = render(
        <TestWrapper>
          <SummaryList 
            className="additional-class"
            rows={[
              {
                key: { text: "Name" },
                value: { text: "Sarah Philips" }
              }
            ]}
          />
        </TestWrapper>
      );

      const summaryList = container.querySelector('.nhsuk-summary-list');
      expect(summaryList).toHaveClass('additional-class');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders patient information summary', () => {
      render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { text: "Patient name" },
                value: { text: "Sarah Philips" }
              },
              {
                key: { text: "NHS number" },
                value: { text: "485 777 3456" }
              },
              {
                key: { text: "Date of birth" },
                value: { text: "5 January 1978" }
              },
              {
                key: { text: "Contact number" },
                value: { text: "07700 900457" },
                actions: {
                  items: [
                    { 
                      href: "/edit-contact", 
                      text: "Change",
                      visuallyHiddenText: "contact number"
                    }
                  ]
                }
              }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Patient name')).toBeInTheDocument();
      expect(screen.getByText('NHS number')).toBeInTheDocument();
      expect(screen.getByText('485 777 3456')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Change contact number/ })).toBeInTheDocument();
    });

    it('renders medical history summary', () => {
      render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { text: "Current medications" },
                value: { 
                  html: `<p>Isotretinoin capsules (Roaccutane)</p>
                         <p>Isotretinoin gel (Isotrex)</p>
                         <p>Pepto-Bismol (bismuth subsalicylate)</p>`
                },
                actions: {
                  items: [
                    { 
                      href: "/add-medication", 
                      text: "Add",
                      visuallyHiddenText: "new medication"
                    },
                    { 
                      href: "/edit-medications", 
                      text: "Change",
                      visuallyHiddenText: "medications"
                    }
                  ]
                }
              },
              {
                key: { text: "Known allergies" },
                value: { text: "Penicillin, Shellfish" },
                actions: {
                  items: [
                    { 
                      href: "/edit-allergies", 
                      text: "Change",
                      visuallyHiddenText: "allergies"
                    }
                  ]
                }
              }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Current medications')).toBeInTheDocument();
      expect(screen.getByText('Isotretinoin capsules (Roaccutane)')).toBeInTheDocument();
      expect(screen.getByText('Known allergies')).toBeInTheDocument();
      expect(screen.getByText('Penicillin, Shellfish')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Add new medication/ })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Change medications/ })).toBeInTheDocument();
    });

    it('renders appointment details summary', () => {
      render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { text: "Appointment type" },
                value: { text: "GP consultation" }
              },
              {
                key: { text: "Date and time" },
                value: { text: "15 March 2024 at 2:30pm" },
                actions: {
                  items: [
                    { 
                      href: "/reschedule", 
                      text: "Reschedule",
                      visuallyHiddenText: "appointment"
                    }
                  ]
                }
              },
              {
                key: { text: "Location" },
                value: { 
                  html: `<p>Riverside Medical Centre</p>
                         <p>123 High Street</p>
                         <p>London SW1 1AA</p>`
                }
              },
              {
                key: { text: "Reason for visit" },
                value: { text: "Annual health check" },
                actions: {
                  items: [
                    { 
                      href: "/edit-reason", 
                      text: "Change",
                      visuallyHiddenText: "reason for visit"
                    }
                  ]
                }
              }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Appointment type')).toBeInTheDocument();
      expect(screen.getByText('GP consultation')).toBeInTheDocument();
      expect(screen.getByText('15 March 2024 at 2:30pm')).toBeInTheDocument();
      expect(screen.getByText('Riverside Medical Centre')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Reschedule appointment/ })).toBeInTheDocument();
    });

    it('renders emergency contact information', () => {
      render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { text: "Emergency contact name" },
                value: { text: "John Philips" },
                actions: {
                  items: [
                    { 
                      href: "/edit-emergency-contact", 
                      text: "Change",
                      visuallyHiddenText: "emergency contact name"
                    }
                  ]
                }
              },
              {
                key: { text: "Relationship" },
                value: { text: "Spouse" }
              },
              {
                key: { text: "Emergency contact number" },
                value: { text: "07700 900458" },
                actions: {
                  items: [
                    { 
                      href: "/edit-emergency-number", 
                      text: "Change",
                      visuallyHiddenText: "emergency contact number"
                    }
                  ]
                }
              }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Emergency contact name')).toBeInTheDocument();
      expect(screen.getByText('John Philips')).toBeInTheDocument();
      expect(screen.getByText('Relationship')).toBeInTheDocument();
      expect(screen.getByText('Spouse')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Change emergency contact name/ })).toBeInTheDocument();
    });

    it('renders check your answers summary', () => {
      render(
        <TestWrapper>
          <SummaryList 
            rows={[
              {
                key: { text: "Do you smoke?" },
                value: { text: "No" },
                actions: {
                  items: [
                    { 
                      href: "/smoking", 
                      text: "Change",
                      visuallyHiddenText: "smoking status"
                    }
                  ]
                }
              },
              {
                key: { text: "How much alcohol do you drink?" },
                value: { text: "2-3 units per week" },
                actions: {
                  items: [
                    { 
                      href: "/alcohol", 
                      text: "Change",
                      visuallyHiddenText: "alcohol consumption"
                    }
                  ]
                }
              },
              {
                key: { text: "Do you exercise regularly?" },
                value: { text: "Yes, 3 times per week" },
                actions: {
                  items: [
                    { 
                      href: "/exercise", 
                      text: "Change",
                      visuallyHiddenText: "exercise frequency"
                    }
                  ]
                }
              }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Do you smoke?')).toBeInTheDocument();
      expect(screen.getByText('No')).toBeInTheDocument();
      expect(screen.getByText('How much alcohol do you drink?')).toBeInTheDocument();
      expect(screen.getByText('2-3 units per week')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Change smoking status/ })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Change alcohol consumption/ })).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(SummaryList.displayName).toBe('SummaryList');
    });
  });
});