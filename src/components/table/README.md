# Table Component

A component for presenting information in a structured, scannable format. Tables can show relationships between different types of data, such as medical dosages, opening hours, or symptom comparisons. Converted from the NHS UK Design System to support the Public Good Design System.

## Features

- **Semantic HTML**: Uses proper table elements (`<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`) for accessibility
- **Responsive Design**: Optional responsive mode that stacks table data on mobile devices
- **Caption Support**: Configurable table captions with styling options
- **Panel Mode**: Optional panel wrapper with heading for grouped content
- **Numeric Formatting**: Special formatting for numeric data with right alignment
- **Row/Column Headers**: Flexible header options including first column as headers
- **Cell Spans**: Support for colspan and rowspan attributes
- **HTML Content**: Support for rich HTML content in cells and headers
- **Custom Styling**: Extensive CSS class and attribute customization options
- **Accessibility First**: Full ARIA support and keyboard navigation

## Usage

### Basic Table

```tsx
import { Table } from '@public-good/design-system';

<Table 
  caption="Skin symptoms and possible causes"
  head={[
    { text: "Skin symptoms" },
    { text: "Possible cause" }
  ]}
  rows={[
    [
      { text: "Blisters on lips or around the mouth" },
      { text: "cold sores" }
    ],
    [
      { text: "Itchy, dry, cracked, sore" },
      { text: "eczema" }
    ],
    [
      { text: "Itchy blisters" },
      { text: "shingles, chickenpox" }
    ]
  ]}
/>
```

### Responsive Table (Medical Dosages)

```tsx
<Table 
  caption="Ibuprofen syrup dosages for children"
  responsive={true}
  head={[
    { text: "Age", classes: "nhsuk-u-width-one-half" },
    { text: "How much?", classes: "nhsuk-u-width-one-quarter" },
    { text: "How often?", classes: "nhsuk-u-width-one-quarter" }
  ]}
  rows={[
    [
      { 
        header: "Age", 
        text: "3 to 5 months (weighing more than 5kg)" 
      },
      { 
        header: "How much?", 
        text: "2.5ml" 
      },
      { 
        header: "How often?", 
        text: "Max 3 times in 24 hours" 
      }
    ],
    [
      { 
        header: "Age", 
        text: "6 to 11 months" 
      },
      { 
        header: "How much?", 
        text: "2.5ml" 
      },
      { 
        header: "How often?", 
        text: "Max 3 to 4 times in 24 hours" 
      }
    ]
  ]}
/>
```

### Table with First Cell as Header (Opening Hours)

```tsx
<Table 
  firstCellIsHeader={true}
  head={[
    { text: "Day of the week" },
    { text: "Opening hours" }
  ]}
  rows={[
    [
      { text: "Monday" },
      { text: "9am to 6pm" }
    ],
    [
      { text: "Tuesday" },
      { text: "9am to 6pm" }
    ],
    [
      { text: "Saturday" },
      { text: "9am to 1pm" }
    ],
    [
      { text: "Sunday" },
      { text: "Closed" }
    ]
  ]}
/>
```

### Table with Numeric Formatting

```tsx
<Table 
  caption="Laboratory Results"
  head={[
    { text: "Test" },
    { text: "Result", format: "numeric" },
    { text: "Reference Range", format: "numeric" }
  ]}
  rows={[
    [
      { text: "Glucose" },
      { text: "95", format: "numeric" },
      { text: "70-100", format: "numeric" }
    ],
    [
      { text: "Cholesterol" },
      { text: "185", format: "numeric" },
      { text: "<200", format: "numeric" }
    ]
  ]}
/>
```

### Table with HTML Content and Action Links

```tsx
<Table 
  caption="Users"
  head={[
    { text: "Name" },
    { text: "Email address" },
    { text: "Status" },
    { html: '<span class="nhsuk-u-visually-hidden">Actions</span>' }
  ]}
  rows={[
    [
      { 
        text: "Stephanie Meyer", 
        classes: "nhsuk-u-text-break-word" 
      },
      { 
        text: "stephanie.meyer9@test.com", 
        classes: "nhsuk-u-text-break-word" 
      },
      { text: "Active" },
      { 
        html: '<a href="#">Change <span class="nhsuk-u-visually-hidden">status for Stephanie Meyer</span></a>' 
      }
    ]
  ]}
/>
```

### Table with Cell Spans

```tsx
<Table 
  head={[
    { text: "Patient Info", colspan: 2 },
    { text: "Status" }
  ]}
  rows={[
    [
      { text: "Patient ID", rowspan: 2 },
      { text: "Name" },
      { text: "Active" }
    ],
    [
      { text: "DOB" },
      { text: "Pending" }
    ]
  ]}
/>
```

