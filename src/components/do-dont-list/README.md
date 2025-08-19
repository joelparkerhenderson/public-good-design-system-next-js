# DoDontList

A component for displaying clear, actionable lists of things users should do or should not do. Provides visual distinction with green tick icons for "do" items and red cross icons for "don't" items. Commonly used in healthcare guidance to provide clear, accessible advice.

Converted from the NHS UK Design System Do and Don't List component for the Public Good Design System.

## Features

- **Clear visual distinction**: Green ticks for "do" items, red crosses for "don't" items
- **Semantic HTML**: Uses proper list markup for accessibility
- **Flexible content**: Support for any type of guidance or instruction
- **Customizable prefixes**: Option to hide "do not" prefix for "don't" lists
- **Heading levels**: Configurable heading levels (h1-h6) for proper document structure
- **Screen reader support**: Properly announced list items and visual cues
- **Responsive design**: Adapts to different screen sizes

## Usage

```tsx
import { DoDontList } from '@/components/do-dont-list';

// Basic "do" list with green ticks
<DoDontList
  title="Do"
  type="do"
  items={[
    { item: "wash your hands regularly" },
    { item: "get plenty of rest" },
    { item: "drink lots of fluids" }
  ]}
/>

// Basic "don't" list with red crosses and automatic "do not" prefix
<DoDontList
  title="Don't"
  type="dont"
  items={[
    { item: "smoke" },
    { item: "drink alcohol excessively" },
    { item: "ignore symptoms" }
  ]}
/>

// "Don't" list without "do not" prefix
<DoDontList
  title="Avoid"
  type="dont"
  hidePrefix={true}
  items={[
    { item: "strenuous exercise" },
    { item: "heavy lifting" },
    { item: "spicy foods" }
  ]}
/>

// Custom heading level for proper document structure
<DoDontList
  title="Before your appointment"
  type="do"
  headingLevel={2}
  items={[
    { item: "bring your NHS card" },
    { item: "arrive 15 minutes early" },
    { item: "bring a list of current medications" }
  ]}
/>
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | The heading/title for the list |
| `type` | `'do' \| 'dont'` | Type of list - determines icon and styling |
| `items` | `DoDontListItem[]` | Array of list items to display |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hidePrefix` | `boolean` | `false` | For "dont" lists, hide the automatic "do not" prefix |
| `headingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `3` | Heading level for the title |
| `classes` | `string` | - | Additional CSS classes |
| `attributes` | `Record<string, string>` | - | Additional HTML attributes |

### Inherited Props

The component also accepts all standard HTML attributes through `BaseComponentProps`:
- `className` - CSS class names
- `data-testid` - Test identifier
- Standard HTML attributes like `role`, `aria-*`, etc.

### Types

```tsx
interface DoDontListItem {
  item: string; // The text content of the list item
}

type DoDontListType = 'do' | 'dont';
```

## List Types

### Do Lists (`type="do"`)
- Display green tick icons
- No automatic prefix added
- Used for positive actions or recommendations

### Don't Lists (`type="dont"`)
- Display red cross icons
- Automatically adds "do not" prefix unless `hidePrefix={true}`
- Used for warnings, restrictions, or things to avoid

## Healthcare Examples

### Post-Surgery Care Instructions
```tsx
<>
  <DoDontList
    title="After your surgery"
    type="do"
    headingLevel={2}
    items={[
      { item: "take pain medication as prescribed" },
      { item: "keep the wound clean and dry" },
      { item: "attend all follow-up appointments" },
      { item: "gentle walking as tolerated" },
      { item: "report any signs of infection immediately" }
    ]}
  />

  <DoDontList
    title="Important restrictions"
    type="dont"
    headingLevel={2}
    items={[
      { item: "lift anything heavier than 5kg" },
      { item: "drive for the first 48 hours" },
      { item: "get the wound wet for 7 days" },
      { item: "smoke or drink alcohol" },
      { item: "ignore increasing pain or swelling" }
    ]}
  />
</>
```

### Medication Instructions
```tsx
<>
  <DoDontList
    title="Taking your medication"
    type="do"
    items={[
      { item: "take with food to reduce stomach upset" },
      { item: "take at the same time each day" },
      { item: "complete the full course even if you feel better" },
      { item: "store in a cool, dry place" },
      { item: "check expiry dates regularly" }
    ]}
  />

  <DoDontList
    title="Safety warnings"
    type="dont"
    items={[
      { item: "drive or operate machinery until you know how this affects you" },
      { item: "drink alcohol while taking this medication" },
      { item: "stop taking suddenly without consulting your doctor" },
      { item: "share medication with others" },
      { item: "take double doses if you miss one" }
    ]}
  />
