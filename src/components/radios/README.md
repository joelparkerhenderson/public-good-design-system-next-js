# Radios Component

A comprehensive radio button group component with support for fieldsets, hints, error messages, inline layout, dividers, conditional content, and accessibility features. Converted from the NHS UK Design System to support the Public Good Design System.

## Features

- **Fieldset Support**: Optional fieldset wrapper with legends for grouping related radio buttons
- **Hints and Errors**: Built-in support for hint text and error messages
- **Conditional Content**: Show/hide additional content based on radio selection
- **Inline Layout**: Responsive inline arrangement of radio buttons
- **Dividers**: Visual separators between radio groups
- **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
- **HTML Content**: Support for rich HTML content in labels and hints
- **Disabled State**: Individual radio buttons can be disabled
- **Controlled/Uncontrolled**: Works as both controlled and uncontrolled component

## Usage

### Basic Radio Group

```tsx
import { Radios } from '@public-good/design-system';

<Radios 
  name="changed-name"
  fieldset={{
    legend: { text: "Have you changed your name?" }
  }}
  items={[
    { value: "yes", text: "Yes" },
    { value: "no", text: "No" }
  ]}
/>
```

### With Hint and Error

```tsx
<Radios 
  name="contact-preference"
  fieldset={{
    legend: { text: "How would you prefer to be contacted?" }
  }}
  hint={{ text: "Select one option" }}
  errorMessage={{ text: "Select how you prefer to be contacted" }}
  items={[
    { value: "email", text: "Email" },
    { value: "phone", text: "Phone" },
    { value: "post", text: "Post" }
  ]}
/>
```

### Inline Layout

```tsx
<Radios 
  name="preference"
  classes="nhsuk-radios--inline"
  fieldset={{
    legend: { text: "Do you agree?" }
  }}
  items={[
    { value: "yes", text: "Yes" },
    { value: "no", text: "No" }
  ]}
/>
```

### With Individual Hints

```tsx
<Radios 
  name="appointment-type"
  fieldset={{
    legend: { text: "What type of appointment do you need?" }
  }}
  items={[
    { 
      value: "routine", 
      text: "Routine appointment",
      hint: { text: "For regular check-ups and non-urgent issues" }
    },
    { 
      value: "urgent", 
      text: "Urgent appointment",
      hint: { text: "For issues that need attention within 48 hours" }
    },
    { 
      value: "emergency", 
      text: "Emergency",
      hint: { text: "For life-threatening conditions - call 999" }
    }
  ]}
/>
```

### With Dividers

```tsx
<Radios 
  name="signin"
  fieldset={{
    legend: { text: "How do you want to sign in?" }
  }}
  items={[
    { value: "gateway", text: "Government Gateway" },
    { value: "nhs", text: "NHS.UK login" },
    { divider: "or" },
    { value: "create", text: "Create an account" }
  ]}
/>
```

### With Conditional Content

```tsx
<Radios 
  name="contact"
  value="email"
  fieldset={{
    legend: { text: "How would you prefer to be contacted?" }
  }}
  items={[
    { 
      value: "email", 
      text: "Email",
      conditional: {
        html: '<label for="email">Email address</label><input id="email" name="email" type="email" />'
      }
    },
    { 
      value: "phone", 
      text: "Phone",
      conditional: {
        children: (
          <div>
            <label htmlFor="phone-input">Phone number</label>
            <input id="phone-input" name="phone" type="tel" />
          </div>
        )
      }
    }
  ]}
/>
```

### Controlled Component

```tsx
const [selectedValue, setSelectedValue] = useState<string>();

<Radios 
  name="controlled"
  value={selectedValue}
  onChange={setSelectedValue}
  fieldset={{
    legend: { text: "Make your choice" }
  }}
  items={[
    { value: "option1", text: "Option 1" },
    { value: "option2", text: "Option 2" }
  ]}
/>
```

## Healthcare Use Cases

### Patient Consent

```tsx
<Radios 
  name="consent"
  fieldset={{
    legend: { text: "Do you consent to treatment?" }
  }}
  items={[
    { value: "yes", text: "Yes, I consent to treatment" },
    { value: "no", text: "No, I do not consent" }
  ]}
/>
```

### Gender Selection

```tsx
<Radios 
  name="gender"
  fieldset={{
    legend: { text: "What is your gender?" }
  }}
  hint={{ text: "This is used for medical purposes only" }}
  items={[
    { value: "female", text: "Female" },
    { value: "male", text: "Male" },
    { value: "other", text: "Other" },
    { value: "prefer-not-to-say", text: "Prefer not to say" }
  ]}
/>
```

### Contact Preferences with Validation

