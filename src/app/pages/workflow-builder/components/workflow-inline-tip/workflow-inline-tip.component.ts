import { ChangeDetectionStrategy, Component, ComponentRef, effect, viewChild, ViewContainerRef, input } from '@angular/core';
import { DsInlineTip } from '@platform-workspace/design-system-v2';

@Component({
  selector: 'app-workflow-inline-tip',
  template: `<ng-container #tipHost />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowInlineTipComponent {
  readonly message = input.required<string>();

  private readonly tipHost = viewChild.required('tipHost', { read: ViewContainerRef });
  private tipRef?: ComponentRef<DsInlineTip>;

  constructor() {
    effect(() => {
      const host = this.tipHost();
      const text = this.message();
      if (!host) {
        return;
      }

      host.clear();
      this.tipRef = host.createComponent(DsInlineTip, {
        projectableNodes: [[document.createTextNode(text)]],
      });
      this.tipRef.setInput('type', 'primary');
      this.tipRef.setInput('variant', 'filled');
      this.tipRef.changeDetectorRef.detectChanges();
    });
  }
}
