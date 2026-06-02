import { Component, Input } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SprButtonComponent } from '../button/spr-button.component';
import { ModalService } from './services/modal.service';
import { SprBaseModalContentComponent } from './spr-base-modal-content.component';
import { CommonModule } from '@angular/common';

@Component({
  template: `
    <spr-base-modal-content>
      <ng-container header>
        <h4 class="modal-header__title">Header</h4>

        <button (click)="closeAction()" aria-label="Close" class="close-modal-button" type="button">
          <i class="bo-icon-control-cross"></i>
        </button>
      </ng-container>

      <ng-container body>
        <div class="grid-container">
          <div class="spr-list">
            <div class="spr-list__item">
              <div class="spr-list__item-header">Parameter 1</div>
              <div class="spr-list__item-value">
                <div class="spr-list__item-value-main">Value</div>
                <div class="spr-list__item-value-caption">Caption</div>
              </div>
            </div>
            <div class="spr-list__item">
              <div class="spr-list__item-header">Parameter 2</div>
              <div class="spr-list__item-value">
                <div class="spr-list__item-value-main">Value</div>
                <div class="spr-list__item-value-caption">Caption</div>
              </div>
            </div>
            <div class="spr-list__item">
              <div class="spr-list__item-header">Parameter 3</div>
              <div class="spr-list__item-value">
                <div class="spr-list__item-value-main">Value</div>
                <div class="spr-list__item-value-caption">Caption</div>
              </div>
            </div>
          </div>
        </div>
      </ng-container>

      <ng-container footer>
        <ng-container *ngIf="!isDeleteMode">
          <spr-button type="button" variant="link" (click)="closeAction(false)">Close</spr-button>
          <spr-button type="button" variant="severity" (click)="toggleDeleteMode()">
            <i class="bo-icon-control-delete" start style="font-size: 18px"></i>
            Delete
          </spr-button>
          <spr-button type="button" variant="outline" (click)="closeAction(false)">
            <i class="bo-icon-control-copy" start style="font-size: 18px"></i>
            Duplicate
          </spr-button>
          <spr-button type="button" variant="outline" (click)="closeAction(true)">
            <i class="bo-icon-general-edit-square" start style="font-size: 18px"></i>
            Open
          </spr-button>
        </ng-container>

        <ng-container *ngIf="isDeleteMode">
          <div class="delete-view">
            <div class="delete-view__title">This will completely remove the workflow from the system</div>
            <div class="delete-view__actions">
              <spr-button type="button" variant="link" (click)="toggleDeleteMode()">Cancel</spr-button>
              <spr-button type="button" variant="severity" (click)="closeAction(true)">
                <i class="bo-icon-control-delete" start style="font-size: 18px"></i>
                Delete
              </spr-button>
            </div>
          </div>
        </ng-container>
      </ng-container>
    </spr-base-modal-content>
  `,
  styles: [
    `
      .grid-container {
        padding: 16px;
      }
    `,
  ],
  imports: [CommonModule, SprBaseModalContentComponent, SprButtonComponent],
})
class MockModalComponent {
  @Input() closeAction!: (action?: boolean) => void;

  isDeleteMode = false;

  toggleDeleteMode(): void {
    this.isDeleteMode = !this.isDeleteMode;
  }
}

@Component({
  selector: 'spr-modal-initializer',
  template: ` <spr-button (click)="show()">Show</spr-button>`,
  imports: [SprButtonComponent],
})
class ModalInitializerComponent {
  constructor(private readonly modalService: ModalService) {}

  show(): void {
    this.modalService.open(MockModalComponent);
  }
}

const meta: Meta = {
  title: 'shared components/Modal',
  parameters: {
    docs: {
      description: {
        component: `
The **Modal component** serves as a versatile framework for creating highly customizable modal dialogs in your application.

- **Dynamic Footer:** Seamlessly switch between different sets of buttons based on user interactions.
- **Standalone Component:** Reusable and easy to integrate into various parts of your application.
- **Service-based Management:** Clean and maintainable approach to handle modal operations.

Use this modal component as a foundation to develop a wide range of modals, from simple alerts to complex, interactive dialogs.
      `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ModalInitializerComponent, MockModalComponent],
      providers: [ModalService],
    }),
  ],
};

export const Modal: StoryObj = {
  render: () => {
    return {
      template: `
        <spr-modal-initializer></spr-modal-initializer>
      `,
    };
  },
};

export default meta;
