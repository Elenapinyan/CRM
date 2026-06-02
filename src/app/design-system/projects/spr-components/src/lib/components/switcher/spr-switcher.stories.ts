import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SprLabelDirective } from '../../directives/spr-label';
import { SprSwitcherComponent } from './spr-switcher.component';

interface CustomArgs {
  leftIcon: string;
  rightIcon: string;
  withLabel: boolean;
  isTooltip: boolean;
  isFullWidth: boolean;
  currentRoute: string;
  secondLabel: string;
  secondTooltip: string;
  withSecondLabel: boolean;
  isSwitcherReverse: boolean;
  isInline: boolean;
}

const meta: Meta<SprSwitcherComponent & CustomArgs> = {
  title: 'shared components/Switcher',
  component: SprSwitcherComponent,
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
      imports: [NgbTooltipModule, SprLabelDirective],
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
      table: {
        defaultValue: { summary: 'tooltip-container__body tooltip-white' },
      },
    },
    secondLabel: {
      description: 'The text to display as the secondary label for the switcher.',
    },
    secondTooltip: {
      description: 'The text to display within the tooltip for the secondary label.',
    },
    withLabel: {
      description: 'Include a label for the switcher.',
    },
    withSecondLabel: {
      description: 'Include a secondary label for the switcher.',
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

export const Switcher: StoryObj<SprSwitcherComponent & CustomArgs> = {
  args: {
    currentRoute: 'backoffice',
    label: 'Label',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'tooltip-container__body tooltip-white',
    secondLabel: 'Label2',
    secondTooltip: 'Tooltip2',
    withLabel: true,
    withSecondLabel: false,
    isInline: false,
    isLabelReverse: false,
    leftIcon: 'bo-icon-general-placeholder',
    rightIcon: 'bo-icon-general-placeholder',
    isDecorated: false,
    isTooltip: true,
    isDisabled: false,
    inputId: '1',
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <spr-switcher
          [isDecorated]="isDecorated"
          [isDisabled]="isDisabled"
          [inputId]="inputId"
          [isLabelReverse]="isLabelReverse"
          [labelIsInline]="isInline"
          [label]="withLabel && label"
          [tooltip]="isTooltip && tooltip"
          [secondLabel]="withSecondLabel && secondLabel"
          [secondTooltip]="isTooltip && secondTooltip"
          [labelLeftIcon]="leftIcon"
          [labelRightIcon]="rightIcon"
          [tooltipClassForLabel]="tooltipClassForLabel" />
      `,
    };
  },
};

export default meta;
