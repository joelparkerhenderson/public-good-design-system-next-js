# Textarea Component

A multi-line text input component for longer text content. Includes support for labels, hints, error messages, and form validation. Perfect for comments, descriptions, medical notes, and other longer text entries. Converted from the NHS UK Design System to support the Public Good Design System.

## Features

- **Multi-line Input**: Configurable number of rows for different content lengths
- **Label Integration**: Automatic association with label for accessibility
- **Hint Support**: Optional help text to guide users
- **Error Handling**: Built-in error state with validation styling
- **Form Integration**: Proper form group structure with error styling
- **Accessibility First**: Complete ARIA support and screen reader compatibility
- **Controlled/Uncontrolled**: Support for both controlled and uncontrolled components
- **Healthcare Optimized**: Perfect for medical notes, patient descriptions, and clinical documentation
- **Custom Styling**: Extensive customization options with CSS classes and attributes

## Usage

### Basic Textarea

```tsx
import { Textarea } from '@public-good/design-system';

<Textarea 
  name="comments"
  label={{ text: "Additional comments" }}
/>
```

### Textarea with Hint

```tsx
<Textarea 
  name="symptoms"
  label={{ text: "Describe your symptoms" }}
  hint={{ text: "Please provide as much detail as possible about when symptoms started, severity, and any triggers" }}
  rows={6}
/>
```

### Textarea with Error State

```tsx
<Textarea 
  name="notes"
  label={{ text: "Medical notes" }}
  errorMessage={{ text: "This field is required" }}
  value={value}
  onChange={handleChange}
/>
```

### Controlled Textarea

```tsx
const [value, setValue] = useState('');

<Textarea 
  name="controlled"
  label={{ text: "Controlled textarea" }}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Type your message here..."
/>
```

### Textarea with Validation

```tsx
<Textarea 
  name="feedback"
  label={{ text: "Patient feedback" }}
  hint={{ text: "Your feedback helps us improve our services" }}
  required
  maxLength={500}
  rows={8}
/>
```

### Large Textarea with Page Heading

```tsx
<Textarea 
  name="assessment"
  label={{ 
    text: "Patient Assessment",
    isPageHeading: true,
    size: 'l'
  }}
  hint={{ text: "Document comprehensive patient evaluation and clinical findings" }}
  rows={10}
  required
/>
```

## Healthcare Use Cases

### Patient Symptom Description

```tsx
<Textarea 
  name="symptoms"
  label={{ text: "Describe your symptoms" }}
  hint={{ 
    html: "Please include:<br>• When symptoms started<br>• Severity (1-10 scale)<br>• What makes them better or worse<br>• Any associated symptoms" 
  }}
  placeholder="Please describe your symptoms in detail..."
  rows={6}
  required
  maxLength={1000}
/>
```

### Medical History Form

```tsx
<Textarea 
  name="medical-history"
  label={{ text: "Medical history" }}
  hint={{ text: "Include past surgeries, chronic conditions, hospitalizations, and family medical history" }}
  rows={8}
  autocomplete="off"
/>

<Textarea 
  name="current-medications"
  label={{ text: "Current medications" }}
  hint={{ text: "List all prescription medications, over-the-counter drugs, supplements, and herbal remedies" }}
  placeholder="Medication name, dosage, frequency..."
  rows={6}
/>

<Textarea 
  name="allergies"
  label={{ text: "Known allergies and reactions" }}
  hint={{ text: "Include drug allergies, food allergies, environmental allergies, and type of reaction" }}
  rows={4}
/>
```

### Clinical Documentation

```tsx
<Textarea 
  name="clinical-assessment"
  label={{ text: "Clinical assessment" }}
  hint={{ text: "Document patient presentation, physical examination findings, and clinical impressions" }}
  rows={8}
  required
/>

<Textarea 
  name="treatment-plan"
  label={{ text: "Treatment plan" }}
  hint={{ text: "Include medications, procedures, follow-up care, and patient education provided" }}
  rows={6}
  required
/>

<Textarea 
  name="discharge-instructions"
  label={{ text: "Discharge instructions" }}
  hint={{ text: "Provide clear guidance for patient care after discharge, including medications, activity restrictions, and follow-up" }}
  placeholder="Patient education and discharge planning..."
  rows={8}
/>
```

### Emergency Department Documentation

```tsx
<Textarea 
  name="chief-complaint"
  label={{ text: "Chief complaint" }}
  hint={{ text: "Patient's primary reason for seeking care in their own words" }}
  rows={3}
  required
/>

<Textarea 
  name="history-present-illness"
  label={{ text: "History of present illness" }}
  hint={{ text: "Detailed chronological account of the patient's current symptoms and related events" }}
  rows={8}
  required
/>

<Textarea 
  name="physical-examination"
  label={{ text: "Physical examination" }}
  hint={{ text: "Systematic documentation of examination findings by body system" }}
  rows={10}
  required
/>

<Textarea 
  name="assessment-plan"
  label={{ text: "Assessment and plan" }}
  hint={{ text: "Clinical impression, differential diagnosis, and management plan" }}
  rows={8}
  required
/>
```

