# Input

A comprehensive form input component with label, optional hint text, error messaging, and prefix/suffix support. Supports various input types, widths, and accessibility features including proper ARIA associations. Designed for healthcare and public service websites with accessibility in mind.

Converted from the NHS UK Design System Input component for the Public Good Design System.

## Features

- **Complete form integration**: Labels, hints, and error messages with proper associations
- **Multiple input types**: Text, email, password, search, tel, url, number, date, and more
- **Flexible sizing**: Seven different width options for optimal layout
- **Prefix/suffix support**: Currency symbols, units, and contextual text
- **Accessibility first**: WCAG AA compliance with proper ARIA relationships
- **Healthcare optimized**: Examples and patterns for medical data entry
- **Validation ready**: Error states and messaging for form validation
- **Responsive design**: Works seamlessly across all device sizes

## Usage

```tsx
import { Input } from '@/components/input';

// Basic input
<Input 
  name="nhs-number"
  label={{ text: "NHS Number" }}
/>

// Input with hint
<Input 
  name="nhs-number"
  label={{ text: "NHS Number" }}
  hint={{ text: "It's a 10-digit number, for example 485 777 3456" }}
/>

// Input with error
<Input 
  name="nhs-number"
  label={{ text: "NHS Number" }}
  errorMessage={{ text: "Enter your NHS number" }}
/>

// Input with prefix and suffix
<Input 
  name="cost"
  label={{ text: "Cost per item" }}
  prefix="£"
  suffix="per item"
/>
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | The name of the input, submitted with form data |
| `label` | `LabelProps` | Options for the label component |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `name` value | The ID of the input |
| `type` | `InputType` | `'text'` | Type of input control to render |
| `inputMode` | `InputMode` | - | Input mode for mobile keyboards |
| `value` | `string` | - | Initial value of the input |
| `describedBy` | `string` | - | Element IDs for aria-describedby |
| `hint` | `HintProps` | - | Options for the hint component |
| `errorMessage` | `ErrorMessageProps` | - | Options for the error message component |
| `prefix` | `string` | - | Text displayed before the input |
| `suffix` | `string` | - | Text displayed after the input |
| `formGroup` | `FormGroupProps` | - | Additional options for the form group |
| `classes` | `string` | - | Additional CSS classes for the input |
| `autocomplete` | `string` | - | Autocomplete attribute |
| `pattern` | `string` | - | Pattern attribute for validation |
| `spellcheck` | `boolean` | - | Spellcheck attribute |
| `attributes` | `Record<string, string>` | - | Additional HTML attributes |

### Inherited Props

The component also accepts all standard HTML input attributes through `BaseComponentProps`:
- `className` - CSS class names
- `data-testid` - Test identifier  
- Standard HTML input attributes like `placeholder`, `disabled`, `required`, etc.

### Type Definitions

```tsx
interface InputProps extends BaseComponentProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type' | 'value' | 'className'> {
  id?: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  value?: string;
  describedBy?: string;
  label: LabelProps;
  hint?: HintProps;
  errorMessage?: ErrorMessageProps;
  prefix?: string;
  suffix?: string;
  formGroup?: FormGroupProps;
  classes?: string;
  autocomplete?: string;
  pattern?: string;
  spellcheck?: boolean;
  attributes?: Record<string, string>;
}

interface LabelProps {
  text?: string;
  html?: string;
  classes?: string;
  isPageHeading?: boolean;
  attributes?: Record<string, string>;
}

interface HintProps {
  text?: string;
  html?: string;
  classes?: string;
  attributes?: Record<string, string>;
}

interface ErrorMessageProps {
  text?: string;
  html?: string;
  classes?: string;
}

interface FormGroupProps {
  classes?: string;
  attributes?: Record<string, string>;
}
```

## Basic Examples

### Simple Text Input

```tsx
<Input 
  name="first-name"
  label={{ text: "First name" }}
  autocomplete="given-name"
/>
```

### Email Input

```tsx
<Input 
  name="email"
  type="email"
  label={{ text: "Email address" }}
  autocomplete="email"
  placeholder="name@example.com"
/>
```

### Password Input

```tsx
<Input 
  name="password"
  type="password"
  label={{ text: "Password" }}
  autocomplete="new-password"
