import { Decorator } from '@storybook/angular';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';

export const addBodyAttribute: Decorator = (storyFn, context): StoryFnAngularReturnType => {
  document.body.setAttribute('data-current-route', (context.args['currentRoute'] as string) || 'default');
  return storyFn();
};

export const bgOptions = {
  light: { name: 'Light', value: '#fff' },
  dark: { name: 'Dark', value: '#18181B' },
};
