# Tabs Component

A component that allows users to navigate between related sections of content, displaying one section at a time. Converts to an accordion-style layout on mobile devices for better usability. Converted from the NHS UK Design System to support the Public Good Design System.

## Features

- **Responsive Design**: Converts from tabs to accordion layout on mobile devices
- **Keyboard Navigation**: Full arrow key, Home, and End key support
- **URL Hash Integration**: Supports deep linking and browser back/forward navigation
- **Controlled/Uncontrolled**: Works in both controlled and uncontrolled modes
- **Accessibility First**: Complete ARIA support with proper tab roles and relationships
- **Content Flexibility**: Support for both text and HTML content in panels
- **Mobile Optimized**: Automatically converts to accordion layout for better mobile UX
- **Focus Management**: Proper focus management for keyboard users
- **Custom Styling**: Extensive customization options with CSS classes and attributes

## Usage

### Basic Tabs

```tsx
import { Tabs } from '@public-good/design-system';

<Tabs 
  items={[
    {
      id: "tab-one",
      label: "Tab one",
      panel: {
        html: "<h2>Tab one content</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>"
      }
    },
    {
      id: "tab-two", 
      label: "Tab two",
      panel: {
        text: "Content for the second tab."
      }
    },
    {
      id: "tab-three",
      label: "Tab three",
      panel: {
        html: "<h2>Tab three content</h2><p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>"
      }
    }
  ]}
/>
```

### Controlled Tabs with Callback

```tsx
const [activeTab, setActiveTab] = useState(0);

<Tabs 
  activeTab={activeTab}
  onTabChange={(index, id) => {
    setActiveTab(index);
    console.log(`Switched to tab ${id}`);
  }}
  items={[
    {
      id: "overview",
      label: "Overview",
      panel: {
        html: "<h2>Overview</h2><p>General information about the topic.</p>"
      }
    },
    {
      id: "details",
      label: "Details", 
      panel: {
        html: "<h2>Details</h2><p>Detailed information and specifications.</p>"
      }
    }
  ]}
/>
```

### Custom Title and Default Tab

```tsx
<Tabs 
  title="Navigation"
  defaultActiveTab={1}
  items={[
    {
      id: "first",
      label: "First Section",
      panel: {
        text: "Content of the first section."
      }
    },
    {
      id: "second",
      label: "Second Section",
      panel: {
        text: "Content of the second section (initially active)."
      }
    }
  ]}
/>
```

### Tabs with Custom IDs and Attributes

```tsx
<Tabs 
  id="main-navigation"
  idPrefix="nav"
  items={[
    {
      id: "section-1",
      label: "Section 1",
      attributes: { 'data-track': 'section1' },
      panel: {
        html: "<h2>Section 1</h2><p>Content for section 1.</p>",
        attributes: { 'data-section': 'first' }
      }
    },
    {
      id: "section-2",
      label: "Section 2", 
      panel: {
        text: "Content for section 2."
      }
    }
  ]}
/>
```

## Healthcare Use Cases

### Patient Record Tabs

