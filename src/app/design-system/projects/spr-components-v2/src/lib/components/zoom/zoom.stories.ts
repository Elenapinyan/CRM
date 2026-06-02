import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { Zoom } from './zoom';
import { DEFAULT_MAX, DEFAULT_MIN, DEFAULT_STEP, DEFAULT_UNIT } from './zoom.options';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

const meta: Meta<Zoom> = {
  title: 'shared components/Zoom',
  component: Zoom,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `**Zoom** component.`,
      },
    },
  },
  argTypes: {
    step: {
      description: 'This property lets you to specify the step of increasing/decreasing.',
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: DEFAULT_STEP.toString(),
        },
      },
    },
    min: {
      description: 'This property lets you to specify the minimal possible value',
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: DEFAULT_MIN.toString(),
        },
      },
    },
    max: {
      description: 'This property lets you to specify the maximal possible value',
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: DEFAULT_MAX.toString(),
        },
      },
    },
    unit: {
      description: 'You can specify the unit which will be displayed next to value',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: DEFAULT_UNIT,
        },
      },
    },
  },
};

interface CustomArgs {
  formControl: FormControl;
}

const formControl = new FormControl(37);

export const List: StoryObj<Zoom & CustomArgs> = {
  args: {
    step: DEFAULT_STEP,
    min: DEFAULT_MIN,
    max: DEFAULT_MAX,
    unit: DEFAULT_UNIT,
    formControl,
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <div>
          <ds-zoom [step]="step" [min]="min" [max]="max" [unit]="unit" [formControl]="formControl" />
        </div>
      `,
    };
  },
};

export default meta;
