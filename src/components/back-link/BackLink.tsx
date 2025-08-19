'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface BackLinkProps extends BaseComponentProps {
  /** Text to display in the back link */
  text?: string;
  /** HTML content to display (takes precedence over text) */
  html?: string;
  /** URL for the link (when using as anchor) */
  href?: string;
  /** HTML element type to render */
  element?: 'a' | 'button';
  /** Whether to use reverse styling (white text on dark backgrounds) */
  reverse?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

const Container = styled.div<{ $reverse?: boolean }>`
  padding-top: ${({ theme }) => theme.spacing[3]};
  line-height: 1;

  ${({ theme }) => theme.media.md} {
    padding-top: ${({ theme }) => theme.spacing[4]};
  }

  ${({ $reverse, theme }) => $reverse && `
    .back-link-element {
      color: white;
      
      &:link,
      &:visited {
        color: white;
      }
      
      &:hover {
        color: white;
      }
      
      &:focus {
        color: ${theme.colors.black};
      }
    }
  `}
`;

const baseElementStyles = ({ theme }: any) => `
  background: none;
  border: 0;
  cursor: pointer;
  display: inline-block;
  padding: 0 0 0 16px;
  position: relative;
  text-decoration: underline;
  color: ${theme.semanticColors.interactive.primary};
  font-size: ${theme.typography.fontSize.base};
  font-family: ${theme.typography.fontFamily.base};

  &:link {
    color: ${theme.semanticColors.interactive.primary};
  }

  &:visited {
    color: ${theme.semanticColors.interactive.primary};
  }

  &:hover {
    color: ${theme.semanticColors.interactive.hover};
  }

  &:focus {
    outline: 3px solid ${theme.colors.yellow};
    outline-offset: 2px;
    background-color: ${theme.colors.yellow};
    color: ${theme.colors.black};
  }

  &:active {
    color: ${theme.semanticColors.interactive.active};
  }
`;

const LinkElement = styled.a.attrs({
  className: 'back-link-element',
})`
  ${baseElementStyles}
`;

const ButtonElement = styled.button.attrs({
  className: 'back-link-element',
})`
  ${baseElementStyles}
`;

const Icon = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  'aria-hidden': 'true',
})`
  height: 24px;
  width: 24px;
  position: absolute;
  left: -8px;
  top: -1px;

  ${({ theme }) => theme.media.md} {
    top: 0;
  }
`;

/**
 * Back Link Component
 * 
 * A navigation component that allows users to go back to the previous page.
 * Can be rendered as either a link or button element.
 * Converted from NHS UK Design System back-link component.
 * 
 * @example
 * ```tsx
 * // As a link
 * <BackLink href="/previous-page" text="Back to previous page" />
 * 
 * // As a button
 * <BackLink element="button" onClick={() => history.back()} />
 * 
 * // With reverse styling for dark backgrounds
 * <BackLink href="/home" reverse />
 * ```
 */
export const BackLink: React.FC<BackLinkProps> = ({
  text = 'Back',
  html,
  href,
  element = 'a',
  reverse = false,
  onClick,
  className,
  'data-testid': dataTestId,
  id,
  ...rest
}) => {
  const content = html || text;

  const iconPath = (
    <path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z" />
  );

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Container 
      className={className} 
      id={id} 
      data-testid={dataTestId}
      $reverse={reverse}
      {...rest}
    >
      {element === 'button' ? (
        <ButtonElement onClick={handleClick} type="button">
          <Icon>{iconPath}</Icon>
          {html ? (
            <span dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            <span>{text}</span>
          )}
        </ButtonElement>
      ) : (
        <LinkElement href={href || '#'} onClick={handleClick}>
          <Icon>{iconPath}</Icon>
          {html ? (
            <span dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            <span>{text}</span>
          )}
        </LinkElement>
      )}
    </Container>
  );
};

BackLink.displayName = 'BackLink';