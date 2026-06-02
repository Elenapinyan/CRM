import { Routes } from '@angular/router';

import { CrmShellLayoutComponent } from './layout/crm-shell-layout/crm-shell-layout.component';
import { CrmPlaceholderPageComponent } from './pages/crm-placeholder/crm-placeholder-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CommunicationListPageComponent } from './pages/communication-list/communication-list-page.component';
import { SmsTemplateEditorPageComponent } from './pages/sms-template-editor/sms-template-editor-page.component';
import { SegmentsListPageComponent } from './pages/segments-list/segments-list-page.component';
import { SegmentsPageComponent } from './pages/segments/segments-page.component';
import { AnalyticsLifecyclePageComponent } from './pages/analytics-lifecycle/analytics-lifecycle-page.component';
import { CohortBuilderPageComponent } from './pages/cohort-builder/cohort-builder-page.component';
import { CohortsListPageComponent } from './pages/cohorts-list/cohorts-list-page.component';
import { WorkflowsListPageComponent } from './pages/workflows-list/workflows-list-page.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { UserHistoryPageComponent } from './pages/user-history/user-history-page.component';

const shellPlaceholder = (title: string) => ({
  component: CrmShellLayoutComponent,
  children: [{ path: '', component: CrmPlaceholderPageComponent, data: { title } }],
});

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/segments' },
  {
    path: 'segments',
    component: CrmShellLayoutComponent,
    children: [
      { path: '', component: SegmentsListPageComponent },
      { path: 'build', component: SegmentsPageComponent },
    ],
  },
  {
    path: 'dashboard',
    component: CrmShellLayoutComponent,
    children: [{ path: '', component: DashboardPageComponent }],
  },
  {
    path: 'analytics',
    component: CrmShellLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'cohorts' },
      { path: 'cohorts', component: CohortsListPageComponent },
      { path: 'cohorts/build', component: CohortBuilderPageComponent },
      { path: 'lifecycle', component: AnalyticsLifecyclePageComponent },
    ],
  },
  {
    path: 'workflows',
    component: CrmShellLayoutComponent,
    children: [
      { path: '', component: WorkflowsListPageComponent },
      {
        path: 'build',
        loadComponent: () =>
          import('./pages/workflow-builder/workflow-builder-page.component').then(
            (m) => m.WorkflowBuilderPageComponent,
          ),
      },
    ],
  },
  {
    path: 'communication',
    component: CrmShellLayoutComponent,
    children: [
      { path: '', component: CommunicationListPageComponent },
      { path: 'sms', component: SmsTemplateEditorPageComponent },
    ],
  },
  { path: 'player-360', ...shellPlaceholder('Player 360') },
  {
    path: 'user-history',
    component: CrmShellLayoutComponent,
    children: [{ path: '', component: UserHistoryPageComponent }],
  },
  { path: 'demo', component: DashboardComponent },
];
