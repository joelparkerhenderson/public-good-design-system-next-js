# Inset Text

A component for displaying important information that needs to stand out from the main content. Typically used for warnings, important notes, supplementary information, or calls to action. Features visual styling that draws attention while maintaining accessibility for screen readers.

Converted from the NHS UK Design System Inset Text component for the Public Good Design System.

## Features

- **Visual prominence**: Distinguished styling to highlight important content
- **Flexible content**: Support for plain text, HTML, or React children
- **Content priority**: Smart handling of multiple content types
- **Accessibility first**: Screen reader support with contextual information
- **Healthcare optimized**: Perfect for medical warnings and important health information
- **Rich formatting**: Support for lists, links, headings, and inline formatting
- **Semantic markup**: Proper HTML structure for assistive technologies

## Usage

```tsx
import { InsetText } from '@/components/inset-text';

// Basic inset text
<InsetText text="You can report any suspected side effects to the UK safety scheme." />

// Inset text with HTML content
<InsetText html="You can report any suspected side effects to the <a href='#'>UK safety scheme</a>." />

// Inset text with React children
<InsetText>
  <p>You can report any suspected side effects to the UK safety scheme.</p>
  <p>Call 111 for urgent but non-life-threatening symptoms.</p>
</InsetText>
```

## Props

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Plain text content for the inset text |
| `html` | `string` | - | HTML content (takes precedence over text) |
| `children` | `ReactNode` | - | React children (takes precedence over html and text) |
| `classes` | `string` | - | Additional CSS classes for the inset text |
| `attributes` | `Record<string, string>` | - | Additional HTML attributes |

### Inherited Props

The component also accepts all standard HTML attributes through `BaseComponentProps`:
- `className` - CSS class names
- `data-testid` - Test identifier  
- Standard HTML attributes like `role`, `aria-*`, etc.

### Type Definitions

```tsx
interface InsetTextProps extends BaseComponentProps {
  text?: string;                        // Plain text content
  html?: string;                        // HTML content
  children?: ReactNode;                 // React children content
  classes?: string;                     // Additional CSS classes
  attributes?: Record<string, string>;  // Additional HTML attributes
}
```

## Content Priority

Content is rendered with the following priority (highest to lowest):

1. **`children`** (React elements) - Most flexible, supports any React content
2. **`html`** (HTML string) - Formatted content with HTML tags
3. **`text`** (plain text) - Simple text content

```tsx
// Children take priority over html and text
<InsetText 
  text="This text is ignored"
  html="<p>This HTML is ignored</p>"
>
  <span>This children content is rendered</span>
</InsetText>

// HTML takes priority over text
<InsetText 
  text="This text is ignored"
  html="<em>This HTML content is rendered</em>"
/>

// Text is used when no children or html provided
<InsetText text="This text content is rendered" />
```

## Basic Examples

### Simple Information

```tsx
<InsetText text="Most prescriptions cost £9.65. You may be able to get free prescriptions if you're eligible." />
```

### Important Warning

```tsx
<InsetText 
  html="<strong>Important:</strong> Do not drive or operate machinery while taking this medication."
/>
```

### Multiple Paragraphs

```tsx
<InsetText>
  <p>Your appointment has been confirmed for Tuesday, 15 March at 10:30 AM.</p>
  <p>Please arrive 15 minutes early to allow time for check-in.</p>
</InsetText>
```

## Healthcare Examples

### Medication Side Effects

```tsx
<InsetText 
  html="You can report any suspected side effects to the <a href='https://yellowcard.mhra.gov.uk/' target='_blank' rel='noopener noreferrer'>UK safety scheme</a>."
/>
```

### Emergency Contact Information

```tsx
<InsetText>
  <p><strong>Emergency:</strong> Call 999 if you have severe chest pain or difficulty breathing.</p>
  <p><strong>Urgent:</strong> Call 111 for urgent but non-life-threatening symptoms.</p>
</InsetText>
```

### Appointment Preparation

```tsx
<InsetText 
  html="<strong>Bring with you:</strong> Your NHS card, a list of current medications, and any recent test results."
/>
```

### Prescription Information

```tsx
<InsetText>
  <p>Most prescriptions cost £9.65 per item.</p>
  <p>You may be able to get free prescriptions if you're eligible for exemption.</p>
</InsetText>
```

### Vaccination Eligibility

```tsx
<InsetText>
  <p>You're eligible for a free flu vaccination if you:</p>
  <ul>
    <li>Are 65 or over</li>
    <li>Have a long-term health condition</li>
    <li>Are pregnant</li>
    <li>Are a carer for someone at high risk</li>
  </ul>
</InsetText>
```

### Test Results Notice

```tsx
<InsetText 
  html="Test results are usually available within <strong>7-10 working days</strong>. You'll be contacted if any action is needed."
/>
```

### Mental Health Support

