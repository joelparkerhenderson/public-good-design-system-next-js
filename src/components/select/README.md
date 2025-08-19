# Select Component

A dropdown selection component with support for labels, hints, error messages, and accessibility features. Converted from the NHS UK Design System to support the Public Good Design System.

## Features

- **Form Integration**: Full form integration with proper labeling and validation
- **Hints and Errors**: Built-in support for hint text and error messages
- **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
- **HTML Content**: Support for rich HTML content in labels and hints
- **Disabled State**: Both entire select and individual options can be disabled
- **Controlled/Uncontrolled**: Works as both controlled and uncontrolled component
- **Custom Styling**: Support for custom classes and attributes
- **Label as Heading**: Labels can be styled as page headings

## Usage

### Basic Select

```tsx
import { Select } from '@public-good/design-system';

<Select 
  name="sort"
  label={{ text: "Sort by" }}
  items={[
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" }
  ]}
/>
```

### With Hint and Error

```tsx
<Select 
  name="location"
  label={{ text: "Choose location" }}
  hint={{ text: "This can be different to where you went before" }}
  errorMessage={{ text: "Select a location" }}
  items={[
    { value: "", text: "Choose location" },
    { value: "london", text: "London" },
    { value: "manchester", text: "Manchester" },
    { value: "birmingham", text: "Birmingham" }
  ]}
/>
```

### With Pre-selected Value

```tsx
<Select 
  name="preference"
  value="updated"
  label={{ text: "Sort by" }}
  items={[
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" }
  ]}
/>
```

### With Selected Item Property

```tsx
<Select 
  name="default-selection"
  label={{ text: "Choose option" }}
  items={[
    { value: "option1", text: "Option 1" },
    { value: "option2", text: "Option 2", selected: true },
    { value: "option3", text: "Option 3" }
  ]}
/>
```

### With Disabled Options

```tsx
<Select 
  name="services"
  label={{ text: "Available services" }}
  hint={{ text: "Some services may be temporarily unavailable" }}
  items={[
    { value: "", text: "Choose service" },
    { value: "consultation", text: "Consultation" },
    { value: "blood-test", text: "Blood test", disabled: true },
    { value: "x-ray", text: "X-ray" },
    { value: "vaccination", text: "Vaccination", disabled: true }
  ]}
/>
```

### Controlled Component

```tsx
const [selectedValue, setSelectedValue] = useState<string>('');

<Select 
  name="controlled"
  value={selectedValue}
  onChange={setSelectedValue}
  label={{ text: "Make your choice" }}
  items={[
    { value: "", text: "Select an option" },
    { value: "option1", text: "Option 1" },
    { value: "option2", text: "Option 2" }
  ]}
/>
```

### Label as Page Heading

```tsx
<Select 
  name="main-selection"
  label={{ 
    text: "Choose your preference",
    classes: "nhsuk-label--l",
    isPageHeading: true 
  }}
  items={[
    { value: "option1", text: "Option 1" },
    { value: "option2", text: "Option 2" }
  ]}
/>
```

### Options Without Values

```tsx
<Select 
  name="text-options"
  label={{ text: "Choose" }}
  items={[
    { text: "Default option" }, // Uses text as value
    { value: "specific", text: "Specific option" } // Uses provided value
  ]}
/>
```

## Healthcare Use Cases

### Hospital Selection

```tsx
<Select 
  name="hospital"
  label={{ text: "Choose your preferred hospital" }}
  hint={{ text: "Select the hospital closest to you" }}
  items={[
    { value: "", text: "Choose hospital" },
    { value: "royal-london", text: "Royal London Hospital" },
    { value: "guys", text: "Guy's Hospital" },
    { value: "st-thomas", text: "St Thomas' Hospital" },
    { value: "kings", text: "King's College Hospital" }
  ]}
/>
```

### Appointment Type Selection

```tsx
<Select 
  name="appointment-type"
  label={{ text: "Type of appointment" }}
  items={[
    { value: "", text: "Select appointment type" },
    { value: "routine", text: "Routine check-up" },
    { value: "follow-up", text: "Follow-up appointment" },
    { value: "urgent", text: "Urgent consultation" },
    { value: "specialist", text: "Specialist referral" }
  ]}
/>
```

### Priority Selection with Validation

```tsx
<Select 
  name="priority"
  label={{ text: "Urgency level" }}
  errorMessage={hasError ? { text: "Please select the urgency level" } : undefined}
  items={[
    { value: "", text: "Select urgency" },
    { value: "low", text: "Low - Routine care" },
    { value: "medium", text: "Medium - Within 2 weeks" },
    { value: "high", text: "High - Within 48 hours" },
    { value: "urgent", text: "Urgent - Same day" }
  ]}
/>
```

