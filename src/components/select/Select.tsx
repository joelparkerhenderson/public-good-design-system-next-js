'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface SelectItem {
  /** Value for the option */
  value?: string;
  /** Text for the option */
  text: string;
  /** Whether this option is selected */
  selected?: boolean;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Additional attributes for the option */
  attributes?: Record<string, string>;
}

export interface LabelProps {
  /** Label text content */
  text?: string;
  /** Label HTML content */
  html?: string;
  /** Additional classes for the label */
  classes?: string;
  /** Whether the label should be styled as a page heading */
  isPageHeading?: boolean;
  /** Additional attributes for the label */
  attributes?: Record<string, string>;
}

export interface HintProps {
  /** Hint text content */
  text?: string;
  /** Hint HTML content */
  html?: string;
  /** Additional classes for the hint */
  classes?: string;
  /** Additional attributes for the hint */
  attributes?: Record<string, string>;
}

export interface ErrorMessageProps {
  /** Error message text content */
  text?: string;
  /** Error message HTML content */
  html?: string;
  /** Additional classes for the error message */
  classes?: string;
}

export interface FormGroupProps {
  /** Additional classes for the form group */
  classes?: string;
  /** Additional attributes for the form group */
  attributes?: Record<string, string>;
}

export interface SelectProps extends BaseComponentProps {
  /** The ID of the select. Defaults to the value of name */
  id?: string;
  /** Name property for the select */
  name: string;
  /** Array of option items for the select */
  items: SelectItem[];
  /** Value for the option which should be selected */
  value?: string;
  /** If true, select box will be disabled */
  disabled?: boolean;
  /** Element IDs for aria-describedby */
  describedBy?: string;
  /** Label configuration */
  label?: LabelProps;
  /** Hint configuration */
  hint?: HintProps;
  /** Error message configuration */
  errorMessage?: ErrorMessageProps;
  /** Form group configuration */
  formGroup?: FormGroupProps;
  /** Additional CSS classes for the select */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
  /** Callback when select value changes */
  onChange?: (value: string) => void;
}

const FormGroup = styled.div<{ $hasError?: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  ${({ $hasError, theme }) => $hasError && `
    border-left: 4px solid ${theme.colors.error};
    padding-left: ${theme.spacing[4]};
  `}
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LabelElement = styled.label<{ $isPageHeading?: boolean; $size?: string }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  display: block;
  
  ${({ $isPageHeading, $size, theme }) => {
    if ($isPageHeading) {
      const size = $size || 'l';
      const sizeMap = {
        's': {
          fontSize: theme.typography.fontSize.lg,
          lineHeight: theme.typography.lineHeight.tight
        },
        'm': {
          fontSize: theme.typography.fontSize.xl,
          lineHeight: theme.typography.lineHeight.tight
        },
        'l': {
          fontSize: theme.typography.fontSize['2xl'],
          lineHeight: theme.typography.lineHeight.tight
        },
        'xl': {
          fontSize: theme.typography.fontSize['3xl'],
          lineHeight: theme.typography.lineHeight.tight
        }
      };
      return `
        font-size: ${sizeMap[size as keyof typeof sizeMap]?.fontSize || sizeMap.l.fontSize};
        line-height: ${sizeMap[size as keyof typeof sizeMap]?.lineHeight || sizeMap.l.lineHeight};
        font-weight: ${theme.typography.fontWeight.bold};
        margin-bottom: ${theme.spacing[3]};
      `;
    }
    return `
      font-size: ${theme.typography.fontSize.base};
      line-height: ${theme.typography.lineHeight.normal};
    `;
  }}
  
  /* Support for HTML content */
  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
  
  em {
    font-style: italic;
  }
`;

const HintText = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const ErrorText = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  
  &::before {
    content: '';
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    margin-right: ${({ theme }) => theme.spacing[2]};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d32f2f'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z' /%3E%3C/svg%3E");
    background-size: 100% 100%;
    vertical-align: top;
  }
`;

const SelectElement = styled.select<{ $hasError?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  
  ${({ $hasError, theme }) => $hasError && `
    border-color: ${theme.colors.error};
  `}
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
    border-color: ${({ theme }) => theme.colors.text};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundMuted};
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }
  
  /* Styling for the dropdown arrow */
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23212529' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-position: right ${({ theme }) => theme.spacing[2]} center;
  background-repeat: no-repeat;
  background-size: 1.25rem;
  padding-right: ${({ theme }) => theme.spacing[8]};
