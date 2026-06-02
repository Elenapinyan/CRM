import { Meta, StoryObj } from '@storybook/angular';
import Readme from '../../sdk/theme/README.md';
import { AppThemeSDKExampleComponent } from './app-theme-sdkexample.component';

interface CustomArgs {}

const meta: Meta<AppThemeSDKExampleComponent & CustomArgs> = {
  title: 'SDK/App Theme SDK',
  component: AppThemeSDKExampleComponent,
  parameters: {
    docs: {
      description: {
        component: Readme,
      },
    },
  },
};

export const AppThemeSDKExample: StoryObj<AppThemeSDKExampleComponent & CustomArgs> = {
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <ds-app-theme-sdkexample />
      `,
    };
  },
};

export default meta;
