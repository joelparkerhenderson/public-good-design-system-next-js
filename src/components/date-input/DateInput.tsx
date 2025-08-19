'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface HintProps {
  /** Hint text */
  text?: string;
  /** Hint HTML (takes precedence over text) */
  html?: string;
  /** Additional hint classes */
  classes?: string;
  /** Hint attributes */
  attributes?: Record<string, string>;
}

export interface ErrorMessageProps {
  /** Error message text */
  text?: string;
  /** Error message HTML (takes precedence over text) */
  html?: string;
  /** Additional error message classes */
  classes?: string;
}

export interface FieldsetProps {
  /** Fieldset legend */
  legend?: {
    text?: string;
    html?: string;
    classes?: string;
    isPageHeading?: boolean;
  };
  /** Additional fieldset classes */
  classes?: string;
  /** Fieldset attributes */
  attributes?: Record<string, string>;
  /** Described by (for fieldset-level hints/errors) */
  describedBy?: string;
}

export interface FormGroupProps {
  /** Additional form group classes */
  classes?: string;
  /** Form group attributes */
  attributes?: Record<string, string>;
}

export interface DateInputItem {
  /** Input ID (auto-generated if not provided) */
  id?: string;
  /** Input name */
  name: string;
  /** Input label (defaults to capitalized name) */
  label?: string;
  /** Input mode */
  inputmode?: string;
  /** Initial value */
  value?: string;
  /** Autocomplete attribute */
  autocomplete?: string;
  /** Pattern attribute */
  pattern?: string;
  /** Additional input classes */
  classes?: string;
  /** Input attributes */
  attributes?: Record<string, string>;
}

export interface DateValues {
  day?: string;
  month?: string;
  year?: string;
}

export interface DateInputProps extends BaseComponentProps {
  /** Component ID */
  id: string;
  /** Name prefix for inputs */
  namePrefix?: string;
  /** Custom date input items */
  items?: DateInputItem[];
  /** Fieldset configuration */
  fieldset?: FieldsetProps;
  /** Hint */
  hint?: HintProps;
  /** Error message */
  errorMessage?: ErrorMessageProps;
  /** Form group configuration */
  formGroup?: FormGroupProps;
  /** Date values (used when items not specified) */
  values?: DateValues;
  /** Additional classes */
  classes?: string;
  /** Container attributes */
  attributes?: Record<string, string>;
  /** Change handlers */
  onChange?: (name: string, value: string) => void;
  onBlur?: (name: string, value: string) => void;
  onFocus?: (name: string, value: string) => void;
}

const DateInputWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const FormGroup = styled.div<{ $hasError?: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing[6]};

  ${({ $hasError, theme }) => $hasError && `
    border-left: 4px solid ${theme.colors.red};
    padding-left: ${theme.spacing[4]};
  `}
`;

const Fieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
  min-width: 0;
`;

const Legend = styled.legend<{ $isPageHeading?: boolean }>`
  display: block;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.black};
  white-space: normal;

  ${({ $isPageHeading, theme }) => $isPageHeading ? `
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: ${theme.typography.lineHeight.tight};
    margin-bottom: ${theme.spacing[4]};
  ` : `
    font-size: ${theme.typography.fontSize.lg};
    line-height: ${theme.typography.lineHeight.normal};
  `}
`;

const Hint = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.grey1};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const ErrorMessage = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.red};
  margin-bottom: ${({ theme }) => theme.spacing[3]};

  &::before {
    content: "Error: ";
  }
`;

const DateInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: 40.0625em) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const DateInputItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateInputLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.black};
`;

const DateInputField = styled.input<{ $hasError?: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]};
  border: 2px solid ${({ theme, $hasError }) => $hasError ? theme.colors.red : theme.colors.grey4};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 2px;
    border-color: ${({ theme }) => theme.colors.black};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey2};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grey5};
    border-color: ${({ theme }) => theme.colors.grey3};
    color: ${({ theme }) => theme.colors.grey2};
    cursor: not-allowed;
  }

  /* Width classes */
  &.width-2 {
    width: 5rem;
  }

  &.width-4 {
    width: 7rem;
  }

  @media (max-width: 40.0625em) {
    &.width-2,
    &.width-4 {
      width: 100%;
      max-width: 7rem;
    }
  }
