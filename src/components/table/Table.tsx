'use client';

import React from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '@/types';

export interface TableCell {
  /** Text to use within the cell */
  text?: string;
  /** HTML to use within the cell */
  html?: string;
  /** Header text for responsive table rows only */
  header?: string;
  /** Specify format of a cell. Currently we only use 'numeric' */
  format?: 'numeric';
  /** Specify how many columns a cell extends */
  colspan?: number;
  /** Specify how many rows a cell extends */
  rowspan?: number;
  /** Additional classes for the cell */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

export interface TableHeadCell {
  /** Text to use within the header cell */
  text?: string;
  /** HTML to use within the header cell */
  html?: string;
  /** Specify format of a cell. Currently we only use 'numeric' */
  format?: 'numeric';
  /** Specify how many columns a cell extends */
  colspan?: number;
  /** Specify how many rows a cell extends */
  rowspan?: number;
  /** Additional classes for the header cell */
  classes?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

export interface TableProps extends BaseComponentProps {
  /** Array of table rows and cells */
  rows: TableCell[][];
  /** Array of table head cells */
  head?: TableHeadCell[];
  /** Heading/label of the panel if the panel argument is set to true */
  heading?: string;
  /** Optional heading level for the heading. Defaults to 3 */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Caption text */
  caption?: string;
  /** Classes for caption text size */
  captionClasses?: string;
  /** If set to true, first cell in table row will be a TH instead of a TD */
  firstCellIsHeader?: boolean;
  /** If set to true, responsive table classes will be applied */
  responsive?: boolean;
  /** If set to true, table will be wrapped in a panel */
  panel?: boolean;
  /** Classes to add to the table container */
  tableClasses?: string;
  /** Additional CSS classes for the panel (only used with panel=true) */
  panelClasses?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string>;
}

const TableContainer = styled.div<{ $panel?: boolean }>`
  ${({ $panel, theme }) => $panel && `
    background-color: ${theme.colors.background};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.base};
    padding: 0;
    margin: 0 0 ${theme.spacing[6]} 0;
  `}
`;

const TableHeading = styled.h3<{ $level: number }>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  
  ${({ $level }) => $level === 1 && `
    font-size: 2rem;
  `}
  
  ${({ $level }) => $level === 2 && `
    font-size: 1.5rem;
  `}
  
  ${({ $level }) => $level === 4 && `
    font-size: 1.125rem;
  `}
  
  ${({ $level }) => $level === 5 && `
    font-size: 1rem;
  `}
  
  ${({ $level }) => $level === 6 && `
    font-size: 0.875rem;
  `}
`;

const StyledTable = styled.table<{ $responsive?: boolean; $panel?: boolean }>`
  border-collapse: collapse;
  width: 100%;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  
  ${({ $panel }) => $panel && `
    margin: 0;
  `}
  
  ${({ $panel, theme }) => !$panel && `
    margin: 0 0 ${theme.spacing[6]} 0;
  `}
  
