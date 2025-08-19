# Summary List Component

A component used to summarize information, for example, a user's responses at the end of a form. Often used for "check your answers" patterns and displaying structured data with optional action links. Converted from the NHS UK Design System to support the Public Good Design System.

## Features

- **Description List Semantics**: Uses proper `<dl>`, `<dt>`, `<dd>` HTML elements for accessibility
- **Action Links**: Optional action links for editing or changing information
- **Multiple Actions**: Support for multiple action links per row
- **Visually Hidden Text**: Accessible action link context for screen readers
- **Responsive Design**: Adapts layout for mobile devices
- **HTML Content**: Support for rich HTML content in keys and values
- **Flexible Layout**: Automatic column adjustment based on presence of actions
- **Border Controls**: Options to remove borders for cleaner layouts

## Usage

### Basic Summary List

```tsx
import { SummaryList } from '@public-good/design-system';

<SummaryList 
  rows={[
    {
      key: { text: "Name" },
      value: { text: "Sarah Philips" }
    },
    {
      key: { text: "Date of birth" },
      value: { text: "5 January 1978" }
    },
    {
      key: { text: "Contact information" },
      value: { 
        html: `72 Guild Street<br>
               London<br>
               SE23 6FH`
      }
    }
  ]}
/>
```

### With Action Links

```tsx
<SummaryList 
  rows={[
    {
      key: { text: "Name" },
      value: { text: "Sarah Philips" },
      actions: {
        items: [
          { 
            href: "/edit-name", 
            text: "Change",
            visuallyHiddenText: "name"
          }
        ]
      }
    },
    {
      key: { text: "Date of birth" },
      value: { text: "5 January 1978" },
      actions: {
        items: [
          { 
            href: "/edit-dob", 
            text: "Change",
            visuallyHiddenText: "date of birth"
          }
        ]
      }
    }
  ]}
/>
```

### Multiple Actions Per Row

```tsx
<SummaryList 
  rows={[
    {
      key: { text: "Contact details" },
      value: { 
        html: `<p>07700 900457</p>
               <p>sarah.philips@example.com</p>`
      },
      actions: {
        items: [
          { 
            href: "/add-contact", 
            text: "Add",
            visuallyHiddenText: "new contact details"
          },
          { 
            href: "/edit-contact", 
            text: "Change",
            visuallyHiddenText: "contact details"
          }
        ]
      }
    }
  ]}
/>
```

### Without Borders

```tsx
<SummaryList 
  classes="nhsuk-summary-list--no-border"
  rows={[
    {
      key: { text: "Name" },
      value: { text: "Sarah Philips" }
    },
    {
      key: { text: "Date of birth" },
      value: { text: "5 January 1978" }
    }
  ]}
/>
```

### Mixed Actions and No Actions

```tsx
<SummaryList 
  rows={[
    {
      key: { text: "Name" },
      value: { text: "Sarah Philips" },
      actions: {
        items: [
          { href: "/edit-name", text: "Change", visuallyHiddenText: "name" }
        ]
      }
    },
    {
      key: { text: "NHS number" },
      value: { text: "485 777 3456" }
      // No actions - cannot be changed
    },
    {
      key: { text: "Email" },
      value: { text: "sarah@example.com" },
      actions: {
        items: [
          { href: "/edit-email", text: "Change", visuallyHiddenText: "email address" }
        ]
      }
    }
  ]}
/>
```

## Healthcare Use Cases

### Patient Information Summary

```tsx
<SummaryList 
  rows={[
    {
      key: { text: "Patient name" },
      value: { text: "Sarah Philips" }
    },
    {
      key: { text: "NHS number" },
      value: { text: "485 777 3456" }
    },
    {
      key: { text: "Date of birth" },
      value: { text: "5 January 1978" }
    },
    {
      key: { text: "Address" },
      value: { 
        html: `72 Guild Street<br>
               London<br>
               SE23 6FH`
      },
      actions: {
        items: [
          { 
            href: "/edit-address", 
            text: "Change",
            visuallyHiddenText: "address"
          }
        ]
      }
    },
    {
      key: { text: "Contact number" },
      value: { text: "07700 900457" },
      actions: {
        items: [
          { 
            href: "/edit-phone", 
            text: "Change",
            visuallyHiddenText: "contact number"
          }
        ]
      }
    }
  ]}
/>
```

### Medical Information Summary

