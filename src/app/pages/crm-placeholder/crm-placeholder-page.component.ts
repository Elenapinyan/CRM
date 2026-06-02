import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-crm-placeholder-page',
  template: `
    <div class="crm-placeholder">
      <h1 class="crm-placeholder__title">{{ title() ?? 'CRM' }}</h1>
      <p class="crm-placeholder__text">This area is not built yet.</p>
    </div>
  `,
  styles: [
    `
      :host {
        flex: 1;
        min-height: 0;
        display: block;
      }

      .crm-placeholder {
        padding: 32px 24px;
      }

      .crm-placeholder__title {
        margin: 0 0 8px;
        font-size: var(--spr-font-size-24, 24px);
        font-weight: 600;
        color: var(--brd-neutral-1000-0, #18181b);
      }

      .crm-placeholder__text {
        margin: 0;
        font-size: var(--spr-font-size-14, 14px);
        color: var(--brd-neutral-600-400, #53535a);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrmPlaceholderPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly title = toSignal(
    this.route.data.pipe(map((d) => (typeof d['title'] === 'string' ? d['title'] : undefined))),
    { initialValue: this.route.snapshot.data['title'] as string | undefined },
  );
}
