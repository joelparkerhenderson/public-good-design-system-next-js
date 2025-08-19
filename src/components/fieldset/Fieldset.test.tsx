import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Fieldset } from './Fieldset';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Fieldset', () => {
  describe('Basic functionality', () => {
    it('renders fieldset with legend', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ text: "Personal information" }}>
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      expect(screen.getByText('Personal information')).toBeInTheDocument();
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('renders fieldset without legend', () => {
      render(
        <TestWrapper>
          <Fieldset>
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(screen.queryByRole('group')).toBeInTheDocument();
    });

    it('renders with children content', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ text: "Contact details" }}>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
          </Fieldset>
        </TestWrapper>
      );

      expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    });
  });

  describe('Legend variants', () => {
    it('renders legend with HTML content', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ html: "<strong>Contact</strong> details" }}>
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByText('details')).toBeInTheDocument();
      const strong = screen.getByText('Contact');
      expect(strong.tagName).toBe('STRONG');
    });

    it('prioritizes html over text in legend', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ 
            text: "Text legend",
            html: "<em>HTML legend</em>"
          }}>
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      expect(screen.getByText('HTML legend')).toBeInTheDocument();
      expect(screen.queryByText('Text legend')).not.toBeInTheDocument();
    });

    it('renders legend as page heading when isPageHeading is true', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ 
            text: "Page heading legend",
            isPageHeading: true 
          }}>
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Page heading legend');
    });

    it('renders regular legend when isPageHeading is false', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ 
            text: "Regular legend",
            isPageHeading: false 
          }}>
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      expect(screen.getByText('Regular legend')).toBeInTheDocument();
      expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    });
  });

  describe('Legend sizes', () => {
    const sizes = ['xl', 'l', 'm', 's'] as const;

    sizes.forEach(size => {
      it(`applies ${size} size styling`, () => {
        const { container } = render(
          <TestWrapper>
            <Fieldset legend={{ 
              text: `${size.toUpperCase()} legend`,
              size: size 
            }}>
              <input type="text" />
            </Fieldset>
          </TestWrapper>
        );

        const legend = container.querySelector('.fieldset__legend');
        expect(legend).toHaveClass(`fieldset__legend--${size}`);
      });
    });

    it('handles default size when no size specified', () => {
      const { container } = render(
        <TestWrapper>
          <Fieldset legend={{ text: "Default legend" }}>
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      const legend = container.querySelector('.fieldset__legend');
      expect(legend).toHaveClass('fieldset__legend');
      expect(legend).not.toHaveClass('fieldset__legend--xl');
      expect(legend).not.toHaveClass('fieldset__legend--l');
      expect(legend).not.toHaveClass('fieldset__legend--m');
      expect(legend).not.toHaveClass('fieldset__legend--s');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic fieldset element', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ text: "Accessible fieldset" }}>
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset.tagName).toBe('FIELDSET');
    });

    it('applies aria-describedby when provided', () => {
      render(
        <TestWrapper>
          <Fieldset 
            legend={{ text: "Fieldset with description" }}
            describedBy="description-id"
          >
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset).toHaveAttribute('aria-describedby', 'description-id');
    });

    it('does not apply aria-describedby when not provided', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ text: "Regular fieldset" }}>
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset).not.toHaveAttribute('aria-describedby');
    });

    it('properly associates legend with fieldset', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ text: "Associated legend" }}>
            <input type="text" aria-label="test input" />
          </Fieldset>
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      const legend = screen.getByText('Associated legend');
      expect(fieldset).toContainElement(legend);
      expect(legend.tagName).toBe('LEGEND');
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to fieldset', () => {
      const { container } = render(
        <TestWrapper>
          <Fieldset 
            legend={{ text: "Custom fieldset" }}
            classes="custom-fieldset"
          >
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      const fieldset = container.querySelector('.fieldset');
      expect(fieldset).toHaveClass('custom-fieldset');
    });

    it('applies custom classes to legend', () => {
      const { container } = render(
        <TestWrapper>
          <Fieldset legend={{ 
            text: "Custom legend",
            classes: "custom-legend-class"
          }}>
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      const legend = container.querySelector('.fieldset__legend');
      expect(legend).toHaveClass('custom-legend-class');
    });

    it('applies custom attributes to fieldset', () => {
      render(
        <TestWrapper>
          <Fieldset 
            legend={{ text: "Fieldset with attributes" }}
            attributes={{ 'data-custom': 'value', 'role': 'group' }}
          >
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset).toHaveAttribute('data-custom', 'value');
    });

    it('applies custom attributes to component wrapper', () => {
      render(
        <TestWrapper>
          <Fieldset 
            legend={{ text: "Test fieldset" }}
            data-testid="custom-fieldset"
            className="wrapper-class"
          >
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-fieldset');
      expect(wrapper).toHaveClass('wrapper-class');
    });
  });

  describe('Form integration', () => {
    it('groups form elements semantically', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ text: "Address information" }}>
            <div>
              <label htmlFor="address1">Address line 1</label>
              <input id="address1" type="text" />
            </div>
            <div>
              <label htmlFor="address2">Address line 2</label>
              <input id="address2" type="text" />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input id="city" type="text" />
            </div>
          </Fieldset>
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset).toContainElement(screen.getByLabelText('Address line 1'));
      expect(fieldset).toContainElement(screen.getByLabelText('Address line 2'));
      expect(fieldset).toContainElement(screen.getByLabelText('City'));
    });

    it('works with radio button groups', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ text: "Choose your preferred contact method" }}>
            <div>
              <input type="radio" id="email" name="contact" value="email" />
              <label htmlFor="email">Email</label>
            </div>
            <div>
              <input type="radio" id="phone" name="contact" value="phone" />
              <label htmlFor="phone">Phone</label>
            </div>
            <div>
              <input type="radio" id="post" name="contact" value="post" />
              <label htmlFor="post">Post</label>
            </div>
          </Fieldset>
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      const radioButtons = screen.getAllByRole('radio');
      
      expect(fieldset).toContainElement(radioButtons[0]);
      expect(fieldset).toContainElement(radioButtons[1]);
      expect(fieldset).toContainElement(radioButtons[2]);
      expect(radioButtons).toHaveLength(3);
    });

    it('works with checkbox groups', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ text: "Select all that apply" }}>
            <div>
              <input type="checkbox" id="checkbox1" name="options" value="option1" />
              <label htmlFor="checkbox1">Option 1</label>
            </div>
            <div>
              <input type="checkbox" id="checkbox2" name="options" value="option2" />
              <label htmlFor="checkbox2">Option 2</label>
            </div>
          </Fieldset>
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      const checkboxes = screen.getAllByRole('checkbox');
      
      expect(fieldset).toContainElement(checkboxes[0]);
      expect(fieldset).toContainElement(checkboxes[1]);
    });
  });

  describe('Healthcare use cases', () => {
    it('renders patient information fieldset', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ 
            text: "Patient Information",
            size: "l",
            isPageHeading: true 
          }}>
            <div>
              <label htmlFor="nhs-number">NHS Number</label>
              <input id="nhs-number" type="text" />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth</label>
              <input id="dob" type="date" />
            </div>
          </Fieldset>
        </TestWrapper>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Patient Information');
      expect(screen.getByLabelText('NHS Number')).toBeInTheDocument();
      expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
    });

    it('renders medical history fieldset', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ 
            html: "Medical <strong>History</strong>",
            size: "m"
          }}>
            <div>
              <input type="checkbox" id="diabetes" />
              <label htmlFor="diabetes">Diabetes</label>
            </div>
            <div>
              <input type="checkbox" id="hypertension" />
              <label htmlFor="hypertension">High Blood Pressure</label>
            </div>
          </Fieldset>
        </TestWrapper>
      );

      expect(screen.getByText('History')).toBeInTheDocument();
      expect(screen.getByLabelText('Diabetes')).toBeInTheDocument();
      expect(screen.getByLabelText('High Blood Pressure')).toBeInTheDocument();
    });

    it('renders appointment preferences fieldset', () => {
      render(
        <TestWrapper>
          <Fieldset 
            legend={{ text: "Appointment Preferences", size: "s" }}
            describedBy="appointment-hint"
          >
            <div id="appointment-hint">
              Select your preferred appointment type
            </div>
            <div>
              <input type="radio" id="in-person" name="appointment-type" />
              <label htmlFor="in-person">In-person consultation</label>
            </div>
            <div>
              <input type="radio" id="video" name="appointment-type" />
              <label htmlFor="video">Video consultation</label>
            </div>
            <div>
              <input type="radio" id="phone" name="appointment-type" />
              <label htmlFor="phone">Phone consultation</label>
            </div>
          </Fieldset>
        </TestWrapper>
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset).toHaveAttribute('aria-describedby', 'appointment-hint');
      expect(screen.getByText('Select your preferred appointment type')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('handles empty legend object', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{}}>
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(screen.queryByRole('legend')).not.toBeInTheDocument();
    });

    it('handles missing legend', () => {
      render(
        <TestWrapper>
          <Fieldset>
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(screen.queryByRole('legend')).not.toBeInTheDocument();
    });

    it('handles empty children', () => {
      render(
        <TestWrapper>
          <Fieldset legend={{ text: "Empty fieldset" }}>
          </Fieldset>
        </TestWrapper>
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(screen.getByText('Empty fieldset')).toBeInTheDocument();
    });

    it('combines legend size and custom classes', () => {
      const { container } = render(
        <TestWrapper>
          <Fieldset legend={{ 
            text: "Combined classes",
            size: "xl",
            classes: "custom-legend"
          }}>
            <input type="text" />
          </Fieldset>
        </TestWrapper>
      );

      const legend = container.querySelector('.fieldset__legend');
      expect(legend).toHaveClass('fieldset__legend--xl');
      expect(legend).toHaveClass('custom-legend');
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Fieldset.displayName).toBe('Fieldset');
    });
  });
});