# Fieldset

A semantic HTML fieldset element for grouping related form elements. Provides proper accessibility with legend support, various sizing options, and can optionally act as a page heading when used for primary form sections.

Converted from the NHS UK Design System Fieldset component for the Public Good Design System.

## Features

- **Semantic HTML**: Uses proper `<fieldset>` and `<legend>` elements for accessibility
- **Flexible legend**: Support for text, HTML, and various sizes (xl, l, m, s)
- **Page heading option**: Legend can act as page heading (wrapped in h1)
- **ARIA support**: Supports `aria-describedby` for additional context
- **Form grouping**: Properly groups related form elements
- **Responsive design**: Typography scales appropriately across screen sizes
- **WCAG AA compliant**: Meets accessibility standards

## Usage

```tsx
import { Fieldset } from '@/components/fieldset';

// Basic fieldset with legend
<Fieldset legend={{ text: "Personal information" }}>
  <Input label="First name" name="firstName" />
  <Input label="Last name" name="lastName" />
</Fieldset>

// Large legend as page heading
<Fieldset 
  legend={{ 
    text: "What is your address?", 
    size: "l",
    isPageHeading: true 
  }}
>
  <Input label="Address line 1" name="address1" />
  <Input label="Address line 2" name="address2" />
  <Input label="City" name="city" />
</Fieldset>

// With HTML legend content
<Fieldset legend={{ html: "<strong>Contact</strong> details" }}>
  <Input label="Phone number" name="phone" type="tel" />
  <Input label="Email address" name="email" type="email" />
</Fieldset>

// With aria-describedby for additional context
<Fieldset 
  legend={{ text: "Emergency contact" }}
  describedBy="emergency-hint"
>
  <div id="emergency-hint">
    Provide details for someone we can contact in an emergency
  </div>
  <Input label="Contact name" name="emergencyName" />
  <Input label="Contact phone" name="emergencyPhone" />
</Fieldset>

// Radio button group
<Fieldset legend={{ text: "Preferred contact method", size: "m" }}>
  <RadioGroup name="contact" options={[
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "post", label: "Post" }
  ]} />
</Fieldset>
```

## Props

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `legend` | `FieldsetLegend` | - | Legend configuration object |
| `children` | `ReactNode` | - | Form elements to group |
| `describedBy` | `string` | - | Element IDs for aria-describedby attribute |
| `classes` | `string` | - | Additional CSS classes |
| `attributes` | `Record<string, string>` | - | Additional HTML attributes |

### Inherited Props

The component also accepts all standard HTML attributes through `BaseComponentProps`:
- `className` - CSS class names
- `data-testid` - Test identifier
- Standard HTML attributes like `role`, `aria-*`, etc.

### Legend Configuration

```tsx
interface FieldsetLegend {
  text?: string;           // Legend text content
  html?: string;           // Legend HTML content (takes precedence over text)
  size?: 'xl' | 'l' | 'm' | 's';  // Size variant
  classes?: string;        // Additional CSS classes for legend
  isPageHeading?: boolean; // Whether legend should be wrapped in h1
}
```

## Legend Sizes

### Extra Large (xl)
Used for primary page headings and major form sections.

```tsx
<Fieldset legend={{ text: "Patient Registration", size: "xl", isPageHeading: true }}>
  {/* Main form content */}
</Fieldset>
```

### Large (l)
Used for important form sections and secondary headings.

```tsx
<Fieldset legend={{ text: "Contact Information", size: "l" }}>
  {/* Contact form fields */}
</Fieldset>
```

### Medium (m)
Used for standard form sections and subsections.

```tsx
<Fieldset legend={{ text: "Address Details", size: "m" }}>
  {/* Address form fields */}
</Fieldset>
```

### Small (s)
Used for minor groupings and compact sections.

```tsx
<Fieldset legend={{ text: "Preferences", size: "s" }}>
  {/* Preference checkboxes */}
</Fieldset>
```

### Default
Used when no size is specified, provides standard sizing.

```tsx
<Fieldset legend={{ text: "Additional Information" }}>
  {/* Standard form fields */}
</Fieldset>
```

## Form Integration Examples

### Address Form

```tsx
<Fieldset 
  legend={{ 
    text: "What is your address?", 
    size: "l",
    isPageHeading: true 
  }}
>
  <Input 
    label="Address line 1" 
    name="address1" 
    autocomplete="address-line1"
  />
  <Input 
    label="Address line 2" 
    name="address2" 
    autocomplete="address-line2"
  />
  <Input 
    label="Town or city" 
    name="city" 
    autocomplete="address-level2"
  />
  <Input 
    label="County (optional)" 
    name="county" 
  />
  <Input 
    label="Postcode" 
    name="postcode" 
    autocomplete="postal-code"
  />
</Fieldset>
```

### Contact Preferences