### Table in Panel Mode

```tsx
<Table 
  panel={true}
  heading="Conditions similar to impetigo"
  headingLevel={2}
  caption="Other possible causes of your symptoms"
  captionClasses="nhsuk-u-visually-hidden"
  head={[
    { text: "Symptoms" },
    { text: "Possible cause" }
  ]}
  rows={[
    [
      { text: "Blisters on lips or around the mouth" },
      { text: "cold sores" }
    ],
    [
      { text: "Itchy, dry, cracked, sore" },
      { text: "eczema" }
    ]
  ]}
/>
```

### Table without Headers

```tsx
<Table 
  rows={[
    [
      { text: "Morning" },
      { text: "8:00 AM - 12:00 PM" }
    ],
    [
      { text: "Afternoon" },
      { text: "1:00 PM - 5:00 PM" }
    ]
  ]}
/>
```

## Healthcare Use Cases

### Patient Information Summary

```tsx
<Table 
  caption="Patient Demographics"
  head={[
    { text: "Field" },
    { text: "Value" }
  ]}
  rows={[
    [
      { text: "Patient ID" },
      { text: "NHS123456789" }
    ],
    [
      { text: "Full Name" },
      { text: "Sarah Elizabeth Phillips" }
    ],
    [
      { text: "Date of Birth" },
      { text: "15 January 1978" }
    ],
    [
      { text: "Address" },
      { 
        html: `123 Main Street<br>
               London<br>
               SW1A 1AA` 
      }
    ]
  ]}
/>
```

### Medication Schedule

```tsx
<Table 
  caption="Daily Medication Schedule"
  responsive={true}
  head={[
    { text: "Time" },
    { text: "Medication" },
    { text: "Dosage" },
    { text: "Instructions" }
  ]}
  rows={[
    [
      { header: "Time", text: "8:00 AM" },
      { header: "Medication", text: "Metformin" },
      { header: "Dosage", text: "500mg", format: "numeric" },
      { header: "Instructions", text: "Take with food" }
    ],
    [
      { header: "Time", text: "12:00 PM" },
      { header: "Medication", text: "Lisinopril" },
      { header: "Dosage", text: "10mg", format: "numeric" },
      { header: "Instructions", text: "Take with water" }
    ],
    [
      { header: "Time", text: "6:00 PM" },
      { header: "Medication", text: "Metformin" },
      { header: "Dosage", text: "500mg", format: "numeric" },
      { header: "Instructions", text: "Take with food" }
    ]
  ]}
/>
```

### Vital Signs Tracking

```tsx
<Table 
  caption="Recent Vital Signs"
  head={[
    { text: "Date" },
    { text: "Blood Pressure", format: "numeric" },
    { text: "Heart Rate", format: "numeric" },
    { text: "Temperature", format: "numeric" },
    { text: "Status" }
  ]}
  rows={[
    [
      { text: "2024-01-15" },
      { text: "120/80", format: "numeric" },
      { text: "72", format: "numeric" },
      { text: "98.6°F", format: "numeric" },
      { text: "Normal" }
    ],
    [
      { text: "2024-01-14" },
      { text: "118/75", format: "numeric" },
      { text: "68", format: "numeric" },
      { text: "98.4°F", format: "numeric" },
      { text: "Normal" }
    ]
  ]}
/>
```

### Lab Results Comparison

```tsx
<Table 
  caption="Blood Chemistry Panel Results"
  head={[
    { text: "Test" },
    { text: "Current", format: "numeric" },
    { text: "Previous", format: "numeric" },
    { text: "Reference Range" },
    { text: "Status" }
  ]}
  rows={[
    [
      { text: "Glucose (mg/dL)" },
      { text: "95", format: "numeric" },
      { text: "102", format: "numeric" },
      { text: "70-100" },
      { text: "✓ Normal" }
    ],
    [
      { text: "Cholesterol (mg/dL)" },
      { text: "185", format: "numeric" },
      { text: "195", format: "numeric" },
      { text: "<200" },
      { text: "✓ Normal" }
    ],
    [
      { text: "HbA1c (%)" },
      { text: "6.8", format: "numeric" },
      { text: "7.2", format: "numeric" },
      { text: "<7.0" },
      { text: "⚠ Elevated" }
    ]
  ]}
/>
```

### Appointment Schedule

