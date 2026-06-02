import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { WORKFLOW_BUILDER_TABS, type WorkflowBuilderTabId } from '../../workflow-builder.model';

@Component({
  selector: 'app-workflow-builder-tabs',
  imports: [],
  templateUrl: './workflow-builder-tabs.component.html',
  styleUrl: './workflow-builder-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowBuilderTabsComponent {
  readonly activeTab = input<WorkflowBuilderTabId>('builder');
  readonly isNewDraft = input(true);

  protected readonly tabs = WORKFLOW_BUILDER_TABS;

  protected isDisabled(tabId: WorkflowBuilderTabId): boolean {
    return this.isNewDraft() && tabId !== 'builder';
  }
}
