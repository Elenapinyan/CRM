import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DsButton } from '../button';
import { ModalService } from './modal.service';
import { DsBaseModalContent } from './base-modal-content';
import { DsBadge } from '../badge';
import { ModalVariant } from './modal.options';

const TEMPLATE = `
    <ds-base-modal-content [headerVariant]="modalData.headerVariant" [footerVariant]="modalData.footerVariant">
      <ng-container header>
         <div class="modal-header__row">
            <h4 class="modal-header__title">Header</h4>

            <div class="modal-header__items-container">
              <div class="modal-header__items-group">
                <ds-button type="button" variant="main">Save</ds-button>
                <ds-button type="button" variant="secondary">Cancel</ds-button>
              </div>
              <div class="modal-header__actions">
                @if (modalSettings?.keyboard) {
                  <ds-badge content="Esc" variant="neutral" />
                }
                <button (click)="closeAction()" aria-label="Close" class="close-modal-button" type="button">
                  <i class="ds-icon ds-icon-control-cross"></i>
                </button>
              </div>
            </div>
        </div>
      </ng-container>

      <ng-container body>
        <div class="grid-container">
          <div class="spr-list">
          <div class="spr-list__item">
            <div class="spr-list__item-subtext">
              Subtext
            </div>
            <div class="spr-list__item-holder">
              <div class="spr-list__item-value">
                <div class="spr-list__item-label">
                  Label
                </div>
                <div class="spr-list__item-body">
                  Body
                </div>
              </div>
              <div class="spr-list__item-actions">
                <div class="spr-list__icon">
                   <i class="ds-icon ds-icon-control-cross"></i>
                </div>
              </div>
            </div>
            <div class="spr-list__item-caption">
              Caption
            </div>
          </div>

          <div class="spr-list__item">
            <div class="spr-list__item-subtext">
              Subtext
            </div>
            <div class="spr-list__item-holder">
              <div class="spr-list__item-value">
                <div class="spr-list__item-label">
                  Label
                </div>
                <div class="spr-list__item-body">
                  Body
                </div>
              </div>
              <div class="spr-list__item-actions">
                <div class="spr-list__icon">
                   <i class="ds-icon ds-icon-control-cross"></i>
                </div>
              </div>
            </div>
            <div class="spr-list__item-caption">
              Caption
            </div>
          </div>

          <div class="spr-list__item">
            <div class="spr-list__item-subtext">
              Subtext
            </div>
            <div class="spr-list__item-holder">
              <div class="spr-list__item-value">
                <div class="spr-list__item-label">
                  Label
                </div>
                <div class="spr-list__item-body">
                  Body
                </div>
              </div>
              <div class="spr-list__item-actions">
                <div class="spr-list__icon">
                   <i class="ds-icon ds-icon-control-cross"></i>
                </div>
              </div>
            </div>
            <div class="spr-list__item-caption">
              Caption
            </div>
          </div>
        </div>
        </div>
      </ng-container>

      <ng-container footer>
        <ds-button type="button" variant="transparent">Secondary</ds-button>

        <div class="modal-footer__items-group">
          @if (!isDeleteMode) {
            <ds-button type="button" variant="flat" (click)="closeAction(false)">Close</ds-button>
            <ds-button type="button" variant="severity" (click)="toggleDeleteMode()">
              <i class="ds-icon-control-delete" start style="font-size: 18px"></i>
              Delete
            </ds-button>
            <ds-button type="button" variant="secondary" (click)="closeAction(false)">
              <i class="ds-icon-control-copy" start style="font-size: 18px"></i>
              Duplicate
            </ds-button>
          }

          @if (isDeleteMode) {
            <div class="delete-view">
              <div class="delete-view__title">This will completely remove the workflow from the system</div>
              <div class="delete-view__actions">
                <ds-button type="button" variant="flat" (click)="toggleDeleteMode()">Cancel</ds-button>
                <ds-button type="button" variant="severity" (click)="closeAction(true)">
                  <i class="ds-icon-control-delete" start style="font-size: 18px"></i>
                  Delete
                </ds-button>
              </div>
            </div>
          }
        </div>
      </ng-container>
    </ds-base-modal-content>
  `;

