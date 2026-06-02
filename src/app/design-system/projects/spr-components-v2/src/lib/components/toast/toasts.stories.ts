import { Component, TemplateRef } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsButton } from '../button';
import { DsToastCustomDirective } from './toast-custom';
import { DsToastTemplateDirective } from './toast-template';
import { ToastItemDataAdvanced } from './toast.options';
import { ToastService } from './toast.service';
import { DsToasts } from './toasts';

const TEMPLATE = `
  <section class="storybook-section">
    <h3 class="storybook-title">Basic API</h3>

    <div class="storybook-list">
      <ds-button (click)="showInfo()">Show Info (With Footer Message)</ds-button>
      <ds-button (click)="showSuccess()">Show Success (With Footer Message)</ds-button>
      <ds-button (click)="showError()">Show Error (Without Footer Message)</ds-button>
      <ds-button (click)="showWarning()">Show Warning (Without Footer Message)</ds-button>
    </div>
  </section>

  <section class="storybook-section">
    <h3 class="storybook-title">Advanced API</h3>

    <div class="storybook-list">
      <ds-button (click)="showJustTitle()">Show just title</ds-button>
      <ds-button (click)="showSuccessCustom()">Show New Success</ds-button>

      <ng-template #header>
        <strong>Some title</strong>
      </ng-template>

      <ng-template #description>
        <span>Some <b>description</b></span>
      </ng-template>

      <ng-template #footer>
        <ds-button
            themeType="alt" variant="link" (click)="showSuccessCustom()">Show New Success</ds-button>
        <ds-button
            themeType="alt" variant="link" (click)="showSuccessCustom()">Show New Success</ds-button>
      </ng-template>

      <ds-button (click)="showSuccessCustomTemplate(header, description, footer)">Show New Success Custom Separate Templates</ds-button>

      <ng-container
        dsToastCustom
        #customToast="dsToastCustom">
        <ng-template dsToastTemplate="header">Fully custom header</ng-template>
        <ng-template dsToastTemplate="description">Fully custom description</ng-template>
        <ng-template dsToastTemplate="footer">Fully custom footer</ng-template>
        <ng-template dsToastTemplate="icon"><i class="ds-icon-control-check-circle"></i></ng-template>
      </ng-container>

      <ds-button (click)="customToast.show()">Show Custom Template Toast Full Template</ds-button>
      <ds-button (click)="showSuccessCustomByData(customToast.data())">Show Custom Template Toast Full Template 2</ds-button>

      <ds-button dsToastCustom>
        <ng-template dsToastTemplate="header">Fully custom header</ng-template>
        <ng-template dsToastTemplate="description">Fully custom description</ng-template>
        <ng-template dsToastTemplate="footer">Fully custom footer</ng-template>
        <ng-template dsToastTemplate="icon"><i class="ds-icon-control-check-circle"></i></ng-template>

        Show Custom Template Toast Full Template 3
      </ds-button>
    </div>
  </section>

  <ds-toasts></ds-toasts>`;

@Component({
  selector: 'ds-story-book-toast-buttons',
  template: TEMPLATE,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      }
    `,
  ],
  imports: [DsToasts, DsButton, DsToastTemplateDirective, DsToastCustomDirective],
})
class DsStoryBookToastButtonsComponent {
  constructor(private readonly toastService: ToastService) {}

  showInfo(): void {
    this.toastService.showInfo('Info', {
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

  showJustTitle(): void {
    this.toastService.push({
      header: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    });
  }

  showSuccessCustom(): void {
    this.toastService.showSuccessCustom({
      header: '<strong>Success</strong>',
      description: 'This <b>action</b> cannot be undone.',
      footer: '<a href="https://google.com/">Button</a>',
      icon: 'ds-icon-control-check-circle',
    });
  }

  showSuccessCustomTemplate(header: TemplateRef<unknown>, description: TemplateRef<unknown>, footer: TemplateRef<unknown>): void {
    this.toastService.showSuccessCustom({
      header,
      description,
      footer,
    });
  }

  showSuccessCustomByData(data: ToastItemDataAdvanced): void {
    this.toastService.showSuccessCustom(data);
  }
}

const meta: Meta<DsToasts> = {
  title: 'shared components/Toast',
  component: DsToasts,
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
      imports: [DsStoryBookToastButtonsComponent],
    }),
  ],
};

export const Toasts: StoryObj<DsToasts> = {
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `<ds-story-book-toast-buttons />`,
      applicationConfig: {
        providers: [provideAnimations()],
      },
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
