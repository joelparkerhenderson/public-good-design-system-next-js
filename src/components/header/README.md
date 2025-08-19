# Header

A comprehensive website header component with logo, service name, search functionality, account navigation, and primary navigation. Supports organisational branding and responsive behavior. Designed for healthcare and public service websites with accessibility in mind.

Converted from the NHS UK Design System Header component for the Public Good Design System.

## Features

- **NHS logo integration**: Default NHS branding with custom logo support
- **Service name**: Configurable service/application name with smart linking
- **Organisational branding**: Support for trust/organisation names and descriptors
- **Search functionality**: Integrated search form with customizable endpoints
- **Account navigation**: User account links and actions (login/logout)
- **Primary navigation**: Main site navigation with current page indicators
- **Responsive design**: Mobile-friendly with collapsible navigation
- **Smart link combination**: Automatically combines logo and service links when appropriate
- **Accessibility**: Full WCAG AA compliance with proper ARIA attributes
- **White theme variant**: Alternative styling for different page contexts

## Usage

```tsx
import { Header } from '@/components/header';

// Basic header with logo
<Header 
  logo={{ href: "/", ariaLabel: "Home" }}
/>

// Header with service name and navigation
<Header
  logo={{ href: "/" }}
  service={{ text: "Public Health Service", href: "/" }}
  navigation={{
    items: [
      { href: "/services", text: "Services" },
      { href: "/information", text: "Information" },
      { href: "/support", text: "Support", current: true }
    ]
  }}
/>

// Full header with search and account
<Header
  logo={{ href: "/" }}
  service={{ text: "Health Portal", href: "/" }}
  search={{
    action: "/search",
    placeholder: "Search health information"
  }}
  account={{
    items: [
      { href: "/profile", text: "My Account", icon: true },
      { action: "/logout", text: "Log out" }
    ]
  }}
  navigation={{
    items: [
      { href: "/health-az", text: "Health A-Z" },
      { href: "/services", text: "Services" },
      { href: "/emergency", text: "Emergency" }
    ]
  }}
/>

// Organisational header with custom branding
<Header
  logo={{ 
    src: "/trust-logo.svg",
    href: "/",
    ariaLabel: "NHS Foundation Trust"
  }}
  organisation={{
    name: "Manchester University",
    split: "NHS Foundation Trust",
    descriptor: "Excellence in Healthcare"
  }}
  search={{ visuallyHiddenLabel: "Search trust website" }}
  classes="nhsuk-header--white"
/>
```

## Props

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `HeaderLogo` | - | Logo configuration object |
| `service` | `HeaderService` | - | Service name configuration |
| `organisation` | `HeaderOrganisation` | - | Organisation branding configuration |
| `search` | `HeaderSearch \| boolean` | - | Search functionality configuration |
| `navigation` | `HeaderNavigation` | - | Primary navigation configuration |
| `account` | `HeaderAccount` | - | Account/user navigation configuration |
| `baseUrl` | `string` | `""` | Base URL to prepend to logo src |
| `containerClasses` | `string` | - | Additional CSS classes for container |
| `classes` | `string` | - | Additional CSS classes for header |
| `attributes` | `Record<string, string>` | - | Additional HTML attributes |

### Inherited Props

The component also accepts all standard HTML attributes through `BaseComponentProps`:
- `className` - CSS class names
- `data-testid` - Test identifier
- Standard HTML attributes like `role`, `aria-*`, etc.

### Type Definitions

