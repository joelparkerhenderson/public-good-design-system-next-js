'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export type FooterWidth = 'full' | 'one-half' | 'one-third' | 'one-quarter';

export interface FooterLinkItem {
  /** Link URL */
  href: string;
  /** Link text content */
  text?: string;
  /** Link HTML content (takes precedence over text) */
  html?: string;
  /** Additional HTML attributes for the link */
  attributes?: Record<string, string>;
}

export interface FooterNavigationSection {
  /** Section title/heading */
  title?: string;
  /** Section text content */
  text?: string;
  /** Section HTML content (takes precedence over text) */
  html?: string;
  /** Width of this section (overrides default column width) */
  width?: FooterWidth;
  /** Array of navigation links for this section */
  items?: FooterLinkItem[];
}

export interface FooterMeta {
  /** Visually hidden title for meta links section */
  visuallyHiddenTitle?: string;
  /** Meta section text content */
  text?: string;
  /** Meta section HTML content (takes precedence over text) */
  html?: string;
  /** Array of meta/policy links */
  items?: FooterLinkItem[];
}

export interface FooterCopyright {
  /** Copyright text */
  text?: string;
  /** Copyright HTML (takes precedence over text) */
  html?: string;
}

export interface FooterProps extends BaseComponentProps {
  /** Number of columns for navigation layout (1, 2, 3, or 4) */
  columns?: 1 | 2 | 3 | 4;
  /** Navigation sections (can be single object or array) */
  navigation?: FooterNavigationSection | FooterNavigationSection[];
  /** Meta section configuration */
  meta?: FooterMeta;
  /** Copyright information */
  copyright?: FooterCopyright;
  /** Children content for meta section (takes precedence over meta.text/html) */
  children?: ReactNode;
  /** Additional CSS classes for the footer */
  classes?: string;
  /** Additional CSS classes for the container */
  containerClasses?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const FooterElement = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding-top: ${({ theme }) => theme.spacing[8]};
  padding-bottom: ${({ theme }) => theme.spacing[6]};
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }
`;

const FooterNavigation = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const FooterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FooterColumn = styled.div<{ $width: FooterWidth }>`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
    
    ${({ $width }) => {
      switch ($width) {
        case 'full':
          return 'width: 100%;';
        case 'one-half':
          return 'width: 50%;';
        case 'one-third':
          return 'width: 33.333%;';
        case 'one-quarter':
          return 'width: 25%;';
        default:
          return 'width: 25%;';
      }
    }}
  }
`;

const FooterHeading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const FooterText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const FooterList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FooterLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.white};
  text-decoration: underline;
  
  &:hover {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 0;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
  }
  
  &:visited {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const FooterMeta = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: ${({ theme }) => theme.spacing[6]};
`;

const VisuallyHidden = styled.h2`
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  clip: rect(0 0 0 0) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  border: 0 !important;
  white-space: nowrap !important;
`;

/**
 * Footer Component
 * 
 * A comprehensive website footer with navigation, meta information, and copyright.
 * Supports flexible column layouts, multiple navigation sections, and policy links.
 * Designed for healthcare and public service websites with accessibility in mind.
 * Converted from NHS UK Design System footer component.
 * 
 * @example
 * ```tsx
 * // Basic footer with copyright
 * <Footer 
 *   copyright={{ text: "© 2024 Public Health Organization" }}
 * />
 * 
 * // Footer with meta links
 * <Footer
 *   meta={{
 *     items: [
 *       { href: "/about", text: "About us" },
 *       { href: "/contact", text: "Contact" },
 *       { href: "/privacy", text: "Privacy policy" }
 *     ]
 *   }}
 *   copyright={{ text: "© 2024 Health Service" }}
 * />
 * 
 * // Footer with navigation sections
 * <Footer
 *   navigation={[
 *     {
 *       title: "Services",
 *       items: [
 *         { href: "/appointments", text: "Book appointment" },
 *         { href: "/prescriptions", text: "Prescriptions" },
 *         { href: "/health-records", text: "Health records" }
 *       ]
 *     },
 *     {
 *       title: "Support",
 *       items: [
 *         { href: "/help", text: "Help & FAQ" },
 *         { href: "/contact", text: "Contact us" },
 *         { href: "/feedback", text: "Give feedback" }
 *       ]
 *     }
 *   ]}
 *   meta={{
 *     items: [
 *       { href: "/accessibility", text: "Accessibility" },
 *       { href: "/cookies", text: "Cookies" }
 *     ]
 *   }}
 *   copyright={{ text: "© 2024 NHS Foundation Trust" }}
 * />
 * ```
 */