```tsx
<Fieldset 
  legend={{ text: "How would you like to be contacted?", size: "m" }}
  describedBy="contact-hint"
>
  <div id="contact-hint">
    We'll use this to send you appointment reminders and health updates
  </div>
  
  <div>
    <input type="radio" id="email-pref" name="contact-preference" value="email" />
    <label htmlFor="email-pref">Email</label>
  </div>
  
  <div>
    <input type="radio" id="sms-pref" name="contact-preference" value="sms" />
    <label htmlFor="sms-pref">Text message</label>
  </div>
  
  <div>
    <input type="radio" id="phone-pref" name="contact-preference" value="phone" />
    <label htmlFor="phone-pref">Phone call</label>
  </div>
  
  <div>
    <input type="radio" id="post-pref" name="contact-preference" value="post" />
    <label htmlFor="post-pref">Post</label>
  </div>
</Fieldset>
```

### Date of Birth

```tsx
<Fieldset 
  legend={{ text: "What is your date of birth?", size: "m" }}
  describedBy="dob-hint"
>
  <div id="dob-hint">
    For example, 31 03 1980
  </div>
  
  <div style={{ display: 'flex', gap: '1rem' }}>
    <div>
      <label htmlFor="dob-day">Day</label>
      <input 
        id="dob-day" 
        name="dob-day" 
        type="text" 
        inputMode="numeric" 
        maxLength={2}
        style={{ width: '4rem' }}
      />
    </div>
    
    <div>
      <label htmlFor="dob-month">Month</label>
      <input 
        id="dob-month" 
        name="dob-month" 
        type="text" 
        inputMode="numeric" 
        maxLength={2}
        style={{ width: '4rem' }}
      />
    </div>
    
    <div>
      <label htmlFor="dob-year">Year</label>
      <input 
        id="dob-year" 
        name="dob-year" 
        type="text" 
        inputMode="numeric" 
        maxLength={4}
        style={{ width: '6rem' }}
      />
    </div>
  </div>
</Fieldset>
```

## Healthcare Examples

### Patient Registration Form

```tsx
<Fieldset 
  legend={{ 
    text: "Patient Registration", 
    size: "xl",
    isPageHeading: true 
  }}
>
  <Input 
    label="NHS number" 
    name="nhsNumber"
    hint="This is a 10 digit number, like 485 777 3456"
  />
  
  <Input 
    label="Full name" 
    name="fullName"
    autocomplete="name"
  />
  
  <Fieldset 
    legend={{ text: "Date of birth", size: "m" }}
    describedBy="dob-hint"
  >
    <div id="dob-hint">For example, 31 03 1980</div>
    <DateInput name="dateOfBirth" />
  </Fieldset>
  
  <RadioGroup
    legend={{ text: "Sex", size: "m" }}
    name="sex"
    options={[
      { value: "female", label: "Female" },
      { value: "male", label: "Male" }
    ]}
  />
</Fieldset>
```

### Medical History Form

```tsx
<Fieldset 
  legend={{ 
    html: "Medical <strong>History</strong>", 
    size: "l",
    isPageHeading: true 
  }}
>
  <Fieldset 
    legend={{ text: "Current medications", size: "m" }}
    describedBy="medications-hint"
  >
    <div id="medications-hint">
      Include prescription medicines, over-the-counter medicines, and supplements
    </div>
    
    <Textarea
      label="List your current medications"
      name="currentMedications"
      rows={4}
    />
  </Fieldset>
  
  <Fieldset legend={{ text: "Known allergies", size: "m" }}>
    <Checkboxes
      name="allergies"
      items={[
        { value: "penicillin", text: "Penicillin" },
        { value: "aspirin", text: "Aspirin" },
        { value: "latex", text: "Latex" },
        { value: "shellfish", text: "Shellfish" },
        { value: "other", text: "Other (please specify)" }
      ]}
    />
  </Fieldset>
  
  <Fieldset legend={{ text: "Family medical history", size: "m" }}>
    <Checkboxes
      name="familyHistory"
      items={[
        { value: "diabetes", text: "Diabetes" },
        { value: "heart-disease", text: "Heart disease" },
        { value: "cancer", text: "Cancer" },
        { value: "mental-health", text: "Mental health conditions" }
      ]}
    />
  </Fieldset>
</Fieldset>
```

### Appointment Booking Form

```tsx
<Fieldset 
  legend={{ 
    text: "Book an Appointment", 
    size: "xl",
    isPageHeading: true 
  }}
>
  <RadioGroup
    legend={{ text: "What type of appointment do you need?", size: "m" }}
    name="appointmentType"
    options={[
      { 
        value: "general", 
        label: "General consultation",
        hint: "For routine check-ups and general health concerns"
      },
      { 
        value: "specialist", 
        label: "Specialist consultation",
        hint: "For specific medical conditions requiring specialist care"
      },
      { 
        value: "followup", 
        label: "Follow-up appointment",
        hint: "Following up on previous treatment or test results"
      }
    ]}
  />
  
  <Fieldset legend={{ text: "Preferred appointment format", size: "m" }}>
    <RadioGroup
      name="appointmentFormat"
      options={[
        { value: "in-person", label: "In-person consultation" },
        { value: "video", label: "Video consultation" },
        { value: "phone", label: "Phone consultation" }
      ]}
    />
  </Fieldset>
  
  <Fieldset 
    legend={{ text: "Symptoms and concerns", size: "m" }}
    describedBy="symptoms-hint"
  >
    <div id="symptoms-hint">
      Please describe your symptoms or the reason for your appointment
    </div>
    
    <Textarea
      label="Description"
      name="symptoms"
      rows={4}
    />
  </Fieldset>
</Fieldset>
```

