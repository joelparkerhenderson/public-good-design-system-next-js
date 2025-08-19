# Details

A collapsible content component that provides progressive disclosure of information. Built on the semantic HTML `<details>` element for accessibility and progressive enhancement.

Converted from the NHS UK Design System Details component for the Public Good Design System.

## Features

- **Semantic HTML**: Uses `<details>` and `<summary>` elements for native accessibility
- **Progressive disclosure**: Content is hidden by default and can be expanded when needed
- **Two variants**: Default and expander styles for different use cases
- **Keyboard navigation**: Fully accessible via keyboard (Enter/Space on summary)
- **Flexible content**: Support for text, HTML, or React children
- **Event handling**: Optional callback when expanded/collapsed state changes
- **Screen reader support**: Properly announced expansion states

## Usage

```tsx
import { Details } from '@/components/details';

// Basic usage with text content
<Details
  summaryText="Where can I find my NHS number?"
  text="An NHS number is a 10 digit number, like 485 777 3456."
/>

// With HTML content
<Details
  summaryText="Important information"
  html="<p>This is <strong>important</strong> information about your appointment.</p>"
/>

// With React children (most flexible)
<Details summaryText="Contact information">
  <p>You can contact us by:</p>
  <ul>
    <li>Phone: 0123 456 7890</li>
    <li>Email: info@example.com</li>
  </ul>
</Details>

// Expander variant with different styling
<Details
  summaryText="Opening times"
  variant="expander"
  open={true}
>
  <table>
    <tbody>
      <tr>
        <td>Monday</td>
        <td>9am - 5pm</td>
      </tr>
      <tr>
        <td>Tuesday</td>
        <td>9am - 5pm</td>
      </tr>
    </tbody>
  </table>
</Details>

// With toggle event handler
<Details
  summaryText="Advanced settings"
  onToggle={(isOpen) => {
    console.log('Details expanded:', isOpen);
  }}
>
  <p>Advanced configuration options...</p>
</Details>
```

## Props

### Required Props

At minimum, you must provide either `summaryText` or `summaryHtml` for the clickable summary.

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `summaryText` | `string` | - | Text for the clickable summary element |
| `summaryHtml` | `string` | - | HTML for the summary (takes precedence over summaryText) |
| `text` | `string` | - | Plain text content for the collapsible area |
| `html` | `string` | - | HTML content (takes precedence over text) |
| `children` | `ReactNode` | - | React children (takes precedence over html/text) |
| `open` | `boolean` | `false` | Whether the details should be expanded by default |
| `variant` | `'default' \| 'expander'` | `'default'` | Visual variant of the component |
| `onToggle` | `(isOpen: boolean) => void` | - | Callback fired when expanded/collapsed |
| `id` | `string` | - | Custom ID for the details element |
| `classes` | `string` | - | Additional CSS classes |
| `attributes` | `Record<string, string>` | - | Additional HTML attributes |

### Inherited Props

The component also accepts all standard HTML attributes through `BaseComponentProps`:
- `className` - CSS class names
- `data-testid` - Test identifier
- Standard HTML attributes like `role`, `aria-*`, etc.

## Variants

### Default
The standard details styling with subtle expansion indicator and indented content.

```tsx
<Details
  summaryText="More information"
  text="Additional details..."
/>
```

### Expander
An alternative style with border, background colors, and different spacing. Ideal for more prominent disclosure areas.

```tsx
<Details
  summaryText="Opening times"
  variant="expander"
>
  <p>Monday to Friday: 9am - 5pm</p>
</Details>
```

## Content Priority

The component follows this content priority order:

1. **`children`** (React elements) - most flexible
2. **`html`** (raw HTML string) - for formatted content  
3. **`text`** (plain text) - simplest option

For the summary:
1. **`summaryHtml`** (raw HTML string)
2. **`summaryText`** (plain text)

## Healthcare Examples

### NHS Number Information
```tsx
<Details summaryText="Where can I find my NHS number?">
  <p>An NHS number is a 10 digit number, like 485 777 3456.</p>
  <p>You can find your NHS number on any document sent to you by the NHS. This may include:</p>
  <ul>
    <li>prescriptions</li>
    <li>test results</li>
    <li>hospital referral letters</li>
    <li>appointment letters</li>
    <li>your NHS medical card</li>
  </ul>
  <p>Ask your GP practice for help if you can't find your NHS number.</p>
</Details>
```

### Appointment Information
```tsx
<Details 
  summaryText="What to bring to your appointment"
  variant="expander"
>
  <h3>Required documents</h3>
  <ul>
    <li>NHS medical card or NHS number</li>
    <li>Photo ID (driving licence or passport)</li>
    <li>List of current medications</li>
    <li>Referral letter (if applicable)</li>
  </ul>
  <h3>Optional items</h3>
  <ul>
    <li>Previous test results</li>
    <li>Insurance documents</li>
    <li>Support person contact details</li>
  </ul>
</Details>
```

### Practice Information
```tsx
<Details summaryText="Surgery opening times">
  <table>
    <tbody>
      <tr>
        <th scope="row">Monday</th>
        <td>8:30am - 6:00pm</td>
      </tr>
      <tr>
        <th scope="row">Tuesday</th>
        <td>8:30am - 6:00pm</td>
      </tr>
      <tr>
        <th scope="row">Wednesday</th>
        <td>8:30am - 1:00pm</td>
      </tr>
      <tr>
        <th scope="row">Thursday</th>
        <td>8:30am - 6:00pm</td>
      </tr>
      <tr>
        <th scope="row">Friday</th>
        <td>8:30am - 6:00pm</td>
      </tr>
      <tr>
        <th scope="row">Saturday</th>
        <td>Closed</td>
      </tr>
      <tr>
        <th scope="row">Sunday</th>
        <td>Closed</td>
      </tr>
    </tbody>
  </table>
</Details>
```

### Medication Instructions
```tsx
<Details summaryText="How to take this medication">
  <div>
    <h3>Dosage</h3>
    <p>Take 1 tablet twice daily with food</p>
    
    <h3>Important reminders</h3>
    <ul>
      <li>Take at the same times each day</li>
      <li>Do not crush or chew tablets</li>
      <li>Complete the full course even if you feel better</li>
      <li>Store in a cool, dry place away from children</li>
    </ul>
    
    <h3>Side effects to watch for</h3>
    <p>Contact your doctor if you experience severe dizziness, rash, or difficulty breathing.</p>
  </div>
</Details>
```

## Accessibility

- Uses semantic `<details>` and `<summary>` HTML elements
- Keyboard navigable (Enter and Space keys)
- Screen reader compatible with proper state announcements
- Focus management with visible focus indicators
- Supports all WCAG AA requirements
- Works without JavaScript (progressive enhancement)

## Technical Notes

- Built with styled-components for consistent theming
- Uses semantic HTML5 `<details>` element for progressive enhancement
- Supports both controlled and uncontrolled usage patterns
- Event handling respects the natural DOM behavior
- Responsive design adapts to different screen sizes
- Compatible with server-side rendering

## Browser Support

The `<details>` element is supported in all modern browsers. For older browsers that don't support `<details>`, the content will be visible by default, ensuring progressive enhancement.

## Related Components

- **[Card](../card/README.md)** - For non-collapsible content containers
- **[Tables](../tables/README.md)** - For structured data that might be used within Details
- **[Summary List](../summary-list/README.md)** - For key-value pair information that might be disclosed