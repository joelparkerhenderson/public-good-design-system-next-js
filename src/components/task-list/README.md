# TaskList Component

A component for displaying a list of tasks with their completion status. Each task can include a title, optional hint text, and a status indicator (either as a tag or plain text). Tasks can optionally be clickable links. Converted from the NHS UK Design System to support the Public Good Design System.

## Features

- **Flexible Task Structure**: Support for titles, hints, and status indicators
- **Interactive Links**: Full-row clickable areas for linked tasks
- **Status Integration**: Uses Tag component for visual status indicators or plain text
- **Accessibility First**: Proper ARIA relationships and focus management
- **Healthcare Optimized**: Perfect for patient care workflows and medical processes
- **Custom Styling**: Extensive customization options with CSS classes
- **ID Management**: Automatic generation of unique IDs for proper accessibility

## Usage

### Basic Task List

```tsx
import { TaskList } from '@public-good/design-system';

<TaskList 
  items={[
    {
      title: { text: "Complete health assessment" },
      href: "/health-assessment",
      status: {
        tag: {
          text: "Incomplete",
          variant: "blue"
        }
      }
    },
    {
      title: { text: "Review medications" },
      status: {
        text: "Completed",
        classes: "nhsuk-task-list__status--completed"
      }
    }
  ]}
/>
```

### Task List with Hints

```tsx
<TaskList 
  items={[
    {
      title: { text: "Family health history" },
      hint: { text: "Details of your parents, brothers and sisters" },
      href: "/family-history",
      status: {
        tag: {
          text: "Incomplete",
          variant: "blue"
        }
      }
    },
    {
      title: { text: "Blood test" },
      hint: { text: "Fasting required - no food for 12 hours" },
      status: {
        text: "Cannot start yet",
        classes: "nhsuk-task-list__status--cannot-start-yet"
      }
    }
  ]}
/>
```

### Task List with HTML Content

```tsx
<TaskList 
  items={[
    {
      title: { 
        html: "<strong>Urgent:</strong> Complete emergency contact form" 
      },
      hint: { 
        html: "Required for <em>all</em> patients" 
      },
      href: "/emergency-contacts",
      status: {
        tag: {
          text: "Urgent",
          variant: "red"
        }
      }
    }
  ]}
/>
```

### Custom ID Prefix

```tsx
<TaskList 
  idPrefix="patient-care"
  items={[
    {
      title: { text: "Patient assessment" },
      hint: { text: "Initial consultation" },
      status: { text: "In progress" }
    }
  ]}
/>
```

## Healthcare Use Cases

### Patient Pre-Admission Checklist

```tsx
<TaskList 
  idPrefix="pre-admission"
  items={[
    {
      title: { text: "Complete pre-admission questionnaire" },
      hint: { text: "Medical history and current medications" },
      href: "/pre-admission/questionnaire",
      status: {
        tag: {
          text: "Incomplete",
          variant: "blue"
        }
      }
    },
    {
      title: { text: "Blood work and lab tests" },
      hint: { text: "Fasting required - last meal 12 hours before" },
      href: "/pre-admission/lab-tests",
      status: {
        tag: {
          text: "Scheduled",
          variant: "yellow"
        }
      }
    },
    {
      title: { text: "Pre-operative assessment" },
      hint: { text: "Anesthesiologist consultation" },
      status: {
        text: "Cannot start yet",
        classes: "nhsuk-task-list__status--cannot-start-yet"
      }
    },
    {
      title: { text: "Insurance verification" },
      status: {
        text: "Completed",
        classes: "nhsuk-task-list__status--completed"
      }
    },
    {
      title: { text: "Surgery consent forms" },
      hint: { text: "Review and sign all required documents" },
      status: {
        text: "Cannot start yet",
        classes: "nhsuk-task-list__status--cannot-start-yet"
      }
    }
  ]}
/>
```

### Patient Care Plan Tasks