/>
```

### Number Input

```tsx
<Input 
  name="age"
  type="number"
  label={{ text: "Your age" }}
  inputMode="numeric"
  min={0}
  max={150}
/>
```

## Input with Hint

### Basic Hint

```tsx
<Input 
  name="nhs-number"
  label={{ text: "NHS Number" }}
  hint={{ text: "It's a 10-digit number, for example 485 777 3456" }}
  inputMode="numeric"
  pattern="[0-9]{10}"
/>
```

### HTML Hint

```tsx
<Input 
  name="phone"
  type="tel"
  label={{ text: "Mobile phone number" }}
  hint={{ 
    html: "We'll use this to send <strong>appointment reminders</strong> by text message" 
  }}
  autocomplete="tel"
/>
```

### Complex Hint

```tsx
<Input 
  name="postcode"
  label={{ text: "Postcode" }}
  hint={{ 
    html: `
      <p>For example, SW1A 1AA</p>
      <p>We use this to find services near you</p>
    ` 
  }}
  classes="nhsuk-input--width-10"
  autocomplete="postal-code"
/>
```

## Error Handling

### Basic Error

```tsx
<Input 
  name="email"
  type="email"
  label={{ text: "Email address" }}
  errorMessage={{ text: "Enter an email address" }}
  value=""
/>
```

### Detailed Error Message

```tsx
<Input 
  name="email"
  type="email"
  label={{ text: "Email address" }}
  errorMessage={{ 
    html: "Enter an email address in the correct format, like <strong>name@example.com</strong>" 
  }}
  value="invalid-email"
/>
```

### Error with Hint

```tsx
<Input 
  name="nhs-number"
  label={{ text: "NHS Number" }}
  hint={{ text: "It's a 10-digit number, for example 485 777 3456" }}
  errorMessage={{ text: "NHS number must be 10 digits" }}
  value="12345"
/>
```

## Width Variations

The Input component supports seven different width classes for optimal layout:

### Character-based Widths

```tsx
// 2 characters wide
<Input 
  name="day"
  label={{ text: "Day" }}
  classes="nhsuk-input--width-2"
  inputMode="numeric"
/>

// 3 characters wide  
<Input 
  name="month"
  label={{ text: "Month" }}
  classes="nhsuk-input--width-3"
  inputMode="numeric"
/>

// 4 characters wide
<Input 
  name="year"
  label={{ text: "Year" }}
  classes="nhsuk-input--width-4"
  inputMode="numeric"
/>

// 5 characters wide
<Input 
  name="weight"
  label={{ text: "Weight (kg)" }}
  classes="nhsuk-input--width-5"
  type="number"
  inputMode="decimal"
/>
```

### Text-based Widths

```tsx
// 10 characters wide (postcodes, phone numbers)
<Input 
  name="postcode"
  label={{ text: "Postcode" }}
  classes="nhsuk-input--width-10"
  autocomplete="postal-code"
/>

// 20 characters wide (names, short text)
<Input 
  name="last-name"
  label={{ text: "Last name" }}
  classes="nhsuk-input--width-20"
  autocomplete="family-name"
/>

// 30 characters wide (longer text, addresses)
<Input 
  name="address-line-1"
  label={{ text: "Address line 1" }}
  classes="nhsuk-input--width-30"
  autocomplete="address-line1"
/>
```

## Prefix and Suffix

### Currency Input

```tsx
<Input 
  name="prescription-cost"
  label={{ text: "Prescription charge" }}
  prefix="£"
  type="number"
  inputMode="decimal"
  classes="nhsuk-input--width-5"
  step="0.01"
/>
```

### Unit Input

```tsx
<Input 
  name="weight"
  label={{ text: "Current weight" }}
  suffix="kg"
  type="number"
  inputMode="decimal"
  classes="nhsuk-input--width-5"
/>
```

### Complex Prefix/Suffix

```tsx
<Input 
  name="medication-cost"
  label={{ text: "Cost per prescription item" }}
  prefix="£"
  suffix="per item"
  type="number"
  inputMode="decimal"
  classes="nhsuk-input--width-5"
  hint={{ text: "Most prescriptions cost £9.65 per item" }}
/>
```

## Page Heading Labels

For forms where the input is the main focus, you can make the label a page heading:

```tsx
<Input 
  name="nhs-number"
  label={{ 
    text: "What is your NHS number?",
    isPageHeading: true,
    classes: "nhsuk-label--l"
  }}
  hint={{ text: "It's a 10-digit number, for example 485 777 3456" }}
