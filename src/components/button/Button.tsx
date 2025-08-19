'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export type ButtonVariant = 'primary' | 'secondary' | 'secondary-solid' | 'reverse' | 'warning' | 'login';
export type ButtonElement = 'button' | 'input' | 'a';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps extends BaseComponentProps {
  /** Text content for the button */
  text?: string;
  /** HTML content (takes precedence over text) */
  html?: string;
  /** Button variant style */
  variant?: ButtonVariant;
  /** HTML element type to render */
  element?: ButtonElement;
  /** Button type for button/input elements */
  type?: ButtonType;
  /** Name attribute for button/input elements */
  name?: string;
  /** Value attribute for button elements */
  value?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** URL for anchor element */
  href?: string;
  /** Prevent accidental double clicks on submit buttons */
  preventDoubleClick?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLInputElement>) => void;
}

// Button styling constants (converted from SCSS variables)
const BUTTON_BORDER_RADIUS = 4; // $button-border-radius: $nhsuk-border-width-form-element * 2
const BUTTON_SHADOW_SIZE = 4; // $button-shadow-size: $button-border-radius
const BUTTON_PADDING_TOP_BOTTOM_MOBILE = 8;
const BUTTON_PADDING_TOP_BOTTOM_DESKTOP = 12;
const BUTTON_PADDING_LEFT_RIGHT = 16;

const getVariantStyles = (variant: ButtonVariant, theme: any) => {
  switch (variant) {
    case 'secondary':
      return `
        background-color: transparent;
        color: ${theme.colors.primary};
        box-shadow: 0 ${BUTTON_SHADOW_SIZE}px 0 ${theme.colors.primary};
        
        &:not(:focus):not(:active)::before {
          border-color: ${theme.colors.primary};
        }
        
        &:hover {
          background-color: rgba(${theme.colors.primaryRgb}, 0.15);
        }
        
        &:active,
        &:active:focus {
          background-color: rgba(${theme.colors.primaryRgb}, 0.22);
          border-color: ${theme.colors.primary};
          border-radius: ${BUTTON_BORDER_RADIUS}px;
        }
        
        &,
        &::after {
          box-shadow: 0 ${BUTTON_SHADOW_SIZE}px 0 ${theme.colors.primary};
        }
        
        &:not(:focus)::after {
          left: 0;
          right: 0;
          border-radius: ${BUTTON_BORDER_RADIUS / 2}px;
        }
        
        &:focus::after,
        &:active::after {
          box-shadow: none;
        }
      `;
    
    case 'secondary-solid':
      return `
        background-color: ${theme.colors.white};
        color: ${theme.colors.primary};
        box-shadow: 0 ${BUTTON_SHADOW_SIZE}px 0 ${theme.colors.primary};
        
        &:not(:focus):not(:active)::before {
          border-color: ${theme.colors.primary};
        }
        
        &:hover {
          background-color: rgba(${theme.colors.primaryRgb}, 0.15);
        }
        
        &:active,
        &:active:focus {
          background-color: rgba(${theme.colors.primaryRgb}, 0.22);
          border-color: ${theme.colors.primary};
          border-radius: ${BUTTON_BORDER_RADIUS}px;
        }
        
        &,
        &::after {
          box-shadow: 0 ${BUTTON_SHADOW_SIZE}px 0 ${theme.colors.primary};
        }
        
        &:not(:focus)::after {
          left: 0;
          right: 0;
          border-radius: ${BUTTON_BORDER_RADIUS / 2}px;
        }
        
        &:focus::after,
        &:active::after {
          box-shadow: none;
        }
      `;
      
    case 'reverse':
      return `
        background-color: ${theme.colors.white};
        color: ${theme.colors.black};
        box-shadow: 0 ${BUTTON_SHADOW_SIZE}px 0 #b8b8b8;
        
        &:hover {
          background-color: #d9d9d9;
        }
        
        &:active,
        &:active:focus {
          background-color: #b3b3b3;
        }
      `;
      
    case 'warning':
      return `
        background-color: ${theme.colors.red};
        color: ${theme.colors.white};
        box-shadow: 0 ${BUTTON_SHADOW_SIZE}px 0 #942515;
        
        &:hover {
          background-color: #c9302c;
        }
        
        &:active,
        &:active:focus {
          background-color: #942515;
        }
      `;
      
    case 'login':
      return `
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
        box-shadow: 0 ${BUTTON_SHADOW_SIZE}px 0 #003d82;
        
        &:hover {
          background-color: #004ba0;
        }
        
        &:active,
        &:active:focus {
          background-color: #003d82;
        }
      `;
      
    default: // primary
      return `
        background-color: ${theme.colors.green};
        color: ${theme.colors.white};
        box-shadow: 0 ${BUTTON_SHADOW_SIZE}px 0 #0d5257;
        
        &:hover {
          background-color: #006a75;
        }
        
        &:active,
        &:active:focus {
          background-color: #0d5257;
        }
      `;
  }
};

