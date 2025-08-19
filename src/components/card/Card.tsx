'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export type CardType = 'non-urgent' | 'urgent' | 'emergency';
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface CardProps extends BaseComponentProps {
  /** Card heading text */
  heading?: string;
  /** Card heading HTML (takes precedence over heading) */
  headingHtml?: string;
  /** Heading level (h1-h6) */
  headingLevel?: HeadingLevel;
  /** Additional classes for the heading */
  headingClasses?: string;
  /** URL for the card link */
  href?: string;
  /** Whether the entire card is clickable */
  clickable?: boolean;
  /** Care card type for medical advice */
  type?: CardType;
  /** Feature card variant */
  feature?: boolean;
  /** Primary card with chevron icon */
  primary?: boolean;
  /** Secondary card variant */
  secondary?: boolean;
  /** Top task card variant */
  topTask?: boolean;
  /** Image URL */
  imgURL?: string;
  /** Image alt text */
  imgALT?: string;
  /** Description text */
  description?: string;
  /** Description HTML (takes precedence over description) */
  descriptionHtml?: string;
  /** Children content */
  children?: React.ReactNode;
  /** Click handler for clickable cards */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

// Card styling constants
const CARD_BORDER_WIDTH = 1;
const CARD_BORDER_BOTTOM_WIDTH = 4; // nhsuk-spacing(1)

const CardContainer = styled.div<{
  $clickable?: boolean;
  $secondary?: boolean;
  $feature?: boolean;
  $topTask?: boolean;
  $type?: CardType;
}>`
  background: ${({ theme, $secondary }) => $secondary ? 'transparent' : theme.colors.white};
  border: ${CARD_BORDER_WIDTH}px solid ${({ theme }) => theme.colors.grey4};
  position: relative;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[8]};

  ${({ $secondary }) => $secondary && `
    border-left: 0;
    border-right: 0;
    border-top: 0;
    border-bottom: ${CARD_BORDER_BOTTOM_WIDTH}px solid;
  `}

  ${({ $clickable, theme }) => $clickable && `
    border-bottom-width: ${CARD_BORDER_BOTTOM_WIDTH}px;
    cursor: pointer;

    &:active {
      border-color: ${theme.colors.grey3};
      bottom: -${CARD_BORDER_WIDTH}px;
    }
  `}

  ${({ $feature, theme }) => $feature && `
    margin-top: ${theme.spacing[8]};
  `}

  ${({ $type, theme }) => $type && `
    margin-top: ${theme.spacing[8]};
    border-left: ${$type === 'emergency' ? '8px' : $type === 'urgent' ? '6px' : '4px'} solid ${theme.colors.red};
    border-top: ${CARD_BORDER_WIDTH}px solid ${theme.colors.red};
    border-right: ${CARD_BORDER_WIDTH}px solid ${theme.colors.red};
    border-bottom: ${CARD_BORDER_WIDTH}px solid ${theme.colors.red};
  `}

  @media print {
    .nhsuk-card__img {
      display: none;
    }
  }
`;

const CardImage = styled.img`
  border-bottom: ${CARD_BORDER_WIDTH}px solid ${({ theme }) => theme.colors.grey5};
  display: block;
  width: 100%;

  @media print {
    display: none;
  }
`;

const CardContent = styled.div<{
  $feature?: boolean;
  $primary?: boolean;
  $secondary?: boolean;
  $type?: CardType;
}>`
  padding: ${({ theme }) => theme.spacing[5]}px;

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => theme.spacing[5]}px;
  }

  ${({ $feature }) => $feature && `
    padding-top: 0 !important;
  `}

  ${({ $secondary }) => $secondary && `
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
  `}

  ${({ $primary, theme }) => $primary && `
    padding-right: calc(${theme.spacing[5]}px + 27px + ${theme.spacing[4]}px);
    position: relative;

    ${theme.media.lg} {
      height: 100%;
    }
  `}

  ${({ $type, theme }) => $type === 'emergency' && `
    background-color: ${theme.colors.black};
    border: 0;
    color: ${theme.colors.white};
    position: static;

    a {
      color: ${theme.colors.white};
      
      &:visited {
        color: ${theme.colors.white};
      }
      
      &:hover {
        color: ${theme.colors.white};
      }
      
      &:focus {
        color: ${theme.colors.black};
        background-color: ${theme.colors.yellow};
        outline: 3px solid ${theme.colors.yellow};
        outline-offset: 2px;
      }
    }

    @media print {
      background-color: ${theme.colors.white};
      color: ${theme.colors.black};
    }
  `}
`;

const CareCardHeadingContainer = styled.div<{ $type?: CardType }>`
  padding: ${({ theme }) => theme.spacing[3]}px ${({ theme }) => theme.spacing[5]}px;
  position: relative;

  ${({ theme }) => theme.media.md} {
    padding-left: ${({ theme }) => theme.spacing[5]}px;
    padding-right: ${({ theme }) => theme.spacing[5]}px;
  }

  ${({ $type, theme }) => $type && `
    background-color: ${$type === 'emergency' ? theme.colors.red : theme.colors.primary};
    color: ${theme.colors.white};
  `}
`;

const CardHeading = styled.h2<{
  $level: HeadingLevel;
  $feature?: boolean;
  $type?: CardType;
  as: string;
}>`
  margin-bottom: ${({ theme }) => theme.spacing[3]}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};

  ${({ $level, theme }) => {
    switch ($level) {
      case 1: return `font-size: ${theme.typography.fontSize['4xl']};`;
      case 2: return `font-size: ${theme.typography.fontSize['3xl']};`;
      case 3: return `font-size: ${theme.typography.fontSize['2xl']};`;
      case 4: return `font-size: ${theme.typography.fontSize.xl};`;
      case 5: return `font-size: ${theme.typography.fontSize.lg};`;
      case 6: return `font-size: ${theme.typography.fontSize.base};`;
      default: return `font-size: ${theme.typography.fontSize['2xl']};`;
    }
  }}

  ${({ $feature, theme }) => $feature && `
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    display: inline-block;
    left: -${theme.spacing[4] + CARD_BORDER_WIDTH}px;
    margin-bottom: ${theme.spacing[2]}px;
    margin-right: -${theme.spacing[4]}px;
    padding: ${theme.spacing[2]}px ${theme.spacing[4]}px;
    position: relative;
    top: -${theme.spacing[2]}px;

    ${theme.media.md} {
      left: -${theme.spacing[5] + CARD_BORDER_WIDTH}px;
      margin-right: -${theme.spacing[5]}px;
      padding: ${theme.spacing[2]}px ${theme.spacing[5]}px;
      top: -${theme.spacing[3]}px;
    }
  `}

  ${({ $type, theme }) => $type && `
    margin: 0;
    padding-top: 0;
    font-size: ${theme.typography.fontSize['2xl']};
    color: ${theme.colors.white};

    @media print {
      color: ${theme.colors.black};
    }
  `}

  &:has(+ .card-icon) {
    margin-bottom: 0;
  }
`;

const CardLink = styled.a`
  color: ${({ theme }) => theme.semanticColors.interactive.primary};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.semanticColors.interactive.hover};
    text-decoration: underline;
  }

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
  }

  &::before {
    background-color: rgba(255, 255, 255, 0);
    bottom: 0;
    content: "";
    display: block;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const CardDescription = styled.p`
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const ChevronIcon = styled.svg`
  display: block;
  width: 27px;
  height: 27px;
  fill: ${({ theme }) => theme.colors.primary};
  margin-top: -13.5px;
  pointer-events: none;
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.spacing[5]}px;

  circle {
    fill: ${({ theme }) => theme.colors.primary};
  }

  g {
    stroke: ${({ theme }) => theme.colors.white};
  }
`;

const CareCardArrow = styled.span<{ $type?: CardType }>`
  bottom: -10px;
  display: block;
  height: 20px;
  left: 30px;
  overflow: hidden;
  position: absolute;
  transform: rotate(45deg);
  width: 20px;

  ${({ theme }) => theme.media.md} {
    left: 38px;
  }

  &::before,
  &::after {
    border: solid 32px ${({ $type, theme }) => 
      $type === 'urgent' || $type === 'emergency' ? theme.colors.red : theme.colors.primary
    };
    content: "";
    display: block;
    height: 0;
    position: absolute;
    top: 0;
    transform: rotate(45deg);
    width: 0;
  }

  @media print {
    display: none;
  }
`;

const VisuallyHidden = styled.span`
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
 * Card Component
 * 
 * A flexible card component for displaying content with multiple variants including
 * basic cards, care cards for medical advice, feature cards, and clickable cards.
 * Converted from NHS UK Design System card component.
 * 
 * @example
 * ```tsx
 * // Basic card
 * <Card heading="Card title" description="Card description" />
 * 
 * // Clickable card with link
 * <Card heading="Clickable card" href="/link" clickable />
 * 
 * // Care card for medical advice
 * <Card 
 *   heading="Speak to a GP if:" 
 *   type="non-urgent"
 *   description="You have these symptoms"
 * />
 * 
 * // Feature card
 * <Card heading="Feature" description="Description" feature />
 * ```
 */
export const Card: React.FC<CardProps> = ({
  heading,
  headingHtml,
  headingLevel = 2,
  headingClasses,
  href,
  clickable = false,
  type,
  feature = false,
  primary = false,
  secondary = false,
  topTask = false,
  imgURL,
  imgALT,
  description,
  descriptionHtml,
  children,
  onClick,
  className,
  'data-testid': dataTestId,
  id,
  ...rest
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (clickable && onClick) {
      onClick(event);
    } else if (clickable && href) {
      window.location.href = href;
    }
  };

  const headingContent = headingHtml || heading;
  const descriptionContent = descriptionHtml || description;
  
  // Generate visually hidden text for care cards
  const getCareCardPrefix = (cardType?: CardType) => {
    switch (cardType) {
      case 'non-urgent':
        return 'Non-urgent advice: ';
      case 'urgent':
        return 'Urgent advice: ';
      case 'emergency':
        return 'Immediate action required: ';
      default:
        return 'Non-urgent advice: ';
    }
  };

  const renderHeading = () => {
    if (!headingContent) return null;

    const combinedClasses = headingClasses ? ` ${headingClasses}` : '';

    if (type) {
      // Care card heading with visually hidden prefix
      return (
        <CardHeading
          $level={headingLevel}
          $type={type}
          as={`h${headingLevel}`}
          className={combinedClasses}
        >
          <span role="text">
            <VisuallyHidden>{getCareCardPrefix(type)}</VisuallyHidden>
            {headingHtml ? (
              <span dangerouslySetInnerHTML={{ __html: headingHtml }} />
            ) : (
              heading
            )}
          </span>
        </CardHeading>
      );
    }

    if (href && !feature) {
      // Card with link in heading
      return (
        <CardHeading
          $level={headingLevel}
          $feature={feature}
          as={`h${headingLevel}`}
          className={combinedClasses}
        >
          <CardLink href={href}>
            {headingHtml ? (
              <span dangerouslySetInnerHTML={{ __html: headingHtml }} />
            ) : (
              heading
            )}
          </CardLink>
        </CardHeading>
      );
    }

    // Regular heading
    return (
      <CardHeading
        $level={headingLevel}
        $feature={feature}
        as={`h${headingLevel}`}
        className={combinedClasses}
      >
        {headingHtml ? (
          <span dangerouslySetInnerHTML={{ __html: headingHtml }} />
        ) : (
          heading
        )}
      </CardHeading>
    );
  };

  const renderChevronIcon = () => {
    if (!primary) return null;

    return (
      <ChevronIcon
        className="card-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="13.333" cy="13.333" r="13.333" />
        <g fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2.667">
          <path d="M15.438 13l-3.771 3.771" />
          <path d="M11.667 9.229L15.438 13" />
        </g>
      </ChevronIcon>
    );
  };

  const renderContent = () => {
    if (children) {
      return children;
    }

    if (descriptionContent) {
      if (descriptionHtml) {
        return <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />;
      }
      return <CardDescription>{description}</CardDescription>;
    }

    return null;
  };

  return (
    <CardContainer
      className={className}
      id={id}
      data-testid={dataTestId}
      $clickable={clickable}
      $secondary={secondary}
      $feature={feature}
      $topTask={topTask}
      $type={type}
      onClick={handleClick}
      {...rest}
    >
      {imgURL && (
        <CardImage src={imgURL} alt={imgALT || ''} />
      )}
      
      {type ? (
        // Care card layout
        <>
          <CareCardHeadingContainer $type={type}>
            {renderHeading()}
            <CareCardArrow $type={type} aria-hidden="true" />
          </CareCardHeadingContainer>
          <CardContent $type={type}>
            {renderContent()}
          </CardContent>
        </>
      ) : (
        // Regular card layout
        <CardContent
          $feature={feature}
          $primary={primary}
          $secondary={secondary}
        >
          {renderHeading()}
          {renderContent()}
          {renderChevronIcon()}
        </CardContent>
      )}
    </CardContainer>
  );
};

Card.displayName = 'Card';