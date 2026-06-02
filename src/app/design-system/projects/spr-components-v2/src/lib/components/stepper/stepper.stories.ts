import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsButton } from '../button';
import { ModalService, DsBaseModalContent } from '../modal';
import { DsStepper, DsStepperDirective } from './stepper';
import { DsStep, SprStepHeaderCustomDirective } from './step';
import { DsStepperNextDirective } from './stepper-next';
import { DsStepperPreviousDirective } from './stepper-previous';
import { DsStepperHeader } from './stepper-header';
import { DsStepperBody } from './stepper-body';

import { Component, input } from '@angular/core';
import { ModalVariant } from '../modal/modal.options';

@Component({
  selector: 'ds-mock-modal1',
  template: `
    <ds-base-modal-content headerVariant="bordered" footerVariant="bordered">
      <ng-container header>
        <div class="modal-header__row">
          <h4 class="modal-header__title">Header</h4>

          <button (click)="closeAction()" aria-label="Close" class="close-modal-button" type="button">
            <i class="ds-icon ds-icon-control-cross"></i>
          </button>
        </div>
      </ng-container>
      <ng-container body>
        <ds-stepper orientation="vertical">
          <ds-step label="Some Label1" description="Some Description Some Description Some Description Some Description">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti ea excepturi magni nihil optio pariatur, reprehenderit vel.
              Atque cumque dignissimos nam non pariatur sed unde? Excepturi maiores molestias repellat velit.
            </div>
            <div>
              Aut beatae eius iure labore maiores tempore? Corporis deserunt excepturi fugiat in modi officia ullam ut. Aperiam eos esse
              tempora voluptate. Adipisci blanditiis dolore impedit sit temporibus, vitae. At, natus.
            </div>
            <div>
              Asperiores cum delectus dolorem doloribus ea eligendi eos, id libero magnam magni molestiae, necessitatibus nesciunt nihil
              nobis omnis perspiciatis quae quod quos recusandae reiciendis sed tempora, ut vel voluptatibus voluptatum?
            </div>
            <div>
              A, accusamus alias aliquid aut beatae cum cupiditate doloribus ex facere fugit, inventore maxime mollitia numquam officia
              omnis sit ullam! Aspernatur atque commodi dolor eaque error eum reiciendis repudiandae! Neque.
            </div>
            <div>
              Aliquam ducimus eligendi optio voluptatibus. Alias autem consequuntur eum explicabo, fuga fugit, harum inventore laboriosam
              natus non perspiciatis quaerat qui recusandae temporibus vero, voluptates voluptatibus? Accusamus consequuntur dignissimos eum
              officiis.
            </div>
            <div>
              Accusamus aliquid asperiores commodi consequatur deserunt dicta doloribus, ducimus ea earum, error esse et eum explicabo,
              libero minima necessitatibus officiis optio porro quam quibusdam quod ratione reiciendis reprehenderit sed velit.
            </div>
            <div>
              Assumenda blanditiis culpa doloribus optio perferendis perspiciatis, porro quis quisquam rem repudiandae sed similique vel.
              Accusamus esse et ex fuga ipsam iure minima natus quam, quo tempora. Aperiam, quia, quos!
            </div>
            <div>
              Assumenda atque commodi cupiditate dignissimos, dolorum eos excepturi incidunt iure nam omnis quibusdam quis repellendus rerum
              sunt tenetur? Architecto ea excepturi harum nihil non quis repellat suscipit tempora ullam vero!
            </div>
            <div>
              Ad autem cum deleniti dicta ea eligendi, error id impedit laborum natus nobis numquam optio provident qui, quia quisquam
              recusandae repellendus sint ut veniam veritatis vitae voluptatibus voluptatum. Illo, possimus!
            </div>
            <div>
              Dicta doloremque eligendi fuga fugiat illo laborum molestiae necessitatibus nisi nobis nulla odit perspiciatis, quaerat quam
              quo quos saepe sit. Alias dolore dolorem earum nobis quas? Dicta ducimus odio sequi.
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti ea excepturi magni nihil optio pariatur, reprehenderit vel.
              Atque cumque dignissimos nam non pariatur sed unde? Excepturi maiores molestias repellat velit.
            </div>
            <div>
              Aut beatae eius iure labore maiores tempore? Corporis deserunt excepturi fugiat in modi officia ullam ut. Aperiam eos esse
              tempora voluptate. Adipisci blanditiis dolore impedit sit temporibus, vitae. At, natus.
            </div>
            <div>
              Asperiores cum delectus dolorem doloribus ea eligendi eos, id libero magnam magni molestiae, necessitatibus nesciunt nihil
              nobis omnis perspiciatis quae quod quos recusandae reiciendis sed tempora, ut vel voluptatibus voluptatum?
            </div>
            <div>
              A, accusamus alias aliquid aut beatae cum cupiditate doloribus ex facere fugit, inventore maxime mollitia numquam officia
              omnis sit ullam! Aspernatur atque commodi dolor eaque error eum reiciendis repudiandae! Neque.
            </div>
            <div>
              Aliquam ducimus eligendi optio voluptatibus. Alias autem consequuntur eum explicabo, fuga fugit, harum inventore laboriosam
              natus non perspiciatis quaerat qui recusandae temporibus vero, voluptates voluptatibus? Accusamus consequuntur dignissimos eum
              officiis.
            </div>
            <div>
              Accusamus aliquid asperiores commodi consequatur deserunt dicta doloribus, ducimus ea earum, error esse et eum explicabo,
              libero minima necessitatibus officiis optio porro quam quibusdam quod ratione reiciendis reprehenderit sed velit.
            </div>
            <div>
              Assumenda blanditiis culpa doloribus optio perferendis perspiciatis, porro quis quisquam rem repudiandae sed similique vel.
              Accusamus esse et ex fuga ipsam iure minima natus quam, quo tempora. Aperiam, quia, quos!
            </div>
            <div>
              Assumenda atque commodi cupiditate dignissimos, dolorum eos excepturi incidunt iure nam omnis quibusdam quis repellendus rerum
              sunt tenetur? Architecto ea excepturi harum nihil non quis repellat suscipit tempora ullam vero!
            </div>
            <div>
              Ad autem cum deleniti dicta ea eligendi, error id impedit laborum natus nobis numquam optio provident qui, quia quisquam
              recusandae repellendus sint ut veniam veritatis vitae voluptatibus voluptatum. Illo, possimus!
            </div>
            <div>
              Dicta doloremque eligendi fuga fugiat illo laborum molestiae necessitatibus nisi nobis nulla odit perspiciatis, quaerat quam
              quo quos saepe sit. Alias dolore dolorem earum nobis quas? Dicta ducimus odio sequi.
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti ea excepturi magni nihil optio pariatur, reprehenderit vel.
              Atque cumque dignissimos nam non pariatur sed unde? Excepturi maiores molestias repellat velit.
            </div>
            <div>
              Aut beatae eius iure labore maiores tempore? Corporis deserunt excepturi fugiat in modi officia ullam ut. Aperiam eos esse
              tempora voluptate. Adipisci blanditiis dolore impedit sit temporibus, vitae. At, natus.
            </div>
            <div>
              Asperiores cum delectus dolorem doloribus ea eligendi eos, id libero magnam magni molestiae, necessitatibus nesciunt nihil
              nobis omnis perspiciatis quae quod quos recusandae reiciendis sed tempora, ut vel voluptatibus voluptatum?
            </div>
            <div>
              A, accusamus alias aliquid aut beatae cum cupiditate doloribus ex facere fugit, inventore maxime mollitia numquam officia
              omnis sit ullam! Aspernatur atque commodi dolor eaque error eum reiciendis repudiandae! Neque.
            </div>
            <div>
              Aliquam ducimus eligendi optio voluptatibus. Alias autem consequuntur eum explicabo, fuga fugit, harum inventore laboriosam
              natus non perspiciatis quaerat qui recusandae temporibus vero, voluptates voluptatibus? Accusamus consequuntur dignissimos eum
              officiis.
            </div>
            <div>
              Accusamus aliquid asperiores commodi consequatur deserunt dicta doloribus, ducimus ea earum, error esse et eum explicabo,
              libero minima necessitatibus officiis optio porro quam quibusdam quod ratione reiciendis reprehenderit sed velit.
            </div>
            <div>
              Assumenda blanditiis culpa doloribus optio perferendis perspiciatis, porro quis quisquam rem repudiandae sed similique vel.
              Accusamus esse et ex fuga ipsam iure minima natus quam, quo tempora. Aperiam, quia, quos!
            </div>
            <div>
              Assumenda atque commodi cupiditate dignissimos, dolorum eos excepturi incidunt iure nam omnis quibusdam quis repellendus rerum
              sunt tenetur? Architecto ea excepturi harum nihil non quis repellat suscipit tempora ullam vero!
            </div>
            <div>
              Ad autem cum deleniti dicta ea eligendi, error id impedit laborum natus nobis numquam optio provident qui, quia quisquam
              recusandae repellendus sint ut veniam veritatis vitae voluptatibus voluptatum. Illo, possimus!
            </div>
            <div>
              Dicta doloremque eligendi fuga fugiat illo laborum molestiae necessitatibus nisi nobis nulla odit perspiciatis, quaerat quam
              quo quos saepe sit. Alias dolore dolorem earum nobis quas? Dicta ducimus odio sequi.
            </div>
          </ds-step>
          <ds-step label="Some Label2" description="Some Description2" [hasError]="true">
            <div>
              Aut beatae eius iure labore maiores tempore? Corporis deserunt excepturi fugiat in modi officia ullam ut. Aperiam eos esse
              tempora voluptate. Adipisci blanditiis dolore impedit sit temporibus, vitae. At, natus.
            </div>
            <div>
              Asperiores cum delectus dolorem doloribus ea eligendi eos, id libero magnam magni molestiae, necessitatibus nesciunt nihil
              nobis omnis perspiciatis quae quod quos recusandae reiciendis sed tempora, ut vel voluptatibus voluptatum?
            </div>
            <div>
              A, accusamus alias aliquid aut beatae cum cupiditate doloribus ex facere fugit, inventore maxime mollitia numquam officia
              omnis sit ullam! Aspernatur atque commodi dolor eaque error eum reiciendis repudiandae! Neque.
            </div>
            <div>
              Aliquam ducimus eligendi optio voluptatibus. Alias autem consequuntur eum explicabo, fuga fugit, harum inventore laboriosam
              natus non perspiciatis quaerat qui recusandae temporibus vero, voluptates voluptatibus? Accusamus consequuntur dignissimos eum
              officiis.
            </div>
          </ds-step>
          <ds-step label="Some Label3" description="Some Description3" [disabled]="true">Content 3</ds-step>
          <ds-step label="Some Label3" description="Some Description3">
            <div>
              Ad autem cum deleniti dicta ea eligendi, error id impedit laborum natus nobis numquam optio provident qui, quia quisquam
              recusandae repellendus sint ut veniam veritatis vitae voluptatibus voluptatum. Illo, possimus!
            </div>
            <div>
              Dicta doloremque eligendi fuga fugiat illo laborum molestiae necessitatibus nisi nobis nulla odit perspiciatis, quaerat quam
              quo quos saepe sit. Alias dolore dolorem earum nobis quas? Dicta ducimus odio sequi.
            </div>
          </ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 5</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 6</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 7</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 8</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 9</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 10</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 11</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 12</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 13</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 14</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 15</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 16</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 17</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 18</ds-step>
        </ds-stepper>
      </ng-container>
      <ng-container footer>
        <div class="modal-footer__items-group">
          <ds-button variant="secondary"> Cancel </ds-button>
          <ds-button variant="main"> Add </ds-button>
        </div>
      </ng-container>
    </ds-base-modal-content>
  `,
  imports: [DsBaseModalContent, DsStep, DsButton, DsStepper],
})
class MockModal1 {
  closeAction(): void {}
}