</>
```

### Appointment Preparation
```tsx
<DoDontList
  title="What to bring"
  type="do"
  items={[
    { item: "your NHS medical card or NHS number" },
    { item: "photo ID (driving licence or passport)" },
    { item: "list of current medications and doses" },
    { item: "any referral letters from your GP" },
    { item: "insurance documents if applicable" },
    { item: "a support person if needed" }
  ]}
/>
```

### Exercise and Recovery
```tsx
<>
  <DoDontList
    title="Recommended activities"
    type="do"
    items={[
      { item: "start with gentle stretching" },
      { item: "gradually increase activity levels" },
      { item: "listen to your body" },
      { item: "stay hydrated during exercise" },
      { item: "warm up before and cool down after exercise" }
    ]}
  />

  <DoDontList
    title="Activities to avoid"
    type="dont"
    hidePrefix={true}
    items={[
      { item: "high-impact sports for 6 weeks" },
      { item: "heavy weightlifting" },
      { item: "contact sports" },
      { item: "activities that cause pain" },
      { item: "exercise if you have a fever" }
    ]}
  />
</>
```

### COVID-19 Guidelines
```tsx
<>
  <DoDontList
    title="Protect yourself and others"
    type="do"
    items={[
      { item: "wash your hands for at least 20 seconds" },
      { item: "wear a face covering in healthcare settings" },
      { item: "maintain social distancing when possible" },
      { item: "get vaccinated when eligible" },
      { item: "stay home if you feel unwell" },
      { item: "test if you have symptoms" }
    ]}
  />

  <DoDontList
    title="Help prevent spread"
    type="dont"
    items={[
      { item: "touch your face with unwashed hands" },
      { item: "attend gatherings if you have symptoms" },
      { item: "ignore government health guidelines" },
      { item: "share personal items like towels or utensils" },
      { item: "visit vulnerable people if you're unwell" }
    ]}
  />
</>
```

### Diet and Nutrition
```tsx
<DoDontList
  title="Heart-healthy eating"
  type="do"
  items={[
    { item: "eat plenty of fruits and vegetables" },
    { item: "choose whole grains over refined grains" },
    { item: "include lean proteins like fish and poultry" },
    { item: "use olive oil instead of butter" },
    { item: "limit portion sizes" },
    { item: "stay hydrated with water" }
  ]}
/>
```

## Visual Design

The component uses distinctive visual cues:

- **Do items**: Green tick icon (#007f3b) indicating positive actions
- **Don't items**: Red cross icon (#d5281b) indicating things to avoid
- **Typography**: Clear, readable text with proper hierarchy
- **Spacing**: Consistent spacing between items for easy scanning
- **Icons**: 34px square icons positioned to the left of each item

## Accessibility

- Uses semantic `<ul>` and `<li>` HTML elements
- Proper heading structure with configurable levels
- Icons have `aria-hidden="true"` as they're decorative
- Clear visual distinction between "do" and "don't" items
- High contrast colors for visibility
- Responsive design for different screen sizes
- Compatible with screen readers

## Technical Notes

- Built with styled-components for consistent theming
- Responsive design adapts to mobile and desktop screens
- Icons are inline SVG for crisp rendering at all sizes
- Automatic prefix handling for "don't" items
- Flexible heading levels for proper document structure
- TypeScript support with comprehensive type definitions

## Browser Support

Compatible with all modern browsers. SVG icons are supported in IE9+ and all modern browsers.

## Related Components

- **[Details](../details/README.md)** - For expandable content that might contain do/don't lists
- **[Card](../card/README.md)** - For containing do/don't lists with other related content
- **[Button](../button/README.md)** - For actions users might take after reading the guidance

## Best Practices

1. **Keep items concise**: Each item should be a clear, actionable statement
2. **Use parallel structure**: Maintain consistent grammar across all items
3. **Order by importance**: Put the most critical items first
4. **Balance lists**: Avoid having too many more "don't" items than "do" items
5. **Consider context**: Use appropriate heading levels for document structure
6. **Test with users**: Ensure the guidance is clear and actionable