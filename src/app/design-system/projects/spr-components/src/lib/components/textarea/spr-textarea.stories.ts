import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { v7 } from 'uuid';
import { SprButtonComponent } from '../button/spr-button.component';
import { SprTextareaComponent } from './spr-textarea.component';
import { fn } from '@storybook/test';

const formControl = new FormControl(null, { nonNullable: true, validators: [Validators.required] });

const meta: Meta<SprTextareaComponent & { formControl: FormControl }> = {
  title: 'shared components/Textarea',
  component: SprTextareaComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, SprButtonComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The **Textarea** component allows users to input multiple lines of text. It supports various configurations to enhance its usability and appearance.

- **Control Size:** Adjust the size of the textarea control to fit different form layouts.
- **Tooltip:** Provide additional information through a tooltip.
- **Label and Description:** Display a label and description to guide users.
- **Max Length:** Specify the maximum number of characters allowed.
- **Colored:** Option to apply colored styling to the textarea.
- **Disability:** Option to disable the component, preventing user interaction.

This component enhances user experience by providing a clear and intuitive interface for text input.
        `,
      },
    },
  },
  argTypes: {
    controlSize: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
      description: 'Adjust the size of the textarea control.',
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    inputId: {
      description: 'This is equivalent to the basic HTML id attribute.',
      control: {
        disable: true,
      },
    },
    isDisabled: {
      description: 'Disable the textarea to prevent user interactions.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    maxTextareaLength: {
      description: 'Specify the maximum number of characters allowed.',
      control: 'number',
      table: {
        defaultValue: {
          summary: '1000',
        },
      },
    },
    label: {
      description: 'The text to display as the label for the textarea.',
    },
    description: {
      description: 'The text to display as the description for the textarea.',
    },
    tooltip: {
      description: 'The text to display within the tooltip.',
    },
    tooltipClassForLabel: {
      description: 'Tooltip class for label.',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'tooltip-container__body tooltip-white' },
      },
    },
    isColored: {
      description: 'Option to apply colored styling to the textarea.',
    },
    placeholder: {
      description: 'The text to display as the placeholder for the input.',
    },
    formControl: {
      table: { disable: true },
    },
    errorMessages: {
      description: 'Custom error messages for validation.',
    },

    blurEvent: {
      action: 'blurEvent',
      description: 'Trigger, when inner textarea loses focus (emit "blur" event)',
      table: {
        category: 'Outputs',
      },
    },
  },
};

export const Textarea: StoryObj<SprTextareaComponent & { formControl: FormControl }> = {
  args: {
    maxTextareaLength: 1000,
    isDisabled: false,
    placeholder: 'Placeholder',
    label: 'Label text',
    description: 'Description',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'tooltip-container__body tooltip-white',
    controlSize: 'md',
    isColored: false,
    inputId: v7(),
    formControl,
    errorMessages: {
      required: 'This field is required',
    },
    blurEvent: fn(),
  },

  render: (args) => {
    if (args.isDisabled) {
      args.formControl.disable();
    } else {
      args.formControl.enable();
    }

    return {
      props: {
        ...args,
      },
      template: `
       <spr-textarea
        #area
        [maxTextareaLength]="maxTextareaLength"
        [errorMessages]="errorMessages"
        [formControl]="formControl"
        [placeholder]="placeholder"
        [controlSize]="controlSize"
        [description]="description"
        [isColored]="isColored"
        [inputId]="inputId"
        [tooltip]="tooltip"
        [tooltipClassForLabel]="tooltipClassForLabel"
        [label]="label"
        (blurEvent)="blurEvent($event)"
       ></spr-textarea>

        <spr-button style="padding: 16px 0" variant="outline" (click)="area.focus()">Manual focus</spr-button>
      `,
    };
  },
};

export default meta;
