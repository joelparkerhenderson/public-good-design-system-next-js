# Skip Link Component

A hidden accessibility link that becomes visible when focused, allowing keyboard users to skip directly to the main content or other important sections. This component is essential for accessibility compliance and follows WCAG guidelines for keyboard navigation.

## Features

- **Hidden by Default**: Invisible until focused via keyboard navigation
- **Focus Visible**: Becomes prominently visible when focused
- **Target Focus**: Automatically focuses the target element when activated
- **Multiple Links**: Support for multiple skip links on the same page
- **Custom Targets**: Can skip to any element with an ID
- **Safe Area Support**: Respects device safe areas (notches, rounded corners)
- **Accessibility First**: Full WCAG AA compliance with proper focus management

## Usage

### Basic Skip Link

```tsx
import { SkipLink } from '@public-good/design-system';

// Place at the very beginning of your page, before header
<SkipLink />
```

### Custom Skip Link

```tsx
<SkipLink 
  href="#main-content"
  text="Skip to main content"
/>
```

### Skip to Specific Sections

```tsx
<SkipLink 
  href="#search-results"
  text="Skip to search results"
/>

<SkipLink 
  href="#navigation"
  text="Skip to navigation"
/>
```

### Multiple Skip Links

```tsx
<>
  <SkipLink />
  <SkipLink 
    href="#navigation"
    text="Skip to navigation"
  />
  <SkipLink 
    href="#search"
    text="Skip to search"
  />
</>
```

### With Custom Styling

```tsx
<SkipLink 
  classes="custom-skip-link"
  attributes={{ 'aria-label': 'Skip to main content area' }}
/>
```

## Healthcare Use Cases

### Patient Portal Skip Links

```tsx
<>
  <SkipLink 
    text="Skip to patient dashboard"
    href="#patient-dashboard"
  />
  <SkipLink 
    text="Skip to appointments"
    href="#appointments"
  />
  <SkipLink 
    text="Skip to medical records"
    href="#medical-records"
  />
</>
```

### Healthcare Information Site

```tsx
<>
  <SkipLink />
  <SkipLink 
    text="Skip to health information search"
    href="#health-search"
  />
  <SkipLink 
    text="Skip to emergency information"
    href="#emergency-info"
  />
</>
```

### Appointment Booking System

```tsx
<>
  <SkipLink />
  <SkipLink 
    text="Skip to appointment booking form"
    href="#booking-form"
  />
  <SkipLink 
    text="Skip to available time slots"
    href="#time-slots"
  />
</>
```

### Medical Records System

```tsx
<>
  <SkipLink />
  <SkipLink 
    text="Skip to medical records list"
    href="#records-list"
  />
  <SkipLink 
    text="Skip to record search"
    href="#record-search"
  />
</>
```

### Hospital Directory

```tsx
<>
  <SkipLink />
  <SkipLink 
    text="Skip to hospital locations"
    href="#locations"
  />
  <SkipLink 
    text="Skip to contact information"
    href="#contact-info"
  />
</>
```

## Implementation Example

```tsx
// Complete page implementation
function HomePage() {
  return (
    <>
      {/* Skip links should be the first elements */}
      <SkipLink />
      <SkipLink 
        text="Skip to navigation"
        href="#main-navigation"
      />
      
      <Header />
      
      <nav id="main-navigation">
        {/* Navigation content */}
      </nav>
      
      <main id="maincontent" tabIndex={-1}>
        {/* Main content */}
      </main>
    </>
  );
}
```

### Target Element Setup

```tsx
// Target elements should be focusable
<main id="maincontent" tabIndex={-1}>
  <h1>Main Content</h1>
  {/* Rest of content */}
</main>

<section id="search-results" tabIndex={-1}>
  <h2>Search Results</h2>
  {/* Search results */}
</section>
```

## Props

### SkipLinkProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | No | Text to use within the skip link component. Defaults to "Skip to main content" |
| `href` | `string` | No | The value of the skip link's href attribute. Defaults to "#maincontent" |
| `classes` | `string` | No | Additional CSS classes for the skip link |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes |

## Accessibility

The Skip Link component implements comprehensive accessibility features:

- **Keyboard Navigation**: First element in tab order for keyboard users
- **Screen Reader Support**: Properly announced by screen readers
- **Focus Management**: Automatically focuses target element when activated
- **Visual Focus**: High contrast, clearly visible focus state
- **WCAG Compliance**: Meets WCAG 2.1 AA standards for skip links
- **Target Focus**: Removes visual focus from target element after programmatic focus

## Behavior

### Focus States

1. **Hidden State**: Skip link is visually hidden but available to screen readers
2. **Focused State**: Skip link becomes visible with high contrast styling
3. **Activated State**: Target element receives focus and brief focus styling

### Target Element Handling

When a skip link is activated:
1. The target element is focused programmatically
2. A temporary class `nhsuk-skip-link-focused-element` is added
3. The class is removed after 100ms to avoid persistent visual focus
4. Screen readers announce the target element

## Styling

The component uses styled-components with design tokens:

- **Visually Hidden**: Uses clip/clip-path for hidden state
- **High Visibility**: High contrast colors when focused
- **Safe Areas**: Respects device safe areas for positioning
- **Focus Indicators**: Clear outline and background colors
- **Z-Index**: High z-index ensures visibility above other content

## CSS Classes

- `.nhsuk-skip-link` - Main skip link element
- `.nhsuk-skip-link-focused-element` - Temporary class for programmatically focused elements

## Best Practices

### Placement

```tsx
// ✅ Good - Skip links first in document
<>
  <SkipLink />
  <Header />
  <main id="maincontent">
    {/* Content */}
  </main>
</>

// ❌ Bad - Skip links after other content
<>
  <Header />
  <SkipLink />
  <main id="maincontent">
    {/* Content */}
  </main>
</>
```

### Target Elements

```tsx
// ✅ Good - Target element is focusable
<main id="maincontent" tabIndex={-1}>
  <h1>Page Title</h1>
</main>

// ❌ Bad - Target element can't receive focus
<div id="maincontent">
  <h1>Page Title</h1>
</div>
```

### Multiple Skip Links

```tsx
// ✅ Good - Logical order of skip options
<>
  <SkipLink /> {/* Main content */}
  <SkipLink text="Skip to navigation" href="#nav" />
  <SkipLink text="Skip to search" href="#search" />
</>
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [Header](../header/README.md) - Main page header
- [Footer](../footer/README.md) - Page footer
- [Button](../button/README.md) - Interactive buttons

## Resources

- [WCAG 2.1 Skip Links Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)
- [WebAIM Skip Navigation Links](https://webaim.org/techniques/skipnav/)
- [NHS Digital Accessibility Guidelines](https://service-manual.nhs.uk/accessibility)