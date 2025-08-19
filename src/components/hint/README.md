# Hint

A component for displaying helpful guidance text, typically used with form fields to provide additional context or instructions. Supports both plain text and HTML content for maximum flexibility. Designed for healthcare and public service websites with accessibility in mind.

Converted from the NHS UK Design System Hint component for the Public Good Design System.

## Features

- **Flexible content**: Support for plain text, HTML, or React children
- **Form integration**: ID support for aria-describedby associations
- **Content priority**: Smart handling of multiple content types
- **Accessibility**: Full WCAG AA compliance with proper ARIA support
- **Healthcare contexts**: Optimized for medical and health service guidance
- **Customizable**: Support for custom classes and attributes
- **Semantic markup**: Proper HTML structure for assistive technologies

## Usage

```tsx
import { Hint } from '@/components/hint';

// Basic hint with text
<Hint text="Enter your full legal name as it appears on official documents" />

// Hint with HTML content
<Hint html="Do not include personal information, like your <strong>name</strong> or <strong>NHS number</strong>" />

// Hint with React children
<Hint>
  Enter your postcode in the format <code>SW1A 1AA</code>
</Hint>

// Hint with ID for form association
<Hint 
  id="email-hint"
  text="We'll only use this to send you important updates about your health"
/>

// Form field with associated hint
<div>
  <label htmlFor="nhs-number">NHS Number</label>
  <Hint 
    id="nhs-number-hint"
    text="Your NHS number is 10 digits long, for example 485 777 3456"
  />
  <input 
    id="nhs-number"
    type="text"
    aria-describedby="nhs-number-hint"
  />
</div>
```

## Props

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Plain text content for the hint |
| `html` | `string` | - | HTML content (takes precedence over text) |
| `children` | `ReactNode` | - | React children (takes precedence over html and text) |
| `id` | `string` | - | Unique ID for the hint element |
| `classes` | `string` | - | Additional CSS classes for the hint |
| `attributes` | `Record<string, string>` | - | Additional HTML attributes |

### Inherited Props

The component also accepts all standard HTML attributes through `BaseComponentProps`:
- `className` - CSS class names
- `data-testid` - Test identifier  
- Standard HTML attributes like `role`, `aria-*`, etc.

### Type Definitions

```tsx
interface HintProps extends BaseComponentProps {
  text?: string;                        // Plain text content
  html?: string;                        // HTML content
  children?: ReactNode;                 // React children content
  id?: string;                          // Unique ID for the hint
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
<Hint 
  text="This text is ignored"
  html="<p>This HTML is ignored</p>"
>
  <span>This children content is rendered</span>
</Hint>

// HTML takes priority over text
<Hint 
  text="This text is ignored"
  html="<em>This HTML content is rendered</em>"
/>

// Text is used when no children or html provided
<Hint text="This text content is rendered" />
```

## Form Integration

### Basic Form Association

```tsx
<div>
  <label htmlFor="email">Email Address</label>
  <Hint 
    id="email-hint"
    text="We'll only use this for appointment confirmations"
  />
  <input 
    id="email"
    type="email"
    aria-describedby="email-hint"
  />
</div>
```

### Multiple Hints

```tsx
<div>
  <label htmlFor="password">New Password</label>
  <Hint 
    id="password-hint"
    html="Password must be at least <strong>8 characters</strong> long"
  />
  <Hint 
    id="password-requirements"
    text="Include a mix of letters, numbers, and symbols"
  />
  <input 
    id="password"
    type="password"
    aria-describedby="password-hint password-requirements"
  />
</div>
```

### Complex Form with Multiple Fields

```tsx
<form>
  <div>
    <label htmlFor="firstname">First Name</label>
    <Hint 
      id="firstname-hint"
      text="Enter your first name as it appears on your ID"
    />
    <input 
      id="firstname"
      type="text"
      aria-describedby="firstname-hint"
    />
  </div>
  
  <div>
    <label htmlFor="dob">Date of Birth</label>
    <Hint 
      id="dob-hint"
      text="For example, 27 3 1980"
    />
    <input 
      id="dob"
      type="text"
      aria-describedby="dob-hint"
    />
  </div>
</form>
```

## Healthcare Examples

### NHS Number Input