```tsx
<Table 
  caption="This Week's Appointments"
  firstCellIsHeader={true}
  head={[
    { text: "Day/Time" },
    { text: "Patient" },
    { text: "Type" },
    { text: "Duration" }
  ]}
  rows={[
    [
      { text: "Mon 9:00 AM" },
      { text: "Sarah Phillips" },
      { text: "Annual Checkup" },
      { text: "30 min" }
    ],
    [
      { text: "Mon 10:00 AM" },
      { text: "John Smith" },
      { text: "Follow-up" },
      { text: "15 min" }
    ],
    [
      { text: "Tue 2:00 PM" },
      { text: "Mary Johnson" },
      { text: "Consultation" },
      { text: "45 min" }
    ]
  ]}
/>
```

### Treatment Options Comparison

```tsx
<Table 
  panel={true}
  heading="Treatment Options for Type 2 Diabetes"
  caption="Comparison of available treatments"
  head={[
    { text: "Treatment" },
    { text: "Effectiveness" },
    { text: "Side Effects" },
    { text: "Cost" }
  ]}
  rows={[
    [
      { text: "Lifestyle changes" },
      { text: "Moderate" },
      { text: "None" },
      { text: "Low" }
    ],
    [
      { text: "Metformin" },
      { text: "High" },
      { text: "Mild GI upset" },
      { text: "Low" }
    ],
    [
      { text: "Insulin therapy" },
      { text: "Very High" },
      { text: "Weight gain, hypoglycemia" },
      { text: "Moderate" }
    ]
  ]}
/>
```

### Emergency Contact Information

```tsx
<Table 
  caption="Emergency Contacts"
  head={[
    { text: "Contact Type" },
    { text: "Name" },
    { text: "Relationship" },
    { text: "Phone Number" },
    { text: "Available Hours" }
  ]}
  rows={[
    [
      { text: "Primary" },
      { text: "John Phillips" },
      { text: "Spouse" },
      { text: "07700 900457" },
      { text: "24/7" }
    ],
    [
      { text: "Secondary" },
      { text: "Dr. Sarah Wilson" },
      { text: "GP" },
      { text: "020 7946 0123" },
      { text: "8 AM - 6 PM" }
    ],
    [
      { text: "Emergency" },
      { text: "NHS 111" },
      { text: "Medical Helpline" },
      { text: "111" },
      { text: "24/7" }
    ]
  ]}
/>
```

## Props

### TableProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `rows` | `TableCell[][]` | Yes | Array of table rows and cells |
| `head` | `TableHeadCell[]` | No | Array of table head cells |
| `heading` | `string` | No | Heading/label of the panel if panel is true |
| `headingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | No | Heading level for the panel heading. Defaults to 3 |
| `caption` | `string` | No | Caption text for the table |
| `captionClasses` | `string` | No | CSS classes for the caption |
| `firstCellIsHeader` | `boolean` | No | If true, first cell in each row will be a TH instead of TD |
| `responsive` | `boolean` | No | If true, responsive table classes will be applied |
| `panel` | `boolean` | No | If true, table will be wrapped in a panel |
| `tableClasses` | `string` | No | Classes to add to the table container |
| `panelClasses` | `string` | No | Classes to add to the panel container |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes |

### TableCell

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | No | Text to use within the cell |
| `html` | `string` | No | HTML to use within the cell |
| `header` | `string` | No | Header text for responsive table rows only |
| `format` | `'numeric'` | No | Specify format of a cell |
| `colspan` | `number` | No | Specify how many columns a cell extends |
| `rowspan` | `number` | No | Specify how many rows a cell extends |
| `classes` | `string` | No | Additional classes for the cell |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes |

### TableHeadCell

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | No | Text to use within the header cell |
| `html` | `string` | No | HTML to use within the header cell |
| `format` | `'numeric'` | No | Specify format of a header cell |
| `colspan` | `number` | No | Specify how many columns a header cell extends |
| `rowspan` | `number` | No | Specify how many rows a header cell extends |
| `classes` | `string` | No | Additional classes for the header cell |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes |

## Accessibility

The Table component implements comprehensive accessibility features:

- **Semantic HTML**: Uses proper table elements (`<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`)
- **Table Headers**: Proper `scope` attributes for column and row headers
- **Caption Support**: Table captions provide context for screen readers
- **Responsive Labels**: In responsive mode, cells include data labels for context
- **ARIA Roles**: Optional ARIA roles for enhanced screen reader support
- **Keyboard Navigation**: Full keyboard accessibility for interactive elements
- **Focus Management**: Clear focus indicators and logical tab order
- **WCAG Compliance**: Follows WCAG guidelines for tables and data presentation

## Styling

The component uses styled-components with design tokens:

- **Responsive Design**: Automatically adapts from tabular layout to stacked layout on mobile
- **Typography**: Consistent font families, sizes, and weights
- **Spacing**: Proper cell padding and table margins
- **Borders**: Clean borders between rows and columns
- **Color Scheme**: Uses theme colors for text, borders, and backgrounds
- **Panel Styling**: Optional panel wrapper with header styling

## CSS Classes

- `.nhsuk-table` - Main table container
- `.nhsuk-table-responsive` - Responsive table variant
- `.nhsuk-table__caption` - Table caption styling
- `.nhsuk-table__caption--l` - Large caption text
- `.nhsuk-table__caption--m` - Medium caption text
- `.nhsuk-table__caption--s` - Small caption text
- `.nhsuk-u-visually-hidden` - Visually hidden content
- `.nhsuk-table__head` - Table header section
- `.nhsuk-table__body` - Table body section
- `.nhsuk-table__row` - Table row
- `.nhsuk-table__header` - Header cell
- `.nhsuk-table__header--numeric` - Numeric header cell
- `.nhsuk-table__cell` - Body cell
- `.nhsuk-table__cell--numeric` - Numeric body cell
- `.nhsuk-table__panel-with-heading-tab` - Panel container
- `.nhsuk-table__heading-tab` - Panel heading
- `.nhsuk-u-text-break-word` - Force word breaking for long text
- `.nhsuk-u-width-one-half` - 50% width utility
- `.nhsuk-u-width-one-quarter` - 25% width utility

## Best Practices

### Data Structure

```tsx
// ✅ Good - Clear, structured data
{
  caption: "Patient vital signs",
  head: [
    { text: "Date" },
    { text: "Blood Pressure", format: "numeric" },
    { text: "Status" }
  ],
  rows: [
    [
      { text: "2024-01-15" },
      { text: "120/80", format: "numeric" },
      { text: "Normal" }
    ]
  ]
}

