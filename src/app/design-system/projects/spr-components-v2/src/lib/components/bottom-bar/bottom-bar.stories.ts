import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsBottomBarComponent } from './bottom-bar';
import { DsButton } from '../button';

interface CustomArgs {
  text: string;
  withIcon: boolean;
}

const meta: Meta<DsBottomBarComponent & CustomArgs> = {
  title: 'shared components/BottomBarComponent',
  component: DsBottomBarComponent,
  // TODO: add in descriptions example from figma
  parameters: {
    docs: {
      description: {
        component: `
### The **BottomBarComponent** is a UI element that can be used to display a bottom bar with any projected content.

### Usage Example:

\`\`\`html
<div dsBottomBar>
  <div class="bottom-bar__label">Selected</div>

  <hr class="bottom-bar__divider" />

  <ds-button
    variant="flat"
    type="button">
      <i class="ds-icon ds-icon-general-play"></i>
      Builder
  </ds-button>

  <hr class="bottom-bar__divider" />

  <ds-button
    variant="flat"
    type="button">
      <i class="ds-icon ds-icon-general-play"></i>
      Metrics
  </ds-button>

  <hr class="bottom-bar__divider" />

  <ds-button
    variant="flat"
    type="button">
      <i class="ds-icon ds-icon-general-play"></i>
      Goal
  </ds-button>

  <hr class="bottom-bar__divider" />

  <ds-button
    variant="severity"
    [isIcon]="true"
    type="button">
      <i class="ds-icon ds-icon-changelog-delete-colored"></i>
  </ds-button>
</div>
\`\`\`

### To add separation between elements use element with class \`bottom-bar__divider\`:
\`\`\`html
<hr class="bottom-bar__divider" />
\`\`\`

### To add a custom block with right element gaps (inner and outer) use element with class \`bottom-bar__divider\`:
\`\`\`html
<div class="bottom-bar__label">Selected</div>
\`\`\`
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DsButton],
    }),
  ],
};

export const BottomBar: StoryObj<DsBottomBarComponent & CustomArgs> = {
  render: () => {
    return {
      template: `
        <section class="storybook-section">
          <h4 class="storybook-title">Bottom Bar Component Default theme </h4>

          <div dsBottomBar>
            <div class="bottom-bar__label">Selected</div>

            <hr class="bottom-bar__divider" />

            <ds-button
              variant="flat"
              type="button">
                <i class="ds-icon ds-icon-general-play"></i>
                Builder
            </ds-button>

            <hr class="bottom-bar__divider" />

            <ds-button
              variant="flat"
              type="button">
                <i class="ds-icon ds-icon-general-play"></i>
                Metrics
            </ds-button>

            <hr class="bottom-bar__divider" />

            <ds-button
              variant="flat"
              type="button">
                <i class="ds-icon ds-icon-general-play"></i>
                Goal
            </ds-button>

            <hr class="bottom-bar__divider" />

            <ds-button
              variant="severity"
              [isIcon]="true"
              type="button">
                <i class="ds-icon ds-icon-changelog-delete-colored"></i>
            </ds-button>
          </div>
        </section>

        <section class="storybook-section">
          <h4 class="storybook-title">Bottom Bar Component Light theme</h4>

          <div dsBottomBar themeType="light">
            <ds-button
              variant="flat"
              type="button">
                <i class="ds-icon ds-icon-general-play"></i>
                Builder
            </ds-button>
            <hr class="bottom-bar__divider" />
            <ds-button
              variant="flat"
              type="button">
                <i class="ds-icon ds-icon-general-play"></i>
                Metrics
            </ds-button>
            <hr class="bottom-bar__divider" />
            <ds-button
              variant="flat"
              type="button">
                <i class="ds-icon ds-icon-general-play"></i>
                Goal
            </ds-button>
            <hr class="bottom-bar__divider" />
            <ds-button
              variant="transparent"
              [isIcon]="true"
              type="button">
                <i class="ds-icon ds-icon-control-cross"></i>
            </ds-button>
          </div>
        </section>

        <section class="storybook-section">
          <h4 class="storybook-title">Bottom Bar Component Dark theme </h4>

          <div dsBottomBar themeType="dark">
          <div class="bottom-bar__label">Selected</div>
            <hr class="bottom-bar__divider" />
            <ds-button
              variant="flat"
              type="button">
                <i class="ds-icon ds-icon-general-play"></i>
                Builder
            </ds-button>
            <hr class="bottom-bar__divider" />
            <ds-button
              variant="flat"
              type="button">
                <i class="ds-icon ds-icon-general-play"></i>
                Metrics
            </ds-button>
            <hr class="bottom-bar__divider" />
            <ds-button
              variant="flat"
              type="button">
                <i class="ds-icon ds-icon-general-play"></i>
                Goal
            </ds-button>
            <hr class="bottom-bar__divider" />
            <ds-button
              variant="severity"
              [isIcon]="true"
              type="button">
                <i class="ds-icon ds-icon-changelog-delete-colored"></i>
            </ds-button>
          </div>
        </section>

        <section class="storybook-section">
          <h4 class="storybook-title">Bottom Bar Component Alt theme</h4>

          <div dsBottomBar themeType="alt">
            <ds-button
              variant="flat"
              type="button">
                <i class="ds-icon ds-icon-general-play"></i>
                Builder
            </ds-button>
            <hr class="bottom-bar__divider" />
            <ds-button
              variant="flat"
              type="button">
                <i class="ds-icon ds-icon-general-play"></i>
                Metrics
            </ds-button>
            <hr class="bottom-bar__divider" />
            <ds-button
              variant="flat"
              type="button">
                <i class="ds-icon ds-icon-general-play"></i>
                Goal
            </ds-button>
            <ds-button
              variant="transparent"
              [isIcon]="true"
              type="button">
                <i class="ds-icon ds-icon-control-cross"></i>
            </ds-button>
          </div>
        </section>
        `,
    };
  },
};

export default meta;
