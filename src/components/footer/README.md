# Footer

A comprehensive website footer component with navigation, meta information, and copyright. Supports flexible column layouts, multiple navigation sections, and policy links. Designed for healthcare and public service websites with accessibility in mind.

Converted from the NHS UK Design System Footer component for the Public Good Design System.

## Features

- **Flexible layout**: Support for 1-4 column layouts with custom widths
- **Navigation sections**: Multiple navigation groups with titles and links
- **Meta information**: Policy links and additional content area
- **Copyright notice**: Customizable copyright text or HTML
- **Responsive design**: Adapts to mobile and desktop screens
- **Semantic HTML**: Uses proper `<footer>` element with contentinfo role
- **Accessibility**: Screen reader friendly with proper heading hierarchy
- **Dark theme**: Built-in dark blue background for contrast

## Usage

```tsx
import { Footer } from '@/components/footer';

// Basic footer with copyright
<Footer 
  copyright={{ text: "© 2024 Public Health Organization" }}
/>

// Footer with meta links
<Footer
  meta={{
    items: [
      { href: "/about", text: "About us" },
      { href: "/contact", text: "Contact" },
      { href: "/privacy", text: "Privacy policy" }
    ]
  }}
  copyright={{ text: "© 2024 Health Service" }}
/>

// Footer with navigation sections
<Footer
  navigation={[
    {
      title: "Services",
      items: [
        { href: "/appointments", text: "Book appointment" },
        { href: "/prescriptions", text: "Prescriptions" },
        { href: "/health-records", text: "Health records" }
      ]
    },
    {
      title: "Support",
      items: [
        { href: "/help", text: "Help & FAQ" },
        { href: "/contact", text: "Contact us" },
        { href: "/feedback", text: "Give feedback" }
      ]
    }
  ]}
  meta={{
    items: [
      { href: "/accessibility", text: "Accessibility" },
      { href: "/cookies", text: "Cookies" }
    ]
  }}
  copyright={{ text: "© 2024 NHS Foundation Trust" }}
/>

// Footer with custom meta content
<Footer
  navigation={{
    title: "Quick links",
    items: [
      { href: "/home", text: "Home" },
      { href: "/services", text: "Our services" }
    ]
  }}
>
  <p>All content is available under the Open Government Licence v3.0</p>
  <p>Contact us: 0300 123 1234</p>
</Footer>
```

## Props

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `1 \| 2 \| 3 \| 4` | `4` | Number of columns for navigation layout |
| `navigation` | `FooterNavigationSection \| FooterNavigationSection[]` | - | Navigation sections |
| `meta` | `FooterMeta` | - | Meta section configuration |
| `copyright` | `FooterCopyright` | `{ text: "© NHS England" }` | Copyright information |
| `children` | `ReactNode` | - | Children content for meta section |
| `classes` | `string` | - | Additional CSS classes for footer |
| `containerClasses` | `string` | - | Additional CSS classes for container |
| `attributes` | `Record<string, string>` | - | Additional HTML attributes |

### Inherited Props

The component also accepts all standard HTML attributes through `BaseComponentProps`:
- `className` - CSS class names
- `data-testid` - Test identifier
- Standard HTML attributes like `role`, `aria-*`, etc.

### Type Definitions

```tsx
interface FooterNavigationSection {
  title?: string;                    // Section heading
  text?: string;                     // Section text content
  html?: string;                     // Section HTML content (takes precedence over text)
  width?: FooterWidth;               // Custom column width
  items?: FooterLinkItem[];          // Navigation links
}

interface FooterLinkItem {
  href: string;                      // Link URL
  text?: string;                     // Link text
  html?: string;                     // Link HTML (takes precedence over text)
  attributes?: Record<string, string>; // Additional link attributes
}

interface FooterMeta {
  visuallyHiddenTitle?: string;      // Hidden title for meta links
  text?: string;                     // Meta text content
  html?: string;                     // Meta HTML content
  items?: FooterLinkItem[];          // Meta links
}

interface FooterCopyright {
  text?: string;                     // Copyright text
  html?: string;                     // Copyright HTML
}

type FooterWidth = 'full' | 'one-half' | 'one-third' | 'one-quarter';
```

## Column Layouts

### Single Column (columns={1})
All navigation sections stack vertically in full width.

```tsx
<Footer 
  columns={1}
  navigation={[
    { items: [{ href: "/link1", text: "Link 1" }] },
    { items: [{ href: "/link2", text: "Link 2" }] }
  ]}
/>
```

