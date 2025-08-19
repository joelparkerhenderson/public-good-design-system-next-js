# Tag Component

A component for displaying status labels, categories, or other short pieces of information. Tags help users quickly identify and understand the status or type of content. Converted from the NHS UK Design System to support the Public Good Design System.

## Features

- **Multiple Variants**: 11 color variants for different use cases
- **Content Flexibility**: Support for both text and HTML content
- **Border Options**: Optional border removal for minimal styling
- **Accessibility First**: Semantic HTML with proper ARIA support
- **Healthcare Optimized**: Designed for medical status indicators and patient information
- **Custom Styling**: Extensive customization options with CSS classes and attributes
- **Focus Management**: Proper focus indicators for keyboard navigation

## Usage

### Basic Tag

```tsx
import { Tag } from '@public-good/design-system';

<Tag text="Active" />
```

### Tag Variants

```tsx
// Default blue tag
<Tag text="Default" variant="default" />

// White background tag
<Tag text="In Progress" variant="white" />

// Status variants
<Tag text="Inactive" variant="grey" />
<Tag text="New" variant="green" />
<Tag text="Active" variant="aqua-green" />
<Tag text="Pending" variant="blue" />
<Tag text="Received" variant="purple" />
<Tag text="Sent" variant="pink" />
<Tag text="Rejected" variant="red" />
<Tag text="Declined" variant="orange" />
<Tag text="Delayed" variant="yellow" />
```

### Tag with HTML Content

```tsx
<Tag html="<strong>Important</strong>" variant="red" />
<Tag html="<em>Priority</em>" variant="orange" />
```

### Tag without Border

```tsx
<Tag text="Status" variant="green" noBorder />
<Tag text="Category" variant="blue" noBorder />
```

### Tag with Custom Attributes

```tsx
<Tag 
  text="Urgent" 
  variant="red"
  attributes={{ 
    'aria-label': 'Urgent priority level',
    'data-track': 'priority-tag'
  }}
/>
```

## Healthcare Use Cases

### Patient Status Tags

```tsx
// Patient admission status
<Tag text="Admitted" variant="blue" />
<Tag text="Discharged" variant="green" />
<Tag text="Emergency" variant="red" />
<Tag text="Outpatient" variant="aqua-green" />

// Patient condition status
<Tag text="Stable" variant="green" />
<Tag text="Critical" variant="red" />
<Tag text="Improving" variant="blue" />
<Tag text="Monitoring" variant="orange" />
```

### Medication Status Tags

```tsx
// Prescription status
<Tag text="Active" variant="green" />
<Tag text="Discontinued" variant="grey" />
<Tag text="Pending" variant="yellow" />
<Tag text="Expired" variant="red" />

// Medication urgency
<Tag text="PRN" variant="purple" />
<Tag text="STAT" variant="red" />
<Tag text="Routine" variant="blue" />
<Tag text="Controlled" variant="orange" />
```

### Appointment Tags

```tsx
// Appointment status
<Tag text="Confirmed" variant="green" />
<Tag text="Pending" variant="yellow" />
<Tag text="Cancelled" variant="red" />
<Tag text="Rescheduled" variant="orange" />
<Tag text="No Show" variant="grey" />

// Appointment types
<Tag text="Emergency" variant="red" />
<Tag text="Routine" variant="blue" />
<Tag text="Follow-up" variant="aqua-green" />
<Tag text="Consultation" variant="purple" />
<Tag text="Procedure" variant="pink" />
```

### Test Results Tags

```tsx
// Result status
<Tag text="Normal" variant="green" />
<Tag text="Abnormal" variant="red" />
<Tag text="Pending" variant="yellow" />
<Tag text="Inconclusive" variant="grey" />

// Urgency levels
<Tag text="Critical" variant="red" />
<Tag text="Urgent" variant="orange" />
<Tag text="Routine" variant="blue" />
<Tag text="Review" variant="purple" />
```

### Treatment Status

```tsx
// Treatment progress
<Tag text="Completed" variant="green" />
<Tag text="Ongoing" variant="blue" />
<Tag text="Paused" variant="yellow" />
<Tag text="Discontinued" variant="red" />

// Treatment types
<Tag text="Medication" variant="blue" />
<Tag text="Therapy" variant="aqua-green" />
<Tag text="Surgery" variant="purple" />
<Tag text="Monitoring" variant="orange" />
```

### Allergy and Alert Tags

```tsx
// Allergy severity
<Tag text="Severe" variant="red" />
<Tag text="Moderate" variant="orange" />
<Tag text="Mild" variant="yellow" />
<Tag text="Unknown" variant="grey" />

// Alert types
<Tag html="<strong>PENICILLIN</strong>" variant="red" />
<Tag text="Latex Allergy" variant="orange" />
<Tag text="Food Allergy" variant="yellow" />
<Tag text="Drug Interaction" variant="purple" />
```