```tsx
<Tabs 
  title="Patient Records"
  items={[
    {
      id: "patient-info",
      label: "Patient Information",
      panel: {
        html: `
          <h2>Patient Details</h2>
          <p><strong>Name:</strong> Sarah Phillips</p>
          <p><strong>NHS Number:</strong> 485 777 3456</p>
          <p><strong>Date of Birth:</strong> 15 January 1978</p>
          <p><strong>Address:</strong> 123 Main Street, London, SW1A 1AA</p>
        `
      }
    },
    {
      id: "medical-history",
      label: "Medical History",
      panel: {
        html: `
          <h2>Current Conditions</h2>
          <ul>
            <li>Type 2 Diabetes (diagnosed 2018)</li>
            <li>Hypertension (diagnosed 2020)</li>
          </ul>
          <h3>Allergies</h3>
          <p>Penicillin, Shellfish</p>
          <h3>Previous Surgeries</h3>
          <ul>
            <li>Appendectomy (2015)</li>
            <li>Knee arthroscopy (2019)</li>
          </ul>
        `
      }
    },
    {
      id: "medications",
      label: "Current Medications",
      panel: {
        html: `
          <h2>Active Prescriptions</h2>
          <ul>
            <li><strong>Metformin 500mg</strong> - Twice daily with meals</li>
            <li><strong>Lisinopril 10mg</strong> - Once daily</li>
            <li><strong>Aspirin 75mg</strong> - Once daily</li>
          </ul>
          <h3>As Needed Medications</h3>
          <ul>
            <li><strong>Paracetamol 500mg</strong> - As needed for pain (max 8 tablets daily)</li>
            <li><strong>Salbutamol inhaler</strong> - As needed for asthma</li>
          </ul>
        `
      }
    },
    {
      id: "test-results",
      label: "Test Results",
      panel: {
        html: `
          <h2>Recent Blood Tests (15 March 2024)</h2>
          <table>
            <thead>
              <tr>
                <th>Test</th>
                <th>Result</th>
                <th>Reference Range</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HbA1c</td>
                <td>6.8%</td>
                <td><7.0%</td>
                <td>✓ Good control</td>
              </tr>
              <tr>
                <td>Cholesterol</td>
                <td>185 mg/dL</td>
                <td><200 mg/dL</td>
                <td>✓ Normal</td>
              </tr>
              <tr>
                <td>Blood Pressure</td>
                <td>125/78 mmHg</td>
                <td><140/90 mmHg</td>
                <td>✓ Well controlled</td>
              </tr>
            </tbody>
          </table>
        `
      }
    }
  ]}
/>
```

### Treatment Plan Tabs

```tsx
<Tabs 
  title="Treatment Plan"
  items={[
    {
      id: "current-treatment",
      label: "Current Treatment",
      panel: {
        html: `
          <h2>Ongoing Treatment</h2>
          <h3>Diabetes Management</h3>
          <ul>
            <li>Blood glucose monitoring 4 times daily</li>
            <li>Metformin 500mg twice daily</li>
            <li>Monthly HbA1c monitoring</li>
            <li>Annual retinal screening</li>
          </ul>
          <h3>Hypertension Management</h3>
          <ul>
            <li>Lisinopril 10mg once daily</li>
            <li>Home blood pressure monitoring</li>
            <li>Low sodium diet counseling</li>
            <li>Regular exercise program</li>
          </ul>
        `
      }
    },
    {
      id: "medication-schedule",
      label: "Medication Schedule",
      panel: {
        html: `
          <h2>Daily Medication Schedule</h2>
          <h3>Morning (8:00 AM)</h3>
          <ul>
            <li>Metformin 500mg (with breakfast)</li>
            <li>Lisinopril 10mg</li>
            <li>Aspirin 75mg</li>
          </ul>
          <h3>Evening (6:00 PM)</h3>
          <ul>
            <li>Metformin 500mg (with dinner)</li>
          </ul>
          <h3>As Needed</h3>
          <ul>
            <li>Paracetamol for pain (max 8 tablets daily)</li>
            <li>Salbutamol inhaler for asthma symptoms</li>
          </ul>
        `
      }
    },
    {
      id: "lifestyle-plan",
      label: "Lifestyle Plan",
      panel: {
        html: `
          <h2>Lifestyle Recommendations</h2>
          <h3>Diet</h3>
          <ul>
            <li>Follow Mediterranean diet principles</li>
            <li>Limit processed foods and added sugars</li>
            <li>Eat regular meals to manage blood glucose</li>
            <li>Reduce sodium intake to <2300mg daily</li>
          </ul>
          <h3>Exercise</h3>
          <ul>
            <li>30 minutes moderate exercise 5 days per week</li>
            <li>Include both aerobic and resistance training</li>
            <li>Monitor blood glucose before and after exercise</li>
          </ul>
          <h3>Monitoring</h3>
          <ul>
            <li>Check blood glucose 4 times daily</li>
            <li>Record in diabetes diary</li>
            <li>Weekly weight monitoring</li>
            <li>Blood pressure checks twice weekly</li>
          </ul>
        `
      }
    },
    {
      id: "follow-up",
      label: "Follow-up Care",
      panel: {
        html: `
          <h2>Scheduled Appointments</h2>
          <h3>Upcoming Appointments</h3>
          <ul>
            <li><strong>GP Review:</strong> 15 April 2024 at 2:30 PM</li>
            <li><strong>Diabetes Nurse:</strong> 22 April 2024 at 10:00 AM</li>
            <li><strong>Annual Eye Exam:</strong> 5 May 2024 at 3:00 PM</li>
          </ul>
          <h3>Regular Monitoring Schedule</h3>
          <ul>
            <li>GP appointments every 3 months</li>
            <li>HbA1c testing every 3 months</li>
            <li>Annual comprehensive health check</li>
            <li>Annual diabetic foot examination</li>
            <li>Annual kidney function tests</li>
          </ul>
        `
      }
    }
  ]}
/>
```

