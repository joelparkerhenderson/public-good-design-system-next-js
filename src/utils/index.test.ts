import { describe, it, expect } from 'vitest';
import {
  cn,
  generateId,
  getAriaDescribedBy,
  isEnterKey,
  isSpaceKey,
  isEscapeKey,
  isArrowKey,
  capitalizeFirst,
  kebabCase,
  isValidEmail,
  isValidURL,
} from './index';

describe('Utility Functions', () => {
  describe('cn (className utility)', () => {
    it('should combine multiple class names', () => {
      expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3');
    });

    it('should filter out falsy values', () => {
      expect(cn('class1', false, 'class2', null, undefined, 'class3')).toBe('class1 class2 class3');
    });

    it('should handle empty input', () => {
      expect(cn()).toBe('');
    });
  });

  describe('generateId', () => {
    it('should generate a random ID', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^[a-z0-9]{9}$/);
    });

    it('should generate a prefixed ID', () => {
      const id = generateId('test');
      expect(id).toMatch(/^test-[a-z0-9]{9}$/);
    });
  });

  describe('getAriaDescribedBy', () => {
    it('should return undefined when no hint or error', () => {
      expect(getAriaDescribedBy()).toBeUndefined();
    });

    it('should return hint ID when hint is provided', () => {
      expect(getAriaDescribedBy('hint text', undefined, 'component')).toBe('component-hint');
    });

    it('should return error ID when error is provided', () => {
      expect(getAriaDescribedBy(undefined, 'error text', 'component')).toBe('component-error');
    });

    it('should return both IDs when both are provided', () => {
      expect(getAriaDescribedBy('hint text', 'error text', 'component')).toBe('component-hint component-error');
    });
  });

  describe('Keyboard event utilities', () => {
    it('should detect Enter key', () => {
      const event = { key: 'Enter' } as React.KeyboardEvent;
      expect(isEnterKey(event)).toBe(true);
      
      const eventOther = { key: 'Space' } as React.KeyboardEvent;
      expect(isEnterKey(eventOther)).toBe(false);
    });

    it('should detect Space key', () => {
      const event1 = { key: ' ' } as React.KeyboardEvent;
      const event2 = { key: 'Space' } as React.KeyboardEvent;
      expect(isSpaceKey(event1)).toBe(true);
      expect(isSpaceKey(event2)).toBe(true);
      
      const eventOther = { key: 'Enter' } as React.KeyboardEvent;
      expect(isSpaceKey(eventOther)).toBe(false);
    });

    it('should detect Escape key', () => {
      const event1 = { key: 'Escape' } as React.KeyboardEvent;
      const event2 = { key: 'Esc' } as React.KeyboardEvent;
      expect(isEscapeKey(event1)).toBe(true);
      expect(isEscapeKey(event2)).toBe(true);
      
      const eventOther = { key: 'Enter' } as React.KeyboardEvent;
      expect(isEscapeKey(eventOther)).toBe(false);
    });

    it('should detect arrow keys', () => {
      const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      keys.forEach(key => {
        const event = { key } as React.KeyboardEvent;
        expect(isArrowKey(event)).toBe(true);
      });
      
      const eventOther = { key: 'Enter' } as React.KeyboardEvent;
      expect(isArrowKey(eventOther)).toBe(false);
    });
  });

  describe('String utilities', () => {
    it('should capitalize first letter', () => {
      expect(capitalizeFirst('hello')).toBe('Hello');
      expect(capitalizeFirst('HELLO')).toBe('HELLO');
      expect(capitalizeFirst('')).toBe('');
    });

    it('should convert to kebab case', () => {
      expect(kebabCase('camelCase')).toBe('camel-case');
      expect(kebabCase('PascalCase')).toBe('pascal-case');
      expect(kebabCase('snake_case')).toBe('snake-case');
      expect(kebabCase('space separated')).toBe('space-separated');
    });
  });

  describe('Validation utilities', () => {
    it('should validate email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
      expect(isValidEmail('invalid.email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
    });

    it('should validate URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('http://localhost:3000')).toBe(true);
      expect(isValidURL('ftp://files.example.com')).toBe(true);
      expect(isValidURL('not-a-url')).toBe(false);
      expect(isValidURL('http://')).toBe(false);
    });
  });
});