```tsx
<SummaryList 
  rows={[
    {
      key: { text: "Current medications" },
      value: { 
        html: `<p>Isotretinoin capsules (Roaccutane)</p>
               <p>Isotretinoin gel (Isotrex)</p>
               <p>Pepto-Bismol (bismuth subsalicylate)</p>`
      },
      actions: {
        items: [
          { 
            href: "/add-medication", 
            text: "Add",
            visuallyHiddenText: "new medication"
          },
          { 
            href: "/edit-medications", 
            text: "Change",
            visuallyHiddenText: "medications"
          }
        ]
      }
    },
    {
      key: { text: "Known allergies" },
      value: { text: "Penicillin, Shellfish" },
      actions: {
        items: [
          { 
            href: "/edit-allergies", 
            text: "Change",
            visuallyHiddenText: "allergies"
          }
        ]
      }
    },
    {
      key: { text: "Medical conditions" },
      value: { 
        html: `<p>Type 2 Diabetes</p>
               <p>Hypertension</p>`
      },
      actions: {
        items: [
          { 
            href: "/edit-conditions", 
            text: "Change",
            visuallyHiddenText: "medical conditions"
          }
        ]
      }
    }
  ]}
/>
```

### Appointment Confirmation Summary

```tsx
<SummaryList 
  rows={[
    {
      key: { text: "Appointment type" },
      value: { text: "GP consultation" }
    },
    {
      key: { text: "Date and time" },
      value: { text: "15 March 2024 at 2:30pm" },
      actions: {
        items: [
          { 
            href: "/reschedule", 
            text: "Reschedule",
            visuallyHiddenText: "appointment"
          }
        ]
      }
    },
    {
      key: { text: "Location" },
      value: { 
        html: `<p>Riverside Medical Centre</p>
               <p>123 High Street</p>
               <p>London SW1 1AA</p>`
      }
    },
    {
      key: { text: "Reason for visit" },
      value: { text: "Annual health check" },
      actions: {
        items: [
          { 
            href: "/edit-reason", 
            text: "Change",
            visuallyHiddenText: "reason for visit"
          }
        ]
      }
    }
  ]}
/>
```

### Health Assessment Check Your Answers

```tsx
<SummaryList 
  rows={[
    {
      key: { text: "Do you smoke?" },
      value: { text: "No" },
      actions: {
        items: [
          { 
            href: "/health-questions/smoking", 
            text: "Change",
            visuallyHiddenText: "smoking status"
          }
        ]
      }
    },
    {
      key: { text: "How much alcohol do you drink?" },
      value: { text: "2-3 units per week" },
      actions: {
        items: [
          { 
            href: "/health-questions/alcohol", 
            text: "Change",
            visuallyHiddenText: "alcohol consumption"
          }
        ]
      }
    },
    {
      key: { text: "Do you exercise regularly?" },
      value: { text: "Yes, 3 times per week" },
      actions: {
        items: [
          { 
            href: "/health-questions/exercise", 
            text: "Change",
            visuallyHiddenText: "exercise frequency"
          }
        ]
      }
    },
    {
      key: { text: "Any current health concerns?" },
      value: { text: "Joint pain in knees" },
      actions: {
        items: [
          { 
            href: "/health-questions/concerns", 
            text: "Change",
            visuallyHiddenText: "health concerns"
          }
        ]
      }
    }
  ]}
/>
```

### Emergency Contact Information

```tsx
<SummaryList 
  rows={[
    {
      key: { text: "Emergency contact name" },
      value: { text: "John Philips" },
      actions: {
        items: [
          { 
            href: "/edit-emergency-contact", 
            text: "Change",
            visuallyHiddenText: "emergency contact name"
          }
        ]
      }
    },
    {
      key: { text: "Relationship" },
      value: { text: "Spouse" },
      actions: {
        items: [
          { 
            href: "/edit-relationship", 
            text: "Change",
            visuallyHiddenText: "relationship"
          }
        ]
      }
    },
    {
      key: { text: "Emergency contact number" },
      value: { text: "07700 900458" },
      actions: {
        items: [
          { 
            href: "/edit-emergency-number", 
            text: "Change",
            visuallyHiddenText: "emergency contact number"
          }
        ]
      }
    },
    {
      key: { text: "Alternative contact" },
      value: { text: "Dr. Sarah Wilson - GP" },
      actions: {
        items: [
          { 
            href: "/edit-alternative-contact", 
            text: "Change",
            visuallyHiddenText: "alternative contact"
          }
        ]
      }
    }
  ]}
/>
```

