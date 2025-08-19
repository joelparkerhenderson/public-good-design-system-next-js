import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { DoDontList } from './DoDontList';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('DoDontList', () => {
  const doItems = [
    { item: 'wash your hands regularly' },
    { item: 'get plenty of rest' },
    { item: 'drink lots of fluids' }
  ];

  const dontItems = [
    { item: 'smoke' },
    { item: 'drink alcohol excessively' },
    { item: 'ignore symptoms' }
  ];

  describe('Basic functionality', () => {
    it('renders do list with title and items', () => {
      render(
        <TestWrapper>
          <DoDontList
            title="Do"
            type="do"
            items={doItems}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Do')).toBeInTheDocument();
      expect(screen.getByText('wash your hands regularly')).toBeInTheDocument();
      expect(screen.getByText('get plenty of rest')).toBeInTheDocument();
      expect(screen.getByText('drink lots of fluids')).toBeInTheDocument();
    });

    it('renders dont list with title and items', () => {
      render(
        <TestWrapper>
          <DoDontList
            title="Don't"
            type="dont"
            items={dontItems}
          />
        </TestWrapper>
      );

      expect(screen.getByText("Don't")).toBeInTheDocument();
      expect(screen.getByText('do not smoke')).toBeInTheDocument();
      expect(screen.getByText('do not drink alcohol excessively')).toBeInTheDocument();
      expect(screen.getByText('do not ignore symptoms')).toBeInTheDocument();
    });

    it('renders list with proper semantic structure', () => {
      render(
        <TestWrapper>
          <DoDontList
            title="Do"
            type="do"
            items={doItems}
          />
        </TestWrapper>
      );

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });
  });

  describe('Heading levels', () => {
    it('uses h3 as default heading level', () => {
      const { container } = render(
        <TestWrapper>
          <DoDontList
            title="Default heading"
            type="do"
            items={doItems}
          />
        </TestWrapper>
      );

      const heading = container.querySelector('h3');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Default heading');
    });

    it('uses custom heading level when specified', () => {
      const { container } = render(
        <TestWrapper>
          <DoDontList
            title="Custom heading"
            type="do"
            items={doItems}
            headingLevel={2}
          />
        </TestWrapper>
      );

      const heading = container.querySelector('h2');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Custom heading');
    });

    it('supports all heading levels 1-6', () => {
      const headingLevels = [1, 2, 3, 4, 5, 6] as const;
      
      headingLevels.forEach(level => {
        const { container } = render(
          <TestWrapper>
            <DoDontList
              title={`Heading ${level}`}
              type="do"
              items={[{ item: 'test item' }]}
              headingLevel={level}
            />
          </TestWrapper>
        );

        const heading = container.querySelector(`h${level}`);
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(`Heading ${level}`);
      });
    });
  });

  describe('List types and icons', () => {
    it('renders tick icons for do lists', () => {
      const { container } = render(
        <TestWrapper>
          <DoDontList
            title="Do"
            type="do"
            items={doItems}
          />
        </TestWrapper>
      );

      const tickIcons = container.querySelectorAll('svg');
      expect(tickIcons).toHaveLength(3);
      
      // Check for tick icon paths
      tickIcons.forEach(icon => {
        const tickPath = icon.querySelector('path[stroke="#007f3b"]');
        expect(tickPath).toBeInTheDocument();
      });
    });

    it('renders cross icons for dont lists', () => {
      const { container } = render(
        <TestWrapper>
          <DoDontList
            title="Don't"
            type="dont"
            items={dontItems}
          />
        </TestWrapper>
      );

      const crossIcons = container.querySelectorAll('svg');
      expect(crossIcons).toHaveLength(3);
      
      // Check for cross icon paths
      crossIcons.forEach(icon => {
        const crossPaths = icon.querySelectorAll('path[fill="#d5281b"]');
        expect(crossPaths).toHaveLength(2); // Cross icon has 2 paths
      });
    });

    it('applies correct CSS classes for list types', () => {
      const { container: doContainer } = render(
        <TestWrapper>
          <DoDontList
            title="Do"
            type="do"
            items={doItems}
          />
        </TestWrapper>
      );

      const { container: dontContainer } = render(
        <TestWrapper>
          <DoDontList
            title="Don't"
            type="dont"
            items={dontItems}
          />
        </TestWrapper>
      );

      const doList = doContainer.querySelector('.do-dont-list__list--tick');
      expect(doList).toBeInTheDocument();

      const dontList = dontContainer.querySelector('.do-dont-list__list--cross');
      expect(dontList).toBeInTheDocument();
    });
  });

  describe('Prefix handling', () => {
    it('adds "do not" prefix to dont items by default', () => {
      render(
        <TestWrapper>
          <DoDontList
            title="Don't"
            type="dont"
            items={[{ item: 'smoke' }, { item: 'drink alcohol' }]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('do not smoke')).toBeInTheDocument();
      expect(screen.getByText('do not drink alcohol')).toBeInTheDocument();
    });

    it('hides "do not" prefix when hidePrefix is true', () => {
      render(
        <TestWrapper>
          <DoDontList
            title="Avoid"
            type="dont"
            items={[{ item: 'strenuous exercise' }, { item: 'heavy lifting' }]}
            hidePrefix={true}
          />
        </TestWrapper>
      );

      expect(screen.getByText('strenuous exercise')).toBeInTheDocument();
      expect(screen.getByText('heavy lifting')).toBeInTheDocument();
      expect(screen.queryByText('do not strenuous exercise')).not.toBeInTheDocument();
    });

    it('does not add prefix to do items', () => {
      render(
        <TestWrapper>
          <DoDontList
            title="Do"
            type="do"
            items={[{ item: 'wash hands' }]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('wash hands')).toBeInTheDocument();
      expect(screen.queryByText('do not wash hands')).not.toBeInTheDocument();
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes', () => {
      const { container } = render(
        <TestWrapper>
          <DoDontList
            title="Do"
            type="do"
            items={doItems}
            classes="custom-do-dont"
          />
        </TestWrapper>
      );

      const doDontElement = container.querySelector('.do-dont-list');
      expect(doDontElement).toHaveClass('custom-do-dont');
    });

    it('applies custom attributes', () => {
      render(
        <TestWrapper>
          <DoDontList
            title="Do"
            type="do"
            items={doItems}
            attributes={{ 'data-custom': 'value' }}
          />
        </TestWrapper>
      );

      const doDontElement = screen.getByText('Do').closest('.do-dont-list');
      expect(doDontElement).toHaveAttribute('data-custom', 'value');
    });

    it('applies custom attributes to component wrapper', () => {
      render(
        <TestWrapper>
          <DoDontList
            title="Do"
            type="do"
            items={doItems}
            data-testid="custom-do-dont"
            className="wrapper-class"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-do-dont');
      expect(wrapper).toHaveClass('wrapper-class');
    });
  });

  describe('Content rendering', () => {
    it('renders empty list gracefully', () => {
      render(
        <TestWrapper>
          <DoDontList
            title="Empty list"
            type="do"
            items={[]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Empty list')).toBeInTheDocument();
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      expect(list.children).toHaveLength(0);
    });

    it('renders single item correctly', () => {
      render(
        <TestWrapper>
          <DoDontList
            title="Single item"
            type="do"
            items={[{ item: 'one thing to do' }]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('one thing to do')).toBeInTheDocument();
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(1);
    });

    it('renders multiple items in correct order', () => {
      const orderedItems = [
        { item: 'first item' },
        { item: 'second item' },
        { item: 'third item' }
      ];

      render(
        <TestWrapper>
          <DoDontList
            title="Ordered list"
            type="do"
            items={orderedItems}
          />
        </TestWrapper>
      );

      const listItems = screen.getAllByRole('listitem');
      expect(listItems[0]).toHaveTextContent('first item');
      expect(listItems[1]).toHaveTextContent('second item');
      expect(listItems[2]).toHaveTextContent('third item');
    });

    it('handles special characters in items', () => {
      render(
        <TestWrapper>
          <DoDontList
            title="Special characters"
            type="do"
            items={[
              { item: "use apostrophes' correctly" },
              { item: 'handle "quotes" properly' },
              { item: 'support émojis & symbols!' }
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText("use apostrophes' correctly")).toBeInTheDocument();
      expect(screen.getByText('handle "quotes" properly')).toBeInTheDocument();
      expect(screen.getByText('support émojis & symbols!')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides proper list semantics', () => {
      render(
        <TestWrapper>
          <DoDontList
            title="Accessible list"
            type="do"
            items={doItems}
          />
        </TestWrapper>
      );

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });

    it('icons have aria-hidden attribute', () => {
      const { container } = render(
        <TestWrapper>
          <DoDontList
            title="Icons test"
            type="do"
            items={[{ item: 'test item' }]}
          />
        </TestWrapper>
      );

      const icon = container.querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('has proper heading structure', () => {
      render(
        <TestWrapper>
          <DoDontList
            title="Heading test"
            type="do"
            items={doItems}
            headingLevel={2}
          />
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Heading test');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders medical do list correctly', () => {
      const medicalDoItems = [
        { item: 'take medication as prescribed' },
        { item: 'attend all follow-up appointments' },
        { item: 'report any side effects immediately' }
      ];

      render(
        <TestWrapper>
          <DoDontList
            title="After your treatment"
            type="do"
            items={medicalDoItems}
          />
        </TestWrapper>
      );

      expect(screen.getByText('After your treatment')).toBeInTheDocument();
      expect(screen.getByText('take medication as prescribed')).toBeInTheDocument();
      expect(screen.getByText('attend all follow-up appointments')).toBeInTheDocument();
      expect(screen.getByText('report any side effects immediately')).toBeInTheDocument();
    });

    it('renders medical dont list with proper warnings', () => {
      const medicalDontItems = [
        { item: 'drive or operate machinery' },
        { item: 'drink alcohol while taking this medication' },
        { item: 'stop taking medication without consulting your doctor' }
      ];

      render(
        <TestWrapper>
          <DoDontList
            title="Important warnings"
            type="dont"
            items={medicalDontItems}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Important warnings')).toBeInTheDocument();
      expect(screen.getByText('do not drive or operate machinery')).toBeInTheDocument();
      expect(screen.getByText('do not drink alcohol while taking this medication')).toBeInTheDocument();
      expect(screen.getByText('do not stop taking medication without consulting your doctor')).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(DoDontList.displayName).toBe('DoDontList');
    });
  });
});