import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DsAutocloseBase } from '../../shared/index';
import { AppearanceAnimations } from '../../shared/animations';
import { AlertType, AlertTypes, DEFAULT_ICON } from './alert.options';

@Component({
  selector: 'ds-alert, [ds-alert]',
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'alert',
    '[class]': 'type() ? "alert--" + type() : ""',
    '[class.alert--custom-content]': '!message()',
    '[class.alert--dismissible]': 'dismissible()',
  },
  animations: [AppearanceAnimations],
  imports: [AsyncPipe],
})
export class DsAlert extends DsAutocloseBase {
  protected readonly defaultIcon = computed(() => this.getDefaultIcon(this.type()));
  protected readonly iconClass = computed(() => this.icon() || this.defaultIcon());

  /**
   * Title is optional.
   **/
  title = input<string>();

  /**
   * Message is optional. You can use content projection instead.
   **/
  message = input<string>();

  /**
   * Alert type changes style and icon
   * @default 'info'
   **/
  type = input<AlertType>(AlertTypes.INFO);

  /**
   * Make alert dismissable and adds close button to the right top corner
   * @default true
   **/
  dismissible = input<boolean>(true);

  /**
   * Icon displayed near the title
   * @default DEFAULT_ICON = 'ds-icon-general-info'
   **/
  icon = input<string>(DEFAULT_ICON);

  protected readonly timerPercent$: Observable<number> = this.timer$.pipe(map((v) => v.percents));

  private getDefaultIcon(type: AlertType): string {
    switch (type) {
      case AlertTypes.INFO: {
        return 'ds-icon-general-info';
      }
      case AlertTypes.SUCCESS: {
        return 'ds-icon-control-check-circle';
      }
      case AlertTypes.WARNING: {
        return 'ds-icon-general-info';
      }
      case AlertTypes.DANGER: {
        return 'ds-icon-control-cross-circle';
      }
      default: {
        return 'ds-icon-general-info';
      }
    }
  }
}
