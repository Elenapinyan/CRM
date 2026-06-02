import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppThemeType, ThemeFacadeService } from '../../sdk/theme';
import { DsRadioButtonComponent } from '../radio-button/radio-button.component';

@Component({
  selector: 'ds-app-theme-sdkexample',
  imports: [DsRadioButtonComponent, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './app-theme-sdkexample.component.html',
  styleUrl: './app-theme-sdkexample.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppThemeSDKExampleComponent implements OnInit {
  private readonly themeFacade = inject(ThemeFacadeService);

  private readonly destroyRef = inject(DestroyRef);

  protected readonly themes: AppThemeType[] = ['system', 'light', 'dark'];

  protected readonly control = inject(NonNullableFormBuilder).control<AppThemeType>(this.themeFacade.currentTheme());

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.themeFacade.setTheme(value || 'system');
    });
  }
}
