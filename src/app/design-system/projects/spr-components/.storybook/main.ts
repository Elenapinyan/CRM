import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    'pages/welcome.mdx',
    'pages/designing.mdx',
    'pages/developing.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;
