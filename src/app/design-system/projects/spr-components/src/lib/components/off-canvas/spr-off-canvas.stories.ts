import { Component, Input } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SprButtonComponent } from '../button/spr-button.component';
import { OffCanvasService } from './services/off-canvas.service';
import { SprBaseOffCanvasContentComponent } from './spr-base-off-canvas-content.component';

@Component({
  template: `
    <spr-base-off-canvas-content>
      <ng-container header>
        <h4 class="canvas-header__title">Header</h4>

        <button (click)="closeAction()" aria-label="Close" class="close-modal-button" type="button">
          <i class="bo-icon-control-cross"></i>
        </button>
      </ng-container>

      <ng-container body> Body </ng-container>

      <ng-container footer>
        <spr-button variant="outline" size="md"> Cancel </spr-button>

        <spr-button variant="primary" size="md"> Submit </spr-button>
      </ng-container>

      <ng-container backdrop> Backdrop Text </ng-container>
    </spr-base-off-canvas-content>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `,
  ],
  imports: [SprBaseOffCanvasContentComponent, SprButtonComponent],
})
class MockOffCanvasComponent {
  @Input() closeAction!: (action?: void | undefined) => void;
}

@Component({
  selector: 'spr-off-canvas-initializer',
  template: `<spr-button (click)="show()">Show</spr-button>`,
  imports: [SprButtonComponent],
})
class OffCanvasInitializerComponent {
  constructor(private readonly offCanvasService: OffCanvasService) {}

  show(): void {
    this.offCanvasService.open(MockOffCanvasComponent);
  }
}

const meta: Meta = {
  title: 'shared components/Off Canvas',
  parameters: {
    docs: {
      description: {
        component: `
        **OffCanvas** component.
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [OffCanvasInitializerComponent, MockOffCanvasComponent],
      providers: [OffCanvasService],
    }),
  ],
};

export const OffCanvas: StoryObj = {
  render: () => {
    return {
      template: `
        <spr-off-canvas-initializer></spr-off-canvas-initializer>
      `,
    };
  },
};

export default meta;
