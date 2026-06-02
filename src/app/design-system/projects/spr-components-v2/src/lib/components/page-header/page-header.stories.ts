import { RouterTestingModule } from '@angular/router/testing';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsBadge } from '../badge';
import { BreadcrumbItem, DsBreadcrumbs } from '../breadcrumbs';
import { DsButton } from '../button';
import { DsStatusBadgeComponent } from '../status-badge';
import { DsSegmentedControls } from '../segmented-controls';

const meta: Meta = {
  title: 'shared components/Page Header',
  parameters: {
    docs: {
      description: {
        component: `**Page Header** - set of global classes`,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, DsStatusBadgeComponent, DsBadge, DsButton, DsBreadcrumbs, NgbTooltipModule, DsSegmentedControls],
    }),
  ],
};

export const List: StoryObj = {
  args: {
    items: [
      {
        name: 'Route 1',
        path: '/home/route-1',
      },
      {
        name: 'Route 2',
        path: '/home/route-2',
      },
      {
        name: 'Route 3',
        path: '/home/route-3',
      },
      {
        name: 'Route 4',
        path: '/home/route-4',
      },
      {
        name: 'Route 5',
        path: '/home/route-3',
      },
      {
        name: 'Route 6',
        path: '/home/route-3',
      },
      {
        name: 'Route 7',
        path: '/home/route-3',
      },
      {
        name: 'Route 8',
        path: '/home/route-3',
      },
    ] as BreadcrumbItem[],
    options: [
      { id: 1, text: 'Segment1', iconStart: 'ds-icon-general-workspace' },
      { id: 2, text: 'Segment2', iconStart: 'ds-icon-general-workspace' },
      { id: 3, text: 'Segment3', iconStart: 'ds-icon-general-workspace' },
    ],
  },
  render: (args) => {
    return {
      props: { ...args },
      template: `
        <div class="page-header ds-component">
          <ng-template [ngTemplateOutlet]="bigTemplate" />
        </div>

        <div class="page-header page-header--filled ds-component">
          <ng-template [ngTemplateOutlet]="bigTemplate" />
        </div>

        <div class="page-header page-header--outlined ds-component">
          <ng-template [ngTemplateOutlet]="bigTemplate" />
        </div>

        <div class="page-header ds-component">
          <ng-template [ngTemplateOutlet]="headingTemplate" />
        </div>

        <ng-template #bigTemplate>
          <div class="page-header__row">
            <div class="page-header__col">
              <ds-button
                variant="transparent"
                size="sm"
                [isIcon]="true"
                type="button">
                  <i class="ds-icon ds-icon-arrows-arrow-left"></i>
              </ds-button>
              <h1 class="page-header__title">Heading level<i class="ds-icon ds-icon-general-check-shield"></i></h1>

              <div class="page-header__badge-list">
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
              </div>
            </div>
            <div class="page-header__col">
              <div class="page-header__badge-list">
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
              </div>

              <ds-button variant="secondary">Secondary</ds-button>
              <ds-button variant="main">Main button</ds-button>
            </div>
          </div>
          <div class="page-header__row">
            <div class="page-header__col">
              <ds-breadcrumbs [items]="items" [disableRouting]="true" />
            </div>

            <div class="page-header__col">
              <span class="page-header__info">
                This is a global retention segmentation for all types of users
                <i class="ds-icon ds-icon-general-info" ngbTooltip="Some additional tip" placement="top"></i>
              </span>
            </div>
          </div>
          <div class="page-header__row page-header__row--auto-second">
            <div class="page-header__col">
              <ds-segmented-controls [items]="options"/>
              <div class="page-header__badge-list">
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
              </div>
            </div>
            <div class="page-header__col">
              <div class="page-header__badge-list">
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
              </div>
            </div>
          </div>

        </ng-template>

        <ng-template #headingTemplate>
          <div class="page-header__row">
            <div class="page-header__col">
              <ds-button
                variant="transparent"
                size="sm"
                [isIcon]="true"
                type="button">
                  <i class="ds-icon ds-icon-arrows-arrow-left"></i>
              </ds-button>
              <h1 class="page-header__title">Heading level<i class="ds-icon ds-icon-general-check-shield"></i></h1>

              <div class="page-header__badge-list">
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
                <ds-status-badge pointColor="pink">Badge</ds-status-badge>
              </div>
            </div>
          </div>
        </ng-template>
      `,
    };
  },
};

export default meta;