```tsx
<Radios 
  name="contact-preference"
  value="email"
  fieldset={{
    legend: { text: "How should we contact you about your appointment?" }
  }}
  errorMessage={hasError ? { text: "Please select how you'd like to be contacted" } : undefined}
  items={[
    { 
      value: "email", 
      text: "Email",
      conditional: {
        children: (
          <div>
            <label htmlFor="email-address">Email address</label>
            <input 
              id="email-address" 
              type="email" 
              required 
              aria-describedby="email-hint"
            />
            <div id="email-hint">We'll only use this to contact you about your appointment</div>
          </div>
        )
      }
    },
    { 
      value: "phone", 
      text: "Phone call",
      conditional: {
        children: (
          <div>
            <label htmlFor="phone-number">Phone number</label>
            <input 
              id="phone-number" 
              type="tel" 
              required 
              aria-describedby="phone-hint"
            />
            <div id="phone-hint">We'll call you on this number</div>
          </div>
        )
      }
    },
    { 
      value: "text", 
      text: "Text message",
      conditional: {
        children: (
          <div>
            <label htmlFor="mobile-number">Mobile number</label>
            <input 
              id="mobile-number" 
              type="tel" 
              required 
              aria-describedby="mobile-hint"
            />
            <div id="mobile-hint">Standard message rates apply</div>
          </div>
        )
      }
    }
  ]}
/>
```

## Props

### RadiosProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Name attribute for all radio inputs |
| `items` | `RadioItem[]` | Yes | Array of radio items |
| `value` | `string` | No | Current selected value (controlled) |
| `idPrefix` | `string` | No | String to prefix IDs for each radio item |
| `fieldset` | `FieldsetProps` | No | Fieldset configuration |
| `hint` | `HintProps` | No | Hint configuration |
| `errorMessage` | `ErrorMessageProps` | No | Error message configuration |
| `formGroup` | `FormGroupProps` | No | Form group configuration |
| `classes` | `string` | No | Additional CSS classes for the radios container |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes |
| `onChange` | `(value: string) => void` | No | Callback when radio selection changes |

### RadioItem

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | Yes | Value for the radio input |
| `text` | `string` | No | Text content for the radio label |
| `html` | `string` | No | HTML content for the radio label (takes precedence over text) |
| `id` | `string` | No | Unique ID for this radio item |
| `checked` | `boolean` | No | Whether this radio is checked |
| `disabled` | `boolean` | No | Whether this radio is disabled |
| `hint` | `object` | No | Hint text for this radio item |
| `label` | `object` | No | Label configuration for this radio item |
| `divider` | `string` | No | Divider text (creates a separator instead of a radio) |
| `conditional` | `object` | No | Conditional content to show when this radio is selected |
| `attributes` | `Record<string, string>` | No | Additional attributes for this radio input |

### FieldsetProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `legend` | `object` | No | Legend configuration |
| `legend.text` | `string` | No | Legend text content |
| `legend.html` | `string` | No | Legend HTML content |
| `legend.classes` | `string` | No | Additional classes for the legend |
| `legend.isPageHeading` | `boolean` | No | Whether the legend should be styled as a page heading |
| `legend.attributes` | `Record<string, string>` | No | Additional attributes for the legend |
| `describedBy` | `string` | No | Element IDs for aria-describedby |
| `classes` | `string` | No | Additional classes for the fieldset |
| `attributes` | `Record<string, string>` | No | Additional attributes for the fieldset |

## Accessibility

The Radios component implements comprehensive accessibility features:

- **ARIA Support**: Proper ARIA attributes for fieldsets, hints, and error messages
- **Screen Reader Support**: Descriptive content properly associated with form controls
- **Keyboard Navigation**: Full keyboard support with proper focus management
- **Error Association**: Error messages are properly linked to the radio group
- **Hint Association**: Hint text is properly associated with relevant form controls
- **Conditional Content**: Proper ARIA controls and expanded states for conditional content

## Styling

The component uses styled-components with design tokens:

- **Responsive Design**: Inline layout adapts to mobile screens
- **Focus States**: Clear focus indicators for keyboard navigation
- **Error States**: Visual error indicators with proper color contrast
- **Disabled States**: Clear visual indication of disabled items
- **Conditional Content**: Smooth transitions and proper visual hierarchy

## CSS Classes

- `.nhsuk-radios` - Main radios container
- `.nhsuk-radios--inline` - Inline layout modifier
- `.nhsuk-radios--conditional` - Applied when conditional content exists
- `.nhsuk-radios__item` - Individual radio item container
- `.nhsuk-radios__input` - Radio input element
- `.nhsuk-radios__label` - Radio label element
- `.nhsuk-radios__hint` - Individual radio hint text
- `.nhsuk-radios__divider` - Divider element
- `.nhsuk-radios__conditional` - Conditional content container
- `.nhsuk-radios__conditional--hidden` - Hidden conditional content
- `.nhsuk-form-group` - Form group wrapper
- `.nhsuk-form-group--error` - Error state modifier

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [Checkboxes](../checkboxes/README.md) - For multiple selections
- [Fieldset](../fieldset/README.md) - For grouping form controls
- [Hint](../hint/README.md) - For providing help text
- [ErrorMessage](../error-message/README.md) - For validation errors