### Two Columns (columns={2})
Navigation sections are arranged in two columns side by side.

```tsx
<Footer 
  columns={2}
  navigation={[
    {
      title: "Services",
      items: [
        { href: "/appointments", text: "Appointments" },
        { href: "/prescriptions", text: "Prescriptions" }
      ]
    },
    {
      title: "Support", 
      items: [
        { href: "/help", text: "Help" },
        { href: "/contact", text: "Contact" }
      ]
    }
  ]}
/>
```

### Three Columns (columns={3})
Navigation sections are arranged in three columns.

```tsx
<Footer 
  columns={3}
  navigation={[
    { title: "Services", items: [...] },
    { title: "Information", items: [...] },
    { title: "Support", items: [...] }
  ]}
/>
```

### Four Columns (columns={4}) - Default
Navigation sections are arranged in four columns.

```tsx
<Footer 
  navigation={[
    { title: "Services", items: [...] },
    { title: "Information", items: [...] },
    { title: "Support", items: [...] },
    { title: "About", items: [...] }
  ]}
/>
```

### Custom Column Widths
Override default column widths for specific sections.

```tsx
<Footer 
  navigation={[
    {
      title: "Main services",
      width: "one-half",
      items: [...]
    },
    {
      title: "Quick links",
      width: "one-quarter", 
      items: [...]
    },
    {
      title: "Contact",
      width: "one-quarter",
      items: [...]
    }
  ]}
/>
```

## Content Priority

### Navigation Section Content
1. **`html`** (raw HTML string) - most flexible
2. **`text`** (plain text) - simple content

### Link Content
1. **`html`** (raw HTML string) - for formatted links
2. **`text`** (plain text) - standard links

### Meta Section Content
1. **`children`** (React elements) - most flexible
2. **`html`** (raw HTML string) - formatted content
3. **`text`** (plain text) - simple content

### Copyright Content
1. **`html`** (raw HTML string) - formatted copyright
2. **`text`** (plain text) - simple copyright

## Healthcare Examples

### NHS Foundation Trust Footer

```tsx
<Footer
  navigation={[
    {
      title: "Patient services",
      items: [
        { href: "/appointments", text: "Book an appointment" },
        { href: "/cancel-appointment", text: "Cancel appointment" },
        { href: "/prescriptions", text: "Order prescriptions" },
        { href: "/test-results", text: "View test results" },
        { href: "/health-records", text: "Access health records" }
      ]
    },
    {
      title: "Health information",
      items: [
        { href: "/health-az", text: "Health A-Z" },
        { href: "/symptoms-checker", text: "Check your symptoms" },
        { href: "/conditions", text: "Conditions and treatments" },
        { href: "/medicines", text: "Medicines information" },
        { href: "/healthy-living", text: "Healthy living advice" }
      ]
    },
    {
      title: "NHS services",
      items: [
        { href: "/emergency", text: "Emergency services" },
        { href: "/urgent-care", text: "Urgent care" },
        { href: "/mental-health", text: "Mental health services" },
        { href: "/nhs-app", text: "NHS App" },
        { href: "/find-services", text: "Find NHS services" }
      ]
    },
    {
      title: "About us",
      items: [
        { href: "/about", text: "About our trust" },
        { href: "/news", text: "News and updates" },
        { href: "/jobs", text: "Jobs and careers" },
        { href: "/research", text: "Research" },
        { href: "/contact", text: "Contact us" }
      ]
    }
  ]}
  meta={{
    text: "Manchester University NHS Foundation Trust is one of the largest NHS trusts in England, providing healthcare services to people across Greater Manchester.",
    items: [
      { href: "/accessibility", text: "Accessibility statement" },
      { href: "/privacy", text: "Privacy policy" },
      { href: "/cookies", text: "Cookies" },
      { href: "/freedom-of-information", text: "Freedom of information" },
      { href: "/complaints", text: "Complaints procedure" }
    ]
  }}
  copyright={{ text: "© 2024 Manchester University NHS Foundation Trust" }}
/>
```

### Public Health Department Footer

