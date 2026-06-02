import { Component, signal } from '@angular/core';
import { DsOpenMenuFooterDirective } from '../open-menu-footer.directive';
import { SprMenuFooterText } from '../open-menu-footer.util';

@Component({
  selector: 'ds-test-footer-host',
  template: `
    <div [dsOpenMenuFooter]="footerText()" (canceled)="onCanceled()" (submitted)="onSubmitted()">
      <button data-testid="cancel-btn" class="cancel-btn">Cancel</button>
      <button data-testid="submit-btn" class="submit-btn">Submit</button>
    </div>
  `,
  imports: [DsOpenMenuFooterDirective],
})
export class DsTestFooterHostComponent {
  canceledCalled = signal(false);
  submittedCalled = signal(false);
  footerText = signal<SprMenuFooterText>({ cancel: 'Cancel', submit: 'Submit' });

  onCanceled(): void {
    this.canceledCalled.set(true);
  }

  onSubmitted(): void {
    this.submittedCalled.set(true);
  }
}
