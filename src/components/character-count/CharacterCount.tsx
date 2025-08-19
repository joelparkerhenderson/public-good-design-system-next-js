'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface LabelProps {
  /** Label text */
  text?: string;
  /** Label HTML (takes precedence over text) */
  html?: string;
  /** Additional label classes */
  classes?: string;
  /** Whether label is a page heading */
  isPageHeading?: boolean;
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
}

export interface ErrorMessageProps {
  /** Error message text */
  text?: string;
  /** Error message HTML (takes precedence over text) */
  html?: string;
  /** Additional error message classes */
  classes?: string;
}

export interface FormGroupProps {
  /** Additional form group classes */
  classes?: string;
  /** Form group attributes */
  attributes?: Record<string, string>;
}

export interface CountMessageProps {
  /** Additional count message classes */
  classes?: string;
}

export interface CharacterCountProps extends BaseComponentProps {
  /** Input name */
  name: string;
  /** Input ID (defaults to name if not provided) */
  id?: string;
  /** Number of textarea rows */
  rows?: number;
  /** Initial value */
  value?: string;
  /** Label configuration */
  label: LabelProps;
  /** Hint configuration */
  hint?: HintProps;
  /** Error message configuration */
  errorMessage?: ErrorMessageProps;
  /** Form group configuration */
  formGroup?: FormGroupProps;
  /** Maximum number of characters */
  maxlength?: number;
  /** Maximum number of words */
  maxwords?: number;
  /** Threshold percentage to show counter */
  threshold?: number;
  /** Enable/disable spellcheck */
  spellcheck?: boolean;
  /** Count message configuration */
  countMessage?: CountMessageProps;
  /** Additional textarea classes */
  classes?: string;
  /** Textarea attributes */
  attributes?: Record<string, string>;
  /** Change handler */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Blur handler */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** Focus handler */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const CharacterCountWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};

  .form-group,
  .textarea {
    margin-bottom: ${({ theme }) => theme.spacing[1]};
  }
`;

const FormGroup = styled.div<{ $hasError?: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing[6]};

  ${({ $hasError, theme }) => $hasError && `
    border-left: 4px solid ${theme.colors.red};
    padding-left: ${theme.spacing[4]};
  `}
`;

const Label = styled.label<{ $isPageHeading?: boolean }>`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.black};

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

const Textarea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]};
  border: 2px solid ${({ theme, $hasError }) => $hasError ? theme.colors.red : theme.colors.grey4};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  resize: vertical;

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
`;

const CountMessage = styled.div<{ $disabled?: boolean; $isError?: boolean }>`
  margin-top: ${({ theme }) => theme.spacing[1]};
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};

  ${({ $disabled }) => $disabled && `
    visibility: hidden;
  `}

  ${({ $isError, theme }) => $isError ? `
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.red};
  ` : `
    color: ${theme.colors.grey1};
  `}
`;

const ScreenReaderOnly = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

/**
 * Character Count Component
 * 
 * A textarea component with real-time character or word counting functionality.
 * Provides accessibility features including screen reader announcements and 
 * visual feedback when limits are approached or exceeded.
 * Converted from NHS UK Design System character-count component.
 * 
 * @example
 * ```tsx
 * // Basic character count
 * <CharacterCount
 *   name="feedback"
 *   label={{ text: "Can you provide more detail?" }}
 *   maxlength={100}
 * />
 * 
 * // Word count with hint
 * <CharacterCount
 *   name="description"
 *   label={{ text: "Job description" }}
 *   hint={{ text: "Do not include personal information" }}
 *   maxwords={50}
 * />
 * 
 * // With threshold and error
 * <CharacterCount
 *   name="comments"
 *   label={{ text: "Additional comments" }}
 *   maxlength={200}
 *   threshold={75}
 *   errorMessage={{ text: "Comments are required" }}
 * />
 * ```
 */
