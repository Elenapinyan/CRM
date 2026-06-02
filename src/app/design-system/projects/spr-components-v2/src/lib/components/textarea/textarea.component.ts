import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DsLabelDirective } from '../../directives/label';
import { BaseControl, GetControlErrorMessagePipe, DsControlSizeDirective } from '../../shared';
import { DsErrorComponent } from '../error/error.component';
import { DsFieldDescriptionComponent } from '../field-description/field-description.component';

@Component({
  selector: 'ds-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GetControlErrorMessagePipe,
    DsControlSizeDirective,
    DsErrorComponent,
    DsFieldDescriptionComponent,
    DsLabelDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTextareaComponent extends BaseControl<FormControl<string | null>> {
  @Input() maxTextareaLength: number | null = null;
  @Input() placeholder: string | null = '';
  @Input() rowsCount: number = 3;

  @Output() blurEvent = new EventEmitter<FocusEvent>();

  @ViewChild('textareaElement', { read: ElementRef }) textareaElement!: ElementRef<HTMLTextAreaElement>;

  focus(): void {
    this.textareaElement.nativeElement.focus();
  }

  onBlur(event: FocusEvent): void {
    this.cvaOnTouched();

    this.blurEvent.emit(event);
  }

  protected override initControl(): FormControl<string | null> {
    return this.formBuilder.nonNullable.control<string | null>('');
  }
}
