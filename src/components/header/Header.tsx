'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface HeaderLogo {
  /** Link URL for the logo */
  href?: string;
  /** Custom logo image source (if not using default NHS logo) */
  src?: string;
  /** Aria label for the logo */
  ariaLabel?: string;
}

export interface HeaderService {
  /** Service name text */
  text?: string;
  /** Link URL for the service name */
  href?: string;
}

export interface HeaderOrganisation {
  /** Organisation name */
  name?: string;
  /** Split text for longer organisation names */
  split?: string;
  /** Organisation descriptor text */
  descriptor?: string;
}

export interface HeaderSearch {
  /** Search form action URL */
  action?: string;
  /** Search input name attribute */
  name?: string;
  /** Search input placeholder text */
  placeholder?: string;
  /** Visually hidden label for search input */
  visuallyHiddenLabel?: string;
  /** Visually hidden text for search button */
  visuallyHiddenButton?: string;
}

export interface HeaderNavigationItem {
  /** Link URL */
  href: string;
  /** Link text content */
  text?: string;
  /** Link HTML content (takes precedence over text) */
  html?: string;
  /** Whether this is the current page */
  current?: boolean;
  /** Whether this section is active */
  active?: boolean;
  /** Additional CSS classes */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

export interface HeaderNavigation {
  /** Navigation items */
  items?: HeaderNavigationItem[];
  /** Aria label for navigation */
  ariaLabel?: string;
  /** Additional CSS classes */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

export interface HeaderAccountItem {
  /** Link URL (for links) */
  href?: string;
  /** Action URL (for form submission) */
  action?: string;
  /** Form method (when using action) */
  method?: string;
  /** Item text content */
  text?: string;
  /** Item HTML content (takes precedence over text) */
  html?: string;
  /** Whether to show user icon */
  icon?: boolean;
  /** Additional CSS classes */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

export interface HeaderAccount {
  /** Account items */
  items?: HeaderAccountItem[];
  /** Aria label for account navigation */
  ariaLabel?: string;
  /** Additional CSS classes */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

export interface HeaderProps extends BaseComponentProps {
  /** Logo configuration */
  logo?: HeaderLogo;
  /** Service name configuration */
  service?: HeaderService;
  /** Organisation branding configuration */
  organisation?: HeaderOrganisation;
  /** Search functionality configuration */
  search?: HeaderSearch | boolean;
  /** Primary navigation configuration */
  navigation?: HeaderNavigation;
  /** Account/user navigation configuration */
  account?: HeaderAccount;
  /** Base URL to prepend to logo src */
  baseUrl?: string;
  /** Additional CSS classes for container */
  containerClasses?: string;
  /** Additional CSS classes for header */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const HeaderElement = styled.header<{ $isWhite?: boolean; $hasOrganisation?: boolean }>`
  background-color: ${({ theme, $isWhite }) => 
    $isWhite ? theme.colors.white : theme.colors.primary};
  color: ${({ theme, $isWhite }) => 
    $isWhite ? theme.colors.primary : theme.colors.white};
  border-bottom: ${({ $isWhite, theme }) => 
    $isWhite ? `4px solid ${theme.colors.primary}` : 'none'};
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }
`;

const ServiceSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const ServiceLogo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    color: inherit;
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 0;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
  }
`;

const ServiceLogoUnlinked = styled.div`
  display: flex;
  align-items: center;
`;

const NHSLogo = styled.svg`
  height: 40px;
  width: 100px;
  margin-right: ${({ theme }) => theme.spacing[3]};
  
  @media (max-width: 450px) {
    height: 32px;
    width: 80px;
    margin-right: ${({ theme }) => theme.spacing[2]};
  }
`;

const OrganisationLogo = styled.img`
  max-width: 280px;
  max-height: 80px;
  margin-right: ${({ theme }) => theme.spacing[3]};
  
  @media (max-width: 450px) {
    max-height: 60px;
    margin-right: ${({ theme }) => theme.spacing[2]};
  }
`;

const OrganisationName = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: inherit;
  
  @media (max-width: 450px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const OrganisationNameSplit = styled.span`
  display: block;
`;

const OrganisationDescriptor = styled.span`
  display: block;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const ServiceName = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: inherit;
  text-decoration: none;
  
  &:hover {
    color: inherit;
    text-decoration: underline;
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 0;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
  }
  
