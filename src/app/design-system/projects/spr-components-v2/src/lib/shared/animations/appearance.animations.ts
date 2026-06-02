import { animate, state, style, transition, trigger } from '@angular/animations';

const AppearanceAnimationTypes = {
  FADE: 'fade',
} as const;

type AppearanceAnimationType = (typeof AppearanceAnimationTypes)[keyof typeof AppearanceAnimationTypes];

const AppearanceAnimations = trigger('AppearanceAnimations', [
  state(':enter', style({ opacity: 0 })),
  state('init', style({ opacity: 1 })),
  state('fade', style({ opacity: 0 })),
  transition(':enter, init => fade', [animate('300ms ease-in')]),
]);

export { AppearanceAnimationTypes, AppearanceAnimationType, AppearanceAnimations };
