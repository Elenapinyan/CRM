import { Meta, StoryObj } from '@storybook/angular';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGrid } from './ag-grid-example';
import { mockGridData } from './ag-grid-example.mock';
import Readme from './README.md';

interface CustomArgs {}

const meta: Meta<AgGrid & CustomArgs> = {
  title: 'Grid/Simple Example',
  component: AgGrid,
  parameters: {
    docs: {
      description: {
        component: Readme,
      },
    },
  },
  decorators: [],
  argTypes: {},
};

export const AgGridStory: StoryObj<AgGrid & CustomArgs> = {
  args: {
    rowData: mockGridData,
    columnDefs: [
      { field: 'athlete', wrapText: false },
      { field: 'age', maxWidth: 100, cellStyle: { textAlign: 'right' } },
      {
        field: 'date',
      },
      { field: 'country' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ],
    isRowHovered: true,
    size: 'md',
    bgColor: 'default',
  },
  argTypes: {
    columnDefs: {
      table: {
        disable: true,
      },
      control: false,
    },
    rowData: {
      table: {
        disable: true,
      },
      control: false,
    },
    isRowHovered: {
      description: 'Are rows hovered',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        category: 'ONLY FOR STORYBOOK',
        defaultValue: { summary: 'true' },
      },
    },
    size: {
      description: 'Table size',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        category: 'ONLY FOR STORYBOOK',
        defaultValue: { summary: 'md' },
      },
    },
    bgColor: {
      description: 'Available row background colors (will be applied to the 3D row)',
      control: { type: 'select' },
      options: ['default', 'selected', 'sum', 'drag-sum', 'error'],
      table: {
        type: { summary: `'default' | 'selected' | 'sum' | 'drag-sum' | 'error'` },
        category: 'ONLY FOR STORYBOOK',
        defaultValue: { summary: 'default' },
      },
    },
  },
  render: (args) => {
    ModuleRegistry.registerModules([AllCommunityModule]);

    return {
      props: { ...args },
      template: `
        <section class="storybook-section" style="height: 600px;">
          <h4 class="storybook-title">Example component with Ag Grid</h4>
          <spr-ag-grid-example [columnDefs]="columnDefs" [bgColor]="bgColor" [size]="size" [isRowHovered]="isRowHovered" [rowData]="rowData"></spr-ag-grid-example>
        </section>
        `,
    };
  },
};

export default meta;
