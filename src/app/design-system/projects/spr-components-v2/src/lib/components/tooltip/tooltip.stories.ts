import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DsButton } from '../button';
import { DsBadge } from '../badge';

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

Class ***tooltip--sm*** - Adds a fixed width to the tooltip.
      `,
      options: [null, 'tooltip--sm ds-component'],
      control: {
        type: 'select',
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
      imports: [NgbTooltipModule, DsButton, DsBadge],
    }),
  ],
};

export const List: StoryObj = {
  args: {
    ngbTooltip: 'Lorem ipsum dolore sit amet Lorem ipsum dolore sit amet',
    placement: ['right'],
    tooltipClass: 'tooltip-container__body ds-component',
    container: 'body',
    disableTooltip: false,
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `<div class="tooltip-wrapper">
        <h3 class="storybook-title">Basic tooltip</h3>

        <i
         [style]="{width: '16px'}"
         class="ds-icon ds-icon-general-info tooltip__icon"
         [ngbTooltip]="ngbTooltip"
         [container]="container"
         [disableTooltip]="disableTooltip"
         [tooltipClass]="tooltipClass"

         [placement]="placement"></i>

        <br>
        <h3 class="storybook-title">Tooltip with custom template</h3>
        <p class="storybook-title">Click on icon to show the tooltip</p>

         <ng-template #tooltipContent>
          <div class="tooltip-inner__body">
            <div class="tooltip-inner__text-holder">
              <span class="tooltip-inner__heading">Tooltip Custom Content</span>
              <div class="tooltip-inner__text">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus.</div>
            </div>


            <div class="tooltip-inner__items-container">
              <ds-button size="sm" variant="secondary">Confirm</ds-button>
              <ds-button size="sm" variant="flat">Decline</ds-button>
              <ds-badge content="Badge" size="md" variant="green" />
              <ds-badge content="Badge" size="md" variant="pink" />
              <ds-badge content="Badge" size="md" variant="purple" />
              <ds-badge content="Badge" size="md" variant="green" />
              <ds-badge content="Badge" size="md" variant="pink" />
            </div>
          </div>
         </ng-template>

         <i
           [style]="{width: '16px'}"
           class="ds-icon ds-icon-general-info tooltip__icon"
           [ngbTooltip]="tooltipContent"
           [container]="container"
           triggers="click"
           [disableTooltip]="disableTooltip"
           [tooltipClass]="tooltipClass"
           [placement]="placement"></i>
        </div>
      `,
    };
  },
};

export default meta;
