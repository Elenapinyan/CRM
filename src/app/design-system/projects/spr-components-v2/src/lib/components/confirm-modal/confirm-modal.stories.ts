import { Component, input } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ModalService } from '../modal';
import { DsButton } from '../button';
import { ConfirmModalData } from './confirm-modal.options';
import { DsConfirmModal } from './confirm-modal';
import { ModalVariant } from '../modal/modal.options';

@Component({
  selector: 'ds-confirm-modal-initializer',
  template: ` <ds-button (click)="showConfirmModal()">Show Confirm Modal</ds-button> `,
  imports: [DsButton],
})
class ConfirmModalInitializerComponent {
  title = input('Confirm Action');
  body = input('Are you sure you want to proceed with this action?');
  confirmButtonText = input('Confirm');
  cancelButtonText = input('Cancel');
  hideFooter = input(false);
  headerVariant = input<ModalVariant>('default');
  footerVariant = input<ModalVariant>('default');

  constructor(private readonly modalService: ModalService) {}

  showConfirmModal(): void {
    const modalData: ConfirmModalData = {
      title: this.title(),
      body: this.body(),
      confirmButtonText: this.confirmButtonText(),
      cancelButtonText: this.cancelButtonText(),
      hideFooter: this.hideFooter(),
      headerVariant: this.headerVariant(),
      footerVariant: this.footerVariant(),
    };

    this.modalService
      .open<ConfirmModalData, boolean>(DsConfirmModal, {
        modalData,
        settings: { size: 'sm', centered: true },
      })
      .subscribe((result) => {
        console.log('Modal closed with result:', result);
      });
  }
}

const meta: Meta = {
  title: 'shared components/Confirm Modal',
  component: ConfirmModalInitializerComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Confirm Modal component** provides a simple and reusable way to show confirmation dialogs in your application.

- **Customizable Content:** Configure the title, body message, and button labels.
- **Action Response:** Returns a boolean result (true for confirm, false for cancel).
- **Service-based:** Uses the ModalService for clean integration.
- **Responsive Design:** Automatically adjusts to different screen sizes.

Use this component when you need user confirmation before performing critical actions like deletions or irreversible changes.
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the modal',
      table: {
        defaultValue: {
          summary: 'Confirm Action',
        },
      },
    },
    hideFooter: {
      control: 'boolean',
      description: 'Whether to show the footer with action buttons',
      table: {
        defaultValue: {
          summary: `false`,
        },
      },
    },
    body: {
      control: 'text',
      description: 'The body message of the modal',
      table: {
        defaultValue: {
          summary: 'Are you sure you want to proceed with this action?',
        },
      },
    },
    confirmButtonText: {
      control: 'text',
      description: 'The text for the confirm button',
      table: {
        defaultValue: {
          summary: 'Confirm',
        },
      },
    },
    cancelButtonText: {
      control: 'text',
      description: 'The text for the cancel button',
      table: {
        defaultValue: {
          summary: 'Cancel',
        },
      },
    },
    headerVariant: {
      options: ['default', 'bordered', 'filled'],
      control: {
        type: 'select',
      },
      description: 'Specify the header Variant attribute.',
      table: {
        type: {
          summary: 'default | bordered | filled',
        },
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
      description: 'Specify the footer Variant attribute.',
      table: {
        type: {
          summary: 'default | bordered | filled',
        },
        defaultValue: {
          summary: 'default',
        },
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DsConfirmModal],
      providers: [ModalService],
    }),
  ],
};

export const ConfirmModal: StoryObj<ConfirmModalData> = {
  args: {
    title: 'Confirm Action',
    body: 'Are you sure you want to proceed with this action?',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    hideFooter: false,
    headerVariant: 'filled',
    footerVariant: 'filled',
  },
  render: (args) => {
    return {
      props: { ...args },
      template: `
        <ds-confirm-modal-initializer
          [title]="title"
          [body]="body"
          [hideFooter]="hideFooter"
          [headerVariant]="headerVariant"
          [footerVariant]="footerVariant"
          [cancelButtonText]="cancelButtonText"
          [confirmButtonText]="confirmButtonText">
        </ds-confirm-modal-initializer>
      `,
    };
  },
};

export default meta;