### Emergency Contact Information

```tsx
<Fieldset 
  legend={{ 
    text: "Emergency Contact Information", 
    size: "l" 
  }}
  describedBy="emergency-description"
>
  <div id="emergency-description">
    <p>Please provide details for someone we can contact in case of an emergency.</p>
    <p>This person should be someone who:</p>
    <ul>
      <li>Is not the patient</li>
      <li>Can be reached quickly</li>
      <li>Knows about your medical history</li>
    </ul>
  </div>
  
  <Input 
    label="Emergency contact name" 
    name="emergencyName"
    autocomplete="name"
  />
  
  <Input 
    label="Relationship to patient" 
    name="emergencyRelationship"
  />
  
  <Input 
    label="Phone number" 
    name="emergencyPhone"
    type="tel"
    autocomplete="tel"
  />
  
  <Input 
    label="Alternative phone number (optional)" 
    name="emergencyPhoneAlt"
    type="tel"
  />
</Fieldset>
```

### Insurance and Payment Information

```tsx
<Fieldset 
  legend={{ 
    text: "Insurance and Payment", 
    size: "l" 
  }}
>
  <Fieldset legend={{ text: "Insurance details", size: "m" }}>
    <Input 
      label="Insurance provider" 
      name="insuranceProvider"
    />
    
    <Input 
      label="Policy number" 
      name="policyNumber"
    />
    
    <Input 
      label="Group number" 
      name="groupNumber"
    />
  </Fieldset>
  
  <Fieldset legend={{ text: "Billing address", size: "m" }}>
    <Input label="Address line 1" name="billingAddress1" />
    <Input label="Address line 2" name="billingAddress2" />
    <Input label="City" name="billingCity" />
    <Input label="Postcode" name="billingPostcode" />
  </Fieldset>
</Fieldset>
```

## Accessibility Features

### Semantic Structure

- **Fieldset element**: Uses proper `<fieldset>` element for form grouping
- **Legend element**: Uses `<legend>` element for group description
- **Page heading**: Optional h1 wrapper for page-level legends

### Screen Reader Support

- **Group recognition**: Screen readers announce fieldset as a group
- **Legend announcement**: Legend text is announced with form fields
- **Context association**: aria-describedby provides additional context

### Keyboard Navigation

- **Focus management**: Fields within fieldset are part of tab order
- **Group navigation**: Screen readers can navigate by form groups
- **Skip functionality**: Users can skip entire groups if needed

## Visual Design

The component uses consistent styling:

- **Typography**: Responsive font sizes based on legend size
- **Spacing**: Proper margins and padding for visual hierarchy
- **Colors**: Uses design system colors for consistency
- **Layout**: Clean, accessible layout with proper spacing

## Technical Notes

- Built with styled-components for consistent theming
- Uses semantic HTML5 fieldset and legend elements
- Responsive typography that scales with screen size
- TypeScript definitions for type safety
- Server-side rendering compatible

## Browser Support

Compatible with all modern browsers including:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- IE11 (with polyfills)

## Related Components

- **[Input](../input/README.md)** - Text input fields commonly grouped in fieldsets
- **[RadioGroup](../radio-group/README.md)** - Radio buttons that should be grouped in fieldsets
- **[Checkboxes](../checkboxes/README.md)** - Checkbox groups that benefit from fieldset grouping
- **[DateInput](../date-input/README.md)** - Date inputs that use fieldset internally

## Best Practices

### When to Use Fieldset

1. **Related form fields**: Group fields that are conceptually related
2. **Radio button groups**: Always wrap radio buttons in fieldsets
3. **Checkbox groups**: Group related checkboxes together
4. **Multi-part inputs**: Group parts of compound inputs (like dates)
5. **Form sections**: Create logical sections in long forms

### Legend Guidelines

1. **Descriptive**: Make legends descriptive of the grouped content
2. **Concise**: Keep legends short but meaningful
3. **Question format**: Use questions when appropriate ("What is your address?")
4. **Size appropriately**: Use larger sizes for more important groupings
5. **Page headings**: Use isPageHeading for primary form sections

### Implementation Tips

1. **Avoid nesting**: Don't nest fieldsets unless absolutely necessary
2. **Single purpose**: Each fieldset should have a clear, single purpose
3. **Logical order**: Order fieldsets in a logical sequence
4. **Consistent sizing**: Use consistent legend sizes throughout forms
5. **Error handling**: Consider how errors will be displayed within fieldsets

### Accessibility Guidelines

1. **Always include legends**: Don't use fieldset without a legend
2. **Meaningful legends**: Ensure legends provide context for the grouped fields
3. **Use describedBy**: Add additional context with aria-describedby when needed
4. **Test with screen readers**: Verify the grouping makes sense to assistive technology
5. **Logical tab order**: Ensure tab order flows logically through grouped fields