import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

const meta: Meta = {
  title: 'shared components/Tooltip',
  parameters: {
    docs: {
      description: {
        component: `**Tooltip** directive.`,
      },
    },
  },
  argTypes: {
    ngbTooltip: {
      description: 'Directive to add tooltip to element',
    },
    placement: {
      description: 'Property to set tooltip position',
      table: {
        defaultValue: {
          summary: '["auto"]',
        },
      },
      control: {
        type: 'select',
        defaultValue: ['auto'],
      },
      options: [
        ['auto'],
        ['top'],
        ['bottom'],
        ['start'],
        ['left'],
        ['end'],
        ['right'],
        ['top-start'],
        ['top-left'],
        ['top-end'],
        ['top-right'],
        ['bottom-start'],
        ['bottom-left'],
        ['bottom-end'],
        ['bottom-right'],
        ['start-top'],
        ['left-top'],
        ['start-bottom'],
        ['left-bottom'],
        ['end-top'],
        ['right-top'],
        ['end-bottom'],
        ['right-bottom'],
      ],
    },
    tooltipClass: {
      description: `
Custom class for tooltip. Lets you to add custom styles for the tooltip.

Class ***tooltip-container__body*** - recommended to be used by default, because it fixes bug with hover.

Class ***tooltip-white*** - makes tooltip look different.
      `,
      options: ['tooltip-container__body', 'tooltip-white'],
      control: {
        type: 'multi-select',
      },
    },
    container: {
      description: `A selector specifying the element the tooltip should be appended to. Currently only supports "body".`,
      control: {
        type: 'select',
      },
      options: [null, 'body'],
    },
    disableTooltip: {
      description: `If ***true***, tooltip is disabled and won't be displayed.`,
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
      control: {
        type: 'boolean',
        defaultValue: false,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [NgbTooltipModule],
    }),
  ],
};

export const List: StoryObj = {
  args: {
    ngbTooltip: 'Tooltip',
    placement: ['auto'],
    tooltipClass: 'tooltip-container__body',
    container: 'body',
    disableTooltip: false,
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <div class="tooltip-wrapper">
          <i
           [style]="{width: '20px', height: '20px'}"
           class="bo-icon-general-info tooltip__icon"
           [ngbTooltip]="ngbTooltip"
           [container]="container"
           [disableTooltip]="disableTooltip"
           [tooltipClass]="tooltipClass"
           [placement]="placement"></i>
        </div>
      `,
    };
  },
};

export default meta;
