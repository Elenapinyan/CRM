import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DropdownOptionValue } from '../../shared';
import { SprButtonComponent } from '../button/spr-button.component';
import { SprMultiSwitcherComponent } from '../multi-switcher/spr-multi-switcher.component';
import { SprInnerHeaderComponent } from './spr-inner-header.component';

interface CustomArgs {
  formControl: FormControl;
  currentSelectedValue: number;
}

const meta: Meta<SprInnerHeaderComponent & CustomArgs> = {
  title: 'shared components/InnerHeader',
  component: SprInnerHeaderComponent,
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
      imports: [SprMultiSwitcherComponent, SprButtonComponent, ReactiveFormsModule],
    }),
  ],
};

const formControl = new FormControl<DropdownOptionValue>(1, { nonNullable: true });

export const InnerHeader: StoryObj<SprInnerHeaderComponent & CustomArgs> = {
  args: {
    variant: 'default',
    title: 'Heading',
    withStartContent: true,
    withoutBorder: false,
    formControl,
    currentSelectedValue: 1,
  },
  render: (args) => {
    formControl.patchValue(args.currentSelectedValue, { emitEvent: false });

    return {
      props: args,
      template: `
      <spr-inner-header [withStartContent]="withStartContent" [variant]="variant" [title]="title" [withoutBorder]="withoutBorder">
        <spr-multi-switcher
          start
          [options]="[{text: 'Label', value: 1}, {text: 'Label', value: 2}, {text: 'Label', value: 3}]"
          [formControl]="formControl"
          [switcherId]="1"
        ></spr-multi-switcher>

        <div end class="btn-group-holder">
          <spr-button variant="link" size="sm">Label</spr-button>
          <spr-button variant="outline" size="sm">Label</spr-button>
          <spr-button size="sm">Label</spr-button>
        </div>
      </spr-inner-header>
    `,
    };
  },
};

export default meta;
