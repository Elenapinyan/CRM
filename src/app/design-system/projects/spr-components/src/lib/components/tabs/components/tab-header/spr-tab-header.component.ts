import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TabRouterSettings } from '../../interfaces/tabs.interface';

@Component({
  selector: 'spr-tab-header',
  templateUrl: 'spr-tab-header.component.html',
  styleUrls: ['spr-tab-header.component.scss'],
  imports: [NgIf, RouterLink, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprTabHeaderComponent {
  @Input() isActive = false;
  @Input() isDisabled = false;
  @Input() isInvalid = false;
  @Input() routerSettings?: TabRouterSettings;

  @HostListener('click', ['$event']) clickListener(event: Event): void {
    if (this.isDisabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
