import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { GetControlErrorMessagePipe } from '../../shared';
import { DsErrorComponent } from '../error/error.component';
import { DsFieldDescriptionComponent } from '../field-description/field-description.component';
import { DsLabelComponent } from '../label/label.component';
import { v7 } from 'uuid';
import { injectDefaultErrorMessageConfig } from '../../shared/models/base-control/constants/base-control.constant';

@Component({
  selector: 'ds-form-field',
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GetControlErrorMessagePipe, DsErrorComponent, DsFieldDescriptionComponent, DsLabelComponent, ReactiveFormsModule],
})
export class DsFormField {
  label = input<string>('');
  description = input<string>('');
  tooltip = input<string | null>(null);
  tooltipClassForLabel = input<string | null>('ds-component');
  inputId = input<string>(v7());
  errorMessages = input(injectDefaultErrorMessageConfig());
  control = input<AbstractControl | null>();
  isInvalid = input<boolean>(false);
}