### Health Assessment Tabs

```tsx
<Tabs 
  title="Health Assessment"
  items={[
    {
      id: "symptoms",
      label: "Current Symptoms",
      panel: {
        html: `
          <h2>Reported Symptoms</h2>
          <h3>Primary Concerns</h3>
          <ul>
            <li>Intermittent chest pain (3 weeks)</li>
            <li>Shortness of breath on exertion (2 weeks)</li>
            <li>Fatigue and weakness (1 month)</li>
          </ul>
          <h3>Associated Symptoms</h3>
          <ul>
            <li>Occasional dizziness</li>
            <li>Mild ankle swelling</li>
            <li>Reduced exercise tolerance</li>
          </ul>
          <h3>Symptom Triggers</h3>
          <ul>
            <li>Walking upstairs</li>
            <li>Physical activity</li>
            <li>Stress or emotional situations</li>
          </ul>
        `
      }
    },
    {
      id: "vital-signs",
      label: "Vital Signs",
      panel: {
        html: `
          <h2>Current Vital Signs</h2>
          <table>
            <thead>
              <tr>
                <th>Measurement</th>
                <th>Value</th>
                <th>Normal Range</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Blood Pressure</td>
                <td>145/92 mmHg</td>
                <td><140/90 mmHg</td>
                <td>⚠ Elevated</td>
              </tr>
              <tr>
                <td>Heart Rate</td>
                <td>88 bpm</td>
                <td>60-100 bpm</td>
                <td>✓ Normal</td>
              </tr>
              <tr>
                <td>Temperature</td>
                <td>98.6°F (37°C)</td>
                <td>97-99°F</td>
                <td>✓ Normal</td>
              </tr>
              <tr>
                <td>Oxygen Saturation</td>
                <td>97%</td>
                <td>>95%</td>
                <td>✓ Normal</td>
              </tr>
              <tr>
                <td>BMI</td>
                <td>28.5</td>
                <td>18.5-24.9</td>
                <td>⚠ Overweight</td>
              </tr>
            </tbody>
          </table>
        `
      }
    },
    {
      id: "assessment",
      label: "Clinical Assessment",
      panel: {
        html: `
          <h2>Clinical Findings</h2>
          <h3>Physical Examination</h3>
          <ul>
            <li><strong>General:</strong> Alert and oriented, mild distress</li>
            <li><strong>Cardiovascular:</strong> Regular rhythm, grade 2/6 systolic murmur</li>
            <li><strong>Respiratory:</strong> Clear breath sounds bilaterally</li>
            <li><strong>Extremities:</strong> Mild bilateral ankle edema</li>
          </ul>
          <h3>Clinical Impression</h3>
          <ul>
            <li>Possible heart failure with preserved ejection fraction</li>
            <li>Hypertension, suboptimally controlled</li>
            <li>Need for cardiac evaluation</li>
          </ul>
          <h3>Recommended Tests</h3>
          <ul>
            <li>Echocardiogram</li>
            <li>ECG</li>
            <li>Chest X-ray</li>
            <li>BNP or NT-proBNP</li>
            <li>Comprehensive metabolic panel</li>
          </ul>
        `
      }
    },
    {
      id: "plan",
      label: "Care Plan",
      panel: {
        html: `
          <h2>Treatment Plan</h2>
          <h3>Immediate Actions</h3>
          <ul>
            <li>Schedule echocardiogram within 48 hours</li>
            <li>Obtain ECG today</li>
            <li>Start low-dose diuretic for edema</li>
            <li>Increase ACE inhibitor dose</li>
          </ul>
          <h3>Lifestyle Modifications</h3>
          <ul>
            <li>Sodium restriction (2g daily)</li>
            <li>Daily weight monitoring</li>
            <li>Fluid restriction (2L daily)</li>
            <li>Gradual increase in physical activity</li>
          </ul>
          <h3>Follow-up</h3>
          <ul>
            <li>Return visit in 1 week</li>
            <li>Cardiology referral if echo abnormal</li>
            <li>Phone call in 3 days to check symptoms</li>
            <li>Emergency instructions provided</li>
          </ul>
        `
      }
    }
  ]}
/>
```

