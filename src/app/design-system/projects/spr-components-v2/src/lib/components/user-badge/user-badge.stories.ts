import { Meta, StoryObj } from '@storybook/angular';
import { SprUserBadge } from './user-badge';

type CustomArgs = {
  imageUrl: string;
};

const meta: Meta<SprUserBadge & CustomArgs> = {
  title: 'shared components/UserBadge',
  component: SprUserBadge,
  parameters: {
    docs: {
      description: {
        component: `
The **UserBadge** component is used to display budge with image and text.
        `,
      },
    },
  },
  argTypes: {
    imageUrl: {
      control: {
        type: 'text',
      },
      description: 'This is not component prop. This is test property to provide image url for badge.',
    },
    content: {
      control: {
        type: 'text',
      },
      description: 'User name or any other text. Also it will be used to display initials.',
    },
  },
};

export const UserBadge: StoryObj<SprUserBadge & CustomArgs> = {
  args: {
    content: 'Nice User',
    imageUrl: '',
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <div style="background: rgb(24 24 27)">
        <section class="storybook-section">
          <h3 class="storybook-title">The badge without image set</h3>
          <ds-user-badge [content]="content"></ds-user-badge>
        </section>

        <section class="storybook-section">
          <h3 class="storybook-title">The badge with image</h3>
          <ds-user-badge [content]="content" [imageSrc]="imageUrl"></ds-user-badge>
        </section>

        <section class="storybook-section">
          <h3 class="storybook-title">The badge but as a directive.</h3>
          <div ds-user-badge [content]="content">
            <img badgeImage [src]="imageUrl" alt="Image" />
          </div>
        </section>
        </div>
      `,
    };
  },
};

export default meta;
