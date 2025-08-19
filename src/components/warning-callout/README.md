# WarningCallout Component

A component for displaying important warnings or notices that users need to be aware of. Uses distinctive yellow styling to draw attention and includes proper accessibility features for screen readers. Converted from the NHS UK Design System to support the Public Good Design System.

## Features

- **Attention-Grabbing Design**: Distinctive yellow styling to highlight important information
- **Flexible Content**: Support for text, HTML, or React children content
- **Customizable Headings**: Configurable heading levels (H1-H6) for proper document structure
- **Accessibility First**: Automatic "Important:" prefix for screen readers when needed
- **Healthcare Optimized**: Perfect for medication warnings, safety notices, and clinical alerts
- **Semantic HTML**: Proper heading hierarchy and content structure
- **Custom Styling**: Extensive customization options with CSS classes and attributes

## Usage

### Basic Warning Callout

```tsx
import { WarningCallout } from '@public-good/design-system';

<WarningCallout 
  heading="Important"
  text="For safety, tell your doctor or pharmacist if you're taking any other medicines, including herbal medicines, vitamins or supplements."
/>
```

### Warning with HTML Content

```tsx
<WarningCallout 
  heading="Before your appointment"
  html="<p>Please bring:</p><ul><li>Your NHS card</li><li>List of current medications</li><li>Recent test results</li></ul>"
/>
```

### Warning with Children Content

```tsx
<WarningCallout heading="Medication Safety">
  <p>Always check with your healthcare provider before:</p>
  <ul>
    <li>Starting new medications</li>
    <li>Stopping current treatments</li>
    <li>Changing dosages</li>
  </ul>
</WarningCallout>
```

### Custom Heading Level

```tsx
<WarningCallout 
  heading="Emergency Contact Information"
  headingLevel={2}
  text="If you experience severe symptoms, call 999 immediately."
/>
```

### Warning with Complex Content

```tsx
<WarningCallout heading="Post-Surgery Care">
  <h4>Important Recovery Guidelines</h4>
  <p>Following your surgery, please observe these critical care instructions:</p>
  <ol>
    <li><strong>Wound Care:</strong> Keep the surgical site clean and dry</li>
    <li><strong>Medication:</strong> Take prescribed antibiotics as directed</li>
    <li><strong>Activity:</strong> Avoid heavy lifting for 6 weeks</li>
    <li><strong>Follow-up:</strong> Attend all scheduled appointments</li>
  </ol>
  <p><em>Contact your surgeon immediately if you notice signs of infection.</em></p>
</WarningCallout>
```

## Healthcare Use Cases

### Medication Safety Warnings

```tsx
<WarningCallout 
  heading="Important"
  text="For safety, tell your doctor or pharmacist if you're taking any other medicines, including herbal medicines, vitamins or supplements."
/>

<WarningCallout 
  heading="Allergy Alert"
  html="<p>If you are allergic to <strong>penicillin</strong> or any other antibiotics, inform your healthcare provider before starting treatment.</p>"
/>

<WarningCallout heading="Medication Instructions">
  <p>Take this medication exactly as prescribed:</p>
  <ul>
    <li>Take with food to reduce stomach upset</li>
    <li>Complete the full course even if you feel better</li>
    <li>Do not share with others</li>
    <li>Store in a cool, dry place</li>
  </ul>
</WarningCallout>
```

### Pre-Procedure Warnings

```tsx
<WarningCallout 
  heading="Before your procedure"
  headingLevel={2}
>
  <h3>Preparation Requirements</h3>
  <p>Please follow these instructions carefully:</p>
  <ul>
    <li><strong>Fasting:</strong> No food or drink for 12 hours before procedure</li>
    <li><strong>Medications:</strong> Continue taking prescribed medications unless advised otherwise</li>
    <li><strong>Arrival:</strong> Arrive 30 minutes before your scheduled time</li>
    <li><strong>Companion:</strong> Bring someone to drive you home</li>
  </ul>
  <p>Failure to follow these instructions may result in procedure cancellation.</p>
</WarningCallout>

<WarningCallout 
  heading="Surgery Day Instructions"
>
  <p><strong>What to bring:</strong></p>
  <ul>
    <li>Photo identification</li>
    <li>Insurance cards</li>
    <li>List of current medications</li>
    <li>Comfortable, loose-fitting clothes</li>
    <li>Personal items for overnight stay (if applicable)</li>
  </ul>
  <p><strong>What NOT to bring:</strong> Jewelry, valuables, contact lenses</p>
</WarningCallout>
```

### Emergency and Safety Warnings

