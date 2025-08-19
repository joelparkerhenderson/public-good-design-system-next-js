# Button Component

A flexible button component that can render as button, input, or anchor elements with multiple visual variants and full accessibility support. This component is converted from the NHS UK Design System button component and maintains full accessibility compliance (WCAG AA).

## Features

- **Multiple Element Types**: Renders as `button`, `input`, or `a` elements
- **Visual Variants**: Primary, secondary, reverse, warning, and login styles
- **Accessibility**: Full WCAG AA compliance with proper ARIA attributes
- **Double Click Prevention**: Optional protection against accidental double submissions
- **Responsive Design**: Adapts from full-width on mobile to auto-width on desktop
- **TypeScript**: Full type safety with comprehensive interfaces

## Usage

### Basic Examples

```tsx
import { Button } from '@/components/button';

// Primary button (default)
<Button text="Save and continue" />

// Secondary button
<Button text="Find my location" variant="secondary" />

// Button as a link
<Button text="Continue" href="/next-page" />

// Warning button
<Button text="Delete item" variant="warning" />
```

### Advanced Examples

```tsx
// Button with HTML content
<Button html="<strong>Save</strong> and continue" />

// Input button
<Button text="Submit" element="input" type="submit" />

// Disabled button
<Button text="Unavailable" disabled />

// Button with double click prevention
<Button text="Submit form" preventDoubleClick />

// Custom button with event handler
<Button 
  text="Custom action" 
  onClick={(event) => console.log('Clicked!')}
  className="custom-class"
/>
```

### All Variants

```tsx
// Primary (default) - green background
<Button text="Primary action" variant="primary" />

// Secondary - transparent background with blue border
<Button text="Secondary action" variant="secondary" />

// Secondary solid - white background with blue border
<Button text="Secondary solid" variant="secondary-solid" />

// Reverse - white background for dark themes
<Button text="Reverse action" variant="reverse" />

// Warning - red background for destructive actions
<Button text="Delete" variant="warning" />

// Login - blue background for authentication
<Button text="Log in" variant="login" />
```

## Props

### ButtonProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Text content for the button |
| `html` | `string` | - | HTML content (takes precedence over text) |
| `variant` | `ButtonVariant` | `'primary'` | Button variant style |
| `element` | `ButtonElement` | Auto-detected | HTML element type to render |
| `type` | `ButtonType` | `'submit'` | Button type for button/input elements |
| `name` | `string` | - | Name attribute for button/input elements |
| `value` | `string` | - | Value attribute for button elements |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `href` | `string` | - | URL for anchor element |
| `preventDoubleClick` | `boolean` | `false` | Prevent accidental double clicks on submit buttons |
| `onClick` | `function` | - | Click handler |
| `className` | `string` | - | Additional CSS classes |
| `data-testid` | `string` | - | Test identifier |
| `id` | `string` | - | HTML id attribute |

### ButtonVariant

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'secondary-solid' | 'reverse' | 'warning' | 'login';
```

### ButtonElement

```typescript
type ButtonElement = 'button' | 'input' | 'a';
```

### ButtonType

```typescript
type ButtonType = 'button' | 'submit' | 'reset';
```

## Element Type Selection

The component automatically chooses the appropriate HTML element:

1. **Anchor (`a`)**: Used when `href` is provided
2. **Input (`input`)**: Used when `element="input"` is specified
3. **Button (`button`)**: Default for all other cases

You can override the automatic selection by explicitly setting the `element` prop.

## Accessibility Features

- Uses semantic HTML elements (`button`, `input`, `a`)
- Proper ARIA attributes (`aria-disabled` for disabled buttons)
- Role="button" for anchor elements acting as buttons
- High contrast focus indicators with yellow background
- Keyboard navigation support
- Screen reader compatible

## Visual Design

The button follows NHS UK Design System principles:

- **Shadow Effect**: 4px drop shadow that disappears when pressed
- **Responsive Sizing**: Full width on mobile, auto width on desktop
- **Focus States**: Yellow background with black text and outline
- **Active States**: Button "presses down" by removing shadow
- **Typography**: Bold text with appropriate font sizing

## Double Click Prevention

When `preventDoubleClick` is enabled:

1. After first click, subsequent clicks are prevented for 1 second
2. Visual feedback shows the button is temporarily disabled
3. Only applies to `button` and `input` elements (not anchors)
4. Helps prevent accidental form submissions

```tsx
<Button 
  text="Submit application" 
  preventDoubleClick 
  onClick={submitForm}
/>
```

## Styling Variants

### Primary (Default)
- Green background (`#00a499`)
- White text
- Used for primary actions

### Secondary
- Transparent background
- Blue border and text (`#005eb8`)
- Used for secondary actions

### Secondary Solid
- White background
- Blue border and text (`#005eb8`)
- Used on colored backgrounds

### Reverse
- White background
- Black text
- Used on dark backgrounds

### Warning
- Red background (`#d5281b`)
- White text
- Used for destructive actions

### Login
- Blue background (`#005eb8`)
- White text
- Used for authentication flows

## Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Migration from NHS UK

This component maintains full feature parity with the NHS UK button component:

- ✅ All visual styling preserved
- ✅ Multiple element types supported
- ✅ All variants implemented
- ✅ Double click prevention
- ✅ Accessibility features intact
- ✅ Additional TypeScript safety

### Key Changes from NHS UK Version

1. **Technology Stack**: Nunjucks → React + TypeScript
2. **Styling**: SCSS → styled-components with design tokens
3. **Bundle**: Individual component vs monolithic CSS
4. **Type Safety**: Added comprehensive TypeScript interfaces
5. **Testing**: Added comprehensive test coverage

## Examples

### Form Submission

```tsx
const MyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    await submitForm();
    setIsSubmitting(false);
  };
  
  return (
    <form>
      {/* Form fields */}
      <Button 
        text={isSubmitting ? "Submitting..." : "Submit application"}
        onClick={handleSubmit}
        disabled={isSubmitting}
        preventDoubleClick
      />
    </form>
  );
};
```

### Navigation

```tsx
const Navigation = () => (
  <div>
    <Button text="Back" variant="secondary" href="/previous" />
    <Button text="Continue" href="/next" />
  </div>
);
```

### Confirmation Dialog

```tsx
const ConfirmDialog = ({ onConfirm, onCancel }) => (
  <div>
    <p>Are you sure you want to delete this item?</p>
    <Button text="Cancel" variant="secondary" onClick={onCancel} />
    <Button text="Yes, delete" variant="warning" onClick={onConfirm} />
  </div>
);
```

### Login Form

```tsx
const LoginForm = () => (
  <form>
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <Button 
      text="Log in" 
      variant="login" 
      type="submit"
      preventDoubleClick
    />
  </form>
);
```