`;

/**
 * Select Component
 * 
 * A dropdown selection component with support for labels, hints, error messages,
 * and accessibility features. Converted from NHS UK Design System select component.
 * 
 * @example
 * ```tsx
 * // Basic select
 * <Select
 *   name="sort"
 *   label={{ text: "Sort by" }}
 *   items={[
 *     { value: "published", text: "Recently published" },
 *     { value: "updated", text: "Recently updated" },
 *     { value: "views", text: "Most views" }
 *   ]}
 * />
 * 
 * // Select with hint and error
 * <Select
 *   name="location"
 *   label={{ text: "Choose location" }}
 *   hint={{ text: "This can be different to where you went before" }}
 *   errorMessage={{ text: "Select a location" }}
 *   items={[
 *     { value: "", text: "Choose location" },
 *     { value: "london", text: "London" },
 *     { value: "manchester", text: "Manchester" }
 *   ]}
 * />
 * ```
 */
export const Select: React.FC<SelectProps> = ({
  id,
  name,
  items,
  value: controlledValue,
  disabled,
  describedBy,
  label,
  hint,
  errorMessage,
  formGroup,
  classes,
  attributes,
  onChange,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(controlledValue);
  
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedValue(controlledValue);
    } else {
      // Find item with selected=true
      const selectedItem = items.find(item => item.selected);
      if (selectedItem) {
        const value = selectedItem.value !== undefined ? selectedItem.value : selectedItem.text;
        setSelectedValue(value);
      }
    }
  }, [controlledValue, items]);

  const selectId = id || name;
  const hasError = !!errorMessage;
  
  // Build describedBy string
  let ariaDescribedBy = describedBy || '';
  const hintId = hint ? `${selectId}-hint` : '';
  const errorId = errorMessage ? `${selectId}-error` : '';
  
  if (hintId) {
    ariaDescribedBy = ariaDescribedBy ? `${ariaDescribedBy} ${hintId}` : hintId;
  }
  if (errorId) {
    ariaDescribedBy = ariaDescribedBy ? `${ariaDescribedBy} ${errorId}` : errorId;
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  const renderLabel = () => {
    if (!label) return null;
    
    const labelSize = label.classes?.match(/nhsuk-label--(s|m|l|xl)/)?.[1];
    const labelClasses = [
      'nhsuk-label',
      label.classes
    ].filter(Boolean).join(' ');

    return (
      <LabelElement
        htmlFor={selectId}
        className={labelClasses}
        $isPageHeading={label.isPageHeading}
        $size={labelSize}
        {...label.attributes}
      >
        {label.html ? (
          <span dangerouslySetInnerHTML={{ __html: label.html }} />
        ) : (
          label.text
        )}
      </LabelElement>
    );
  };

  const renderHint = () => {
    if (!hint) return null;
    
    const hintClasses = [
      'nhsuk-hint',
      hint.classes
    ].filter(Boolean).join(' ');

    return (
      <HintText
        id={hintId}
        className={hintClasses}
        {...hint.attributes}
      >
        {hint.html ? (
          <span dangerouslySetInnerHTML={{ __html: hint.html }} />
        ) : (
          hint.text
        )}
      </HintText>
    );
  };

  const renderErrorMessage = () => {
    if (!errorMessage) return null;
    
    const errorClasses = [
      'nhsuk-error-message',
      errorMessage.classes
    ].filter(Boolean).join(' ');

    return (
      <ErrorText
        id={errorId}
        className={errorClasses}
      >
        {errorMessage.html ? (
          <span dangerouslySetInnerHTML={{ __html: errorMessage.html }} />
        ) : (
          errorMessage.text
        )}
      </ErrorText>
    );
  };

  const renderOptions = () => {
    return items.map((item, index) => {
      if (!item) return null;
      
      const effectiveValue = item.value !== undefined ? item.value : item.text;
      const isSelected = item.selected !== undefined 
        ? item.selected 
        : (selectedValue !== undefined ? effectiveValue === selectedValue : false);

      return (
        <option
          key={index}
          value={effectiveValue}
          disabled={item.disabled}
          {...item.attributes}
        >
          {item.text}
        </option>
      );
    });
  };

  const selectClasses = [
    'nhsuk-select',
    hasError ? 'nhsuk-select--error' : '',
    classes
  ].filter(Boolean).join(' ');

  const formGroupClasses = [
    'nhsuk-form-group',
    hasError ? 'nhsuk-form-group--error' : '',
    formGroup?.classes
  ].filter(Boolean).join(' ');

  return (
    <FormGroup
      className={`${formGroupClasses}${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      $hasError={hasError}
      {...formGroup?.attributes}
      {...rest}
    >
      {renderLabel()}
      {renderHint()}
      {renderErrorMessage()}
      <SelectElement
        id={selectId}
        name={name}
        value={selectedValue || ''}
        disabled={disabled}
        aria-describedby={ariaDescribedBy || undefined}
        className={selectClasses}
        onChange={handleChange}
        $hasError={hasError}
        {...attributes}
      >
        {renderOptions()}
      </SelectElement>
    </FormGroup>
  );
};

Select.displayName = 'Select';