  @media (max-width: 450px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const ServiceNameUnlinked = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: inherit;
  
  @media (max-width: 450px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const SearchSection = styled.div.attrs({ role: 'search' })`
  margin: 0 ${({ theme }) => theme.spacing[4]};
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchLabel = styled.label`
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

const SearchInput = styled.input`
  border: 2px solid ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  width: 200px;
  height: 40px;
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 0;
    border-color: ${({ theme }) => theme.colors.black};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.grey1};
  }
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.grey1};
  border: 2px solid ${({ theme }) => theme.colors.grey1};
  color: ${({ theme }) => theme.colors.white};
  height: 40px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: -2px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey2};
    border-color: ${({ theme }) => theme.colors.grey2};
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 0;
    background-color: ${({ theme }) => theme.colors.yellow};
    border-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.black};
  }
`;

const SearchIcon = styled.svg`
  height: 24px;
  width: 24px;
`;

const SearchButtonText = styled.span`
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

const AccountSection = styled.nav`
  margin-left: ${({ theme }) => theme.spacing[4]};
  flex-shrink: 0;
`;

const AccountList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const AccountItem = styled.li`
  margin: 0;
`;

const AccountLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: inherit;
  text-decoration: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: ${({ theme }) => theme.spacing[2]};
  
  &:hover {
    color: inherit;
    text-decoration: underline;
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 0;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
  }
`;

const AccountForm = styled.form`
  display: inline;
`;

const AccountButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: ${({ theme }) => theme.spacing[2]};
  
  &:hover {
    text-decoration: underline;
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 0;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
  }
`;

const AccountText = styled.span`
  color: inherit;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: ${({ theme }) => theme.spacing[2]};
`;

const UserIcon = styled.svg`
  height: 16px;
  width: 16px;
`;

const NavigationSection = styled.nav<{ $isWhite?: boolean }>`
  background-color: ${({ theme, $isWhite }) => 
    $isWhite ? theme.colors.white : theme.colors.grey1};
  color: ${({ theme, $isWhite }) => 
    $isWhite ? theme.colors.black : theme.colors.white};
  border-top: ${({ $isWhite, theme }) => 
    $isWhite ? `1px solid ${theme.colors.grey3}` : 'none'};
`;

const NavigationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }
`;

const NavigationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const NavigationItem = styled.li<{ $isCurrent?: boolean }>`
  margin: 0;
  border-bottom: ${({ $isCurrent, theme }) => 
    $isCurrent ? `4px solid ${theme.colors.yellow}` : '4px solid transparent'};
`;

const NavigationLink = styled.a<{ $isCurrent?: boolean }>`
  display: block;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  color: inherit;
  text-decoration: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ $isCurrent, theme }) => 
    $isCurrent ? theme.typography.fontWeight.bold : theme.typography.fontWeight.normal};
  
  &:hover {
    color: inherit;
    text-decoration: underline;
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.yellow};
    outline-offset: 0;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
  }
`;

const CurrentIndicator = styled.strong`
  font-weight: inherit;
`;

/**
 * Header Component
 * 
 * A comprehensive website header with logo, service name, search, account navigation,
 * and primary navigation. Supports organisational branding and responsive behavior.
 * Converted from NHS UK Design System header component.
 * 
 * @example
 * ```tsx
 * // Basic header with logo
 * <Header 
 *   logo={{ href: "/", ariaLabel: "Home" }}
 * />
 * 
 * // Header with service name and navigation
 * <Header
 *   logo={{ href: "/" }}
 *   service={{ text: "Public Health Service", href: "/" }}
 *   navigation={{
 *     items: [
 *       { href: "/services", text: "Services" },
 *       { href: "/information", text: "Information" },
 *       { href: "/support", text: "Support", current: true }
 *     ]
 *   }}
 * />
 * 
 * // Full header with search and account
 * <Header
 *   logo={{ href: "/" }}
 *   service={{ text: "Health Portal", href: "/" }}
 *   search={{
 *     action: "/search",
 *     placeholder: "Search health information"
 *   }}
 *   account={{
 *     items: [
 *       { href: "/profile", text: "My Account", icon: true },
 *       { action: "/logout", text: "Log out" }
 *     ]
 *   }}
 *   navigation={{
 *     items: [
 *       { href: "/health-az", text: "Health A-Z" },
 *       { href: "/services", text: "Services" },
 *       { href: "/emergency", text: "Emergency" }
 *     ]
 *   }}
 * />
 * ```
 */
export const Header: React.FC<HeaderProps> = ({
  logo,
  service,
  organisation,
  search,
  navigation,
  account,
  baseUrl = '',
  containerClasses,
  classes,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const isWhite = classes?.includes('nhsuk-header--white') || false;
  const hasOrganisation = !!organisation;
  
  // Determine if logo and service should be combined
  const combineLogoAndServiceNameLinks = 
    (service?.href && !logo?.href) || 
    (service?.href && logo?.href && service.href === logo.href);
    
  const logoHref = combineLogoAndServiceNameLinks ? service?.href : logo?.href;
  
  const searchConfig = typeof search === 'boolean' && search ? {} : search;
  
  const renderLogo = () => {
    const logoContent = (
      <>
        {logo?.src ? (
          <OrganisationLogo 
            src={`${baseUrl}${logo.src}`}
            alt={logo.ariaLabel || 'NHS'}
            className="header__organisation-logo"
          />
        ) : (
          <NHSLogo
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 80"
            focusable="false"
            role="img"
            aria-label={logo?.ariaLabel || 'NHS'}
            className="header__logo"
          >
            <title>{logo?.ariaLabel || 'NHS'}</title>
            <path
              fill="currentcolor"
              d="M200 0v80H0V0h200Zm-27.5 5.5c-14.5 0-29 5-29 22 0 10.2 7.7 13.5 14.7 16.3l.7.3c5.4 2 10.1 3.9 10.1 8.4 0 6.5-8.5 7.5-14 7.5s-12.5-1.5-16-3.5L135 70c5.5 2 13.5 3.5 20 3.5 15.5 0 32-4.5 32-22.5 0-19.5-25.5-16.5-25.5-25.5 0-5.5 5.5-6.5 12.5-6.5a35 35 0 0 1 14.5 3l4-13.5c-4.5-2-12-3-20-3Zm-131 2h-22l-14 65H22l9-45h.5l13.5 45h21.5l14-65H64l-9 45h-.5l-13-45Zm63 0h-18l-13 65h17l6-28H117l-5.5 28H129l13.5-65H125L119.5 32h-20l5-24.5Z"
            />
          </NHSLogo>
        )}
        {organisation && (
          <OrganisationName className="header__organisation-name">
            {organisation.name}
            {organisation.split && (
              <OrganisationNameSplit className="header__organisation-name-split">
                {organisation.split}
              </OrganisationNameSplit>
            )}
            {organisation.descriptor && (
              <OrganisationDescriptor className="header__organisation-name-descriptor">
                {organisation.descriptor}
              </OrganisationDescriptor>
            )}
          </OrganisationName>
        )}
        {combineLogoAndServiceNameLinks && service?.text && (
          <ServiceNameUnlinked className="header__service-name">
            {service.text}
          </ServiceNameUnlinked>
        )}
      </>
    );
    
    if (logoHref) {
      return (
        <ServiceLogo href={logoHref} className="header__service-logo">
          {logoContent}
        </ServiceLogo>
      );
    }
    
    return (
      <ServiceLogoUnlinked className="header__service-logo">
        {logoContent}
      </ServiceLogoUnlinked>
    );
  };
  
  const renderServiceName = () => {
    if (!service?.text || combineLogoAndServiceNameLinks) return null;
    
    if (service.href) {
      return (
        <ServiceName href={service.href} className="header__service-name">
          {service.text}
        </ServiceName>
      );
    }
    
    return (
      <ServiceNameUnlinked className="header__service-name">
        {service.text}
      </ServiceNameUnlinked>
    );
  };
  
  const renderSearch = () => {
    if (!searchConfig) return null;
    
    const searchAction = searchConfig.action || 'https://www.nhs.uk/search/';
    const searchName = searchConfig.name || 'q';
    const searchPlaceholder = searchConfig.placeholder || 'Search';
    const searchLabel = searchConfig.visuallyHiddenLabel || 'Search the NHS website';
    const searchButtonText = searchConfig.visuallyHiddenButton || 'Search';
    
    return (
      <SearchSection className="header__search">
        <SearchForm 
          className="header__search-form"
          id="search"
          action={searchAction}
          method="get"
        >
          <SearchLabel htmlFor="search-field" className="header__search-label">
            {searchLabel}
          </SearchLabel>
          <SearchInput
            id="search-field"
            name={searchName}
            type="search"
            placeholder={searchPlaceholder}
            autoComplete="off"
            className="header__search-input"
          />
          <SearchButton type="submit" className="header__search-submit">
            <SearchIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              className="header__search-icon"
            >
              <path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z" />
            </SearchIcon>
            <SearchButtonText className="header__search-button-text">
              {searchButtonText}
            </SearchButtonText>
          </SearchButton>
        </SearchForm>
      </SearchSection>
    );
  };
  
  const renderAccountItem = (item: HeaderAccountItem, index: number) => {
    const content = (
      <>
        {item.icon && (
          <UserIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="header__account-icon"
          >
            <path d="M12 1a11 11 0 1 1 0 22 11 11 0 0 1 0-22Zm0 2a9 9 0 0 0-5 16.5V18a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.5A9 9 0 0 0 12 3Zm0 3a3.5 3.5 0 1 1-3.5 3.5A3.4 3.4 0 0 1 12 6Z" />
          </UserIcon>
        )}
        {item.html ? (
          <span dangerouslySetInnerHTML={{ __html: item.html }} />
        ) : (
          item.text
        )}
      </>
    );
    
    if (item.href) {
      return (
        <AccountLink
          href={item.href}
          className="header__account-link"
          {...item.attributes}
        >
          {content}
        </AccountLink>
      );
    } else if (item.action) {
      return (
        <AccountForm
          action={item.action}
          method={item.method || 'post'}
          className="header__account-form"
        >
          <AccountButton className="header__account-button">
            {content}
          </AccountButton>
        </AccountForm>
      );
    } else {
      return <AccountText className="header__account-text">{content}</AccountText>;
    }
  };
  
  const renderAccount = () => {
    if (!account?.items?.length) return null;
    
    return (
      <AccountSection
        aria-label={account.ariaLabel || 'Account'}
        className={`header__account${account.classes ? ` ${account.classes}` : ''}`}
        {...account.attributes}
      >
        <AccountList className="header__account-list">
          {account.items.map((item, index) => 
            item ? (
              <AccountItem
                key={index}
                className={`header__account-item${item.classes ? ` ${item.classes}` : ''}`}
              >
                {renderAccountItem(item, index)}
              </AccountItem>
            ) : null
          )}
        </AccountList>
      </AccountSection>
    );
  };
  
  const renderNavigation = () => {
    if (!navigation?.items?.length) return null;
    
    return (
      <NavigationSection
        $isWhite={navigation.classes?.includes('nhsuk-header__navigation--white')}
        aria-label={navigation.ariaLabel || 'Menu'}
        className={`header__navigation${navigation.classes ? ` ${navigation.classes}` : ''}`}
        {...navigation.attributes}
      >
        <NavigationContainer className={`header__navigation-container${containerClasses ? ` ${containerClasses}` : ''}`}>
          <NavigationList className="header__navigation-list">
            {navigation.items.map((item, index) => {
              const isCurrent = item.active || item.current;
              const linkContent = isCurrent ? (
                <CurrentIndicator className="header__navigation-item-current-fallback">
                  {item.html ? (
                    <span dangerouslySetInnerHTML={{ __html: item.html }} />
                  ) : (
                    item.text
                  )}
                </CurrentIndicator>
              ) : (
                item.html ? (
                  <span dangerouslySetInnerHTML={{ __html: item.html }} />
                ) : (
                  item.text
                )
              );
              
              return (
                <NavigationItem
                  key={index}
                  $isCurrent={isCurrent}
                  className={`header__navigation-item${isCurrent ? ' header__navigation-item--current' : ''}${item.classes ? ` ${item.classes}` : ''}`}
                  {...item.attributes}
                >
                  <NavigationLink
                    href={item.href}
                    $isCurrent={isCurrent}
                    aria-current={isCurrent ? (item.current ? 'page' : 'true') : undefined}
                    className="header__navigation-link"
                  >
                    {linkContent}
                  </NavigationLink>
                </NavigationItem>
              );
            })}
          </NavigationList>
        </NavigationContainer>
      </NavigationSection>
    );
  };
  
  const headerClasses = [
    'header',
    hasOrganisation ? 'header--organisation' : '',
    classes
  ].filter(Boolean).join(' ');
  
  const containerClass = [
    'header__container',
    containerClasses
  ].filter(Boolean).join(' ');
  
  return (
    <>
      <HeaderElement
        $isWhite={isWhite}
        $hasOrganisation={hasOrganisation}
        role="banner"
        className={`${headerClasses}${className ? ` ${className}` : ''}`}
        data-testid={dataTestId}
        data-module="header"
        {...attributes}
        {...rest}
      >
        <HeaderContainer className={containerClass}>
          <ServiceSection className="header__service">
            {renderLogo()}
            {renderServiceName()}
          </ServiceSection>
          {renderSearch()}
          {renderAccount()}
        </HeaderContainer>
      </HeaderElement>
      {renderNavigation()}
    </>
  );
};

Header.displayName = 'Header';