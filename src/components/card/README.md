# Card Component

A flexible card component for displaying content with multiple variants including basic cards, care cards for medical advice, feature cards, and clickable cards. This component is converted from the NHS UK Design System card component and maintains full accessibility compliance (WCAG AA).

## Features

- **Multiple Variants**: Basic, care cards, feature cards, primary/secondary styles
- **Care Cards**: Specialized medical advice cards (non-urgent, urgent, emergency)
- **Clickable Cards**: Full card click areas with proper accessibility
- **Flexible Content**: Support for text, HTML, images, and custom children
- **Accessibility**: Full WCAG AA compliance with proper headings and ARIA labels
- **TypeScript**: Full type safety with comprehensive interfaces

## Usage

### Basic Examples

```tsx
import { Card } from '@/components/card';

// Basic card
<Card 
  heading="Card title"
  description="Card description content"
/>

// Card with custom heading level
<Card 
  heading="Important information"
  headingLevel={3}
  description="This uses an h3 heading"
/>

// Card with image
<Card 
  heading="Exercise"
  description="Tips for staying healthy"
  imgURL="/images/exercise.jpg"
  imgALT="People exercising"
/>
```

### Clickable Cards

```tsx
// Basic clickable card
<Card 
  heading="Click me"
  description="This entire card is clickable"
  href="/destination"
  clickable
/>

// Clickable card with custom click handler
<Card 
  heading="Custom action"
  description="Handles click events"
  clickable
  onClick={(event) => console.log('Card clicked!')}
/>
```

### Care Cards (Medical Advice)

```tsx
// Non-urgent care card (blue)
<Card 
  heading="Speak to a GP if:"
  type="non-urgent"
  description="You have symptoms that concern you"
/>

// Urgent care card (red)
<Card 
  heading="Ask for an urgent GP appointment if:"
  type="urgent"
  description="You have severe symptoms"
/>

// Emergency care card (red with black content)
<Card 
  heading="Call 999 if:"
  type="emergency"
  description="You have life-threatening symptoms"
/>
```

### Card Variants

```tsx
// Feature card with highlighted header
<Card 
  heading="Featured content"
  description="Important highlighted information"
  feature
/>

// Primary card with chevron icon
<Card 
  heading="Breast screening"
  description="Important health screening"
  primary
  clickable
  href="/screening"
/>

// Secondary card (minimal styling)
<Card 
  heading="Related information"
  description="Additional resources"
  secondary
/>

// Top task card (compact)
<Card 
  heading="Order repeat prescription"
  headingLevel={5}
  topTask
  clickable
  href="/prescriptions"
/>
```

### Advanced Examples

```tsx
// Card with HTML content
<Card 
  headingHtml="<strong>Important:</strong> Health advice"
  descriptionHtml="<p>Visit <a href='#'>NHS 111 online</a> or <strong>call 111</strong>.</p>"
/>

// Card with custom children
<Card heading="Custom content">
  <ul>
    <li>Custom list item 1</li>
    <li>Custom list item 2</li>
  </ul>
  <button>Custom button</button>
</Card>

// Card with custom classes
<Card 
  heading="Styled card"
  description="Card with custom styling"
  className="my-custom-card"
  headingClasses="my-custom-heading"
/>
```

## Props

### CardProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | - | Card heading text |
| `headingHtml` | `string` | - | Card heading HTML (takes precedence over heading) |
| `headingLevel` | `HeadingLevel` | `2` | Heading level (1-6) |
| `headingClasses` | `string` | - | Additional classes for the heading |
| `href` | `string` | - | URL for the card link |
| `clickable` | `boolean` | `false` | Whether the entire card is clickable |
| `type` | `CardType` | - | Care card type for medical advice |
| `feature` | `boolean` | `false` | Feature card variant |
| `primary` | `boolean` | `false` | Primary card with chevron icon |
| `secondary` | `boolean` | `false` | Secondary card variant |
| `topTask` | `boolean` | `false` | Top task card variant |
| `imgURL` | `string` | - | Image URL |
| `imgALT` | `string` | - | Image alt text |
| `description` | `string` | - | Description text |
| `descriptionHtml` | `string` | - | Description HTML (takes precedence over description) |
| `children` | `ReactNode` | - | Custom children content |
| `onClick` | `function` | - | Click handler for clickable cards |
| `className` | `string` | - | Additional CSS classes |
| `data-testid` | `string` | - | Test identifier |
| `id` | `string` | - | HTML id attribute |

### CardType

```typescript
type CardType = 'non-urgent' | 'urgent' | 'emergency';
```

### HeadingLevel

```typescript
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
```

## Card Variants

### Basic Card
Default card with white background and border.

### Care Cards
Specialized cards for medical advice with color-coded urgency:

#### Non-urgent (Blue)
- Blue left border and header
- Used for general medical advice
- Includes "Non-urgent advice:" prefix for screen readers

#### Urgent (Red)
- Red left border and header
- Used for urgent medical situations
- Includes "Urgent advice:" prefix for screen readers

