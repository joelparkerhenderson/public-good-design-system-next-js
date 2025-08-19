# Label

A form label component that can be used to label form inputs. Supports various sizes, HTML content, and can optionally be used as a page heading. Provides proper semantic markup and accessibility features for form elements with healthcare-specific examples and patterns.

Converted from the NHS UK Design System Label component for the Public Good Design System.

## Features

- **Flexible content**: Support for plain text, HTML, or React children
- **Multiple sizes**: Four size variations (s, m, l, xl) for different use cases
- **Page heading mode**: Can be used as both label and page heading
- **Content priority**: Smart handling of multiple content types
- **Accessibility first**: Proper semantic markup and ARIA support
- **Healthcare optimized**: Examples and patterns for medical forms
- **Rich formatting**: Support for emphasis, links, code, and abbreviations
- **Form association**: Proper htmlFor attributes for input relationships

## Usage

```tsx
import { Label } from '@/components/label';

// Basic label
<Label htmlFor="nhs-number" text="NHS Number" />

// Label with HTML content
<Label htmlFor="email" html="Email address <span>(optional)</span>" />

// Label as page heading
<Label 
  htmlFor="main-input"
  text="What is your NHS number?"
  isPageHeading={true}
  size="xl"
/>

// Label with React children
<Label htmlFor="name">
  Full name <span className="optional">(optional)</span>
</Label>
```

## Props

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Plain text content for the label |
| `html` | `string` | - | HTML content (takes precedence over text) |
| `children` | `ReactNode` | - | React children (takes precedence over html and text) |
| `htmlFor` | `string` | - | The id of the input the label is associated with |
| `isPageHeading` | `boolean` | `false` | Whether the label also acts as the heading for the page |
| `size` | `LabelSize` | - | Size of the label ('s', 'm', 'l', 'xl') |
| `classes` | `string` | - | Additional CSS classes for the label |
| `attributes` | `Record<string, string>` | - | Additional HTML attributes |

### Inherited Props

The component also accepts all standard HTML attributes through `BaseComponentProps`:
- `className` - CSS class names
- `data-testid` - Test identifier  
- Standard HTML attributes like `role`, `aria-*`, etc.

### Type Definitions

```tsx
type LabelSize = 's' | 'm' | 'l' | 'xl';

interface LabelProps extends BaseComponentProps {
  text?: string;                        // Plain text content
  html?: string;                        // HTML content
  children?: ReactNode;                 // React children content
  htmlFor?: string;                     // Associated input ID
  isPageHeading?: boolean;              // Use as page heading
  size?: LabelSize;                     // Label size
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
<Label 
  htmlFor="input"
  text="This text is ignored"
  html="<p>This HTML is ignored</p>"
>
  <span>This children content is rendered</span>
</Label>

// HTML takes priority over text
<Label 
  htmlFor="input"
  text="This text is ignored"
  html="<em>This HTML content is rendered</em>"
/>

// Text is used when no children or html provided
<Label htmlFor="input" text="This text content is rendered" />
```

## Size Variations

### Small (s)
Used for compact forms or secondary labels:

```tsx
<Label htmlFor="suffix" text="Suffix" size="s" />
<Label htmlFor="title" text="Title" classes="nhsuk-label--s" />
```

### Medium (m) - Default
Standard size for most form labels:

```tsx
<Label htmlFor="first-name" text="First name" size="m" />
<Label htmlFor="email" text="Email address" />
```

### Large (l)
Used for important form sections or sub-headings:

```tsx
<Label htmlFor="personal-details" text="Personal Details" size="l" />
<Label htmlFor="contact-info" text="Contact Information" classes="nhsuk-label--l" />
```

### Extra Large (xl)
Used for page headings or primary questions:

```tsx
<Label 
  htmlFor="main-question"
  text="What is your NHS number?"
  size="xl"
  isPageHeading={true}
/>
```

## Basic Examples

### Simple Form Labels

```tsx
<Label htmlFor="first-name" text="First name" />
<Label htmlFor="last-name" text="Last name" />
<Label htmlFor="email" text="Email address" />
<Label htmlFor="phone" text="Phone number" />
```

