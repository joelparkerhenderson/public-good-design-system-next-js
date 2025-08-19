'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface LabelProps {
  /** Label text */
  text?: string;
  /** Label HTML (takes precedence over text) */
  html?: string;
  /** Additional label classes */
  classes?: string;
  /** Label attributes */
  attributes?: Record<string, string>;
}

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

export interface CheckboxItem {
  /** Item value */
  value: string;
  /** Item text */
  text?: string;
  /** Item HTML (takes precedence over text) */
  html?: string;
  /** Item ID (auto-generated if not provided) */
  id?: string;
  /** Item name (defaults to parent name) */
  name?: string;
  /** Item label configuration */
  label?: LabelProps;
  /** Item hint */
  hint?: HintProps;
  /** Item checked state */
  checked?: boolean;
  /** Item disabled state */
  disabled?: boolean;
  /** Conditional reveal content */
  conditional?: {
    html: ReactNode;
  };
  /** Divider text (instead of checkbox) */
  divider?: string;
  /** Exclusive checkbox (uncheck others) */
  exclusive?: boolean;
  /** Exclusive group name */
  exclusiveGroup?: string;
  /** Item attributes */
  attributes?: Record<string, string>;
}

export interface CheckboxesProps extends BaseComponentProps {
  /** Fieldset configuration */
  fieldset?: FieldsetProps;
  /** Overall hint */
  hint?: HintProps;
  /** Error message */
  errorMessage?: ErrorMessageProps;
  /** Form group configuration */
  formGroup?: FormGroupProps;
  /** ID prefix for items */
  idPrefix?: string;
  /** Name attribute for all checkboxes */
  name: string;
  /** Checkbox items */
  items: CheckboxItem[];
  /** Pre-selected values */
  values?: string[];
  /** Additional classes */
  classes?: string;
  /** Described by IDs */
  describedBy?: string;
  /** Container attributes */
  attributes?: Record<string, string>;
  /** Change handler */
  onChange?: (selectedValues: string[]) => void;
}

const CheckboxesWrapper = styled.div`
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

const CheckboxesContainer = styled.div<{ $hasConditional?: boolean }>`
  ${({ $hasConditional }) => $hasConditional && `
    position: relative;
  `}
`;

const CheckboxItem = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const CheckboxInput = styled.input`
  position: absolute;
  z-index: 1;
  top: -2px;
  left: -2px;
  width: 44px;
  height: 44px;
  margin: 0;
  opacity: 0;
  cursor: pointer;

  &:focus + label {
    &::before {
      border-width: 4px;
      outline: 3px solid ${({ theme }) => theme.colors.yellow};
      outline-offset: 1px;
    }
  }

  &:checked + label {
    &::after {
      opacity: 1;
    }
  }

  &:disabled {
    cursor: not-allowed;
    
    + label {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const CheckboxLabel = styled.label`
  display: block;
  position: relative;
  min-height: 40px;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[1]} ${theme.spacing[1]} 50px`};
  margin-bottom: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  touch-action: manipulation;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border: 2px solid ${({ theme }) => theme.colors.black};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.white};
  }

  &::after {
    content: "";
    position: absolute;
    top: 11px;
    left: 9px;
    width: 18px;
    height: 7px;
    border: solid ${({ theme }) => theme.colors.black};
    border-width: 0 0 5px 5px;
    background: transparent;
    opacity: 0;
    transform: rotate(-45deg);
  }
`;

const CheckboxHint = styled.div`
  display: block;
  margin-top: ${({ theme }) => theme.spacing[1]};
  margin-left: 50px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.grey1};
`;

const ConditionalReveal = styled.div<{ $hidden?: boolean }>`
  margin-top: ${({ theme }) => theme.spacing[3]};
  margin-left: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-left: 4px solid ${({ theme }) => theme.colors.grey4};
  background-color: ${({ theme }) => theme.colors.grey5};

  ${({ $hidden }) => $hidden && `
    display: none;
  `}

  @media (min-width: ${({ theme }) => theme.media.lg}) {
    margin-left: 50px;
  }
