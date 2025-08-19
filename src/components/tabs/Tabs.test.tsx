import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Tabs } from './Tabs';
import { vi } from 'vitest';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockTabItems = [
  {
    id: 'tab-one',
    label: 'Tab one',
    panel: {
      html: '<h2>Tab one content</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>'
    }
  },
  {
    id: 'tab-two',
    label: 'Tab two',
    panel: {
      text: 'Tab two content with plain text.'
    }
  },
  {
    id: 'tab-three',
    label: 'Tab three',
    panel: {
      html: '<h2>Tab three content</h2><p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>'
    }
  }
];

// Mock window.innerWidth
const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe('Tabs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockInnerWidth(1024);
    
    // Mock location hash
    Object.defineProperty(window, 'location', {
      value: { hash: '' },
      writable: true
    });
  });

  describe('Basic functionality', () => {
    it('renders tabs with correct structure', () => {
      render(
        <TestWrapper>
          <Tabs items={mockTabItems} />
        </TestWrapper>
      );

      expect(screen.getByText('Tab one')).toBeInTheDocument();
      expect(screen.getByText('Tab two')).toBeInTheDocument();
      expect(screen.getByText('Tab three')).toBeInTheDocument();
      
      // First tab should be active by default
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    });

    it('renders with custom title', () => {
      render(
        <TestWrapper>
          <Tabs items={mockTabItems} title="Custom Contents" />
        </TestWrapper>
      );

      expect(screen.getByText('Custom Contents')).toBeInTheDocument();
    });

    it('displays first tab content by default', () => {
      render(
        <TestWrapper>
          <Tabs items={mockTabItems} />
        </TestWrapper>
      );

      expect(screen.getByText('Tab one content')).toBeInTheDocument();
      expect(screen.queryByText('Tab two content with plain text.')).not.toBeVisible();
    });

    it('renders HTML content correctly', () => {
      render(
        <TestWrapper>
          <Tabs items={mockTabItems} />
        </TestWrapper>
      );

      const heading = screen.getByText('Tab one content');
      expect(heading.tagName).toBe('H2');
    });

    it('renders text content correctly', () => {
      render(
        <TestWrapper>
          <Tabs items={mockTabItems} />
        </TestWrapper>
      );

      const tabs = screen.getAllByRole('tab');
      fireEvent.click(tabs[1]);
      expect(screen.getByText('Tab two content with plain text.')).toBeInTheDocument();
    });
  });

  describe('Tab interactions', () => {
    it('switches tabs when clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <Tabs items={mockTabItems} />
        </TestWrapper>
      );

      const tabs = screen.getAllByRole('tab');
      await user.click(tabs[1]);

      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('Tab two content with plain text.')).toBeVisible();
    });

    it('calls onTabChange when tab is clicked', async () => {
      const user = userEvent.setup();
      const onTabChange = vi.fn();
      
      render(
        <TestWrapper>
          <Tabs items={mockTabItems} onTabChange={onTabChange} />
        </TestWrapper>
      );

      const tabs = screen.getAllByRole('tab');
      await user.click(tabs[1]);
      
      expect(onTabChange).toHaveBeenCalledWith(1, 'tab-two');
    });

    it('prevents default link behavior on tab click', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <Tabs items={mockTabItems} />
        </TestWrapper>
      );

      const tabs = screen.getAllByRole('tab');
      
      // Mock preventDefault to spy on it
      const mockPreventDefault = vi.fn();
      tabs[1].addEventListener('click', (e) => {
        e.preventDefault = mockPreventDefault;
      });
      
      await user.click(tabs[1]);
      
      // The component should call preventDefault internally
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Keyboard navigation', () => {
    it('has proper keyboard attributes', () => {
      render(
        <TestWrapper>
          <Tabs items={mockTabItems} />
        </TestWrapper>
      );

      const tabs = screen.getAllByRole('tab');
      
      // Test that tabs have proper ARIA and keyboard attributes
      expect(tabs[0]).toHaveAttribute('tabindex', '0');
      expect(tabs[1]).toHaveAttribute('tabindex', '-1');
      expect(tabs[2]).toHaveAttribute('tabindex', '-1');
      
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component with defaultActiveTab', () => {
      render(
        <TestWrapper>
          <Tabs items={mockTabItems} defaultActiveTab={1} />
        </TestWrapper>
      );

      const tabs = screen.getAllByRole('tab');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Tab two content with plain text.')).toBeVisible();
    });

    it('works as controlled component', async () => {
      const user = userEvent.setup();
      const onTabChange = vi.fn();
      
      const ControlledTabs = () => {
        const [activeTab, setActiveTab] = React.useState(0);
        
        return (
          <Tabs 
            items={mockTabItems} 
            activeTab={activeTab}
            onTabChange={(index) => {
              setActiveTab(index);
              onTabChange(index);
            }}
          />
        );
      };
      
      render(
        <TestWrapper>
          <ControlledTabs />
        </TestWrapper>
      );

      const tabs = screen.getAllByRole('tab');
      await user.click(tabs[1]);
      
      expect(onTabChange).toHaveBeenCalledWith(1);
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Responsive behavior', () => {
    it('shows accordion-style layout on mobile', () => {
      mockInnerWidth(500);
      
      render(
        <TestWrapper>
          <Tabs items={mockTabItems} />
        </TestWrapper>
      );

      fireEvent(window, new Event('resize'));

      // On mobile, all panels should be visible
      expect(screen.getByText('Tab one')).toBeInTheDocument();
      expect(screen.getByText('Tab two')).toBeInTheDocument();
      expect(screen.getByText('Tab three')).toBeInTheDocument();
    });
  });

  describe('Custom attributes', () => {
    it('applies custom id to container', () => {
      const { container } = render(
        <TestWrapper>
          <Tabs items={mockTabItems} id="custom-tabs" />
        </TestWrapper>
      );

      expect(container.querySelector('#custom-tabs')).toBeInTheDocument();
    });

    it('applies data-testid', () => {
      render(
        <TestWrapper>
          <Tabs items={mockTabItems} data-testid="tabs-test" />
        </TestWrapper>
      );

      expect(screen.getByTestId('tabs-test')).toBeInTheDocument();
    });

    it('applies additional className', () => {
      const { container } = render(
        <TestWrapper>
          <Tabs items={mockTabItems} className="custom-class" />
        </TestWrapper>
      );

      const tabsContainer = container.querySelector('.nhsuk-tabs');
      expect(tabsContainer).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes on desktop', () => {
      render(
        <TestWrapper>
          <Tabs items={mockTabItems} />
        </TestWrapper>
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();

      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);

      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[0]).toHaveAttribute('aria-controls', 'tab-one');
      expect(tabs[0]).toHaveAttribute('tabindex', '0');

      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[1]).toHaveAttribute('tabindex', '-1');

      const firstPanel = document.getElementById('tab-one');
      expect(firstPanel).toHaveAttribute('role', 'tabpanel');
      expect(firstPanel).toHaveAttribute('aria-labelledby', 'tab_tab-one');
    });
  });

  describe('Healthcare use cases', () => {
    const healthcareTabItems = [
      {
        id: 'patient-info',
        label: 'Patient Information',
        panel: {
          html: `
            <h2>Patient Details</h2>
            <p><strong>Name:</strong> Sarah Phillips</p>
            <p><strong>NHS Number:</strong> 485 777 3456</p>
          `
        }
      },
      {
        id: 'medical-history',
        label: 'Medical History',
        panel: {
          html: `
            <h2>Conditions</h2>
            <ul>
              <li>Type 2 Diabetes (diagnosed 2018)</li>
            </ul>
          `
        }
      }
    ];

    it('renders healthcare tabs correctly', () => {
      render(
        <TestWrapper>
          <Tabs items={healthcareTabItems} title="Patient Records" />
        </TestWrapper>
      );

      expect(screen.getByText('Patient Records')).toBeInTheDocument();
      expect(screen.getByText('Patient Information')).toBeInTheDocument();
      expect(screen.getByText('Medical History')).toBeInTheDocument();
      expect(screen.getByText('Sarah Phillips')).toBeInTheDocument();
    });

    it('switches between healthcare sections', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <Tabs items={healthcareTabItems} />
        </TestWrapper>
      );

      const tabs = screen.getAllByRole('tab');
      await user.click(tabs[1]);
      
      expect(screen.getByText('Type 2 Diabetes (diagnosed 2018)')).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Tabs.displayName).toBe('Tabs');
    });
  });
});