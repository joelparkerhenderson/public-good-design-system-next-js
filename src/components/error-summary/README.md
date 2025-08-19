# ErrorSummary

A component for displaying a summary of validation errors at the top of a form. Provides a clear overview of all errors with links to jump to the relevant fields. Includes proper accessibility features including auto-focus and ARIA attributes.

Converted from the NHS UK Design System Error Summary component for the Public Good Design System.

## Features

- **Error overview**: Clear summary of all form validation errors in one place
- **Quick navigation**: Links to jump directly to error fields
- **Auto-focus**: Automatically focuses on mount for screen reader announcement
- **ARIA support**: Proper `role="alert"` and `aria-labelledby` attributes
- **Flexible content**: Support for text, HTML, or React children
- **Visual prominence**: Red border and high-contrast styling for visibility
- **Keyboard accessible**: Full keyboard navigation support
- **WCAG AA compliant**: Meets accessibility standards

## Usage

```tsx
import { ErrorSummary } from '@/components/error-summary';

// Basic error summary
<ErrorSummary
  titleText="There is a problem"
  errorList={[
    {
      text: "Enter your full name",
      href: "#full-name"
    },
    {
      text: "Enter a valid email address",
      href: "#email"
    }
  ]}
/>

// Error summary with description
<ErrorSummary
  titleText="There is a problem"
  descriptionText="Please fix the following errors before continuing"
  errorList={[
    {
      text: "NHS number must be 10 digits",
      href: "#nhs-number"
    }
  ]}
/>

// Error summary with HTML content
<ErrorSummary
  titleHtml="<strong>Form validation failed</strong>"
  errorList={[
    {
      html: "Date of birth must include <strong>day</strong>, <strong>month</strong> and <strong>year</strong>",
      href: "#date-of-birth"
    }
  ]}
/>

// Error summary with children description
<ErrorSummary
  titleText="There is a problem"
  errorList={[
    { text: "Select an appointment type", href: "#appointment-type" }
  ]}
>
  <p>Please review and correct the following information:</p>
</ErrorSummary>

// Without auto-focus (for dynamic updates)
<ErrorSummary
  titleText="There is a problem"
  autoFocus={false}
  errorList={[
    { text: "Please try again", href: "#retry" }
  ]}
/>
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `errorList` | `ErrorSummaryItem[]` | Array of error items to display |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `titleText` | `string` | - | Title text for the error summary |
| `titleHtml` | `string` | - | Title HTML (takes precedence over titleText) |
| `descriptionText` | `string` | - | Description text explaining the errors |
| `descriptionHtml` | `string` | - | Description HTML (takes precedence over descriptionText) |
| `children` | `ReactNode` | - | Children content for description (takes precedence over description text/html) |
| `autoFocus` | `boolean` | `true` | Whether to auto-focus the error summary on mount |
| `classes` | `string` | - | Additional CSS classes |
| `attributes` | `Record<string, string>` | - | Additional HTML attributes |

### Inherited Props

The component also accepts all standard HTML attributes through `BaseComponentProps`:
- `className` - CSS class names
- `data-testid` - Test identifier
- Standard HTML attributes like `role`, `aria-*`, etc.

### ErrorSummaryItem Type

```tsx
interface ErrorSummaryItem {
  text?: string;                    // Error text content
  html?: string;                    // Error HTML content (takes precedence over text)
  href?: string;                    // Link href for navigating to the error field
  attributes?: Record<string, string>; // Additional attributes for the error link
}
```

## Content Priority

### Title Content
1. **`titleHtml`** (raw HTML string)
2. **`titleText`** (plain text)

### Description Content
1. **`children`** (React elements) - most flexible
2. **`descriptionHtml`** (raw HTML string)
3. **`descriptionText`** (plain text)

### Error Item Content
1. **`html`** (raw HTML string)
2. **`text`** (plain text)

## Form Integration

### Complete Form Validation Example

```tsx
import { useState } from 'react';
import { ErrorSummary } from '@/components/error-summary';

