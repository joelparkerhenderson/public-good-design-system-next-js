# Checkboxes Component

A flexible checkbox group component with support for conditional reveals, exclusive behavior, fieldsets, hints, and error states. Provides full accessibility including proper ARIA attributes and keyboard navigation.

Converted from NHS UK Design System checkboxes component.

## Features

- **Multiple selection**: Allow users to select multiple options
- **Exclusive behavior**: "None of the above" functionality
- **Conditional reveals**: Show additional content when specific options are checked
- **Individual item hints**: Provide hints for specific checkbox options
- **Fieldset support**: Group related checkboxes with legends
- **Error states**: Visual and accessible error handling
- **Disabled items**: Support for disabled checkbox options
- **Dividers**: Visual separators between checkbox groups
- **NHS UK compatibility**: Maintains exact feature parity

## Basic Usage

```tsx
import { Checkboxes } from '@/components/checkboxes';

// Basic checkbox group
<Checkboxes
  name="nationality"
  fieldset={{
    legend: { text: "What is your nationality?" }
  }}
  items={[
    { value: "british", text: "British" },
    { value: "irish", text: "Irish" },
    { value: "other", text: "Citizen of another country" }
  ]}
/>

// With hint and error
<Checkboxes
  name="preferences"
  fieldset={{
    legend: { text: "What are your preferences?" }
  }}
  hint={{ text: "Select all that apply" }}
  errorMessage={{ text: "Please select at least one option" }}
  items={[
    { value: "option1", text: "Option 1" },
    { value: "option2", text: "Option 2" }
  ]}
/>
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute for all checkboxes |
| `items` | `CheckboxItem[]` | Array of checkbox items |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fieldset` | `FieldsetProps` | - | Fieldset configuration with legend |
| `hint` | `HintProps` | - | Overall hint for the checkbox group |
| `errorMessage` | `ErrorMessageProps` | - | Error message configuration |
| `formGroup` | `FormGroupProps` | - | Form group configuration |
| `idPrefix` | `string` | `name` value | Prefix for generated IDs |
| `values` | `string[]` | `[]` | Pre-selected values |
| `classes` | `string` | - | Additional CSS classes |
| `describedBy` | `string` | - | Additional aria-describedby IDs |
| `attributes` | `Record<string, string>` | - | Additional container attributes |
| `onChange` | `function` | - | Selection change handler |

## Interface Types

### CheckboxItem
```tsx
interface CheckboxItem {
  value: string;                    // Item value
  text?: string;                    // Item text
  html?: string;                    // Item HTML (takes precedence)
  id?: string;                      // Custom ID (auto-generated if not provided)
  name?: string;                    // Custom name (defaults to parent name)
  label?: LabelProps;               // Label configuration
  hint?: HintProps;                 // Individual item hint
  checked?: boolean;                // Pre-checked state
  disabled?: boolean;               // Disabled state
  conditional?: { html: ReactNode }; // Conditional reveal content
  divider?: string;                 // Divider text instead of checkbox
  exclusive?: boolean;              // Exclusive "none" behavior
  exclusiveGroup?: string;          // Named exclusive group
  attributes?: Record<string, string>; // Additional attributes
}
```

### FieldsetProps
```tsx
interface FieldsetProps {
  legend?: {
    text?: string;           // Legend text
    html?: string;           // Legend HTML (takes precedence)
    classes?: string;        // Additional CSS classes
    isPageHeading?: boolean; // Render as page heading
  };
  classes?: string;          // Additional fieldset classes
  attributes?: Record<string, string>; // Additional attributes
  describedBy?: string;      // Additional aria-describedby IDs
}
```

## Examples

### With Individual Item Hints
```tsx
<Checkboxes
  name="signin-method"
  fieldset={{
    legend: { text: "How do you want to sign in?" }
  }}
  items={[
    {
      value: "government-gateway",
      text: "Sign in with Government Gateway",
      hint: { 
        text: "You'll have a user ID if you've registered for Self Assessment" 
      }
    },
    {
      value: "nhsuk-login",
      text: "Sign in with NHS.UK login",
      hint: { 
        text: "You'll have an account if you've already proved your identity" 
      }
    }
  ]}
/>
```

### With Conditional Reveals
```tsx
<Checkboxes
  name="contact-preference"
  fieldset={{
    legend: { text: "How would you prefer to be contacted?" }
  }}
  items={[
    {
      value: "email",
      text: "Email",
      conditional: {
        html: (
          <Input
            name="email-address"
            label={{ text: "Email address" }}
            type="email"
            spellcheck={false}
          />
        )
      }
    },
    {
      value: "phone",
      text: "Phone",
      conditional: {
        html: (
          <Input
            name="phone-number"
            label={{ text: "Phone number" }}
            type="tel"
          />
        )
      }
    }
  ]}
/>
```

### With "None of the Above" Option
```tsx
<Checkboxes
  name="contact-methods"
  fieldset={{
    legend: { text: "How would you prefer to be contacted?" }
  }}
  items={[
    { value: "email", text: "Email" },
    { value: "phone", text: "Phone" },
    { value: "text", text: "Text message" },
    { divider: "or" },
    { 
      value: "none", 
      text: "None of the above", 
      exclusive: true 
    }
  ]}
/>
```

