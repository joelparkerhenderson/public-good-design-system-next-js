import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/tokens';
import { Table } from './Table';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Table', () => {
  describe('Basic functionality', () => {
    it('renders basic table with rows and headers', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            head={[
              { text: "Skin symptoms" },
              { text: "Possible cause" }
            ]}
            rows={[
              [
                { text: "Blisters on lips or around the mouth" },
                { text: "cold sores" }
              ],
              [
                { text: "Itchy, dry, cracked, sore" },
                { text: "eczema" }
              ]
            ]}
          />
        </TestWrapper>
      );

      const table = container.querySelector('table');
      expect(table).toBeInTheDocument();
      expect(table).toHaveClass('nhsuk-table');
      
      expect(screen.getByText('Skin symptoms')).toBeInTheDocument();
      expect(screen.getByText('Possible cause')).toBeInTheDocument();
      expect(screen.getByText('Blisters on lips or around the mouth')).toBeInTheDocument();
      expect(screen.getByText('cold sores')).toBeInTheDocument();
      expect(screen.getByText('eczema')).toBeInTheDocument();
    });

    it('renders table without headers', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            rows={[
              [
                { text: "Monday" },
                { text: "9am to 6pm" }
              ],
              [
                { text: "Tuesday" },
                { text: "8am to 5pm" }
              ]
            ]}
          />
        </TestWrapper>
      );

      const table = container.querySelector('table');
      const thead = container.querySelector('thead');
      const tbody = container.querySelector('tbody');
      
      expect(table).toBeInTheDocument();
      expect(thead).not.toBeInTheDocument();
      expect(tbody).toBeInTheDocument();
      expect(screen.getByText('Monday')).toBeInTheDocument();
      expect(screen.getByText('9am to 6pm')).toBeInTheDocument();
      expect(screen.getByText('8am to 5pm')).toBeInTheDocument();
    });

    it('renders table with HTML content', () => {
      render(
        <TestWrapper>
          <Table 
            head={[{ html: "<strong>Name</strong>" }]}
            rows={[
              [{ html: "Sarah <em>Philips</em>" }]
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Name').tagName).toBe('STRONG');
      expect(screen.getByText('Philips')).toBeInTheDocument();
      expect(screen.getByText('Philips').tagName).toBe('EM');
    });
  });

  describe('Caption', () => {
    it('renders table with caption', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            caption="Skin symptoms and possible causes"
            rows={[[{ text: "Test" }]]}
          />
        </TestWrapper>
      );

      const caption = container.querySelector('caption');
      expect(caption).toBeInTheDocument();
      expect(caption).toHaveClass('nhsuk-table__caption');
      expect(screen.getByText('Skin symptoms and possible causes')).toBeInTheDocument();
    });

    it('applies caption classes', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            caption="Large caption"
            captionClasses="nhsuk-table__caption--l"
            rows={[[{ text: "Test" }]]}
          />
        </TestWrapper>
      );

      const caption = container.querySelector('caption');
      expect(caption).toHaveClass('nhsuk-table__caption--l');
    });

    it('applies visually hidden caption classes', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            caption="Hidden caption"
            captionClasses="nhsuk-u-visually-hidden"
            rows={[[{ text: "Test" }]]}
          />
        </TestWrapper>
      );

      const caption = container.querySelector('caption');
      expect(caption).toHaveClass('nhsuk-u-visually-hidden');
    });
  });

  describe('Responsive functionality', () => {
    it('renders responsive table with correct classes', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            responsive={true}
            head={[
              { text: "Age" },
              { text: "Dosage" }
            ]}
            rows={[
              [
                { header: "Age", text: "3 to 5 months" },
                { header: "Dosage", text: "2.5ml" }
              ]
            ]}
          />
        </TestWrapper>
      );

      const table = container.querySelector('table');
      expect(table).toHaveClass('nhsuk-table-responsive');
      expect(table).toHaveAttribute('role', 'table');
    });

    it('renders responsive headers for cells', () => {
      render(
        <TestWrapper>
          <Table 
            responsive={true}
            head={[{ text: "Age" }, { text: "Dosage" }]}
            rows={[
              [
                { header: "Age", text: "3 to 5 months" },
                { header: "Dosage", text: "2.5ml" }
              ]
            ]}
          />
        </TestWrapper>
      );

      // In responsive mode, headers are rendered as spans within cells
      const responsiveHeadings = document.querySelectorAll('.nhsuk-table-responsive__heading');
      expect(responsiveHeadings).toHaveLength(2);
    });
  });

  describe('First cell as header', () => {
    it('renders first cell as header when firstCellIsHeader is true', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            firstCellIsHeader={true}
            head={[
              { text: "Day" },
              { text: "Hours" }
            ]}
            rows={[
              [
                { text: "Monday" },
                { text: "9am to 6pm" }
              ]
            ]}
          />
        </TestWrapper>
      );

      const firstCellHeader = container.querySelector('tbody th[scope="row"]');
      expect(firstCellHeader).toBeInTheDocument();
      expect(firstCellHeader).toHaveTextContent('Monday');
    });

    it('renders normal cells when firstCellIsHeader is false', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            firstCellIsHeader={false}
            rows={[
              [
                { text: "Monday" },
                { text: "9am to 6pm" }
              ]
            ]}
          />
        </TestWrapper>
      );

      const firstCell = container.querySelector('tbody td');
      expect(firstCell).toBeInTheDocument();
      expect(firstCell).toHaveTextContent('Monday');
      
      const headerCell = container.querySelector('tbody th');
      expect(headerCell).not.toBeInTheDocument();
    });
  });

  describe('Numeric formatting', () => {
    it('applies numeric formatting to cells', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            head={[
              { text: "Item", format: "numeric" }
            ]}
            rows={[
              [
                { text: "123.45", format: "numeric" }
              ]
            ]}
          />
        </TestWrapper>
      );

      const numericHeader = container.querySelector('.nhsuk-table__header--numeric');
      const numericCell = container.querySelector('.nhsuk-table__cell--numeric');
      
      expect(numericHeader).toBeInTheDocument();
      expect(numericCell).toBeInTheDocument();
    });
  });

  describe('Cell spans', () => {
    it('applies colspan and rowspan attributes', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            head={[
              { text: "Header 1", colspan: 2 },
              { text: "Header 2" }
            ]}
            rows={[
              [
                { text: "Cell 1", rowspan: 2 },
                { text: "Cell 2" },
                { text: "Cell 3" }
              ]
            ]}
          />
        </TestWrapper>
      );

      const colspanHeader = container.querySelector('th[colspan="2"]');
      const rowspanCell = container.querySelector('td[rowspan="2"]');
      
      expect(colspanHeader).toBeInTheDocument();
      expect(rowspanCell).toBeInTheDocument();
    });
  });

  describe('Panel mode', () => {
    it('renders table in panel mode with heading', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            panel={true}
            heading="Conditions similar to impetigo"
            rows={[[{ text: "Test content" }]]}
          />
        </TestWrapper>
      );

      const panel = container.querySelector('.nhsuk-table__panel-with-heading-tab');
      const heading = container.querySelector('.nhsuk-table__heading-tab');
      
      expect(panel).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Conditions similar to impetigo');
      expect(heading?.tagName).toBe('H3'); // Default heading level
    });

    it('renders panel with custom heading level', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            panel={true}
            heading="Custom heading"
            headingLevel={2}
            rows={[[{ text: "Test content" }]]}
          />
        </TestWrapper>
      );

      const heading = container.querySelector('.nhsuk-table__heading-tab');
      expect(heading?.tagName).toBe('H2');
    });

    it('renders panel without heading when not provided', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            panel={true}
            rows={[[{ text: "Test content" }]]}
          />
        </TestWrapper>
      );

      const panel = container.querySelector('.nhsuk-table__panel-with-heading-tab');
      const heading = container.querySelector('.nhsuk-table__heading-tab');
      
      expect(panel).toBeInTheDocument();
      expect(heading).not.toBeInTheDocument();
    });

    it('applies panel classes', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            panel={true}
            panelClasses="custom-panel-class"
            rows={[[{ text: "Test content" }]]}
          />
        </TestWrapper>
      );

      const panel = container.querySelector('.nhsuk-table__panel-with-heading-tab');
      expect(panel).toHaveClass('custom-panel-class');
    });
  });

  describe('Custom styling and attributes', () => {
    it('applies table classes', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            tableClasses="custom-table-class"
            rows={[[{ text: "Test" }]]}
          />
        </TestWrapper>
      );

      const table = container.querySelector('table');
      expect(table).toHaveClass('custom-table-class');
    });

    it('applies cell classes', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            head={[{ text: "Header", classes: "custom-header-class" }]}
            rows={[[{ text: "Cell", classes: "custom-cell-class nhsuk-u-text-break-word" }]]}
          />
        </TestWrapper>
      );

      const header = container.querySelector('.custom-header-class');
      const cell = container.querySelector('.custom-cell-class.nhsuk-u-text-break-word');
      
      expect(header).toBeInTheDocument();
      expect(cell).toBeInTheDocument();
    });

    it('applies custom attributes', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            attributes={{ 'data-custom': 'value' }}
            rows={[[{ text: "Test" }]]}
          />
        </TestWrapper>
      );

      const table = container.querySelector('table');
      expect(table).toHaveAttribute('data-custom', 'value');
    });

    it('applies data-testid', () => {
      render(
        <TestWrapper>
          <Table 
            data-testid="table-test"
            rows={[[{ text: "Test" }]]}
          />
        </TestWrapper>
      );

      expect(screen.getByTestId('table-test')).toBeInTheDocument();
    });

    it('applies additional className', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            className="additional-class"
            rows={[[{ text: "Test" }]]}
          />
        </TestWrapper>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('additional-class');
    });
  });

  describe('Healthcare use cases', () => {
    it('renders medical symptoms table', () => {
      render(
        <TestWrapper>
          <Table 
            caption="Skin symptoms and possible causes"
            head={[
              { text: "Skin symptoms" },
              { text: "Possible cause" }
            ]}
            rows={[
              [
                { text: "Blisters on lips or around the mouth" },
                { text: "cold sores" }
              ],
              [
                { text: "Itchy, dry, cracked, sore" },
                { text: "eczema" }
              ],
              [
                { text: "Itchy blisters" },
                { text: "shingles, chickenpox" }
              ]
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Skin symptoms and possible causes')).toBeInTheDocument();
      expect(screen.getByText('Blisters on lips or around the mouth')).toBeInTheDocument();
      expect(screen.getByText('cold sores')).toBeInTheDocument();
      expect(screen.getByText('shingles, chickenpox')).toBeInTheDocument();
    });

    it('renders medication dosage table in responsive mode', () => {
      render(
        <TestWrapper>
          <Table 
            caption="Ibuprofen syrup dosages for children"
            responsive={true}
            head={[
              { text: "Age" },
              { text: "How much?", format: "numeric" },
              { text: "How often?" }
            ]}
            rows={[
              [
                { header: "Age", text: "3 to 5 months (weighing more than 5kg)" },
                { header: "How much?", text: "2.5ml", format: "numeric" },
                { header: "How often?", text: "Max 3 times in 24 hours" }
              ],
              [
                { header: "Age", text: "6 to 11 months" },
                { header: "How much?", text: "2.5ml", format: "numeric" },
                { header: "How often?", text: "Max 3 to 4 times in 24 hours" }
              ]
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Ibuprofen syrup dosages for children')).toBeInTheDocument();
      expect(screen.getByText('3 to 5 months (weighing more than 5kg)')).toBeInTheDocument();
      expect(screen.getByText('Max 3 times in 24 hours')).toBeInTheDocument();
    });

    it('renders opening hours table with first cell as header', () => {
      render(
        <TestWrapper>
          <Table 
            firstCellIsHeader={true}
            head={[
              { text: "Day of the week" },
              { text: "Opening hours" }
            ]}
            rows={[
              [
                { text: "Monday" },
                { text: "9am to 6pm" }
              ],
              [
                { text: "Tuesday" },
                { text: "9am to 6pm" }
              ],
              [
                { text: "Saturday" },
                { text: "9am to 1pm" }
              ],
              [
                { text: "Sunday" },
                { text: "Closed" }
              ]
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Day of the week')).toBeInTheDocument();
      expect(screen.getByText('Opening hours')).toBeInTheDocument();
      expect(screen.getByText('Monday')).toBeInTheDocument();
      expect(screen.getAllByText('9am to 6pm')).toHaveLength(2);
      expect(screen.getByText('9am to 1pm')).toBeInTheDocument();
      expect(screen.getByText('Closed')).toBeInTheDocument();
    });

    it('renders user management table with action links', () => {
      render(
        <TestWrapper>
          <Table 
            caption="Users"
            head={[
              { text: "Name" },
              { text: "Email address" },
              { text: "Status" },
              { html: '<span class="nhsuk-u-visually-hidden">Actions</span>' }
            ]}
            rows={[
              [
                { text: "Stephanie Meyer", classes: "nhsuk-u-text-break-word" },
                { text: "stephanie.meyer9@test.com", classes: "nhsuk-u-text-break-word" },
                { text: "Active" },
                { html: '<a href="#">Change <span class="nhsuk-u-visually-hidden">status for Stephanie Meyer</span></a>' }
              ]
            ]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Users')).toBeInTheDocument();
      expect(screen.getByText('Stephanie Meyer')).toBeInTheDocument();
      expect(screen.getByText('stephanie.meyer9@test.com')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Change status for Stephanie Meyer/ })).toBeInTheDocument();
    });

    it('renders conditions comparison panel', () => {
      const { container } = render(
        <TestWrapper>
          <Table 
            panel={true}
            heading="Conditions similar to impetigo"
            caption="Other possible causes of your symptoms"
            captionClasses="nhsuk-u-visually-hidden"
            head={[
              { text: "Symptoms" },
              { text: "Possible cause" }
            ]}
            rows={[
              [
                { text: "Blisters on lips or around the mouth" },
                { text: "cold sores" }
              ],
              [
                { text: "Itchy, dry, cracked, sore" },
                { text: "eczema" }
              ],
              [
                { text: "Itchy blisters" },
                { text: "shingles, chickenpox" }
              ]
            ]}
          />
        </TestWrapper>
      );

      const panel = container.querySelector('.nhsuk-table__panel-with-heading-tab');
      const heading = container.querySelector('.nhsuk-table__heading-tab');
      
      expect(panel).toBeInTheDocument();
      expect(heading).toHaveTextContent('Conditions similar to impetigo');
      expect(screen.getByText('Blisters on lips or around the mouth')).toBeInTheDocument();
      expect(screen.getByText('cold sores')).toBeInTheDocument();
    });
  });

  describe('Component display name', () => {
    it('has correct display name', () => {
      expect(Table.displayName).toBe('Table');
    });
  });
});