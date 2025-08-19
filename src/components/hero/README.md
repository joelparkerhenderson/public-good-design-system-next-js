# Hero

A prominent banner section for pages, featuring large heading text, optional descriptive content, and optional background image. Used for page introductions, calls-to-action, and featured content areas. Designed for healthcare and public service websites with accessibility in mind.

Converted from the NHS UK Design System Hero component for the Public Good Design System.

## Features

- **Large heading text**: Configurable heading levels (h1-h6) with bold typography
- **Flexible content**: Support for plain text, HTML, or React children
- **Background images**: Optional hero images with overlay effects
- **Responsive design**: Adapts to mobile and desktop viewports
- **Grid layout**: Two-thirds width content area for optimal readability
- **Accessibility**: Full WCAG AA compliance with proper semantic structure
- **Visual indicators**: Arrow element for image-based heroes
- **Customizable styling**: Support for custom classes and attributes

## Usage

```tsx
import { Hero } from '@/components/hero';

// Basic hero with heading and text
<Hero 
  heading="We're here for you"
  text="Helping you take control of your health and wellbeing."
/>

// Hero with background image
<Hero 
  heading="Emergency Services"
  text="24/7 urgent care when you need it most."
  imageURL="/hero-emergency.jpg"
/>

// Hero with custom HTML content
<Hero 
  heading="Health Portal"
  html="<p>Access your health records, book appointments, and manage prescriptions.</p>"
/>

// Hero with React children
<Hero heading="Welcome to Public Health">
  <p>Your comprehensive resource for health information and services.</p>
  <Button href="/services">Explore Services</Button>
</Hero>

// Hero with custom heading level
<Hero 
  heading="Section Introduction"
  headingLevel={2}
  text="This section covers important health topics."
/>
```

## Props

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | - | Main heading text for the hero |
| `headingClasses` | `string` | - | Additional CSS classes for the heading |
| `headingLevel` | `HeadingLevel` | `1` | Heading level (h1-h6) |
| `text` | `string` | - | Plain text content |
| `html` | `string` | - | HTML content (takes precedence over text) |
| `children` | `ReactNode` | - | React children (takes precedence over html and text) |
| `imageURL` | `string` | - | Background image URL |
| `containerClasses` | `string` | - | Additional CSS classes for the container |
| `classes` | `string` | - | Additional CSS classes for the hero |
| `attributes` | `Record<string, string>` | - | Additional HTML attributes |

### Inherited Props

The component also accepts all standard HTML attributes through `BaseComponentProps`:
- `className` - CSS class names
- `data-testid` - Test identifier
- Standard HTML attributes like `role`, `aria-*`, etc.

### Type Definitions

```tsx
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeroProps extends BaseComponentProps {
  heading?: string;                     // Main heading text
  headingClasses?: string;              // Additional heading classes
  headingLevel?: HeadingLevel;          // Heading level (h1-h6)
  text?: string;                        // Plain text content
  html?: string;                        // HTML content
  children?: ReactNode;                 // React children content
  imageURL?: string;                    // Background image URL
  containerClasses?: string;            // Container CSS classes
  classes?: string;                     // Hero CSS classes
  attributes?: Record<string, string>;  // Additional HTML attributes
}
```

## Content Priority

Content is rendered with the following priority (highest to lowest):

1. **`children`** (React elements) - Most flexible, supports any React content
2. **`html`** (HTML string) - Formatted content with HTML tags
3. **`text`** (plain text) - Simple text content

```tsx
// Children take priority over html and text
<Hero 
  heading="Priority Example"
  text="This text is ignored"
  html="<p>This HTML is ignored</p>"
>
  <p>This children content is rendered</p>
</Hero>

// HTML takes priority over text
<Hero 
  heading="HTML Priority"
  text="This text is ignored"
  html="<p>This HTML content is rendered</p>"
/>

// Text is used when no children or html provided
<Hero 
  heading="Text Only"
  text="This text content is rendered"
/>
```

## Background Images

### Basic Image Hero
```tsx
<Hero 
  heading="Health Services"
  imageURL="/health-services-hero.jpg"
/>
```

### Image Hero with Content
```tsx
<Hero 
  heading="Emergency Care"
  text="Available 24 hours a day, 7 days a week."
  imageURL="/emergency-hero.jpg"
/>
```

