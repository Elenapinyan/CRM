import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SegmentedControlsMocks } from './segmented-control.mocks';
import { DsSegmentedControls } from './segmented-controls';

interface CustomArgs {
  control: FormControl;
}

const meta: Meta<DsSegmentedControls & CustomArgs> = {
  title: 'shared components/SegmentedControl/Segmented Controls',
  component: DsSegmentedControls,
  parameters: {
    docs: {
      description: {
        component: `
The **SegmentedControls** is a UI element which shows SegmentedControl list with ability to select an active element.

### Usage example:

##### With Angular model for active item
\`\`\`html
<ds-segmented-controls
  [items]="items"
  [(activeItemId)]="activeItemId" />
\`\`\`

##### With form control
\`\`\`html
<ds-segmented-controls
  [items]="items"
  [formControl]="control" />
\`\`\`

#### Where:

* **\`items\`** array of items with type \`SegmentedControlModel\`.

\`\`\`typescript
export interface SegmentedControlModel {
  text: string;
  iconStart?: string;
  iconEnd?: string;
  disabled?: boolean;
  id: SegmentedControlId;
}
\`\`\`

* **\`activeItemId\`** angular model (input + output) with type \`SegmentedControlId\`.

\`\`\`typescript
export type SegmentedControlId = string | number;
\`\`\`
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  argTypes: {
    activeItemId: {
      options: SegmentedControlsMocks.filter((el) => !el.disabled).map((el) => el.id),
      control: {
        type: 'select',
      },
      description: 'Segmented control selected item id',
      table: {
        type: {
          summary: 'SegmentedControlId',
        },
      },
    },
    items: {
      description: 'Segmented control items',
      table: {
        type: {
          summary: 'SegmentedControl[]',
        },
      },
    },
  },
};

export const OneColorBadge: StoryObj<DsSegmentedControls & CustomArgs> = {
  args: {
    items: SegmentedControlsMocks,
    activeItemId: undefined,
    control: new FormControl(2),
  },
  render: (args) => {
    return {
      props: { ...args },
      template: `
        <div>
          <h3 class="storybook-title">SegmentedControl with model output. "activeItemId" value is: {{activeItemId || 'unselected'}}</h3>

          <ds-segmented-controls
            [items]="items" [(activeItemId)]="activeItemId"/>

        </div>

        <br />

        <div>
          <h3 class="storybook-title">SegmentedControl with form control. Form control value is: {{control.value || 'unselected'}}</h3>

          <ds-segmented-controls
            [items]="items" [formControl]="control"/>
        </div>
        `,
    };
  },
};

export default meta;