### Health Education Tabs

```tsx
<Tabs 
  title="Diabetes Education"
  items={[
    {
      id: "understanding",
      label: "Understanding Diabetes",
      panel: {
        html: `
          <h2>What is Type 2 Diabetes?</h2>
          <p>Type 2 diabetes is a condition where your body doesn't use insulin properly, causing blood glucose levels to rise above normal.</p>
          
          <h3>Key Points</h3>
          <ul>
            <li>Your pancreas makes insulin, but your body can't use it effectively</li>
            <li>Blood glucose levels become too high</li>
            <li>It's the most common type of diabetes (90% of cases)</li>
            <li>It can be managed with lifestyle changes and medication</li>
          </ul>
          
          <h3>Risk Factors</h3>
          <ul>
            <li>Family history of diabetes</li>
            <li>Being overweight</li>
            <li>Age over 40 (or over 25 for South Asian, Chinese, African-Caribbean backgrounds)</li>
            <li>Previous gestational diabetes</li>
            <li>High blood pressure</li>
            <li>Ethnicity (higher risk in certain groups)</li>
          </ul>
        `
      }
    },
    {
      id: "management",
      label: "Daily Management",
      panel: {
        html: `
          <h2>Managing Your Diabetes</h2>
          
          <h3>Blood Glucose Monitoring</h3>
          <ul>
            <li>Check levels as recommended by your healthcare team</li>
            <li>Record results in your diabetes diary</li>
            <li>Target ranges: 4-7 mmol/L before meals, under 8.5 mmol/L 2 hours after meals</li>
            <li>Bring your results to every appointment</li>
          </ul>
          
          <h3>Taking Your Medication</h3>
          <ul>
            <li>Take medications at the same time each day</li>
            <li>Don't skip doses without consulting your healthcare team</li>
            <li>Store medications properly (some need refrigeration)</li>
            <li>Always carry hypo treatments if you take insulin or certain tablets</li>
          </ul>
          
          <h3>Recognizing Warning Signs</h3>
          <ul>
            <li><strong>Low blood sugar (hypoglycemia):</strong> shaking, sweating, confusion, hunger</li>
            <li><strong>High blood sugar:</strong> excessive thirst, frequent urination, fatigue</li>
            <li><strong>Serious complications:</strong> persistent vomiting, difficulty breathing, chest pain</li>
          </ul>
        `
      }
    },
    {
      id: "diet",
      label: "Healthy Eating",
      panel: {
        html: `
          <h2>Eating Well with Diabetes</h2>
          
          <h3>General Principles</h3>
          <ul>
            <li>Eat regular meals to help manage blood glucose</li>
            <li>Choose foods high in fiber and low in saturated fat</li>
            <li>Control portion sizes</li>
            <li>Limit foods high in sugar and refined carbohydrates</li>
          </ul>
          
          <h3>Good Food Choices</h3>
          <ul>
            <li><strong>Carbohydrates:</strong> Whole grains, brown rice, quinoa, sweet potatoes</li>
            <li><strong>Proteins:</strong> Lean meats, fish, eggs, beans, lentils, tofu</li>
            <li><strong>Fats:</strong> Olive oil, avocados, nuts, seeds</li>
            <li><strong>Vegetables:</strong> All non-starchy vegetables, leafy greens</li>
            <li><strong>Fruits:</strong> Berries, apples, citrus fruits (in moderation)</li>
          </ul>
          
          <h3>Foods to Limit</h3>
          <ul>
            <li>Sugary drinks and foods</li>
            <li>Refined grains (white bread, white rice)</li>
            <li>Processed and packaged foods</li>
            <li>Foods high in saturated fat</li>
            <li>Large portions of any food</li>
          </ul>
        `
      }
    },
    {
      id: "exercise",
      label: "Physical Activity",
      panel: {
        html: `
          <h2>Exercise and Diabetes</h2>
          
          <h3>Benefits of Exercise</h3>
          <ul>
            <li>Helps lower blood glucose levels</li>
            <li>Improves insulin sensitivity</li>
            <li>Helps with weight management</li>
            <li>Reduces risk of heart disease</li>
            <li>Improves mental health and energy levels</li>
          </ul>
          
          <h3>Exercise Recommendations</h3>
          <ul>
            <li><strong>Aerobic exercise:</strong> 150 minutes moderate intensity per week</li>
            <li><strong>Resistance training:</strong> 2-3 sessions per week</li>
            <li><strong>Flexibility:</strong> Stretching and yoga can be beneficial</li>
            <li><strong>Daily activity:</strong> Take stairs, walk during breaks, garden</li>
          </ul>
          
          <h3>Exercise Safety</h3>
          <ul>
            <li>Check blood glucose before exercising</li>
            <li>Carry hypo treatments during exercise</li>
            <li>Stay hydrated</li>
            <li>Wear proper footwear</li>
            <li>Start slowly and gradually increase intensity</li>
            <li>Check your feet daily for cuts or sores</li>
          </ul>
          
          <h3>When to Check with Your Healthcare Team</h3>
          <ul>
            <li>Before starting a new exercise program</li>
            <li>If you have heart, eye, or foot problems</li>
            <li>If you experience chest pain or unusual shortness of breath</li>
            <li>If you have frequent low blood glucose during exercise</li>
          </ul>
        `
      }
    }
  ]}
/>
```