export const Footer: React.FC<FooterProps> = ({
  columns = 4,
  navigation,
  meta,
  copyright,
  children,
  classes,
  containerClasses,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const getColumnWidth = (customWidth?: FooterWidth): FooterWidth => {
    if (customWidth) return customWidth;
    
    switch (columns) {
      case 1: return 'full';
      case 2: return 'one-half';
      case 3: return 'one-third';
      default: return 'one-quarter';
    }
  };

  const renderNavigationItems = (items: FooterLinkItem[]) => (
    <FooterList className="footer__list">
      {items.map((item, index) => (
        <FooterListItem key={index} className="footer__list-item">
          <FooterLink
            href={item.href}
            className="footer__list-item-link"
            {...item.attributes}
          >
            {item.html ? (
              <span dangerouslySetInnerHTML={{ __html: item.html }} />
            ) : (
              item.text
            )}
          </FooterLink>
        </FooterListItem>
      ))}
    </FooterList>
  );

  const renderNavigationSection = (section: FooterNavigationSection, index: number) => (
    <FooterColumn 
      key={index}
      $width={getColumnWidth(section.width)}
      className="footer__column"
    >
      {section.title && (
        <FooterHeading className="footer__heading">
          {section.title}
        </FooterHeading>
      )}
      
      {section.html && (
        <FooterText 
          className="footer__text"
          dangerouslySetInnerHTML={{ __html: section.html }}
        />
      )}
      
      {!section.html && section.text && (
        <FooterText className="footer__text">
          {section.text}
        </FooterText>
      )}
      
      {section.items && renderNavigationItems(section.items)}
    </FooterColumn>
  );

  const renderNavigation = () => {
    if (!navigation) return null;

    const navSections = Array.isArray(navigation) ? navigation : [navigation];
    const rows: FooterNavigationSection[][] = [];
    
    // Group sections into rows based on columns setting
    for (let i = 0; i < navSections.length; i += columns) {
      rows.push(navSections.slice(i, i + columns));
    }

    return (
      <FooterNavigation className="footer__navigation">
        {rows.map((row, rowIndex) => (
          <FooterRow key={rowIndex} className="footer__row">
            {row.map((section, sectionIndex) => 
              renderNavigationSection(section, sectionIndex)
            )}
          </FooterRow>
        ))}
      </FooterNavigation>
    );
  };

  const renderMeta = () => {
    if (!meta && !children) return null;

    return (
      <FooterMeta className="footer__meta">
        {meta?.items && (
          <>
            <VisuallyHidden className="footer__meta-title">
              {meta.visuallyHiddenTitle || 'Support links'}
            </VisuallyHidden>
            {renderNavigationItems(meta.items)}
          </>
        )}
        
        {children && (
          <FooterText className="footer__meta-content">
            {children}
          </FooterText>
        )}
        
        {!children && meta?.html && (
          <FooterText 
            className="footer__meta-content"
            dangerouslySetInnerHTML={{ __html: meta.html }}
          />
        )}
        
        {!children && !meta?.html && meta?.text && (
          <FooterText className="footer__meta-content">
            {meta.text}
          </FooterText>
        )}
      </FooterMeta>
    );
  };

  const renderCopyright = () => {
    const copyrightContent = copyright?.html || copyright?.text || '© NHS England';
    
    return (
      <FooterText className="footer__copyright">
        {copyright?.html ? (
          <span dangerouslySetInnerHTML={{ __html: copyright.html }} />
        ) : (
          copyrightContent
        )}
      </FooterText>
    );
  };

  const footerClasses = [
    'footer',
    classes
  ].filter(Boolean).join(' ');

  const containerClass = [
    'footer__container',
    containerClasses
  ].filter(Boolean).join(' ');

  return (
    <FooterElement
      className={`${footerClasses}${className ? ` ${className}` : ''}`}
      role="contentinfo"
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      <FooterContainer className={containerClass}>
        {renderNavigation()}
        {renderMeta()}
        {renderCopyright()}
      </FooterContainer>
    </FooterElement>
  );
};

Footer.displayName = 'Footer';