```tsx
<div>
  <label htmlFor="nhs-number">NHS Number</label>
  <Hint 
    id="nhs-number-hint"
    text="Your NHS number is 10 digits long, for example 485 777 3456"
  />
  <input 
    id="nhs-number"
    type="text"
    aria-describedby="nhs-number-hint"
    maxLength={10}
  />
</div>
```

### Medical History Form

```tsx
<div>
  <label htmlFor="allergies">Known Allergies</label>
  <Hint 
    id="allergies-hint"
    html="Include <strong>all</strong> known allergies: medications, foods, environmental"
  />
  <textarea 
    id="allergies"
    aria-describedby="allergies-hint"
    rows={4}
  />
</div>
```

### Appointment Booking

```tsx
<div>
  <label htmlFor="preferred-time">Preferred Appointment Time</label>
  <Hint 
    id="time-hint"
  >
    <p>Morning appointments: 9:00 AM - 12:00 PM</p>
    <p>Afternoon appointments: 1:00 PM - 5:00 PM</p>
    <p>For urgent appointments, please call <strong>111</strong></p>
  </Hint>
  <select 
    id="preferred-time"
    aria-describedby="time-hint"
  >
    <option>Select a time slot</option>
    <option>Morning (9:00 AM - 12:00 PM)</option>
    <option>Afternoon (1:00 PM - 5:00 PM)</option>
  </select>
</div>
```

### Prescription Repeat Request

```tsx
<div>
  <label htmlFor="prescription-items">Medications to Repeat</label>
  <Hint 
    id="prescription-hint"
    html="Select items from your current repeat prescription list. Allow <strong>48 hours</strong> for processing."
  />
  <div aria-describedby="prescription-hint">
    <input type="checkbox" id="med1" />
    <label htmlFor="med1">Atorvastatin 20mg</label>
    
    <input type="checkbox" id="med2" />
    <label htmlFor="med2">Metformin 500mg</label>
  </div>
</div>
```

### Emergency Contact Information

```tsx
<div>
  <label htmlFor="emergency-contact">Emergency Contact</label>
  <Hint 
    id="emergency-hint"
  >
    <p>Provide details for someone we can contact in case of emergency:</p>
    <ul>
      <li>Full name and relationship to you</li>
      <li>Phone number (mobile preferred)</li>
      <li>Alternative contact if first person unavailable</li>
    </ul>
  </Hint>
  <textarea 
    id="emergency-contact"
    aria-describedby="emergency-hint"
    rows={4}
  />
</div>
```

### Health Records Access

```tsx
<div>
  <label htmlFor="record-request">Health Records Request</label>
  <Hint 
    id="records-hint"
    html="You can access your health records online using the <a href='/nhs-app'>NHS App</a> or request paper copies using this form"
  />
  <textarea 
    id="record-request"
    aria-describedby="records-hint"
    placeholder="Describe which records you need and the date range"
  />
</div>
```

### Mental Health Assessment

```tsx
<div>
  <label htmlFor="mental-health">Current Concerns</label>
  <Hint 
    id="mental-health-hint"
  >
    <p>Please describe any mental health concerns you'd like to discuss.</p>
    <p><strong>If you're having thoughts of self-harm:</strong></p>
    <ul>
      <li>Call <strong>999</strong> for emergency services</li>
      <li>Call <strong>116 123</strong> for Samaritans (free, 24/7)</li>
      <li>Text <strong>SHOUT</strong> to <strong>85258</strong></li>
    </ul>
  </Hint>
  <textarea 
    id="mental-health"
    aria-describedby="mental-health-hint"
    rows={6}
  />
</div>
```

### Vaccination History

```tsx
<div>
  <label htmlFor="vaccination-history">Previous Vaccinations</label>
  <Hint 
    id="vaccination-hint"
    text="Include COVID-19, flu, and any travel vaccinations received in the last 5 years"
  />
  <textarea 
    id="vaccination-history"
    aria-describedby="vaccination-hint"
    rows={4}
  />
</div>
```

### GP Registration

```tsx
<div>
  <label htmlFor="previous-gp">Previous GP Practice</label>
  <Hint 
    id="gp-hint"
    html="If you were registered with a GP practice before, provide their details. <strong>You can register even if you don't have these details.</strong>"
  />
  <input 
    id="previous-gp"
    type="text"
    aria-describedby="gp-hint"
    placeholder="Previous GP practice name and address"
  />
</div>
```

### Test Results Request