`;

/**
 * DateInput Component
 * 
 * A compound date input component for collecting day, month, and year values.
 * Provides flexible configuration with proper accessibility, fieldset grouping,
 * and error handling. Supports custom layouts and autocomplete attributes.
 * Converted from NHS UK Design System date-input component.
 * 
 * @example
 * ```tsx
 * // Basic date of birth input
 * <DateInput
 *   id="dob"
 *   fieldset={{
 *     legend: { text: "What is your date of birth?" }
 *   }}
 *   hint={{ text: "For example, 31 3 1980" }}
 * />
 * 
 * // Custom layout (month and year only)
 * <DateInput
 *   id="start-date"
 *   fieldset={{
 *     legend: { text: "When did you start your job?" }
 *   }}
 *   hint={{ text: "For example, 11 2023" }}
 *   items={[
 *     { name: "month", classes: "width-2" },
 *     { name: "year", classes: "width-4" }
 *   ]}
 * />
 * 
 * // With pre-filled values and autocomplete
 * <DateInput
 *   id="birth-date"
 *   fieldset={{
 *     legend: { text: "Date of birth" }
 *   }}
 *   values={{ day: "15", month: "06", year: "1990" }}
 *   items={[
 *     { name: "day", classes: "width-2", autocomplete: "bday-day" },
 *     { name: "month", classes: "width-2", autocomplete: "bday-month" },
 *     { name: "year", classes: "width-4", autocomplete: "bday-year" }
 *   ]}
 * />
 * ```
 */
export const DateInput: React.FC<DateInputProps> = ({
  id,
  namePrefix,
  items,
  fieldset,
  hint,
  errorMessage,
  formGroup,
  values = {},
  classes,
  attributes,
  onChange,
  onBlur,
  onFocus,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  // Generate default items if not provided
  const dateInputItems = items || [
    {
      name: 'day',
      classes: 'width-2',
      value: values.day
    },
    {
      name: 'month',
      classes: 'width-2',
      value: values.month
    },
    {
      name: 'year',
      classes: 'width-4',
      value: values.year
    }
  ];

  // Generate IDs
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = errorMessage ? `${id}-error` : undefined;

  // Generate described by IDs
  const describedBy = [
    fieldset?.describedBy,
    hintId,
    errorId
  ].filter(Boolean).join(' ') || undefined;

  const hasError = !!errorMessage;

  const handleInputChange = (itemName: string, value: string) => {
    if (onChange) {
      onChange(itemName, value);
    }
  };

  const handleInputBlur = (itemName: string, value: string) => {
    if (onBlur) {
      onBlur(itemName, value);
    }
  };

  const handleInputFocus = (itemName: string, value: string) => {
    if (onFocus) {
      onFocus(itemName, value);
    }
  };

  const renderHint = () => {
    if (!hint) return null;

    const content = hint.html || hint.text;
    if (!content) return null;

    const hintClasses = hint.classes ? ` ${hint.classes}` : '';

    return (
      <Hint id={hintId} className={hintClasses} {...hint.attributes}>
        {hint.html ? (
          <span dangerouslySetInnerHTML={{ __html: hint.html }} />
        ) : (
          hint.text
        )}
      </Hint>
    );
  };

  const renderErrorMessage = () => {
    if (!errorMessage) return null;

    const content = errorMessage.html || errorMessage.text;
    if (!content) return null;

    const errorClasses = errorMessage.classes ? ` ${errorMessage.classes}` : '';

    return (
      <ErrorMessage id={errorId} className={errorClasses}>
        {errorMessage.html ? (
          <span dangerouslySetInnerHTML={{ __html: errorMessage.html }} />
        ) : (
          errorMessage.text
        )}
      </ErrorMessage>
    );
  };

  const renderDateInputItems = () => {
    return dateInputItems.map((item) => {
      const itemId = item.id || `${id}-${item.name}`;
      const itemName = namePrefix ? `${namePrefix}[${item.name}]` : item.name;
      const itemLabel = item.label || item.name.charAt(0).toUpperCase() + item.name.slice(1);
      const itemValue = item.value || values[item.name as keyof DateValues] || '';
      const inputmode = item.inputmode || 'numeric';
      
      // Check if this specific item has an error by looking for error class
      const itemHasError = hasError && item.classes?.includes('error');
      
      const inputClasses = [
        'date-input__input',
        item.classes
      ].filter(Boolean).join(' ');

      return (
        <DateInputItem key={itemId}>
          <DateInputLabel htmlFor={itemId} className="date-input__label">
            {itemLabel}
          </DateInputLabel>
          <DateInputField
            id={itemId}
            name={itemName}
            type="text"
            inputMode={inputmode as any}
            defaultValue={itemValue}
            autoComplete={item.autocomplete}
            pattern={item.pattern}
            className={inputClasses}
            $hasError={itemHasError}
            onChange={(e) => handleInputChange(item.name, e.target.value)}
            onBlur={(e) => handleInputBlur(item.name, e.target.value)}
            onFocus={(e) => handleInputFocus(item.name, e.target.value)}
            {...item.attributes}
          />
        </DateInputItem>
      );
    });
  };

  const renderDateInputContent = () => {
    return (
      <>
        {renderHint()}
        {renderErrorMessage()}
        <DateInputContainer
          className={`date-input${classes ? ` ${classes}` : ''}`}
          id={id}
          {...attributes}
        >
          {renderDateInputItems()}
        </DateInputContainer>
      </>
    );
  };

  const formGroupClasses = formGroup?.classes ? ` ${formGroup.classes}` : '';

  return (
    <DateInputWrapper
      className={className}
      data-testid={dataTestId}
      {...rest}
    >
      <FormGroup
        className={`form-group${hasError ? ' form-group--error' : ''}${formGroupClasses}`}
        $hasError={hasError}
        {...formGroup?.attributes}
      >
        {fieldset ? (
          <Fieldset
            className={fieldset.classes}
            role="group"
            aria-describedby={describedBy}
            {...fieldset.attributes}
          >
            {fieldset.legend && (
              <Legend
                $isPageHeading={fieldset.legend.isPageHeading}
                className={fieldset.legend.classes}
              >
                {fieldset.legend.html ? (
                  <span dangerouslySetInnerHTML={{ __html: fieldset.legend.html }} />
                ) : (
                  fieldset.legend.text
                )}
              </Legend>
            )}
            {renderDateInputContent()}
          </Fieldset>
        ) : (
          renderDateInputContent()
        )}
      </FormGroup>
    </DateInputWrapper>
  );
};

DateInput.displayName = 'DateInput';