#### Emergency (Red + Black)
- Red left border and header
- Black content background with white text
- Used for life-threatening situations
- Includes "Immediate action required:" prefix for screen readers

### Feature Card
- Blue header that extends outside the card boundaries
- Used to highlight important content

### Primary Card
- Includes chevron icon on the right
- Used for actionable content

### Secondary Card
- Minimal styling with bottom border only
- Transparent background
- Used for less prominent content

### Clickable Cards
- Enhanced with click interaction
- Thicker bottom border
- "Pressed down" effect when activated

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy (h1-h6)
- **Screen Reader Support**: Visually hidden prefixes for care cards
- **Keyboard Navigation**: Full keyboard accessibility for interactive elements
- **Focus Management**: Clear focus indicators on links and clickable areas
- **ARIA Labels**: Proper role attributes and hidden decorative elements
- **Color Contrast**: High contrast ratios for all text
- **Alternative Text**: Support for descriptive image alt text

## Visual Design

The component follows NHS UK Design System principles:

- **Typography**: Consistent heading hierarchy and text sizing
- **Colors**: NHS brand colors with semantic meaning
- **Spacing**: Consistent padding and margins using design tokens
- **Borders**: 1px borders with 4px accent borders for variants
- **Shadows**: Subtle depth without overwhelming content
- **Icons**: Accessible decorative elements with proper ARIA attributes

## Care Card Accessibility

Care cards include special accessibility features:

1. **Visually Hidden Prefixes**: Screen readers announce the urgency level
2. **Color + Text**: Not relying on color alone to convey meaning
3. **Role Attributes**: Proper text roles for complex content structure
4. **High Contrast**: Emergency cards use high contrast black/white

## Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Migration from NHS UK

This component maintains full feature parity with the NHS UK card component:

- ✅ All visual styling preserved
- ✅ Care card variants with proper urgency levels
- ✅ Clickable card functionality
- ✅ Feature and variant cards
- ✅ Image support
- ✅ Accessibility features intact
- ✅ Additional TypeScript safety

### Key Changes from NHS UK Version

1. **Technology Stack**: Nunjucks → React + TypeScript
2. **Styling**: SCSS → styled-components with design tokens
3. **Bundle**: Individual component vs monolithic CSS
4. **Type Safety**: Added comprehensive TypeScript interfaces
5. **Testing**: Added comprehensive test coverage
6. **Props**: Simplified and more intuitive prop names

## Examples

### Healthcare Information

```tsx
const HealthcareCards = () => (
  <div>
    <Card 
      heading="If you need help now, but it's not an emergency"
      headingLevel={3}
      description="Go to NHS 111 online or call 111"
    />
    
    <Card 
      heading="Speak to a GP if:"
      type="non-urgent"
      headingLevel={3}
    >
      <ul>
        <li>You're not sure it's chickenpox</li>
        <li>The skin around blisters is red or painful</li>
        <li>Your child is dehydrated</li>
      </ul>
    </Card>
    
    <Card 
      heading="Call 999 if you have sudden chest pain that:"
      type="emergency"
      headingLevel={3}
    >
      <ul>
        <li>Spreads to your arms, back, neck or jaw</li>
        <li>Makes your chest feel tight or heavy</li>
        <li>Started with shortness of breath and sweating</li>
      </ul>
    </Card>
  </div>
);
```

### Service Navigation

```tsx
const ServiceCards = () => (
  <div>
    <Card 
      heading="Breast screening"
      primary
      clickable
      href="/services/breast-screening"
      headingClasses="nhsuk-heading-m"
    />
    
    <Card 
      heading="Introduction to care and support"
      description="A quick guide for people who have care and support needs"
      clickable
      href="/care-support"
      headingClasses="nhsuk-heading-m"
    />
    
    <Card 
      heading="Urgent and emergency care services"
      description="Services the NHS provides for urgent medical help"
      secondary
      clickable
      href="/emergency-care"
      headingClasses="nhsuk-heading-m"
    />
  </div>
);
```

### Featured Content

```tsx
const FeaturedCard = () => (
  <Card 
    heading="COVID-19 vaccines"
    description="Get your COVID-19 vaccination"
    feature
    href="/covid-vaccination"
    imgURL="/images/vaccination.jpg"
    imgALT="Healthcare worker preparing vaccine"
  />
);
```

### Top Tasks

```tsx
const TopTasks = () => (
  <div className="top-tasks-grid">
    <Card 
      heading="Order repeat prescription"
      headingLevel={5}
      headingClasses="nhsuk-heading-xs"
      topTask
      clickable
      href="/prescriptions"
    />
    
    <Card 
      heading="Find a pharmacy"
      headingLevel={5}
      headingClasses="nhsuk-heading-xs"
      topTask
      clickable
      href="/find-pharmacy"
    />
    
    <Card 
      heading="Book appointment"
      headingLevel={5}
      headingClasses="nhsuk-heading-xs"
      topTask
      clickable
      href="/book-appointment"
    />
  </div>
);
```