### Appointment Summary Tabs

```tsx
<Tabs 
  title="Appointment Summary"
  items={[
    {
      id: "discussion",
      label: "Discussion Points",
      panel: {
        html: `
          <h2>Today's Discussion</h2>
          
          <h3>Main Concerns Addressed</h3>
          <ul>
            <li>Blood pressure control - still elevated despite medication</li>
            <li>Weight gain of 3kg since last visit</li>
            <li>Occasional chest discomfort with exercise</li>
            <li>Difficulty managing blood glucose levels</li>
          </ul>
          
          <h3>Patient Questions Answered</h3>
          <ul>
            <li>Can I travel with my diabetes medications?</li>
            <li>What should I do if I miss a medication dose?</li>
            <li>Is it safe to exercise with high blood pressure?</li>
            <li>How often should I check my blood glucose?</li>
          </ul>
          
          <h3>Education Provided</h3>
          <ul>
            <li>Proper blood pressure monitoring technique</li>
            <li>Dietary modifications for blood pressure control</li>
            <li>Exercise safety guidelines</li>
            <li>Travel tips for diabetes management</li>
          </ul>
        `
      }
    },
    {
      id: "changes",
      label: "Treatment Changes",
      panel: {
        html: `
          <h2>Changes to Your Treatment</h2>
          
          <h3>Medication Adjustments</h3>
          <ul>
            <li><strong>Lisinopril:</strong> Increased from 10mg to 15mg once daily</li>
            <li><strong>Metformin:</strong> Continue 500mg twice daily (no change)</li>
            <li><strong>New medication:</strong> Amlodipine 5mg once daily added</li>
          </ul>
          
          <h3>Monitoring Changes</h3>
          <ul>
            <li>Check blood pressure daily for 2 weeks, then 3 times weekly</li>
            <li>Continue blood glucose monitoring 4 times daily</li>
            <li>Weekly weight checks</li>
            <li>Record all readings in your diary</li>
          </ul>
          
          <h3>Lifestyle Modifications</h3>
          <ul>
            <li>Reduce sodium intake to less than 2300mg daily</li>
            <li>Increase physical activity gradually</li>
            <li>Aim for 5% weight reduction (target: 3-4kg)</li>
            <li>Limit alcohol to recommended guidelines</li>
          </ul>
        `
      }
    },
    {
      id: "next-steps",
      label: "Next Steps",
      panel: {
        html: `
          <h2>Your Action Plan</h2>
          
          <h3>Immediate Actions (This Week)</h3>
          <ul>
            <li>Start new medication (Amlodipine) tomorrow morning</li>
            <li>Begin daily blood pressure monitoring</li>
            <li>Schedule ECG at hospital (referral provided)</li>
            <li>Make appointment with dietitian</li>
          </ul>
          
          <h3>Follow-up Appointments</h3>
          <ul>
            <li><strong>Phone consultation:</strong> 1 week (to check blood pressure readings)</li>
            <li><strong>Nurse appointment:</strong> 2 weeks (medication review and education)</li>
            <li><strong>GP appointment:</strong> 6 weeks (comprehensive review)</li>
            <li><strong>Annual review:</strong> Schedule in 6 months</li>
          </ul>
          
          <h3>Tests and Referrals</h3>
          <ul>
            <li>ECG - schedule within 2 weeks</li>
            <li>Blood tests in 6 weeks (HbA1c, kidney function, cholesterol)</li>
            <li>Eye screening - annual appointment due in 3 months</li>
            <li>Dietitian referral - appointment in 2-3 weeks</li>
          </ul>
          
          <h3>Emergency Contact Information</h3>
          <ul>
            <li><strong>Severe low blood sugar:</strong> Call 999</li>
            <li><strong>Chest pain:</strong> Call 999</li>
            <li><strong>General concerns:</strong> Call practice on 020 7946 0123</li>
            <li><strong>Out of hours:</strong> Call NHS 111</li>
          </ul>
        `
      }
    }
  ]}
/>
```