### Image Effects
- **Overlay**: Automatic gradient overlay for better text readability
- **Arrow indicator**: Decorative arrow pointing down (hidden on mobile)
- **Content box**: White semi-transparent content area for image heroes
- **Responsive sizing**: Adapts image display across screen sizes

## Heading Levels

### Page Title (Default)
```tsx
<Hero 
  heading="Welcome to Health Portal"
  headingLevel={1}  // Default
/>
```

### Section Heading
```tsx
<Hero 
  heading="Our Services"
  headingLevel={2}
/>
```

### Subsection Heading
```tsx
<Hero 
  heading="Emergency Services"
  headingLevel={3}
/>
```

### Custom Heading Styling
```tsx
<Hero 
  heading="Special Announcement"
  headingLevel={2}
  headingClasses="custom-heading emergency-heading"
/>
```

## Layout Variants

### Standard Hero (No Image)
- Blue background with yellow left border
- White text on primary color background
- Full-width container with padding

### Image Hero
- Background image with gradient overlay
- Content in white semi-transparent box
- Arrow indicator below content box
- Minimum height constraints for visual impact

### Grid System
- Two-thirds width content area
- One-third empty space for balanced layout
- Responsive stacking on mobile devices

## Healthcare Examples

### NHS Trust Homepage Hero

```tsx
<Hero 
  heading="Manchester University NHS Foundation Trust"
  text="Providing excellent healthcare services to our community with compassion and expertise."
  imageURL="/trust-campus.jpg"
  headingLevel={1}
/>
```

### Emergency Services Hero

```tsx
<Hero 
  heading="24/7 Emergency Care"
  imageURL="/emergency-department.jpg"
>
  <p>If you have a life-threatening emergency, call <strong>999</strong> immediately.</p>
  <p>For urgent but non-life-threatening conditions, visit our Emergency Department or call 111.</p>
  <Button href="/emergency" variant="secondary">Learn More</Button>
</Hero>
```

### Public Health Campaign Hero

```tsx
<Hero 
  heading="Get Your COVID-19 Vaccination"
  html="<p>Protect yourself and your community. Book your appointment today.</p>"
  imageURL="/vaccination-campaign.jpg"
/>
```

### Mental Health Service Hero

```tsx
<Hero 
  heading="Mental Health Support"
  imageURL="/mental-health-support.jpg"
>
  <p>We're here to help you through difficult times.</p>
  <p><strong>Crisis support available 24/7:</strong> 0800 123 4567</p>
  <div>
    <Button href="/get-support">Get Support</Button>
    <Button href="/resources" variant="secondary">Self-Help Resources</Button>
  </div>
</Hero>
```

### GP Practice Hero

```tsx
<Hero 
  heading="Greenfield Medical Centre"
  containerClasses="practice-hero"
>
  <p>Quality healthcare for our local community.</p>
  <p><strong>Now accepting new patients</strong></p>
  <div>
    <Button href="/register">Register as Patient</Button>
    <Button href="/appointments" variant="secondary">Book Appointment</Button>
  </div>
</Hero>
```

### Health Information Portal Hero

```tsx
<Hero 
  heading="Health A-Z"
  headingLevel={1}
  text="Find reliable information about health conditions, symptoms, and treatments."
  imageURL="/health-information.jpg"
/>
```

### Public Health Department Hero

```tsx
<Hero 
  heading="Public Health Services"
  headingLevel={1}
>
  <p>Working to improve the health and wellbeing of our community through prevention, protection, and health promotion.</p>
  <div>
    <Button href="/services">Our Services</Button>
    <Button href="/data" variant="secondary">Health Data</Button>
    <Button href="/consultations" variant="secondary">Public Consultations</Button>
  </div>
</Hero>
```

### Health Authority Hero

```tsx
<Hero 
  heading="Greater Manchester Health Authority"
  imageURL="/health-authority.jpg"
>
  <p>Commissioning quality healthcare services for over 2.8 million people across Greater Manchester.</p>
  <p>Working with NHS trusts, GPs, and community partners to improve health outcomes.</p>
</Hero>
```

## Responsive Behavior

### Desktop (> 768px)
- Two-column grid layout
- Full background image display
- Large heading typography (4xl)
- Arrow indicator visible
- Generous padding and spacing

### Tablet (768px - 1024px)
- Maintained grid structure
- Responsive image scaling
- Medium typography sizing
- Adjusted padding

