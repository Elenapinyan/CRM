import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SprButtonComponent } from '../button/spr-button.component';
import { ToastType } from './enums/toast-type.enum';
import { SprToastService } from './services/spr-toast.service';
import { SprToastsComponent } from './spr-toasts.component';

@Component({
  selector: 'spr-story-book-toast-buttons',
  template: `<spr-button (click)="showSuccess()">Show Success (With Footer Message)</spr-button>
    <spr-button (click)="showInfo()">Show Info (With Footer Message)</spr-button>
    <spr-button (click)="showError()">Show Error (Without Footer Message)</spr-button>
    <spr-button (click)="showWarning()">Show Warning (Without Footer Message)</spr-button>

    <spr-toasts></spr-toasts>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      }
    `,
  ],
  imports: [SprToastsComponent, SprButtonComponent],
})
class SprStoryBookToastButtonsComponent {
  constructor(private readonly toastService: SprToastService) {}

  showInfo(): void {
    this.toastService.show('Info', ToastType.Info, {
      footerMessage: 'This action cannot be undone.',
    });
  }

  showSuccess(): void {
    this.toastService.showSuccess('Success', {
      footerMessage: 'This action cannot be undone.',
    });
  }

  showError(): void {
    this.toastService.showError('Error');
  }

  showWarning(): void {
    this.toastService.showWarning('Warning');
  }
}

const meta: Meta<SprToastsComponent> = {
  title: 'shared components/Toast',
  component: SprToastsComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Toast** component is used to display temporary notifications, providing users with unobtrusive feedback about actions or events, such as success messages, errors, or status updates.
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [SprStoryBookToastButtonsComponent],
      providers: [],
    }),
  ],
};

export const Toasts: StoryObj<SprToastsComponent> = {
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <spr-story-book-toast-buttons></spr-story-book-toast-buttons>
      `,
    };
  },
};

export default meta;
