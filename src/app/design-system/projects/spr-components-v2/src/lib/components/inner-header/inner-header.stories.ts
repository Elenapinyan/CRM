import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DropdownOptionValue } from '../../shared';
import { DsButton } from '../button';
import { SegmentedControlModel, DsSegmentedControls } from '../segmented-controls';
import { DsInnerHeaderComponent } from './inner-header.component';

const SegmentedControlsMocks: SegmentedControlModel[] = [
  {
    id: 1,
    text: 'Fiat',
  },
  {
    id: 2,
    text: 'Crypto',
  },
];

interface CustomArgs {
  formControl: FormControl;
  currentSelectedValue: number;
  items: SegmentedControlModel[];
  activeItemId: number;
}

const meta: Meta<DsInnerHeaderComponent & CustomArgs> = {
  title: 'shared components/InnerHeader',
  component: DsInnerHeaderComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **InnerHeader** component is used to display a header within a page section, providing context and controls for that section. It is designed to be versatile and customizable, making it an essential tool for building structured and user-friendly interfaces in Angular applications.

## Overview

The \`InnerHeaderComponent\` can display a title and various controls within a header section. This component supports multiple variants to define its visual style, ensuring it fits seamlessly into your application's design. It is often used to provide context and interaction options at the top of a page or section.

## Key Features

- **Variants:** Multiple visual styles to match your application's design.
- **Title:** Displays a title within the header.
- **Flexible Layout:** Supports different layouts using custom
        `,
      },
    },
  },
  argTypes: {
    variant: {
      options: ['default', 'background', 'no-padding-inline', 'small', 'large'],
      control: {
        type: 'select',
      },
      description: 'Choose the innerHeader variant to define its visual style.',
      table: {
        type: {
          summary: ' default | background | no-padding-inline | small | large',
        },
        defaultValue: {
          summary: 'default',
        },
      },
    },
    title: {
      description: 'The title to be displayed.',
    },
    formControl: { table: { disable: true } },
    currentSelectedValue: { table: { disable: true } },
    withStartContent: { table: { disable: true } },
    withoutBorder: { description: 'This option adds or removes the bottom border in the header' },
  },
  decorators: [
    moduleMetadata({
      imports: [DsSegmentedControls, DsButton, ReactiveFormsModule],
    }),
  ],
};

const formControl = new FormControl<DropdownOptionValue>(1, { nonNullable: true });

export const InnerHeader: StoryObj<DsInnerHeaderComponent & CustomArgs> = {
  args: {
    variant: 'default',
    title: 'Heading',
    withStartContent: true,
    withoutBorder: false,
    formControl,
    currentSelectedValue: 1,
    items: SegmentedControlsMocks,
    activeItemId: 1,
  },
  render: (args) => {
    formControl.patchValue(args.currentSelectedValue, { emitEvent: false });

    return {
      props: args,
      template: `
      <ds-inner-header [withStartContent]="withStartContent" [variant]="variant" [title]="title" [withoutBorder]="withoutBorder">
        <ds-segmented-controls start
            [items]="items" [(activeItemId)]="activeItemId"/>

        <div end class="btn-group-holder">
          <ds-button variant="secondary" size="md">Secondary</ds-button>
          <ds-button variant="main" size="md">Main button</ds-button>
        </div>
      </ds-inner-header>
    `,
    };
  },
};

export default meta;
