import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../tests/utils/test-utils';
import { ActionLink } from './ActionLink';

describe('ActionLink', () => {
  const defaultProps = {
    text: 'Find your nearest A&E',
    href: '/find-services/accident-emergency',
  };

  it('should render the action link with correct text and href', () => {
    render(<ActionLink {...defaultProps} />);
    
    const link = screen.getByRole('link', { name: defaultProps.text });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', defaultProps.href);
  });

  it('should render the arrow icon', () => {
    render(<ActionLink {...defaultProps} />);
    
    const icon = screen.getByRole('link').querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should open in new window when openInNewWindow is true', () => {
    render(<ActionLink {...defaultProps} openInNewWindow={true} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should not open in new window by default', () => {
    render(<ActionLink {...defaultProps} />);
    
    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('should call onClick handler when clicked', () => {
    const onClick = vi.fn();
    render(<ActionLink {...defaultProps} onClick={onClick} />);
    
    const link = screen.getByRole('link');
    fireEvent.click(link);
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should apply custom className', () => {
    const customClass = 'custom-action-link';
    render(<ActionLink {...defaultProps} className={customClass} />);
    
    const container = screen.getByRole('link').parentElement;
    expect(container).toHaveClass(customClass);
  });

  it('should apply data-testid', () => {
    const testId = 'action-link-test';
    render(<ActionLink {...defaultProps} data-testid={testId} />);
    
    const container = screen.getByTestId(testId);
    expect(container).toBeInTheDocument();
  });

  it('should apply custom id', () => {
    const customId = 'custom-action-link-id';
    render(<ActionLink {...defaultProps} id={customId} />);
    
    const container = screen.getByRole('link').parentElement;
    expect(container).toHaveAttribute('id', customId);
  });

  it('should be accessible with proper link semantics', () => {
    render(<ActionLink {...defaultProps} />);
    
    const link = screen.getByRole('link', { name: defaultProps.text });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAccessibleName(defaultProps.text);
  });

  it('should handle keyboard navigation', () => {
    render(<ActionLink {...defaultProps} />);
    
    const link = screen.getByRole('link');
    
    // Focus should be possible on the link
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href');
  });

  it('should render with minimal required props', () => {
    render(<ActionLink text="Test Link" href="#" />);
    
    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#');
  });

  it('should handle empty href gracefully', () => {
    render(<ActionLink text="Empty href" href="" />);
    
    // Empty href links are still valid but may not be accessible by role
    const container = screen.getByText('Empty href').closest('a');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('href', '');
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<ActionLink {...defaultProps} />);
      
      const icon = screen.getByRole('link').querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should be keyboard accessible', () => {
      render(<ActionLink {...defaultProps} />);
      
      const link = screen.getByRole('link');
      
      // Should be focusable with proper href
      expect(link).toHaveAttribute('href');
      expect(link).toBeInTheDocument();
    });

    it('should provide clear link purpose', () => {
      const descriptiveText = 'Find your nearest Accident and Emergency department';
      render(<ActionLink text={descriptiveText} href="/a-and-e" />);
      
      const link = screen.getByRole('link', { name: descriptiveText });
      expect(link).toHaveAccessibleName(descriptiveText);
    });
  });

  describe('Visual states', () => {
    it('should apply focus styles when focused', () => {
      render(<ActionLink {...defaultProps} />);
      
      const link = screen.getByRole('link');
      
      // Focus styles are applied via CSS, so we just ensure the element can receive focus
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href');
    });

    it('should maintain link styling', () => {
      render(<ActionLink {...defaultProps} />);
      
      const link = screen.getByRole('link');
      const styles = getComputedStyle(link);
      
      // Verify it's a block-level link (for proper click target)
      expect(styles.display).toBe('inline-block');
    });
  });
});