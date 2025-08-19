/**
 * Core TypeScript type definitions for the Public Good Design System
 */

// Base component props that all components extend
export interface BaseComponentProps {
  /** Additional CSS classes to apply */
  className?: string;
  /** Custom data attributes */
  'data-testid'?: string;
  /** Unique identifier for the component */
  id?: string;
  /** Component children */
  children?: React.ReactNode;
}

// HTML element props for polymorphic components
export interface PolymorphicProps<T extends React.ElementType = React.ElementType> {
  /** The element type to render */
  as?: T;
}

// Combine base props with polymorphic props
export type ComponentProps<T extends React.ElementType = 'div'> = BaseComponentProps &
  PolymorphicProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof BaseComponentProps | 'as'>;

// Size variants used across components
export type SizeVariant = 'sm' | 'md' | 'lg' | 'xl';

// Color variants used across components  
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// Button-specific types
export type ButtonVariant = 'primary' | 'secondary' | 'warning' | 'login' | 'reverse';
export type ButtonElement = 'button' | 'a' | 'input';

export interface ButtonProps extends BaseComponentProps {
  /** Button text content */
  text?: string;
  /** Button HTML content (takes precedence over text) */
  html?: string;
  /** Button variant */
  variant?: ButtonVariant;
  /** HTML element type to render */
  element?: ButtonElement;
  /** Button type for form submission */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Href for link buttons */
  href?: string;
  /** Button name attribute */
  name?: string;
  /** Button value attribute */
  value?: string;
  /** Prevent double-click submissions */
  preventDoubleClick?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;
}

// Form field types
export interface FormFieldProps extends BaseComponentProps {
  /** Field name */
  name: string;
  /** Field label */
  label: string;
  /** Field value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Field placeholder */
  placeholder?: string;
  /** Whether field is required */
  required?: boolean;
  /** Whether field is disabled */
  disabled?: boolean;
  /** Whether field is read-only */
  readOnly?: boolean;
  /** Error message */
  error?: string;
  /** Hint text */
  hint?: string;
  /** Change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// Navigation types
export interface NavigationItem {
  /** Link text */
  text: string;
  /** Link URL */
  href: string;
  /** Whether link is active */
  active?: boolean;
  /** Nested navigation items */
  items?: NavigationItem[];
}

// Internationalization types
export type SupportedLocale = 'en' | 'cy' | 'ar' | 'zh' | 'es';

export interface TranslationKeys {
  [key: string]: string | TranslationKeys;
}

// Accessibility types
export interface AccessibilityProps {
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelledby */
  'aria-labelledby'?: string;
  /** ARIA describedby */
  'aria-describedby'?: string;
  /** ARIA expanded (for collapsible content) */
  'aria-expanded'?: boolean;
  /** ARIA hidden */
  'aria-hidden'?: boolean;
  /** Tab index */
  tabIndex?: number;
  /** Role */
  role?: string;
}

// Table types
export interface TableColumn {
  /** Column key */
  key: string;
  /** Column header text */
  header: string;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Column width */
  width?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

export interface TableRow {
  /** Unique row ID */
  id: string;
  /** Row data */
  [key: string]: any;
}

// Card types
export type CardVariant = 'basic' | 'clickable' | 'feature' | 'urgent' | 'emergency' | 'non-urgent';

export interface CardProps extends BaseComponentProps {
  /** Card variant */
  variant?: CardVariant;
  /** Card title */
  title?: string;
  /** Card description */
  description?: string;
  /** Card image */
  image?: {
    src: string;
    alt: string;
  };
  /** Click handler for clickable cards */
  onClick?: () => void;
  /** Link URL for clickable cards */
  href?: string;
}

// Error types
export interface ErrorInfo {
  /** Error message */
  message: string;
  /** Field name (for form errors) */
  field?: string;
  /** Error anchor link */
  anchor?: string;
}

// Theme types (re-exported from tokens)
export type { Theme } from '@/styles/tokens';

// Event handler types
export type ClickHandler = (event: React.MouseEvent) => void;
export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type FocusHandler = (event: React.FocusEvent) => void;
export type KeyboardHandler = (event: React.KeyboardEvent) => void;