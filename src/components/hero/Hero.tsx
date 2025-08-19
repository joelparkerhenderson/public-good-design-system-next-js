'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeroProps extends BaseComponentProps {
  /** Main heading text for the hero */
  heading?: string;
  /** Additional CSS classes for the heading */
  headingClasses?: string;
  /** Heading level (h1-h6) */
  headingLevel?: HeadingLevel;
  /** Plain text content (ignored if html or children provided) */
  text?: string;
  /** HTML content (takes precedence over text, ignored if children provided) */
  html?: string;
  /** React children content (takes precedence over html and text) */
  children?: ReactNode;
  /** Background image URL */
  imageURL?: string;
  /** Additional CSS classes for the container */
  containerClasses?: string;
  /** Additional CSS classes for the hero */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const HeroSection = styled.section<{ $hasImage?: boolean; $hasHeading?: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  
  ${({ $hasImage, theme }) => $hasImage && `
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 320px;
    
    @media (min-width: ${theme.breakpoints.md}) {
      min-height: 480px;
    }
  `}
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 48, 135, 0.8) 0%,
    rgba(0, 94, 184, 0.6) 50%,
    rgba(0, 48, 135, 0.8) 100%
  );
`;

const HeroContainer = styled.div<{ $hasImage?: boolean }>`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]};
  
  ${({ $hasImage, theme }) => !$hasImage && `
    border-left: 6px solid ${theme.colors.yellow};
  `}
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]};
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`;

const HeroContent = styled.div<{ $hasImage?: boolean }>`
  position: relative;
  
  ${({ $hasImage, theme }) => $hasImage && `
    padding: ${theme.spacing[6]};
    background: rgba(255, 255, 255, 0.95);
    color: ${theme.colors.text};
    
    @media (min-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing[8]};
    }
  `}
`;

const HeroWrapper = styled.div`
  /* Non-image hero wrapper styles handled by HeroContent */
`;

const HeroHeading = styled.h1<{ $level: HeadingLevel; $hasMarginBottom?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin-top: 0;
  margin-bottom: ${({ $hasMarginBottom, theme }) => 
    $hasMarginBottom ? theme.spacing[4] : 0};
  color: inherit;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }
`;

const HeroText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-top: 0;
  margin-bottom: 0;
  color: inherit;
`;

const HeroArrow = styled.span`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid rgba(255, 255, 255, 0.95);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

/**
 * Hero Component
 * 
 * A prominent banner section for pages, featuring large heading text, optional descriptive
 * content, and optional background image. Used for page introductions, calls-to-action,
 * and featured content areas. Converted from NHS UK Design System hero component.
 * 
 * @example
 * ```tsx
 * // Basic hero with heading and text
 * <Hero 
 *   heading="We're here for you"
 *   text="Helping you take control of your health and wellbeing."
 * />
 * 
 * // Hero with background image
 * <Hero 
 *   heading="Emergency Services"
 *   text="24/7 urgent care when you need it most."
 *   imageURL="/hero-emergency.jpg"
 * />
 * 
 * // Hero with custom HTML content
 * <Hero 
 *   heading="Health Portal"
 *   html="<p>Access your health records, book appointments, and manage prescriptions.</p>"
 * />
 * 
 * // Hero with React children
 * <Hero heading="Welcome to Public Health">
 *   <p>Your comprehensive resource for health information and services.</p>
 *   <Button href="/services">Explore Services</Button>
 * </Hero>
 * ```
 */
export const Hero: React.FC<HeroProps> = ({
  heading,
  headingClasses,
  headingLevel = 1,
  text,
  html,
  children,
  imageURL,
  containerClasses,
  classes,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const hasImage = !!imageURL;
  const hasHeading = !!heading;
  const hasContent = !!(children || html || text);
  const hasMarginBottom = hasContent;
  
  const renderHeading = () => {
    if (!heading) return null;
    
    const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
    
    return (
      <HeroHeading
        as={HeadingTag}
        $level={headingLevel}
        $hasMarginBottom={hasMarginBottom}
        className={`hero__heading${headingClasses ? ` ${headingClasses}` : ''}`}
      >
        {heading}
      </HeroHeading>
    );
  };
  
  const renderContent = () => {
    if (children) {
      return children;
    } else if (html) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    } else if (text) {
      return (
        <HeroText className="hero__text">
          {text}
        </HeroText>
      );
    }
    return null;
  };
  
  const heroClasses = [
    'hero',
    hasImage && hasHeading ? 'hero--image hero--image-description' : '',
    hasImage ? 'hero--image' : '',
    classes
  ].filter(Boolean).join(' ');
  
  const containerClass = [
    'hero__container',
    !hasImage ? 'hero--border' : '',
    containerClasses
  ].filter(Boolean).join(' ');
  
  const contentWrapperClass = hasImage ? 'hero-content' : 'hero__wrapper';
  
  const sectionStyle = hasImage ? { backgroundImage: `url('${imageURL}')` } : undefined;
  
  return (
    <HeroSection
      $hasImage={hasImage}
      $hasHeading={hasHeading}
      className={`${heroClasses}${className ? ` ${className}` : ''}`}
      style={sectionStyle}
      role="region"
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      {hasImage && <HeroOverlay className="hero__overlay" />}
      
      {(hasHeading || hasContent) && (
        <HeroContainer $hasImage={hasImage} className={containerClass}>
          <HeroGrid className="hero__grid">
            <div className="hero__column">
              {hasImage ? (
                <HeroContent $hasImage={hasImage} className={contentWrapperClass}>
                  {renderHeading()}
                  {renderContent()}
                  <HeroArrow className="hero__arrow" aria-hidden="true" />
                </HeroContent>
              ) : (
                <HeroWrapper className={contentWrapperClass}>
                  {renderHeading()}
                  {renderContent()}
                </HeroWrapper>
              )}
            </div>
          </HeroGrid>
        </HeroContainer>
      )}
    </HeroSection>
  );
};

Hero.displayName = 'Hero';