`;

const Divider = styled.div`
  margin: ${({ theme }) => `${theme.spacing[2]} 0`};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.grey1};
  text-align: center;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.grey3};
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

/**
 * Checkboxes Component
 * 
 * A flexible checkbox group component with support for conditional reveals,
 * exclusive behavior, fieldsets, hints, and error states. Provides full
 * accessibility including proper ARIA attributes and keyboard navigation.
 * Converted from NHS UK Design System checkboxes component.
 * 
 * @example
 * ```tsx
 * // Basic checkbox group
 * <Checkboxes
 *   name="nationality"
 *   fieldset={{
 *     legend: { text: "What is your nationality?" }
 *   }}
 *   items={[
 *     { value: "british", text: "British" },
 *     { value: "irish", text: "Irish" },
 *     { value: "other", text: "Citizen of another country" }
 *   ]}
 * />
 * 
 * // With conditional reveals
 * <Checkboxes
 *   name="contact"
 *   fieldset={{
 *     legend: { text: "How would you prefer to be contacted?" }
 *   }}
 *   items={[
 *     {
 *       value: "email",
 *       text: "Email",
 *       conditional: {
 *         html: <Input name="email" label={{ text: "Email address" }} />
 *       }
 *     }
 *   ]}
 * />
 * 
 * // With exclusive "none" option
 * <Checkboxes
 *   name="preferences"
 *   items={[
 *     { value: "option1", text: "Option 1" },
 *     { divider: "or" },
 *     { value: "none", text: "None of the above", exclusive: true }
 *   ]}
 * />
 * ```
 */