/>
```

## Healthcare Examples

### NHS Number Input

```tsx
<Input 
  name="nhs-number"
  label={{ text: "NHS Number" }}
  hint={{ text: "It's a 10-digit number, for example 485 777 3456" }}
  type="text"
  inputMode="numeric"
  pattern="[0-9]{10}"
  autocomplete="off"
  classes="nhsuk-input--width-10"
/>
```

### Patient Email Registration

```tsx
<Input 
  name="email"
  type="email"
  label={{ text: "Email address" }}
  hint={{ 
    text: "We'll only use this to send you appointment confirmations and test results" 
  }}
  autocomplete="email"
  required
/>
```

### Emergency Contact Phone

```tsx
<Input 
  name="emergency-phone"
  type="tel"
  label={{ text: "Emergency contact phone number" }}
  hint={{ text: "Include the area code, for example 01632 960 001" }}
  inputMode="tel"
  autocomplete="tel"
  classes="nhsuk-input--width-20"
/>
```

### Date of Birth

```tsx
<Input 
  name="date-of-birth"
  label={{ text: "Date of birth" }}
  hint={{ text: "For example, 27 3 1980" }}
  type="text"
  inputMode="numeric"
  autocomplete="bday"
  pattern="[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}"
  placeholder="DD/MM/YYYY"
  classes="nhsuk-input--width-10"
/>
```

### Prescription Information

```tsx
<Input 
  name="medication-name"
  label={{ text: "Medication name" }}
  hint={{ text: "Enter the name as it appears on your prescription" }}
  autocomplete="off"
  spellcheck={false}
  classes="nhsuk-input--width-30"
/>
```

### GP Practice Search

```tsx
<Input 
  name="gp-search"
  type="search"
  label={{ text: "Find your GP practice" }}
  hint={{ text: "Search by practice name, address, or postcode" }}
  placeholder="Enter practice name or postcode"
  spellcheck={false}
  classes="nhsuk-input--width-30"
/>
```

### Medical History

```tsx
<Input 
  name="previous-conditions"
  label={{ text: "Previous medical conditions" }}
  hint={{ 
    html: "List any significant medical conditions. <strong>Do not include mental health conditions here.</strong>" 
  }}
  placeholder="For example: diabetes, asthma, heart disease"
  classes="nhsuk-input--width-30"
/>
```

### Appointment Booking

```tsx
<Input 
  name="preferred-time"
  type="time"
  label={{ text: "Preferred appointment time" }}
  hint={{ text: "Choose your preferred time between 9:00 AM and 5:00 PM" }}
  min="09:00"
  max="17:00"
  classes="nhsuk-input--width-10"
/>
```

### Insurance Information

```tsx
<Input 
  name="insurance-number"
  label={{ text: "Private insurance policy number" }}
  hint={{ text: "Found on your insurance card or policy documents" }}
  autocomplete="off"
  spellcheck={false}
  classes="nhsuk-input--width-20"
/>
```

### Dosage Information

```tsx
<Input 
  name="dosage"
  label={{ text: "Current dosage" }}
  suffix="mg"
  type="number"
  inputMode="decimal"
  classes="nhsuk-input--width-5"
  hint={{ text: "Enter the amount in milligrams" }}
  step="0.1"
/>
```

## Validation Examples

### NHS Number Validation

```tsx
<Input 
  name="nhs-number"
  label={{ text: "NHS Number" }}
  hint={{ text: "It's a 10-digit number, for example 485 777 3456" }}
  errorMessage={{ text: "NHS number must be exactly 10 digits" }}
  type="text"
  inputMode="numeric"
  pattern="[0-9]{10}"
  value="12345"
  classes="nhsuk-input--width-10"
/>
```

### Email Format Validation

```tsx
<Input 
  name="email"
  type="email"
  label={{ text: "Email address" }}
  errorMessage={{ 
    html: "Enter an email address in the correct format, like <strong>name@example.com</strong>" 
  }}
  value="invalid-email"
  autocomplete="email"
/>
```

### Required Field Validation

```tsx
<Input 
  name="first-name"
  label={{ text: "First name" }}
  errorMessage={{ text: "Enter your first name" }}
  value=""
  required
  autocomplete="given-name"
  classes="nhsuk-input--width-20"