@Component({
  selector: 'ds-mock-modal',
  template: `
    <ds-base-modal-content dsStepper [orientation]="'horizontal'" headerVariant="filled">
      <ng-container header>
        <div class="modal-header__row">
          <h4 class="modal-header__title">Header</h4>

          <button (click)="closeAction()" aria-label="Close" class="close-modal-button" type="button">
            <i class="ds-icon ds-icon-control-cross"></i>
          </button>
        </div>
        <!-- Use special component to show stepper header wherever you need -->
        <div style="padding: 0 16px 14px;" class="stepper-modal-container">
          <ds-stepper-header></ds-stepper-header>
        </div>
      </ng-container>
      <ng-container body>
        <!-- Use special component to show stepper body wherever you need -->
        <div style="padding: 16px;" class="grid-container">
          <ds-stepper-body>
            <ds-step label="Some Label1" description="Some Description"> Content 1 </ds-step>
            <ds-step label="Some Label2" description="Some Description2" [hasError]="true">Content 2</ds-step>
            <ds-step label="Some Label3" description="Some Description3" state="error">Content 3</ds-step>
          </ds-stepper-body>
        </div>
      </ng-container>
      <ng-container footer>
        <div style="display: flex; gap: 12px;">
          <!-- For the actions you can use directives -->
          <ds-button variant="secondary" dsStepperPrevious> Previous </ds-button>
          <ds-button variant="main" dsStepperNext> Next </ds-button>
        </div>
      </ng-container>
    </ds-base-modal-content>
  `,
  imports: [
    DsBaseModalContent,
    DsStepperHeader,
    DsStepperBody,
    DsStep,
    DsButton,
    DsStepperDirective,
    DsStepperPreviousDirective,
    DsStepperNextDirective,
  ],
})
class MockModal {
  closeAction(): void {}
}

