# DateInput Component

A compound date input component for collecting day, month, and year values. Provides flexible configuration with proper accessibility, fieldset grouping, and error handling. Supports custom layouts and autocomplete attributes.

Converted from NHS UK Design System date-input component.

## Features

- **Flexible layouts**: Default day/month/year or custom combinations
- **Accessibility**: Proper fieldset grouping with ARIA attributes
- **Custom labeling**: Override default labels or use auto-capitalization
- **Error handling**: Individual field error styling and overall error messages
- **Autocomplete support**: Full autocomplete attribute support for better UX
- **Pattern validation**: Custom pattern attributes for input validation
- **Name prefixes**: Support for nested form data structures
- **NHS UK compatibility**: Maintains exact feature parity

## Basic Usage

```tsx
import { DateInput } from '@/components/date-input';

// Basic date of birth input
<DateInput
  id="dob"
  fieldset={{
    legend: { text: "What is your date of birth?" }
  }}
  hint={{ text: "For example, 31 3 1980" }}
/>

// With pre-filled values
<DateInput
  id="birth-date"
  fieldset={{
    legend: { text: "Date of birth" }
  }}
  values={{ day: "15", month: "06", year: "1990" }}
/>
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Component ID used for generating input IDs |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `namePrefix` | `string` | - | Prefix for input names (e.g., "user[birthday]") |
| `items` | `DateInputItem[]` | Day/Month/Year | Custom input configuration |
| `fieldset` | `FieldsetProps` | - | Fieldset configuration with legend |
| `hint` | `HintProps` | - | Hint text for the entire group |
| `errorMessage` | `ErrorMessageProps` | - | Error message configuration |
| `formGroup` | `FormGroupProps` | - | Form group configuration |
| `values` | `DateValues` | `{}` | Initial values for day/month/year |
| `classes` | `string` | - | Additional CSS classes |
| `attributes` | `Record<string, string>` | - | Additional container attributes |
| `onChange` | `function` | - | Change handler `(name, value) => void` |
| `onBlur` | `function` | - | Blur handler `(name, value) => void` |
| `onFocus` | `function` | - | Focus handler `(name, value) => void` |

## Interface Types

### DateInputItem
```tsx
interface DateInputItem {
  id?: string;                          // Custom ID (auto-generated if not provided)
  name: string;                         // Input name
  label?: string;                       // Custom label (defaults to capitalized name)
  inputmode?: string;                   // Input mode (defaults to "numeric")
  value?: string;                       // Initial value
  autocomplete?: string;                // Autocomplete attribute
  pattern?: string;                     // Pattern attribute for validation
  classes?: string;                     // Additional CSS classes
  attributes?: Record<string, string>;  // Additional attributes
}
```

### DateValues
```tsx
interface DateValues {
  day?: string;
  month?: string;
  year?: string;
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

### Custom Layout (Month and Year Only)
```tsx
<DateInput
  id="start-date"
  fieldset={{
    legend: { text: "When did you start your job?" }
  }}
  hint={{ text: "For example, 11 2023" }}
  items={[
    { name: "month", classes: "width-2" },
    { name: "year", classes: "width-4" }
  ]}
/>
```

### With Autocomplete for Better UX
```tsx
<DateInput
  id="birth-date"
  fieldset={{
    legend: { text: "Date of birth" }
  }}
  hint={{ text: "For example, 31 3 1980" }}
  items={[
    { 
      name: "day", 
      classes: "width-2", 
      autocomplete: "bday-day" 
    },
    { 
      name: "month", 
      classes: "width-2", 
      autocomplete: "bday-month" 
    },
    { 
      name: "year", 
      classes: "width-4", 
      autocomplete: "bday-year" 
    }
  ]}
/>
```

### With Error Handling
```tsx
<DateInput
  id="dob"
  fieldset={{
    legend: { text: "What is your date of birth?" }
  }}
  hint={{ text: "For example, 31 3 1980" }}
  errorMessage={{ text: "Enter a valid date of birth" }}
  items={[
    { name: "day", classes: "width-2 error" },    // Error styling
    { name: "month", classes: "width-2 error" },  // Error styling
    { name: "year", classes: "width-4" }          // No error
  ]}
/>
```

### With Name Prefix for Nested Data
```tsx
<DateInput
  id="user-dob"
  namePrefix="user"
  fieldset={{
    legend: { text: "Date of birth" }
  }}
  // Results in names: user[day], user[month], user[year]
/>
```

### Healthcare Context Examples

#### Appointment Booking
```tsx
<DateInput
  id="appointment-date"
  fieldset={{
    legend: { 
      text: "When would you like your appointment?",
      isPageHeading: true
    }
  }}
  hint={{ text: "Choose a date at least 48 hours from now" }}
  items={[
    { 
      name: "day", 
      classes: "width-2",
      pattern: "[0-9]{1,2}",
      autocomplete: "off"
    },
    { 
      name: "month", 
      classes: "width-2",
      pattern: "[0-9]{1,2}",
      autocomplete: "off"
    },
    { 
      name: "year", 
      classes: "width-4",
      pattern: "[0-9]{4}",
      autocomplete: "off"
    }
  ]}
  onChange={(name, value) => {
    console.log(`Date field ${name} changed to:`, value);
    // Validate appointment date availability
  }}
/>
```

#### Medical History
```tsx
<DateInput
  id="symptom-start"
  fieldset={{
    legend: { text: "When did your symptoms start?" }
  }}
  hint={{ text: "If you're not sure of the exact date, give your best estimate" }}
  items={[
    { 
      name: "day", 
      label: "Day",
      classes: "width-2",
      autocomplete: "off"
    },
    { 
      name: "month", 
      label: "Month", 
      classes: "width-2",
      autocomplete: "off"
    },
    { 
      name: "year", 
      label: "Year",
      classes: "width-4",
      autocomplete: "off"
    }
  ]}
  errorMessage={{ text: "Enter the date your symptoms started" }}
/>
```

#### Prescription Information
```tsx
<DateInput
  id="medication-start"
  namePrefix="prescription"
  fieldset={{
    legend: { text: "When did you start taking this medication?" }
  }}
  hint={{ text: "Check the date on your prescription or medication packaging" }}
  items={[
    { name: "month", label: "Month", classes: "width-2" },
    { name: "year", label: "Year", classes: "width-4" }
  ]}
  onChange={(name, value) => {
    // Track medication duration
    console.log(`Medication ${name}:`, value);
  }}
/>
```

#### Surgery Date
```tsx
<DateInput
  id="surgery-date"
  fieldset={{
    legend: { text: "When was your surgery?" }
  }}
  hint={{ 
    html: "If you're not sure, check your <strong>discharge summary</strong> or contact the hospital" 
  }}
  values={{ month: "03", year: "2023" }}
  items={[
    { name: "month", classes: "width-2" },
    { name: "year", classes: "width-4" }
  ]}
  errorMessage={{ text: "Surgery date is required for your medical record" }}
/>
```

## Width Classes

The component includes utility classes for input sizing:

- `width-2`: 5rem width (suitable for day/month)
- `width-4`: 7rem width (suitable for year)

Custom widths can be applied via the `classes` prop on individual items.

## Accessibility Features

- **Fieldset grouping**: Proper semantic grouping with legends
- **ARIA attributes**: Comprehensive describedby associations
- **Label association**: Each input properly labeled
- **Keyboard navigation**: Full keyboard accessibility
- **Screen reader support**: Descriptive legends and error messages
- **Focus management**: Clear focus indicators and logical tab order
- **Error association**: Proper error message linking

## Form Integration

### Basic Form Handling
```tsx
const [formData, setFormData] = useState({
  day: '',
  month: '',
  year: ''
});

const handleDateChange = (name: string, value: string) => {
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

<DateInput
  id="birth-date"
  fieldset={{ legend: { text: "Date of birth" } }}
  onChange={handleDateChange}
  values={formData}
/>
```

### With Form Validation
```tsx
const [errors, setErrors] = useState<Record<string, string>>({});

const validateDate = (day: string, month: string, year: string) => {
  const newErrors: Record<string, string> = {};
  
  if (!day || !month || !year) {
    newErrors.date = "Enter a complete date";
  } else {
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (date.getDate() != parseInt(day)) {
      newErrors.date = "Enter a valid date";
    }
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

<DateInput
  id="valid-date"
  fieldset={{ legend: { text: "Date of birth" } }}
  errorMessage={errors.date ? { text: errors.date } : undefined}
  onChange={(name, value) => {
    // Update form data and validate
    handleDateChange(name, value);
    if (formData.day && formData.month && formData.year) {
      validateDate(formData.day, formData.month, formData.year);
    }
  }}
/>
```

## Styling

The component uses styled-components with design tokens:
- Consistent NHS-compliant typography and spacing
- Responsive width classes with mobile optimization
- Error state styling with red borders
- Focus states with yellow outlines
- Proper label positioning and spacing

## Testing

Comprehensive test coverage includes:
- Basic rendering and ID generation
- Custom item configuration
- Value handling and display
- Fieldset and legend functionality
- Hint and error message display
- Event handler verification
- Accessibility compliance
- Custom attributes and styling

## Browser Support

- Modern browsers with JavaScript enabled
- Mobile device optimization with responsive inputs
- Screen reader compatibility
- Touch interaction support
- Progressive enhancement principles