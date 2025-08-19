'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Text label for the tab */
  label: string;
  /** Panel content */
  panel: {
    /** Text content for the panel */
    text?: string;
    /** HTML content for the panel */
    html?: string;
    /** Additional HTML attributes for the panel */
    attributes?: Record<string, string>;
  };
  /** Additional HTML attributes for the tab */
  attributes?: Record<string, string>;
}

export interface TabsProps extends BaseComponentProps {
  /** Array of tab items */
  items: TabItem[];
  /** ID for the tabs container */
  id?: string;
  /** String to prefix id for each tab item if no id is specified */
  idPrefix?: string;
  /** Title for the tabs table of contents */
  title?: string;
  /** Initial active tab index */
  defaultActiveTab?: number;
  /** Controlled active tab index */
  activeTab?: number;
  /** Callback when tab changes */
  onTabChange?: (tabIndex: number, tabId: string) => void;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const TabsContainer = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  margin: 0 0 ${({ theme }) => theme.spacing[6]} 0;
`;

const TabsTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
  color: ${({ theme }) => theme.colors.text};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const TabsList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: 767px) {
    display: none;
  }
`;

const TabsListItem = styled.li<{ $selected?: boolean }>`
  margin: 0 0 -1px 0;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: none;
  
  ${({ $selected, theme }) => $selected && `
    background-color: ${theme.colors.white};
    border-bottom: 1px solid ${theme.colors.white};
    position: relative;
    z-index: 1;
  `}
  
  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.borderRadius.base};
  }
  
  &:last-child {
    border-top-right-radius: ${({ theme }) => theme.borderRadius.base};
  }
`;

const TabsTab = styled.a<{ $selected?: boolean }>`
  display: block;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  
  ${({ $selected, theme }) => $selected && `
    color: ${theme.colors.text};
    font-weight: ${theme.typography.fontWeight.semibold};
  `}
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover || theme.colors.backgroundLight};
    color: ${({ theme }) => theme.colors.primaryHover || theme.colors.primary};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.focus};
    color: ${({ theme }) => theme.colors.text};
  }
  
  &[aria-selected="true"] {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const TabsPanel = styled.div<{ $hidden?: boolean }>`
  padding: ${({ theme }) => theme.spacing[4]} 0;
  
  ${({ $hidden }) => $hidden && `
    display: none;
  `}
  
  @media (max-width: 767px) {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    margin-top: ${({ theme }) => theme.spacing[4]};
    padding-top: ${({ theme }) => theme.spacing[4]};
    
    &:first-of-type {
      margin-top: 0;
      border-top: none;
    }
  }
  
  h2, h3, h4, h5, h6 {
    margin-top: 0;
  }
  
