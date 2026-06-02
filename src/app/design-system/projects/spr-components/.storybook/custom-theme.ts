import { create } from '@storybook/theming';
import packageJson from '../package.json';

export default create({
  base: 'light',
  brandTarget: '_self',
  brandTitle: `
      <div style="text-align: center;">
        <img src="./assets/logos/broadway_logo_main_solid_rgb.svg" alt="Broadway Logo" style="height: 45px;" />
        <p style="font-size: 16px; color: #333; margin-bottom: 0;">Workspace design system v${packageJson.version}</p>
      </div>
    `,
  colorSecondary: '#585C6D',
  appBg: '#ffffff',
});
