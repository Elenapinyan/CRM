import { Meta, StoryObj } from '@storybook/angular';
import { BadgeRadiusVariant, BadgeSchemeVariant, BadgeSizeVariant } from './badge.options';
import { DsBadge } from './badge';

type CustomArgs = {};

const meta: Meta<DsBadge & CustomArgs> = {
  title: 'shared components/Badge',
  component: DsBadge,
  parameters: {
    docs: {
      description: {
        component: `
The **Badge** component is used to display budge with image and text.
        `,
      },
    },
  },
  argTypes: {
    icon: {
      control: {
        type: 'text',
      },
      description: 'This is property to provide icon class for badge icons',
    },
    iconEnd: {
      control: {
        type: 'text',
      },
      description: 'This is property to provide icon class for badge icons',
    },
    content: {
      control: {
        type: 'text',
      },
      description: 'User name or any other text. Also it will be used to display initials.',
    },
    variant: {
      options: Object.values(BadgeSchemeVariant),
      control: {
        type: 'select',
      },
      description: 'Property to set the variant',
      table: {
        type: {
          summary: Object.values(BadgeSchemeVariant).join(' | '),
        },
        defaultValue: {
          summary: BadgeSchemeVariant.NEUTRAL,
        },
      },
    },
    radius: {
      options: Object.values(BadgeRadiusVariant),
      control: {
        type: 'select',
      },
      description: 'Property to set the border radius',
      table: {
        type: {
          summary: Object.values(BadgeRadiusVariant).join(' | '),
        },
        defaultValue: {
          summary: BadgeRadiusVariant.SQUARED,
        },
      },
    },
    size: {
      options: Object.values(BadgeSizeVariant),
      control: {
        type: 'select',
      },
      description: 'Property to set the badge size',
      table: {
        type: {
          summary: Object.values(BadgeSizeVariant).join(' | '),
        },
        defaultValue: {
          summary: BadgeSizeVariant.SM,
        },
      },
    },
  },
};

export const Badge: StoryObj<DsBadge & CustomArgs> = {
  args: {
    content: 'Badge',
    icon: 'ds-icon-control-cross',
    iconEnd: 'ds-icon-control-cross',
    variant: BadgeSchemeVariant.NEUTRAL,
    radius: BadgeRadiusVariant.SQUARED,
    size: BadgeSizeVariant.SM,
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <div style="display: flex; gap: 10px;">
          <ds-badge [content]="content" [icon]="icon" [iconEnd]="iconEnd" [size]="size" [radius]="radius" [variant]="variant" />
        </div>
      `,
    };
  },
};

export default meta;
