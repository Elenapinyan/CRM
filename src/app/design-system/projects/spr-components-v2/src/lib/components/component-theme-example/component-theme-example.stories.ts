import { Meta, StoryObj } from '@storybook/angular';
import { ComponentThemeExampleComponent } from './component-theme-example';
import { ComponentThemeType } from '../../directives/component-theme';

interface CustomArgs {}

const themeTypes: ComponentThemeType[] = ['light', 'dark', 'alt', null];

const meta: Meta<ComponentThemeExampleComponent & CustomArgs> = {
  title: 'shared components/ComponentThemeDirective',
  component: ComponentThemeExampleComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **ComponentThemeDirective** helps to manage and apply theme to component or group of components that is different from the current one in the application. Need to add host directive **COMPONENT_THEME_HOST_DIRECTIVE** to component where you want to use theme management and provide [themeType] to manage theme in component. Available theme types:

   * 'light' - set light theme for component
   * 'dark'  - set dark theme for component
   * 'alt'   - set alt theme for component, if root theme is dark then alt will be light and vice versa
   * 'root'  - set root theme for component, means that component will use the same theme as root application (like rem)
   *  null   - set nothing, means that component will inheit theme from parent (like em)

### Component example:
\`\`\`
@Component({
  ...,
  selector: 'ds-component-theme-example',
  hostDirectives: [COMPONENT_THEME_HOST_DIRECTIVE],
})
export class ComponentThemeExampleComponent {}
\`\`\`

### Usage example:
\`\`\`
  <ds-component-theme-example [themeType]="themeType"></ds-component-theme-example>
\`\`\`
        `,
      },
    },
  },
  decorators: [],
  argTypes: {
    themeType: {
      options: themeTypes,
      control: {
        type: 'select',
      },
      description: 'Set theme type for component',
    },
  },
};

export const ComponentThemeExample: StoryObj<ComponentThemeExampleComponent & CustomArgs> = {
  args: {
    themeType: null,
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <div ds-component-theme-example [themeType]="themeType"></div>
      `,
    };
  },
};

export default meta;