### Mental Health Assessment

```tsx
<Textarea 
  name="mental-status"
  label={{ text: "Mental status examination" }}
  hint={{ text: "Document appearance, behavior, speech, mood, thought process, perceptions, cognition, and insight" }}
  rows={8}
/>

<Textarea 
  name="risk-assessment"
  label={{ text: "Risk assessment" }}
  hint={{ text: "Evaluate suicide risk, self-harm risk, risk to others, and safety planning" }}
  rows={6}
  required
/>

<Textarea 
  name="treatment-goals"
  label={{ text: "Treatment goals and interventions" }}
  hint={{ text: "Specific, measurable goals and evidence-based interventions planned" }}
  rows={6}
/>
```

### Nursing Documentation

```tsx
<Textarea 
  name="nursing-assessment"
  label={{ text: "Nursing assessment" }}
  hint={{ text: "Comprehensive assessment including vital signs, pain level, mobility, skin integrity, and psychosocial factors" }}
  rows={8}
/>

<Textarea 
  name="care-plan"
  label={{ text: "Nursing care plan" }}
  hint={{ text: "Nursing diagnoses, expected outcomes, and planned interventions" }}
  rows={6}
/>

<Textarea 
  name="patient-response"
  label={{ text: "Patient response to interventions" }}
  hint={{ text: "Document patient's response to treatments, medications, and nursing interventions" }}
  rows={5}
/>

<Textarea 
  name="patient-education"
  label={{ text: "Patient and family education" }}
  hint={{ text: "Topics covered, teaching methods used, and patient/family understanding demonstrated" }}
  rows={5}
/>
```

### Specialist Consultation

```tsx
<Textarea 
  name="consultation-question"
  label={{ text: "Consultation question" }}
  hint={{ text: "Specific clinical question or concern requiring specialist input" }}
  rows={4}
  required
/>

<Textarea 
  name="clinical-summary"
  label={{ text: "Clinical summary" }}
  hint={{ text: "Relevant history, examination findings, investigation results, and current management" }}
  rows={8}
  required
/>

<Textarea 
  name="specialist-opinion"
  label={{ text: "Specialist opinion" }}
  hint={{ text: "Clinical assessment, recommendations, and follow-up plan from specialist perspective" }}
  rows={8}
/>
```

### Patient Feedback and Surveys

```tsx
<Textarea 
  name="experience-feedback"
  label={{ text: "Tell us about your experience" }}
  hint={{ text: "Please share your thoughts about the care you received, staff interactions, and facility environment" }}
  placeholder="We value your feedback and use it to improve our services..."
  rows={6}
  maxLength={2000}
/>

<Textarea 
  name="improvement-suggestions"
  label={{ text: "How can we improve?" }}
  hint={{ text: "Please suggest specific ways we could enhance our services or patient experience" }}
  rows={5}
/>

<Textarea 
  name="additional-concerns"
  label={{ text: "Additional concerns or questions" }}
  hint={{ text: "Is there anything else you would like to discuss or any questions we can help answer?" }}
  rows={4}
/>
```

### Error Handling Examples

```tsx
// Form validation example
const [errors, setErrors] = useState({});

<Textarea 
  name="symptoms"
  label={{ text: "Symptom description" }}
  hint={{ text: "Please provide detailed information about your symptoms" }}
  errorMessage={errors.symptoms ? { text: errors.symptoms } : undefined}
  value={formData.symptoms}
  onChange={(e) => {
    setFormData({ ...formData, symptoms: e.target.value });
    if (errors.symptoms) {
      setErrors({ ...errors, symptoms: null });
    }
  }}
  required
/>

// Character limit validation
const [notes, setNotes] = useState('');
const maxLength = 500;
const hasError = notes.length > maxLength;

<Textarea 
  name="notes"
  label={{ text: "Additional notes" }}
  hint={{ text: `Maximum ${maxLength} characters` }}
  errorMessage={hasError ? { text: `Text is too long (${notes.length}/${maxLength} characters)` } : undefined}
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  maxLength={maxLength}
/>
```

## Props

### TextareaProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name of the textarea, submitted with form data |
| `label` | `LabelProps` | Yes | Options for the label component |
| `id` | `string` | No | The ID of the textarea. Defaults to the value of `name` |
| `rows` | `number` | No | Number of textarea rows. Defaults to 5 |
| `value` | `string` | No | Current value for controlled component |
| `defaultValue` | `string` | No | Default value for uncontrolled component |
| `describedBy` | `string` | No | Additional element IDs for `aria-describedby` |
| `hint` | `HintProps` | No | Options for the hint component |
| `errorMessage` | `ErrorMessageProps` | No | Options for the error message component |
| `formGroup` | `FormGroupProps` | No | Additional options for the form group |
| `autocomplete` | `string` | No | Autocomplete attribute value |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes |
| `onChange` | `(event: ChangeEvent<HTMLTextAreaElement>) => void` | No | Change handler for controlled component |
| `onBlur` | `(event: FocusEvent<HTMLTextAreaElement>) => void` | No | Blur event handler |
| `onFocus` | `(event: FocusEvent<HTMLTextAreaElement>) => void` | No | Focus event handler |
| `disabled` | `boolean` | No | Whether the textarea is disabled |
| `readOnly` | `boolean` | No | Whether the textarea is read-only |
| `placeholder` | `string` | No | Placeholder text |
| `required` | `boolean` | No | Whether the field is required |
| `maxLength` | `number` | No | Maximum length of input |

### FormGroupProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `classes` | `string` | No | Additional CSS classes for the form group |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes for the form group |

## Accessibility

The Textarea component implements comprehensive accessibility features:

- **Label Association**: Automatic `for`/`id` association between label and textarea
- **ARIA Relationships**: Proper `aria-describedby` linking to hints and error messages
- **Error States**: Clear visual and semantic indication of validation errors
- **Focus Management**: Visible focus indicators meeting WCAG requirements
- **Screen Reader Support**: Proper announcement of labels, hints, and errors
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements
- **Required Fields**: Proper `required` attribute and validation support

## Styling

The component uses styled-components with design tokens:

- **Form Structure**: Consistent spacing and layout for form elements
- **Error States**: Red border and error styling for validation feedback
- **Focus Indicators**: Yellow focus outline meeting NHS accessibility standards
- **Typography**: Design system font families, sizes, and weights
- **Responsive Design**: Adapts to different screen sizes and contexts

## CSS Classes

- `.nhsuk-form-group` - Form group container
- `.nhsuk-form-group--error` - Error state for form group
- `.nhsuk-textarea` - Main textarea element
- `.nhsuk-textarea--error` - Error state for textarea

## Best Practices

### Content Guidelines

```tsx
// ✅ Good - Clear, descriptive labels
<Textarea 
  name="symptoms"
  label={{ text: "Describe your symptoms" }}
  hint={{ text: "Include when they started, severity, and any triggers" }}
/>

// ✅ Good - Appropriate field size
<Textarea 
  name="brief-notes"
  label={{ text: "Brief notes" }}
  rows={3}
/>

// ❌ Bad - Vague labels
<Textarea 
  name="info"
  label={{ text: "Info" }}
/>
```

### Validation and Error Handling

```tsx
// ✅ Good - Clear error messages
<Textarea 
  name="notes"
  label={{ text: "Clinical notes" }}
  errorMessage={{ text: "Clinical notes are required for this consultation" }}
/>

// ✅ Good - Helpful hints for complex fields
<Textarea 
  name="medical-history"
  label={{ text: "Medical history" }}
  hint={{ text: "Include surgeries, chronic conditions, and family history" }}
/>

// ❌ Bad - Generic error messages
<Textarea 
  name="field"
  label={{ text: "Field" }}
  errorMessage={{ text: "Error" }}
/>
```

### Healthcare-Specific Guidelines

```tsx
// ✅ Good - Specific medical context
<Textarea 
  name="chief-complaint"
  label={{ text: "Chief complaint" }}
  hint={{ text: "Patient's primary reason for visit in their own words" }}
  required
/>

// ✅ Good - Character limits for structured data
<Textarea 
  name="impression"
  label={{ text: "Clinical impression" }}
  maxLength={500}
  hint={{ text: "Concise assessment of patient condition (max 500 characters)" }}
/>

// ✅ Good - Appropriate field sizing
<Textarea 
  name="detailed-assessment"
  label={{ text: "Comprehensive assessment" }}
  rows={10}
  hint={{ text: "Document full examination findings and clinical reasoning" }}
/>
```

### Form Integration

```tsx
// ✅ Good - Proper form structure
<form onSubmit={handleSubmit}>
  <Textarea 
    name="notes"
    label={{ text: "Notes" }}
    value={formData.notes}
    onChange={(e) => setFormData({...formData, notes: e.target.value})}
    required
  />
  <Button type="submit">Save Notes</Button>
</form>

// ✅ Good - Controlled component with validation
const [value, setValue] = useState('');
const [error, setError] = useState('');

<Textarea 
  name="validated"
  label={{ text: "Validated field" }}
  value={value}
  onChange={(e) => {
    setValue(e.target.value);
    if (error) setError('');
  }}
  errorMessage={error ? { text: error } : undefined}
/>
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [Input](../input/README.md) - For single-line text input
- [Label](../label/README.md) - For form field labels
- [Hint](../hint/README.md) - For help text
- [ErrorMessage](../error-message/README.md) - For validation feedback
- [CharacterCount](../character-count/README.md) - For text length tracking

## Resources

- [NHS Digital Textarea Guidance](https://service-manual.nhs.uk/design-system/components/textarea)
- [GOV.UK Textarea Pattern](https://design-system.service.gov.uk/components/textarea/)
- [WCAG Form Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)