  ${({ $responsive, theme }) => $responsive && `
    @media (max-width: 768px) {
      thead {
        display: none;
      }
      
      tbody tr {
        display: block;
        border: 1px solid ${theme.colors.border};
        margin-bottom: ${theme.spacing[3]};
        padding: ${theme.spacing[3]};
      }
      
      tbody td, tbody th {
        display: block;
        text-align: left !important;
        border: none;
        padding: ${theme.spacing[1]} 0;
        
        &:before {
          content: attr(data-label) ": ";
          font-weight: ${theme.typography.fontWeight.semibold};
          display: inline-block;
          width: 100%;
          margin-bottom: ${theme.spacing[1]};
        }
      }
    }
  `}
`;

const TableCaption = styled.caption`
  caption-side: top;
  text-align: left;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text};
  
  &.nhsuk-table__caption--l {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
  
  &.nhsuk-table__caption--m {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
  
  &.nhsuk-table__caption--s {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
  
  &.nhsuk-u-visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th<{ $format?: string; $numeric?: boolean }>`
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[2]};
  text-align: left;
  vertical-align: top;
  color: ${({ theme }) => theme.colors.text};
  
  ${({ $numeric, $format }) => ($numeric || $format === 'numeric') && `
    text-align: right;
  `}
  
  &:first-child {
    padding-left: 0;
  }
  
  &:last-child {
    padding-right: 0;
  }
`;

const TableCell = styled.td<{ $format?: string; $numeric?: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[2]};
  text-align: left;
  vertical-align: top;
  color: ${({ theme }) => theme.colors.text};
  word-wrap: break-word;
  
  ${({ $numeric, $format }) => ($numeric || $format === 'numeric') && `
    text-align: right;
    font-variant-numeric: tabular-nums;
  `}
  
  &:first-child {
    padding-left: 0;
  }
  
  &:last-child {
    padding-right: 0;
  }
  
  &.nhsuk-u-text-break-word {
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;

const ResponsiveHeading = styled.span`
  display: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  
  @media (max-width: 768px) {
    display: inline;
  }
`;

/**
 * Table Component
 * 
 * Used to present information in a structured, scannable format. Tables can show 
 * relationships between different types of data, such as medical dosages, opening 
 * hours, or symptom comparisons.
 * 
 * @example
 * ```tsx
 * // Basic table
 * <Table 
 *   caption="Skin symptoms and possible causes"
 *   head={[
 *     { text: "Skin symptoms" },
 *     { text: "Possible cause" }
 *   ]}
 *   rows={[
 *     [
 *       { text: "Blisters on lips or around the mouth" },
 *       { text: "cold sores" }
 *     ],
 *     [
 *       { text: "Itchy, dry, cracked, sore" },
 *       { text: "eczema" }
 *     ]
 *   ]}
 * />
 * 
 * // Responsive table with dosage information
 * <Table 
 *   caption="Ibuprofen syrup dosages for children"
 *   responsive={true}
 *   head={[
 *     { text: "Age" },
 *     { text: "How much?" },
 *     { text: "How often?" }
 *   ]}
 *   rows={[
 *     [
 *       { header: "Age", text: "3 to 5 months" },
 *       { header: "How much?", text: "2.5ml" },
 *       { header: "How often?", text: "Max 3 times in 24 hours" }
 *     ]
 *   ]}
 * />
 * ```
 */
export const Table: React.FC<TableProps> = ({
  rows,
  head,
  heading,
  headingLevel = 3,
  caption,
  captionClasses,
  firstCellIsHeader = false,
  responsive = false,
  panel = false,
  tableClasses,
  panelClasses,
  attributes,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  const renderCell = (cell: TableCell, isFirst: boolean, rowIndex: number, cellIndex: number) => {
    const commonProps = {
      colSpan: cell.colspan,
      rowSpan: cell.rowspan,
      className: `${cell.format ? `nhsuk-table__cell--${cell.format}` : ''} ${cell.classes || ''}`.trim() || undefined,
      'data-label': responsive && cell.header ? cell.header : undefined,
      ...cell.attributes
    };

    const content = (
      <>
        {responsive && cell.header && (
          <ResponsiveHeading className="nhsuk-table-responsive__heading" aria-hidden="true">
            {cell.header}{' '}
          </ResponsiveHeading>
        )}
        {cell.html ? (
          <span dangerouslySetInnerHTML={{ __html: cell.html }} />
        ) : (
          cell.text
        )}
      </>
    );

    if (isFirst && firstCellIsHeader) {
      return (
        <TableHeader
          key={cellIndex}
          as="th"
          scope="row"
          $format={cell.format}
          $numeric={cell.format === 'numeric'}
          role={responsive ? 'rowheader' : undefined}
          {...commonProps}
        >
          {content}
        </TableHeader>
      );
    }

    return (
      <TableCell
        key={cellIndex}
        $format={cell.format}
        $numeric={cell.format === 'numeric'}
        role={responsive ? 'cell' : undefined}
        {...commonProps}
      >
        {content}
      </TableCell>
    );
  };

  const tableElement = (
    <StyledTable
      className={`nhsuk-table${responsive ? '-responsive' : ''} ${tableClasses || ''}`.trim()}
      $responsive={responsive}
      $panel={panel}
      role={responsive ? 'table' : undefined}
      data-testid={dataTestId}
      {...attributes}
      {...rest}
    >
      {caption && (
        <TableCaption className={`nhsuk-table__caption ${captionClasses || ''}`.trim()}>
          {caption}
        </TableCaption>
      )}
      
      {head && (
        <TableHead className="nhsuk-table__head" role={responsive ? 'rowgroup' : undefined}>
          <TableRow role={responsive ? 'row' : undefined}>
            {head.map((headerCell, index) => (
              <TableHeader
                key={index}
                scope="col"
                className={`nhsuk-table__header${headerCell.format ? ` nhsuk-table__header--${headerCell.format}` : ''} ${headerCell.classes || ''}`.trim()}
                colSpan={headerCell.colspan}
                rowSpan={headerCell.rowspan}
                $format={headerCell.format}
                $numeric={headerCell.format === 'numeric'}
                role={responsive ? 'columnheader' : undefined}
                {...headerCell.attributes}
              >
                {headerCell.html ? (
                  <span dangerouslySetInnerHTML={{ __html: headerCell.html }} />
                ) : (
                  headerCell.text
                )}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
      )}
      
      <TableBody className="nhsuk-table__body">
        {rows.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className="nhsuk-table__row"
            role={responsive ? 'row' : undefined}
          >
            {row.map((cell, cellIndex) => 
              renderCell(cell, cellIndex === 0, rowIndex, cellIndex)
            )}
          </TableRow>
        ))}
      </TableBody>
    </StyledTable>
  );

  if (panel) {
    return (
      <TableContainer
        $panel={panel}
        className={`nhsuk-table__panel-with-heading-tab ${panelClasses || ''}`.trim()}
      >
        {heading && (
          <TableHeading as={HeadingTag} className="nhsuk-table__heading-tab" $level={headingLevel}>
            {heading}
          </TableHeading>
        )}
        {tableElement}
      </TableContainer>
    );
  }

  return (
    <div className={className}>
      {tableElement}
    </div>
  );
};

Table.displayName = 'Table';