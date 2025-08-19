'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface RadioItem {
  /** Text content for the radio label */
  text?: string;
  /** HTML content for the radio label (takes precedence over text) */
  html?: string;
  /** Unique ID for this radio item */
  id?: string;
  /** Value for the radio input */
  value: string;
  /** Whether this radio is checked */
  checked?: boolean;
  /** Whether this radio is disabled */
  disabled?: boolean;
  /** Hint text for this radio item */
  hint?: {
    text?: string;
    html?: string;
    classes?: string;
    attributes?: Record<string, string>;
  };
  /** Label configuration for this radio item */
  label?: {
    classes?: string;
    attributes?: Record<string, string>;
  };
  /** Divider text (creates a separator instead of a radio) */
  divider?: string;
  /** Conditional content to show when this radio is selected */
  conditional?: {
    html?: string;
    children?: ReactNode;
  };
  /** Additional attributes for this radio input */
  attributes?: Record<string, string>;
}

export interface FieldsetProps {
  /** Legend configuration */
  legend?: {
    text?: string;
    html?: string;
    classes?: string;
    isPageHeading?: boolean;
    attributes?: Record<string, string>;
  };
  /** Element IDs for aria-describedby */
  describedBy?: string;
  /** Additional classes for the fieldset */
  classes?: string;
  /** Additional attributes for the fieldset */
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

export interface RadiosProps extends BaseComponentProps {
  /** Name attribute for all radio inputs */
  name: string;
  /** Array of radio items */
  items: RadioItem[];
  /** Current selected value */
  value?: string;
  /** String to prefix id for each radio item */
  idPrefix?: string;
  /** Fieldset configuration */
  fieldset?: FieldsetProps;
  /** Hint configuration */
  hint?: HintProps;
  /** Error message configuration */
  errorMessage?: ErrorMessageProps;
  /** Form group configuration */
  formGroup?: FormGroupProps;
  /** Additional CSS classes for the radios container */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
  /** Callback when radio selection changes */
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

const FieldsetElement = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
  min-width: 0;
`;

const LegendElement = styled.legend<{ $isPageHeading?: boolean; $size?: string }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding: 0;
  width: 100%;
  
  ${({ $isPageHeading, $size, theme }) => {
    if ($isPageHeading) {
      const size = $size || 'xl';
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
        font-size: ${sizeMap[size as keyof typeof sizeMap]?.fontSize || sizeMap.xl.fontSize};
        line-height: ${sizeMap[size as keyof typeof sizeMap]?.lineHeight || sizeMap.xl.lineHeight};
        font-weight: ${theme.typography.fontWeight.bold};
      `;
    }
    return `
      font-size: ${theme.typography.fontSize.lg};
      line-height: ${theme.typography.lineHeight.tight};
    `;
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

const RadiosContainer = styled.div<{ $inline?: boolean; $hasConditional?: boolean }>`
  ${({ $inline, theme }) => $inline && `
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing[4]};
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: ${theme.spacing[3]};
    }
  `}
`;

const RadioItem = styled.div`
  display: flex;
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const RadioInput = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  margin: 0;
  cursor: pointer;
  flex-shrink: 0;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

const RadioLabel = styled.label<{ $disabled?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
  flex: 1;
  
  ${({ $disabled, theme }) => $disabled && `
    cursor: not-allowed;
    color: ${theme.colors.textMuted};
  `}
  
  /* Support for HTML content */
  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
  
  em {
    font-style: italic;
  }
`;

const RadioHint = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.secondary};
  margin-left: ${({ theme }) => `calc(1.25rem + ${theme.spacing[3]})`};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const RadioDivider = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  margin: ${({ theme }) => theme.spacing[4]} 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border};
    z-index: 1;
  }
  
  span {
    background-color: ${({ theme }) => theme.colors.background};
    padding: 0 ${({ theme }) => theme.spacing[3]};
    position: relative;
    z-index: 2;
  }
`;

const ConditionalContent = styled.div<{ $hidden?: boolean }>`
  margin-left: ${({ theme }) => `calc(1.25rem + ${theme.spacing[3]})`};
  margin-top: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-left: 4px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.backgroundMuted};
  
  ${({ $hidden }) => $hidden && `
    display: none;
  `}