const BaseButton = styled.button<{ $variant: ButtonVariant; $preventDoubleClick?: boolean }>`
  -webkit-appearance: none;
  border: 2px solid transparent;
  border-radius: ${BUTTON_BORDER_RADIUS}px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  overflow: visible;
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing[5] + BUTTON_SHADOW_SIZE}px;
  padding: ${BUTTON_PADDING_TOP_BOTTOM_MOBILE}px ${BUTTON_PADDING_LEFT_RIGHT}px;
  position: relative;
  text-align: center;
  vertical-align: top;
  width: 100%;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  text-decoration: none;

  ${({ theme }) => theme.media.md} {
    width: auto;
    padding: ${BUTTON_PADDING_TOP_BOTTOM_DESKTOP}px ${BUTTON_PADDING_LEFT_RIGHT}px;
  }

  // Ensure that any global link styles are overridden
  &,
  &:hover,
  &:active {
    text-decoration: none;
  }

  // Fix unwanted button padding in Firefox
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  // Reset focus styles added to buttons as links
  &:focus {
    box-shadow: none;
    outline: none;
  }

  // Add button focus styles ensuring the active "pressed" state has priority
  &:focus:not(:active),
  &:focus:not(:active):hover {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
    box-shadow: 0 ${BUTTON_SHADOW_SIZE}px 0 ${({ theme }) => theme.colors.black};
  }

  // Remove button shadow when pressed
  &:active,
  &:active:focus {
    box-shadow: none;
    top: ${BUTTON_SHADOW_SIZE}px;
  }

  // Default pseudo element styles for click target expansion and shadow
  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    border-radius: ${BUTTON_BORDER_RADIUS}px;
  }

  // Use a pseudo element to expand the click target area to include the button's shadow
  &::before {
    bottom: -${2 + BUTTON_SHADOW_SIZE}px;
    border: 2px solid transparent;
    background-color: transparent;
  }

  // When the button is active it is shifted down by BUTTON_SHADOW_SIZE
  // This corrects the click target area
  &:active::before {
    top: -${2 + BUTTON_SHADOW_SIZE}px;
    bottom: -2px;
  }

  // Apply variant-specific styles
  ${({ $variant, theme }) => getVariantStyles($variant, theme)}

  // Disabled state
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  // Double click prevention styles
  ${({ $preventDoubleClick }) => $preventDoubleClick && `
    &[data-double-click-prevented] {
      pointer-events: none;
      opacity: 0.8;
    }
  `}
`;

const AnchorButton = styled.a<{ $variant: ButtonVariant }>`
  -webkit-appearance: none;
  border: 2px solid transparent;
  border-radius: ${BUTTON_BORDER_RADIUS}px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  overflow: visible;
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing[5] + BUTTON_SHADOW_SIZE}px;
  padding: ${BUTTON_PADDING_TOP_BOTTOM_MOBILE}px ${BUTTON_PADDING_LEFT_RIGHT}px;
  position: relative;
  text-align: center;
  vertical-align: top;
  width: 100%;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  text-decoration: none;
  draggable: false;

  ${({ theme }) => theme.media.md} {
    width: auto;
    padding: ${BUTTON_PADDING_TOP_BOTTOM_DESKTOP}px ${BUTTON_PADDING_LEFT_RIGHT}px;
  }

  // Ensure that any global link styles are overridden
  &,
  &:visited,
  &:hover,
  &:active {
    text-decoration: none;
  }

  // Reset focus styles added to buttons as links
  &:focus {
    box-shadow: none;
    outline: none;
  }

  // Add button focus styles ensuring the active "pressed" state has priority
  &:focus:not(:active),
  &:focus:not(:active):hover {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
    box-shadow: 0 ${BUTTON_SHADOW_SIZE}px 0 ${({ theme }) => theme.colors.black};
  }

  // Remove button shadow when pressed
  &:active,
  &:active:focus {
    box-shadow: none;
    top: ${BUTTON_SHADOW_SIZE}px;
  }

  // Default pseudo element styles for click target expansion and shadow
  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    border-radius: ${BUTTON_BORDER_RADIUS}px;
  }

  // Use a pseudo element to expand the click target area to include the button's shadow
  &::before {
    bottom: -${2 + BUTTON_SHADOW_SIZE}px;
    border: 2px solid transparent;
    background-color: transparent;
  }

  // When the button is active it is shifted down by BUTTON_SHADOW_SIZE
  &:active::before {
    top: -${2 + BUTTON_SHADOW_SIZE}px;
    bottom: -2px;
  }

  // Apply variant-specific styles
  ${({ $variant, theme }) => getVariantStyles($variant, theme)}
`;