## Props

### SummaryListProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `rows` | `SummaryListRow[]` | Yes | Array of rows for the summary list |
| `classes` | `string` | No | Additional CSS classes for the summary list |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes |

### SummaryListRow

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `object` | Yes | The key (label) for this row |
| `key.text` | `string` | No | Text for the key |
| `key.html` | `string` | No | HTML for the key |
| `key.classes` | `string` | No | Additional classes for the key |
| `value` | `object` | Yes | The value for this row |
| `value.text` | `string` | No | Text for the value |
| `value.html` | `string` | No | HTML for the value |
| `value.classes` | `string` | No | Additional classes for the value |
| `classes` | `string` | No | Additional classes for the row |
| `actions` | `object` | No | Action links for this row |
| `actions.items` | `SummaryListAction[]` | No | Array of action items |
| `actions.classes` | `string` | No | Additional classes for the actions |

### SummaryListAction

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `href` | `string` | Yes | The value of the link's href attribute |
| `text` | `string` | No | Text to use within the action link |
| `html` | `string` | No | HTML to use within the action link |
| `visuallyHiddenText` | `string` | No | Visually hidden text for accessibility context |

## Accessibility

The Summary List component implements comprehensive accessibility features:

- **Semantic HTML**: Uses proper description list (`<dl>`, `<dt>`, `<dd>`) elements
- **Screen Reader Support**: Properly structured content for screen readers
- **Action Context**: Visually hidden text provides context for action links
- **Keyboard Navigation**: All action links are keyboard accessible
- **Focus Management**: Clear focus indicators for interactive elements
- **ARIA Compliance**: Follows WCAG guidelines for structured content

## Styling

The component uses styled-components with design tokens:

- **Responsive Design**: Adapts from tabular layout to stacked layout on mobile
- **Flexible Layout**: Adjusts column widths based on presence of actions
- **Typography**: Consistent font weights and sizes for keys and values
- **Spacing**: Proper spacing between rows and elements
- **Borders**: Optional row borders with customization options

## CSS Classes

- `.nhsuk-summary-list` - Main summary list container
- `.nhsuk-summary-list--no-border` - Removes all row borders
- `.nhsuk-summary-list__row` - Individual row container
- `.nhsuk-summary-list__row--no-actions` - Row without actions (adjusted spacing)
- `.nhsuk-summary-list__row--no-border` - Removes border from specific row
- `.nhsuk-summary-list__key` - Key (label) element
- `.nhsuk-summary-list__value` - Value element
- `.nhsuk-summary-list__actions` - Actions container
- `.nhsuk-summary-list__actions-list` - Multiple actions list
- `.nhsuk-summary-list__actions-list-item` - Individual action list item

## Best Practices

### Action Link Context

```tsx
// ✅ Good - Provides clear context for screen readers
{
  href: "/edit-name",
  text: "Change",
  visuallyHiddenText: "name"
}

// ❌ Bad - No context for screen readers
{
  href: "/edit-name",
  text: "Change"
}
```

### Content Structure

```tsx
// ✅ Good - Clear, concise keys and values
{
  key: { text: "Date of birth" },
  value: { text: "5 January 1978" }
}

// ✅ Good - HTML for structured content
{
  key: { text: "Address" },
  value: { 
    html: `123 Main Street<br>
           London<br>
           SW1 1AA`
  }
}
```

### Mixed Action Patterns

```tsx
// ✅ Good - Some rows have actions, others don't
[
  {
    key: { text: "NHS Number" },
    value: { text: "485 777 3456" }
    // No actions - cannot be changed
  },
  {
    key: { text: "Phone" },
    value: { text: "07700 900457" },
    actions: {
      items: [{ href: "/edit", text: "Change", visuallyHiddenText: "phone number" }]
    }
  }
]
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [Button](../button/README.md) - For primary actions
- [Card](../card/README.md) - For content grouping
- [Details](../details/README.md) - For expandable content
- [Fieldset](../fieldset/README.md) - For form grouping

## Resources

- [NHS Digital Summary List Guidance](https://service-manual.nhs.uk/design-system/components/summary-list)
- [GOV.UK Summary List Pattern](https://design-system.service.gov.uk/components/summary-list/)
- [WCAG Description Lists Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)