import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsSlider } from './slider';

const formControl = new FormControl(0, { nonNullable: true, validators: [Validators.required] });
const rangeFormControl = new FormControl([10, 50], { nonNullable: true, validators: [Validators.required] });

interface CustomArgs {
  formControl: FormControl;
  rangeFormControl: FormControl;
  isDisabled: boolean;
}

const meta: Meta<DsSlider & CustomArgs> = {
  title: 'shared components/Slider',
  component: DsSlider,
  parameters: {
    docs: {
      description: {
        component: `
The **Slider** component allows for the selection of a value from a range via mouse, touch, or keyboard, similar to \\<input type="range"\\>.

- **isRange**: Enables range selection mode for Range component. Default is false.
- **min**: Minimum value. By default is 0.
- **max**: Maximum value. By default is 100.
- **step**: Specifies the legal number intervals. By default is 1.
- **showMinMaxLabels**: Toggles the visibility of the minimum and maximum value labels.
- **showTickMarks**: Toggles the visibility of tick marks on the track.
- **thumbTextTransformer**: Custom transformer function used to modify the displayed thumb text.

### Usage Example:
\`\`\`html
<ds-slider
  [formControl]="control"
  [isRange]="true"
  [min]="0"
  [max]="200"
  [step]="10"
  [showMinMaxLabels]="true"
  [showTickMarks]="true"
  [thumbTextTransformer]="textTransformerFunction"
  />
\`\`\`

### Default options.
####You can change default option by provide custom value for **SLIDER_DEFAULT_OPTIONS** token:

\`\`\`typescript
providers: [
  {
    provide: SLIDER_DEFAULT_OPTIONS,
    useValue: {
      min: 0,
      max: 100,
      step: 1,
      showTickMarks: false,
      showMinMaxLabels: false,
      thumbTextTransformer: (v: string): string => v,
    }
  }
]
\`\`\`
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule],
    }),
  ],
  args: {
    isRange: false,
    showTickMarks: false,
    showMinMaxLabels: false,
    formControl,
    rangeFormControl,
    isDisabled: false,
    min: 0,
    max: 100,
    step: 1,
  },
  argTypes: {
    formControl: {
      table: { disable: true },
    },
    rangeFormControl: {
      table: { disable: true },
    },
    isRange: {
      description: 'Enables range selection mode for Range component',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showTickMarks: {
      description: 'Toggles the visibility of tick marks on the track',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showMinMaxLabels: {
      description: 'Toggles the visibility of the minimum and maximum value labels',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    min: {
      description: 'Minimum value',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },

    max: {
      description: 'Maximum value',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    step: {
      description: 'Specifies the legal number intervals',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    thumbTextTransformer: {
      description: 'Custom transformer function used to modify the displayed thumb text',
    },
    isDisabled: {
      description: 'Disable the input to prevent user interactions.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  render: (args) => {
    if (args.isDisabled) {
      args.formControl.disable();
      args.rangeFormControl.disable();
    } else {
      args.formControl.enable();
      args.rangeFormControl.enable();
    }
    return {
      props: {
        ...args,
        thumbTextTransformer: (v: string) => v,
      },
      template: `
        <ds-slider
        [formControl]="isRange ? rangeFormControl : formControl"
        [isRange]="isRange"
        [min]="min"
        [max]="max"
        [step]="step"
        [showMinMaxLabels]="showMinMaxLabels"
        [showTickMarks]="showTickMarks"
        [thumbTextTransformer]="thumbTextTransformer"
         />
      `,
    };
  },
};

export const Input: StoryObj<DsSlider & CustomArgs> = {};

export default meta;
