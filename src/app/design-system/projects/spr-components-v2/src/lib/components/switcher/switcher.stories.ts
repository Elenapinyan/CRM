import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsLabelDirective } from '../../directives/label';
import { DsSwitcherComponent } from './switcher.component';

interface CustomArgs {
  leftIcon: string;
  rightIcon: string;
  withLabel: boolean;
  isTooltip: boolean;
  isFullWidth: boolean;
  currentRoute: string;
  isSwitcherReverse: boolean;
  isInline: boolean;
}

const meta: Meta<DsSwitcherComponent & CustomArgs> = {
  title: 'shared components/Switcher',
  component: DsSwitcherComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Switcher** component allows users to toggle between two states. It supports various configurations to enhance its usability and appearance.

- **Current Route:** Adjust the styling based on the current route theme.
- **Icons:** Optionally display icons on either side of the label text for added visual cues.
- **Tooltip:** Provide additional information through a tooltip.
- **Labels:** Display primary and secondary labels to guide users.
- **Reverse Label/Switcher:** Control the position of the label and switcher relative to each other.
- **Disability:** Option to disable the component, preventing user interaction.

This component enhances user experience by providing a clear and intuitive interface for toggling states.
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [NgbTooltipModule, DsLabelDirective],
    }),
  ],
  argTypes: {
    currentRoute: {
      options: ['backoffice', 'cms', 'crm', 'gamification'],
      control: {
        type: 'select',
      },
      description: 'Select the current route theme',
      table: {
        type: {
          summary: 'backoffice | cms | crm | gamification',
        },
        defaultValue: {
          summary: 'backoffice',
        },
      },
    },
    controlSize: {
      options: ['sm', 'md'],
      control: {
        type: 'select',
      },
      description: 'Adjust the size of the input control.',
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    isLabelReverse: {
      description: 'It controls whether the label appears to the left or right of the input element.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    isDisabled: {
      description: 'Disable the switcher to prevent user interactions.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    inputId: {
      description: 'This is equivalent to the basic HTML id attribute.',
      control: {
        disable: true,
      },
    },
    label: {
      description: 'The text to display as the label for the switcher.',
    },
    tooltip: {
      description: 'The text to display within the tooltip.',
    },
    tooltipClassForLabel: {
      description: 'Tooltip class for label.',
      control: { type: 'text' },
    },
    withLabel: {
      description: 'Include a label for the switcher.',
    },
    leftIcon: {
      description: 'Display an icon to the left of the label text.',
    },
    rightIcon: {
      description: 'Display an icon to the right of the label text.',
    },
    isTooltip: {
      description: 'Enable or disable the tooltip for the switcher.',
    },
    isInline: {
      description: 'Controls whether the label and radio button appear inline.',
    },
    isDecorated: {
      description: 'Option to add decoration to the radio button.',
    },
  },
};

export const Switcher: StoryObj<DsSwitcherComponent & CustomArgs> = {
  args: {
    currentRoute: 'backoffice',
    label: 'Label',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'ds-component',
    withLabel: true,
    isInline: false,
    isLabelReverse: false,
    leftIcon: 'ds-icon-general-placeholder',
    rightIcon: 'ds-icon-general-placeholder',
    isDecorated: false,
    isTooltip: true,
    isDisabled: false,
    inputId: '1',
    controlSize: 'md',
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <ds-switcher
          [isDecorated]="isDecorated"
          [isDisabled]="isDisabled"
          [inputId]="inputId"
          [isLabelReverse]="isLabelReverse"
          [labelIsInline]="isInline"
          [controlSize]="controlSize"
          [label]="withLabel && label"
          [labelLeftIcon]="leftIcon"
          [labelRightIcon]="rightIcon"
          [tooltip]="isTooltip && tooltip"
          [tooltipClassForLabel]="tooltipClassForLabel" />
      `,
    };
  },
};

export default meta;
