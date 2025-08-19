'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export type NotificationBannerType = 'success' | 'important';
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface NotificationBannerProps extends BaseComponentProps {
  /** Text content of the notification banner */
  text?: string;
  /** HTML content of the notification banner (takes precedence over text) */
  html?: string;
  /** Children content (takes precedence over text and html) */
  children?: React.ReactNode;
  /** Title text that displays in the banner header */
  titleText?: string;
  /** Title HTML that displays in the banner header */
  titleHtml?: string;
  /** Heading level for the title. Defaults to 2 */
  titleHeadingLevel?: HeadingLevel;
  /** Type of notification banner. Defaults to 'important' */
  type?: NotificationBannerType;
  /** Override the ARIA role attribute */
  role?: 'alert' | 'region';
  /** ID for the banner title and aria-labelledby attribute */
  titleId?: string;
  /** Disable auto focus behavior for success banners */
  disableAutoFocus?: boolean;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const NotificationBannerContainer = styled.div<{ $type?: NotificationBannerType }>`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  border: 4px solid ${({ theme, $type }) => 
    $type === 'success' ? theme.colors.green : theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0;
  
  ${({ $type, theme }) => $type === 'success' && `
    background-color: ${theme.colors.white};
    border-color: ${theme.colors.green};
  `}
`;

const NotificationBannerHeader = styled.div<{ $type?: NotificationBannerType }>`
  background-color: ${({ theme, $type }) => 
    $type === 'success' ? theme.colors.green : theme.colors.primary};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
`;

const NotificationBannerTitle = styled.h2<{ $type?: NotificationBannerType }>`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  margin: 0;
  
  /* Handle different heading levels */
  &.h1 { font-size: ${({ theme }) => theme.typography.fontSize['2xl']}; }
  &.h2 { font-size: ${({ theme }) => theme.typography.fontSize.xl}; }
  &.h3 { font-size: ${({ theme }) => theme.typography.fontSize.lg}; }
  &.h4 { font-size: ${({ theme }) => theme.typography.fontSize.base}; }
  &.h5 { font-size: ${({ theme }) => theme.typography.fontSize.sm}; }
  &.h6 { font-size: ${({ theme }) => theme.typography.fontSize.xs}; }
`;

const NotificationBannerContent = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  
  p {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontFamily.base};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    
    &.nhsuk-notification-banner__heading {
      font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
      margin-bottom: ${({ theme }) => theme.spacing[2]};
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  ul {
    margin: ${({ theme }) => theme.spacing[3]} 0 0 0;
    padding-left: ${({ theme }) => theme.spacing[4]};
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing[1]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    margin: 0 0 ${({ theme }) => theme.spacing[2]} 0;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &.nhsuk-notification-banner__heading {
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
      margin-bottom: ${({ theme }) => theme.spacing[3]};
    }
  }
  
  a.nhsuk-notification-banner__link {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    
    &:hover {
      color: ${({ theme }) => theme.colors.darkBlue};
      text-decoration: none;
    }
    
    &:focus {
      outline: 3px solid ${({ theme }) => theme.colors.yellow};
      outline-offset: 0;
      background-color: ${({ theme }) => theme.colors.yellow};
      color: ${({ theme }) => theme.colors.black};
      text-decoration: none;
    }
  }
`;

/**
 * NotificationBanner Component
 * 
 * A component for displaying important notifications or success messages to users.
 * The component can automatically receive focus for success notifications to ensure
 * accessibility for screen readers.
 * 
 * @example
 * ```tsx
 * // Basic important notification
 * <NotificationBanner 
 *   text="The patient record was updated."
 * />
 * 
 * // Success notification with custom title
 * <NotificationBanner 
 *   type="success"
 *   titleText="Email sent successfully"
 *   text="Email sent to patient@example.com"
 * />
 * 
 * // Complex notification with HTML content
 * <NotificationBanner 
 *   type="success"
 *   titleText="Files uploaded"
 *   html="<p>4 files were successfully uploaded to the patient record.</p>"
 * />
 * 
 * // Notification with children content
 * <NotificationBanner titleText="Appointment scheduled">
 *   <p className="nhsuk-notification-banner__heading">
 *     Your appointment has been confirmed
 *   </p>
 *   <p>Date: Monday, 15 January 2024</p>
 *   <p>Time: 2:30 PM</p>
 *   <p>Location: Manchester Royal Infirmary</p>
 * </NotificationBanner>
 * ```
 */
export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  text,
  html,
  children,
  titleText,
  titleHtml,
  titleHeadingLevel = 2,
  type = 'important',
  role,
  titleId = 'nhsuk-notification-banner-title',
  disableAutoFocus = false,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  // Determine the appropriate ARIA role
  const getRole = () => {
    if (role) return role;
    return type === 'success' ? 'alert' : 'region';
  };

  // Determine the title content
  const getTitleContent = () => {
    if (titleHtml) return <span dangerouslySetInnerHTML={{ __html: titleHtml }} />;
    if (titleText) return titleText;
    return type === 'success' ? 'Success' : 'Important';
  };

  // Auto-focus behavior for success notifications
  useEffect(() => {
    if (type === 'success' && !disableAutoFocus && bannerRef.current) {
      // Set tabindex to -1 to make it focusable programmatically
      bannerRef.current.tabIndex = -1;
      bannerRef.current.focus();
    }
  }, [type, disableAutoFocus]);

  // Render content
  const renderContent = () => {
    if (children) {
      return children;
    }
    
    if (html) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }
    
    if (text) {
      return <p className="nhsuk-notification-banner__heading">{text}</p>;
    }
    
    return null;
  };

  // Create the title element dynamically
  const TitleElement = React.createElement(
    `h${titleHeadingLevel}` as keyof JSX.IntrinsicElements,
    {
      className: `nhsuk-notification-banner__title h${titleHeadingLevel}`,
      id: titleId,
    },
    getTitleContent()
  ) as React.ReactElement;

  return (
    <NotificationBannerContainer
      ref={bannerRef}
      className={`nhsuk-notification-banner${type === 'success' ? ' nhsuk-notification-banner--success' : ''}${className ? ` ${className}` : ''}`}
      role={getRole()}
      aria-labelledby={titleId}
      data-module="nhsuk-notification-banner"
      data-disable-auto-focus={disableAutoFocus}
      data-testid={dataTestId}
      $type={type}
      {...attributes}
      {...rest}
    >
      <NotificationBannerHeader className="nhsuk-notification-banner__header" $type={type}>
        <NotificationBannerTitle as={TitleElement.type} className={TitleElement.props.className} id={TitleElement.props.id} $type={type}>
          {TitleElement.props.children}
        </NotificationBannerTitle>
      </NotificationBannerHeader>
      
      <NotificationBannerContent className="nhsuk-notification-banner__content">
        {renderContent()}
      </NotificationBannerContent>
    </NotificationBannerContainer>
  );
};

NotificationBanner.displayName = 'NotificationBanner';