```tsx
<Footer
  columns={3}
  navigation={[
    {
      title: "Public health services",
      items: [
        { href: "/vaccinations", text: "Vaccinations" },
        { href: "/health-screening", text: "Health screening" },
        { href: "/sexual-health", text: "Sexual health services" },
        { href: "/stop-smoking", text: "Stop smoking support" },
        { href: "/mental-wellbeing", text: "Mental wellbeing" }
      ]
    },
    {
      title: "Health information",
      items: [
        { href: "/health-protection", text: "Health protection" },
        { href: "/health-improvement", text: "Health improvement" },
        { href: "/data-reports", text: "Health data and reports" },
        { href: "/health-inequalities", text: "Health inequalities" }
      ]
    },
    {
      title: "Get involved",
      items: [
        { href: "/consultations", text: "Public consultations" },
        { href: "/volunteering", text: "Volunteering opportunities" },
        { href: "/feedback", text: "Give us feedback" },
        { href: "/partnerships", text: "Partner with us" }
      ]
    }
  ]}
  meta={{
    html: `
      <p>All content is available under the 
        <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" 
           rel="license">Open Government Licence v3.0</a>, 
        except where otherwise stated.
      </p>
    `,
    items: [
      { href: "/accessibility", text: "Accessibility" },
      { href: "/privacy", text: "Privacy policy" },
      { href: "/terms", text: "Terms and conditions" }
    ]
  }}
  copyright={{ text: "© Crown copyright" }}
/>
```

### GP Practice Footer

```tsx
<Footer
  columns={2}
  navigation={[
    {
      title: "Patient services",
      items: [
        { href: "/appointments", text: "Book appointment" },
        { href: "/prescriptions", text: "Repeat prescriptions" },
        { href: "/registration", text: "Patient registration" },
        { href: "/patient-access", text: "Patient online access" },
        { href: "/health-checks", text: "Health checks" }
      ]
    },
    {
      title: "Practice information", 
      items: [
        { href: "/opening-hours", text: "Opening hours" },
        { href: "/our-team", text: "Meet our team" },
        { href: "/services", text: "Services we offer" },
        { href: "/patient-participation", text: "Patient participation group" },
        { href: "/complaints", text: "Complaints procedure" }
      ]
    }
  ]}
  meta={{
    items: [
      { href: "/privacy", text: "Privacy notice" },
      { href: "/accessibility", text: "Accessibility" },
      { href: "/cookies", text: "Cookie policy" }
    ]
  }}
>
  <div>
    <p><strong>Greenfield Medical Centre</strong></p>
    <p>123 High Street, Manchester, M1 2AB</p>
    <p>Tel: 0161 123 4567</p>
  </div>
</Footer>
```

### Health Authority Footer

```tsx
<Footer
  navigation={[
    {
      title: "Health services",
      items: [
        { href: "/find-service", text: "Find a health service" },
        { href: "/emergency", text: "Emergency and urgent care" },
        { href: "/primary-care", text: "Primary care services" },
        { href: "/specialist-care", text: "Specialist services" }
      ]
    },
    {
      title: "Health information",
      items: [
        { href: "/health-advice", text: "Health advice" },
        { href: "/conditions", text: "Health conditions" },
        { href: "/prevention", text: "Disease prevention" },
        { href: "/public-health", text: "Public health campaigns" }
      ]
    },
    {
      title: "About us",
      items: [
        { href: "/about", text: "About the health authority" },
        { href: "/strategy", text: "Our strategy" },
        { href: "/performance", text: "Performance data" },
        { href: "/governance", text: "Governance" }
      ]
    },
    {
      title: "Get involved",
      items: [
        { href: "/feedback", text: "Give feedback" },
        { href: "/consultations", text: "Public consultations" },
        { href: "/board-meetings", text: "Board meetings" },
        { href: "/complaints", text: "Make a complaint" }
      ]
    }
  ]}
  meta={{
    html: `
      <p>We are committed to providing equal access to healthcare services. 
         If you need this information in a different format, please 
         <a href="/contact">contact us</a>.
      </p>
    `,
    items: [
      { href: "/accessibility", text: "Accessibility statement" },
      { href: "/privacy", text: "Privacy policy" },
      { href: "/foi", text: "Freedom of information" },
      { href: "/modern-slavery", text: "Modern slavery statement" }
    ]
  }}
  copyright={{ text: "© 2024 Greater Manchester Health Authority" }}
/>
```

### Mental Health Service Footer

