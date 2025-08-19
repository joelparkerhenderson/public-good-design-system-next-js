# Images

A component for displaying images with optional captions, responsive image support, and proper semantic markup. Supports both basic images and responsive images with srcset and sizes attributes for optimal performance across devices. Designed for healthcare and public service websites with accessibility in mind.

Converted from the NHS UK Design System Images component for the Public Good Design System.

## Features

- **Responsive images**: Support for srcset and sizes attributes for optimal loading
- **Rich captions**: HTML support with proper semantic markup
- **Accessibility first**: Proper alt text, figure/figcaption structure, and ARIA support
- **Healthcare optimized**: Examples and patterns for medical imagery
- **Performance focused**: Lazy loading ready with modern image formats
- **Customizable**: Support for custom classes and attributes
- **Semantic markup**: Proper HTML structure for screen readers and SEO

## Usage

```tsx
import { Images } from '@/components/images';

// Basic image
<Images 
  src="/images/health-check.jpg"
  alt="Healthcare professional checking patient's blood pressure"
/>

// Image with caption
<Images 
  src="/images/vaccination.jpg"
  alt="NHS nurse administering COVID-19 vaccine"
  caption="COVID-19 vaccines are safe and effective in preventing serious illness"
/>

// Responsive image with srcset
<Images 
  src="/images/hospital-600w.jpg"
  srcset="/images/hospital-600w.jpg 600w, /images/hospital-1200w.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Modern NHS hospital building"
  caption="Our state-of-the-art facilities provide world-class healthcare"
/>
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `src` | `string` | The source location of the image |
| `alt` | `string` | The alt text of the image (required for accessibility) |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `caption` | `string` | - | Optional caption text for the image (supports HTML) |
| `sizes` | `string` | - | Screen sizes for responsive loading |
| `srcset` | `string` | - | Image source URLs and sizes for responsive images |
| `classes` | `string` | - | Additional CSS classes for the image container |
| `attributes` | `Record<string, string>` | - | Additional HTML attributes |

### Inherited Props

The component also accepts all standard HTML attributes through `BaseComponentProps`:
- `className` - CSS class names
- `data-testid` - Test identifier  
- Standard HTML attributes like `role`, `aria-*`, etc.

### Type Definitions

```tsx
interface ImagesProps extends BaseComponentProps {
  src: string;                          // Required: Image source URL
  alt: string;                          // Required: Alt text for accessibility
  caption?: string;                     // Optional: HTML caption text
  sizes?: string;                       // Optional: Responsive sizes attribute
  srcset?: string;                      // Optional: Responsive srcset attribute
  classes?: string;                     // Optional: Additional CSS classes
  attributes?: Record<string, string>;  // Optional: Additional HTML attributes
}
```

## Basic Examples

### Simple Image

```tsx
<Images 
  src="/images/doctor-consultation.jpg"
  alt="Doctor consulting with elderly patient in clinic"
/>
```

### Image with Caption

```tsx
<Images 
  src="/images/prescription-medication.jpg"
  alt="Various prescription bottles arranged on pharmacy counter"
  caption="Always take medications as prescribed by your healthcare provider"
/>
```

### Image with HTML Caption

```tsx
<Images 
  src="/images/emergency-department.jpg"
  alt="NHS hospital emergency department entrance with clear signage"
  caption="Emergency services available <strong>24 hours a day</strong>, 7 days a week"
/>
```

## Responsive Images

### Basic Responsive Setup

```tsx
<Images 
  src="/images/health-info-600w.jpg"
  srcset="/images/health-info-600w.jpg 600w, /images/health-info-1200w.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Public health information infographic"
  caption="Key health statistics and preventive care recommendations"
/>
```

### Mobile-First Responsive

```tsx
<Images 
  src="/images/appointment-booking-320w.jpg"
  srcset="
    /images/appointment-booking-320w.jpg 320w,
    /images/appointment-booking-640w.jpg 640w,
    /images/appointment-booking-960w.jpg 960w,
    /images/appointment-booking-1280w.jpg 1280w
  "
  sizes="
    (max-width: 320px) 100vw,
    (max-width: 640px) 90vw,
    (max-width: 960px) 75vw,
    60vw
  "
  alt="Online appointment booking system interface on various devices"
  caption="Book appointments online anytime through our patient portal"
