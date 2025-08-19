# Breadcrumb Component

A navigation component that shows users where they are in a website's hierarchy and allows them to navigate back to higher levels. This component is converted from the NHS UK Design System breadcrumb component and maintains full accessibility compliance (WCAG AA).

## Features

- **Responsive Design**: Shows full breadcrumb on tablet+ and back link only on mobile
- **Accessibility**: Full WCAG AA compliance with proper ARIA labels and semantic markup
- **Flexible Styling**: Supports reverse variant for dark backgrounds
- **Multiple Languages**: Ready for internationalization
- **TypeScript**: Full type safety with comprehensive interfaces

## Usage

### Basic Example

```tsx
import { Breadcrumb } from '@/components/breadcrumb';

<Breadcrumb
  items={[
    { text: 'Home', href: '/' },
    { text: 'Health A-Z', href: '/health-a-z' },
    { text: 'Mental health', href: '/health-a-z/mental-health' }
  ]}
/>
```

### With Current Page

```tsx
<Breadcrumb
  items={[
    { text: 'Home', href: '/' },
    { text: 'Health A-Z', href: '/health-a-z' },
    { text: 'Mental health', href: '/health-a-z/mental-health' }
  ]}
  text="Depression"
  href="/health-a-z/mental-health/depression"
/>
```

### Reverse Variant (for dark backgrounds)

```tsx
<Breadcrumb
  items={[
    { text: 'Home', href: '/' },
    { text: 'Health A-Z', href: '/health-a-z' }
  ]}
  reverse
/>
```

### With Custom Attributes

```tsx
<Breadcrumb
  items={[
    { 
      text: 'Home', 
      href: '/',
      attributes: { 'data-analytics': 'home-breadcrumb' }
    },
    { text: 'Health A-Z', href: '/health-a-z' }
  ]}
  labelText="Page navigation"
  className="custom-breadcrumb"
/>
```

## Props

### BreadcrumbProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | - | Array of breadcrumb items (excluding the current page) |
| `text` | `string` | - | Text for the current page |
| `href` | `string` | - | URL for the current page |
| `labelText` | `string` | `'Breadcrumb'` | Accessible label for the breadcrumb navigation |
| `reverse` | `boolean` | `false` | Whether to use reverse styling for dark backgrounds |
| `className` | `string` | - | Additional CSS classes |
| `data-testid` | `string` | - | Test identifier |
| `id` | `string` | - | HTML id attribute |

### BreadcrumbItem

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | Text to display for the breadcrumb item |
| `href` | `string` | URL for the breadcrumb link (optional) |
| `attributes` | `Record<string, string>` | Additional attributes for the item (optional) |

## Responsive Behavior

- **Desktop/Tablet (768px+)**: Shows full breadcrumb trail as horizontal list
- **Mobile (<768px)**: Hides full breadcrumb, shows only back link to previous page

## Accessibility Features

- Uses semantic `<nav>` element with `aria-label`
- Breadcrumb implemented as ordered list (`<ol>`) for proper structure
- Back link includes visually hidden "Back to" text for screen readers
- Full keyboard navigation support
- High contrast focus indicators
- Supports screen reader announcements

## Styling

The component uses styled-components with design tokens from the theme:

- Colors: Uses semantic color tokens for interactive elements
- Typography: Consistent with design system typography scale
- Spacing: Uses spacing tokens for consistent layout
- Focus states: Yellow focus rings with proper contrast
- Hover states: Color transitions for interactive feedback

## Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Migration from NHS UK

This component maintains feature parity with the NHS UK breadcrumb component:

- ✅ All visual styling preserved
- ✅ Responsive behavior maintained
- ✅ Accessibility features intact
- ✅ Component API compatible
- ✅ Additional TypeScript safety

### Key Changes from NHS UK Version

1. **Technology Stack**: Nunjucks → React + TypeScript
2. **Styling**: SCSS → styled-components with design tokens
3. **Bundle**: Individual component vs monolithic CSS
4. **Type Safety**: Added comprehensive TypeScript interfaces
5. **Testing**: Added comprehensive test coverage

## Related Components

- **[BackLink](../back-link/README.md)**: Standalone back navigation
- **[ActionLink](../action-link/README.md)**: Call-to-action links

## Examples

### Healthcare Navigation

```tsx
<Breadcrumb
  items={[
    { text: 'NHS Services', href: '/services' },
    { text: 'Find a Service', href: '/services/find' },
    { text: 'GP Surgeries', href: '/services/find/gp' }
  ]}
  text="Search Results"
  href="/services/find/gp/results"
/>
```

### Government Service Navigation

```tsx
<Breadcrumb
  items={[
    { text: 'GOV.UK', href: 'https://gov.uk' },
    { text: 'Benefits', href: '/benefits' },
    { text: 'Universal Credit', href: '/benefits/universal-credit' }
  ]}
  text="Apply Online"
  href="/benefits/universal-credit/apply"
/>
```

### E-commerce Navigation

```tsx
<Breadcrumb
  items={[
    { text: 'Home', href: '/' },
    { text: 'Electronics', href: '/electronics' },
    { text: 'Computers', href: '/electronics/computers' },
    { text: 'Laptops', href: '/electronics/computers/laptops' }
  ]}
  text="Gaming Laptops"
  href="/electronics/computers/laptops/gaming"
/>
```