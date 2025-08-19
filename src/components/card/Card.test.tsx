import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Card } from './Card';
import type { CardType, HeadingLevel } from './Card';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Card', () => {
  describe('Basic functionality', () => {
    it('renders card with heading', () => {
      render(
        <TestWrapper>
          <Card heading="Test card heading" />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { name: 'Test card heading' });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2'); // Default heading level
    });

    it('renders card with description', () => {
      render(
        <TestWrapper>
          <Card 
            heading="Test heading" 
            description="Test description content"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Test description content')).toBeInTheDocument();
    });

    it('renders card with HTML content', () => {
      render(
        <TestWrapper>
          <Card 
            heading="Test heading"
            descriptionHtml="<p><strong>Bold</strong> description</p>"
          />
        </TestWrapper>
      );

      const bold = screen.getByText('Bold');
      expect(bold.tagName).toBe('STRONG');
      expect(screen.getByText('description')).toBeInTheDocument();
    });

    it('prioritizes HTML content over text', () => {
      render(
        <TestWrapper>
          <Card 
            heading="Text heading"
            headingHtml="<em>HTML heading</em>"
            description="Text description"
            descriptionHtml="<p>HTML description</p>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('HTML heading')).toBeInTheDocument();
      expect(screen.queryByText('Text heading')).not.toBeInTheDocument();
      expect(screen.getByText('HTML description')).toBeInTheDocument();
      expect(screen.queryByText('Text description')).not.toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <TestWrapper>
          <Card heading="Test heading">
            <div>Custom children content</div>
          </Card>
        </TestWrapper>
      );

      expect(screen.getByText('Custom children content')).toBeInTheDocument();
    });
  });

  describe('Heading levels', () => {
    const headingLevels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];

    headingLevels.forEach((level) => {
      it(`renders h${level} when headingLevel is ${level}`, () => {
        render(
          <TestWrapper>
            <Card heading="Test heading" headingLevel={level} />
          </TestWrapper>
        );

        const heading = screen.getByRole('heading', { name: 'Test heading' });
        expect(heading.tagName).toBe(`H${level}`);
      });
    });
  });

  describe('Card with image', () => {
    it('renders card with image', () => {
      render(
        <TestWrapper>
          <Card 
            heading="Card with image"
            imgURL="https://example.com/image.jpg"
            imgALT="Example image"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
      expect(image).toHaveAttribute('alt', 'Example image');
    });

    it('renders image with empty alt when imgALT not provided', () => {
      const { container } = render(
        <TestWrapper>
          <Card 
            heading="Card with image"
            imgURL="https://example.com/image.jpg"
          />
        </TestWrapper>
      );

      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', '');
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    });
  });

  describe('Clickable cards', () => {
    it('renders clickable card with link', () => {
      render(
        <TestWrapper>
          <Card 
            heading="Clickable card"
            href="/test-link"
            clickable
          />
        </TestWrapper>
      );

      const link = screen.getByRole('link', { name: 'Clickable card' });
      expect(link).toHaveAttribute('href', '/test-link');
    });

    it('handles click events for clickable cards', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <TestWrapper>
          <Card 
            heading="Clickable card"
            clickable
            onClick={handleClick}
          />
        </TestWrapper>
      );

      const card = container.firstChild as HTMLElement;
      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('navigates to href when clickable card is clicked without onClick', () => {
      // Mock window.location.href
      delete (window as any).location;
      window.location = { href: '' } as any;

      const { container } = render(
        <TestWrapper>
          <Card 
            heading="Clickable card"
            href="/test-link"
            clickable
          />
        </TestWrapper>
      );

      const card = container.firstChild as HTMLElement;
      fireEvent.click(card);
      expect(window.location.href).toBe('/test-link');
    });
  });

  describe('Care cards', () => {
    const careCardTypes: CardType[] = ['non-urgent', 'urgent', 'emergency'];

    careCardTypes.forEach((type) => {
      it(`renders ${type} care card`, () => {
        render(
          <TestWrapper>
            <Card 
              heading="Care advice"
              type={type}
              description="Medical advice content"
            />
          </TestWrapper>
        );

        const heading = screen.getByRole('heading', { name: /Care advice/ });
        expect(heading).toBeInTheDocument();
        
        // Check for visually hidden prefix
        const prefix = type === 'non-urgent' ? 'Non-urgent advice:' :
                     type === 'urgent' ? 'Urgent advice:' :
                     'Immediate action required:';
        expect(screen.getByText(prefix)).toBeInTheDocument();
      });
    });

    it('includes visually hidden text for screen readers', () => {
      render(
        <TestWrapper>
          <Card 
            heading="Urgent care advice"
            type="urgent"
          />
        </TestWrapper>
      );

      const hiddenText = screen.getByText('Urgent advice:');
      expect(hiddenText).toBeInTheDocument();
      // The text should be visually hidden but accessible to screen readers
    });
  });

  describe('Card variants', () => {
    it('renders feature card', () => {
      render(
        <TestWrapper>
          <Card 
            heading="Feature card"
            feature
            description="Feature description"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Feature card')).toBeInTheDocument();
    });

    it('renders primary card with chevron icon', () => {
      const { container } = render(
        <TestWrapper>
          <Card 
            heading="Primary card"
            primary
            description="Primary description"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Primary card')).toBeInTheDocument();
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders secondary card', () => {
      render(
        <TestWrapper>
          <Card 
            heading="Secondary card"
            secondary
            description="Secondary description"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Secondary card')).toBeInTheDocument();
    });

    it('renders top task card', () => {
      render(
        <TestWrapper>
          <Card 
            heading="Top task"
            topTask
            headingLevel={5}
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { name: 'Top task' });
      expect(heading.tagName).toBe('H5');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(
        <TestWrapper>
          <Card heading="Accessible card" headingLevel={3} />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });

    it('includes role="text" for care card headings', () => {
      render(
        <TestWrapper>
          <Card heading="Care card" type="urgent" />
        </TestWrapper>
      );

      const textRole = screen.getByRole('text');
      expect(textRole).toBeInTheDocument();
    });

    it('has aria-hidden on decorative elements', () => {
      const { container } = render(
        <TestWrapper>
          <Card heading="Card with icon" primary />
        </TestWrapper>
      );

      const icon = container.querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveAttribute('focusable', 'false');
    });

    it('includes proper focus management for links', () => {
      render(
        <TestWrapper>
          <Card 
            heading="Card with link"
            href="/test"
            description="Click to navigate"
          />
        </TestWrapper>
      );

      const link = screen.getByRole('link', { name: 'Card with link' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
      
      // Check that the link is focusable (has href attribute)
      expect(link).toHaveAttribute('href');
    });
  });

  describe('Custom attributes', () => {
    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <Card 
            heading="Custom card"
            data-testid="custom-card"
            className="custom-class"
            id="card-id"
          />
        </TestWrapper>
      );

      const card = screen.getByTestId('custom-card');
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveAttribute('id', 'card-id');
    });

    it('applies custom heading classes', () => {
      render(
        <TestWrapper>
          <Card 
            heading="Custom heading"
            headingClasses="custom-heading-class"
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { name: 'Custom heading' });
      expect(heading).toHaveClass('custom-heading-class');
    });
  });

  describe('Edge cases', () => {
    it('renders without heading', () => {
      const { container } = render(
        <TestWrapper>
          <Card description="Card without heading" />
        </TestWrapper>
      );

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('Card without heading')).toBeInTheDocument();
    });

    it('renders without content', () => {
      const { container } = render(
        <TestWrapper>
          <Card heading="Card without content" />
        </TestWrapper>
      );

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('Card without content')).toBeInTheDocument();
    });

    it('handles empty strings gracefully', () => {
      render(
        <TestWrapper>
          <Card 
            heading=""
            description=""
          />
        </TestWrapper>
      );

      // Should render without errors
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('does not render chevron for feature cards with links', () => {
      const { container } = render(
        <TestWrapper>
          <Card 
            heading="Feature with link"
            href="/test"
            feature
          />
        </TestWrapper>
      );

      // Should not render chevron icon for feature cards
      const icon = container.querySelector('svg');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Card.displayName).toBe('Card');
    });
  });
});