/>
```

### High-DPI Display Support

```tsx
<Images 
  src="/images/medical-scan-1x.jpg"
  srcset="/images/medical-scan-1x.jpg 1x, /images/medical-scan-2x.jpg 2x"
  alt="MRI brain scan showing normal anatomical structures"
  caption="High-resolution medical imaging for accurate diagnosis"
/>
```

## Healthcare Examples

### Medical Procedures

```tsx
<Images 
  src="/images/blood-pressure-check.jpg"
  alt="NHS nurse taking patient's blood pressure using digital sphygmomanometer"
  caption="Regular blood pressure monitoring helps prevent heart disease and stroke"
/>
```

### Health Conditions

```tsx
<Images 
  src="/images/skin-condition-eczema.jpg"
  srcset="/images/skin-condition-eczema-600w.jpg 600w, /images/skin-condition-eczema-1200w.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 66vw"
  alt="Close-up view of eczema on adult forearm showing characteristic red, inflamed patches"
  caption="<strong>Eczema symptoms:</strong> Red, dry, itchy skin that may crack or bleed. Consult your GP for proper diagnosis and treatment options."
/>
```

### Hospital Facilities

```tsx
<Images 
  src="/images/modern-hospital-ward.jpg"
  alt="Clean, modern NHS hospital ward with private patient rooms and nursing station"
  caption='Our facilities meet the highest standards of cleanliness and patient care. <a href="/facilities">Learn more about our services</a>.'
/>
```

### Mental Health Support

```tsx
<Images 
  src="/images/counseling-session.jpg"
  alt="Mental health counselor in consultation with patient in comfortable, private office"
  caption='Professional mental health support is confidential and effective. <a href="/mental-health-services">Find services near you</a>.'
/>
```

### Vaccination Programs

```tsx
<Images 
  src="/images/flu-vaccination-clinic.jpg"
  srcset="/images/flu-vaccination-clinic-800w.jpg 800w, /images/flu-vaccination-clinic-1600w.jpg 1600w"
  sizes="(max-width: 768px) 100vw, 75vw"
  alt="NHS staff administering flu vaccines to elderly patients in community clinic"
  caption="<p><strong>Free flu vaccinations</strong> available for eligible patients.</p><p>Book your appointment today to protect yourself and your community.</p>"
/>
```

### Emergency Services

```tsx
<Images 
  src="/images/ambulance-service.jpg"
  alt="NHS ambulance responding to emergency call with paramedics preparing equipment"
  caption='<p>Emergency services available 24/7:</p><ul><li><strong>999</strong> - Life-threatening emergencies</li><li><strong>111</strong> - Urgent but non-life-threatening care</li></ul>'
/>
```

### Preventive Care

```tsx
<Images 
  src="/images/health-screening.jpg"
  alt="NHS healthcare professional conducting routine mammography screening"
  caption="Regular health screenings can detect problems early when treatment is most effective"
/>
```

### Maternal Health

```tsx
<Images 
  src="/images/prenatal-ultrasound.jpg"
  alt="Pregnant woman receiving ultrasound examination from NHS midwife"
  caption="Comprehensive prenatal care includes regular check-ups, screenings, and support throughout pregnancy"
/>
```

### Elderly Care

```tsx
<Images 
  src="/images/elderly-physiotherapy.jpg"
  alt="NHS physiotherapist assisting elderly patient with mobility exercises in rehabilitation center"
  caption='<p>Physiotherapy helps maintain independence and quality of life.</p><p><a href="/rehabilitation-services">Explore our rehabilitation services</a></p>'
/>
```

### Pharmacy Services

```tsx
<Images 
  src="/images/community-pharmacy.jpg"
  alt="NHS community pharmacist counseling patient about medication management"
  caption="<strong>Free NHS pharmacy services:</strong> Prescription collection, medication reviews, and health advice"
/>
```

### Dental Health

```tsx
<Images 
  src="/images/dental-examination.jpg"
  alt="NHS dentist performing routine oral health examination on patient"
  caption="Regular dental check-ups prevent serious oral health problems and maintain overall health"
