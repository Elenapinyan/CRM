import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import '@angular/localize/init';
import { applicationConfig, Preview } from '@storybook/angular';
import { addons } from '@storybook/preview-api';
import { addBodyAttribute, bgOptions } from './options';

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [bgOptions.light, bgOptions.dark],
      default: 'Light',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    currentRoute: 'backoffice',
  },
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule, FormsModule, ReactiveFormsModule)],
    }),
    addBodyAttribute,
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    backgrounds: bgOptions.light,
  },
};

// Listen for global updates and change theme and background
addons.getChannel().on('globalsUpdated', (globals) => {
  const previousTheme = document.body.getAttribute('app-theme');
  const previousBg = globals?.globals?.backgrounds?.name;
  const theme: 'light' | 'dark' = globals?.globals?.theme ?? 'light';
  localStorage.setItem('spr-theme', theme);

  if (previousTheme !== theme) {
    document.body.setAttribute('app-theme', theme);

    // change background
    if (previousBg !== theme) {
      addons.getChannel().emit('updateGlobals', {
        globals: {
          backgrounds: bgOptions[theme],
        },
      });
    }
  }
});

export default preview;
