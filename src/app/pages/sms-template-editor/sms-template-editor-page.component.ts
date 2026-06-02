import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import {
  SMS_CHARS_PER_MESSAGE,
  SMS_TEMPLATE_LANGUAGES,
  SMS_TEMPLATE_VARIABLES,
  computeSmsStats,
  type SmsTemplateDraft,
} from './sms-template-editor.model';

@Component({
  selector: 'app-sms-template-editor-page',
  imports: [RouterLink],
  templateUrl: './sms-template-editor-page.component.html',
  styleUrl: './sms-template-editor-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmsTemplateEditorPageComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly queryDraft = toSignal(
    this.route.queryParamMap.pipe(
      map((params): SmsTemplateDraft => ({
        name: params.get('name')?.trim() || 'Untitled SMS template',
        description: params.get('description')?.trim() || '',
      })),
    ),
    { initialValue: { name: 'Untitled SMS template', description: '' } },
  );

  protected readonly languages = SMS_TEMPLATE_LANGUAGES;
  protected readonly variables = SMS_TEMPLATE_VARIABLES;
  protected readonly limitPerSms = SMS_CHARS_PER_MESSAGE;

  protected readonly selectedLanguageId = signal(SMS_TEMPLATE_LANGUAGES[0].id);
  protected readonly message = signal('');

  protected readonly templateTitle = computed(() => this.queryDraft().name);
  protected readonly templateDescription = computed(() => this.queryDraft().description);

  protected readonly smsStats = computed(() => computeSmsStats(this.message()));

  protected selectLanguage(languageId: string): void {
    this.selectedLanguageId.set(languageId);
  }

  protected onMessageInput(event: Event): void {
    this.message.set((event.target as HTMLTextAreaElement).value);
  }

  protected insertVariable(variable: string): void {
    const token = `{{${variable}}}`;
    this.message.update((current) => (current ? `${current} ${token}` : token));
  }
}