```tsx
<InsetText>
  <p>If you're having thoughts of self-harm or suicide:</p>
  <ul>
    <li>Call <strong>999</strong> for emergency services</li>
    <li>Call <strong>116 123</strong> for Samaritans (free, 24/7)</li>
    <li>Text <strong>SHOUT</strong> to <strong>85258</strong> for crisis text support</li>
  </ul>
</InsetText>
```

### NHS Service Information

```tsx
<InsetText 
  html="NHS services are <strong>free at the point of use</strong> for UK residents. You may need to show proof of residency."
/>
```

### Data Protection Notice

```tsx
<InsetText>
  <p>Your personal information is protected under UK data protection laws.</p>
  <p>We only share your data with healthcare professionals involved in your care.</p>
</InsetText>
```

### COVID-19 Safety Measures

```tsx
<InsetText 
  html="<strong>COVID-19 measures:</strong> Please wear a face covering and maintain social distance where possible."
/>
```

### Screening Program Information

```tsx
<InsetText>
  <p>NHS screening programs can help detect diseases early when treatment is most effective.</p>
  <p>You'll receive invitations automatically when you're eligible.</p>
</InsetText>
```

### Referral Information

```tsx
<InsetText 
  text="Your GP will refer you to a specialist if they think you need further investigation or treatment."
/>
```

## Advanced Examples

### Complex Healthcare Notice

```tsx
<InsetText>
  <h3>Important Safety Information</h3>
  <p>Before taking this medication, tell your doctor if you:</p>
  <ul>
    <li>Have ever had an allergic reaction to similar medications</li>
    <li>Are pregnant, trying to get pregnant, or breastfeeding</li>
    <li>Have kidney or liver problems</li>
    <li>Are taking any other medications</li>
  </ul>
  <p>For urgent medical advice, call <strong>111</strong> or visit your nearest A&E department.</p>
</InsetText>
```

### Appointment Booking Information

```tsx
<InsetText>
  <h3>Booking Your Appointment</h3>
  <p>You can book appointments:</p>
  <ul>
    <li>Online through the <a href="/patient-portal">patient portal</a></li>
    <li>By phone on <strong>0300 123 1234</strong></li>
    <li>In person at reception</li>
  </ul>
  <p><strong>Cancellations:</strong> Please give at least 24 hours notice if you need to cancel.</p>
</InsetText>
```

### Prescription Collection

```tsx
<InsetText>
  <p><strong>Collecting your prescription:</strong></p>
  <ol>
    <li>Wait at least 48 hours after ordering</li>
    <li>Bring photo ID if collecting for someone else</li>
    <li>Check medications before leaving the pharmacy</li>
  </ol>
  <p>Contact the pharmacy on <strong>0300 123 4567</strong> if you have any questions.</p>
</InsetText>
```

### Health Records Access

```tsx
<InsetText>
  <p>You can access your health records:</p>
  <ul>
    <li>Online through the <a href="/nhs-app">NHS App</a></li>
    <li>By requesting paper copies (allow 21 days)</li>
    <li>By viewing them during GP appointments</li>
  </ul>
  <p><strong>Note:</strong> Some information may be restricted for clinical reasons.</p>
</InsetText>
```

### Vaccination Booking

```tsx
<InsetText>
  <h3>COVID-19 Vaccination</h3>
  <p>Book your vaccination appointment:</p>
  <ul>
    <li>Online at <a href="https://www.nhs.uk/book">nhs.uk/book</a></li>
    <li>By calling <strong>119</strong> (free from any phone)</li>
  </ul>
  <p><strong>What to bring:</strong> Photo ID and your vaccination record if you have one.</p>
  <p><strong>Side effects:</strong> Mild side effects like a sore arm are normal and should pass within a few days.</p>
</InsetText>
```

## Content Formatting

### Rich Text Content

```tsx
<InsetText>
  <p>This inset text contains <strong>bold text</strong>, <em>italic text</em>, and <a href="/link">links</a>.</p>
  <p>It also contains <code>inline code</code> and regular text formatting.</p>
</InsetText>
```

### Lists and Structure

```tsx
<InsetText>
  <h3>Preparation Checklist</h3>
  <p>Before your appointment:</p>
  <ol>
    <li>Gather your current medications</li>
    <li>Write down any symptoms or concerns</li>
    <li>Prepare questions you want to ask</li>
  </ol>
  <p>This helps ensure you get the most from your appointment.</p>
</InsetText>
```

### Mixed Content Types

```tsx
<InsetText>
  <h3>Contact Information</h3>
  <p>For different types of enquiries:</p>
  <ul>
    <li><strong>Appointments:</strong> <a href="tel:03001231234">0300 123 1234</a></li>
    <li><strong>Prescriptions:</strong> <a href="tel:03001234567">0300 123 4567</a></li>
    <li><strong>Test results:</strong> <a href="tel:03001235678">0300 123 5678</a></li>
  </ul>
  <p>Lines are open Monday to Friday, 8:00 AM to 6:00 PM.</p>
</InsetText>
```

## Accessibility Features

### Screen Reader Support

The component automatically includes visually hidden text that provides context for screen readers:

```tsx
<InsetText text="Important medication information" />
// Screen readers will hear: "Information: Important medication information"
```

### Semantic Structure

```tsx
<InsetText>
  <h3>Important Notice</h3>
  <p>This maintains proper heading hierarchy and semantic structure.</p>
</InsetText>
```

### ARIA Support

```tsx
<InsetText 
  text="Critical health information"
  attributes={{ 
    'role': 'alert',
    'aria-label': 'Critical health warning'
  }}
/>
```

### Link Accessibility

```tsx
<InsetText 
  html='Visit our <a href="/help" aria-describedby="help-description">help page</a> for more information.'
/>
```

## Visual Design

### Styling

- **Background**: Light grey background to distinguish from main content
- **Border**: Left border for visual emphasis
- **Spacing**: Consistent padding and margins
- **Typography**: Inherits body font with proper line heights

### Content Styling

- **Paragraphs**: Proper spacing between paragraphs
- **Lists**: Appropriate indentation and spacing
- **Links**: Standard link styling with focus states
- **Emphasis**: Bold and italic text styling
- **Code**: Monospace font with background

## Usage Guidelines

### When to Use

- **Important warnings**: Safety information or critical notices
- **Supplementary information**: Additional context that's important but not part of main flow
- **Calls to action**: Drawing attention to important actions users should take
- **Key facts**: Highlighting essential information
- **Contact information**: Emergency numbers or important contact details

### When Not to Use

- **Primary content**: Main page content should not be in inset text
- **Error messages**: Use ErrorMessage component instead
- **Form help**: Use Hint component for form guidance
- **General information**: Regular content doesn't need highlighting

### Content Guidelines

1. **Keep it concise**: Inset text should be brief and focused
2. **Make it actionable**: Tell users what they need to do
3. **Use clear language**: Avoid jargon and complex terms
4. **Prioritize information**: Put most important content first
5. **Include contact details**: Provide ways to get help when needed

### Accessibility Guidelines

1. **Use semantic HTML**: Proper headings, lists, and structure
2. **Provide context**: The hidden "Information:" text helps screen readers
3. **Write descriptive links**: Link text should make sense out of context
4. **Test with screen readers**: Ensure content flows logically
5. **Consider cognitive load**: Don't overwhelm users with too much information

### Healthcare-Specific Guidelines

1. **Include emergency contacts**: Always provide crisis numbers for mental health content
2. **Be clear about urgency**: Distinguish between emergency and routine care
3. **Provide alternatives**: Offer multiple ways to access services
4. **Consider health literacy**: Use plain English for medical information
5. **Respect privacy**: Remind users about confidentiality when appropriate

## Technical Implementation

### Styled Components Structure

```tsx
const InsetTextContainer = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  margin: ${({ theme }) => theme.spacing[6]} 0;
  padding: ${({ theme }) => theme.spacing[4]};
  border-left: 4px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.backgroundMuted};
  
  /* Content styling for all nested elements */
  p, ul, ol, li, a, strong, em, code, h1-h6 { ... }
`;

const VisuallyHidden = styled.span`
  /* Screen reader only content */
  position: absolute !important;
  /* ... other visually hidden styles */
`;
```

### Content Rendering Logic

```tsx
const renderContent = () => {
  if (children) {
    return children;
  } else if (html) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  } else if (text) {
    return <p>{text}</p>;
  }
  return null;
};
```

## Browser Support

Compatible with all modern browsers including:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- IE11 (with polyfills)

## Related Components

- **[Details](../details/README.md)** - Collapsible content sections
- **[ErrorMessage](../error-message/README.md)** - Error messaging for forms
- **[Hint](../hint/README.md)** - Help text for form fields
- **[Card](../card/README.md)** - Content containers with different styling

## Best Practices

### Content Best Practices

1. **Start with the most important information**: Put critical details first
2. **Use active voice**: "Call 999" instead of "999 should be called"
3. **Be specific**: "Wait 48 hours" instead of "Wait a while"
4. **Include next steps**: Tell users what to do with the information
5. **Test with users**: Ensure the content is clear and actionable

### Design Best Practices

1. **Don't overuse**: Too many inset text blocks lose their impact
2. **Consider placement**: Position near relevant content
3. **Maintain consistency**: Use similar formatting across your site
4. **Test responsively**: Ensure readability on all devices
5. **Check contrast**: Verify text remains readable on the background

### Accessibility Best Practices

1. **Structure content logically**: Use headings and lists appropriately
2. **Write descriptive link text**: Avoid "click here" or "read more"
3. **Test with assistive technology**: Use screen readers to verify experience
4. **Provide multiple contact methods**: Phone, email, and online options
5. **Consider language barriers**: Provide translation resources when possible

## Migration from NHS UK

The InsetText component maintains full compatibility with NHS UK patterns while adding modern React features:

- Same visual appearance and behavior
- Enhanced TypeScript support
- Better performance with styled-components
- Improved accessibility features
- Modern React patterns (hooks, children support)
- Comprehensive testing coverage