### Optional Fields

```tsx
<Label htmlFor="middle-name" html="Middle name <span>(optional)</span>" />
<Label htmlFor="mobile">
  Mobile phone <em className="optional">optional</em>
</Label>
```

### Required Fields

```tsx
<Label htmlFor="nhs-number">
  NHS Number <abbr title="required">*</abbr>
</Label>
<Label htmlFor="date-of-birth" html="Date of birth <span class='required'>*</span>" />
```

## Healthcare Examples

### NHS Number

```tsx
<Label htmlFor="nhs-number" text="NHS Number" />
<Label htmlFor="nhs-number" html="NHS Number <span class='help'>(10 digits)</span>" />
```

### Patient Information

```tsx
<Label htmlFor="patient-name" text="Patient full name" />
<Label htmlFor="date-of-birth" text="Date of birth" />
<Label htmlFor="gender" text="Gender" />
<Label htmlFor="address" text="Home address" />
```

### Medical History

```tsx
<Label htmlFor="allergies" text="Known allergies and adverse reactions" />
<Label htmlFor="medications" text="Current medications" />
<Label htmlFor="conditions" text="Long-term medical conditions" />
<Label htmlFor="family-history" html="Family medical history <em>(if known)</em>" />
```

### Emergency Contact

```tsx
<Label htmlFor="emergency-name" text="Emergency contact name" />
<Label htmlFor="emergency-phone" text="Emergency contact phone number" />
<Label htmlFor="relationship" html="Relationship to patient <span>(e.g., spouse, parent)</span>" />
```

### GP and Healthcare Provider

```tsx
<Label htmlFor="gp-practice" text="Current GP practice" />
<Label htmlFor="gp-name" html="GP name <span class='optional'>(if known)</span>" />
<Label htmlFor="previous-gp" html="Previous GP practice <em>(if applicable)</em>" />
```

### Appointment Information

```tsx
<Label htmlFor="appointment-type">
  Type of appointment <span className="help-text">(routine, follow-up, urgent)</span>
</Label>
<Label htmlFor="symptoms" text="Describe your symptoms in detail" />
<Label htmlFor="preferred-time" text="Preferred appointment time" />
```

### Medication and Dosage

```tsx
<Label htmlFor="medication-name" text="Medication name" />
<Label htmlFor="dosage" html="Current dosage <code>mg</code>" />
<Label htmlFor="frequency" text="How often do you take this medication?" />
<Label htmlFor="side-effects" html="Any side effects? <em>(optional)</em>" />
```

### Consent and Legal

```tsx
<Label htmlFor="consent-treatment">
  <strong>Consent for treatment</strong> - I agree to the proposed treatment
</Label>
<Label htmlFor="data-sharing" text="Consent for data sharing with other healthcare providers" />
<Label htmlFor="research-participation" html="Participation in medical research <em>(optional)</em>" />
```

### Insurance and Payment

```tsx
<Label htmlFor="insurance-provider" html="Private insurance provider <span class='note'>(if applicable)</span>" />
<Label htmlFor="policy-number" text="Insurance policy number" />
<Label htmlFor="payment-method" text="Preferred payment method" />
```

### Mental Health

```tsx
<Label htmlFor="mental-health-history" text="Mental health history" />
<Label htmlFor="current-treatment" html="Current mental health treatment <em>(if any)</em>" />
<Label htmlFor="support-network" text="Support network and family involvement" />
```

### Screening and Prevention

```tsx
<Label htmlFor="last-screening" text="Date of last health screening" />
<Label htmlFor="vaccination-history" text="Recent vaccination history" />
<Label htmlFor="lifestyle-factors" text="Lifestyle factors (smoking, alcohol, exercise)" />
```

## Page Heading Labels

For single-question pages or forms where the label is the main heading:

### NHS Number Question

```tsx
<Label 
  htmlFor="nhs-number-input"
  text="What is your NHS number?"
  isPageHeading={true}
  size="xl"
/>
```

