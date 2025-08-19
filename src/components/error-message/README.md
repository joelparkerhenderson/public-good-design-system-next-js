# ErrorMessage

A component for displaying validation error messages in forms. Provides clear, accessible error feedback with proper styling and screen reader support. Includes a visually hidden prefix for assistive technologies.

Converted from the NHS UK Design System Error Message component for the Public Good Design System.

## Features

- **Clear error styling**: Red text with bold weight for high visibility
- **Screen reader support**: Includes visually hidden "Error:" prefix for assistive technologies
- **Flexible content**: Support for text, HTML, or React children
- **Form integration**: Can be associated with form controls via ID and aria-describedby
- **Semantic markup**: Uses proper span elements for error messaging
- **Progressive enhancement**: Works without JavaScript
- **WCAG AA compliant**: Meets accessibility standards

## Usage

```tsx
import { ErrorMessage } from '@/components/error-message';

// Basic error message with text
<ErrorMessage text="Please enter your full name" />

// Error message with HTML content for emphasis
<ErrorMessage html="Please enter a valid <strong>email address</strong>" />

// Error message with React children (most flexible)
<ErrorMessage>
  <span>Please enter your date of birth</span>
</ErrorMessage>

// Error message with custom ID for form association
<ErrorMessage
  id="full-name-error"
  text="Please enter your full name"
/>

// Error message with custom visually hidden text
<ErrorMessage
  text="NHS number must be 10 digits"
  visuallyHiddenText="Validation error"
/>

// Suppress visually hidden text entirely
<ErrorMessage
  text="Field is required"
  visuallyHiddenText=""
/>
```

## Props

### Content Props

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | Plain text error message |
| `html` | `string` | HTML error message (takes precedence over text) |
| `children` | `ReactNode` | React children (takes precedence over html/text) |

### Configuration Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | ID for the error message element (for form association) |
| `visuallyHiddenText` | `string` | `'Error'` | Visually hidden prefix for screen readers |
| `classes` | `string` | - | Additional CSS classes |
| `attributes` | `Record<string, string>` | - | Additional HTML attributes |

### Inherited Props

The component also accepts all standard HTML attributes through `BaseComponentProps`:
- `className` - CSS class names
- `data-testid` - Test identifier
- Standard HTML attributes like `role`, `aria-*`, etc.

## Content Priority

The component follows this content priority order:

1. **`children`** (React elements) - most flexible
2. **`html`** (raw HTML string) - for formatted content  
3. **`text`** (plain text) - simplest option

## Form Integration

### Basic Form Validation

```tsx
<div>
  <label htmlFor="email">Email address</label>
  <input 
    id="email" 
    type="email" 
    aria-describedby="email-error"
    aria-invalid="true"
  />
  <ErrorMessage 
    id="email-error" 
    text="Enter a valid email address" 
  />
</div>
```

### Multiple Error Messages

```tsx
<div>
  <label htmlFor="password">Password</label>
  <input 
    id="password" 
    type="password" 
    aria-describedby="password-error"
    aria-invalid="true"
  />
  <ErrorMessage 
    id="password-error" 
    html="Password must contain at least <strong>8 characters</strong>, including <strong>1 uppercase letter</strong> and <strong>1 number</strong>"
  />
</div>
```

### With Other Form Components

```tsx
// Integration with other design system components
<FormGroup hasError>
  <Label htmlFor="nhs-number">NHS number</Label>
  <Hint>Your NHS number is 10 digits, like 485 777 3456</Hint>
  <Input 
    id="nhs-number" 
    type="text"
    aria-describedby="nhs-number-error"
    hasError
  />
  <ErrorMessage 
    id="nhs-number-error" 
    text="NHS number must be 10 digits"
  />
</FormGroup>
```

## Healthcare Examples

### Patient Information Forms

```tsx
// NHS number validation
<ErrorMessage text="NHS number must be 10 digits" />

// Date of birth validation
<ErrorMessage html="Date of birth must include a <strong>day</strong>, <strong>month</strong> and <strong>year</strong>" />

// Contact information
<ErrorMessage text="Please enter a valid phone number" />

// Emergency contact
<ErrorMessage>
  <span>
    Emergency contact must be someone other than yourself
  </span>
</ErrorMessage>
```

### Appointment Booking

```tsx
// Appointment time validation
<ErrorMessage text="Please select an appointment time that is at least 24 hours in advance" />

// Appointment type selection
<ErrorMessage text="Please select the type of appointment you need" />

// Special requirements
<ErrorMessage html="Please specify any <strong>accessibility requirements</strong> or <strong>medical equipment</strong> needed" />
```

### Medical History Forms