```tsx
<div>
  <label htmlFor="test-results">Test Results Request</label>
  <Hint 
    id="test-results-hint"
    html="Test results are usually available within <strong>7-10 working days</strong>. You'll be contacted if any action is needed."
  />
  <select 
    id="test-results"
    aria-describedby="test-results-hint"
  >
    <option>Select test type</option>
    <option>Blood test</option>
    <option>Urine test</option>
    <option>X-ray</option>
    <option>Other</option>
  </select>
</div>
```

## Common Hint Patterns

### Privacy and Data Protection

```tsx
<Hint 
  html="Do not include personal information, like your <strong>name</strong>, <strong>date of birth</strong> or <strong>NHS number</strong>"
/>
```

### Format Instructions

```tsx
<Hint text="For example, 27 3 1980" />
<Hint>Enter your postcode in the format <code>SW1A 1AA</code></Hint>
```

### Contact Information

```tsx
<Hint>
  For urgent appointments, call <strong>111</strong>
</Hint>
```

### Processing Times

```tsx
<Hint text="Allow 48 hours for repeat prescriptions to be processed" />
```

### Required vs Optional Information

```tsx
<Hint 
  html="<strong>Required:</strong> We need this information to process your request"
/>

<Hint 
  text="Optional: This helps us provide better care but is not required"
/>
```

## Accessibility Features

### Form Association

- **ID attributes**: Unique IDs for aria-describedby relationships
- **Screen reader support**: Proper association with form controls
- **Multiple hints**: Support for multiple hint IDs in aria-describedby

### Semantic Structure

- **Proper markup**: Uses div elements with appropriate styling
- **Content hierarchy**: Clear relationship to associated form fields
- **Custom ARIA**: Support for additional ARIA attributes when needed

### Screen Reader Support

- **Descriptive content**: Meaningful hint text for context
- **HTML support**: Rich content with proper markup
- **Link integration**: Accessible links within hint content

## Visual Design

### Typography

- **Font size**: Smaller than body text for secondary information
- **Line height**: Relaxed line height for readability
- **Color**: Secondary color for visual hierarchy

### Spacing

- **Margin**: Consistent spacing below hints
- **Form integration**: Proper spacing between labels, hints, and inputs
- **Multiple hints**: Appropriate spacing between multiple hint elements

### Responsive Design

- **Mobile friendly**: Readable on small screens
- **Text wrapping**: Proper line wrapping for long hint text
- **Touch targets**: Accessible on touch devices

## Technical Notes

- Built with styled-components for consistent theming
- Semantic HTML structure with div elements
- TypeScript definitions for type safety
- Server-side rendering compatible
- Supports custom attributes and CSS classes
- Lightweight with minimal dependencies

## Browser Support

Compatible with all modern browsers including:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- IE11 (with polyfills)

## Related Components

- **[Label](../label/README.md)** - Form labels that work with hints
- **[ErrorMessage](../error-message/README.md)** - Error messaging for form validation
- **[Input](../input/README.md)** - Form inputs that use hints
- **[Textarea](../textarea/README.md)** - Text areas with hint support

## Best Practices

### Content Guidelines

1. **Be specific**: Provide clear, actionable guidance
2. **Keep it concise**: Use brief, scannable text
3. **Use examples**: Show format examples when helpful
4. **Prioritize safety**: Include emergency contacts for health contexts
5. **Consider privacy**: Remind users about sensitive information

### Accessibility Guidelines

1. **Use unique IDs**: Ensure each hint has a unique identifier
2. **Associate with forms**: Always use aria-describedby for form fields
3. **Test with screen readers**: Verify hint content is accessible
4. **Provide context**: Make hints meaningful when read independently
5. **Use semantic markup**: Proper HTML structure for assistive technologies

### Implementation Guidelines

1. **Position consistently**: Place hints between labels and form controls
2. **Group related hints**: Use multiple hints for complex requirements
3. **Test across devices**: Verify readability on various screen sizes
4. **Monitor user feedback**: Adjust hint content based on user confusion
5. **Keep content current**: Update hints when processes change

### Healthcare-Specific Guidelines

1. **Include emergency numbers**: Always provide crisis contact information
2. **Explain medical terms**: Define technical terminology when needed
3. **Provide alternatives**: Offer multiple ways to access services
4. **Consider digital literacy**: Explain online processes clearly
5. **Respect privacy**: Remind users about data protection and confidentiality