export const Checkboxes: React.FC<CheckboxesProps> = ({
  fieldset,
  hint,
  errorMessage,
  formGroup,
  idPrefix,
  name,
  items,
  values = [],
  classes,
  describedBy,
  attributes,
  onChange,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(values);
  const checkboxRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  
  // Determine actual ID prefix
  const actualIdPrefix = idPrefix || name;
  
  // Generate IDs
  const hintId = hint ? `${actualIdPrefix}-hint` : undefined;
  const errorId = errorMessage ? `${actualIdPrefix}-error` : undefined;
  
  // Check if any items have conditional content
  const hasConditional = items.some(item => item.conditional && !item.divider);
  
  // Handle checkbox change
  const handleCheckboxChange = (itemValue: string, checked: boolean, item: CheckboxItem) => {
    let newValues = [...selectedValues];
    
    if (checked) {
      // Check the box
      if (!newValues.includes(itemValue)) {
        newValues.push(itemValue);
      }
      
      // Handle exclusive behavior
      if (item.exclusive) {
        // Uncheck all other items in the same group or with same name
        newValues = newValues.filter(value => {
          const otherItem = items.find(i => i.value === value);
          if (!otherItem || otherItem.value === itemValue) return true;
          
          // If exclusive group is specified, only uncheck items in the same group
          if (item.exclusiveGroup) {
            return otherItem.exclusiveGroup !== item.exclusiveGroup;
          }
          
          // Otherwise uncheck all items with the same name
          return false;
        });
        newValues = [itemValue]; // Only keep the exclusive item
      } else {
        // Uncheck any exclusive items in the same group
        const exclusiveItemsToUncheck = items.filter(i => 
          i.exclusive && 
          i.value !== itemValue &&
          (!item.exclusiveGroup || i.exclusiveGroup === item.exclusiveGroup)
        );
        
        exclusiveItemsToUncheck.forEach(exclusiveItem => {
          newValues = newValues.filter(v => v !== exclusiveItem.value);
        });
      }
    } else {
      // Uncheck the box
      newValues = newValues.filter(v => v !== itemValue);
    }
    
    setSelectedValues(newValues);
    
    if (onChange) {
      onChange(newValues);
    }
  };
  
  // Sync conditional reveals
  useEffect(() => {
    items.forEach((item, index) => {
      if (item.conditional && !item.divider) {
        const itemId = item.id || `${actualIdPrefix}${index > 0 ? `-${index + 1}` : ''}`;
        const conditionalId = `conditional-${itemId}`;
        const conditionalElement = document.getElementById(conditionalId);
        const isChecked = selectedValues.includes(item.value);
        
        if (conditionalElement) {
          conditionalElement.style.display = isChecked ? 'block' : 'none';
          conditionalElement.setAttribute('aria-hidden', isChecked ? 'false' : 'true');
        }
        
        // Update checkbox aria-expanded
        const checkbox = checkboxRefs.current[itemId];
        if (checkbox) {
          checkbox.setAttribute('aria-expanded', isChecked ? 'true' : 'false');
        }
      }
    });
  }, [selectedValues, items, actualIdPrefix]);
  
  // Generate described by IDs
  const fieldsetDescribedBy = [
    fieldset?.describedBy,
    describedBy,
    hintId,
    errorId
  ].filter(Boolean).join(' ') || undefined;
  
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
  
  const renderCheckboxItems = () => {
    return items.map((item, index) => {
      if (item.divider) {
        return (
          <Divider key={`divider-${index}`}>
            {item.divider}
          </Divider>
        );
      }
      
      const itemId = item.id || `${actualIdPrefix}${index > 0 ? `-${index + 1}` : ''}`;
      const itemName = item.name || name;
      const conditionalId = `conditional-${itemId}`;
      const hasHint = !!(item.hint?.text || item.hint?.html);
      const itemHintId = hasHint ? `${itemId}-item-hint` : undefined;
      const isChecked = selectedValues.includes(item.value);
      
      // Generate item described by
      const itemDescribedBy = itemHintId || undefined;
      
      return (
        <React.Fragment key={itemId}>
          <CheckboxItem>
            <CheckboxInput
              ref={(el) => { checkboxRefs.current[itemId] = el; }}
              id={itemId}
              name={itemName}
              type="checkbox"
              value={item.value}
              checked={isChecked}
              disabled={item.disabled}
              aria-describedby={itemDescribedBy}
              aria-controls={item.conditional ? conditionalId : undefined}
              aria-expanded={item.conditional ? (isChecked ? 'true' : 'false') : undefined}
              data-checkbox-exclusive={item.exclusive ? '' : undefined}
              data-checkbox-exclusive-group={item.exclusiveGroup}
              onChange={(e) => handleCheckboxChange(item.value, e.target.checked, item)}
              {...item.attributes}
            />
            <CheckboxLabel htmlFor={itemId} className={item.label?.classes}>
              {item.html ? (
                <span dangerouslySetInnerHTML={{ __html: item.html }} />
              ) : (
                item.text
              )}
            </CheckboxLabel>
            {hasHint && (
              <CheckboxHint id={itemHintId}>
                {item.hint?.html ? (
                  <span dangerouslySetInnerHTML={{ __html: item.hint.html }} />
                ) : (
                  item.hint?.text
                )}
              </CheckboxHint>
            )}
          </CheckboxItem>
          
          {item.conditional && (
            <ConditionalReveal
              id={conditionalId}
              $hidden={!isChecked}
              aria-hidden={!isChecked}
            >
              {item.conditional.html}
            </ConditionalReveal>
          )}
        </React.Fragment>
      );
    });
  };
  
  const renderCheckboxesContent = () => {
    return (
      <>
        {renderHint()}
        {renderErrorMessage()}
        <CheckboxesContainer
          className={`checkboxes${classes ? ` ${classes}` : ''}${hasConditional ? ' checkboxes--conditional' : ''}`}
          data-module="checkboxes"
          $hasConditional={hasConditional}
          {...attributes}
        >
          {renderCheckboxItems()}
        </CheckboxesContainer>
      </>
    );
  };
  
  const formGroupClasses = formGroup?.classes ? ` ${formGroup.classes}` : '';
  const hasError = !!errorMessage;
  
  return (
    <CheckboxesWrapper
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
            aria-describedby={fieldsetDescribedBy}
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
            {renderCheckboxesContent()}
          </Fieldset>
        ) : (
          renderCheckboxesContent()
        )}
      </FormGroup>
    </CheckboxesWrapper>
  );
};

Checkboxes.displayName = 'Checkboxes';