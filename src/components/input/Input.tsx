'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface LabelProps {
  /** Label text content */
  text?: string;
  /** Label HTML content */
  html?: string;
  /** Additional classes for the label */
  classes?: string;
  /** Whether the label should be a page heading */
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

export interface InputProps extends BaseComponentProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type' | 'value' | 'className'> {
  /** The ID of the input. Defaults to the value of name */
  id?: string;
  /** The name of the input, which is submitted with the form data */
  name: string;
  /** Type of input control to render */
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';
  /** Input mode for mobile keyboards */
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  /** Initial value of the input */
  value?: string;
  /** Element IDs to add to aria-describedby */
  describedBy?: string;
  /** Options for the label component */
  label: LabelProps;
  /** Options for the hint component */
  hint?: HintProps;
  /** Options for the error message component */
  errorMessage?: ErrorMessageProps;
  /** Optional prefix text to be displayed before the input */
  prefix?: string;
  /** Optional suffix text to be displayed after the input */
  suffix?: string;
  /** Additional options for the form group */
  formGroup?: FormGroupProps;
  /** Additional CSS classes for the input */
  classes?: string;
  /** Autocomplete attribute */
  autocomplete?: string;
  /** Pattern attribute for validation */
  pattern?: string;
  /** Spellcheck attribute */
  spellcheck?: boolean;
  /** Additional HTML attributes for the input */
  attributes?: Record<string, string>;
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

const Label = styled.label<{ $isPageHeading?: boolean; $size?: 's' | 'm' | 'l' | 'xl' }>`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  
  ${({ $isPageHeading, $size, theme }) => {
    if ($isPageHeading) {
      const size = $size || 'xl';
      const sizeMap = {
        's': {
          fontSize: theme.typography.fontSize.lg,
          lineHeight: theme.typography.lineHeight.tight,
          marginBottom: theme.spacing[3]
        },
        'm': {
          fontSize: theme.typography.fontSize.xl,
          lineHeight: theme.typography.lineHeight.tight,
          marginBottom: theme.spacing[3]
        },
        'l': {
          fontSize: theme.typography.fontSize['2xl'],
          lineHeight: theme.typography.lineHeight.tight,
          marginBottom: theme.spacing[3]
        },
        'xl': {
          fontSize: theme.typography.fontSize['3xl'],
          lineHeight: theme.typography.lineHeight.tight,
          marginBottom: theme.spacing[3]
        }
      };
      return `
        font-size: ${sizeMap[size].fontSize};
        line-height: ${sizeMap[size].lineHeight};
        margin-bottom: ${sizeMap[size].marginBottom};
      `;
    }
    return '';
  }}
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

const InputWrapper = styled.div`
  display: flex;
  align-items: stretch;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  
  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 0;
    border-color: ${({ theme }) => theme.colors.focus};
  }
  
  &.nhsuk-input--error {
    border-color: ${({ theme }) => theme.colors.error};
  }
`;

const InputElement = styled.input<{ 
  $hasError?: boolean; 
  $width?: '2' | '3' | '4' | '5' | '10' | '20' | '30' | 'full';
  $hasPrefix?: boolean;
  $hasSuffix?: boolean;
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;
  border: 0;
  outline: 0;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  flex: 1;
  min-width: 0;
  
  ${({ $width }) => {
    if (!$width || $width === 'full') return '';
    
    const widthMap = {
      '2': '4.4rem',   // ~4 characters
      '3': '6.5rem',   // ~6 characters
      '4': '8.6rem',   // ~8 characters
      '5': '10.7rem',  // ~10 characters
      '10': '18.6rem', // ~16 characters
      '20': '41.1rem', // ~32 characters
      '30': '59.1rem'  // ~48 characters
    };
    
    return `
      max-width: ${widthMap[$width]};
      flex: 0 0 auto;
    `;
  }}
  
  ${({ $hasError, theme }) => $hasError && `
    border-color: ${theme.colors.error};
  `}
  
  ${({ $hasPrefix }) => $hasPrefix && `
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  `}
  
  ${({ $hasSuffix }) => $hasSuffix && `
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `}
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
  
  &:disabled {
    color: ${({ theme }) => theme.colors.textMuted};
    background-color: ${({ theme }) => theme.colors.backgroundMuted};
    cursor: not-allowed;
  }
`;

const InputPrefix = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.backgroundMuted};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const InputSuffix = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.backgroundMuted};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const StandaloneInput = styled(InputElement)`
  border: 2px solid ${({ theme }) => theme.colors.border};
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 0;
    border-color: ${({ theme }) => theme.colors.focus};
  }
  
  ${({ $hasError, theme }) => $hasError && `
    border-color: ${theme.colors.error};
  `}
`;