### Comprehensive Patient Dashboard Example

```tsx
const PatientDashboard = () => {
  return (
    <div className="patient-dashboard">
      <div className="patient-status">
        <h3>Patient Status</h3>
        <Tag text="Admitted" variant="blue" />
        <Tag text="ICU" variant="red" />
        <Tag text="Stable" variant="green" />
      </div>

      <div className="medications">
        <h3>Current Medications</h3>
        <Tag text="Metformin" variant="green" />
        <Tag text="Lisinopril" variant="green" />
        <Tag text="Aspirin" variant="yellow" attributes={{ 'aria-label': 'Aspirin - Review needed' }} />
      </div>

      <div className="alerts">
        <h3>Alerts</h3>
        <Tag html="<strong>PENICILLIN ALLERGY</strong>" variant="red" />
        <Tag text="Fall Risk" variant="orange" />
        <Tag text="DNR" variant="purple" />
      </div>

      <div className="appointments">
        <h3>Upcoming Appointments</h3>
        <Tag text="Cardiology" variant="blue" />
        <Tag text="Lab Work" variant="aqua-green" />
        <Tag text="Follow-up" variant="purple" />
      </div>

      <div className="test-results">
        <h3>Recent Results</h3>
        <Tag text="Blood Work" variant="green" />
        <Tag text="X-Ray" variant="yellow" />
        <Tag text="MRI Pending" variant="orange" />
      </div>
    </div>
  );
};
```

### Treatment Plan Tags

```tsx
const TreatmentPlan = () => {
  return (
    <div className="treatment-plan">
      <h2>Treatment Plan Status</h2>
      
      <div className="medication-plan">
        <h3>Medications</h3>
        <div className="tag-group">
          <Tag text="Metformin 500mg" variant="green" />
          <Tag text="Twice daily" variant="blue" noBorder />
          <Tag text="With meals" variant="grey" noBorder />
        </div>
        
        <div className="tag-group">
          <Tag text="Lisinopril 10mg" variant="green" />
          <Tag text="Once daily" variant="blue" noBorder />
          <Tag text="Morning" variant="grey" noBorder />
        </div>
      </div>

      <div className="monitoring">
        <h3>Monitoring</h3>
        <Tag text="Blood Glucose" variant="aqua-green" />
        <Tag text="4x Daily" variant="blue" noBorder />
        <Tag text="Blood Pressure" variant="aqua-green" />
        <Tag text="Weekly" variant="blue" noBorder />
      </div>

      <div className="appointments">
        <h3>Scheduled Care</h3>
        <Tag text="GP Review" variant="purple" />
        <Tag text="3 Months" variant="grey" noBorder />
        <Tag text="HbA1c Test" variant="orange" />
        <Tag text="Quarterly" variant="grey" noBorder />
      </div>
    </div>
  );
};
```

### Emergency Department Triage

```tsx
const TriageTags = () => {
  return (
    <div className="triage-system">
      <h2>Emergency Department Triage</h2>
      
      <div className="priority-levels">
        <h3>Priority Levels</h3>
        <Tag text="Priority 1" variant="red" attributes={{ 'aria-label': 'Priority 1 - Immediate' }} />
        <Tag text="Priority 2" variant="orange" attributes={{ 'aria-label': 'Priority 2 - Urgent' }} />
        <Tag text="Priority 3" variant="yellow" attributes={{ 'aria-label': 'Priority 3 - Less urgent' }} />
        <Tag text="Priority 4" variant="green" attributes={{ 'aria-label': 'Priority 4 - Standard' }} />
        <Tag text="Priority 5" variant="blue" attributes={{ 'aria-label': 'Priority 5 - Non-urgent' }} />
      </div>

      <div className="patient-flow">
        <h3>Patient Flow Status</h3>
        <Tag text="Waiting" variant="yellow" />
        <Tag text="In Assessment" variant="blue" />
        <Tag text="Treatment" variant="purple" />
        <Tag text="Observation" variant="orange" />
        <Tag text="Discharge Ready" variant="green" />
      </div>

      <div className="special-alerts">
        <h3>Special Alerts</h3>
        <Tag html="<strong>ISOLATION</strong>" variant="red" />
        <Tag text="Infection Control" variant="orange" />
        <Tag text="Mental Health" variant="purple" />
        <Tag text="Pediatric" variant="pink" />
        <Tag text="Geriatric" variant="aqua-green" />
      </div>
    </div>
  );
};
```

## Props

### TagProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | No | Text content for the tag |
| `html` | `string` | No | HTML content for the tag (takes precedence over text) |
| `variant` | `TagVariant` | No | Visual variant of the tag. Defaults to `'default'` |
| `noBorder` | `boolean` | No | Remove the border from the tag. Defaults to `false` |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes |

### TagVariant

```tsx
type TagVariant = 
  | 'default'    // Blue background with white text
  | 'white'      // White background with black text
  | 'grey'       // Light grey background with dark grey text
  | 'green'      // Light green background with dark green text
  | 'aqua-green' // Light aqua-green background with dark aqua-green text
  | 'blue'       // Light blue background with dark blue text
  | 'purple'     // Light purple background with dark purple text
  | 'pink'       // Light pink background with dark pink text
  | 'red'        // Light red background with dark red text
  | 'orange'     // Light orange background with dark orange text
  | 'yellow'     // Light yellow background with dark yellow text
```

## Accessibility

The Tag component implements comprehensive accessibility features:

- **Semantic HTML**: Uses `<strong>` element for semantic emphasis
- **ARIA Support**: Supports custom ARIA attributes for enhanced screen reader experience
- **Focus Indicators**: Clear focus outlines for keyboard navigation
- **Color Contrast**: All variants meet WCAG AA color contrast requirements
- **Screen Reader**: Works well with assistive technologies
- **Live Regions**: Supports `aria-live` for dynamic status updates

## Styling

The component uses styled-components with design tokens:

- **Color Variants**: 11 predefined color schemes
- **Typography**: Uses design system font weights and sizes
- **Spacing**: Consistent padding using design tokens
- **Borders**: Optional borders with variant-specific colors
- **Focus States**: Clear focus indicators for accessibility

## CSS Classes

- `.nhsuk-tag` - Base tag class
- `.nhsuk-tag--white` - White variant
- `.nhsuk-tag--grey` - Grey variant
- `.nhsuk-tag--green` - Green variant
- `.nhsuk-tag--aqua-green` - Aqua green variant
- `.nhsuk-tag--blue` - Blue variant
- `.nhsuk-tag--purple` - Purple variant
- `.nhsuk-tag--pink` - Pink variant
- `.nhsuk-tag--red` - Red variant
- `.nhsuk-tag--orange` - Orange variant
- `.nhsuk-tag--yellow` - Yellow variant
- `.nhsuk-tag--no-border` - Removes border

## Best Practices

### Content Guidelines

```tsx
// ✅ Good - Concise, descriptive text
<Tag text="Active" variant="green" />
<Tag text="Pending" variant="yellow" />

// ✅ Good - Clear status indicators
<Tag text="Critical" variant="red" />
<Tag text="Normal" variant="green" />

// ❌ Bad - Too much text
<Tag text="This is a very long description that should not be in a tag" variant="blue" />
```

### Variant Selection

```tsx
// ✅ Good - Appropriate color coding
<Tag text="Success" variant="green" />    // Positive status
<Tag text="Warning" variant="orange" />   // Caution needed
<Tag text="Error" variant="red" />        // Problem or danger
<Tag text="Info" variant="blue" />        // Information

// ✅ Good - Healthcare context
<Tag text="Stable" variant="green" />     // Good condition
<Tag text="Critical" variant="red" />     // Urgent attention
<Tag text="Monitoring" variant="yellow" />// Observation needed
```

### Accessibility Best Practices

```tsx
// ✅ Good - Descriptive aria-label for icons or abbreviations
<Tag 
  text="ICU" 
  variant="red"
  attributes={{ 'aria-label': 'Intensive Care Unit - Critical status' }}
/>

// ✅ Good - Screen reader announcements for dynamic content
<Tag 
  text="New Alert" 
  variant="red"
  attributes={{ 'role': 'status', 'aria-live': 'assertive' }}
/>

// ✅ Good - Additional context for medical abbreviations
<Tag 
  text="DNR" 
  variant="purple"
  attributes={{ 'aria-label': 'Do Not Resuscitate order in effect' }}
/>
```

### Healthcare-Specific Guidelines

```tsx
// ✅ Good - Clear medical status indicators
<Tag text="Allergic to Penicillin" variant="red" />
<Tag text="Diabetes Type 2" variant="blue" />
<Tag text="Hypertension" variant="orange" />

// ✅ Good - Medication status
<Tag text="Current" variant="green" />
<Tag text="Discontinued" variant="grey" />
<Tag text="As Needed" variant="yellow" />

// ✅ Good - Priority levels
<Tag text="Urgent" variant="red" />
<Tag text="Routine" variant="blue" />
<Tag text="Follow-up" variant="aqua-green" />
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [Button](../button/README.md) - For interactive actions
- [Card](../card/README.md) - For content grouping
- [Badge](../badge/README.md) - For notification indicators
- [Status](../status/README.md) - For status indicators

## Resources

- [NHS Digital Tag Guidance](https://service-manual.nhs.uk/design-system/components/tag)
- [GOV.UK Tag Pattern](https://design-system.service.gov.uk/components/tag/)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)