import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import '@angular/localize/init';
import { MockResizeObserver } from './projects/spr-components-v2/src/lib/shared/mocks';

setupZoneTestEnv();

Object.defineProperty(document, 'defaultView', {
  value: { CSS: { highlights: new Map() } },
  configurable: true,
});

global.ResizeObserver = MockResizeObserver;