/**
 * Input Component
 * 
 * A form input component with label, optional hint text, error messaging, and prefix/suffix support.
 * Supports various input types, widths, and accessibility features including proper ARIA associations.
 * Converted from NHS UK Design System input component.
 * 
 * @example
 * ```tsx
 * // Basic input
 * <Input 
 *   name="nhs-number"
 *   label={{ text: "NHS Number" }}
 * />
 * 
 * // Input with hint
 * <Input 
 *   name="nhs-number"
 *   label={{ text: "NHS Number" }}
 *   hint={{ text: "It's a 10-digit number, for example 485 777 3456" }}
 * />
 * 
 * // Input with error
 * <Input 
 *   name="nhs-number"
 *   label={{ text: "NHS Number" }}
 *   errorMessage={{ text: "Enter your NHS number" }}
 * />
 * 
 * // Input with prefix and suffix
 * <Input 
 *   name="cost"
 *   label={{ text: "Cost per item" }}
 *   prefix="£"
 *   suffix="per item"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  id,
  name,
  type = 'text',
  inputMode,
  value,
  describedBy,
  label,
  hint,
  errorMessage,
  prefix,
  suffix,
  formGroup,
  classes,
  autocomplete,
  pattern,
  spellcheck,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}, ref) => {
  const inputId = id || name;
  const hasError = !!errorMessage;
  const hasWrapper = !!(prefix || suffix);
  
  // Build describedBy string
  let ariaDescribedBy = describedBy || '';
  const hintId = hint ? `${inputId}-hint` : '';
  const errorId = errorMessage ? `${inputId}-error` : '';
  
  if (hintId) {
    ariaDescribedBy = ariaDescribedBy ? `${ariaDescribedBy} ${hintId}` : hintId;
  }
  if (errorId) {
    ariaDescribedBy = ariaDescribedBy ? `${ariaDescribedBy} ${errorId}` : errorId;
  }

  // Extract width class from classes prop
  const widthMatch = classes?.match(/nhsuk-input--width-(\d+)/);
  const width = widthMatch ? widthMatch[1] as '2' | '3' | '4' | '5' | '10' | '20' | '30' : undefined;

  const inputClasses = [
    'nhsuk-input',
    hasError ? 'nhsuk-input--error' : '',
    classes
  ].filter(Boolean).join(' ');

  const formGroupClasses = [
    'nhsuk-form-group',
    hasError ? 'nhsuk-form-group--error' : '',
    formGroup?.classes
  ].filter(Boolean).join(' ');

  const renderLabel = () => {
    if (!label) return null;
    
    const labelSize = label.classes?.match(/nhsuk-label--([slmx]+)/)?.[1] as 's' | 'm' | 'l' | 'xl' | undefined;
    const labelClasses = [
      'nhsuk-label',
      label.classes
    ].filter(Boolean).join(' ');

    const LabelComponent = label.isPageHeading ? 'h1' : Label;
    
    if (label.isPageHeading) {
      return (
        <Label 
          as={LabelComponent}
          htmlFor={inputId}
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
        </Label>
      );
    }

    return (
      <Label 
        htmlFor={inputId}
        className={labelClasses}
        {...label.attributes}
      >
        {label.html ? (
          <span dangerouslySetInnerHTML={{ __html: label.html }} />
        ) : (
          label.text
        )}
      </Label>
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

  const renderInput = () => {
    const commonProps = {
      id: inputId,
      name,
      type,
      inputMode,
      value,
      'aria-describedby': ariaDescribedBy || undefined,
      autoComplete: autocomplete,
      pattern,
      spellCheck: spellcheck,
      className: inputClasses,
      $hasError: hasError,
      $width: width,
      $hasPrefix: !!prefix,
      $hasSuffix: !!suffix,
      ref,
      ...attributes,
      ...rest
    };

    if (hasWrapper) {
      return (
        <InputWrapper className={`nhsuk-input__wrapper${hasError ? ' nhsuk-input--error' : ''}`}>
          {prefix && (
            <InputPrefix className="nhsuk-input__prefix" aria-hidden="true">
              {prefix}
            </InputPrefix>
          )}
          <InputElement {...commonProps} />
          {suffix && (
            <InputSuffix className="nhsuk-input__suffix" aria-hidden="true">
              {suffix}
            </InputSuffix>
          )}
        </InputWrapper>
      );
    }

    return <StandaloneInput {...commonProps} />;
  };

  return (
    <FormGroup
      className={`${formGroupClasses}${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      $hasError={hasError}
      {...formGroup?.attributes}
    >
      {renderLabel()}
      {renderHint()}
      {renderErrorMessage()}
      {renderInput()}
    </FormGroup>
  );
});

Input.displayName = 'Input';