## Props

### TabsProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | `TabItem[]` | Yes | Array of tab items |
| `id` | `string` | No | ID for the tabs container |
| `idPrefix` | `string` | No | String to prefix id for each tab item if no id is specified |
| `title` | `string` | No | Title for the tabs table of contents. Defaults to "Contents" |
| `defaultActiveTab` | `number` | No | Initial active tab index for uncontrolled mode. Defaults to 0 |
| `activeTab` | `number` | No | Controlled active tab index |
| `onTabChange` | `(tabIndex: number, tabId: string) => void` | No | Callback when tab changes |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes |

### TabItem

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the tab |
| `label` | `string` | Yes | Text label for the tab |
| `panel` | `object` | Yes | Panel content configuration |
| `panel.text` | `string` | No | Text content for the panel |
| `panel.html` | `string` | No | HTML content for the panel |
| `panel.attributes` | `Record<string, string>` | No | Additional HTML attributes for the panel |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes for the tab |

## Accessibility

The Tabs component implements comprehensive accessibility features:

- **ARIA Roles**: Proper `tablist`, `tab`, and `tabpanel` roles
- **ARIA Relationships**: `aria-controls` and `aria-labelledby` relationships
- **ARIA States**: `aria-selected` to indicate active tab
- **Keyboard Navigation**: Full arrow key support (left/right/up/down)
- **Home/End Keys**: Jump to first/last tabs
- **Tab Management**: Proper `tabindex` management for keyboard focus
- **Mobile Accessibility**: Accordion layout removes complex keyboard interactions on mobile
- **Focus Management**: Automatic focus management when navigating with keyboard
- **Screen Reader Support**: Proper announcements of tab changes and content

## Responsive Behavior

The Tabs component automatically adapts to different screen sizes:

### Desktop (768px and above)
- Displays as traditional tab interface
- Horizontal tab list at top
- Single active panel shown below
- Full keyboard navigation enabled
- URL hash integration active

### Mobile (below 768px)
- Converts to accordion-style layout
- All panels visible with headings
- Tab list hidden
- Simplified interaction model
- Touch-friendly interface

## Keyboard Navigation

- **Arrow Keys**: Navigate between tabs (left/right or up/down)
- **Home Key**: Jump to first tab
- **End Key**: Jump to last tab
- **Tab Key**: Move focus to active panel
- **Enter/Space**: Activate focused tab
- **Wrapping**: Navigation wraps around (last tab → first tab)

## URL Hash Integration

The component supports deep linking and browser navigation:

- **Initial Load**: Activates tab based on URL hash
- **Tab Changes**: Updates URL hash when switching tabs
- **Browser Navigation**: Responds to back/forward buttons
- **Hash Events**: Listens for hash change events
- **Smooth Integration**: No page jumping when hash changes

