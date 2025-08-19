# Action Link

A prominent link component with an arrow icon that encourages user action. This component is designed to draw attention to important links and actions within your application.

## Usage

```tsx
import { ActionLink } from '@public-good/design-system';

function MyPage() {
  return (
    <ActionLink 
      text="Find your nearest A&E" 
      href="/find-services/accident-emergency" 
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | `string` | Yes | - | Text to display in the action link |
| `href` | `string` | Yes | - | URL for the link |
| `openInNewWindow` | `boolean` | No | `false` | Whether to open link in new window |
| `onClick` | `(event: React.MouseEvent<HTMLAnchorElement>) => void` | No | - | Click handler |
| `className` | `string` | No | - | Additional CSS classes |
| `data-testid` | `string` | No | - | Test identifier |
| `id` | `string` | No | - | Unique identifier |

## Examples

### Basic usage
```tsx
<ActionLink 
  text="Book an appointment" 
  href="/appointments/book" 
/>
```

### Open in new window
```tsx
<ActionLink 
  text="External health information" 
  href="https://external-health-site.com" 
  openInNewWindow={true}
/>
```

### With click handler
```tsx
<ActionLink 
  text="Track your application" 
  href="/track-application"
  onClick={(event) => {
    // Analytics tracking
    analytics.track('action_link_clicked', {
      text: 'Track your application',
      href: '/track-application'
    });
  }}
/>
```

### With custom styling
```tsx
<ActionLink 
  text="Emergency services" 
  href="/emergency"
  className="emergency-link"
  id="emergency-action"
/>
```

## When to use

Use the action link component to:
- Draw attention to important actions or destinations
- Encourage users to complete key tasks
- Link to services or tools that users need to access
- Provide clear calls-to-action

## When not to use

Don't use action links when:
- You need a standard text link within content
- The action is destructive or requires confirmation
- You have multiple competing calls-to-action close together
- The link destination is not significantly important

## Accessibility

The action link component is designed with accessibility in mind:

- **Keyboard navigation**: Fully accessible via keyboard
- **Screen readers**: Provides clear link purpose and destination
- **Focus management**: Clear focus indicators with high contrast
- **Color contrast**: Meets WCAG AA standards
- **Target size**: Large click/touch target for ease of use

### ARIA attributes

- The arrow icon has `aria-hidden="true"` as it's decorative
- The link text provides the accessible name
- When opening in a new window, appropriate `rel` attributes are added

### Best practices

- Use descriptive link text that clearly indicates the destination or action
- Avoid generic text like "Click here" or "Read more"
- Ensure the link purpose is clear without surrounding context
- Test with keyboard navigation and screen readers

## Design tokens used

- `theme.colors.green` - Arrow icon color
- `theme.colors.primary` - Link text color
- `theme.colors.yellow` - Focus outline color
- `theme.typography.fontSize.xl` - Text size
- `theme.typography.fontWeight.bold` - Text weight
- `theme.spacing[6]` - Bottom margin

## Browser support

This component works in all modern browsers and degrades gracefully in older browsers:

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Progressive enhancement for older browsers

## Migration from NHS UK

This component replaces the NHS UK `nhsuk-action-link` component:

### Key changes:
- **Framework**: Converted from Nunjucks/SCSS to React/styled-components
- **Props**: TypeScript interfaces replace Nunjucks parameters
- **Styling**: CSS-in-JS with theme integration
- **Accessibility**: Enhanced focus management and ARIA support
- **Testing**: Comprehensive unit and accessibility tests

### Migration guide:
```html
<!-- NHS UK (Nunjucks) -->
{{ nhsukActionLink({
  text: "Find your nearest A&E",
  href: "/find-services"
}) }}

<!-- Public Good (React) -->
<ActionLink 
  text="Find your nearest A&E" 
  href="/find-services" 
/>
```

## Related components

- **Button** - For actions that don't navigate
- **Back Link** - For backwards navigation
- **Breadcrumb** - For showing page hierarchy