```tsx
interface HeaderLogo {
  href?: string;                    // Link URL for the logo
  src?: string;                     // Custom logo image source
  ariaLabel?: string;               // Aria label for the logo
}

interface HeaderService {
  text?: string;                    // Service name text
  href?: string;                    // Link URL for the service name
}

interface HeaderOrganisation {
  name?: string;                    // Organisation name
  split?: string;                   // Split text for longer names
  descriptor?: string;              // Organisation descriptor text
}

interface HeaderSearch {
  action?: string;                  // Search form action URL
  name?: string;                    // Search input name attribute
  placeholder?: string;             // Search input placeholder text
  visuallyHiddenLabel?: string;     // Visually hidden label for search
  visuallyHiddenButton?: string;    // Visually hidden text for search button
}

interface HeaderNavigationItem {
  href: string;                     // Link URL
  text?: string;                    // Link text content
  html?: string;                    // Link HTML content (takes precedence)
  current?: boolean;                // Whether this is the current page
  active?: boolean;                 // Whether this section is active
  classes?: string;                 // Additional CSS classes
  attributes?: Record<string, string>; // Additional HTML attributes
}

interface HeaderNavigation {
  items?: HeaderNavigationItem[];   // Navigation items
  ariaLabel?: string;               // Aria label for navigation
  classes?: string;                 // Additional CSS classes
  attributes?: Record<string, string>; // Additional HTML attributes
}

interface HeaderAccountItem {
  href?: string;                    // Link URL (for links)
  action?: string;                  // Action URL (for form submission)
  method?: string;                  // Form method (when using action)
  text?: string;                    // Item text content
  html?: string;                    // Item HTML content (takes precedence)
  icon?: boolean;                   // Whether to show user icon
  classes?: string;                 // Additional CSS classes
  attributes?: Record<string, string>; // Additional HTML attributes
}

interface HeaderAccount {
  items?: HeaderAccountItem[];      // Account items
  ariaLabel?: string;               // Aria label for account navigation
  classes?: string;                 // Additional CSS classes
  attributes?: Record<string, string>; // Additional HTML attributes
}
```

## Link Combination Logic

The header intelligently combines logo and service name links to avoid duplicate links:

### Combined Links
- **No logo href + service href**: Logo and service name combined into single link
- **Same href values**: Logo and service name combined when both have identical hrefs

### Separate Links
- **Different href values**: Logo and service name remain as separate links
- **Logo href only**: Logo is linked, service name is text-only

```tsx
// Combined: Single link containing both logo and service name
<Header 
  service={{ text: "Health Portal", href: "/" }}
/>

// Combined: Both have same href
<Header 
  logo={{ href: "/" }}
  service={{ text: "Health Portal", href: "/" }}
/>

// Separate: Different hrefs
<Header 
  logo={{ href: "/nhs" }}
  service={{ text: "Health Portal", href: "/portal" }}
/>
```

## Search Configuration

### Basic Search
```tsx
<Header search={true} />
```

### Custom Search
```tsx
<Header 
  search={{
    action: "/custom-search",
    name: "query",
    placeholder: "Search health information",
    visuallyHiddenLabel: "Search health database",
    visuallyHiddenButton: "Submit search"
  }}
/>
```

### Default Values
- **action**: `"https://www.nhs.uk/search/"`
- **name**: `"q"`
- **placeholder**: `"Search"`
- **visuallyHiddenLabel**: `"Search the NHS website"`
- **visuallyHiddenButton**: `"Search"`

## Account Navigation

### Login State
```tsx
<Header 
  account={{
    items: [
      { href: "/profile", text: "john.doe@example.com", icon: true },
      { href: "/settings", text: "Account settings" },
      { action: "/logout", text: "Log out" }
    ]
  }}
/>
```

### Logout State
```tsx
<Header 
  account={{
    items: [
      { href: "/login", text: "Log in" },
      { href: "/register", text: "Create account" }
    ]
  }}
/>
```

### Form Actions
```tsx
<Header 
  account={{
    items: [
      { action: "/logout", method: "delete", text: "Log out" }
    ]
  }}
/>
```

## Primary Navigation

### Basic Navigation
```tsx
<Header 
  navigation={{
    items: [
      { href: "/health-az", text: "Health A-Z" },
      { href: "/services", text: "Services", current: true },
      { href: "/emergency", text: "Emergency" }
    ]
  }}
/>
```

### Current Page Indicators
- **`current: true`**: Indicates the exact current page (`aria-current="page"`)
- **`active: true`**: Indicates active section (`aria-current="true"`)

### Navigation with HTML Content
```tsx
<Header 
  navigation={{
    items: [
      { href: "/special", html: "<em>Special</em> Services" }
    ]
  }}
/>
```