```tsx
<Footer
  columns={3}
  navigation={[
    {
      title: "Get help",
      items: [
        { href: "/crisis-support", text: "Crisis support" },
        { href: "/counselling", text: "Counselling services" },
        { href: "/peer-support", text: "Peer support groups" },
        { href: "/self-help", text: "Self-help resources" }
      ]
    },
    {
      title: "Information",
      items: [
        { href: "/mental-health-conditions", text: "Mental health conditions" },
        { href: "/treatment-options", text: "Treatment options" },
        { href: "/family-support", text: "Support for families" },
        { href: "/workplace-wellbeing", text: "Workplace wellbeing" }
      ]
    },
    {
      title: "Support us",
      items: [
        { href: "/donate", text: "Make a donation" },
        { href: "/volunteer", text: "Volunteer with us" },
        { href: "/fundraising", text: "Fundraising events" },
        { href: "/corporate-partnerships", text: "Corporate partnerships" }
      ]
    }
  ]}
  meta={{
    items: [
      { href: "/privacy", text: "Privacy policy" },
      { href: "/accessibility", text: "Accessibility" },
      { href: "/safeguarding", text: "Safeguarding policy" }
    ]
  }}
>
  <div>
    <p><strong>Crisis helpline:</strong> 0800 123 4567 (24/7)</p>
    <p><strong>Text support:</strong> Text HOPE to 85258</p>
    <p>If you're in immediate danger, call 999</p>
  </div>
</Footer>
```

## Accessibility Features

### Semantic Structure

- **Footer element**: Uses proper `<footer>` element with `role="contentinfo"`
- **Heading hierarchy**: Proper h2 headings for navigation sections
- **List structure**: Navigation links in semantic `<ul>` and `<li>` elements
- **Link accessibility**: All links have accessible text and proper focus states

### Screen Reader Support

- **Landmark navigation**: Footer is identified as contentinfo landmark
- **Hidden titles**: Visually hidden titles for groups of links
- **Clear structure**: Logical reading order and organization
- **Skip functionality**: Users can skip to footer or navigate past it

### Keyboard Navigation

- **Focus management**: All links are keyboard accessible
- **Focus indicators**: Clear visual focus indicators with high contrast
- **Tab order**: Logical tab order through navigation sections

### Color and Contrast

- **High contrast**: White text on dark blue background
- **Focus states**: Yellow focus indicator for high visibility
- **Link states**: Clear hover and visited states

## Visual Design

The component uses consistent styling:

- **Background**: Dark blue background (#005eb8) for brand consistency
- **Typography**: White text with proper hierarchy and sizing
- **Spacing**: Consistent spacing using design system tokens
- **Layout**: Responsive grid system adapting to screen sizes
- **Links**: Underlined links with clear hover and focus states

## Technical Notes

- Built with styled-components for consistent theming
- Responsive design with CSS Grid and Flexbox
- Semantic HTML5 footer element
- TypeScript definitions for type safety
- Server-side rendering compatible
- Supports custom attributes and CSS classes

## Browser Support

Compatible with all modern browsers including:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- IE11 (with polyfills)

## Related Components

- **[Header](../header/README.md)** - Companion header component
- **[Navigation](../navigation/README.md)** - Primary navigation components
- **[Button](../button/README.md)** - Buttons used in footer calls-to-action
- **[Card](../card/README.md)** - Content cards that might link to footer pages

## Best Practices

### Content Guidelines

1. **Keep links organized**: Group related links under clear headings
2. **Use descriptive text**: Make link text descriptive of the destination
3. **Prioritize important links**: Put most important links first
4. **Keep copyright current**: Update copyright year regularly
5. **Include required policies**: Accessibility, privacy, cookies, etc.

### Layout Guidelines

1. **Balance columns**: Distribute content evenly across columns
2. **Consistent sections**: Use similar numbers of links per section
3. **Logical grouping**: Group related functionality together
4. **Mobile first**: Consider how content stacks on mobile
5. **Test with content**: Test with realistic content lengths

### Accessibility Guidelines

1. **Meaningful headings**: Use descriptive section headings
2. **Link context**: Ensure links make sense out of context
3. **Skip navigation**: Provide ways to skip to main content
4. **Color independence**: Don't rely only on color for meaning
5. **Test with assistive technology**: Test with screen readers

### Technical Guidelines

1. **Use semantic HTML**: Proper footer, nav, and list elements
2. **Progressive enhancement**: Works without JavaScript
3. **Performance**: Optimize for fast loading
4. **Responsive design**: Test across device sizes
5. **Maintenance**: Plan for easy content updates