```tsx
<TaskList 
  idPrefix="care-plan"
  items={[
    {
      title: { text: "Medication reconciliation" },
      hint: { text: "Review all current medications with pharmacist" },
      href: "/care-plan/medications",
      status: {
        tag: {
          text: "In Progress",
          variant: "blue"
        }
      }
    },
    {
      title: { text: "Nursing assessment" },
      hint: { text: "Vital signs, pain assessment, mobility check" },
      href: "/care-plan/nursing",
      status: {
        text: "Completed",
        classes: "nhsuk-task-list__status--completed"
      }
    },
    {
      title: { text: "Dietary consultation" },
      hint: { text: "Nutritional assessment and meal planning" },
      href: "/care-plan/dietary",
      status: {
        tag: {
          text: "Scheduled",
          variant: "yellow"
        }
      }
    },
    {
      title: { text: "Physical therapy evaluation" },
      hint: { text: "Mobility and strength assessment" },
      status: {
        text: "Pending physician order",
        classes: "nhsuk-task-list__status--cannot-start-yet"
      }
    },
    {
      title: { text: "Discharge planning" },
      hint: { text: "Home care arrangements and follow-up appointments" },
      status: {
        text: "Cannot start yet",
        classes: "nhsuk-task-list__status--cannot-start-yet"
      }
    }
  ]}
/>
```

### Treatment Protocol Checklist

```tsx
<TaskList 
  idPrefix="treatment"
  items={[
    {
      title: { text: "Initial consultation" },
      hint: { text: "Patient history and physical examination" },
      href: "/treatment/consultation",
      status: {
        text: "Completed",
        classes: "nhsuk-task-list__status--completed"
      }
    },
    {
      title: { text: "Diagnostic imaging" },
      hint: { text: "CT scan and MRI as ordered" },
      href: "/treatment/imaging",
      status: {
        tag: {
          text: "In Progress",
          variant: "blue"
        }
      }
    },
    {
      title: { text: "Laboratory results review" },
      hint: { text: "Blood work and biopsy results" },
      status: {
        tag: {
          text: "Pending",
          variant: "yellow"
        }
      }
    },
    {
      title: { text: "Treatment plan development" },
      hint: { text: "Multidisciplinary team meeting" },
      status: {
        text: "Awaiting test results",
        classes: "nhsuk-task-list__status--cannot-start-yet"
      }
    },
    {
      title: { text: "Patient education session" },
      hint: { text: "Treatment options and side effects discussion" },
      status: {
        text: "Cannot start yet",
        classes: "nhsuk-task-list__status--cannot-start-yet"
      }
    }
  ]}
/>
```

### Emergency Department Workflow

```tsx
<TaskList 
  idPrefix="ed-workflow"
  items={[
    {
      title: { text: "Triage assessment" },
      hint: { text: "Priority level and initial vital signs" },
      href: "/ed/triage",
      status: {
        text: "Completed",
        classes: "nhsuk-task-list__status--completed"
      }
    },
    {
      title: { text: "Physician evaluation" },
      hint: { text: "Primary assessment and examination" },
      href: "/ed/physician",
      status: {
        tag: {
          text: "In Progress",
          variant: "blue"
        }
      }
    },
    {
      title: { text: "Diagnostic tests" },
      hint: { text: "Lab work, X-rays, or other imaging as ordered" },
      status: {
        tag: {
          text: "Ordered",
          variant: "yellow"
        }
      }
    },
    {
      title: { text: "Treatment plan" },
      hint: { text: "Medications, procedures, or interventions" },
      status: {
        text: "Awaiting test results",
        classes: "nhsuk-task-list__status--cannot-start-yet"
      }
    },
    {
      title: { text: "Disposition planning" },
      hint: { text: "Discharge, admission, or transfer arrangements" },
      status: {
        text: "Cannot start yet",
        classes: "nhsuk-task-list__status--cannot-start-yet"
      }
    }
  ]}
/>
```

### Chronic Disease Management