/>
```

## Advanced Usage

### Complex Healthcare Infographic

```tsx
<Images 
  src="/images/covid-prevention-infographic-800w.jpg"
  srcset="
    /images/covid-prevention-infographic-400w.jpg 400w,
    /images/covid-prevention-infographic-800w.jpg 800w,
    /images/covid-prevention-infographic-1200w.jpg 1200w,
    /images/covid-prevention-infographic-1600w.jpg 1600w
  "
  sizes="
    (max-width: 480px) 100vw,
    (max-width: 768px) 90vw,
    (max-width: 1024px) 75vw,
    60vw
  "
  alt="COVID-19 prevention infographic showing hand washing, mask wearing, social distancing, and vaccination"
  caption='
    <h3>Protect Yourself and Others from COVID-19</h3>
    <ul>
      <li><strong>Get vaccinated</strong> - Safe and effective protection</li>
      <li><strong>Wash hands frequently</strong> - For at least 20 seconds</li>
      <li><strong>Wear a face covering</strong> - In crowded indoor spaces</li>
      <li><strong>Maintain distance</strong> - When possible in public spaces</li>
    </ul>
    <p><a href="/covid-19-guidance">Read full COVID-19 guidance</a></p>
  '
/>
```

### Before/After Medical Treatment

```tsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
  <Images 
    src="/images/wound-before-treatment.jpg"
    alt="Leg wound before treatment showing signs of infection and poor healing"
    caption="<strong>Before treatment:</strong> Infected wound with delayed healing"
  />
  <Images 
    src="/images/wound-after-treatment.jpg"
    alt="Same leg wound after NHS treatment showing healthy healing and reduced inflammation"
    caption="<strong>After NHS treatment:</strong> Proper wound care promotes healthy healing"
  />
</div>
```

### Medical Equipment Showcase

```tsx
<Images 
  src="/images/mri-scanner.jpg"
  srcset="/images/mri-scanner-600w.jpg 600w, /images/mri-scanner-1200w.jpg 1200w, /images/mri-scanner-1800w.jpg 1800w"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
  alt="State-of-the-art MRI scanner in modern NHS hospital imaging department"
  caption='
    <h3>Advanced Medical Imaging</h3>
    <p>Our imaging department features:</p>
    <ul>
      <li>High-field MRI scanners for detailed imaging</li>
      <li>CT scanners with radiation dose optimization</li>
      <li>Digital X-ray systems for immediate results</li>
      <li>Ultrasound services including 3D/4D imaging</li>
    </ul>
    <p><a href="/imaging-services">Schedule your imaging appointment</a></p>
  '
/>
```

## Accessibility Features

### Semantic Structure

- **Figure element**: Proper container for images with captions
- **Figcaption element**: Semantically associated caption text
- **Alt text**: Meaningful descriptions for screen readers
- **ARIA support**: Custom ARIA attributes when needed

### Screen Reader Support

```tsx
<Images 
  src="/images/hospital-wayfinding.jpg"
  alt="Hospital corridor with clear directional signage showing routes to Emergency Department, Outpatients, and Main Reception"
  caption="Clear signage helps patients and visitors navigate our facilities easily"
  attributes={{ 'aria-describedby': 'wayfinding-description' }}
/>
<div id="wayfinding-description" className="sr-only">
  Additional navigation assistance is available at all reception desks and through our mobile app
</div>
```

### Alt Text Best Practices

```tsx
// Good: Descriptive and informative
<Images 
  src="/images/diabetes-foot-care.jpg"
  alt="NHS podiatrist examining diabetic patient's feet for signs of infection or injury"
  caption="Regular foot care prevents serious complications for people with diabetes"
/>

// Avoid: Too brief or redundant
<Images 
  src="/images/diabetes-foot-care.jpg"
  alt="foot care"  // Too brief, not helpful
  caption="Regular foot care prevents serious complications for people with diabetes"
/>
```

## Performance Optimization

### Lazy Loading Ready

```tsx
<Images 
  src="/images/large-medical-chart.jpg"
  srcset="/images/large-medical-chart-800w.jpg 800w, /images/large-medical-chart-1600w.jpg 1600w"
  sizes="(max-width: 768px) 100vw, 75vw"
  alt="Detailed anatomical chart showing cardiovascular system"
  caption="Interactive medical references available in all consultation rooms"
  attributes={{ loading: 'lazy' }}
