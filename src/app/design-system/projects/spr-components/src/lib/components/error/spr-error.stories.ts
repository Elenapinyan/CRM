import { Meta, StoryObj } from '@storybook/angular';
import { SprErrorComponent } from './spr-error.component';

const meta: Meta<SprErrorComponent> = {
  title: 'shared components/Error',
  component: SprErrorComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Error** component is used to display error messages below input fields within your application.
It ensures that errors are communicated clearly and consistently to users, enhancing the user experience by providing immediate feedback on form inputs.

- **Error Message:** Displays the specified error message below an input field.
        `,
      },
    },
  },
  argTypes: {
    errorMessage: {
      description: 'The error message to be displayed.',
      control: 'text',
    },
  },
};

export const Error: StoryObj<SprErrorComponent> = {
  args: {
    errorMessage: 'Some error message',
  },
  render: (args) => ({
    props: args,
    template: `<spr-error>{{errorMessage}}</spr-error>`,
  }),
};

export default meta;