### Patient Registration

```tsx
<Label 
  htmlFor="registration-form"
  text="Register as a new patient"
  isPageHeading={true}
  size="l"
/>
```

### Appointment Booking

```tsx
<Label 
  htmlFor="appointment-form"
  html="Book your <strong>GP appointment</strong>"
  isPageHeading={true}
  size="xl"
/>
```

### Symptom Checker

```tsx
<Label 
  htmlFor="symptom-input"
  text="What symptoms are you experiencing?"
  isPageHeading={true}
  size="l"
/>
```

### Prescription Request

```tsx
<Label 
  htmlFor="prescription-form"
  html="Request a <strong>repeat prescription</strong>"
  isPageHeading={true}
/>
```

## Advanced Usage

### Complex Healthcare Form

```tsx
<form>
  <fieldset>
    <Label htmlFor="personal-info" text="Personal Information" size="l" />
    
    <Label htmlFor="title" text="Title" size="s" />
    <Label htmlFor="first-name">
      First name <abbr title="required">*</abbr>
    </Label>
    <Label htmlFor="last-name">
      Last name <abbr title="required">*</abbr>
    </Label>
    <Label htmlFor="middle-name" html="Middle name <em>(optional)</em>" />
  </fieldset>
  
  <fieldset>
    <Label htmlFor="contact-details" text="Contact Details" size="l" />
    
    <Label htmlFor="email" text="Email address" />
    <Label htmlFor="phone" text="Phone number" />
    <Label htmlFor="mobile" html="Mobile phone <span class='optional'>(optional)</span>" />
  </fieldset>
</form>
```

### Medical Assessment Form

```tsx
<form>
  <Label 
    htmlFor="assessment-form"
    text="Pre-appointment Health Assessment"
    isPageHeading={true}
    size="xl"
  />
  
  <Label htmlFor="reason-for-visit" text="Reason for today's visit" size="l" />
  <Label htmlFor="symptoms" text="Describe your symptoms in detail" />
  <Label htmlFor="symptom-duration" text="How long have you had these symptoms?" />
  
  <Label htmlFor="pain-scale" text="Pain level (0-10 scale)" />
  <Label htmlFor="pain-location" html="Location of pain <em>(if applicable)</em>" />
  
  <Label htmlFor="previous-treatment" text="Previous treatment for this condition" />
  <Label htmlFor="medications-tried" html="Medications already tried <span class='optional'>(if any)</span>" />
</form>
```

### Emergency Department Triage

```tsx
<form>
  <Label 
    htmlFor="triage-form"
    text="Emergency Department Registration"
    isPageHeading={true}
    size="xl"
  />
  
  <Label htmlFor="chief-complaint" text="Chief complaint" size="l" />
  <Label htmlFor="pain-severity" text="Pain severity (1-10)" />
  <Label htmlFor="symptom-onset" text="When did symptoms start?" />
  
  <Label htmlFor="allergies" text="Known allergies" />
  <Label htmlFor="current-medications" text="Current medications" />
  <Label htmlFor="medical-conditions" text="Existing medical conditions" />
  
  <Label htmlFor="emergency-contact" text="Emergency contact information" size="l" />
  <Label htmlFor="contact-name" text="Contact name" />
  <Label htmlFor="contact-phone" text="Contact phone number" />
  <Label htmlFor="relationship" text="Relationship to patient" />
</form>
```

## Content Formatting

### Rich Text Labels

```tsx
<Label 
  htmlFor="input"
  html="Label with <strong>bold</strong> and <em>italic</em> text"
/>

<Label htmlFor="code-input">
  Enter value in <code>YYYY-MM-DD</code> format
</Label>

<Label htmlFor="help-input">
  Need help? See our <a href="/help">help guide</a>
</Label>
```

### Medical Terminology

```tsx
<Label htmlFor="bp-systolic">
  <abbr title="Blood Pressure">BP</abbr> Systolic
</Label>

<Label htmlFor="temperature">
  Temperature <code>°C</code>
</Label>

<Label htmlFor="bmi">
  <abbr title="Body Mass Index">BMI</abbr> calculation
</Label>
```