```tsx
// Medication allergies
<ErrorMessage>
  <div>
    <p>Please provide details about your medication allergies including:</p>
    <ul>
      <li>Name of medication</li>
      <li>Type of reaction experienced</li>
      <li>Severity of reaction</li>
    </ul>
  </div>
</ErrorMessage>

// Symptoms description
<ErrorMessage text="Please describe your symptoms in detail" />

// Duration validation
<ErrorMessage text="Please specify how long you have been experiencing these symptoms" />
```

### Registration Forms

```tsx
// Address validation
<ErrorMessage text="Please enter your full address including postcode" />

// GP practice selection
<ErrorMessage text="Please select your current GP practice" />

// Insurance information
<ErrorMessage html="Please provide your <strong>insurance policy number</strong> and <strong>group number</strong>" />
```

### Authentication and Security

```tsx
// Password requirements
<ErrorMessage html="Password must contain at least <strong>8 characters</strong> with <strong>1 uppercase</strong>, <strong>1 lowercase</strong>, and <strong>1 number</strong>" />

// Account verification
<ErrorMessage text="Please check your email and enter the verification code" />

// Two-factor authentication
<ErrorMessage text="Please enter the 6-digit code from your authenticator app" />
```

### Data Validation

```tsx
// File upload errors
<ErrorMessage>
  <div>
    <p>File upload failed. Please ensure:</p>
    <ul>
      <li>File is less than 10MB</li>
      <li>File format is PDF, DOC, or JPG</li>
      <li>You have a stable internet connection</li>
    </ul>
  </div>
</ErrorMessage>

// Format validation
<ErrorMessage text="Please enter the date in DD/MM/YYYY format" />

// Range validation
<ErrorMessage text="Please enter a weight between 1kg and 300kg" />
```

## Accessibility Features

### Screen Reader Support

The component automatically includes a visually hidden "Error:" prefix that is announced by screen readers:

```tsx
// This renders visually as: "Please enter your name"
// But screen readers announce: "Error: Please enter your name"
<ErrorMessage text="Please enter your name" />
```

### Custom Screen Reader Text

```tsx
// Custom prefix for different contexts
<ErrorMessage 
  text="Password is too weak"
  visuallyHiddenText="Security warning"
/>
// Screen readers announce: "Security warning: Password is too weak"
```

### Form Association

```tsx
// Proper ARIA association with form controls
<input 
  id="email"
  aria-describedby="email-error"
  aria-invalid="true"
/>
<ErrorMessage 
  id="email-error"
  text="Please enter a valid email address"
/>
```

## Visual Design

The component uses distinctive styling:

- **Color**: Red error color (#d5281b) for high visibility
- **Typography**: Bold font weight for emphasis
- **Spacing**: Appropriate margins for visual separation
- **CSS prefix**: Automatic "Error:" prefix in CSS content
- **Responsive**: Adapts to different screen sizes

## Technical Notes

- Built with styled-components for consistent theming
- Uses semantic span elements for proper markup
- Supports server-side rendering
- Includes TypeScript definitions
- Compatible with all modern browsers
- Automatically handles empty content scenarios
- Supports custom styling and attributes

## Browser Support

Compatible with all modern browsers including:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- IE11 (with polyfills)

## Related Components

- **[Input](../input/README.md)** - Text input fields that commonly use error messages
- **[FormGroup](../form-group/README.md)** - Form container that manages error states
- **[Label](../label/README.md)** - Form labels that work with error messages
- **[Hint](../hint/README.md)** - Help text that complements error messages

## Best Practices

### Content Guidelines

1. **Be specific**: "Enter your full name" rather than "Invalid input"
2. **Be helpful**: Explain what the user needs to do to fix the error
3. **Be concise**: Keep messages brief but informative
4. **Use plain language**: Avoid technical jargon
5. **Be positive**: Focus on what to do rather than what went wrong

### Implementation Guidelines

1. **Associate with controls**: Always use `id` and `aria-describedby` for form fields
2. **Set aria-invalid**: Mark invalid fields with `aria-invalid="true"`
3. **Show immediately**: Display errors as soon as validation fails
4. **Position consistently**: Place errors in the same location relative to fields
5. **Focus management**: Consider focusing the error or the field after validation

### Error Message Patterns

```tsx
// Good: Specific and actionable
<ErrorMessage text="Enter your email address in the format name@example.com" />

// Avoid: Vague and unhelpful
<ErrorMessage text="Invalid input" />

// Good: Explains the requirement
<ErrorMessage text="Password must be at least 8 characters" />

// Avoid: Just says it's wrong
<ErrorMessage text="Password invalid" />
```

## Testing

The component includes comprehensive tests covering:
- Content rendering and priority
- Accessibility features
- Form integration
- Custom attributes and styling
- Edge cases and error states