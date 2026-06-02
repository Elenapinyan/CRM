import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsButton } from '../button';
import { DsOpenMenuComponent } from './open-menu.component';
import { DsOpenMenuDirective } from './directives/open-menu';
import { DsOpenMenuItemDirective } from './directives/open-menu-item';
import { DsOpenSubMenuDirective } from './directives/open-sub-menu';
import { DsOpenMenuTitleDirective } from './directives/open-menu-title';
import { DsOpenMenuFooterDirective } from './directives/open-menu-footer';
import { DsOpenGroupMenuTitleDirective } from './directives/open-group-menu-title';
import { DsOpenGroupMenuDirective } from './directives/open-menu-group';

interface MenuArgs {
  withSearch: boolean;
  searchPlaceholder: string;
  withFooter: boolean;
  footerCancelText: string;
  footerSubmitText: string;
}

const meta: Meta<DsOpenMenuDirective & MenuArgs> = {
  title: 'shared components/Menu',
  component: DsOpenMenuComponent,
  argTypes: {
    withSearch: {
      control: 'boolean',
      description: 'Enable search functionality for main menu',
      table: {
        category: 'Search',
        defaultValue: { summary: 'false' },
      },
    },
    resetSearchOnClose: {
      control: 'boolean',
      description: 'Reset search input value when menu is closed',
      table: {
        category: 'Search',
        defaultValue: { summary: 'true' },
      },
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for main menu search input',
      table: {
        category: 'Search',
        defaultValue: { summary: 'Search' },
      },
    },
    withFooter: {
      control: 'boolean',
      description: 'Enable footer with action buttons',
      table: {
        category: 'Footer',
        defaultValue: { summary: 'false' },
      },
    },
    footerCancelText: {
      control: 'text',
      description: 'Text for cancel button in footer',
      table: {
        category: 'Footer',
        defaultValue: { summary: 'Cancel' },
      },
    },
    footerSubmitText: {
      control: 'text',
      description: 'Text for submit button in footer',
      table: {
        category: 'Footer',
        defaultValue: { summary: 'Submit' },
      },
    },
    menuSize: {
      control: 'select',
      options: ['md', 'auto'],
      description: 'Set menu size',
      table: {
        defaultValue: { summary: 'auto' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
### Menu with Title and Submenu

This example shows how to use the \`sprOpenMenu\` directive for opening menu with a title and submenu together with:

* \`sprOpenMenuTitle\` directive - to display a title at the top of the menu
* \`sprOpenMenuItem\` directive - to define menu items
* \`sprOpenSubMenu\` directive - to create a nested submenu
* \`sprOpenMenuFooter\` directive - to add a footer with action buttons

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
| \`withSearch\`   | \`boolean\`                          | \`false\`            | Enables search functionality        |
| \`searchPlaceholder\` | \`string\`                     | \`'Search'\`         | Search input placeholder text       |

sprOpenMenuFooter props:

| Input               | Type                       | Default     | Description                           |
| ------------------- | -------------------------- | ----------- | ------------------------------------- |
| \`sprOpenMenuFooter\`        | \`null | { cancel?: string; submit: string }\`  | \`null\`     | Config for cancel and submit btn text |

| Output         | Type         | Description                      |
| -------------- | ------------ | -------------------------------- |
| \`canceled\` | \`void\`       | Emitted when cancel button clicked |
| \`submitted\` | \`void\`       | Emitted when submit button clicked |

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
| \`withSearch\`         | \`boolean\`          | \`false\`   | Enables search functionality in submenu      |
| \`searchPlaceholder\`  | \`string\`           | \`'Search'\`| Search input placeholder text                |

sprOpenGroupMenu Inputs:

| Input                | Type               | Default   | Description                                  |
| -------------------- | ------------------ | --------- | -------------------------------------------- |
| \`closeEntireMenuOnChildClick\`| \`boolean\` | \`true\` | Closes parent menu component when group menu item clicked |
| \`closeGroupMenuOnChildClick\` | \`boolean\` | \`true\` | Closes group menu when item clicked |


sprOpenMenuTitle - doesn't have any inputs'

sprOpenGroupMenuTitle - doesn't have any inputs'
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        DsOpenMenuDirective,
        DsButton,
        DsOpenMenuItemDirective,
        DsOpenSubMenuDirective,
        DsOpenMenuTitleDirective,
        DsOpenMenuFooterDirective,
        DsOpenGroupMenuDirective,
        DsOpenGroupMenuTitleDirective,
      ],
    }),
  ],
};

export const Menu: StoryObj<DsOpenMenuDirective & MenuArgs> = {
  args: {
    withSearch: false,
    resetSearchOnClose: true,
    searchPlaceholder: 'Search',
    withFooter: false,
    footerCancelText: 'Clear all',
    footerSubmitText: 'Apply',
    menuSize: 'auto',
  },
  render: (args) => ({
    props: {
      ...args,
      onCancel: () => alert('Cancel clicked'),
      onSubmit: () => alert('Submit clicked'),
    },
    template: `
      <div>
        <ds-button
          size="md"
          variant="main"
          dsOpenMenu
          [menuSize]="menuSize"
          [withSubMenu]="true"
          [withSearch]="withSearch"
          [resetSearchOnClose]="resetSearchOnClose"
          [searchPlaceholder]="searchPlaceholder"
          [dsOpenMenuFooter]="withFooter ? {cancel: footerCancelText, submit: footerSubmitText} : undefined"
          (canceled)="onCancel()"
          (submitted)="onSubmit()">
          Open Menu

          <i class="ds-icon ds-icon-arrows-chevron-down"></i>

          <ng-template dsOpenMenuTitle>Menu Title</ng-template>

          <ng-template sprOpenMenuItem [hasSubMenu]="true">
            <div dsOpenSubMenu>
              <div style="display: flex; align-items: center; gap: 8px; justify-content: space-between">
                <div class="open-menu-component__item-text">Sub Menu</div>
                <i class="ds-icon ds-icon-arrows-chevron-right"></i>
              </div>

              <ng-template sprOpenMenuItem="Sub Item 1">
                <div class="open-menu-component__item-text">Sub Item 1</div>
              </ng-template>

              <ng-template sprOpenMenuItem="Sub Item 2">
                <div class="open-menu-component__item-text">Sub Item 2</div>
              </ng-template>

              <ng-template sprOpenMenuItem="Sub Item 3">
                <div class="open-menu-component__item-text">Sub Item 3</div>
              </ng-template>
            </div>
          </ng-template>

          <ng-template sprOpenMenuItem [hasSubMenu]="true">
            <div dsOpenGroupMenu>
              <ng-template dsOpenGroupMenuTitle>Group Menu Title</ng-template>

              <ng-template sprOpenMenuItem="Menu Item 1">
                <div class="open-menu-component__item-text">Menu Item 1</div>
              </ng-template>

              <ng-template sprOpenMenuItem="Menu Item 2 (disabled)" [isDisabled]="true">
                <div class="open-menu-component__item-text">Menu Item 2 (disabled)</div>
              </ng-template>

              <ng-template sprOpenMenuItem="Menu Item 3 with icon (disabled)" [isDisabled]="true">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <i class="ds-icon ds-icon-control-cross"></i>
                  <div class="open-menu-component__item-text">Menu Item 3 with icon (disabled)</div>
                </div>
              </ng-template>

              <ng-template sprOpenMenuItem="Menu Item 4 long text description lorem ipsum dolore">
                <div class="open-menu-component__item-text">Menu Item 4 long text description lorem ipsum dolore</div>
              </ng-template>

              <ng-template sprOpenMenuItem="Menu Item 5">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <i class="ds-icon ds-icon-control-cross"></i>
                  <div class="open-menu-component__item-text">Menu Item 5</div>
                </div>
              </ng-template>
            </div>
          </ng-template>

          <ng-template sprOpenMenuItem="Menu Item 4">
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="ds-icon ds-icon-changelog-edit-colored"></i>
              <div class="open-menu-component__item-text">Menu Item 4</div>
            </div>
          </ng-template>

          <ng-template sprOpenMenuItem="Menu Item 5 with icon and long text description lorem ipsum dolore">
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="ds-icon ds-icon-changelog-eye-on-colored"></i>
              <div class="open-menu-component__item-text">Menu Item 5 with icon and long text description lorem ipsum dolore</div>
            </div>
          </ng-template>

          <ng-template sprOpenMenuItem="Menu Item 6 long description text Lorem ipsum dolore sit amet" [hasBottomSplitter]="true">
            <div class="open-menu-component__item-text">Menu Item 6 long description text Lorem ipsum dolore sit amet</div>
          </ng-template>

          <ng-template sprOpenMenuItem="Option 7">
            <div class="open-menu-component__item-text">Option 7</div>
          </ng-template>

          <ng-template sprOpenMenuItem="Option 8">
            <div class="open-menu-component__item-text">Option 8</div>
          </ng-template>

          <ng-template sprOpenMenuItem="Option 9">
            <div class="open-menu-component__item-text">Option 9</div>
          </ng-template>

          <ng-template sprOpenMenuItem="Option 10">
            <div class="open-menu-component__item-text">Option 10</div>
          </ng-template>

          <ng-template sprOpenMenuItem="Delete (disabled)" [isDisabled]="true">
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="ds-icon ds-icon-control-delete"></i>
              <div class="open-menu-component__item-text">Delete (disabled)</div>
            </div>
          </ng-template>
        </ds-button>
      </div>
    `,
  }),
};

export default meta;