```tsx
<WarningCallout 
  heading="Emergency Symptoms"
  headingLevel={1}
>
  <p>Seek immediate medical attention if you experience:</p>
  <ul>
    <li>Severe chest pain or pressure</li>
    <li>Difficulty breathing or shortness of breath</li>
    <li>Sudden severe headache</li>
    <li>Loss of consciousness or fainting</li>
    <li>Severe allergic reaction (rash, swelling, difficulty breathing)</li>
    <li>Signs of stroke (face drooping, arm weakness, speech difficulty)</li>
  </ul>
  <p><strong>Call 999 immediately - do not wait or drive yourself</strong></p>
</WarningCallout>

<WarningCallout heading="Infection Control">
  <p>To prevent healthcare-associated infections:</p>
  <ol>
    <li>Clean your hands frequently with soap and water</li>
    <li>Use alcohol-based hand sanitizer when soap is unavailable</li>
    <li>Avoid touching your face, especially in healthcare facilities</li>
    <li>Follow isolation precautions if instructed</li>
    <li>Report any signs of infection to your healthcare team</li>
  </ol>
</WarningCallout>
```

### Treatment and Recovery Warnings

```tsx
<WarningCallout 
  heading="Treatment Compliance"
  text="Do not stop taking your medication without consulting your healthcare provider, even if you feel better. Stopping treatment early may lead to complications or treatment failure."
/>

<WarningCallout heading="Post-Treatment Care">
  <h4>Critical Recovery Instructions</h4>
  <p>Following your treatment, monitor for these potential complications:</p>
  <ul>
    <li><strong>Infection signs:</strong> Fever, increased pain, redness, swelling, discharge</li>
    <li><strong>Breathing problems:</strong> Shortness of breath, wheezing, chest tightness</li>
    <li><strong>Circulation issues:</strong> Numbness, tingling, color changes in extremities</li>
    <li><strong>Severe pain:</strong> Pain that worsens or doesn't respond to prescribed medication</li>
  </ul>
  <p>Contact your healthcare provider immediately if any of these occur.</p>
</WarningCallout>

<WarningCallout 
  heading="Rehabilitation Guidelines"
  headingLevel={3}
>
  <p><strong>Physical Therapy Requirements:</strong></p>
  <ul>
    <li>Attend all scheduled sessions</li>
    <li>Perform prescribed exercises daily</li>
    <li>Progress gradually - don't rush recovery</li>
    <li>Report any new pain or discomfort</li>
  </ul>
  <p><strong>Activity Restrictions:</strong></p>
  <ul>
    <li>No heavy lifting (>10 lbs) for 6 weeks</li>
    <li>Avoid high-impact activities for 3 months</li>
    <li>Follow driving restrictions as advised</li>
  </ul>
</WarningCallout>
```

### Appointment and Administrative Warnings

```tsx
<WarningCallout 
  heading="Appointment Requirements"
>
  <p>Please bring to your appointment:</p>
  <ul>
    <li>Valid photo identification</li>
    <li>Current insurance cards</li>
    <li>Complete list of medications and dosages</li>
    <li>Previous test results or medical records</li>
    <li>Form of payment for any copays or deductibles</li>
  </ul>
  <p><strong>Cancellation Policy:</strong> 24-hour notice required to avoid cancellation fees.</p>
</WarningCallout>

<WarningCallout 
  heading="Insurance and Billing"
  text="Verify your insurance coverage before your visit. Some procedures may require prior authorization. Contact your insurance provider to confirm benefits and understand your financial responsibility."
/>
```

### Specialized Medical Warnings

```tsx
<WarningCallout 
  heading="Pregnancy and Fertility"
>
  <p>This treatment may affect pregnancy or fertility:</p>
  <ul>
    <li>Inform your doctor if you are pregnant, planning pregnancy, or breastfeeding</li>
    <li>Use effective contraception during treatment</li>
    <li>Discuss fertility preservation options before starting treatment</li>
    <li>Report any missed periods or pregnancy symptoms immediately</li>
  </ul>
</WarningCallout>

<WarningCallout heading="Radiation Safety">
  <p><strong>Important Safety Information:</strong></p>
  <ul>
    <li>You will be exposed to ionizing radiation during this procedure</li>
    <li>Benefits of the exam outweigh the radiation risks</li>
    <li>Inform staff if you are or might be pregnant</li>
    <li>Remove all metal objects before the procedure</li>
  </ul>
</WarningCallout>

<WarningCallout 
  heading="Contrast Material Warning"
  headingLevel={2}
>
  <h3>Before Receiving Contrast</h3>
  <p>Inform your healthcare provider if you have:</p>
  <ul>
    <li>Kidney disease or diabetes</li>
    <li>Previous allergic reaction to contrast material</li>
    <li>Asthma or severe allergies</li>
    <li>Heart disease or congestive heart failure</li>
  </ul>
  <p>Stay hydrated before and after contrast administration.</p>
</WarningCallout>
```

### Mental Health and Wellness Warnings