/>
```

### Pattern Validation

```tsx
<Input 
  name="postcode"
  label={{ text: "Postcode" }}
  hint={{ text: "For example, SW1A 1AA" }}
  errorMessage={{ text: "Enter a postcode in the correct format" }}
  pattern="[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2}"
  value="INVALID"
  classes="nhsuk-input--width-10"
/>
```

### Minimum Length Validation

```tsx
<Input 
  name="password"
  type="password"
  label={{ text: "Choose a password" }}
  hint={{ text: "Must be at least 8 characters long" }}
  errorMessage={{ text: "Password must be at least 8 characters" }}
  minLength={8}
  value="123"
  autocomplete="new-password"
  classes="nhsuk-input--width-20"
/>
```

## Complex Forms

### Patient Registration Form

```tsx
<form>
  <Input 
    name="title"
    label={{ text: "Title" }}
    autocomplete="honorific-prefix"
    classes="nhsuk-input--width-5"
  />
  
  <Input 
    name="first-name"
    label={{ text: "First name" }}
    autocomplete="given-name"
    classes="nhsuk-input--width-20"
    required
  />
  
  <Input 
    name="last-name"
    label={{ text: "Last name" }}
    autocomplete="family-name"
    classes="nhsuk-input--width-20"
    required
  />
  
  <Input 
    name="date-of-birth"
    label={{ text: "Date of birth" }}
    hint={{ text: "For example, 27 3 1980" }}
    autocomplete="bday"
    classes="nhsuk-input--width-10"
    required
  />
  
  <Input 
    name="nhs-number"
    label={{ text: "NHS Number" }}
    hint={{ text: "It's a 10-digit number, for example 485 777 3456" }}
    inputMode="numeric"
    pattern="[0-9]{10}"
    classes="nhsuk-input--width-10"
  />
</form>
```

### Appointment Booking Form

```tsx
<form>
  <Input 
    name="appointment-type"
    label={{ text: "Type of appointment" }}
    hint={{ text: "For example: routine check-up, follow-up, urgent" }}
    classes="nhsuk-input--width-20"
    required
  />
  
  <Input 
    name="preferred-date"
    type="date"
    label={{ text: "Preferred date" }}
    hint={{ text: "Choose a date at least 48 hours in advance" }}
    min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
    classes="nhsuk-input--width-10"
    required
  />
  
  <Input 
    name="additional-notes"
    label={{ text: "Additional information" }}
    hint={{ text: "Any symptoms or concerns you'd like to discuss" }}
    placeholder="Optional: describe your symptoms or concerns"
    classes="nhsuk-input--width-30"
  />
</form>
```

### Medical History Form

```tsx
<form>
  <Input 
    name="current-medications"
    label={{ text: "Current medications" }}
    hint={{ 
      html: "List all medications you're currently taking. <strong>Include dosages if known.</strong>" 
    }}
    placeholder="For example: Aspirin 75mg daily, Metformin 500mg twice daily"
    classes="nhsuk-input--width-30"
  />
  
  <Input 
    name="allergies"
    label={{ text: "Known allergies" }}
    hint={{ text: "Include medications, foods, and environmental allergies" }}
    placeholder="For example: Penicillin, nuts, pollen"
    classes="nhsuk-input--width-30"
  />
  
  <Input 
    name="emergency-contact-name"
    label={{ text: "Emergency contact name" }}
    autocomplete="name"
    classes="nhsuk-input--width-20"
    required
  />
  
  <Input 
    name="emergency-contact-phone"
    type="tel"
    label={{ text: "Emergency contact phone" }}
    autocomplete="tel"
    classes="nhsuk-input--width-20"
    required
  />
</form>
```

## Accessibility Features

### ARIA Relationships

```tsx
<Input 
  name="complex-field"
  label={{ text: "Complex Field" }}
  hint={{ text: "Additional guidance" }}
  errorMessage={{ text: "Error message" }}
  describedBy="external-description"
/>

{/* The input will have aria-describedby="external-description complex-field-hint complex-field-error" */}
```

### Screen Reader Support

```tsx
<Input 
  name="required-field"
  label={{ text: "Required Field" }}
  hint={{ text: "This field is required for processing your application" }}
  required
  aria-required="true"
  attributes={{ 'aria-invalid': 'false' }}