### Healthcare Context Examples

#### Symptom Checker
```tsx
<Checkboxes
  name="symptoms"
  fieldset={{
    legend: { text: "What symptoms are you experiencing?" }
  }}
  hint={{ text: "Select all symptoms that apply to you" }}
  items={[
    { 
      value: "fever", 
      text: "Fever or high temperature",
      hint: { text: "Temperature above 37.8°C (100°F)" }
    },
    { 
      value: "cough", 
      text: "New, continuous cough",
      hint: { text: "Coughing a lot for more than an hour" }
    },
    { 
      value: "breathing", 
      text: "Difficulty breathing",
      hint: { text: "Feeling breathless or short of breath" }
    },
    { divider: "or" },
    { 
      value: "none", 
      text: "None of these symptoms",
      exclusive: true 
    }
  ]}
  onChange={(values) => console.log('Selected symptoms:', values)}
/>
```

#### Medical History
```tsx
<Checkboxes
  name="medical-conditions"
  fieldset={{
    legend: { 
      text: "Do you have any of these medical conditions?",
      isPageHeading: true
    }
  }}
  hint={{ text: "Select all conditions that you currently have or have been diagnosed with" }}
  items={[
    { 
      value: "diabetes", 
      text: "Diabetes",
      conditional: {
        html: (
          <div>
            <RadioGroup
              name="diabetes-type"
              items={[
                { value: "type1", text: "Type 1 diabetes" },
                { value: "type2", text: "Type 2 diabetes" },
                { value: "gestational", text: "Gestational diabetes" }
              ]}
            />
          </div>
        )
      }
    },
    { 
      value: "heart-disease", 
      text: "Heart disease",
      hint: { text: "Including coronary heart disease, heart failure, or arrhythmia" }
    },
    { 
      value: "lung-disease", 
      text: "Lung disease",
      hint: { text: "Including asthma, COPD, or pulmonary fibrosis" }
    },
    { value: "kidney-disease", text: "Kidney disease" },
    { value: "liver-disease", text: "Liver disease" },
    { divider: "or" },
    { 
      value: "none", 
      text: "None of these conditions",
      exclusive: true 
    }
  ]}
/>
```

#### Medication Allergies
```tsx
<Checkboxes
  name="allergies"
  fieldset={{
    legend: { text: "Do you have any known medication allergies?" }
  }}
  errorMessage={{ text: "Please select your known allergies or 'No known allergies'" }}
  items={[
    { 
      value: "penicillin", 
      text: "Penicillin",
      conditional: {
        html: (
          <Textarea
            name="penicillin-details"
            label={{ text: "Describe your reaction to penicillin" }}
            rows={3}
          />
        )
      }
    },
    { 
      value: "aspirin", 
      text: "Aspirin or NSAIDs",
      conditional: {
        html: (
          <Textarea
            name="aspirin-details"
            label={{ text: "Describe your reaction" }}
            rows={3}
          />
        )
      }
    },
    { value: "codeine", text: "Codeine or opioids" },
    { value: "latex", text: "Latex" },
    { value: "contrast", text: "Contrast dye" },
    { divider: "or" },
    { 
      value: "none", 
      text: "No known allergies",
      exclusive: true 
    }
  ]}
/>
```

## Accessibility Features

- **ARIA labels**: Proper labeling and fieldset associations
- **Keyboard navigation**: Full keyboard accessibility
- **Screen reader support**: Descriptive content and state announcements
- **Focus management**: Clear focus indicators and logical tab order
- **Error association**: Proper error message linking
- **Conditional content**: Appropriate ARIA expanded/controls attributes

## Exclusive Behavior

The component supports exclusive checkboxes (typically "None of the above" options):

### Basic Exclusive
```tsx
{ value: "none", text: "None of the above", exclusive: true }
```

### Named Exclusive Groups
```tsx
// All items in the same exclusive group
items={[
  { value: "option1", text: "Option 1", exclusiveGroup: "preferences" },
  { value: "option2", text: "Option 2", exclusiveGroup: "preferences" },
  { value: "none", text: "None", exclusive: true, exclusiveGroup: "preferences" }
]}
```

## Conditional Reveals

Conditional content is shown/hidden based on checkbox state:

```tsx
{
  value: "email",
  text: "Email",
  conditional: {
    html: <Input name="email" label={{ text: "Email address" }} />
  }
}
```

Features:
- Automatic show/hide based on checkbox state
- ARIA expanded/controls attributes
- Smooth transitions
- Nested form controls support

## Styling

The component uses styled-components with design tokens:
- NHS-compliant styling and spacing
- Custom checkbox appearance with checkmarks
- Error state styling with red borders
- Focus states with yellow outlines
- Responsive conditional reveal positioning

## Testing

Comprehensive test coverage includes:
- Basic checkbox functionality
- Multiple selection behavior
- Exclusive checkbox logic
- Conditional reveal functionality
- Fieldset and legend handling
- Accessibility compliance
- Error state management
- Individual item hints
- Custom attributes and styling

## Browser Support

- Modern browsers with JavaScript enabled
- Graceful degradation without JavaScript
- Screen reader compatibility
- Mobile device optimization
- Touch interaction support