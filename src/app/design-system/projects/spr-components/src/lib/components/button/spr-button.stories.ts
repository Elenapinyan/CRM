import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SprButtonComponent } from './spr-button.component';

interface CustomArgs {
  text: string;
  leftIcon: boolean;
  rightIcon: boolean;
}

const meta: Meta<SprButtonComponent & CustomArgs> = {
  title: 'shared components/Button',
  component: SprButtonComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Button component** is an essential and highly customizable element in your application.

- **Styles:** Multiple options for colors, sizes, and types.
- **Icons:** Display icons on either side of the button text.
- **Functions:** Supports various actions like navigation and form submission.

Enhance your user experience by adjusting the button's appearance to align with your application's theme and requirements.
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: {
    variant: {
      options: [
        'primary',
        'accent',
        'secondary',
        'outline',
        'link',
        'link-accent',
        'severity',
        'form-button',
        'icon-button',
        'authorization-secondary',
      ],
      control: {
        type: 'select',
      },
      description: 'Choose the button variant to define its visual style and significance.',
      table: {
        type: {
          summary:
            'primary | accent | secondary | outline | link | link-accent | severity | form-button | icon-button | authorization-secondary',
        },
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
      description: 'Select the button size to fit the layout and importance of the action.',
      table: {
        type: {
          summary: 'sm | md | lg',
        },
        defaultValue: {
          summary: 'md',
        },
      },
    },
    type: {
      options: ['button', 'reset', 'submit'],
      control: {
        type: 'select',
      },
      description: 'Specify the button’s HTML type attribute to control its form behavior.',
      table: {
        type: {
          summary: 'button | reset | submit',
        },
        defaultValue: {
          summary: 'button',
        },
      },
    },
    disabled: {
      description: 'Disable the button to prevent user interactions when necessary.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    buttonId: {
      description: 'This is equivalent to the basic HTML id attribute, useful for styling and reference.',
      control: {
        disable: true,
      },
    },
    text: {
      description: 'The text displayed on the button.',
      control: {
        type: 'text',
      },
    },
    leftIcon: {
      description: 'Display an icon to the left of the button text, enhancing visual cues.',
    },
    rightIcon: {
      description: 'Display an icon to the right of the button text, enhancing visual cues.',
    },
    isIcon: {
      description: 'Set to true if the button itself should be rendered as an icon.',
    },
    isRadius: {
      description: 'Adds rounded corners to the button if set to true.',
    },
    isBtnSpinner: {
      description: 'Show a spinner inside the button to indicate a loading state.',
    },
  },
};

export const Button: StoryObj<SprButtonComponent & CustomArgs> = {
  args: {
    variant: 'primary',
    size: 'md',
    type: 'button',
    text: 'Button',
    isIcon: false,
    isRadius: false,
    leftIcon: false,
    rightIcon: false,
    disabled: false,
    isBtnSpinner: false,
    buttonId: '',
  },
  render: (args: SprButtonComponent & CustomArgs) => {
    return {
      props: { ...args },
      template: `
        <spr-button
          *ngIf="variant !== 'form-button' && variant !== 'icon-button'"
          [isBtnSpinner]="isBtnSpinner"
          [isRadius]="isRadius"
          [disabled]="disabled"
          [variant]="variant"
          [isIcon]="isIcon"
          [size]="size"
          [type]="type">
          <i class="bo-icon bo-icon-general-workspace"
            *ngIf="leftIcon && !isIcon"
            start></i>

          <span *ngIf="!isIcon">{{ text }}</span>

          <i class="bo-icon bo-icon-general-workspace"
            *ngIf="isIcon && !isBtnSpinner"></i>

          <i class="bo-icon bo-icon-general-workspace"
          *ngIf="rightIcon && !isIcon"
            end></i>
        </spr-button>

        <spr-button
          *ngIf="variant === 'form-button' || variant === 'icon-button'"
          [isBtnSpinner]="isBtnSpinner"
          [disabled]="disabled"
          [variant]="variant"
          [type]="type">
          <i class="bo-icon bo-icon-general-placeholder"
            *ngIf="!isBtnSpinner"></i>
        </spr-button>
`,
    };
  },
};

export default meta;