export const CharacterCount: React.FC<CharacterCountProps> = ({
  name,
  id,
  rows = 5,
  value: initialValue = '',
  label,
  hint,
  errorMessage,
  formGroup,
  maxlength,
  maxwords,
  threshold = 0,
  spellcheck,
  countMessage,
  classes,
  attributes,
  onChange,
  onBlur,
  onFocus,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const screenReaderRef = useRef<HTMLDivElement>(null);
  const lastInputTimestamp = useRef<number | null>(null);
  const valueChecker = useRef<number | null>(null);
  const lastInputValue = useRef('');

  const [currentValue, setCurrentValue] = useState(initialValue);
  const [isOverThreshold, setIsOverThreshold] = useState(false);

  // Determine the actual ID to use
  const actualId = id || name;
  const hintId = hint ? `${actualId}-hint` : undefined;
  const errorId = errorMessage ? `${actualId}-error` : undefined;
  const countId = `${actualId}-info`;

  // Determine the limit (words take precedence over characters)
  const maxLimit = maxwords ?? maxlength ?? Infinity;
  const isWordCount = !!maxwords;

  /**
   * Count characters or words in text
   */
  const count = useCallback((text: string): number => {
    if (isWordCount) {
      // Match consecutive non-whitespace characters
      const tokens = text.match(/\S+/g) || [];
      return tokens.length;
    }
    return text.length;
  }, [isWordCount]);

  /**
   * Check if current count is over threshold
   */
  const checkOverThreshold = useCallback((text: string): boolean => {
    if (threshold === 0) return true; // Always show when no threshold set
    const currentLength = count(text);
    const thresholdValue = (maxLimit * threshold) / 100;
    return thresholdValue <= currentLength;
  }, [count, maxLimit, threshold]);

  /**
   * Format the count message
   */
  const formatCountMessage = useCallback((text: string): string => {
    const currentCount = count(text);
    const remainingCount = maxLimit - currentCount;
    
    const noun = isWordCount ? 'word' : 'character';
    const pluralNoun = Math.abs(remainingCount) === 1 ? noun : `${noun}s`;
    
    if (remainingCount < 0) {
      const overCount = Math.abs(remainingCount);
      return `You have ${overCount} ${pluralNoun} too many`;
    }
    
    return `You have ${remainingCount} ${pluralNoun} remaining`;
  }, [count, maxLimit, isWordCount]);

  /**
   * Update count messages and states
   */
  const updateCountMessages = useCallback((text: string) => {
    const overThreshold = checkOverThreshold(text);
    const remainingCount = maxLimit - count(text);
    const isError = remainingCount < 0;
    
    setIsOverThreshold(overThreshold);
    
    // Update screen reader message
    if (screenReaderRef.current) {
      if (overThreshold) {
        screenReaderRef.current.removeAttribute('aria-hidden');
      } else {
        screenReaderRef.current.setAttribute('aria-hidden', 'true');
      }
      screenReaderRef.current.textContent = formatCountMessage(text);
    }
  }, [checkOverThreshold, count, maxLimit, formatCountMessage]);

  /**
   * Check if value changed (for speech recognition software)
   */
  const checkIfValueChanged = useCallback(() => {
    if (textareaRef.current && textareaRef.current.value !== lastInputValue.current) {
      lastInputValue.current = textareaRef.current.value;
      setCurrentValue(textareaRef.current.value);
      updateCountMessages(textareaRef.current.value);
    }
  }, [updateCountMessages]);

  /**
   * Handle input changes
   */
  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('handleChange called with:', event.target.value);
    const newValue = event.target.value;
    setCurrentValue(newValue);
    lastInputTimestamp.current = Date.now();
    
    // Update count messages immediately
    updateCountMessages(newValue);
    
    if (onChange) {
      onChange(event);
    }
  }, [onChange, updateCountMessages]);

  /**
   * Handle focus events
   */
  const handleFocus = useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
    console.log('handleFocus called');
    // Start checking for value changes (for speech recognition)
    valueChecker.current = window.setInterval(() => {
      if (
        !lastInputTimestamp.current ||
        Date.now() - 500 >= lastInputTimestamp.current
      ) {
        checkIfValueChanged();
      }
    }, 1000);

    if (onFocus) {
      onFocus(event);
    }
  }, [onFocus, checkIfValueChanged]);

  /**
   * Handle blur events
   */
  const handleBlur = useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
    console.log('handleBlur called');
    // Stop checking for value changes
    if (valueChecker.current) {
      window.clearInterval(valueChecker.current);
      valueChecker.current = null;
    }

    if (onBlur) {
      onBlur(event);
    }
  }, [onBlur]);

  // Initialize count messages on mount
  useEffect(() => {
    updateCountMessages(currentValue);
  }, [updateCountMessages]); // Only depend on updateCountMessages, not currentValue

  // Handle page restoration
  useEffect(() => {
    const handlePageShow = () => {
      if (textareaRef.current) {
        setCurrentValue(textareaRef.current.value);
        updateCountMessages(textareaRef.current.value);
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [updateCountMessages]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (valueChecker.current) {
        window.clearInterval(valueChecker.current);
      }
    };
  }, []);

  const remainingCount = maxLimit - count(currentValue);
  const isError = remainingCount < 0;
  const hasError = !!errorMessage || isError;

  // Generate describedBy IDs
  const describedByIds = [
    hintId,
    errorId,
    countId
  ].filter(Boolean).join(' ');

  const renderLabel = () => {
    const content = label.html || label.text;
    if (!content) return null;

    const labelClasses = label.classes ? ` ${label.classes}` : '';

    if (label.isPageHeading) {
      return (
        <Label
          as="h1"
          htmlFor={actualId}
          $isPageHeading
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
    }

    return (
      <Label
        htmlFor={actualId}
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

    const content = hint.html || hint.text;
    if (!content) return null;

    const hintClasses = hint.classes ? ` ${hint.classes}` : '';

    return (
      <Hint id={hintId} className={hintClasses}>
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

  const textareaClasses = [
    'character-count-textarea',
    classes
  ].filter(Boolean).join(' ');

  const formGroupClasses = formGroup?.classes ? ` ${formGroup.classes}` : '';
  const countMessageClasses = countMessage?.classes ? ` ${countMessage.classes}` : '';

  return (
    <CharacterCountWrapper
      className={className}
      data-testid={dataTestId}
      data-module="character-count"
      data-maxlength={maxlength}
      data-maxwords={maxwords}
      data-threshold={threshold}
      {...rest}
    >
      <FormGroup 
        className={formGroupClasses}
        $hasError={hasError}
        {...formGroup?.attributes}
      >
        {renderLabel()}
        {renderHint()}
        {renderErrorMessage()}

        <textarea
          ref={textareaRef}
          id={actualId}
          name={name}
          rows={rows}
          defaultValue={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* Fallback count message (hidden when JS is enabled) */}
        <CountMessage 
          id={countId}
          className={`character-count-message ${countMessageClasses}`.trim()}
          style={{ display: 'none' }}
        >
          You can enter up to {maxLimit} {isWordCount ? 'words' : 'characters'}
        </CountMessage>

        {/* Screen reader live region */}
        <ScreenReaderOnly
          ref={screenReaderRef}
          aria-live="polite"
          aria-hidden={!isOverThreshold ? 'true' : undefined}
        >
          {formatCountMessage(currentValue)}
        </ScreenReaderOnly>

        {/* Visible count message */}
        <CountMessage
          className={`character-count-status ${countMessageClasses}`.trim()}
          $disabled={!isOverThreshold}
          $isError={isError}
          aria-hidden="true"
        >
          {formatCountMessage(currentValue)}
        </CountMessage>
      </FormGroup>
    </CharacterCountWrapper>
  );
};

CharacterCount.displayName = 'CharacterCount';