```tsx
<TaskList 
  idPrefix="diabetes-care"
  items={[
    {
      title: { text: "HbA1c test" },
      hint: { text: "Quarterly blood sugar monitoring" },
      href: "/diabetes/hba1c",
      status: {
        text: "Completed",
        classes: "nhsuk-task-list__status--completed"
      }
    },
    {
      title: { text: "Blood pressure check" },
      hint: { text: "Monitor for cardiovascular complications" },
      href: "/diabetes/blood-pressure",
      status: {
        tag: {
          text: "Due",
          variant: "orange"
        }
      }
    },
    {
      title: { text: "Foot examination" },
      hint: { text: "Annual diabetic foot screening" },
      href: "/diabetes/foot-exam",
      status: {
        tag: {
          text: "Scheduled",
          variant: "blue"
        }
      }
    },
    {
      title: { text: "Eye examination" },
      hint: { text: "Annual retinal screening" },
      status: {
        tag: {
          text: "Overdue",
          variant: "red"
        }
      }
    },
    {
      title: { text: "Medication review" },
      hint: { text: "Assess effectiveness and adjust dosages" },
      href: "/diabetes/medications",
      status: {
        tag: {
          text: "In Progress",
          variant: "blue"
        }
      }
    },
    {
      title: { text: "Nutrition counseling" },
      hint: { text: "Dietary education and meal planning" },
      status: {
        text: "Pending referral",
        classes: "nhsuk-task-list__status--cannot-start-yet"
      }
    }
  ]}
/>
```

### Patient Discharge Checklist

```tsx
<TaskList 
  idPrefix="discharge"
  items={[
    {
      title: { text: "Discharge medications reconciled" },
      hint: { text: "Pharmacy review and patient education" },
      href: "/discharge/medications",
      status: {
        text: "Completed",
        classes: "nhsuk-task-list__status--completed"
      }
    },
    {
      title: { text: "Follow-up appointments scheduled" },
      hint: { text: "Primary care and specialist visits" },
      href: "/discharge/follow-up",
      status: {
        tag: {
          text: "In Progress",
          variant: "blue"
        }
      }
    },
    {
      title: { text: "Home care services arranged" },
      hint: { text: "Nursing, physical therapy, or aide services" },
      status: {
        tag: {
          text: "Pending",
          variant: "yellow"
        }
      }
    },
    {
      title: { text: "Medical equipment ordered" },
      hint: { text: "Wheelchair, oxygen, or monitoring devices" },
      status: {
        text: "Not required",
        classes: "nhsuk-task-list__status--completed"
      }
    },
    {
      title: { text: "Patient education completed" },
      hint: { text: "Care instructions and warning signs" },
      href: "/discharge/education",
      status: {
        tag: {
          text: "Incomplete",
          variant: "red"
        }
      }
    },
    {
      title: { text: "Transportation arranged" },
      hint: { text: "Safe transport home or to next facility" },
      status: {
        text: "Cannot complete yet",
        classes: "nhsuk-task-list__status--cannot-start-yet"
      }
    }
  ]}
/>
```

## Props

### TaskListProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | `TaskListItem[]` | Yes | Array of task items |
| `idPrefix` | `string` | No | ID prefix for generating unique IDs. Defaults to `'task-list'` |
| `attributes` | `Record<string, string>` | No | Additional HTML attributes |

### TaskListItem

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `TaskListTitle` | Yes | Title configuration for the task |
| `hint` | `TaskListHint` | No | Optional hint text to provide additional context |
| `status` | `TaskListStatus` | Yes | Status configuration for the task |
| `href` | `string` | No | Link URL for the task (makes the task clickable) |
| `classes` | `string` | No | Additional CSS classes for the task item |

### TaskListTitle

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | No | Text content for the title |
| `html` | `string` | No | HTML content for the title (takes precedence over text) |
| `classes` | `string` | No | Additional CSS classes for the title |

### TaskListHint

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | No | Text content for the hint |
| `html` | `string` | No | HTML content for the hint (takes precedence over text) |

### TaskListStatus

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `tag` | `TagProps` | No | Tag component for visual status indicator |
| `text` | `string` | No | Text content for status (used if no tag provided) |
| `html` | `string` | No | HTML content for status (used if no tag provided) |
| `classes` | `string` | No | Additional CSS classes for the status container |

## Accessibility

The TaskList component implements comprehensive accessibility features:

- **ARIA Relationships**: Proper `aria-describedby` linking titles to hints and status
- **Unique IDs**: Automatic generation of unique IDs for hints and status indicators
- **Semantic HTML**: Uses proper list structure with `<ul>` and `<li>` elements
- **Focus Management**: Clear focus indicators for linked tasks
- **Screen Reader Support**: Proper announcement of task relationships
- **Keyboard Navigation**: Full keyboard accessibility for interactive elements

## Styling

The component uses styled-components with design tokens:

- **Table Layout**: CSS table layout for flexible task name and status columns
- **Hover States**: Full-row hover effects for linked tasks
- **Status Styling**: Consistent styling for different status types
- **Border Management**: Proper border styling for visual separation
- **Responsive Design**: Adapts to different screen sizes

## CSS Classes

- `.nhsuk-task-list` - Main task list container
- `.nhsuk-task-list__item` - Individual task item
- `.nhsuk-task-list__item--with-link` - Task item with clickable link
- `.nhsuk-task-list__name-and-hint` - Container for title and hint
- `.nhsuk-task-list__link` - Clickable task link
- `.nhsuk-task-list__hint` - Hint text container
- `.nhsuk-task-list__status` - Status container
- `.nhsuk-task-list__status--completed` - Completed status styling
- `.nhsuk-task-list__status--cannot-start-yet` - Cannot start status styling

## Best Practices

### Task Organization

```tsx
// ✅ Good - Logical task progression
<TaskList items={[
  { title: { text: "Registration" }, status: { text: "Completed" } },
  { title: { text: "Assessment" }, status: { text: "In Progress" } },
  { title: { text: "Treatment" }, status: { text: "Cannot start yet" } }
]} />

// ❌ Bad - Random task order
<TaskList items={[
  { title: { text: "Discharge" }, status: { text: "Cannot start yet" } },
  { title: { text: "Registration" }, status: { text: "Completed" } },
  { title: { text: "Assessment" }, status: { text: "In Progress" } }
]} />
```

### Status Indicators

```tsx
// ✅ Good - Clear status with appropriate colors
{
  status: {
    tag: { text: "Urgent", variant: "red" }
  }
}

// ✅ Good - Text status with semantic classes
{
  status: {
    text: "Completed",
    classes: "nhsuk-task-list__status--completed"
  }
}

// ❌ Bad - Vague status
{
  status: { text: "OK" }
}
```

### Helpful Hints

```tsx
// ✅ Good - Specific, actionable hints
{
  title: { text: "Blood test" },
  hint: { text: "Fasting required - no food for 12 hours before test" }
}

// ✅ Good - Context-providing hints
{
  title: { text: "Insurance verification" },
  hint: { text: "Bring insurance card and photo ID" }
}

// ❌ Bad - Redundant or unhelpful hints
{
  title: { text: "Blood test" },
  hint: { text: "A test of your blood" }
}
```

### Healthcare-Specific Guidelines

```tsx
// ✅ Good - Clear medical task progression
<TaskList items={[
  {
    title: { text: "Pre-operative clearance" },
    hint: { text: "Cardiology and anesthesia consultations" },
    status: { tag: { text: "In Progress", variant: "blue" } }
  },
  {
    title: { text: "Surgery scheduling" },
    hint: { text: "Dependent on clearance completion" },
    status: { text: "Cannot start yet", classes: "nhsuk-task-list__status--cannot-start-yet" }
  }
]} />

// ✅ Good - Patient safety considerations
{
  title: { html: "<strong>Allergy Alert:</strong> Update medication list" },
  hint: { text: "Critical for patient safety" },
  status: { tag: { text: "Urgent", variant: "red" } }
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [Tag](../tag/README.md) - For status indicators
- [Card](../card/README.md) - For content grouping
- [Checkboxes](../checkboxes/README.md) - For selectable task lists
- [Button](../button/README.md) - For task actions

## Resources

- [NHS Digital Task List Guidance](https://service-manual.nhs.uk/design-system/components/task-list)
- [GOV.UK Task List Pattern](https://design-system.service.gov.uk/patterns/task-list-pages/)
- [WCAG Link Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)