### Mobile (< 768px)
- Single column layout
- Stacked content arrangement
- Smaller heading typography (3xl)
- Arrow indicator hidden
- Compact padding

### Image Considerations
- Minimum height: 320px (mobile), 480px (desktop)
- Background-size: cover for full image display
- Background-position: center for optimal cropping
- Overlay opacity: Adjusted for text readability

## Accessibility Features

### Semantic Structure
- **Section element**: Uses proper `<section>` with `role="region"`
- **Heading hierarchy**: Configurable heading levels for proper document structure
- **Content organization**: Logical flow with clear visual hierarchy

### Screen Reader Support
- **Meaningful headings**: Descriptive heading text for navigation
- **Content structure**: Proper nesting and organization
- **Image alternatives**: Background images used decoratively (content in foreground)

### Keyboard Navigation
- **Focusable elements**: All interactive content is keyboard accessible
- **Tab order**: Logical progression through hero content
- **Focus indicators**: Clear focus states for links and buttons

### Color and Contrast
- **High contrast**: White text on dark backgrounds
- **Overlay effects**: Gradient overlays ensure text readability over images
- **Border indicators**: Yellow border for non-image heroes provides visual separation

## Visual Design

### Typography
- **Heading font**: Large, bold headings for maximum impact
- **Body text**: Readable size with relaxed line height
- **Hierarchy**: Clear distinction between heading and body content

### Color Scheme
- **Primary background**: NHS blue (#005eb8) for brand consistency
- **Text color**: White for high contrast and readability
- **Accent colors**: Yellow border for visual interest and accessibility

### Spacing and Layout
- **Generous padding**: Adequate spacing for comfortable reading
- **Grid constraints**: Two-thirds width for optimal line length
- **Responsive margins**: Consistent spacing across device sizes

### Image Treatment
- **Overlay gradients**: Subtle gradients for text readability
- **Content boxes**: White semi-transparent backgrounds for image heroes
- **Arrow indicators**: Decorative elements pointing to additional content

## Technical Notes

- Built with styled-components for consistent theming
- Responsive design using CSS Grid and media queries
- Semantic HTML5 section element
- TypeScript definitions for type safety
- Server-side rendering compatible
- Supports custom attributes and CSS classes
- Optimized for performance with minimal re-renders

## Browser Support

Compatible with all modern browsers including:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- IE11 (with polyfills)

## Related Components

- **[Button](../button/README.md)** - Call-to-action buttons for hero content
- **[Header](../header/README.md)** - Page header that may precede hero sections
- **[Card](../card/README.md)** - Content cards that may follow hero sections
- **[Navigation](../navigation/README.md)** - Navigation components for hero links

## Best Practices

### Content Guidelines

1. **Keep headings concise**: Aim for 1-8 words for maximum impact
2. **Use descriptive text**: Clearly communicate the page or section purpose
3. **Include calls-to-action**: Guide users to relevant actions or information
4. **Maintain brand voice**: Use consistent terminology and tone
5. **Consider reading time**: Keep hero content scannable and engaging

### Image Guidelines

1. **Choose high-quality images**: Use professional, relevant photography
2. **Optimize file sizes**: Balance quality with loading performance
3. **Consider text overlay**: Ensure images work well with text content
4. **Test across devices**: Verify image display on various screen sizes
5. **Provide alternatives**: Ensure content is accessible without images

### Accessibility Guidelines

1. **Use proper headings**: Maintain logical heading hierarchy
2. **Write descriptive text**: Make content meaningful for screen readers
3. **Test with assistive technology**: Verify compatibility with screen readers
4. **Ensure keyboard access**: All interactive elements must be keyboard navigable
5. **Check color contrast**: Verify sufficient contrast for text readability

### Performance Guidelines

1. **Optimize images**: Use appropriate formats and compression
2. **Lazy load images**: Consider lazy loading for below-fold content
3. **Minimize content**: Keep hero content focused and essential
4. **Test loading times**: Monitor performance across device types
5. **Progressive enhancement**: Ensure basic functionality without JavaScript

### Implementation Guidelines

1. **Plan content hierarchy**: Design clear information architecture
2. **Consider page context**: Ensure hero fits within overall page design
3. **Test responsive behavior**: Verify layout across screen sizes
4. **Maintain consistency**: Use consistent styling across site sections
5. **Monitor analytics**: Track user engagement with hero content