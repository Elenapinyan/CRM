import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DsAlert } from './alert';
import { DsButton } from '../button';
import { DEFAULT_AUTOCLOSE_DELAY } from '../../shared';

const meta: Meta<DsAlert> = {
  title: 'shared components/Alert',
  component: DsAlert,
  decorators: [
    moduleMetadata({
      imports: [DsButton],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The **Alert** component is used to display alert messages within your application. It supports various alert types to define the visual style and significance of the message.

- **Alert Type**: Choose the alert type to define its visual style and significance. Available types are: info, success, warning, danger.

- You can use content projection to add action buttons, **spr-alert-link** component and sprAlertLink selector is provided to show basic button or link, but you can project any other components.

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
    autoclose: {
      description: 'If true the alert will close itself after some time and emit closed event',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    delay: {
      description:
        'The title of the alert. This property allows you to specify the title that will be displayed within the alert component.',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: DEFAULT_AUTOCLOSE_DELAY.toString(),
        },
      },
    },
    title: {
      description:
        'The title of the alert. This property allows you to specify the title that will be displayed within the alert component.',
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
    animation: {
      options: ['fade'],
      control: {
        type: 'select',
      },
      description: 'The animation on dismiss button click.',
      table: {
        type: {
          summary: 'fade',
        },
        defaultValue: {
          summary: 'fade',
        },
      },
    },
  },
};

export const Alert: StoryObj<DsAlert> = {
  args: {
    autoclose: false,
    delay: DEFAULT_AUTOCLOSE_DELAY,
    type: 'info',
    title: 'Alert title',
    message: 'Insert the alert description here. It would look better as two lines of text',
    dismissible: true,
    icon: '',
    animation: 'fade',
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <ds-alert
          [autoclose]="autoclose"
          [delay]="delay"
          [title]="title"
          [message]="message"
          [type]="type"
          [dismissible]="dismissible"
          [icon]="icon"
          [animation]="animation"
        />

        <br/>

        <ds-alert
          [autoclose]="autoclose"
          [delay]="delay"
          [title]="title"
          [message]="message"
          [type]="type"
          [dismissible]="dismissible"
          [icon]="icon"
          [animation]="animation"
        >

         <ds-button variant="link">Learn more</ds-button>

        </ds-alert>

        <br/>

        <h3 class="storybook-title">Also, can be used like directive selector</h3>

        <div ds-alert
          [autoclose]="autoclose"
          [delay]="delay"
          [title]="title"
          [type]="type"
          [dismissible]="dismissible"
          [icon]="icon"
          [animation]="animation"
        >
          <div class="custom-container" style="display: flex; flex-direction: column; gap: 10px;">
            <div class="custom-container__holder">
             <div class="custom-container__title storybook-title" style="font-weight: 500; font-size: 12px; line-height: 16px">Title</div>
               <div class="custom-container__text">Insert the alert description here. It would look better as two lines of text</div>
             </div>
             <div class="inline-container">
                <ds-button variant="link">Learn more</ds-button>
                <ds-button variant="link">Learn more</ds-button>
             </div>
          </div>
        </div>
      `,
      applicationConfig: {
        providers: [provideAnimations()],
      },
    };
  },
};

export default meta;