### White Navigation Theme
```tsx
<Header 
  navigation={{
    classes: "nhsuk-header__navigation--white",
    items: [...]
  }}
/>
```

## Healthcare Examples

### NHS Foundation Trust Header

```tsx
<Header
  logo={{ href: "/", ariaLabel: "NHS Foundation Trust" }}
  organisation={{
    name: "Manchester University",
    split: "NHS Foundation Trust",
    descriptor: "Excellence in Healthcare"
  }}
  search={{ visuallyHiddenLabel: "Search trust website" }}
  account={{
    items: [
      { href: "/staff-portal", text: "Staff Portal", icon: true },
      { href: "/contact", text: "Contact Us" }
    ]
  }}
  navigation={{
    items: [
      { href: "/services", text: "Our Services" },
      { href: "/patients", text: "For Patients" },
      { href: "/departments", text: "Departments", current: true },
      { href: "/about", text: "About Us" },
      { href: "/careers", text: "Careers" }
    ]
  }}
/>
```

### Public Health Service Header

```tsx
<Header
  logo={{ href: "/", ariaLabel: "Public Health Service" }}
  service={{ text: "Health Information Portal", href: "/" }}
  search={{
    action: "/search",
    placeholder: "Search health topics",
    visuallyHiddenLabel: "Search health information"
  }}
  navigation={{
    items: [
      { href: "/health-az", text: "Health A-Z" },
      { href: "/conditions", text: "Conditions & Treatments" },
      { href: "/healthy-living", text: "Healthy Living" },
      { href: "/services", text: "Health Services" },
      { href: "/emergency", text: "Emergency Information" }
    ]
  }}
/>
```

### GP Practice Header

```tsx
<Header
  logo={{ 
    src: "/practice-logo.png",
    href: "/",
    ariaLabel: "Greenfield Medical Centre"
  }}
  service={{ text: "Patient Portal", href: "/" }}
  account={{
    items: [
      { href: "/login", text: "Patient Login" },
      { href: "/register", text: "Register" }
    ]
  }}
  navigation={{
    items: [
      { href: "/appointments", text: "Appointments" },
      { href: "/prescriptions", text: "Prescriptions" },
      { href: "/health-records", text: "Health Records" },
      { href: "/services", text: "Services" },
      { href: "/contact", text: "Contact & Opening Hours" }
    ]
  }}
/>
```

### Mental Health Service Header

```tsx
<Header
  logo={{ href: "/", ariaLabel: "Mental Health Support" }}
  service={{ text: "Wellbeing Support Hub", href: "/" }}
  search={{
    placeholder: "Search support resources",
    visuallyHiddenLabel: "Search mental health resources"
  }}
  account={{
    items: [
      { href: "/my-account", text: "My Wellbeing Plan", icon: true },
      { href: "/crisis-support", text: "Crisis Support" }
    ]
  }}
  navigation={{
    items: [
      { href: "/get-help", text: "Get Help" },
      { href: "/information", text: "Mental Health Information" },
      { href: "/self-help", text: "Self-Help Resources" },
      { href: "/support-groups", text: "Support Groups" },
      { href: "/crisis", text: "Crisis Support" }
    ]
  }}
/>
```

### Health Authority Header

```tsx
<Header
  classes="nhsuk-header--white"
  logo={{ href: "/", ariaLabel: "Regional Health Authority" }}
  organisation={{
    name: "Greater Manchester",
    descriptor: "Health Authority"
  }}
  search={{
    placeholder: "Search health services",
    visuallyHiddenLabel: "Search regional health services"
  }}
  account={{
    ariaLabel: "Professional access",
    items: [
      { href: "/professional-login", text: "Professional Login" },
      { href: "/provider-portal", text: "Provider Portal" }
    ]
  }}
  navigation={{
    classes: "nhsuk-header__navigation--white",
    items: [
      { href: "/find-service", text: "Find Health Services" },
      { href: "/public-health", text: "Public Health" },
      { href: "/commissioning", text: "Commissioning" },
      { href: "/quality-improvement", text: "Quality Improvement" },
      { href: "/data-reports", text: "Data & Reports" }
    ]
  }}
/>
```

