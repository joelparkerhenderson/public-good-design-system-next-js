'use client';

import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';
import { Label, LabelProps } from '../label';
import { Hint, HintProps } from '../hint';
import { ErrorMessage, ErrorMessageProps } from '../error-message';

export interface FormGroupProps {
  /** Additional CSS classes for the form group */
  classes?: string;
  /** Additional HTML attributes for the form group */
  attributes?: Record<string, string>;
}

export interface TextareaProps extends BaseComponentProps {
  /** The ID of the textarea. Defaults to the value of name */
  id?: string;
  /** The name of the textarea, which is submitted with the form data */
  name: string;
  /** Number of textarea rows (default is 5 rows) */
  rows?: number;
  /** Initial value of the textarea */
  value?: string;
  /** Default value for uncontrolled component */
  defaultValue?: string;
  /** One or more element IDs to add to the aria-describedby attribute */
  describedBy?: string;
  /** Options for the label component */
  label: LabelProps;
  /** Options for the hint component */
  hint?: HintProps;
  /** Options for the error message component */
  errorMessage?: ErrorMessageProps;
  /** Additional options for the form group containing the textarea */
  formGroup?: FormGroupProps;
  /** Autocomplete attribute to identify input purpose */
  autocomplete?: string;
  /** Additional HTML attributes for the textarea */
  attributes?: Record<string, string>;
  /** Change handler for controlled component */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Blur handler */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** Focus handler */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Whether the textarea is readonly */
  readOnly?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Maximum length of input */
  maxLength?: number;
}

const FormGroup = styled.div<{ $hasError: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  ${({ $hasError }) => $hasError && `
    padding-left: 15px;
    border-left: 4px solid #d5281b;
  `}
`;

const StyledTextarea = styled.textarea<{ $hasError: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]};
  border: 2px solid ${({ theme }) => theme.colors.text};
  border-radius: 0;
  appearance: none;
  
  ${({ $hasError, theme }) => $hasError && `
    border-color: ${theme.colors.red};
  `}
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 0;
    box-shadow: inset 0 0 0 2px;
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.grey5};
    border-color: ${({ theme }) => theme.colors.grey3};
    color: ${({ theme }) => theme.colors.grey2};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.grey2};
    opacity: 1;
  }
  
  /* Remove default resize handle on some browsers */
  resize: vertical;
`;

/**
 * Textarea Component
 * 
 * A multi-line text input component for longer text content. Includes support 
 * for labels, hints, error messages, and form validation. Perfect for comments, 
 * descriptions, medical notes, and other longer text entries.
 * 
 * @example
 * ```tsx
 * // Basic textarea
 * <Textarea 
 *   name="comments"
 *   label={{ text: "Additional comments" }}
 * />
 * 
 * // Textarea with hint and validation
 * <Textarea 
 *   name="symptoms"
 *   label={{ text: "Describe your symptoms" }}
 *   hint={{ text: "Please provide as much detail as possible" }}
 *   rows={6}
 *   required
 * />
 * 
 * // Textarea with error state
 * <Textarea 
 *   name="notes"
 *   label={{ text: "Medical notes" }}
 *   errorMessage={{ text: "This field is required" }}
 *   value={value}
 *   onChange={handleChange}
 * />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  id,
  name,
  rows = 5,
  value,
  defaultValue,
  describedBy,
  label,
  hint,
  errorMessage,
  formGroup,
  autocomplete,
  attributes,
  onChange,
  onBlur,
  onFocus,
  disabled,
  readOnly,
  placeholder,
  required,
  maxLength,
  className,
  'data-testid': dataTestId,
  ...rest
}, ref) => {
  const textareaId = id || name;
  const hasError = !!errorMessage;
  
  // Build aria-describedby
  const ariaDescribedBy = [
    describedBy,
    hint ? `${textareaId}-hint` : null,
    errorMessage ? `${textareaId}-error` : null
  ].filter(Boolean).join(' ') || undefined;

  return (
    <FormGroup
      className={`nhsuk-form-group${hasError ? ' nhsuk-form-group--error' : ''}${formGroup?.classes ? ` ${formGroup.classes}` : ''}`}
      $hasError={hasError}
      {...formGroup?.attributes}
    >
      <Label
        htmlFor={textareaId}
        {...label}
      />
      
      {hint && (
        <Hint
          id={`${textareaId}-hint`}
          {...hint}
        />
      )}
      
      {errorMessage && (
        <ErrorMessage
          id={`${textareaId}-error`}
          {...errorMessage}
        />
      )}
      
      <StyledTextarea
        ref={ref}
        id={textareaId}
        name={name}
        rows={rows}
        className={`nhsuk-textarea${hasError ? ' nhsuk-textarea--error' : ''}${className ? ` ${className}` : ''}`}
        value={value}
        defaultValue={defaultValue}
        aria-describedby={ariaDescribedBy}
        autoComplete={autocomplete}
        onChange={onChange}
        $hasError={hasError}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        data-testid={dataTestId}
        {...attributes}
        {...rest}
      />
    </FormGroup>
  );
});

Textarea.displayName = 'Textarea';