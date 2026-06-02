import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SprControlSizeDirective } from '../../shared/directives/spr-control-size.directive';
import { BaseControl } from '../../shared/models/base-control/base-control';
import { GetControlErrorMessagePipe } from '../../shared/pipes/get-control-error-message/get-control-error-message.pipe';
import { SprErrorComponent } from '../error/spr-error.component';
import { SprFieldDescriptionComponent } from '../field-description/spr-field-description.component';
import { SprLabelDirective } from '../../directives/spr-label';

@Component({
  selector: 'spr-textarea',
  templateUrl: './spr-textarea.component.html',
  styleUrls: ['./spr-textarea.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GetControlErrorMessagePipe,
    SprControlSizeDirective,
    SprErrorComponent,
    SprFieldDescriptionComponent,
    SprLabelDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprTextareaComponent extends BaseControl<FormControl<string | null>> {
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