`;

/**
 * Radios Component
 * 
 * A radio button group component with support for fieldsets, hints, error messages,
 * inline layout, dividers, conditional content, and comprehensive accessibility features.
 * Converted from NHS UK Design System radios component.
 * 
 * @example
 * ```tsx
 * // Basic radio group
 * <Radios 
 *   name="changed-name"
 *   fieldset={{
 *     legend: { text: "Have you changed your name?" }
 *   }}
 *   items={[
 *     { value: "yes", text: "Yes" },
 *     { value: "no", text: "No" }
 *   ]}
 * />
 * 
 * // Radio group with hint and error
 * <Radios 
 *   name="contact-preference"
 *   fieldset={{
 *     legend: { text: "How would you prefer to be contacted?" }
 *   }}
 *   hint={{ text: "Select one option" }}
 *   errorMessage={{ text: "Select how you prefer to be contacted" }}
 *   items={[
 *     { value: "email", text: "Email" },
 *     { value: "phone", text: "Phone" },
 *     { value: "post", text: "Post" }
 *   ]}
 * />
 * ```
 */
export const Radios: React.FC<RadiosProps> = ({
  name,
  items,
  value: controlledValue,
  idPrefix,
  fieldset,
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
    setSelectedValue(controlledValue);
  }, [controlledValue]);

  const actualIdPrefix = idPrefix || name;
  const hasError = !!errorMessage;
  const isInline = classes?.includes('nhsuk-radios--inline');
  const hasConditional = items.some(item => item.conditional?.html || item.conditional?.children);

  // Build describedBy string
  let ariaDescribedBy = fieldset?.describedBy || '';
  const hintId = hint ? `${actualIdPrefix}-hint` : '';
  const errorId = errorMessage ? `${actualIdPrefix}-error` : '';
  
  if (hintId) {
    ariaDescribedBy = ariaDescribedBy ? `${ariaDescribedBy} ${hintId}` : hintId;
  }
  if (errorId) {
    ariaDescribedBy = ariaDescribedBy ? `${ariaDescribedBy} ${errorId}` : errorId;
  }

  const handleChange = (itemValue: string, isDisabled?: boolean) => {
    if (isDisabled) return;
    setSelectedValue(itemValue);
    onChange?.(itemValue);
  };

  const renderLegend = () => {
    if (!fieldset?.legend) return null;
    
    const legendSize = fieldset.legend.classes?.match(/nhsuk-fieldset__legend--(s|m|l|xl)/)?.[1];
    const legendClasses = [
      'nhsuk-fieldset__legend',
      fieldset.legend.classes
    ].filter(Boolean).join(' ');

    return (
      <LegendElement
        className={legendClasses}
        $isPageHeading={fieldset.legend.isPageHeading}
        $size={legendSize}
        {...fieldset.legend.attributes}
      >
        {fieldset.legend.html ? (
          <span dangerouslySetInnerHTML={{ __html: fieldset.legend.html }} />
        ) : (
          fieldset.legend.text
        )}
      </LegendElement>
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

  const renderRadioItem = (item: RadioItem, index: number) => {
    if (item.divider) {
      return (
        <RadioDivider key={`divider-${index}`} className="nhsuk-radios__divider">
          <span>{item.divider}</span>
        </RadioDivider>
      );
    }

    const itemId = item.id || `${actualIdPrefix}${index > 0 ? `-${index + 1}` : ''}`;
    const isChecked = !item.disabled && (selectedValue === item.value || item.checked);
    const hasItemHint = !!(item.hint?.text || item.hint?.html);
    const itemHintId = hasItemHint ? `${itemId}-item-hint` : '';
    const conditionalId = `conditional-${itemId}`;

    const itemAriaDescribedBy = hasItemHint ? itemHintId : undefined;

    return (
      <React.Fragment key={itemId}>
        <RadioItem className="nhsuk-radios__item">
          <RadioInput
            className="nhsuk-radios__input"
            id={itemId}
            name={name}
            type="radio"
            value={item.value}
            checked={isChecked}
            disabled={item.disabled}
            aria-describedby={itemAriaDescribedBy}
            aria-controls={item.conditional ? conditionalId : undefined}
            aria-expanded={item.conditional ? (isChecked ? 'true' : 'false') : undefined}
            onChange={() => handleChange(item.value, item.disabled)}
            {...item.attributes}
          />
          <RadioLabel
            htmlFor={itemId}
            className={`nhsuk-radios__label ${item.label?.classes || ''}`.trim()}
            $disabled={item.disabled}
            {...item.label?.attributes}
          >
            {item.html ? (
              <span dangerouslySetInnerHTML={{ __html: item.html }} />
            ) : (
              item.text
            )}
          </RadioLabel>
          {hasItemHint && (
            <RadioHint
              id={itemHintId}
              className={`nhsuk-radios__hint ${item.hint?.classes || ''}`.trim()}
              {...item.hint?.attributes}
            >
              {item.hint?.html ? (
                <span dangerouslySetInnerHTML={{ __html: item.hint.html }} />
              ) : (
                item.hint?.text
              )}
            </RadioHint>
          )}
        </RadioItem>
        {item.conditional && (
          <ConditionalContent
            id={conditionalId}
            className={`nhsuk-radios__conditional${!isChecked ? ' nhsuk-radios__conditional--hidden' : ''}`}
            $hidden={!isChecked}
          >
            {item.conditional.children || (
              item.conditional.html && (
                <div dangerouslySetInnerHTML={{ __html: item.conditional.html }} />
              )
            )}
          </ConditionalContent>
        )}
      </React.Fragment>
    );
  };

  const radiosClasses = [
    'nhsuk-radios',
    hasConditional ? 'nhsuk-radios--conditional' : '',
    classes
  ].filter(Boolean).join(' ');

  const formGroupClasses = [
    'nhsuk-form-group',
    hasError ? 'nhsuk-form-group--error' : '',
    formGroup?.classes
  ].filter(Boolean).join(' ');

  const radiosContent = (
    <>
      {renderHint()}
      {renderErrorMessage()}
      <RadiosContainer
        className={radiosClasses}
        $inline={isInline}
        $hasConditional={hasConditional}
        data-module="nhsuk-radios"
        {...attributes}
      >
        {items.map(renderRadioItem)}
      </RadiosContainer>
    </>
  );

  return (
    <FormGroup
      className={`${formGroupClasses}${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      $hasError={hasError}
      {...formGroup?.attributes}
      {...rest}
    >
      {fieldset ? (
        <FieldsetElement
          className={`nhsuk-fieldset ${fieldset.classes || ''}`.trim()}
          aria-describedby={ariaDescribedBy || undefined}
          {...fieldset.attributes}
        >
          {renderLegend()}
          {radiosContent}
        </FieldsetElement>
      ) : (
        radiosContent
      )}
    </FormGroup>
  );
};

Radios.displayName = 'Radios';