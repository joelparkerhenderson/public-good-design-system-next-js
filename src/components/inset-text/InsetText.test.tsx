import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { InsetText } from './InsetText';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('InsetText', () => {
  describe('Basic functionality', () => {
    it('renders inset text with text content', () => {
      render(
        <TestWrapper>
          <InsetText text="This is important information that stands out." />
        </TestWrapper>
      );

      expect(screen.getByText('This is important information that stands out.')).toBeInTheDocument();
    });

    it('renders inset text with HTML content', () => {
      render(
        <TestWrapper>
          <InsetText html="Important information with <strong>bold text</strong>." />
        </TestWrapper>
      );

      expect(screen.getByText('bold text')).toBeInTheDocument();
      expect(screen.getByText('bold text').tagName).toBe('STRONG');
    });

    it('renders inset text with React children', () => {
      render(
        <TestWrapper>
          <InsetText>
            <p>First paragraph of important information.</p>
            <p>Second paragraph with <em>emphasis</em>.</p>
          </InsetText>
        </TestWrapper>
      );

      expect(screen.getByText('First paragraph of important information.')).toBeInTheDocument();
      expect(screen.getByText('emphasis')).toBeInTheDocument();
      expect(screen.getByText('emphasis').tagName).toBe('EM');
    });

    it('includes visually hidden "Information:" text for screen readers', () => {
      render(
        <TestWrapper>
          <InsetText text="Important information" />
        </TestWrapper>
      );

      const hiddenText = screen.getByText('Information:');
      expect(hiddenText).toBeInTheDocument();
      expect(hiddenText).toHaveClass('nhsuk-u-visually-hidden');
    });
  });

  describe('Content priority', () => {
    it('prioritizes children over HTML and text', () => {
      render(
        <TestWrapper>
          <InsetText 
            text="Text content that should be ignored"
            html="<p>HTML content that should be ignored</p>"
          >
            <span>Children content takes priority</span>
          </InsetText>
        </TestWrapper>
      );

      expect(screen.getByText('Children content takes priority')).toBeInTheDocument();
      expect(screen.queryByText('Text content that should be ignored')).not.toBeInTheDocument();
      expect(screen.queryByText('HTML content that should be ignored')).not.toBeInTheDocument();
    });

    it('prioritizes HTML over text when no children provided', () => {
      render(
        <TestWrapper>
          <InsetText 
            text="Text content that should be ignored"
            html="<em>HTML content takes priority</em>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('HTML content takes priority')).toBeInTheDocument();
      expect(screen.getByText('HTML content takes priority').tagName).toBe('EM');
      expect(screen.queryByText('Text content that should be ignored')).not.toBeInTheDocument();
    });

    it('uses text when no children or HTML provided', () => {
      render(
        <TestWrapper>
          <InsetText text="Text content should be displayed" />
        </TestWrapper>
      );

      expect(screen.getByText('Text content should be displayed')).toBeInTheDocument();
    });
  });

  describe('Empty states', () => {
    it('renders empty inset text when no content provided', () => {
      const { container } = render(
        <TestWrapper>
          <InsetText />
        </TestWrapper>
      );

      const insetText = container.querySelector('.nhsuk-inset-text');
      expect(insetText).toBeInTheDocument();
      
      // Should only contain the visually hidden text
      const hiddenText = screen.getByText('Information:');
      expect(hiddenText).toBeInTheDocument();
    });

    it('renders empty inset text when all content props are empty', () => {
      const { container } = render(
        <TestWrapper>
          <InsetText text="" html="" />
        </TestWrapper>
      );

      const insetText = container.querySelector('.nhsuk-inset-text');
      expect(insetText).toBeInTheDocument();
    });
  });

  describe('Custom attributes and classes', () => {
    it('applies custom classes to inset text', () => {
      const { container } = render(
        <TestWrapper>
          <InsetText 
            text="Inset text with custom class"
            classes="custom-inset-class"
          />
        </TestWrapper>
      );

      const insetText = container.querySelector('.nhsuk-inset-text');
      expect(insetText).toHaveClass('nhsuk-inset-text');
      expect(insetText).toHaveClass('custom-inset-class');
    });

    it('applies custom attributes to inset text', () => {
      render(
        <TestWrapper>
          <InsetText 
            text="Inset text with custom attributes"
            attributes={{ 'data-custom': 'value', 'aria-label': 'Custom inset text' }}
          />
        </TestWrapper>
      );

      const insetText = screen.getByLabelText('Custom inset text');
      expect(insetText).toHaveAttribute('data-custom', 'value');
    });

    it('applies custom attributes to component wrapper', () => {
      render(
        <TestWrapper>
          <InsetText 
            text="Test inset text"
            data-testid="custom-inset-text"
            className="wrapper-class"
          />
        </TestWrapper>
      );

      const wrapper = screen.getByTestId('custom-inset-text');
      expect(wrapper).toHaveClass('wrapper-class');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders medication side effects warning', () => {
      render(
        <TestWrapper>
          <InsetText 
            html="You can report any suspected side effects to the <a href='https://yellowcard.mhra.gov.uk/'>UK safety scheme</a>."
          />
        </TestWrapper>
      );

      expect(screen.getByText(/You can report any suspected side effects/)).toBeInTheDocument();
      const link = screen.getByRole('link', { name: 'UK safety scheme' });
      expect(link).toHaveAttribute('href', 'https://yellowcard.mhra.gov.uk/');
    });

    it('renders emergency contact information', () => {
      render(
        <TestWrapper>
          <InsetText>
            <p><strong>Emergency:</strong> Call 999 if you have severe chest pain or difficulty breathing.</p>
            <p><strong>Urgent:</strong> Call 111 for urgent but non-life-threatening symptoms.</p>
          </InsetText>
        </TestWrapper>
      );

      expect(screen.getByText('Emergency:')).toBeInTheDocument();
      expect(screen.getByText(/Call 999 if you have/)).toBeInTheDocument();
      expect(screen.getByText('Urgent:')).toBeInTheDocument();
      expect(screen.getByText(/Call 111 for urgent/)).toBeInTheDocument();
    });

    it('renders appointment preparation instructions', () => {
      render(
        <TestWrapper>
          <InsetText 
            html="<strong>Bring with you:</strong> Your NHS card, a list of current medications, and any recent test results."
          />
        </TestWrapper>
      );

      expect(screen.getByText('Bring with you:')).toBeInTheDocument();
      expect(screen.getByText('Bring with you:').tagName).toBe('STRONG');
      expect(screen.getByText(/NHS card, a list of current medications/)).toBeInTheDocument();
    });

    it('renders prescription information', () => {
      render(
        <TestWrapper>
          <InsetText text="Most prescriptions cost £9.65. You may be able to get free prescriptions if you're eligible." />
        </TestWrapper>
      );

      expect(screen.getByText(/Most prescriptions cost £9.65/)).toBeInTheDocument();
    });

    it('renders vaccination eligibility notice', () => {
      render(
        <TestWrapper>
          <InsetText>
            <p>You're eligible for a free flu vaccination if you:</p>
            <ul>
              <li>Are 65 or over</li>
              <li>Have a long-term health condition</li>
              <li>Are pregnant</li>
              <li>Are a carer</li>
            </ul>
          </InsetText>
        </TestWrapper>
      );

      expect(screen.getByText("You're eligible for a free flu vaccination if you:")).toBeInTheDocument();
      expect(screen.getByText('Are 65 or over')).toBeInTheDocument();
      expect(screen.getByText('Have a long-term health condition')).toBeInTheDocument();
    });

    it('renders test results information', () => {
      render(
        <TestWrapper>
          <InsetText 
            html="Test results are usually available within <strong>7-10 working days</strong>. You'll be contacted if any action is needed."
          />
        </TestWrapper>
      );

      expect(screen.getByText('7-10 working days')).toBeInTheDocument();
      expect(screen.getByText('7-10 working days').tagName).toBe('STRONG');
      expect(screen.getByText(/You'll be contacted if any action is needed/)).toBeInTheDocument();
    });

    it('renders mental health support information', () => {
      render(
        <TestWrapper>
          <InsetText>
            <p>If you're having thoughts of self-harm or suicide:</p>
            <ul>
              <li>Call <strong>999</strong> for emergency services</li>
              <li>Call <strong>116 123</strong> for Samaritans (free, 24/7)</li>
              <li>Text <strong>SHOUT</strong> to <strong>85258</strong></li>
            </ul>
          </InsetText>
        </TestWrapper>
      );

      expect(screen.getByText("If you're having thoughts of self-harm or suicide:")).toBeInTheDocument();
      expect(screen.getByText('999')).toBeInTheDocument();
      expect(screen.getByText('116 123')).toBeInTheDocument();
      expect(screen.getByText('SHOUT')).toBeInTheDocument();
      expect(screen.getByText('85258')).toBeInTheDocument();
    });

    it('renders NHS service availability', () => {
      render(
        <TestWrapper>
          <InsetText 
            html="NHS services are <strong>free at the point of use</strong> for UK residents. You may need to show proof of residency."
          />
        </TestWrapper>
      );

      expect(screen.getByText('free at the point of use')).toBeInTheDocument();
      expect(screen.getByText('free at the point of use').tagName).toBe('STRONG');
    });

    it('renders data protection notice', () => {
      render(
        <TestWrapper>
          <InsetText>
            <p>Your personal information is protected under UK data protection laws.</p>
            <p>We only share your data with healthcare professionals involved in your care.</p>
          </InsetText>
        </TestWrapper>
      );

      expect(screen.getByText(/Your personal information is protected/)).toBeInTheDocument();
      expect(screen.getByText(/We only share your data with healthcare professionals/)).toBeInTheDocument();
    });

    it('renders COVID-19 safety measures', () => {
      render(
        <TestWrapper>
          <InsetText 
            html="<strong>COVID-19 measures:</strong> Please wear a face covering and maintain social distance where possible."
          />
        </TestWrapper>
      );

      expect(screen.getByText('COVID-19 measures:')).toBeInTheDocument();
      expect(screen.getByText('COVID-19 measures:').tagName).toBe('STRONG');
      expect(screen.getByText(/wear a face covering/)).toBeInTheDocument();
    });

    it('renders screening program information', () => {
      render(
        <TestWrapper>
          <InsetText>
            <p>NHS screening programs can help detect diseases early when treatment is most effective.</p>
            <p>You'll receive invitations automatically when you're eligible.</p>
          </InsetText>
        </TestWrapper>
      );

      expect(screen.getByText(/NHS screening programs can help detect diseases early/)).toBeInTheDocument();
      expect(screen.getByText(/You'll receive invitations automatically/)).toBeInTheDocument();
    });

    it('renders referral information', () => {
      render(
        <TestWrapper>
          <InsetText 
            text="Your GP will refer you to a specialist if they think you need further investigation or treatment."
          />
        </TestWrapper>
      );

      expect(screen.getByText(/Your GP will refer you to a specialist/)).toBeInTheDocument();
    });
  });

  describe('Content formatting', () => {
    it('renders formatted text with multiple paragraphs', () => {
      render(
        <TestWrapper>
          <InsetText 
            html="<p>First paragraph with important information.</p><p>Second paragraph with additional details.</p>"
          />
        </TestWrapper>
      );

      expect(screen.getByText('First paragraph with important information.')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph with additional details.')).toBeInTheDocument();
    });

    it('renders lists in inset text content', () => {
      render(
        <TestWrapper>
          <InsetText>
            <p>Important safety information:</p>
            <ul>
              <li>Do not drive while taking this medication</li>
              <li>Avoid alcohol during treatment</li>
              <li>Take with food to reduce stomach upset</li>
            </ul>
          </InsetText>
        </TestWrapper>
      );

      expect(screen.getByText('Important safety information:')).toBeInTheDocument();
      expect(screen.getByText('Do not drive while taking this medication')).toBeInTheDocument();
      expect(screen.getByText('Avoid alcohol during treatment')).toBeInTheDocument();
      expect(screen.getByText('Take with food to reduce stomach upset')).toBeInTheDocument();
    });

    it('renders links in inset text content', () => {
      render(
        <TestWrapper>
          <InsetText 
            html='For more information, visit the <a href="/help">help page</a> or contact support.'
          />
        </TestWrapper>
      );

      const link = screen.getByRole('link', { name: 'help page' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/help');
    });

    it('renders inline code elements', () => {
      render(
        <TestWrapper>
          <InsetText>
            Enter your NHS number in the format <code>123 456 7890</code>
          </InsetText>
        </TestWrapper>
      );

      expect(screen.getByText('123 456 7890')).toBeInTheDocument();
      expect(screen.getByText('123 456 7890').tagName).toBe('CODE');
    });

    it('renders headings in inset text content', () => {
      render(
        <TestWrapper>
          <InsetText>
            <h3>Important Notice</h3>
            <p>This is important information that you need to know.</p>
          </InsetText>
        </TestWrapper>
      );

      expect(screen.getByRole('heading', { level: 3, name: 'Important Notice' })).toBeInTheDocument();
      expect(screen.getByText('This is important information that you need to know.')).toBeInTheDocument();
    });

    it('renders mixed formatting elements', () => {
      render(
        <TestWrapper>
          <InsetText>
            <p>This paragraph contains <strong>bold text</strong>, <em>italic text</em>, and a <a href="/link">link</a>.</p>
            <p>It also contains <code>inline code</code> and regular text.</p>
          </InsetText>
        </TestWrapper>
      );

      expect(screen.getByText('bold text')).toBeInTheDocument();
      expect(screen.getByText('bold text').tagName).toBe('STRONG');
      expect(screen.getByText('italic text')).toBeInTheDocument();
      expect(screen.getByText('italic text').tagName).toBe('EM');
      expect(screen.getByRole('link', { name: 'link' })).toBeInTheDocument();
      expect(screen.getByText('inline code')).toBeInTheDocument();
      expect(screen.getByText('inline code').tagName).toBe('CODE');
    });
  });

  describe('Accessibility', () => {
    it('uses appropriate semantic markup', () => {
      const { container } = render(
        <TestWrapper>
          <InsetText text="Accessible inset text" />
        </TestWrapper>
      );

      const insetTextElement = container.querySelector('.nhsuk-inset-text');
      expect(insetTextElement?.tagName).toBe('DIV');
    });

    it('provides visually hidden context for screen readers', () => {
      render(
        <TestWrapper>
          <InsetText text="Important information" />
        </TestWrapper>
      );

      const hiddenText = screen.getByText('Information:');
      expect(hiddenText).toBeInTheDocument();
      expect(hiddenText).toHaveClass('nhsuk-u-visually-hidden');
    });

    it('supports custom ARIA attributes', () => {
      render(
        <TestWrapper>
          <InsetText 
            text="Inset text with ARIA attributes"
            attributes={{ 'aria-label': 'Important notice', 'role': 'note' }}
          />
        </TestWrapper>
      );

      const insetTextElement = screen.getByLabelText('Important notice');
      expect(insetTextElement).toHaveAttribute('role', 'note');
    });

    it('maintains proper heading hierarchy', () => {
      render(
        <TestWrapper>
          <InsetText>
            <h2>Main Heading</h2>
            <h3>Sub Heading</h3>
            <p>Content under the headings.</p>
          </InsetText>
        </TestWrapper>
      );

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });
  });

  describe('Text wrapping and layout', () => {
    it('handles long text content properly', () => {
      const longText = "This is a very long piece of text that should wrap properly within the inset text container and maintain good readability across different screen sizes and devices.";
      
      render(
        <TestWrapper>
          <InsetText text={longText} />
        </TestWrapper>
      );

      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles multiple content blocks', () => {
      render(
        <TestWrapper>
          <InsetText>
            <h3>Title</h3>
            <p>First paragraph of content.</p>
            <ul>
              <li>First list item</li>
              <li>Second list item</li>
            </ul>
            <p>Final paragraph after the list.</p>
          </InsetText>
        </TestWrapper>
      );

      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
      expect(screen.getByText('First paragraph of content.')).toBeInTheDocument();
      expect(screen.getByText('First list item')).toBeInTheDocument();
      expect(screen.getByText('Final paragraph after the list.')).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(InsetText.displayName).toBe('InsetText');
    });
  });
});