@Component({
  template: TEMPLATE,
  styles: [
    `
      .grid-container {
        padding: 16px;
      }
    `,
  ],
  imports: [CommonModule, DsBaseModalContent, DsButton, DsBadge],
})
class MockModalComponent {
  @Input() modalSettings?: NgbModalOptions;
  @Input() modalData?: { headerVariant: ModalVariant; footerVariant: ModalVariant };
  @Input() closeAction!: (action?: boolean) => void;

  isDeleteMode = false;

  toggleDeleteMode(): void {
    this.isDeleteMode = !this.isDeleteMode;
  }
}

@Component({
  selector: 'ds-modal-initializer',
  template: `
    <ds-button (click)="showSmall()">Show Small</ds-button>
    <br />
    <ds-button (click)="showMedium()">Show Medium</ds-button>
    <br />
    <ds-button (click)="showLarge()">Show Large</ds-button>
    <br />
    <ds-button (click)="showFullscreen()">Show Fullscreen</ds-button>
  `,
  imports: [DsButton],
})
class ModalInitializerComponent {
  headerVariant = input<ModalVariant>();
  footerVariant = input<ModalVariant>();

  constructor(private readonly modalService: ModalService) {}

  showSmall(): void {
    this.modalService.open(MockModalComponent, {
      modalData: { headerVariant: this.headerVariant(), footerVariant: this.footerVariant() },
      settings: { keyboard: true, size: 'sm' },
    });
  }

  showMedium(): void {
    this.modalService.open(MockModalComponent, {
      modalData: { headerVariant: this.headerVariant(), footerVariant: this.footerVariant() },
      settings: { keyboard: true, size: 'lg' },
    });
  }

  showLarge(): void {
    this.modalService.open(MockModalComponent, {
      modalData: { headerVariant: this.headerVariant(), footerVariant: this.footerVariant() },
      settings: { keyboard: true, size: 'xl' },
    });
  }

  showFullscreen(): void {
    this.modalService.open(MockModalComponent, {
      modalData: { headerVariant: this.headerVariant(), footerVariant: this.footerVariant() },
      settings: { keyboard: true, size: 'fullscreen' },
    });
  }
}

const meta: Meta = {
  title: 'shared components/Modal',
  component: ModalInitializerComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Modal component** serves as a versatile framework for creating highly customizable modal dialogs in your application.

- **Dynamic Footer:** Seamlessly switch between different sets of buttons based on user interactions.
- **Standalone Component:** Reusable and easy to integrate into various parts of your application.
- **Service-based Management:** Clean and maintainable approach to handle modal operations.
- **Close modal with Escape button** You can provide property \`keyboard: true\` with settings to make your modal closable on esc button press.
- **Use \`<ds-badge content="Esc" variant="neutral"/>\`**  to show indicator near to close button for the case when modal closable with escape.

Use this modal component as a foundation to develop a wide range of modals, from simple alerts to complex, interactive dialogs.
      `,
      },
    },
  },
  argTypes: {
    headerVariant: {
      options: ['default', 'bordered', 'filled'],
      control: {
        type: 'select',
      },
      description: 'You can provide header variant',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    footerVariant: {
      options: ['default', 'bordered', 'filled'],
      control: {
        type: 'select',
      },
      description: 'You can provide footer variant',
      table: {
        defaultValue: {
          summary: 'default',
        },
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
  args: {
    headerVariant: 'default',
    footerVariant: 'default',
  },
  render: (args) => {
    return {
      props: { ...args },
      template: `
        <ds-modal-initializer [headerVariant]="headerVariant" [footerVariant]="footerVariant"></ds-modal-initializer>
      `,
    };
  },
  parameters: {
    docs: {
      source: {
        code: TEMPLATE,
      },
    },
  },
};

export default meta;
