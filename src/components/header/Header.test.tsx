import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Header } from './Header';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Header', () => {
  describe('Basic functionality', () => {
    it('renders header with default NHS logo', () => {
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'NHS' })).toBeInTheDocument();
    });

    it('renders header with custom logo aria label', () => {
      render(
        <TestWrapper>
          <Header logo={{ ariaLabel: 'Public Health Service' }} />
        </TestWrapper>
      );

      expect(screen.getByRole('img', { name: 'Public Health Service' })).toBeInTheDocument();
    });

    it('renders header with linked logo', () => {
      render(
        <TestWrapper>
          <Header logo={{ href: '/', ariaLabel: 'Home' }} />
        </TestWrapper>
      );

      const logoLink = screen.getByRole('link');
      expect(logoLink).toHaveAttribute('href', '/');
      expect(logoLink).toHaveClass('header__service-logo');
    });

    it('renders header with custom logo image', () => {
      render(
        <TestWrapper>
          <Header 
            logo={{ 
              src: '/custom-logo.svg',
              ariaLabel: 'Custom Organisation'
            }} 
          />
        </TestWrapper>
      );

      const logoImg = screen.getByAltText('Custom Organisation');
      expect(logoImg).toHaveAttribute('src', '/custom-logo.svg');
      expect(logoImg).toHaveClass('header__organisation-logo');
    });

    it('applies baseUrl to logo src', () => {
      render(
        <TestWrapper>
          <Header 
            logo={{ src: '/logo.svg' }}
            baseUrl="/assets"
          />
        </TestWrapper>
      );

      const logoImg = screen.getByAltText('NHS');
      expect(logoImg).toHaveAttribute('src', '/assets/logo.svg');
    });
  });

  describe('Service name', () => {
    it('renders service name as text', () => {
      render(
        <TestWrapper>
          <Header service={{ text: 'Health Portal' }} />
        </TestWrapper>
      );

      expect(screen.getByText('Health Portal')).toBeInTheDocument();
      expect(screen.getByText('Health Portal')).toHaveClass('header__service-name');
    });

    it('renders service name as link when separate from logo', () => {
      render(
        <TestWrapper>
          <Header 
            logo={{ href: '/nhs' }}
            service={{ text: 'Health Portal', href: '/portal' }} 
          />
        </TestWrapper>
      );

      const serviceLink = screen.getByRole('link', { name: 'Health Portal' });
      expect(serviceLink).toHaveAttribute('href', '/portal');
      expect(serviceLink).toHaveClass('header__service-name');
    });

    it('combines logo and service name into single link when both have same href', () => {
      render(
        <TestWrapper>
          <Header 
            logo={{ href: '/' }}
            service={{ text: 'Health Portal', href: '/' }}
          />
        </TestWrapper>
      );

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute('href', '/');
      expect(links[0]).toHaveClass('header__service-logo');
      expect(screen.getByText('Health Portal')).toBeInTheDocument();
    });

    it('combines logo and service name when logo has no href but service does', () => {
      render(
        <TestWrapper>
          <Header 
            service={{ text: 'Health Portal', href: '/portal' }}
          />
        </TestWrapper>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/portal');
      expect(link).toHaveClass('header__service-logo');
      expect(screen.getByText('Health Portal')).toBeInTheDocument();
    });

    it('keeps separate links when logo and service have different hrefs', () => {
      render(
        <TestWrapper>
          <Header 
            logo={{ href: '/nhs' }}
            service={{ text: 'Health Portal', href: '/portal' }}
          />
        </TestWrapper>
      );

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute('href', '/nhs');
      expect(links[1]).toHaveAttribute('href', '/portal');
      expect(links[1]).toHaveTextContent('Health Portal');
    });
  });

  describe('Organisation branding', () => {
    it('renders organisation name', () => {
      render(
        <TestWrapper>
          <Header 
            organisation={{ 
              name: 'Manchester NHS Foundation Trust'
            }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Manchester NHS Foundation Trust')).toBeInTheDocument();
      expect(screen.getByText('Manchester NHS Foundation Trust')).toHaveClass('header__organisation-name');
    });

    it('renders organisation with split name', () => {
      render(
        <TestWrapper>
          <Header 
            organisation={{ 
              name: 'Manchester University',
              split: 'NHS Foundation Trust'
            }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Manchester University')).toBeInTheDocument();
      expect(screen.getByText('NHS Foundation Trust')).toBeInTheDocument();
      expect(screen.getByText('NHS Foundation Trust')).toHaveClass('header__organisation-name-split');
    });

    it('renders organisation with descriptor', () => {
      render(
        <TestWrapper>
          <Header 
            organisation={{ 
              name: 'Manchester University',
              descriptor: 'NHS Foundation Trust'
            }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Manchester University')).toBeInTheDocument();
      expect(screen.getByText('NHS Foundation Trust')).toBeInTheDocument();
      expect(screen.getByText('NHS Foundation Trust')).toHaveClass('header__organisation-name-descriptor');
    });

    it('renders organisation with name, split and descriptor', () => {
      render(
        <TestWrapper>
          <Header 
            organisation={{ 
              name: 'Anytown Anyplace',
              split: 'Anywhere',
              descriptor: 'NHS Foundation Trust'
            }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Anytown Anyplace')).toBeInTheDocument();
      expect(screen.getByText('Anywhere')).toBeInTheDocument();
      expect(screen.getByText('NHS Foundation Trust')).toBeInTheDocument();
    });
  });

  describe('Search functionality', () => {
    it('renders search when enabled with boolean', () => {
      render(
        <TestWrapper>
          <Header search={true} />
        </TestWrapper>
      );

      expect(screen.getByRole('search')).toBeInTheDocument();
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    it('renders search with default values', () => {
      render(
        <TestWrapper>
          <Header search={{}} />
        </TestWrapper>
      );

      const form = screen.getByRole('search').querySelector('form');
      expect(form).toHaveAttribute('action', 'https://www.nhs.uk/search/');
      expect(form).toHaveAttribute('method', 'get');

      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('name', 'q');
      expect(input).toHaveAttribute('placeholder', 'Search');
      expect(input).toHaveAttribute('autocomplete', 'off');

      expect(screen.getByLabelText('Search the NHS website')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    it('renders search with custom configuration', () => {
      render(
        <TestWrapper>
          <Header 
            search={{
              action: '/custom-search',
              name: 'query',
              placeholder: 'Search health information',
              visuallyHiddenLabel: 'Search health database',
              visuallyHiddenButton: 'Submit search'
            }}
          />
        </TestWrapper>
      );

      const form = screen.getByRole('search').querySelector('form');
      expect(form).toHaveAttribute('action', '/custom-search');

      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('name', 'query');
      expect(input).toHaveAttribute('placeholder', 'Search health information');

      expect(screen.getByLabelText('Search health database')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit search' })).toBeInTheDocument();
    });

    it('does not render search when not provided', () => {
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      expect(screen.queryByRole('search')).not.toBeInTheDocument();
    });
  });

  describe('Account navigation', () => {
    it('renders account navigation with links', () => {
      const accountItems = [
        { href: '/profile', text: 'My Profile', icon: true },
        { href: '/settings', text: 'Settings' }
      ];

      render(
        <TestWrapper>
          <Header account={{ items: accountItems }} />
        </TestWrapper>
      );

      expect(screen.getByRole('navigation', { name: 'Account' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /My Profile/ })).toHaveAttribute('href', '/profile');
      expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute('href', '/settings');
    });

    it('renders account navigation with form actions', () => {
      const accountItems = [
        { href: '/profile', text: 'john.doe@example.com', icon: true },
        { action: '/logout', text: 'Log out' }
      ];

      render(
        <TestWrapper>
          <Header account={{ items: accountItems }} />
        </TestWrapper>
      );

      expect(screen.getByRole('link', { name: /john.doe@example.com/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
      
      const form = screen.getByRole('button', { name: 'Log out' }).closest('form');
      expect(form).toHaveAttribute('action', '/logout');
      expect(form).toHaveAttribute('method', 'post');
    });

    it('renders account navigation with custom method', () => {
      const accountItems = [
        { action: '/logout', method: 'delete', text: 'Log out' }
      ];

      render(
        <TestWrapper>
          <Header account={{ items: accountItems }} />
        </TestWrapper>
      );

      const form = screen.getByRole('button', { name: 'Log out' }).closest('form');
      expect(form).toHaveAttribute('method', 'delete');
    });

    it('renders account navigation with HTML content', () => {
      const accountItems = [
        { href: '/profile', html: '<strong>Admin</strong> User', icon: true }
      ];

      render(
        <TestWrapper>
          <Header account={{ items: accountItems }} />
        </TestWrapper>
      );

      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('Admin').tagName).toBe('STRONG');
    });

    it('renders account navigation with text-only items', () => {
      const accountItems = [
        { text: 'Welcome, John Doe' },
        { href: '/logout', text: 'Log out' }
      ];

      render(
        <TestWrapper>
          <Header account={{ items: accountItems }} />
        </TestWrapper>
      );

      expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Log out' })).toBeInTheDocument();
    });

    it('uses custom aria label for account navigation', () => {
      render(
        <TestWrapper>
          <Header 
            account={{ 
              ariaLabel: 'User account',
              items: [{ href: '/profile', text: 'Profile' }]
            }}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('navigation', { name: 'User account' })).toBeInTheDocument();
    });

    it('filters out null/undefined items', () => {
      const accountItems = [
        { href: '/profile', text: 'Profile' },
        null,
        undefined,
        { href: '/settings', text: 'Settings' }
      ];

      render(
        <TestWrapper>
          <Header account={{ items: accountItems as any }} />
        </TestWrapper>
      );

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveTextContent('Profile');
      expect(links[1]).toHaveTextContent('Settings');
    });
  });

  describe('Primary navigation', () => {
    it('renders navigation with links', () => {
      const navigationItems = [
        { href: '/health-az', text: 'Health A-Z' },
        { href: '/services', text: 'Services' },
        { href: '/emergency', text: 'Emergency' }
      ];

      render(
        <TestWrapper>
          <Header navigation={{ items: navigationItems }} />
        </TestWrapper>
      );

      expect(screen.getByRole('navigation', { name: 'Menu' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Health A-Z' })).toHaveAttribute('href', '/health-az');
      expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services');
      expect(screen.getByRole('link', { name: 'Emergency' })).toHaveAttribute('href', '/emergency');
    });

    it('renders navigation with current page indicator', () => {
      const navigationItems = [
        { href: '/health-az', text: 'Health A-Z' },
        { href: '/services', text: 'Services', current: true },
        { href: '/emergency', text: 'Emergency' }
      ];

      render(
        <TestWrapper>
          <Header navigation={{ items: navigationItems }} />
        </TestWrapper>
      );

      const currentLink = screen.getByRole('link', { name: 'Services' });
      expect(currentLink).toHaveAttribute('aria-current', 'page');
      expect(currentLink.querySelector('strong')).toBeInTheDocument();
    });

    it('renders navigation with active section indicator', () => {
      const navigationItems = [
        { href: '/health-az', text: 'Health A-Z' },
        { href: '/services', text: 'Services', active: true },
        { href: '/emergency', text: 'Emergency' }
      ];

      render(
        <TestWrapper>
          <Header navigation={{ items: navigationItems }} />
        </TestWrapper>
      );

      const activeLink = screen.getByRole('link', { name: 'Services' });
      expect(activeLink).toHaveAttribute('aria-current', 'true');
      expect(activeLink.querySelector('strong')).toBeInTheDocument();
    });

    it('renders navigation with HTML content', () => {
      const navigationItems = [
        { href: '/services', html: '<em>Special</em> Services' }
      ];

      render(
        <TestWrapper>
          <Header navigation={{ items: navigationItems }} />
        </TestWrapper>
      );

      expect(screen.getByText('Special')).toBeInTheDocument();
      expect(screen.getByText('Special').tagName).toBe('EM');
    });

    it('uses custom aria label for navigation', () => {
      render(
        <TestWrapper>
          <Header 
            navigation={{ 
              ariaLabel: 'Main navigation',
              items: [{ href: '/home', text: 'Home' }]
            }}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    });

    it('applies custom classes to navigation', () => {
      render(
        <TestWrapper>
          <Header 
            navigation={{ 
              classes: 'nhsuk-header__navigation--white custom-nav',
              items: [{ href: '/home', text: 'Home' }]
            }}
          />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('header__navigation');
      expect(nav).toHaveClass('nhsuk-header__navigation--white');
      expect(nav).toHaveClass('custom-nav');
    });

    it('applies custom attributes to navigation items', () => {
      const navigationItems = [
        { 
          href: '/external', 
          text: 'External Link',
          attributes: { 
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        }
      ];

      render(
        <TestWrapper>
          <Header navigation={{ items: navigationItems }} />
        </TestWrapper>
      );

      const listItem = screen.getByRole('listitem');
      expect(listItem).toHaveAttribute('target', '_blank');
      expect(listItem).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Complex combinations', () => {
    it('renders full header with all elements', () => {
      render(
        <TestWrapper>
          <Header
            logo={{ href: '/', ariaLabel: 'Home' }}
            service={{ text: 'Health Portal', href: '/' }}
            search={{ placeholder: 'Search health info' }}
            account={{
              items: [
                { href: '/profile', text: 'My Account', icon: true },
                { action: '/logout', text: 'Log out' }
              ]
            }}
            navigation={{
              items: [
                { href: '/health-az', text: 'Health A-Z' },
                { href: '/services', text: 'Services', current: true },
                { href: '/emergency', text: 'Emergency' }
              ]
            }}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByText('Health Portal')).toBeInTheDocument();
      expect(screen.getByRole('search')).toBeInTheDocument();
      expect(screen.getByRole('navigation', { name: 'Account' })).toBeInTheDocument();
      expect(screen.getByRole('navigation', { name: 'Menu' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('aria-current', 'page');
    });

    it('renders organisational header with custom logo', () => {
      render(
        <TestWrapper>
          <Header
            logo={{ 
              src: '/trust-logo.svg',
              href: '/',
              ariaLabel: 'NHS Foundation Trust'
            }}
            organisation={{
              name: 'Manchester University',
              split: 'NHS Foundation Trust',
              descriptor: 'Excellence in Healthcare'
            }}
            search={{ visuallyHiddenLabel: 'Search trust website' }}
          />
        </TestWrapper>
      );

      expect(screen.getByAltText('NHS Foundation Trust')).toHaveAttribute('src', '/trust-logo.svg');
      expect(screen.getByText('Manchester University')).toBeInTheDocument();
      expect(screen.getByText('NHS Foundation Trust')).toBeInTheDocument();
      expect(screen.getByText('Excellence in Healthcare')).toBeInTheDocument();
      expect(screen.getByLabelText('Search trust website')).toBeInTheDocument();
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to header', () => {
      render(
        <TestWrapper>
          <Header classes="nhsuk-header--white custom-header" />
        </TestWrapper>
      );

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('header');
      expect(header).toHaveClass('nhsuk-header--white');
      expect(header).toHaveClass('custom-header');
    });

    it('applies custom classes to container', () => {
      const { container } = render(
        <TestWrapper>
          <Header containerClasses="custom-container" />
        </TestWrapper>
      );

      const headerContainer = container.querySelector('.header__container');
      expect(headerContainer).toHaveClass('custom-container');
    });

    it('applies custom attributes to header', () => {
      render(
        <TestWrapper>
          <Header attributes={{ 'data-custom': 'value' }} />
        </TestWrapper>
      );

      const header = screen.getByRole('banner');
      expect(header).toHaveAttribute('data-custom', 'value');
    });

    it('applies custom attributes to component wrapper', () => {
      render(
        <TestWrapper>
          <Header 
            data-testid="custom-header"
            className="wrapper-class"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-header');
      expect(wrapper).toHaveClass('wrapper-class');
    });

    it('adds organisation class when organisation provided', () => {
      render(
        <TestWrapper>
          <Header organisation={{ name: 'Test Organisation' }} />
        </TestWrapper>
      );

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('header--organisation');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic header element with banner role', () => {
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const header = screen.getByRole('banner');
      expect(header.tagName).toBe('HEADER');
    });

    it('provides accessible form structure for search', () => {
      render(
        <TestWrapper>
          <Header search={{ visuallyHiddenLabel: 'Search website' }} />
        </TestWrapper>
      );

      const searchInput = screen.getByRole('searchbox');
      const searchLabel = screen.getByLabelText('Search website');
      expect(searchInput).toBe(searchLabel);
      expect(searchInput).toHaveAttribute('id', 'search-field');
    });

    it('provides accessible navigation structure', () => {
      render(
        <TestWrapper>
          <Header 
            navigation={{
              items: [
                { href: '/health', text: 'Health A-Z' },
                { href: '/services', text: 'Services' }
              ]
            }}
          />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation', { name: 'Menu' });
      const list = nav.querySelector('ul');
      const listItems = nav.querySelectorAll('li');
      
      expect(list).toBeInTheDocument();
      expect(listItems).toHaveLength(2);
    });

    it('indicates current page correctly', () => {
      render(
        <TestWrapper>
          <Header 
            navigation={{
              items: [
                { href: '/health', text: 'Health A-Z' },
                { href: '/services', text: 'Services', current: true }
              ]
            }}
          />
        </TestWrapper>
      );

      const currentLink = screen.getByRole('link', { name: 'Services' });
      expect(currentLink).toHaveAttribute('aria-current', 'page');
    });

    it('provides accessible account navigation', () => {
      render(
        <TestWrapper>
          <Header 
            account={{
              items: [
                { href: '/profile', text: 'Profile' },
                { action: '/logout', text: 'Log out' }
              ]
            }}
          />
        </TestWrapper>
      );

      const accountNav = screen.getByRole('navigation', { name: 'Account' });
      expect(accountNav).toBeInTheDocument();
      
      const list = accountNav.querySelector('ul');
      expect(list).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Header.displayName).toBe('Header');
    });
  });
});