## Styling

The component uses styled-components with design tokens:

- **Responsive Design**: Adapts layout for mobile devices
- **Theme Integration**: Uses design system colors, spacing, and typography
- **Focus Indicators**: Clear focus outlines for accessibility
- **Hover States**: Interactive feedback for tabs
- **Active States**: Visual indication of selected tab
- **Mobile Optimization**: Touch-friendly sizing and spacing

## CSS Classes

- `.nhsuk-tabs` - Main tabs container
- `.nhsuk-tabs__title` - Table of contents title (mobile only)
- `.nhsuk-tabs__list` - Tab list container (desktop only)
- `.nhsuk-tabs__list-item` - Individual tab item
- `.nhsuk-tabs__list-item--selected` - Selected tab item
- `.nhsuk-tabs__tab` - Tab link element
- `.nhsuk-tabs__panel` - Tab panel container
- `.nhsuk-tabs__panel--hidden` - Hidden panel (desktop only)

## Best Practices

### Content Organization

```tsx
// ✅ Good - Logical grouping of related content
<Tabs items={[
  {
    id: "overview",
    label: "Overview", 
    panel: { html: "<h2>Patient Overview</h2>..." }
  },
  {
    id: "history",
    label: "Medical History",
    panel: { html: "<h2>Medical History</h2>..." }
  }
]} />

// ❌ Bad - Unrelated content mixed together
<Tabs items={[
  { id: "patient", label: "Patient Info", panel: { text: "..." } },
  { id: "weather", label: "Weather", panel: { text: "..." } }
]} />
```

### Tab Labels

```tsx
// ✅ Good - Clear, descriptive labels
{
  id: "medication-history",
  label: "Medication History",
  panel: { html: "..." }
}

// ✅ Good - Concise but informative
{
  id: "test-results", 
  label: "Test Results",
  panel: { html: "..." }
}

// ❌ Bad - Vague or generic labels
{
  id: "tab1",
  label: "Info",
  panel: { html: "..." }
}
```

### Controlled vs Uncontrolled

```tsx
// ✅ Good - Uncontrolled for simple cases
<Tabs 
  defaultActiveTab={1}
  items={tabItems}
/>

// ✅ Good - Controlled when you need to track state
const [activeTab, setActiveTab] = useState(0);

<Tabs 
  activeTab={activeTab}
  onTabChange={(index, id) => {
    setActiveTab(index);
    analytics.track('tab_changed', { tabId: id });
  }}
  items={tabItems}
/>
```

### Content Structure

```tsx
// ✅ Good - Proper heading hierarchy
{
  panel: {
    html: `
      <h2>Section Title</h2>
      <p>Content description...</p>
      <h3>Subsection</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    `
  }
}

// ❌ Bad - Missing structure and headings
{
  panel: {
    text: "Just a wall of text without any structure or headings to help users scan the content effectively."
  }
}
```

### Healthcare-Specific Guidelines

```tsx
// ✅ Good - Clear medical information structure
{
  id: "medications",
  label: "Current Medications",
  panel: {
    html: `
      <h2>Active Prescriptions</h2>
      <ul>
        <li><strong>Metformin 500mg</strong> - Twice daily with meals</li>
        <li><strong>Lisinopril 10mg</strong> - Once daily</li>
      </ul>
    `
  }
}

// ✅ Good - Important information highlighted
{
  id: "allergies",
  label: "Allergies & Alerts", 
  panel: {
    html: `
      <h2>Known Allergies</h2>
      <div class="alert alert-warning">
        <strong>PENICILLIN ALLERGY</strong> - Severe reaction
      </div>
    `
  }
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [Card](../card/README.md) - For content grouping
- [Details](../details/README.md) - For expandable content
- [Accordion](../accordion/README.md) - For mobile-like expandable sections
- [Button](../button/README.md) - For navigation actions

## Resources

- [NHS Digital Tabs Guidance](https://service-manual.nhs.uk/design-system/components/tabs)
- [GOV.UK Tabs Pattern](https://design-system.service.gov.uk/components/tabs/)
- [WCAG Tab Panel Guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)