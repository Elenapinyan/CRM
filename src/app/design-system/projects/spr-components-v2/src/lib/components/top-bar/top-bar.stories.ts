import { Meta, StoryObj } from '@storybook/angular';
import { DsTopBarComponent } from './top-bar';

interface CustomArgs {
  text: string;
  withIcon: boolean;
}

const meta: Meta<DsTopBarComponent & CustomArgs> = {
  title: 'shared components/TopBar',
  component: DsTopBarComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **TopBarComponent** is a UI element that can be used to display a top bar with a title, subtitle, icon and buttons.

This component works in two modes:
1. Content projection mode: Allows you to project custom content into the top bar. **This mode has priority over input mode**:
\`\`\`
  <div ds-top-bar>
      <h1>Just a simple content here</h1>
      <p>This content is projected inside the top bar component without any modifications.</p>
  </div>
\`\`\`
2. Input mode: Allows you to configure the top bar using inputs. It will looks like in figma example. All inputs are optional and block will be rendered only if the corresponding input is provided. Available outputs for buttons clicks are **(decline)** and **(confirm)**.
\`\`\`
  <div
      ds-top-bar
      [title]="title"
      [subtitle]="subtitle"
      [iconName]="iconName"
      [declineBtn]="declineBtn"
      [confirmBtn]="confirmBtn"
      (decline)="onDecline()"
      (confirm)="onConfirm()"
      >
  </div>
\`\`\`

Additionally you can configure default values by providing \`TOP_BAR_DEFAULT_OPTIONS\` injection token.
\`\`\`
  interface TopBarDefaultOptions {
    iconName?: string;
    declineBtn?: string | null;
    confirmBtn?: string | null;
    title?: string;
    subtitle?: string;
  }
\`\`\`
        `,
      },
    },
  },
  decorators: [],
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
      description: 'The title text to display in the top bar.',
    },
    subtitle: {
      control: {
        type: 'text',
      },
      description: 'The subtitle text to display in the top bar.',
    },
    iconName: {
      control: {
        type: 'text',
      },
      description: 'The name of the icon to display in the top bar.',
    },
    declineBtn: {
      control: {
        type: 'text',
      },
      description: 'The text for the decline button.',
    },
    confirmBtn: {
      control: {
        type: 'text',
      },
      description: 'The text for the confirm button.',
    },
  },
};

export const OneColorBadge: StoryObj<DsTopBarComponent & CustomArgs> = {
  args: {
    title: 'Withdrawal Request $5000',
    subtitle: 'Insert the alert description here',
    iconName: 'ds-icon-general-card',
    declineBtn: 'Decline',
    confirmBtn: 'Confirm',
  },
  render: (args) => {
    return {
      props: { ...args },
      template: `
        <section>
          <h3 class="storybook-title">Top Bar Component</h3>

          <div
            ds-top-bar
            [title]="title"
            [subtitle]="subtitle"
            [iconName]="iconName"
            [declineBtn]="declineBtn"
            [confirmBtn]="confirmBtn">
          </div>

        </section>

        <br />

        <section>
          <h3 class="storybook-title">Top Bar Component with content projection</h3>

          <div ds-top-bar>
            <div style="font-size: 16px; line-height: 20px; font-weight: 500; color: #fff;">Just a simple content here</div>
            <div style="color: #CFCFD3; font-size: 14px; line-height: 20px;">This content is projected inside the top bar component without any modifications.</div>
          </div>
        </section>
        `,
    };
  },
};

export default meta;
