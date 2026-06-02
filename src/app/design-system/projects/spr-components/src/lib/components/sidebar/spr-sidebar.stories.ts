import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SprSidebarComponent } from './spr-sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

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
})
class DummyComponent {
  router = inject(Router);
}

const routes: Routes = [
  { path: '', redirectTo: 'nav-1', pathMatch: 'full' },
  { path: 'nav-1', component: DummyComponent },
  { path: 'nav-2', redirectTo: 'nav-2/sub-nav-1', pathMatch: 'full' },
  { path: 'nav-2/sub-nav-1', component: DummyComponent },
  { path: 'nav-3', redirectTo: 'nav-3/sub-nav-1', pathMatch: 'full' },
  { path: 'nav-3/sub-nav-1', component: DummyComponent },
  { path: 'nav-3/sub-nav-2', component: DummyComponent },
  { path: 'nav-3/sub-nav-3', component: DummyComponent },
  { path: 'nav-4', component: DummyComponent },
];

const meta: Meta<SprSidebarComponent> = {
  title: 'shared components/Sidebar',
  component: SprSidebarComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Sidebar** component allows users to select page from list you provide.

This component enhances user experience by providing a clear and intuitive interface for creating side menus.

To provide permission for routes you can extend base item class **SidebarNavItem** then you can add there any other props.

But please, **pay attention** that you should manage all additional features related to **sidebar items behaviour** on your side.

E.g. using pipes for [items] and [title] props
        `,
      },
    },
  },
  argTypes: {
    title: {
      description: 'Shows the main sidebar title.',
    },
    items: {
      description: 'Array of sidebar menu items. Each item have base class SidebarNavItem',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterTestingModule.withRoutes(routes)],
    }),
  ],
};

export const Sidebar: StoryObj<SprSidebarComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column">

        <header style="height: 60px; background: white; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; padding: 0 24px;">
          <a routerLink="/"
             style="font-size: 18px; font-weight: bold; color: #333; text-decoration: none; cursor: pointer; display: flex; align-items: center; gap: 8px;">
             <span style="font-size: 24px;">🚀</span>
             App Logo
          </a>
        </header>

        <div style="width: 280px; flex-shrink: 0; border-right: 1px solid #e0e0e0; height: 100%;">
          <spr-sidebar [title]="title" [items]="items"></spr-sidebar>
        </div>
      </div>
    `,
  }),
  args: {
    title: 'Application Title',
    items: [
      {
        label: 'Nav item 1',
        iconName: 'bo-icon-general-boat',
        routerLink: '/nav-1',
      },
      {
        label: 'Nav item 2',
        iconName: 'bo-icon-general-boat',
        routerLink: '/nav-2',
        subNavs: [
          {
            label: 'sub nav item 1',
            iconName: 'bo-icon-general-boat',
            routerLink: '/nav-2/sub-nav-1',
          },
        ],
      },
      {
        label: 'Nav item 3',
        iconName: 'bo-icon-general-boat',
        routerLink: '/nav-3',
        subNavs: [
          {
            label: 'sub nav item 1',
            iconName: 'bo-icon-general-boat',
            routerLink: '/nav-3/sub-nav-1',
          },
          {
            label: 'sub nav item 2',
            iconName: 'bo-icon-general-boat',
            routerLink: '/nav-3/sub-nav-2',
          },
          {
            label: 'sub nav item 3',
            iconName: 'bo-icon-general-boat',
            routerLink: '/nav-3/sub-nav-3',
          },
        ],
      },
      {
        label: 'Nav item 4',
        iconName: 'bo-icon-general-boat',
        routerLink: '/nav-4',
      },
    ],
  },
};

export default meta;
