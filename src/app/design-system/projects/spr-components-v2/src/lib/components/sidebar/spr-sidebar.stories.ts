import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideRouter, Router, Routes } from '@angular/router';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsSidebarMenuOption } from './components/sidebar-menu-option/sidebar-menu-option';
import { DsSidebarComponent } from './sidebar.component';

@Component({
  template: `
    <div style="padding: 24px; color: #555;">
      <h2 style="margin-top: 0;">Main Content Area</h2>
      <p>Current active route:</p>
      <code style="background: #eee; padding: 4px 8px; border-radius: 4px; font-weight: bold;">
        {{ router.url }}
      </code>
    </div>
  `,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
class DummyComponent {
  router = inject(Router);
}

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DummyComponent },
  { path: 'nav-1', component: DummyComponent },
  { path: 'nav-2', redirectTo: 'nav-2/sub-nav-1/sub-sub-nav-1', pathMatch: 'full' },
  { path: 'nav-2/sub-nav-1/sub-sub-nav-1', component: DummyComponent },
  { path: 'nav-2/sub-nav-1/sub-sub-nav-1/123', component: DummyComponent },
  { path: 'nav-2/sub-nav-1/sub-sub-nav-2', component: DummyComponent },
  { path: 'nav-2/sub-nav-2', component: DummyComponent },
  { path: 'nav-2/sub-nav-3', component: DummyComponent },
  { path: 'nav-3', redirectTo: 'nav-3/sub-nav-1', pathMatch: 'full' },
  { path: 'nav-3/sub-nav-1', component: DummyComponent },
  { path: 'nav-3/sub-nav-2', component: DummyComponent },
  { path: 'nav-4/sub-nav-1', component: DummyComponent },
  { path: 'nav-4/sub-nav-2', component: DummyComponent },
  { path: 'nav-4/sub-nav-2', component: DummyComponent },
  { path: 'nav-5', redirectTo: 'nav-5/sub-nav-1', pathMatch: 'full' },
  { path: 'nav-5/sub-nav-1', component: DummyComponent },
  { path: 'nav-5/sub-nav-2', component: DummyComponent },
  { path: 'nav-6', component: DummyComponent },
  { path: 'nav-7', component: DummyComponent },
];