function RegistrationForm() {
  const [errors, setErrors] = useState([]);

  const validateForm = (formData) => {
    const newErrors = [];
    
    if (!formData.fullName) {
      newErrors.push({
        text: "Enter your full name",
        href: "#full-name"
      });
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
      newErrors.push({
        text: "Enter a valid email address",
        href: "#email"
      });
    }
    
    if (!formData.nhsNumber || formData.nhsNumber.length !== 10) {
      newErrors.push({
        text: "NHS number must be 10 digits",
        href: "#nhs-number"
      });
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  return (
    <form>
      {errors.length > 0 && (
        <ErrorSummary
          titleText="There is a problem"
          descriptionText="Please fix the following errors to complete registration"
          errorList={errors}
        />
      )}
      
      <div>
        <label htmlFor="full-name">Full name</label>
        <input 
          id="full-name"
          type="text"
          aria-describedby={errors.find(e => e.href === '#full-name') ? 'full-name-error' : undefined}
          aria-invalid={errors.find(e => e.href === '#full-name') ? 'true' : 'false'}
        />
        {errors.find(e => e.href === '#full-name') && (
          <ErrorMessage id="full-name-error" text="Enter your full name" />
        )}
      </div>
      
      {/* Other form fields... */}
    </form>
  );
}
```

### Dynamic Error Updates

```tsx
function DynamicForm() {
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(e.target);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setShowErrors(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {showErrors && errors.length > 0 && (
        <ErrorSummary
          titleText="There is a problem"
          errorList={errors}
          autoFocus={true} // Focus when errors first appear
        />
      )}
      {/* Form fields... */}
    </form>
  );
}
```

## Healthcare Examples

### Patient Registration Form

```tsx
<ErrorSummary
  titleText="Complete your registration"
  descriptionText="Please provide the following required information"
  errorList={[
    {
      text: "Enter your NHS number",
      href: "#nhs-number"
    },
    {
      text: "Enter your date of birth",
      href: "#date-of-birth"
    },
    {
      text: "Select your GP practice",
      href: "#gp-practice"
    },
    {
      text: "Provide your home address",
      href: "#address"
    }
  ]}
/>
```

### Appointment Booking Form

```tsx
<ErrorSummary
  titleText="Complete your appointment booking"
  errorList={[
    {
      text: "Select an appointment type",
      href: "#appointment-type"
    },
    {
      text: "Choose a preferred date",
      href: "#preferred-date"
    },
    {
      html: "Provide details about your <strong>symptoms</strong> or reason for appointment",
      href: "#symptoms"
    },
    {
      text: "Confirm your contact phone number",
      href: "#phone-number"
    }
  ]}
>
  <p>Please complete all required fields to book your appointment.</p>
  <p>If you need urgent medical attention, please call 111 or visit A&E.</p>
</ErrorSummary>
```

### Medical History Form

```tsx
<ErrorSummary
  titleText="Medical information required"
  titleHtml="<strong>Medical information required</strong>"
  errorList={[
    {
      html: "List any <strong>current medications</strong> you are taking",
      href: "#current-medications"
    },
    {
      html: "Specify any known <strong>allergies</strong> or adverse reactions",
      href: "#allergies"
    },
    {
      text: "Provide details of your medical history",
      href: "#medical-history"
    },
    {
      text: "Emergency contact information is required",
      href: "#emergency-contact"
    }
  ]}
>
  <div>
    <p>Accurate medical information helps us provide the best care.</p>
    <p>All information is kept confidential and secure.</p>
  </div>
</ErrorSummary>
```

### Complex Validation Errors

```tsx
<ErrorSummary
  titleText="Please check your information"
  errorList={[
    {
      html: "Date of birth must include <strong>day</strong>, <strong>month</strong> and <strong>year</strong>",
      href: "#date-of-birth"
    },
    {
      html: "Password must contain at least <strong>8 characters</strong> with <strong>1 uppercase letter</strong> and <strong>1 number</strong>",
      href: "#password"
    },
    {
      html: "Please accept the <strong>terms and conditions</strong> and <strong>privacy policy</strong>",
      href: "#terms-conditions"
    }
  ]}
/>
```

### Insurance and Payment Form

```tsx
<ErrorSummary
  titleText="Payment information incomplete"
  descriptionText="Please provide the following details to process your payment"
  errorList={[
    {
      text: "Enter your insurance policy number",
      href: "#policy-number"
    },
    {
      text: "Provide insurance group number",
      href: "#group-number"
    },
    {
      text: "Upload a copy of your insurance card",
      href: "#insurance-card"
    },
    {
      html: "Enter a valid <strong>billing address</strong>",
      href: "#billing-address"
    }
  ]}
/>
```

### Prescription Request Form

```tsx
<ErrorSummary
  titleText="Prescription request cannot be processed"
  errorList={[
    {
      text: "Select the medication you need",
      href: "#medication-selection"
    },
    {
      text: "Specify the quantity required",
      href: "#quantity"
    },
    {
      text: "Choose your preferred pharmacy",
      href: "#pharmacy"
    },
    {
      html: "Provide the date of your <strong>last consultation</strong>",
      href: "#last-consultation"
    }
  ]}
>
  <p>Please ensure all information is accurate to avoid delays in processing your prescription.</p>
</ErrorSummary>
```

## Accessibility Features

### Screen Reader Support

- **Auto-focus**: Automatically receives focus when displayed
- **Role alert**: Announced immediately by screen readers
- **Proper headings**: H2 element for clear document structure
- **List semantics**: Proper `<ul>` and `<li>` markup
- **Link navigation**: Clear links to error fields

### Keyboard Navigation

- **Tab navigation**: All error links are keyboard accessible
- **Focus management**: Proper focus indicators
- **Skip to errors**: Quick navigation to problem fields

### ARIA Attributes

```tsx
// The component automatically includes:
<div
  role="alert"
  aria-labelledby="error-summary-title"
  tabIndex={-1}
>
  <h2 id="error-summary-title">There is a problem</h2>
  {/* Error list */}
</div>
```

## Visual Design

The component uses distinctive styling:

- **Red border**: 4px solid red border for high visibility
- **High contrast**: Red text on white background
- **Bold typography**: Bold text for error messages and title
- **Spacing**: Proper margins and padding for readability
- **Focus indicators**: Yellow outline for keyboard focus

## Technical Notes

- Built with styled-components for consistent theming
- Uses semantic HTML for accessibility
- Auto-focus implemented with useEffect and useRef
- Supports server-side rendering
- TypeScript definitions included
- Responsive design adapts to mobile screens

## Browser Support

Compatible with all modern browsers including:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- IE11 (with polyfills)

## Related Components

- **[ErrorMessage](../error-message/README.md)** - Individual field error messages
- **[FormGroup](../form-group/README.md)** - Form field containers with error states
- **[Button](../button/README.md)** - Submit buttons that trigger validation
- **[Input](../input/README.md)** - Form inputs that show validation errors

## Best Practices

### When to Use

1. **After form submission**: Show all validation errors at once
2. **Complex forms**: Forms with multiple fields and validation rules
3. **Multi-step forms**: Summary of errors before proceeding
4. **Accessibility requirements**: When WCAG compliance is essential

### Content Guidelines

1. **Clear and specific**: Each error should clearly identify the problem
2. **Actionable**: Tell users how to fix each error
3. **Consistent language**: Use the same terminology as field labels
4. **Helpful links**: Ensure href values match field IDs
5. **Prioritize errors**: List most critical errors first

### Implementation Guidelines

1. **Show on submission**: Display after form validation fails
2. **Auto-focus**: Keep auto-focus enabled for accessibility
3. **Update dynamically**: Refresh when errors change
4. **Position at top**: Place at the beginning of the form
5. **Associate with fields**: Use matching IDs and aria-describedby

### Error Message Patterns

```tsx
// Good: Specific and helpful
{
  text: "Enter your date of birth in DD/MM/YYYY format",
  href: "#date-of-birth"
}

// Avoid: Vague and unhelpful
{
  text: "Invalid date",
  href: "#date-of-birth"
}

// Good: Clear action required
{
  text: "Select your preferred appointment time",
  href: "#appointment-time"
}

// Avoid: Unclear requirement
{
  text: "Missing selection",
  href: "#appointment-time"
}
```