/>
```

### Error Announcement

```tsx
<Input 
  name="validated-field"
  label={{ text: "Validated Field" }}
  errorMessage={{ text: "Please correct this field" }}
  attributes={{ 
    'aria-invalid': 'true',
    'aria-describedby': 'field-error'
  }}
/>
```

## Advanced Usage

### Controlled Component

```tsx
import { useState } from 'react';

function ControlledInput() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Validation
    if (newValue.length < 10) {
      setError('NHS number must be 10 digits');
    } else {
      setError('');
    }
  };
  
  return (
    <Input 
      name="nhs-number"
      label={{ text: "NHS Number" }}
      hint={{ text: "It's a 10-digit number, for example 485 777 3456" }}
      value={value}
      onChange={handleChange}
      errorMessage={error ? { text: error } : undefined}
      inputMode="numeric"
      pattern="[0-9]{10}"
    />
  );
}
```

### Dynamic Validation

```tsx
import { useState, useEffect } from 'react';

function ValidatedEmailInput() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (email && !email.includes('@')) {
      setIsValid(false);
      setError('Enter an email address in the correct format');
    } else {
      setIsValid(true);
      setError('');
    }
  }, [email]);
  
  return (
    <Input 
      name="email"
      type="email"
      label={{ text: "Email address" }}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      errorMessage={error ? { text: error } : undefined}
      attributes={{ 'aria-invalid': !isValid }}
      autocomplete="email"
    />
  );
}
```

### Ref Usage

```tsx
import { useRef } from 'react';

function FocusableInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return (
    <>
      <Input 
        ref={inputRef}
        name="focusable"
        label={{ text: "Focusable Input" }}
      />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
```

## Visual Design

### Typography

- **Label**: Semibold weight for clear hierarchy
- **Input text**: Regular weight for comfortable reading
- **Hint text**: Smaller size, secondary color
- **Error text**: Semibold weight, error color with icon

### Spacing

- **Label margin**: Consistent spacing below labels
- **Hint margin**: Proper separation from label and input
- **Error margin**: Clear association with input field
- **Form group margin**: Consistent spacing between form elements

### Colors

- **Default border**: Neutral border color
- **Focus border**: Primary color for clear focus indication
- **Error border**: Error color for validation states
- **Background**: Clean white background for inputs

## Browser Support

Compatible with all modern browsers including:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- IE11 (with polyfills)

## Related Components

- **[Textarea](../textarea/README.md)** - Multi-line text input
- **[DateInput](../date-input/README.md)** - Specialized date input component
- **[Checkboxes](../checkboxes/README.md)** - Multiple choice selections
- **[Button](../button/README.md)** - Form submission buttons

## Best Practices

### Content Guidelines

1. **Use clear labels**: Make labels descriptive and concise
2. **Provide helpful hints**: Guide users with examples and context
3. **Write actionable errors**: Tell users exactly what to fix
4. **Consider autocomplete**: Help users fill forms faster
5. **Use appropriate input types**: Optimize for mobile keyboards

### Accessibility Guidelines

1. **Associate labels properly**: Use htmlFor and id relationships
2. **Provide error context**: Use aria-describedby for errors
3. **Test with screen readers**: Verify all content is accessible
4. **Use semantic markup**: Proper HTML structure for assistive technologies
5. **Consider cognitive load**: Don't overwhelm users with too many fields

### Validation Guidelines

1. **Validate progressively**: Show errors as users complete fields
2. **Use client and server validation**: Ensure data integrity
3. **Provide clear feedback**: Make validation results obvious
4. **Allow error recovery**: Make it easy to fix mistakes
5. **Test edge cases**: Handle unusual but valid inputs

### Healthcare-Specific Guidelines

1. **Respect privacy**: Be careful with sensitive medical data
2. **Use medical terminology appropriately**: Define terms when needed
3. **Provide context**: Explain why information is needed
4. **Consider digital literacy**: Make forms accessible to all users
5. **Follow data protection**: Comply with GDPR and healthcare regulations

## Migration from NHS UK

The Input component maintains full compatibility with NHS UK patterns while adding modern React features:

- Same visual appearance and behavior
- Enhanced TypeScript support
- Better performance with styled-components
- Improved accessibility features
- Modern React patterns (hooks, refs)
- Comprehensive testing coverage