const meta: Meta<DsSidebarComponent> = {
  title: 'shared components/Sidebar',
  component: DsSidebarComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Sidebar** component allows users to select page from list you provide.

This component enhances user experience by providing a clear and intuitive interface for creating side menus.

To provide permission for routes you can extend base item class **SidebarNavItem** then you can add there any other props.

- The user's collapsed/expanded preference is saved and restored in localStorage.

E.g. using pipes for [items] and [title] props
        `,
      },
    },
  },
  argTypes: {
    items: {
      description: 'Array of sidebar menu items. Each item have base class SidebarNavItem',
    },
    collapseBreakpoint: {
      description:
        'The breakpoint where the sidebar switches to mobile view. Instead of collapsing, it should be hidden off-screen and slide out in its full size when opened.',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
    applicationConfig({
      providers: [provideRouter(routes)],
    }),
  ],
};

export const Sidebar: StoryObj<DsSidebarComponent> = {
  render: (args) => ({
    props: args,
    template: `
    <div style="height: 550px">
          <ds-sidebar
            [items]="items"
            [isMenuModeCollapsed]="isMenuModeCollapsed"
            [isMenuMode]="isMenuMode"
            [collapseBreakpoint]="collapseBreakpoint"
            [newsBlock]="newsBlock"
            [footerLinks]="footerLinks"></ds-sidebar>
            </div>
    `,
  }),
  args: {
    newsBlock: {
      title: 'We\u2019ve introduced an improved table!',
      description: 'See what\u2019s new',
      link: '#',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&q=60',
    },
    isMenuMode: false,
    isMenuModeCollapsed: false,
    collapseBreakpoint: 0,
    items: [
      {
        label: 'Backoffice',
        isLoading: false,
        iconClass: 'ds-icon-general-folder',
        iconBg: 'linear-gradient(157deg, #8450DC -8.41%, #4C26B4 47.28%, #301F92 96.89%)',
        value: 'Backoffice',
        subNavs: [
          {
            label: 'Player reports-reports-reports-reports',
            iconClass: 'ds-icon-general-check-shield',
            type: 'link',
            link: '/',
            paths: 'exact',
          },
        ],
      },
      {
        label: 'CRM',
        iconClass: 'ds-icon-general-pointer',
        value: 'CRM',
        iconBg: 'linear-gradient(180deg, #3695ED 0%, #1261D1 100%)',
        subNavs: [
          {
            type: 'link',
            label: 'Bonus reports',
            iconClass: 'ds-icon-general-boat',
            link: '/nav-2/sub-nav-2',
            unreadCount: 2,
          },
          {
            label: 'Player reports',
            iconClass: 'ds-icon-general-check-shield',
            type: 'group',
            subNavs: [
              {
                type: 'link',
                label: 'Sub player report 1 long text truncated lorem ipsum dolore sit amet',
                link: '/nav-2/sub-nav-1/sub-sub-nav-1',
                unreadCount: 3,
              },
              {
                type: 'link',
                label: 'Sub player report 2',
                link: '/nav-2/sub-nav-1/sub-sub-nav-2',
              },
            ],
          },
          {
            type: 'group',
            label: 'Sub player report 3',
            iconClass: 'ds-icon-general-check-shield',
            subNavs: [
              {
                type: 'link',
                label: '/nav-4/sub-nav-1 long text truncated',
                link: '/nav-4/sub-nav-1',
              },
              {
                type: 'link',
                label: '/nav-4/sub-nav-2',
                link: '/nav-4/sub-nav-2',
              },
            ],
          },
          {
            type: 'link',
            label: 'Casino reports',
            iconClass: 'ds-icon-general-boat',
            link: '/nav-2/sub-nav-3',
            showDotOnly: true,
          },
        ],
      },
      {
        label: 'Gamification',
        iconClass: 'ds-icon-general-gift',
        iconBg: 'linear-gradient(142deg, #F9CB00 4.53%, #D6AF00 94.56%)',
        value: 'Gamification',
        subNavs: [
          {
            type: 'group',
            label: 'Player reports',
            iconClass: 'ds-icon-general-check-shield',
            subNavs: [
              {
                type: 'link',
                label: 'Player reports',
                link: '/nav-3/sub-nav-1',
              },
            ],
          },
          {
            type: 'group',
            label: 'Bonus reports',
            subNavs: [
              {
                type: 'link',
                label: 'Bonus reports',
                iconClass: 'ds-icon-general-boat',
                link: '/nav-3/sub-nav-2',
              },
            ],
          },
        ],
      },
      {
        label: 'Blank',
        iconClass: 'ds-icon-general-gift',
        iconBg: 'linear-gradient(142deg, #F9CB00 4.53%, #D6AF00 94.56%)',
        value: 'Blank',
        link: 'https://google.com',
        target: '_blank',
      },
      {
        label: 'Footer Link',
        iconClass: 'ds-icon-general-gift',
        value: 'Footer Link',
        isBottom: true,
        subNavs: [
          {
            type: 'link',
            label: 'Footer Link 1',
            iconClass: 'ds-icon-general-check-shield',
            link: '/nav-5/sub-nav-1',
          },
          {
            type: 'link',
            label: 'Footer Link 2',
            iconClass: 'ds-icon-general-boat',
            link: '/nav-5/sub-nav-2',
          },
        ],
      },
    ],
    footerLinks: [
      {
        tooltip: 'Log History',
        link: '/nav-5',
        iconClass: 'ds-icon-general-history',
      },
      {
        tooltip: 'Users',
        link: '/nav-6',
        iconClass: 'ds-icon-general-users',
      },
      {
        tooltip: 'Global Settings',
        link: '/nav-7',
        iconClass: 'ds-icon-control-settings',
      },
      {
        tooltip: 'Export',
        onClick: () => window.prompt('onClick function'),
        iconClass: 'ds-icon-control-upload',
      },
    ],
  },
};

export const SidebarMenuOption: StoryObj<DsSidebarMenuOption> = {
  decorators: [
    moduleMetadata({
      imports: [DsSidebarMenuOption],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 200px">
      <ds-sidebar-menu-option
        [item]="item" />
    </div>
    `,
  }),
  args: {
    item: {
      label: 'CRM',
      iconClass: 'ds-icon-general-pointer',
      value: 'CRM',
      iconBg: 'linear-gradient(180deg, #3695ED 0%, #1261D1 100%)',
      subNavs: [
        {
          type: 'link',
          label: 'Bonus reports',
          iconClass: 'ds-icon-general-boat',
          link: '/nav-2/sub-nav-2',
          unreadCount: 2,
        },
        {
          label: 'Player reports',
          iconClass: 'ds-icon-general-check-shield',
          type: 'group',
          subNavs: [
            {
              type: 'link',
              label: 'Sub player report 1 long text truncated lorem ipsum dolore sit amet',
              link: '/nav-2/sub-nav-1/sub-sub-nav-1',
              unreadCount: 3,
            },
            {
              type: 'link',
              label: 'Sub player report 2',
              link: '/nav-2/sub-nav-1/sub-sub-nav-2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Sub player report 3',
          iconClass: 'ds-icon-general-check-shield',
          subNavs: [
            {
              type: 'link',
              label: '/nav-4/sub-nav-1 long text truncated',
              link: '/nav-4/sub-nav-1',
            },
            {
              type: 'link',
              label: '/nav-4/sub-nav-2',
              link: '/nav-4/sub-nav-2',
            },
          ],
        },
        {
          type: 'link',
          label: 'Casino reports',
          iconClass: 'ds-icon-general-boat',
          link: '/nav-2/sub-nav-3',
          showDotOnly: true,
        },
      ],
    },
  },
};

export default meta;