// ❌ Bad - Mixed data types without clear structure
{
  rows: [
    [
      { text: "Date: 2024-01-15, BP: 120/80, Status: Normal" }
    ]
  ]
}
```

### Responsive Design

```tsx
// ✅ Good - Use responsive mode for complex tables
<Table 
  responsive={true}
  head={[
    { text: "Patient", classes: "nhsuk-u-width-one-half" },
    { text: "Time", classes: "nhsuk-u-width-one-quarter" },
    { text: "Status", classes: "nhsuk-u-width-one-quarter" }
  ]}
  rows={[
    [
      { header: "Patient", text: "Sarah Phillips" },
      { header: "Time", text: "9:00 AM" },
      { header: "Status", text: "Confirmed" }
    ]
  ]}
/>

// ❌ Bad - No responsive headers for mobile users
<Table 
  responsive={true}
  rows={[
    [
      { text: "Sarah Phillips" },
      { text: "9:00 AM" },
      { text: "Confirmed" }
    ]
  ]}
/>
```

### Numeric Data

```tsx
// ✅ Good - Use numeric format for numbers
{
  text: "Blood pressure",
  format: "numeric"
}

// ✅ Good - Consistent numeric formatting
[
  { text: "120", format: "numeric" },
  { text: "95.6", format: "numeric" },
  { text: "72", format: "numeric" }
]

// ❌ Bad - No numeric formatting for numbers
{
  text: "Mixed text and 123.45 numbers"
}
```

### Accessibility

```tsx
// ✅ Good - Meaningful captions and headers
<Table 
  caption="Patient appointment schedule for this week"
  head={[
    { text: "Date and time" },
    { text: "Patient name" },
    { text: "Appointment type" }
  ]}
  // ...
/>

// ✅ Good - Action context for screen readers
{
  html: '<a href="/edit">Change <span class="nhsuk-u-visually-hidden">appointment time</span></a>'
}

// ❌ Bad - Generic captions and missing context
<Table 
  caption="Data"
  head={[{ html: '<a href="/edit">Change</a>' }]}
  // ...
/>
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [SummaryList](../summary-list/README.md) - For key-value data pairs
- [Card](../card/README.md) - For content grouping
- [Details](../details/README.md) - For expandable content
- [Panel](../panel/README.md) - For highlighted content sections

## Resources

- [NHS Digital Table Guidance](https://service-manual.nhs.uk/design-system/components/table)
- [GOV.UK Table Pattern](https://design-system.service.gov.uk/components/table/)
- [WCAG Table Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)