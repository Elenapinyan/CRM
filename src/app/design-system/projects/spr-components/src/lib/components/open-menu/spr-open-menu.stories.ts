import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SprButtonComponent } from '../button/spr-button.component';
import { SprOpenMenuComponent } from './spr-open-menu.component';
import { SprOpenMenuDirective } from './directives/open-menu';
import { SprOpenMenuItemDirective } from './directives/open-menu-item';
import { SprOpenSubMenuDirective } from './directives/open-sub-menu';
import { SprOpenMenuTitleDirective } from './directives/open-menu-title';

const meta: Meta<SprOpenMenuComponent> = {
  title: 'shared components/Menu',
  component: SprOpenMenuComponent,
  parameters: {
    docs: {
      description: {
        component: `
### Menu with Title and Submenu

This example shows how to use the \`sprOpenMenu\` directive for opening menu with a title and submenu together with:

* \`sprOpenMenuTitle\` directive - to display a title at the top of the menu
* \`sprOpenMenuItem\` directive - to define menu items
* \`sprOpenSubMenu\` directive - to create a nested submenu

---

### Directives Description

sprOpenMenu Inputs:

| Input          | Type                               | Default            | Description                         |
| -------------- | ---------------------------------- | ------------------ | ----------------------------------- |
| \`placement\`    | \`MenuPlacement[]\`                  | \`['bottom-start']\` | Dropdown position                   |
| \`autoClose\`    | \`boolean \\| 'inside' \\| 'outside'\` | \`'outside'\`      | Controls when menu auto-closes      |
| \`withSubMenu\`  | \`boolean\`                          | \`false\`            | Enables submenu layout and styling  |
| \`closeOnClick\` | \`boolean\`                          | \`true\`             | Closes menu when an item is clicked |
| \`menuContainer\` | \`'body' \| null\`                 | \`'body'\`           | ngbDropdown container |

sprOpenMenuItem Inputs:

| Input               | Type                       | Default     | Description                           |
| ------------------- | -------------------------- | ----------- | ------------------------------------- |
| \`hasSubMenu\`        | \`boolean\`                  | \`false\`     | Marks item as having a nested submenu |
| \`hasTopSplitter\`    | \`boolean\`                  | \`false\`     | Adds a top separator line             |
| \`hasBottomSplitter\` | \`boolean\`                  | \`false\`     | Adds a bottom separator line          |
| \`extraClasses\`      | \`NgClass\`                  | \`-\`         | Additional CSS classes                |
| \`isDisabled\`        | \`boolean\`                  | \`false\`     | Disables the item                     |


sprOpenSubMenu Inputs:

| Input                | Type               | Default   | Description                                  |
| -------------------- | ------------------ | --------- | -------------------------------------------- |
| \`placement\`          | \`SubMenuPlacement\` | \`'right'\` | Submenu position                             |
| \`closeParentOnClick\` | \`boolean\`          | \`true\`    | Closes parent menu when submenu item clicked |


sprOpenMenuTitle - doesn't have any inputs'
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [SprOpenMenuDirective, SprButtonComponent, SprOpenMenuItemDirective, SprOpenSubMenuDirective, SprOpenMenuTitleDirective],
    }),
  ],
};

export const Menu: StoryObj<SprOpenMenuComponent> = {
  render: () => ({
    template: `
      <div>
        <spr-button size="sm" variant="link" sprOpenMenu [withSubMenu]="true">
          Open Menu

          <i class="bo-icon bo-icon-arrows-chevron-down"></i>

          <ng-template sprOpenMenuTitle>Menu Title</ng-template>

          <ng-template sprOpenMenuItem [hasSubMenu]="true">
            <div sprOpenSubMenu>
              <div style="display: flex; align-items: center; gap: 10px">
                Sub Menu

                <i class="bo-icon bo-icon-arrows-chevron-right"></i>
              </div>

              <ng-template sprOpenMenuItem>Sub Item 1</ng-template>
              <ng-template sprOpenMenuItem>Sub Item 2</ng-template>
              <ng-template sprOpenMenuItem>Sub Item 3</ng-template>
            </div>
          </ng-template>

          <ng-template sprOpenMenuItem>Menu Item 2</ng-template>
          <ng-template sprOpenMenuItem [hasBottomSplitter]="true" >Menu Item 3</ng-template>
          <ng-template sprOpenMenuItem [isDisabled]="true">Menu Item 4</ng-template>
        </spr-button>
      </div>
    `,
  }),
};

export default meta;
