import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Hero } from './Hero';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Hero', () => {
  describe('Basic functionality', () => {
    it('renders hero with heading', () => {
      render(
        <TestWrapper>
          <Hero heading="We're here for you" />
        </TestWrapper>
      );

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText("We're here for you")).toBeInTheDocument();
    });

    it('renders hero with heading and text', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="We're here for you"
            text="Helping you take control of your health and wellbeing."
          />
        </TestWrapper>
      );

      expect(screen.getByText("We're here for you")).toBeInTheDocument();
      expect(screen.getByText("Helping you take control of your health and wellbeing.")).toBeInTheDocument();
    });

    it('renders hero with custom heading level', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Section Title"
            headingLevel={2}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByText("Section Title")).toBeInTheDocument();
    });

    it('renders hero with HTML content', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Health Services"
            html="<p>Access <strong>emergency</strong> services 24/7.</p>"
          />
        </TestWrapper>
      );

      expect(screen.getByText("Health Services")).toBeInTheDocument();
      expect(screen.getByText("emergency")).toBeInTheDocument();
      expect(screen.getByText("emergency").tagName).toBe('STRONG');
    });

    it('renders hero with React children', () => {
      render(
        <TestWrapper>
          <Hero heading="Welcome">
            <p>Custom React content</p>
            <span>Additional elements</span>
          </Hero>
        </TestWrapper>
      );

      expect(screen.getByText("Welcome")).toBeInTheDocument();
      expect(screen.getByText("Custom React content")).toBeInTheDocument();
      expect(screen.getByText("Additional elements")).toBeInTheDocument();
    });

    it('applies custom heading classes', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Custom Styled Heading"
            headingClasses="custom-heading-class"
          />
        </TestWrapper>
      );

      const heading = screen.getByText("Custom Styled Heading");
      expect(heading).toHaveClass('hero__heading');
      expect(heading).toHaveClass('custom-heading-class');
    });
  });

  describe('Content priority', () => {
    it('prioritizes children over HTML content', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Priority Test"
            html="<p>HTML content that should be ignored</p>"
          >
            <p>Children content takes priority</p>
          </Hero>
        </TestWrapper>
      );

      expect(screen.getByText("Children content takes priority")).toBeInTheDocument();
      expect(screen.queryByText("HTML content that should be ignored")).not.toBeInTheDocument();
    });

    it('prioritizes HTML over text content', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Priority Test"
            text="Text content that should be ignored"
            html="<p>HTML content takes priority</p>"
          />
        </TestWrapper>
      );

      expect(screen.getByText("HTML content takes priority")).toBeInTheDocument();
      expect(screen.queryByText("Text content that should be ignored")).not.toBeInTheDocument();
    });

    it('uses text when no HTML or children provided', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Text Only"
            text="This text should be displayed"
          />
        </TestWrapper>
      );

      expect(screen.getByText("This text should be displayed")).toBeInTheDocument();
    });
  });

  describe('Background image', () => {
    it('renders hero with background image', () => {
      const { container } = render(
        <TestWrapper>
          <Hero 
            heading="Image Hero"
            imageURL="/hero-image.jpg"
          />
        </TestWrapper>
      );

      const heroSection = container.querySelector('.hero');
      expect(heroSection).toHaveStyle("background-image: url('/hero-image.jpg')");
      expect(heroSection).toHaveClass('hero--image');
    });

    it('adds image description class when both image and heading present', () => {
      const { container } = render(
        <TestWrapper>
          <Hero 
            heading="Image with Description"
            imageURL="/hero-image.jpg"
          />
        </TestWrapper>
      );

      const heroSection = container.querySelector('.hero');
      expect(heroSection).toHaveClass('hero--image');
      expect(heroSection).toHaveClass('hero--image-description');
    });

    it('includes overlay for image heroes', () => {
      const { container } = render(
        <TestWrapper>
          <Hero 
            heading="Image Hero"
            imageURL="/hero-image.jpg"
          />
        </TestWrapper>
      );

      const overlay = container.querySelector('.hero__overlay');
      expect(overlay).toBeInTheDocument();
    });

    it('includes arrow for image heroes', () => {
      const { container } = render(
        <TestWrapper>
          <Hero 
            heading="Image Hero"
            imageURL="/hero-image.jpg"
          />
        </TestWrapper>
      );

      const arrow = container.querySelector('.hero__arrow');
      expect(arrow).toBeInTheDocument();
      expect(arrow).toHaveAttribute('aria-hidden', 'true');
    });

    it('does not include overlay for non-image heroes', () => {
      const { container } = render(
        <TestWrapper>
          <Hero heading="Regular Hero" />
        </TestWrapper>
      );

      const overlay = container.querySelector('.hero__overlay');
      expect(overlay).not.toBeInTheDocument();
    });

    it('does not include arrow for non-image heroes', () => {
      const { container } = render(
        <TestWrapper>
          <Hero heading="Regular Hero" />
        </TestWrapper>
      );

      const arrow = container.querySelector('.hero__arrow');
      expect(arrow).not.toBeInTheDocument();
    });
  });

  describe('Heading levels', () => {
    it('renders h1 by default', () => {
      render(
        <TestWrapper>
          <Hero heading="Default Heading" />
        </TestWrapper>
      );

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('renders h2 when specified', () => {
      render(
        <TestWrapper>
          <Hero heading="H2 Heading" headingLevel={2} />
        </TestWrapper>
      );

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('renders h3 when specified', () => {
      render(
        <TestWrapper>
          <Hero heading="H3 Heading" headingLevel={3} />
        </TestWrapper>
      );

      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('renders h6 when specified', () => {
      render(
        <TestWrapper>
          <Hero heading="H6 Heading" headingLevel={6} />
        </TestWrapper>
      );

      expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
    });
  });

  describe('Layout variations', () => {
    it('applies border class for non-image heroes', () => {
      const { container } = render(
        <TestWrapper>
          <Hero heading="Regular Hero" />
        </TestWrapper>
      );

      const heroContainer = container.querySelector('.hero__container');
      expect(heroContainer).toHaveClass('hero--border');
    });

    it('does not apply border class for image heroes', () => {
      const { container } = render(
        <TestWrapper>
          <Hero 
            heading="Image Hero"
            imageURL="/hero-image.jpg"
          />
        </TestWrapper>
      );

      const heroContainer = container.querySelector('.hero__container');
      expect(heroContainer).not.toHaveClass('hero--border');
    });

    it('uses hero-content class for image heroes', () => {
      const { container } = render(
        <TestWrapper>
          <Hero 
            heading="Image Hero"
            imageURL="/hero-image.jpg"
          />
        </TestWrapper>
      );

      const contentWrapper = container.querySelector('.hero-content');
      expect(contentWrapper).toBeInTheDocument();
    });

    it('uses hero__wrapper class for non-image heroes', () => {
      const { container } = render(
        <TestWrapper>
          <Hero heading="Regular Hero" />
        </TestWrapper>
      );

      const contentWrapper = container.querySelector('.hero__wrapper');
      expect(contentWrapper).toBeInTheDocument();
    });
  });

  describe('Empty states', () => {
    it('renders heading-only hero', () => {
      render(
        <TestWrapper>
          <Hero heading="Heading Only" />
        </TestWrapper>
      );

      expect(screen.getByText("Heading Only")).toBeInTheDocument();
    });

    it('renders image-only hero without content', () => {
      const { container } = render(
        <TestWrapper>
          <Hero imageURL="/hero-image.jpg" />
        </TestWrapper>
      );

      const heroSection = container.querySelector('.hero');
      expect(heroSection).toHaveStyle("background-image: url('/hero-image.jpg')");
      expect(heroSection).toHaveClass('hero--image');
      expect(heroSection).not.toHaveClass('hero--image-description');
    });

    it('does not render content container when no heading or content', () => {
      const { container } = render(
        <TestWrapper>
          <Hero imageURL="/hero-image.jpg" />
        </TestWrapper>
      );

      const heroContainer = container.querySelector('.hero__container');
      expect(heroContainer).not.toBeInTheDocument();
    });

    it('renders completely empty hero', () => {
      const { container } = render(
        <TestWrapper>
          <Hero />
        </TestWrapper>
      );

      const heroSection = container.querySelector('.hero');
      expect(heroSection).toBeInTheDocument();
      
      const heroContainer = container.querySelector('.hero__container');
      expect(heroContainer).not.toBeInTheDocument();
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to hero', () => {
      const { container } = render(
        <TestWrapper>
          <Hero 
            heading="Custom Hero"
            classes="custom-hero-class"
          />
        </TestWrapper>
      );

      const heroSection = container.querySelector('.hero');
      expect(heroSection).toHaveClass('hero');
      expect(heroSection).toHaveClass('custom-hero-class');
    });

    it('applies custom classes to container', () => {
      const { container } = render(
        <TestWrapper>
          <Hero 
            heading="Custom Container"
            containerClasses="custom-container-class"
          />
        </TestWrapper>
      );

      const heroContainer = container.querySelector('.hero__container');
      expect(heroContainer).toHaveClass('custom-container-class');
    });

    it('applies custom attributes to hero', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Custom Attributes"
            attributes={{ 'data-custom': 'value' }}
          />
        </TestWrapper>
      );

      const heroSection = screen.getByRole('region');
      expect(heroSection).toHaveAttribute('data-custom', 'value');
    });

    it('applies custom attributes to component wrapper', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Test Hero"
            data-testid="custom-hero"
            className="wrapper-class"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-hero');
      expect(wrapper).toHaveClass('wrapper-class');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic section element', () => {
      render(
        <TestWrapper>
          <Hero heading="Accessible Hero" />
        </TestWrapper>
      );

      const section = screen.getByRole('region');
      expect(section.tagName).toBe('SECTION');
    });

    it('provides proper heading structure', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Main Hero Heading"
            headingLevel={1}
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Main Hero Heading');
    });

    it('hides decorative arrow from screen readers', () => {
      const { container } = render(
        <TestWrapper>
          <Hero 
            heading="Image Hero"
            imageURL="/hero-image.jpg"
          />
        </TestWrapper>
      );

      const arrow = container.querySelector('.hero__arrow');
      expect(arrow).toHaveAttribute('aria-hidden', 'true');
    });

    it('maintains heading hierarchy', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Section Hero"
            headingLevel={2}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    });
  });

  describe('Healthcare use cases', () => {
    it('renders emergency services hero', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Emergency Services"
            text="24/7 urgent care when you need it most."
            imageURL="/emergency-hero.jpg"
            headingLevel={1}
          />
        </TestWrapper>
      );

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Emergency Services');
      expect(screen.getByText('24/7 urgent care when you need it most.')).toBeInTheDocument();
    });

    it('renders health portal hero with children', () => {
      render(
        <TestWrapper>
          <Hero heading="Health Portal">
            <p>Access your health records, book appointments, and manage prescriptions.</p>
            <div>
              <button>Login</button>
              <button>Register</button>
            </div>
          </Hero>
        </TestWrapper>
      );

      expect(screen.getByText('Health Portal')).toBeInTheDocument();
      expect(screen.getByText('Access your health records, book appointments, and manage prescriptions.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    });

    it('renders public health campaign hero', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Get Vaccinated"
            html="<p>Protect yourself and your community. <a href='/vaccination-booking'>Book your appointment</a> today.</p>"
            imageURL="/vaccination-campaign.jpg"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Get Vaccinated')).toBeInTheDocument();
      expect(screen.getByText(/Protect yourself and your community/)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Book your appointment' })).toBeInTheDocument();
    });

    it('renders NHS trust homepage hero', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Manchester University NHS Foundation Trust"
            text="Providing excellent healthcare services to our community with compassion and expertise."
            headingLevel={1}
            headingClasses="trust-heading"
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Manchester University NHS Foundation Trust');
      expect(heading).toHaveClass('trust-heading');
      expect(screen.getByText('Providing excellent healthcare services to our community with compassion and expertise.')).toBeInTheDocument();
    });

    it('renders mental health service hero', () => {
      render(
        <TestWrapper>
          <Hero 
            heading="Mental Health Support"
            imageURL="/mental-health-support.jpg"
          >
            <p>We're here to help you through difficult times.</p>
            <p><strong>Crisis support available 24/7:</strong> 0800 123 4567</p>
            <button>Get Support</button>
          </Hero>
        </TestWrapper>
      );

      expect(screen.getByText('Mental Health Support')).toBeInTheDocument();
      expect(screen.getByText("We're here to help you through difficult times.")).toBeInTheDocument();
      expect(screen.getByText('Crisis support available 24/7:')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Get Support' })).toBeInTheDocument();
    });
  });

  describe('Responsive behavior', () => {
    it('includes responsive styling classes', () => {
      const { container } = render(
        <TestWrapper>
          <Hero 
            heading="Responsive Hero"
            imageURL="/hero-image.jpg"
          />
        </TestWrapper>
      );

      expect(container.querySelector('.hero__grid')).toBeInTheDocument();
      expect(container.querySelector('.hero__column')).toBeInTheDocument();
    });

    it('maintains proper structure for mobile and desktop', () => {
      const { container } = render(
        <TestWrapper>
          <Hero 
            heading="Mobile Friendly"
            text="This hero adapts to different screen sizes."
          />
        </TestWrapper>
      );

      const grid = container.querySelector('.hero__grid');
      const column = container.querySelector('.hero__column');
      
      expect(grid).toBeInTheDocument();
      expect(column).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Hero.displayName).toBe('Hero');
    });
  });
});