## Responsive Behavior

### Mobile Adaptations
- **Search**: Hidden on screens < 768px
- **Logo**: Smaller size on screens < 450px
- **Navigation**: Horizontal scroll or menu toggle (implementation dependent)
- **Account**: Simplified display on smaller screens

### Breakpoint Considerations
- **Desktop**: Full layout with all elements visible
- **Tablet**: Maintained functionality with adjusted spacing
- **Mobile**: Priority content only, progressive disclosure

## Accessibility Features

### Semantic Structure
- **Header element**: Uses proper `<header>` with `role="banner"`
- **Navigation landmarks**: Separate navigation regions for account and primary nav
- **Search landmark**: Proper search role and form structure
- **Heading hierarchy**: Logical structure for screen readers

### Screen Reader Support
- **Logo accessibility**: Proper alt text and aria-labels
- **Search labels**: Visually hidden but accessible labels
- **Current page indication**: Proper `aria-current` attributes
- **Navigation context**: Clear navigation landmarks and labels

### Keyboard Navigation
- **Focus management**: All interactive elements are keyboard accessible
- **Focus indicators**: High contrast focus outlines
- **Tab order**: Logical progression through header elements
- **Skip links**: Integration with page skip navigation

### Color and Contrast
- **High contrast**: Meets WCAG AA contrast requirements
- **Focus states**: Yellow focus indicators for high visibility
- **Theme variants**: Both dark and light theme support
- **Link states**: Clear hover, focus, and visited states

## Visual Design

The component supports multiple visual themes:

### Default Theme
- **Header background**: NHS blue (#005eb8)
- **Text color**: White
- **Navigation background**: Darker blue (#003087)

### White Theme
- **Header background**: White
- **Text color**: NHS blue
- **Border**: Blue bottom border
- **Navigation**: Optional white variant

### Organisation Theme
- **Modified styling**: When organisation prop is provided
- **Enhanced branding**: Support for custom logos and names
- **Flexible layout**: Adapts to different organisation needs

## Technical Notes

- Built with styled-components for consistent theming
- Responsive design with CSS Grid and Flexbox
- Semantic HTML5 header and navigation elements
- TypeScript definitions for type safety
- Server-side rendering compatible
- Supports custom attributes and CSS classes
- Smart link combination logic to avoid duplicate navigation

## Browser Support

Compatible with all modern browsers including:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- IE11 (with polyfills)

## Related Components

- **[Footer](../footer/README.md)** - Companion footer component
- **[Navigation](../navigation/README.md)** - Additional navigation components
- **[Button](../button/README.md)** - Buttons used in header actions
- **[Search](../search/README.md)** - Standalone search components

## Best Practices

### Content Guidelines

1. **Keep navigation concise**: Limit primary navigation to 5-7 items
2. **Use descriptive labels**: Make navigation text clear and specific
3. **Maintain consistency**: Use consistent terminology across the site
4. **Prioritize important actions**: Place key actions in account navigation
5. **Consider mobile users**: Ensure navigation works on small screens

### Accessibility Guidelines

1. **Provide meaningful labels**: Use descriptive aria-labels and alt text
2. **Indicate current location**: Always mark the current page in navigation
3. **Test with assistive technology**: Verify compatibility with screen readers
4. **Ensure keyboard navigation**: All functionality must be keyboard accessible
5. **Use semantic HTML**: Proper heading hierarchy and landmark structure

### Performance Guidelines

1. **Optimize logo images**: Use appropriate image formats and sizes
2. **Minimize HTTP requests**: Combine resources where possible
3. **Consider lazy loading**: For non-critical images below the fold
4. **Test across devices**: Verify performance on various device types
5. **Monitor bundle size**: Keep component dependencies minimal

### Implementation Guidelines

1. **Plan navigation structure**: Design comprehensive site navigation
2. **Configure search properly**: Set up search endpoints and analytics
3. **Handle authentication**: Implement proper login/logout flows
4. **Test responsive behavior**: Verify layout across screen sizes
5. **Maintain brand consistency**: Align with organizational design guidelines