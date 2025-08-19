# CharacterCount Component

A textarea component with real-time character or word counting functionality. Provides accessibility features including screen reader announcements and visual feedback when limits are approached or exceeded.

Converted from NHS UK Design System character-count component.

## Features

- **Character or word counting**: Support for both character and word limits
- **Real-time feedback**: Live updates as users type
- **Threshold display**: Show counter only when approaching limit
- **Accessibility**: Screen reader announcements and ARIA attributes
- **Error states**: Visual feedback when limits are exceeded
- **Speech recognition support**: Polling mechanism for external text input
- **NHS UK compatibility**: Maintains exact feature parity

## Basic Usage

```tsx
import { CharacterCount } from '@/components/character-count';

// Basic character count
<CharacterCount
  name="feedback"
  label={{ text: "Can you provide more detail?" }}
  maxlength={200}
/>

// Word count with hint
<CharacterCount
  name="description"
  label={{ text: "Job description" }}
  hint={{ text: "Do not include personal information" }}
  maxwords={50}
/>
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Input name attribute |
| `label` | `LabelProps` | Label configuration object |
| `maxlength` or `maxwords` | `number` | Character or word limit |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `name` value | Input ID attribute |
| `rows` | `number` | `5` | Number of textarea rows |
| `value` | `string` | `''` | Initial value |
| `hint` | `HintProps` | - | Hint text configuration |
| `errorMessage` | `ErrorMessageProps` | - | Error message configuration |
| `threshold` | `number` | `0` | Percentage to show counter (0-100) |
| `spellcheck` | `boolean` | - | Enable/disable spellcheck |
| `classes` | `string` | - | Additional textarea classes |
| `attributes` | `Record<string, string>` | - | Additional textarea attributes |
| `onChange` | `function` | - | Change event handler |
| `onFocus` | `function` | - | Focus event handler |
| `onBlur` | `function` | - | Blur event handler |

## Interface Types

### LabelProps
```tsx
interface LabelProps {
  text?: string;           // Label text
  html?: string;           // Label HTML (takes precedence)
  classes?: string;        // Additional CSS classes
  isPageHeading?: boolean; // Render as page heading (h1)
  attributes?: Record<string, string>; // Additional attributes
}
```

### HintProps
```tsx
interface HintProps {
  text?: string;    // Hint text
  html?: string;    // Hint HTML (takes precedence)
  classes?: string; // Additional CSS classes
}
```

### ErrorMessageProps
```tsx
interface ErrorMessageProps {
  text?: string;    // Error text
  html?: string;    // Error HTML (takes precedence)
  classes?: string; // Additional CSS classes
}
```

## Examples

### Character Count with Threshold
```tsx
<CharacterCount
  name="comments"
  label={{ text: "Additional comments" }}
  hint={{ text: "Include any relevant details" }}
  maxlength={500}
  threshold={75}
  rows={8}
/>
```

### Word Count with Error
```tsx
<CharacterCount
  name="summary"
  label={{ 
    text: "Executive summary",
    isPageHeading: true 
  }}
  maxwords={150}
  errorMessage={{ text: "Summary is required" }}
  value="Initial content..."
/>
```

### Medical Context Example
```tsx
<CharacterCount
  name="symptoms"
  label={{ text: "Describe your symptoms" }}
  hint={{ 
    html: "Include <strong>when</strong> symptoms started and <strong>how severe</strong> they are" 
  }}
  maxlength={1000}
  threshold={80}
  spellcheck={true}
  onChange={(e) => console.log('Symptoms:', e.target.value)}
/>
```

### Healthcare Professional Form
```tsx
<CharacterCount
  name="clinical-notes"
  label={{ text: "Clinical observations" }}
  hint={{ text: "Record patient observations and treatment notes" }}
  maxwords={200}
  threshold={90}
  rows={10}
  classes="clinical-notes-textarea"
  attributes={{
    'data-patient-id': '12345',
    'data-session-id': 'abc-def-ghi'
  }}
/>
```

## Accessibility Features

- **ARIA labels**: Proper labeling and descriptions
- **Screen reader support**: Live region announcements
- **Keyboard navigation**: Full keyboard accessibility
- **Focus management**: Clear focus indicators
- **Error association**: Proper error message linking
- **Hidden content**: Appropriate use of aria-hidden

## Counting Behavior

### Character Counting
- Counts all characters including spaces and punctuation
- Updates in real-time as user types
- Shows remaining characters until limit reached
- Displays "too many" message when exceeded

### Word Counting
- Counts consecutive non-whitespace characters as words
- Ignores multiple spaces between words
- More appropriate for longer text content
- Takes precedence over character counting when both are set

### Threshold Display
- Counter hidden until threshold percentage reached
- Helps reduce visual noise for short content
- Common thresholds: 75% (early warning), 90% (final warning)
- Set to 0 to always show counter

## Speech Recognition Support

The component includes polling mechanism to detect changes made by speech recognition software:
- Monitors value changes during focus
- Updates counter when external changes detected
- Prevents conflicts with keyboard input
- Stops monitoring when textarea loses focus

## Error States

### Visual Indicators
- Red border on textarea when over limit
- Error-styled counter message
- Integration with existing error messages

### Screen Reader Announcements
- Live region updates for count changes
- Error state announcements
- Threshold crossing notifications

## Healthcare Use Cases

### Patient Forms
```tsx
// Symptom description
<CharacterCount
  name="symptoms"
  label={{ text: "Describe your main symptoms" }}
  hint={{ text: "Include when they started and how they affect you" }}
  maxlength={500}
  threshold={80}
/>

// Medical history
<CharacterCount
  name="medical-history"
  label={{ text: "Previous medical conditions" }}
  hint={{ text: "List any ongoing conditions or past surgeries" }}
  maxwords={100}
  threshold={90}
/>
```

### Professional Documentation
```tsx
// Care plan notes
<CharacterCount
  name="care-plan"
  label={{ text: "Care plan updates" }}
  maxwords={300}
  threshold={85}
  rows={12}
/>

// Medication notes
<CharacterCount
  name="medication-notes"
  label={{ text: "Medication observations" }}
  hint={{ text: "Record any side effects or patient concerns" }}
  maxlength={800}
  threshold={75}
/>
```

## Styling

The component uses styled-components with design tokens for consistent styling:
- NHS-compliant typography and spacing
- Responsive design patterns
- High contrast focus states
- Error state styling
- Mobile-optimized touch targets

## Testing

Comprehensive test coverage includes:
- Character and word counting accuracy
- Threshold behavior verification
- Accessibility compliance testing
- Error state handling
- Event handler verification
- Screen reader functionality
- Speech recognition simulation

## Browser Support

- Modern browsers with JavaScript enabled
- Graceful degradation without JavaScript
- Screen reader compatibility
- Mobile device optimization
- Touch interaction support