import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Images } from './Images';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Images', () => {
  describe('Basic functionality', () => {
    it('renders image with required props', () => {
      render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Test image description"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/test-image.jpg');
      expect(image).toHaveAttribute('alt', 'Test image description');
    });

    it('renders image with caption', () => {
      render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Test image with caption"
            caption="This is a test image caption"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(screen.getByText('This is a test image caption')).toBeInTheDocument();
    });

    it('renders image without caption when not provided', () => {
      const { container } = render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Test image without caption"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      
      const caption = container.querySelector('.nhsuk-image__caption');
      expect(caption).not.toBeInTheDocument();
    });

    it('renders image with responsive attributes', () => {
      render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Responsive test image"
            srcset="/test-image-600w.jpg 600w, /test-image-1200w.jpg 1200w"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('srcset', '/test-image-600w.jpg 600w, /test-image-1200w.jpg 1200w');
      expect(image).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
    });
  });

  describe('Caption content', () => {
    it('renders caption with HTML content', () => {
      render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Image with HTML caption"
            caption="Caption with <strong>bold text</strong> and <em>italic text</em>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('bold text')).toBeInTheDocument();
      expect(screen.getByText('bold text').tagName).toBe('STRONG');
      expect(screen.getByText('italic text')).toBeInTheDocument();
      expect(screen.getByText('italic text').tagName).toBe('EM');
    });

    it('renders caption with link', () => {
      render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Image with link in caption"
            caption='More information available on the <a href="/info">help page</a>'
          />
        </TestWrapper>
      );

      const link = screen.getByRole('link', { name: 'help page' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/info');
    });

    it('renders caption with paragraph content', () => {
      render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Image with paragraph caption"
            caption="<p>First paragraph of caption.</p><p>Second paragraph of caption.</p>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('First paragraph of caption.')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph of caption.')).toBeInTheDocument();
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to image container', () => {
      const { container } = render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Image with custom class"
            classes="custom-image-class"
          />
        </TestWrapper>
      );

      const figure = container.querySelector('figure');
      expect(figure).toHaveClass('nhsuk-image');
      expect(figure).toHaveClass('custom-image-class');
    });

    it('applies custom attributes to image container', () => {
      render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Image with custom attributes"
            attributes={{ 'data-custom': 'value', 'aria-label': 'Custom image' }}
          />
        </TestWrapper>
      );

      const figure = screen.getByRole('figure');
      expect(figure).toHaveAttribute('data-custom', 'value');
      expect(figure).toHaveAttribute('aria-label', 'Custom image');
    });

    it('applies custom attributes to component wrapper', () => {
      render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Test image"
            data-testid="custom-image"
            className="wrapper-class"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-image');
      expect(wrapper).toHaveClass('wrapper-class');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders medical procedure image', () => {
      render(
        <TestWrapper>
          <Images 
            src="/images/blood-pressure-check.jpg"
            alt="Healthcare professional checking patient's blood pressure using a sphygmomanometer"
            caption="Regular blood pressure checks help monitor cardiovascular health"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', "Healthcare professional checking patient's blood pressure using a sphygmomanometer");
      expect(screen.getByText('Regular blood pressure checks help monitor cardiovascular health')).toBeInTheDocument();
    });

    it('renders vaccination campaign image', () => {
      render(
        <TestWrapper>
          <Images 
            src="/images/covid-vaccination.jpg"
            alt="NHS nurse administering COVID-19 vaccine to elderly patient"
            caption="<strong>COVID-19 vaccines are safe and effective</strong> in preventing serious illness and hospitalization"
          />
        </TestWrapper>
      );

      expect(screen.getByText('COVID-19 vaccines are safe and effective')).toBeInTheDocument();
      expect(screen.getByText('COVID-19 vaccines are safe and effective').tagName).toBe('STRONG');
    });

    it('renders health condition information image', () => {
      render(
        <TestWrapper>
          <Images 
            src="/images/skin-condition.jpg"
            alt="Close-up view of eczema on adult forearm showing red, inflamed skin"
            caption="Eczema symptoms can include red, dry, and itchy skin. Consult your GP for proper diagnosis and treatment."
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Close-up view of eczema on adult forearm showing red, inflamed skin');
      expect(screen.getByText(/Eczema symptoms can include red, dry, and itchy skin/)).toBeInTheDocument();
    });

    it('renders hospital facility image', () => {
      render(
        <TestWrapper>
          <Images 
            src="/images/hospital-exterior.jpg"
            alt="Modern NHS hospital building with emergency entrance clearly visible"
            caption='<p>Our Emergency Department is open 24/7.</p><p>For non-urgent care, please <a href="/book-appointment">book an appointment</a> with your GP.</p>'
          />
        </TestWrapper>
      );

      expect(screen.getByText('Our Emergency Department is open 24/7.')).toBeInTheDocument();
      const link = screen.getByRole('link', { name: 'book an appointment' });
      expect(link).toHaveAttribute('href', '/book-appointment');
    });

    it('renders medication information image', () => {
      render(
        <TestWrapper>
          <Images 
            src="/images/prescription-medication.jpg"
            alt="Various prescription medication bottles and pills arranged on a table"
            caption="Always follow your doctor's instructions when taking prescription medication"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Various prescription medication bottles and pills arranged on a table');
      expect(screen.getByText("Always follow your doctor's instructions when taking prescription medication")).toBeInTheDocument();
    });

    it('renders mental health support image', () => {
      render(
        <TestWrapper>
          <Images 
            src="/images/counseling-session.jpg"
            alt="Mental health counselor speaking with patient in comfortable office setting"
            caption='Professional mental health support is available. <a href="/mental-health-services">Find services near you</a>.'
          />
        </TestWrapper>
      );

      expect(screen.getByText(/Professional mental health support is available/)).toBeInTheDocument();
      const link = screen.getByRole('link', { name: 'Find services near you' });
      expect(link).toHaveAttribute('href', '/mental-health-services');
    });

    it('renders preventive care image', () => {
      render(
        <TestWrapper>
          <Images 
            src="/images/health-screening.jpg"
            alt="NHS healthcare professional conducting routine health screening examination"
            caption="<strong>Regular health screenings</strong> can detect problems early when they're easier to treat"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Regular health screenings')).toBeInTheDocument();
      expect(screen.getByText('Regular health screenings').tagName).toBe('STRONG');
    });

    it('renders maternal health image', () => {
      render(
        <TestWrapper>
          <Images 
            src="/images/prenatal-care.jpg"
            alt="Pregnant woman having ultrasound examination with NHS midwife"
            caption="Prenatal care includes regular check-ups throughout pregnancy to monitor both mother and baby's health"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Pregnant woman having ultrasound examination with NHS midwife');
      expect(screen.getByText(/Prenatal care includes regular check-ups/)).toBeInTheDocument();
    });

    it('renders elderly care image', () => {
      render(
        <TestWrapper>
          <Images 
            src="/images/elderly-care.jpg"
            alt="NHS care worker assisting elderly patient with daily activities"
            caption='<p>Home care services support independent living.</p><p>Contact <a href="/social-services">social services</a> for care assessments.</p>'
          />
        </TestWrapper>
      );

      expect(screen.getByText('Home care services support independent living.')).toBeInTheDocument();
      const link = screen.getByRole('link', { name: 'social services' });
      expect(link).toHaveAttribute('href', '/social-services');
    });

    it('renders accessibility services image', () => {
      render(
        <TestWrapper>
          <Images 
            src="/images/wheelchair-access.jpg"
            alt="NHS hospital entrance showing wheelchair accessible ramp and automatic doors"
            caption="All our facilities are wheelchair accessible and equipped with assistive technology"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'NHS hospital entrance showing wheelchair accessible ramp and automatic doors');
      expect(screen.getByText('All our facilities are wheelchair accessible and equipped with assistive technology')).toBeInTheDocument();
    });
  });

  describe('Responsive images', () => {
    it('renders responsive image with multiple sources', () => {
      render(
        <TestWrapper>
          <Images 
            src="/images/health-info-600w.jpg"
            srcset="/images/health-info-600w.jpg 600w, /images/health-info-1200w.jpg 1200w, /images/health-info-1800w.jpg 1800w"
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Health information infographic showing key statistics"
            caption="Key health statistics for our community"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('srcset', '/images/health-info-600w.jpg 600w, /images/health-info-1200w.jpg 1200w, /images/health-info-1800w.jpg 1800w');
      expect(image).toHaveAttribute('sizes', '(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw');
    });

    it('renders image with tablet-specific sizing', () => {
      render(
        <TestWrapper>
          <Images 
            src="/images/treatment-guide.jpg"
            srcset="/images/treatment-guide-480w.jpg 480w, /images/treatment-guide-768w.jpg 768w"
            sizes="(max-width: 768px) 100vw, 66vw"
            alt="Step-by-step treatment guide illustration"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 66vw');
    });

    it('renders image with mobile-first responsive approach', () => {
      render(
        <TestWrapper>
          <Images 
            src="/images/appointment-booking.jpg"
            srcset="/images/appointment-booking-320w.jpg 320w, /images/appointment-booking-640w.jpg 640w, /images/appointment-booking-960w.jpg 960w"
            sizes="(max-width: 320px) 100vw, (max-width: 640px) 90vw, 80vw"
            alt="Online appointment booking system interface"
            caption="Book appointments online 24/7 through our patient portal"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('sizes', '(max-width: 320px) 100vw, (max-width: 640px) 90vw, 80vw');
      expect(screen.getByText('Book appointments online 24/7 through our patient portal')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses proper semantic markup with figure element', () => {
      const { container } = render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Accessible test image"
          />
        </TestWrapper>
      );

      const figure = container.querySelector('figure');
      expect(figure).toBeInTheDocument();
      expect(figure?.tagName).toBe('FIGURE');
    });

    it('provides proper alt text for screen readers', () => {
      render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Detailed description for screen reader users"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Detailed description for screen reader users');
    });

    it('associates caption with image using figcaption', () => {
      const { container } = render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Image with accessible caption"
            caption="Caption text that describes the image"
          />
        </TestWrapper>
      );

      const figcaption = container.querySelector('figcaption');
      expect(figcaption).toBeInTheDocument();
      expect(figcaption?.tagName).toBe('FIGCAPTION');
      expect(figcaption).toHaveClass('nhsuk-image__caption');
    });

    it('supports custom ARIA attributes', () => {
      render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Image with ARIA attributes"
            attributes={{ 'aria-describedby': 'image-description', 'role': 'img' }}
          />
        </TestWrapper>
      );

      const figure = screen.getByRole('img', { name: '' });
      expect(figure).toHaveAttribute('aria-describedby', 'image-description');
      expect(figure).toHaveAttribute('role', 'img');
    });
  });

  describe('Image properties', () => {
    it('applies correct CSS classes', () => {
      const { container } = render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Image with CSS classes"
          />
        </TestWrapper>
      );

      const figure = container.querySelector('figure');
      const image = container.querySelector('img');
      
      expect(figure).toHaveClass('nhsuk-image');
      expect(image).toHaveClass('nhsuk-image__img');
    });

    it('handles missing srcset gracefully', () => {
      render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Image without srcset"
            sizes="100vw"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('sizes', '100vw');
      expect(image).not.toHaveAttribute('srcset');
    });

    it('handles missing sizes gracefully', () => {
      render(
        <TestWrapper>
          <Images 
            src="/test-image.jpg"
            alt="Image without sizes"
            srcset="/test-image-600w.jpg 600w, /test-image-1200w.jpg 1200w"
          />
        </TestWrapper>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('srcset', '/test-image-600w.jpg 600w, /test-image-1200w.jpg 1200w');
      expect(image).not.toHaveAttribute('sizes');
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Images.displayName).toBe('Images');
    });
  });
});