/>
```

### WebP Format Support

```tsx
<Images 
  src="/images/hospital-exterior.jpg"
  srcset="
    /images/hospital-exterior-400w.webp 400w,
    /images/hospital-exterior-800w.webp 800w,
    /images/hospital-exterior-400w.jpg 400w,
    /images/hospital-exterior-800w.jpg 800w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Modern NHS hospital building with sustainable energy features"
  caption="Our environmentally sustainable facilities reduce carbon footprint while maintaining excellent patient care"
/>
```

## Visual Design

### Typography

- **Caption text**: Smaller than body text for visual hierarchy
- **HTML support**: Rich formatting with proper line heights
- **Link styling**: Consistent with design system colors

### Spacing

- **Bottom margin**: Consistent spacing below images
- **Caption spacing**: Proper separation from image
- **Responsive margins**: Adapted for different screen sizes

### Responsive Behavior

- **Mobile optimization**: Full-width images on small screens
- **Tablet adaptation**: Balanced sizing for medium screens
- **Desktop presentation**: Optimal sizing for large displays

## Technical Implementation

### Styled Components Structure

```tsx
const ImageFigure = styled.figure`
  margin: 0 0 ${({ theme }) => theme.spacing[6]};
  display: block;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ImageElement = styled.img`
  display: block;
  height: auto;
  max-width: 100%;
  width: 100%;
  border: 0;
`;

const ImageCaption = styled.figcaption`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: ${({ theme }) => theme.spacing[3]};
`;
```

### Server-Side Rendering

- Compatible with Next.js SSR
- Properly hydrated on client-side
- No layout shift issues
- SEO-friendly markup

## Browser Support

Compatible with all modern browsers including:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- IE11 (with polyfills)

### Modern Image Format Support

- WebP: Chrome 23+, Firefox 65+, Safari 14+
- AVIF: Chrome 85+, Firefox 93+, Safari 16.1+

## Related Components

- **[Hero](../hero/README.md)** - Large banner images with overlays
- **[Card](../card/README.md)** - Cards that can include images
- **[Figure](../figure/README.md)** - Generic figure component for various media

## Best Practices

### Content Guidelines

1. **Use descriptive alt text**: Describe what's important about the image
2. **Write meaningful captions**: Provide context and additional information
3. **Optimize image sizes**: Use appropriate dimensions for display size
4. **Consider accessibility**: Ensure images work for all users
5. **Maintain aspect ratios**: Prevent layout shifts during loading

### Performance Guidelines

1. **Use responsive images**: Provide multiple sizes for different screens
2. **Optimize file sizes**: Compress images without losing quality
3. **Consider lazy loading**: Load images only when needed
4. **Use modern formats**: WebP, AVIF for better compression
5. **Test on slow connections**: Ensure good experience for all users

### Healthcare-Specific Guidelines

1. **Respect privacy**: Obtain proper consent for patient images
2. **Use inclusive imagery**: Represent diverse communities
3. **Maintain dignity**: Show patients and staff respectfully
4. **Provide context**: Explain medical procedures and conditions
5. **Include safety information**: Add relevant warnings or guidance

### Accessibility Guidelines

1. **Write effective alt text**: Describe content and context
2. **Use proper markup**: Figure and figcaption for semantic structure
3. **Test with screen readers**: Verify content is accessible
4. **Provide text alternatives**: Ensure important information is available in text
5. **Consider color contrast**: Ensure captions are readable

### SEO Guidelines

1. **Optimize alt text**: Use relevant keywords naturally
2. **Use structured data**: Add appropriate schema markup
3. **Optimize file names**: Use descriptive, keyword-rich names
4. **Add captions**: Provide context for search engines
5. **Monitor performance**: Track loading times and user experience

## Migration from NHS UK

The Images component maintains full compatibility with NHS UK patterns while adding modern React features:

- Same visual appearance and behavior
- Enhanced TypeScript support
- Better performance with styled-components
- Improved accessibility features
- Modern responsive image support