const InputButton = styled.input<{ $variant: ButtonVariant; $preventDoubleClick?: boolean }>`
  -webkit-appearance: none;
  border: 2px solid transparent;
  border-radius: ${BUTTON_BORDER_RADIUS}px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  overflow: visible;
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing[5] + BUTTON_SHADOW_SIZE}px;
  padding: ${BUTTON_PADDING_TOP_BOTTOM_MOBILE}px ${BUTTON_PADDING_LEFT_RIGHT}px;
  position: relative;
  text-align: center;
  vertical-align: top;
  width: 100%;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  text-decoration: none;

  ${({ theme }) => theme.media.md} {
    width: auto;
    padding: ${BUTTON_PADDING_TOP_BOTTOM_DESKTOP}px ${BUTTON_PADDING_LEFT_RIGHT}px;
  }

  // Fix unwanted button padding in Firefox
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  // Reset focus styles
  &:focus {
    box-shadow: none;
    outline: none;
  }

  // Add button focus styles ensuring the active "pressed" state has priority
  &:focus:not(:active),
  &:focus:not(:active):hover {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
    box-shadow: 0 ${BUTTON_SHADOW_SIZE}px 0 ${({ theme }) => theme.colors.black};
  }

  // Remove button shadow when pressed
  &:active,
  &:active:focus {
    box-shadow: none;
    top: ${BUTTON_SHADOW_SIZE}px;
  }

  // Default pseudo element styles for click target expansion and shadow
  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    border-radius: ${BUTTON_BORDER_RADIUS}px;
  }

  // Use a pseudo element to expand the click target area to include the button's shadow
  &::before {
    bottom: -${2 + BUTTON_SHADOW_SIZE}px;
    border: 2px solid transparent;
    background-color: transparent;
  }

  // When the button is active it is shifted down by BUTTON_SHADOW_SIZE
  &:active::before {
    top: -${2 + BUTTON_SHADOW_SIZE}px;
    bottom: -2px;
  }

  // Apply variant-specific styles
  ${({ $variant, theme }) => getVariantStyles($variant, theme)}

  // Disabled state
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  // Double click prevention styles
  ${({ $preventDoubleClick }) => $preventDoubleClick && `
    &[data-double-click-prevented] {
      pointer-events: none;
      opacity: 0.8;
    }
  `}
`;

/**
 * Button Component
 * 
 * A flexible button component that can render as button, input, or anchor elements
 * with multiple visual variants and full accessibility support.
 * Converted from NHS UK Design System button component.
 * 
 * @example
 * ```tsx
 * // Basic button
 * <Button text="Save and continue" />
 * 
 * // Secondary button
 * <Button text="Find my location" variant="secondary" />
 * 
 * // As a link
 * <Button text="Continue" href="/next-page" />
 * 
 * // Warning button
 * <Button text="Delete item" variant="warning" />
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  text,
  html,
  variant = 'primary',
  element,
  type = 'submit',
  name,
  value,
  disabled = false,
  href,
  preventDoubleClick = false,
  onClick,
  className,
  'data-testid': dataTestId,
  id,
  ...rest
}) => {
  // Determine element type automatically if not specified
  const elementType = element || (href ? 'a' : 'button');
  
  // Content to display
  const content = html || text || '';
  
  // Double click prevention handler
  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLInputElement>) => {
    if (preventDoubleClick && elementType !== 'a') {
      const target = event.currentTarget;
      if (target.getAttribute('data-double-click-prevented')) {
        event.preventDefault();
        return;
      }
      
      target.setAttribute('data-double-click-prevented', 'true');
      
      // Remove the attribute after a short delay
      setTimeout(() => {
        target.removeAttribute('data-double-click-prevented');
      }, 1000);
    }
    
    if (onClick) {
      onClick(event);
    }
  };

  // Common props
  const commonProps = {
    className,
    id,
    'data-testid': dataTestId,
    'data-module': 'button',
    $variant: variant,
    onClick: handleClick,
    ...rest,
  };

  if (elementType === 'a') {
    return (
      <AnchorButton
        {...commonProps}
        href={href || '#'}
        role="button"
        draggable={false}
      >
        {html ? (
          <span dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          content
        )}
      </AnchorButton>
    );
  }

  if (elementType === 'input') {
    return (
      <InputButton
        {...commonProps}
        type={type}
        value={text}
        name={name}
        disabled={disabled}
        $preventDoubleClick={preventDoubleClick}
        {...(disabled && { 'aria-disabled': 'true' })}
      />
    );
  }

  // Default to button element
  return (
    <BaseButton
      {...commonProps}
      type={type}
      name={name}
      value={value}
      disabled={disabled}
      $preventDoubleClick={preventDoubleClick}
      {...(disabled && { 'aria-disabled': 'true' })}
    >
      {html ? (
        <span dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        content
      )}
    </BaseButton>
  );
};

Button.displayName = 'Button';