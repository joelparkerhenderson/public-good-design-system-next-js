import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Footer } from './Footer';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Footer', () => {
  describe('Basic functionality', () => {
    it('renders footer with default copyright', () => {
      render(
        <TestWrapper>
          <Footer />
        </TestWrapper>
      );

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('© NHS England')).toBeInTheDocument();
    });

    it('renders footer with custom copyright text', () => {
      render(
        <TestWrapper>
          <Footer copyright={{ text: '© 2024 Health Organization' }} />
        </TestWrapper>
      );

      expect(screen.getByText('© 2024 Health Organization')).toBeInTheDocument();
    });

    it('renders footer with custom copyright HTML', () => {
      render(
        <TestWrapper>
          <Footer copyright={{ html: '© 2024 <strong>Health</strong> Organization' }} />
        </TestWrapper>
      );

      expect(screen.getByText('Health')).toBeInTheDocument();
      const strong = screen.getByText('Health');
      expect(strong.tagName).toBe('STRONG');
    });

    it('prioritizes copyright HTML over text', () => {
      render(
        <TestWrapper>
          <Footer copyright={{ 
            text: 'Text copyright',
            html: '<em>HTML copyright</em>'
          }} />
        </TestWrapper>
      );

      expect(screen.getByText('HTML copyright')).toBeInTheDocument();
      expect(screen.queryByText('Text copyright')).not.toBeInTheDocument();
    });
  });

  describe('Meta section', () => {
    it('renders meta section with links', () => {
      const metaItems = [
        { href: '/about', text: 'About us' },
        { href: '/contact', text: 'Contact' },
        { href: '/privacy', text: 'Privacy policy' }
      ];

      render(
        <TestWrapper>
          <Footer meta={{ items: metaItems }} />
        </TestWrapper>
      );

      expect(screen.getByRole('link', { name: 'About us' })).toHaveAttribute('href', '/about');
      expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
      expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '/privacy');
    });

    it('renders meta section with text', () => {
      render(
        <TestWrapper>
          <Footer meta={{ 
            text: 'All content is available under the Open Government Licence.',
            items: [{ href: '/about', text: 'About us' }]
          }} />
        </TestWrapper>
      );

      expect(screen.getByText('All content is available under the Open Government Licence.')).toBeInTheDocument();
    });

    it('renders meta section with HTML', () => {
      render(
        <TestWrapper>
          <Footer meta={{ 
            html: 'All content is available under the <strong>Open Government Licence</strong>.',
            items: [{ href: '/about', text: 'About us' }]
          }} />
        </TestWrapper>
      );

      expect(screen.getByText('Open Government Licence')).toBeInTheDocument();
      const strong = screen.getByText('Open Government Licence');
      expect(strong.tagName).toBe('STRONG');
    });

    it('renders meta section with children', () => {
      render(
        <TestWrapper>
          <Footer meta={{ items: [{ href: '/about', text: 'About us' }] }}>
            <span>Custom meta content</span>
          </Footer>
        </TestWrapper>
      );

      expect(screen.getByText('Custom meta content')).toBeInTheDocument();
    });

    it('prioritizes children over meta HTML and text', () => {
      render(
        <TestWrapper>
          <Footer meta={{ 
            text: 'Meta text',
            html: '<em>Meta HTML</em>',
            items: [{ href: '/about', text: 'About us' }]
          }}>
            <span>Children content</span>
          </Footer>
        </TestWrapper>
      );

      expect(screen.getByText('Children content')).toBeInTheDocument();
      expect(screen.queryByText('Meta text')).not.toBeInTheDocument();
      expect(screen.queryByText('Meta HTML')).not.toBeInTheDocument();
    });

    it('includes visually hidden title for meta links', () => {
      const { container } = render(
        <TestWrapper>
          <Footer meta={{ items: [{ href: '/about', text: 'About us' }] }} />
        </TestWrapper>
      );

      const hiddenTitle = container.querySelector('.footer__meta-title');
      expect(hiddenTitle).toHaveTextContent('Support links');
    });

    it('uses custom visually hidden title', () => {
      const { container } = render(
        <TestWrapper>
          <Footer meta={{ 
            visuallyHiddenTitle: 'Policy links',
            items: [{ href: '/about', text: 'About us' }]
          }} />
        </TestWrapper>
      );

      const hiddenTitle = container.querySelector('.footer__meta-title');
      expect(hiddenTitle).toHaveTextContent('Policy links');
    });
  });

  describe('Navigation sections', () => {
    it('renders single navigation section', () => {
      const navigation = {
        title: 'Services',
        items: [
          { href: '/appointments', text: 'Appointments' },
          { href: '/prescriptions', text: 'Prescriptions' }
        ]
      };

      render(
        <TestWrapper>
          <Footer navigation={navigation} />
        </TestWrapper>
      );

      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Appointments' })).toHaveAttribute('href', '/appointments');
      expect(screen.getByRole('link', { name: 'Prescriptions' })).toHaveAttribute('href', '/prescriptions');
    });

    it('renders multiple navigation sections', () => {
      const navigation = [
        {
          title: 'Services',
          items: [
            { href: '/appointments', text: 'Appointments' },
            { href: '/prescriptions', text: 'Prescriptions' }
          ]
        },
        {
          title: 'Support',
          items: [
            { href: '/help', text: 'Help' },
            { href: '/contact', text: 'Contact' }
          ]
        }
      ];

      render(
        <TestWrapper>
          <Footer navigation={navigation} />
        </TestWrapper>
      );

      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Support')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Appointments' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Help' })).toBeInTheDocument();
    });

    it('renders navigation section with HTML content', () => {
      const navigation = {
        html: '<p><strong>Important</strong> information about our services.</p>',
        items: [{ href: '/info', text: 'More info' }]
      };

      render(
        <TestWrapper>
          <Footer navigation={navigation} />
        </TestWrapper>
      );

      expect(screen.getByText('Important')).toBeInTheDocument();
      const strong = screen.getByText('Important');
      expect(strong.tagName).toBe('STRONG');
    });

    it('renders navigation section with text content', () => {
      const navigation = {
        text: 'Additional information about our services.',
        items: [{ href: '/info', text: 'More info' }]
      };

      render(
        <TestWrapper>
          <Footer navigation={navigation} />
        </TestWrapper>
      );

      expect(screen.getByText('Additional information about our services.')).toBeInTheDocument();
    });

    it('prioritizes HTML over text in navigation sections', () => {
      const navigation = {
        text: 'Text content',
        html: '<em>HTML content</em>',
        items: [{ href: '/info', text: 'More info' }]
      };

      render(
        <TestWrapper>
          <Footer navigation={navigation} />
        </TestWrapper>
      );

      expect(screen.getByText('HTML content')).toBeInTheDocument();
      expect(screen.queryByText('Text content')).not.toBeInTheDocument();
    });
  });

  describe('Link handling', () => {
    it('renders links with HTML content', () => {
      const navigation = {
        items: [
          { href: '/important', html: '<strong>Important</strong> link' }
        ]
      };

      render(
        <TestWrapper>
          <Footer navigation={navigation} />
        </TestWrapper>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/important');
      expect(screen.getByText('Important')).toBeInTheDocument();
    });

    it('applies custom attributes to links', () => {
      const navigation = {
        items: [
          { 
            href: '/external', 
            text: 'External link',
            attributes: { 
              'target': '_blank',
              'rel': 'noopener noreferrer',
              'aria-label': 'External link (opens in new tab)'
            }
          }
        ]
      };

      render(
        <TestWrapper>
          <Footer navigation={navigation} />
        </TestWrapper>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('aria-label', 'External link (opens in new tab)');
    });
  });

  describe('Column layouts', () => {
    it('handles 1 column layout', () => {
      const navigation = [
        { items: [{ href: '/link1', text: 'Link 1' }] },
        { items: [{ href: '/link2', text: 'Link 2' }] }
      ];

      const { container } = render(
        <TestWrapper>
          <Footer navigation={navigation} columns={1} />
        </TestWrapper>
      );

      const columns = container.querySelectorAll('.footer__column');
      expect(columns).toHaveLength(2);
    });

    it('handles 2 column layout', () => {
      const navigation = [
        { items: [{ href: '/link1', text: 'Link 1' }] },
        { items: [{ href: '/link2', text: 'Link 2' }] },
        { items: [{ href: '/link3', text: 'Link 3' }] }
      ];

      const { container } = render(
        <TestWrapper>
          <Footer navigation={navigation} columns={2} />
        </TestWrapper>
      );

      const columns = container.querySelectorAll('.footer__column');
      expect(columns).toHaveLength(3);
    });

    it('handles custom column widths', () => {
      const navigation = [
        { 
          width: 'one-half' as const,
          items: [{ href: '/link1', text: 'Link 1' }] 
        },
        { 
          width: 'one-quarter' as const,
          items: [{ href: '/link2', text: 'Link 2' }] 
        }
      ];

      render(
        <TestWrapper>
          <Footer navigation={navigation} />
        </TestWrapper>
      );

      expect(screen.getByText('Link 1')).toBeInTheDocument();
      expect(screen.getByText('Link 2')).toBeInTheDocument();
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to footer', () => {
      const { container } = render(
        <TestWrapper>
          <Footer classes="custom-footer" />
        </TestWrapper>
      );

      const footer = container.querySelector('.footer');
      expect(footer).toHaveClass('custom-footer');
    });

    it('applies custom classes to container', () => {
      const { container } = render(
        <TestWrapper>
          <Footer containerClasses="custom-container" />
        </TestWrapper>
      );

      const container_element = container.querySelector('.footer__container');
      expect(container_element).toHaveClass('custom-container');
    });

    it('applies custom attributes to footer', () => {
      render(
        <TestWrapper>
          <Footer attributes={{ 'data-custom': 'value' }} />
        </TestWrapper>
      );

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveAttribute('data-custom', 'value');
    });

    it('applies custom attributes to component wrapper', () => {
      render(
        <TestWrapper>
          <Footer 
            data-testid="custom-footer"
            className="wrapper-class"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-footer');
      expect(wrapper).toHaveClass('wrapper-class');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic footer element with contentinfo role', () => {
      render(
        <TestWrapper>
          <Footer />
        </TestWrapper>
      );

      const footer = screen.getByRole('contentinfo');
      expect(footer.tagName).toBe('FOOTER');
    });

    it('includes proper heading structure', () => {
      const navigation = [
        {
          title: 'Services',
          items: [{ href: '/appointments', text: 'Appointments' }]
        },
        {
          title: 'Support',
          items: [{ href: '/help', text: 'Help' }]
        }
      ];

      render(
        <TestWrapper>
          <Footer navigation={navigation} />
        </TestWrapper>
      );

      const headings = screen.getAllByRole('heading', { level: 2 });
      expect(headings).toHaveLength(2); // 2 navigation titles (hidden meta title is not exposed via role)
      expect(headings[0]).toHaveTextContent('Services');
      expect(headings[1]).toHaveTextContent('Support');
    });

    it('provides accessible list structure', () => {
      const navigation = {
        items: [
          { href: '/link1', text: 'Link 1' },
          { href: '/link2', text: 'Link 2' }
        ]
      };

      render(
        <TestWrapper>
          <Footer navigation={navigation} />
        </TestWrapper>
      );

      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThan(0);
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
    });
  });

  describe('Healthcare use cases', () => {
    it('renders NHS trust footer', () => {
      const navigation = [
        {
          title: 'Services',
          items: [
            { href: '/appointments', text: 'Book appointment' },
            { href: '/emergency', text: 'Emergency services' },
            { href: '/find-service', text: 'Find a service' }
          ]
        },
        {
          title: 'Health information',
          items: [
            { href: '/health-az', text: 'Health A-Z' },
            { href: '/symptoms', text: 'Check symptoms' },
            { href: '/medicines', text: 'Medicines information' }
          ]
        }
      ];

      render(
        <TestWrapper>
          <Footer 
            navigation={navigation}
            meta={{
              items: [
                { href: '/accessibility', text: 'Accessibility statement' },
                { href: '/privacy', text: 'Privacy policy' },
                { href: '/cookies', text: 'Cookies' }
              ]
            }}
            copyright={{ text: '© 2024 NHS Foundation Trust' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Health information')).toBeInTheDocument();
      expect(screen.getByText('Book appointment')).toBeInTheDocument();
      expect(screen.getByText('Privacy policy')).toBeInTheDocument();
      expect(screen.getByText('© 2024 NHS Foundation Trust')).toBeInTheDocument();
    });

    it('renders public health organization footer', () => {
      render(
        <TestWrapper>
          <Footer 
            navigation={{
              items: [
                { href: '/about', text: 'About us' },
                { href: '/contact', text: 'Contact us' },
                { href: '/careers', text: 'Careers' },
                { href: '/press', text: 'Press office' }
              ]
            }}
            meta={{
              html: 'All content is available under the <a href="#license">Open Government Licence v3.0</a>',
              items: [
                { href: '/accessibility', text: 'Accessibility' },
                { href: '/freedom-of-information', text: 'Freedom of information' }
              ]
            }}
            copyright={{ text: '© Crown copyright' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('About us')).toBeInTheDocument();
      expect(screen.getByText('Open Government Licence v3.0')).toBeInTheDocument();
      expect(screen.getByText('© Crown copyright')).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Footer.displayName).toBe('Footer');
    });
  });
});