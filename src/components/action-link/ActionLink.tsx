'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface ActionLinkProps extends BaseComponentProps {
  /** Text to display in the action link */
  text: string;
  /** URL for the link */
  href: string;
  /** Whether to open link in new window */
  openInNewWindow?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};

  ${({ theme }) => theme.media.md} {
    margin-bottom: ${({ theme }) => theme.spacing[8]};
  }
`;

const Link = styled.a`
  display: inline-block;
  padding-left: 38px;
  position: relative;
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: ${({ theme }) => theme.semanticColors.interactive.primary};

  &:hover:not(:focus) .action-link-text {
    text-decoration: underline;
  }

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};

    .action-link-icon {
      fill: ${({ theme }) => theme.colors.black} !important;
    }
  }

  ${({ theme }) => theme.media.md} {
    padding-left: 26px;
  }

  @media print {
    color: ${({ theme }) => theme.colors.black};

    &:visited {
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

const Icon = styled.svg.attrs({
  className: 'action-link-icon',
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  'aria-hidden': 'true',
})`
  fill: ${({ theme }) => theme.colors.green} !important;
  height: 36px;
  width: 36px;
  position: absolute;
  left: -3px;
  top: -3px;

  ${({ theme }) => theme.media.md} {
    height: 24px;
    width: 24px;
    left: -2px;
    top: 1px;
    margin-bottom: 0;
  }

  @media print {
    fill: ${({ theme }) => theme.colors.black} !important;
  }
`;

const Text = styled.span.attrs({
  className: 'action-link-text',
})`
  /* Inherits styles from parent link */
`;

/**
 * Action Link Component
 * 
 * A prominent link component with an arrow icon that encourages user action.
 * Converted from NHS UK Design System action-link component.
 * 
 * @example
 * ```tsx
 * <ActionLink 
 *   text="Find your nearest A&E" 
 *   href="/find-services/accident-emergency" 
 * />
 * ```
 */
export const ActionLink: React.FC<ActionLinkProps> = ({
  text,
  href,
  openInNewWindow = false,
  onClick,
  className,
  'data-testid': dataTestId,
  id,
  ...rest
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Container className={className} id={id} data-testid={dataTestId} {...rest}>
      <Link
        href={href}
        target={openInNewWindow ? '_blank' : undefined}
        rel={openInNewWindow ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
      >
        <Icon>
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2a10 10 0 0 0-9.95 9h11.64L9.74 7.05a1 1 0 0 1 1.41-1.41l5.66 5.65a1 1 0 0 1 0 1.42l-5.66 5.65a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41L13.69 13H2.05A10 10 0 1 0 12 2z" />
        </Icon>
        <Text>{text}</Text>
      </Link>
    </Container>
  );
};

ActionLink.displayName = 'ActionLink';