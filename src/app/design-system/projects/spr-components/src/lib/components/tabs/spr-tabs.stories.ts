import { NgFor } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DefaultTabConfiguration } from './interfaces';
import { SprTabsComponent } from './spr-tabs.component';
import { SprTabHeaderDirective } from './directives/spr-tab-header.directive';
import { SprTabHeaderComponent } from './components/tab-header/spr-tab-header.component';
import { SprTabContentDirective } from './directives/spr-tab-content.directive';

const tabsConfiguration: DefaultTabConfiguration[] = [
  {
    tabKey: 'one',
    text: 'One',
    destroyOnHide: true,
  },
  {
    tabKey: 'two',
    text: 'Two',
    destroyOnHide: true,
  },
  {
    tabKey: 'three',
    text: 'Three',
    destroyOnHide: true,
  },
  {
    tabKey: 'four',
    text: 'Four',
    destroyOnHide: true,
  },
];

const meta: Meta<SprTabsComponent<'default', DefaultTabConfiguration>> = {
  title: 'shared components/Tabs',
  component: SprTabsComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Tabs component** is a versatile and interactive UI element that can be used to organize content within a page.

- **Styles:** Available in various levels to match your application's design hierarchy.
- **Orientation:** Supports both horizontal and vertical orientations.
- **Types:** Can be configured for default behavior or with routing enabled.
- **Interactivity:** Supports animations and dynamic content destruction to manage memory efficiently.

Customize the tabs to fit your needs by adjusting their appearance, content, and functionality.
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [SprTabsComponent, SprTabHeaderDirective, SprTabHeaderComponent, SprTabContentDirective, NgFor],
    }),
  ],
  argTypes: {
    variant: {
      options: ['tabs--level-first', 'tabs--level-second', 'tabs--level-third'],
      control: {
        type: 'select',
      },
      description: 'Select the tabs variant to define its visual style and significance.',
      table: {
        type: {
          summary: 'tabs--level-first | tabs--level-second  | tabs--level-third',
        },
        defaultValue: {
          summary: 'tabs--level-second',
        },
      },
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: {
        type: 'select',
      },
      description: 'Select the tabs orientation to define its visual style and significance.',
      table: {
        type: {
          summary: 'horizontal | vertical',
        },
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    type: {
      options: ['default', 'withRouting'],
      description: 'Determine if the tabs should operate with internal routing or function as a standard tab interface.',
      table: {
        type: {
          summary: 'default | withRouting',
        },
        defaultValue: {
          summary: 'default',
        },
      },
      control: {
        disable: true,
      },
    },
    destroyOnHide: {
      description: 'Destroy the content of hidden tabs to free up memory and resources.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    animation: {
      description: 'Enable or disable animations when switching tabs.',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    tabsConfig: {
      description: 'Configuration object for defining the tabs, including keys, text, permissions, and destroyOnHide settings.',
    },
    isTransparentBg: {
      description: 'Adds class to the tab-content that makes background of tab-content transparent.',
    },
    isSticky: {
      description:
        'Makes the tab headers sticky so they remain visible while scrolling the content. Use only for "tabs--level-first" tab variant.',
    },
    activeId: {
      description: 'The identifier of the currently active tab.',
      table: {
        type: {
          summary: 'string | number',
        },
      },
      control: {
        disable: true,
      },
    },
  },
};

export const Tabs: StoryObj<SprTabsComponent<'default', DefaultTabConfiguration>> = {
  args: {
    variant: 'tabs--level-first',
    orientation: 'horizontal',
    destroyOnHide: true,
    animation: true,
    isTransparentBg: false,
    isSticky: false,
    activeId: 'two',
    type: 'default',
    tabsConfig: tabsConfiguration,
  },
  render: (args) => ({
    props: {
      ...args,
      setSelectedTab: (activeTab: string): void => {
        args.activeId = activeTab;
      },
      getTabState: (tabKey: string): { isInvalid: boolean; isDisabled: boolean } => {
        switch (tabKey) {
          case 'three':
            return { isInvalid: true, isDisabled: false };
          case 'four':
            return { isInvalid: false, isDisabled: true };
          default:
            return { isInvalid: false, isDisabled: false };
        }
      },
    },
    template: `
      <spr-tabs
        [type]="type"
        [variant]="variant"
        [activeId]="activeId"
        [isSticky]="isSticky"
        [animation]="animation"
        [tabsConfig]="tabsConfig"
        [orientation]="orientation"
        [destroyOnHide]="destroyOnHide"
        [isTransparentBg]="isTransparentBg"
        (setSelectedTab)="setSelectedTab($event)">
        <ng-container *ngFor="let tab of tabsConfig">
          <ng-template
            [sprTabHeader]="tab.tabKey"
            let-context>
            <spr-tab-header
              [isActive]="context.isActive"
              [isInvalid]="getTabState(tab.tabKey).isInvalid"
              [isDisabled]="getTabState(tab.tabKey).isDisabled">
              <span>{{ context.text }}</span>
            </spr-tab-header>
          </ng-template>

          <div *sprTabContent="tab.tabKey">
            <div style="padding: 16px">
              Content of {{ tab.text }}
              <ng-container *ngIf="getTabState(tab.tabKey).isInvalid"> (Tab has an error state)</ng-container>
            </div>
          </div>
        </ng-container>
      </spr-tabs>
    `,
  }),
};

export default meta;
