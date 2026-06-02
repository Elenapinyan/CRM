import { Meta, StoryObj } from '@storybook/angular';
import { SprAlertComponent } from './spr-alert.component';

const meta: Meta<SprAlertComponent> = {
  title: 'shared components/Alert',
  component: SprAlertComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Alert** component is used to display alert messages within your application. It supports various alert types to define the visual style and significance of the message.

- **Alert Type**: Choose the alert type to define its visual style and significance. Available types are: info, success, warning, danger.

This component enhances the user experience by providing clear and intuitive alert messages.
        `,
      },
    },
  },
  argTypes: {
    type: {
      options: ['info', 'success', 'warning', 'danger'],
      control: {
        type: 'select',
      },
      description: 'Choose the alert type to define its visual style and significance.',
      table: {
        type: {
          summary: 'info | success | warning | danger',
        },
        defaultValue: {
          summary: 'info',
        },
      },
    },
    message: {
      description:
        'The text content of the alert. This property allows you to specify the message that will be displayed within the alert component. Pay your attention that it is also supports html code.',
    },
    dismissible: {
      description: 'The property to control whether the component should have a close button.',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    icon: {
      description:
        'The default icon of the alert could be replaced within any custom icon that exist in the assets folder or in the icons font set.',
    },
  },
};

export const Alert: StoryObj<SprAlertComponent> = {
  args: {
    type: 'info',
    message: 'Some message <b> Some bold message </b>',
    dismissible: true,
    icon: '',
  },
  render: (args: SprAlertComponent) => {
    return {
      props: { ...args },
      template: `
        <spr-alert
          [message]="message"
          [type]="type"
          [dismissible]="dismissible"
          [icon]="icon"
        />
      `,
    };
  },
};

export default meta;