```tsx
<WarningCallout 
  heading="Mental Health Emergency"
  headingLevel={1}
>
  <p>If you are having thoughts of suicide or self-harm:</p>
  <ul>
    <li><strong>Immediate help:</strong> Call 999 or go to your nearest A&E</li>
    <li><strong>Crisis support:</strong> Call Samaritans on 116 123 (free, 24/7)</li>
    <li><strong>Text support:</strong> Text SHOUT to 85258</li>
    <li><strong>Online support:</strong> Visit samaritans.org for immediate help</li>
  </ul>
  <p>You are not alone - help is available.</p>
</WarningCallout>

<WarningCallout heading="Medication Side Effects">
  <p>Monitor for these potential side effects and report to your healthcare provider:</p>
  <ul>
    <li>Changes in mood, behavior, or thoughts</li>
    <li>Increased anxiety or agitation</li>
    <li>Sleep disturbances or unusual dreams</li>
    <li>Difficulty concentrating</li>
    <li>Suicidal thoughts or behaviors</li>
  </ul>
  <p>Do not stop taking medication suddenly - consult your provider first.</p>
</WarningCallout>
```

## Props

### WarningCalloutProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `heading` | `string` | Yes | Heading to be used on the warning callout |
| `headingLevel` | `HeadingLevel` | No | Heading level (1-6). Defaults to 3 |
| `text` | `string` | No | Text content to be used within the warning callout |
| `html` | `string` | No | HTML content (takes precedence over text) |
| `children` | `React.ReactNode` | No | Children content (takes precedence over text and html) |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes |

### HeadingLevel

```tsx
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
```

## Accessibility

The WarningCallout component implements comprehensive accessibility features:

- **Screen Reader Support**: Automatic "Important:" prefix for headings that don't already contain "important"
- **Semantic HTML**: Proper heading elements (H1-H6) for document structure
- **Visual Indicators**: Distinctive yellow styling with sufficient color contrast
- **Role Attributes**: Proper `role="text"` for complex heading content
- **Hidden Text**: Visually hidden accessibility text that doesn't interfere with visual design
- **Focus Management**: Keyboard accessible with proper focus indicators

## Styling

The component uses styled-components with design tokens:

- **Distinctive Colors**: Yellow background and border for high visibility
- **Typography**: Design system font families, sizes, and weights
- **Spacing**: Consistent padding and margins using design tokens
- **Positioning**: Proper label positioning over the content area
- **Responsive Design**: Adapts to different screen sizes and contexts

## CSS Classes

- `.nhsuk-warning-callout` - Main warning callout container
- `.nhsuk-warning-callout__label` - Warning heading/label element

## Best Practices

### When to Use Warning Callouts

```tsx
// ✅ Good - Critical safety information
<WarningCallout 
  heading="Important"
  text="Do not take this medication if you are allergic to penicillin."
/>

// ✅ Good - Essential preparation instructions
<WarningCallout 
  heading="Before your procedure"
  text="Do not eat or drink anything for 12 hours before your appointment."
/>

// ❌ Bad - General information that's not urgent
<WarningCallout 
  heading="Information"
  text="Our clinic is open Monday through Friday."
/>
```

### Content Guidelines

```tsx
// ✅ Good - Specific, actionable content
<WarningCallout 
  heading="Medication Alert"
  text="Take with food to prevent stomach upset. Complete the full course even if you feel better."
/>

// ✅ Good - Clear emergency instructions
<WarningCallout 
  heading="Emergency Symptoms"
  text="Call 999 immediately if you experience chest pain, difficulty breathing, or loss of consciousness."
/>

// ❌ Bad - Vague or unclear instructions
<WarningCallout 
  heading="Warning"
  text="Be careful with this medication."
/>
```

### Heading Hierarchy

```tsx
// ✅ Good - Proper heading levels for document structure
<main>
  <h1>Patient Information</h1>
  <WarningCallout 
    heading="Important Safety Information"
    headingLevel={2}
    text="..."
  />
  <h3>Medication Details</h3>
  <WarningCallout 
    heading="Dosage Instructions"
    headingLevel={4}
    text="..."
  />
</main>

// ❌ Bad - Skipping heading levels
<main>
  <h1>Patient Information</h1>
  <WarningCallout 
    heading="Safety Information"
    headingLevel={4}
    text="..."
  />
</main>
```

### Healthcare-Specific Guidelines

```tsx
// ✅ Good - Critical medical information
<WarningCallout 
  heading="Allergy Alert"
  text="Patient has severe penicillin allergy. Use alternative antibiotics only."
/>

// ✅ Good - Time-sensitive instructions
<WarningCallout 
  heading="Urgent"
  text="Lab results show critical values. Contact patient immediately for follow-up care."
/>

// ✅ Good - Safety protocols
<WarningCallout 
  heading="Infection Control"
  text="This patient requires contact precautions. Use appropriate PPE when providing care."
/>
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [InsetText](../inset-text/README.md) - For highlighting important information
- [Card](../card/README.md) - For general content grouping
- [ErrorMessage](../error-message/README.md) - For form validation errors
- [Hero](../hero/README.md) - For page-level announcements

## Resources

- [NHS Digital Warning Callout Guidance](https://service-manual.nhs.uk/design-system/components/warning-callout)
- [GOV.UK Warning Text Pattern](https://design-system.service.gov.uk/components/warning-text/)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)