### Dosage and Measurements

```tsx
<Label htmlFor="weight">
  Current weight <code>kg</code>
</Label>

<Label htmlFor="height">
  Height <code>cm</code>
</Label>

<Label htmlFor="medication-dose">
  Daily dose <code>mg</code>
</Label>
```

## Accessibility Features

### Semantic Structure

```tsx
// Regular label
<Label htmlFor="input" text="Accessible Label" />

// Page heading label maintains proper hierarchy
<Label 
  htmlFor="input"
  text="Page Heading Label"
  isPageHeading={true}
/>
```

### ARIA Support

```tsx
<Label 
  htmlFor="complex-input"
  text="Complex Input Label"
  attributes={{ 
    'aria-describedby': 'input-help',
    'role': 'text'
  }}
/>
```

### Form Relationships

```tsx
<Label htmlFor="accessible-input" text="Accessible Input" />
<input 
  id="accessible-input" 
  type="text" 
  aria-describedby="input-help"
/>
<div id="input-help">Additional help text</div>
```

## Visual Design

### Typography

- **Font weight**: Semibold for better readability
- **Line height**: Optimized for each size
- **Color**: Primary text color with good contrast

### Size Scale

- **Small (s)**: 16px - Compact labels
- **Medium (m)**: 18px - Standard labels  
- **Large (l)**: 20px - Section headings
- **Extra Large (xl)**: 24px - Page headings

### Spacing

- **Bottom margin**: Consistent spacing below labels
- **Page heading margin**: Additional space for headings

## Browser Support

Compatible with all modern browsers including:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- IE11 (with polyfills)

## Related Components

- **[Input](../input/README.md)** - Form inputs that use labels
- **[Textarea](../textarea/README.md)** - Text areas with label support
- **[Checkboxes](../checkboxes/README.md)** - Checkbox groups with labels
- **[DateInput](../date-input/README.md)** - Date inputs with labels

## Best Practices

### Content Guidelines

1. **Be descriptive**: Use clear, specific label text
2. **Keep it concise**: Avoid unnecessarily long labels
3. **Use plain English**: Avoid jargon and technical terms
4. **Indicate requirements**: Mark required fields clearly
5. **Provide context**: Use hints for complex fields

### Accessibility Guidelines

1. **Always associate labels**: Use htmlFor to connect labels to inputs
2. **Use proper hierarchy**: Maintain logical heading structure
3. **Write descriptive text**: Labels should make sense out of context
4. **Test with screen readers**: Verify labels are announced correctly
5. **Avoid placeholder-only labels**: Always use visible labels

### Healthcare-Specific Guidelines

1. **Use medical terminology appropriately**: Define terms when needed
2. **Be sensitive to patient needs**: Consider health literacy levels
3. **Provide clear instructions**: Explain what information is needed
4. **Respect privacy**: Indicate optional vs required personal information
5. **Consider cultural factors**: Use inclusive language

### Form Design Guidelines

1. **Position labels consistently**: Usually above or to the left of inputs
2. **Group related labels**: Use fieldsets for logical groupings
3. **Size labels appropriately**: Match importance with visual hierarchy
4. **Test across devices**: Ensure readability on all screen sizes
5. **Maintain visual rhythm**: Consistent spacing and alignment

### Implementation Guidelines

1. **Choose the right size**: Match label size to its importance
2. **Use page headings sparingly**: Only for single-question forms
3. **Format content appropriately**: Use HTML for emphasis and structure
4. **Test form flow**: Ensure labels guide users logically
5. **Validate accessibility**: Check with assistive technologies

## Migration from NHS UK

The Label component maintains full compatibility with NHS UK patterns while adding modern React features:

- Same visual appearance and behavior
- Enhanced TypeScript support with size type safety
- Better performance with styled-components
- Improved accessibility features
- Modern React patterns (children support, proper ref forwarding)
- Comprehensive testing coverage
- Healthcare-specific examples and documentation