  p:last-child {
    margin-bottom: 0;
  }
`;

/**
 * Tabs Component
 * 
 * A component that allows users to navigate between related sections of content, 
 * displaying one section at a time. Converts to an accordion-style layout on 
 * mobile devices for better usability.
 * 
 * @example
 * ```tsx
 * // Basic tabs
 * <Tabs 
 *   items={[
 *     {
 *       id: "tab-one",
 *       label: "Tab one",
 *       panel: {
 *         html: "<h2>Tab one content</h2><p>Content for the first tab.</p>"
 *       }
 *     },
 *     {
 *       id: "tab-two", 
 *       label: "Tab two",
 *       panel: {
 *         text: "Content for the second tab."
 *       }
 *     }
 *   ]}
 * />
 * 
 * // Controlled tabs with callback
 * <Tabs 
 *   activeTab={selectedTab}
 *   onTabChange={(index, id) => setSelectedTab(index)}
 *   items={tabItems}
 * />
 * ```
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  id,
  idPrefix,
  title = "Contents",
  defaultActiveTab = 0,
  activeTab,
  onTabChange,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultActiveTab);
  const [isMobile, setIsMobile] = useState(false);
  const tabsListRef = useRef<HTMLUListElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  
  // Use controlled or uncontrolled state
  const currentActiveTab = activeTab !== undefined ? activeTab : internalActiveTab;
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle hash changes for URL navigation
  const handleTabChange = useCallback((tabIndex: number) => {
    if (activeTab === undefined) {
      setInternalActiveTab(tabIndex);
    }
    
    if (onTabChange) {
      onTabChange(tabIndex, items[tabIndex].id);
    }
    
    // Update URL hash without scrolling
    if (!isMobile && items[tabIndex]) {
      const panel = document.getElementById(items[tabIndex].id);
      if (panel) {
        const originalId = panel.id;
        panel.id = '';
        window.location.hash = originalId;
        panel.id = originalId;
      }
    }
  }, [activeTab, onTabChange, items, isMobile]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const tabIndex = items.findIndex(item => `#${item.id}` === hash);
        if (tabIndex !== -1) {
          handleTabChange(tabIndex);
        }
      }
    };
    
    // Check initial hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [items, handleTabChange]);
  
  const handleTabClick = (event: React.MouseEvent<HTMLAnchorElement>, tabIndex: number) => {
    event.preventDefault();
    handleTabChange(tabIndex);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>, tabIndex: number) => {
    let newIndex = tabIndex;
    
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'Left':
      case 'Up':
        newIndex = tabIndex > 0 ? tabIndex - 1 : items.length - 1;
        event.preventDefault();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
      case 'Right':
      case 'Down':
        newIndex = tabIndex < items.length - 1 ? tabIndex + 1 : 0;
        event.preventDefault();
        break;
      case 'Home':
        newIndex = 0;
        event.preventDefault();
        break;
      case 'End':
        newIndex = items.length - 1;
        event.preventDefault();
        break;
      default:
        return;
    }
    
    handleTabChange(newIndex);
    
    // Focus the new tab
    setTimeout(() => {
      if (tabRefs.current[newIndex]) {
        tabRefs.current[newIndex]?.focus();
      }
    }, 0);
  };
  
  const getTabId = (item: TabItem, index: number) => {
    return item.id || `${idPrefix || 'tab'}-${index + 1}`;
  };
  
  const renderTabContent = (item: TabItem) => {
    if (item.panel.html) {
      return <div dangerouslySetInnerHTML={{ __html: item.panel.html }} />;
    }
    return item.panel.text;
  };

  return (
    <TabsContainer
      id={id}
      className={`nhsuk-tabs${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      <TabsTitle className="nhsuk-tabs__title">
        {title}
      </TabsTitle>
      
      {!isMobile && (
        <TabsList 
          className="nhsuk-tabs__list"
          role="tablist"
          ref={tabsListRef}
        >
          {items.map((item, index) => {
            const tabId = getTabId(item, index);
            const isSelected = index === currentActiveTab;
            
            return (
              <TabsListItem
                key={index}
                className={`nhsuk-tabs__list-item${isSelected ? ' nhsuk-tabs__list-item--selected' : ''}`}
                role="presentation"
                $selected={isSelected}
              >
                <TabsTab
                  ref={(el) => { tabRefs.current[index] = el; }}
                  className="nhsuk-tabs__tab"
                  href={`#${tabId}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={tabId}
                  tabIndex={isSelected ? 0 : -1}
                  id={`tab_${tabId}`}
                  $selected={isSelected}
                  onClick={(e) => handleTabClick(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  {...item.attributes}
                >
                  {item.label}
                </TabsTab>
              </TabsListItem>
            );
          })}
        </TabsList>
      )}
      
      {items.map((item, index) => {
        const tabId = getTabId(item, index);
        const isHidden = !isMobile && index !== currentActiveTab;
        
        return (
          <TabsPanel
            key={index}
            className={`nhsuk-tabs__panel${isHidden ? ' nhsuk-tabs__panel--hidden' : ''}`}
            id={tabId}
            role={!isMobile ? 'tabpanel' : undefined}
            aria-labelledby={!isMobile ? `tab_${tabId}` : undefined}
            tabIndex={!isMobile ? 0 : undefined}
            $hidden={isHidden}
            {...item.panel.attributes}
          >
            {isMobile && (
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                color: 'inherit'
              }}>
                {item.label}
              </h3>
            )}
            {renderTabContent(item)}
          </TabsPanel>
        );
      })}
    </TabsContainer>
  );
};

Tabs.displayName = 'Tabs';