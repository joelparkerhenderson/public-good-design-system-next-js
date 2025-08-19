'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface ImagesProps extends BaseComponentProps {
  /** The source location of the image */
  src: string;
  /** The alt text of the image */
  alt: string;
  /** Optional caption text for the image */
  caption?: string;
  /** A list of screen sizes for the browser to load the correct image from the srcset images */
  sizes?: string;
  /** A list of image source URLs and their respective sizes */
  srcset?: string;
  /** Classes to add to the image container */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const ImageFigure = styled.figure`
  margin: 0 0 ${({ theme }) => theme.spacing[6]};
  display: block;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ImageElement = styled.img`
  display: block;
  height: auto;
  max-width: 100%;
  width: 100%;
  border: 0;
`;

const ImageCaption = styled.figcaption`
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: ${({ theme }) => theme.spacing[3]};
  padding: 0;
  
  /* Support for HTML content in captions */
  p {
    margin: 0 0 ${({ theme }) => theme.spacing[3]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
  
  em {
    font-style: italic;
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    
    &:hover {
      text-decoration: none;
    }
    
    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.focus};
      outline-offset: 2px;
    }
  }
`;

/**
 * Images Component
 * 
 * A component for displaying images with optional captions, responsive image support,
 * and proper semantic markup. Supports both basic images and responsive images with
 * srcset and sizes attributes. Converted from NHS UK Design System images component.
 * 
 * @example
 * ```tsx
 * // Basic image
 * <Images 
 *   src="/images/health-check.jpg"
 *   alt="Healthcare professional checking patient's blood pressure"
 * />
 * 
 * // Image with caption
 * <Images 
 *   src="/images/vaccination.jpg"
 *   alt="NHS nurse administering COVID-19 vaccine"
 *   caption="COVID-19 vaccines are safe and effective in preventing serious illness"
 * />
 * 
 * // Responsive image with srcset
 * <Images 
 *   src="/images/hospital-600w.jpg"
 *   srcset="/images/hospital-600w.jpg 600w, /images/hospital-1200w.jpg 1200w"
 *   sizes="(max-width: 768px) 100vw, 50vw"
 *   alt="Modern NHS hospital building"
 *   caption="Our state-of-the-art facilities provide world-class healthcare"
 * />
 * ```
 */
export const Images: React.FC<ImagesProps> = ({
  src,
  alt,
  caption,
  sizes,
  srcset,
  classes,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const figureClasses = [
    'nhsuk-image',
    classes
  ].filter(Boolean).join(' ');

  const renderCaption = () => {
    if (!caption) return null;
    
    return (
      <ImageCaption className="nhsuk-image__caption">
        <span dangerouslySetInnerHTML={{ __html: caption }} />
      </ImageCaption>
    );
  };

  return (
    <ImageFigure
      className={`${figureClasses}${className ? ` ${className}` : ''}`}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      <ImageElement
        className="nhsuk-image__img"
        src={src}
        alt={alt}
        sizes={sizes}
        srcSet={srcset}
      />
      {renderCaption()}
    </ImageFigure>
  );
};

Images.displayName = 'Images';