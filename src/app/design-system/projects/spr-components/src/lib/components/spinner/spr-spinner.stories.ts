import { Meta, StoryObj } from '@storybook/angular';
import { SprSpinnerComponent } from './spr-spinner.component';

const meta: Meta<SprSpinnerComponent> = {
  title: 'shared components/Spinner',
  component: SprSpinnerComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Spinner** component is used to indicate loading states in your application. It provides a visual representation that content is being loaded or a process is ongoing.

This component enhances user experience by providing a clear and intuitive indicator for loading processes.
        `,
      },
    },
  },
};

export const Spinner: StoryObj<SprSpinnerComponent> = {};

export default meta;
