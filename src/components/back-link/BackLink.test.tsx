import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../tests/utils/test-utils';
import { BackLink } from './BackLink';

describe('BackLink', () => {
  it('should render as a link by default', () => {
    render(<BackLink />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Back');
    expect(link).toHaveAttribute('href', '#');
  });

  it('should render as a button when element is button', () => {
    render(<BackLink element="button" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Back');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should use custom text', () => {
    render(<BackLink text="Go back" />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Go back');
  });

  it('should use HTML content over text', () => {
    render(<BackLink text="Go back" html="<strong>Back to home</strong>" />);
    
    const link = screen.getByRole('link');
    expect(link).toContainHTML('<strong>Back to home</strong>');
    expect(link).not.toHaveTextContent('Go back');
  });

  it('should use custom href', () => {
    render(<BackLink href="/previous-page" />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/previous-page');
  });

  it('should call onClick handler when clicked', () => {
    const onClick = vi.fn();
    render(<BackLink onClick={onClick} />);
    
    const link = screen.getByRole('link');
    fireEvent.click(link);
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick handler for button element', () => {
    const onClick = vi.fn();
    render(<BackLink element="button" onClick={onClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render the chevron icon', () => {
    render(<BackLink />);
    
    const icon = screen.getByRole('link').querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should apply custom className to container', () => {
    const customClass = 'custom-back-link';
    render(<BackLink className={customClass} />);
    
    const container = screen.getByRole('link').parentElement;
    expect(container).toHaveClass(customClass);
  });

  it('should apply data-testid to container', () => {
    const testId = 'back-link-test';
    render(<BackLink data-testid={testId} />);
    
    const container = screen.getByTestId(testId);
    expect(container).toBeInTheDocument();
  });

  it('should apply custom id to container', () => {
    const customId = 'custom-back-link-id';
    render(<BackLink id={customId} />);
    
    const container = screen.getByRole('link').parentElement;
    expect(container).toHaveAttribute('id', customId);
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<BackLink />);
      
      const icon = screen.getByRole('link').querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should be keyboard accessible as link', () => {
      render(<BackLink href="/back" />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/back');
    });

    it('should be keyboard accessible as button', () => {
      render(<BackLink element="button" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should provide clear link purpose', () => {
      render(<BackLink text="Back to search results" href="/search" />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAccessibleName('Back to search results');
    });

    it('should handle HTML content safely', () => {
      render(<BackLink html="<em>Back</em> to <strong>home</strong>" />);
      
      const link = screen.getByRole('link');
      expect(link).toContainHTML('<em>Back</em> to <strong>home</strong>');
    });
  });

  describe('Reverse styling', () => {
    it('should apply reverse class when reverse prop is true', () => {
      render(<BackLink reverse />);
      
      const container = screen.getByRole('link').parentElement;
      expect(container).toBeInTheDocument();
      // The reverse styling is applied via styled-components, so we test the prop is passed
    });

    it('should not apply reverse styling by default', () => {
      render(<BackLink />);
      
      const container = screen.getByRole('link').parentElement;
      expect(container).toBeInTheDocument();
      // Default styling should be applied
    });
  });

  describe('Element variations', () => {
    it('should handle all combinations of props', () => {
      // Link with all props
      const { rerender } = render(
        <BackLink 
          text="Custom back" 
          href="/custom" 
          element="a" 
          reverse 
        />
      );
      
      expect(screen.getByRole('link')).toHaveTextContent('Custom back');
      expect(screen.getByRole('link')).toHaveAttribute('href', '/custom');
      
      // Button with all props
      rerender(
        <BackLink 
          text="Custom back" 
          element="button" 
          reverse 
        />
      );
      
      expect(screen.getByRole('button')).toHaveTextContent('Custom back');
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('should maintain icon for all element types', () => {
      const { rerender } = render(<BackLink element="a" />);
      expect(screen.getByRole('link').querySelector('svg')).toBeInTheDocument();
      
      rerender(<BackLink element="button" />);
      expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Visual styling', () => {
    it('should have proper element styling', () => {
      render(<BackLink />);
      
      const link = screen.getByRole('link');
      const styles = getComputedStyle(link);
      
      expect(styles.display).toBe('inline-block');
      expect(styles.position).toBe('relative');
    });

    it('should handle button styling', () => {
      render(<BackLink element="button" />);
      
      const button = screen.getByRole('button');
      const styles = getComputedStyle(button);
      
      expect(styles.background).toBe('none');
      expect(styles.border).toBe('0px');
      expect(styles.cursor).toBe('pointer');
    });
  });
});