@Component({
  selector: 'ds-modal-with-stepper',
  template: `
    <ds-button (click)="showMedium()">Show Modal Stepper </ds-button> <br />
    <ds-button (click)="showVertical()">Show Modal Stepper Vertical</ds-button>
  `,
  imports: [DsButton],
})
class ModalWithStepper {
  headerVariant = input<ModalVariant>();
  footerVariant = input<ModalVariant>();

  constructor(private readonly modalService: ModalService) {}

  showMedium(): void {
    this.modalService.open(MockModal, {
      modalData: { headerVariant: this.headerVariant(), footerVariant: this.footerVariant() },
      settings: { keyboard: true, size: 'lg' },
    });
  }

  showVertical(): void {
    this.modalService.open(MockModal1, {
      modalData: { headerVariant: this.headerVariant(), footerVariant: this.footerVariant() },
      settings: { keyboard: true, size: 'lg' },
    });
  }
}

type CustomArgs = {
  isError: boolean;
  disabled: boolean;
};

const meta: Meta<DsStepper & CustomArgs> = {
  title: 'shared components/Stepper',
  component: DsStepper,
  decorators: [
    moduleMetadata({
      imports: [
        DsStep,
        DsStepperNextDirective,
        DsStepperPreviousDirective,
        SprStepHeaderCustomDirective,
        DsStepperHeader,
        DsStepperBody,
        DsStepperDirective,
        DsButton,
        DsBaseModalContent,
        ModalWithStepper,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The **Stepper** component is used to display content by steps.

        `,
      },
    },
  },
  argTypes: {
    orientation: {
      description: 'You can set the direction of steps.',
      options: ['vertical', 'horizontal'],
      control: {
        type: 'radio',
      },
      table: {
        type: {
          summary: 'vertical | horizontal',
        },
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    isError: {
      description: '',
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      description: 'You can disable step',
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
};

export const Stepper: StoryObj<DsStepper & CustomArgs> = {
  args: {
    isError: false,
    disabled: false,
    orientation: 'horizontal',
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <h3 class="storybook-title">Basic usage (Monolith version)</h3>
        <br>
        <br>
        <ds-stepper [orientation]="orientation">
          <ds-step label="Some LabelSome LabelSome Label" description="Some Description" [hasError]="isError">Content 1</ds-step>
          <ds-step label="Some Label2" description="Some Description2Some Description2" [disabled]="disabled">Content 2</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 3</ds-step>

          <div style="display: flex; gap: 12px;" sprStepperActions>
            <ds-button
              variant="secondary"
              dsStepperPrevious>
              Previous
            </ds-button>
            <ds-button
              variant="main"
              dsStepperNext>
              Next
            </ds-button>
          </div>
        </ds-stepper>

        <br>
        <br>
        <h3 class="storybook-title">Overriding steps header</h3>
        <br>
        <br>

        <ds-stepper [orientation]="orientation">
          <ds-stepper-header>
            <!-- You can use sprStepHeaderCustom directive inside ds-stepper-header to override all step-headers with your template -->
            <ng-template sprStepHeaderCustom let-step let-index="index">
              {{ step.label }} - {{ index }}
            </ng-template>
          </ds-stepper-header>

          <ds-step label="Some Label" description="Some Description" [hasError]="hasError">
            <!-- Use directive sprStepHeaderCustom in ds-step to override step header only for special step -->
            <ng-template sprStepHeaderCustom>Custom Header</ng-template>

            Content 1
          </ds-step>
          <ds-step label="Some Label2" description="Some Description2" [disabled]="disabled">Content 2</ds-step>
          <ds-step label="Some Label3" description="Some Description3">Content 3</ds-step>

          <div style="display: flex; gap: 12px;" sprStepperActions>
            <ds-button
              variant="secondary"
              dsStepperPrevious>
              Previous
            </ds-button>
            <ds-button
              variant="main"
              dsStepperNext>
              Next
            </ds-button>
          </div>
        </ds-stepper>

        <br>
        <br>
        <h3 class="storybook-title">How to use stepper in modals or offCanvas</h3>
        <br>
        <br>

        <!-- Use special directive to mark any block or component as a stepper container -->
          <ds-modal-with-stepper />
      `,
    };
  },
};

export default meta;