### GP Practice Selection

```tsx
<Select 
  name="gp-practice"
  label={{ text: "Select your GP practice" }}
  hint={{ text: "If your practice isn't listed, contact us" }}
  items={[
    { value: "", text: "Choose your GP practice" },
    { value: "central-medical", text: "Central Medical Centre" },
    { value: "park-surgery", text: "Park Surgery" },
    { value: "health-clinic", text: "Community Health Clinic" },
    { value: "family-practice", text: "Family Practice Group" }
  ]}
/>
```

### Service Availability

```tsx
<Select 
  name="service"
  label={{ text: "Available services" }}
  hint={{ text: "Services marked as unavailable are temporarily closed" }}
  items={[
    { value: "", text: "Choose service" },
    { value: "gp", text: "GP consultation" },
    { value: "nurse", text: "Nurse appointment" },
    { value: "blood-test", text: "Blood test", disabled: true },
    { value: "x-ray", text: "X-ray" },
    { value: "physiotherapy", text: "Physiotherapy", disabled: true },
    { value: "mental-health", text: "Mental health support" }
  ]}
/>
```

## Props

### SelectProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Name property for the select |
| `items` | `SelectItem[]` | Yes | Array of option items for the select |
| `id` | `string` | No | The ID of the select. Defaults to the value of name |
| `value` | `string` | No | Value for the option which should be selected (controlled) |
| `disabled` | `boolean` | No | If true, select box will be disabled |
| `describedBy` | `string` | No | Element IDs for aria-describedby |
| `label` | `LabelProps` | No | Label configuration |
| `hint` | `HintProps` | No | Hint configuration |
| `errorMessage` | `ErrorMessageProps` | No | Error message configuration |
| `formGroup` | `FormGroupProps` | No | Form group configuration |
| `classes` | `string` | No | Additional CSS classes for the select |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes |
| `onChange` | `(value: string) => void` | No | Callback when select value changes |

### SelectItem

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | Yes | Text for the option |
| `value` | `string` | No | Value for the option. Defaults to text if not provided |
| `selected` | `boolean` | No | Whether this option is selected |
| `disabled` | `boolean` | No | Whether this option is disabled |
| `attributes` | `Record<string, string>` | No | Additional attributes for the option |

### LabelProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | No | Label text content |
| `html` | `string` | No | Label HTML content |
| `classes` | `string` | No | Additional classes for the label |
| `isPageHeading` | `boolean` | No | Whether the label should be styled as a page heading |
| `attributes` | `Record<string, string>` | No | Additional attributes for the label |

### HintProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | No | Hint text content |
| `html` | `string` | No | Hint HTML content |
| `classes` | `string` | No | Additional classes for the hint |
| `attributes` | `Record<string, string>` | No | Additional attributes for the hint |

### ErrorMessageProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | No | Error message text content |
| `html` | `string` | No | Error message HTML content |
| `classes` | `string` | No | Additional classes for the error message |

### FormGroupProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `classes` | `string` | No | Additional classes for the form group |
| `attributes` | `Record<string, string>` | No | Additional attributes for the form group |

## Accessibility

The Select component implements comprehensive accessibility features:

- **ARIA Support**: Proper ARIA attributes for form controls, hints, and error messages
- **Screen Reader Support**: Descriptive content properly associated with form controls
- **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, and Space
- **Error Association**: Error messages are properly linked to the select element
- **Hint Association**: Hint text is properly associated with the select element
- **Focus Management**: Clear focus indicators and proper focus flow

## Styling

The component uses styled-components with design tokens:

- **Responsive Design**: Adapts to different screen sizes
- **Focus States**: Clear focus indicators for keyboard navigation
- **Error States**: Visual error indicators with proper color contrast
- **Disabled States**: Clear visual indication of disabled select and options
- **Custom Arrow**: Styled dropdown arrow that matches design system

## CSS Classes

- `.nhsuk-select` - Main select element
- `.nhsuk-select--error` - Error state modifier
- `.nhsuk-form-group` - Form group wrapper
- `.nhsuk-form-group--error` - Error state modifier for form group
- `.nhsuk-label` - Label element
- `.nhsuk-hint` - Hint text
- `.nhsuk-error-message` - Error message

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [Input](../input/README.md) - For text input fields
- [Radios](../radios/README.md) - For single selection from visible options
- [Checkboxes](../checkboxes/README.md) - For multiple selections
- [Label](../label/README.md) - For standalone labels
- [Hint](../hint/README.md) - For providing help text
- [ErrorMessage](../error-message/README.md) - For validation errors