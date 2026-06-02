import { Component, input, Input } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsBadge } from '../badge';
import { DsButton } from '../button';
import { DsOpenMenuDirective, DsOpenMenuItemDirective } from '../open-menu';
import { OffCanvasVariant } from './interfaces/off-canvas.interface';
import { OffCanvasService } from './services/off-canvas.service';
import { DsBaseOffCanvasContentComponent } from './base-off-canvas-content.component';
import { NgbOffcanvasOptions } from '@ng-bootstrap/ng-bootstrap';

interface CustomArgs {
  keyboard: boolean;
}

@Component({
  template: `
    <ds-base-off-canvas-content [headerVariant]="data.headerVariant" [footerVariant]="data.footerVariant">
      <ng-container header>
        <div class="canvas-header__row">
          <h4 class="canvas-header__title">Header</h4>

          <div class="canvas-header__items-container">
            <div class="canvas-header__items-group">
              <button aria-label="Modal icon" class="modal-icon-button" type="button" dsOpenMenu>
                <i class="ds-icon ds-icon-control-more-horizontal"></i>

                <ng-template sprOpenMenuItem>Menu Item 1</ng-template>
                <ng-template sprOpenMenuItem>Menu Item 2</ng-template>
                <ng-template sprOpenMenuItem>Menu Item 3</ng-template>
              </button>
            </div>
            <div class="canvas-header__actions">
              @if (canvasOptions?.keyboard) {
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
        <div class="grid-container" style="padding: 16px;">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dolor facere magni omnis quibusdam! Beatae harum id ipsum
          labore necessitatibus, optio quasi qui quis repudiandae saepe, soluta suscipit tempore, ullam. Accusantium asperiores aspernatur,
          aut consequuntur eligendi impedit ipsum libero nobis numquam officia quasi sequi totam voluptatibus! Aliquam asperiores aspernatur
          aut consectetur cumque cupiditate debitis dicta dignissimos dolor doloribus dolorum earum et, excepturi fuga fugiat hic id
          laboriosam molestiae mollitia nemo obcaecati officia omnis perspiciatis quaerat quasi quis quisquam quo quod repellendus soluta
          tempora ullam vel veniam! Aliquid aspernatur enim eum hic ipsum nostrum pariatur perferendis, possimus recusandae similique! A,
          alias aliquid aperiam architecto at consequatur corporis cum debitis dolorum earum eligendi, enim error eum eveniet exercitationem
          facilis illum incidunt iure laudantium minima, mollitia neque nobis nulla odio odit omnis perspiciatis porro possimus praesentium
          quas quia quibusdam quisquam recusandae sit suscipit unde voluptate. Ab accusantium adipisci, aliquam, at cum deleniti doloribus
          hic ipsam magni quae quia quisquam similique. Assumenda atque, autem blanditiis dolor dolorum eaque enim excepturi expedita
          inventore ipsa, nesciunt, officia porro praesentium reprehenderit sit tempore temporibus veniam. Consequatur explicabo iste
          laborum modi, possimus quisquam soluta temporibus ullam unde vero. Asperiores atque culpa ducimus, eaque fugit, illo odit officia,
          omnis perspiciatis reiciendis sed similique sint soluta. Aliquid assumenda cupiditate deserunt dignissimos dolorum expedita fuga
          ipsa, iste iusto minima modi natus, placeat quas quasi sint sunt tempore. Impedit magnam minus vero! Accusantium ad aut
          consectetur consequatur cumque dignissimos dolores doloribus illo iste molestiae, omnis quas qui quos repudiandae soluta? Animi at
          atque beatae corporis delectus deserunt enim eos est eveniet excepturi fugiat fugit hic id illum in ipsa iure laudantium molestias
          natus nihil nostrum obcaecati odio officiis optio provident quae quasi quibusdam quidem quos similique sunt tenetur, vel veniam
          veritatis vero vitae, voluptatibus. Aut deleniti facilis harum magni obcaecati, odio officiis quae quam sapiente tenetur? Aliquid
          architecto aut cum deserunt doloremque dolores eveniet itaque minima perferendis quo. Aliquid delectus earum illo provident quidem
          suscipit tenetur. Aspernatur consectetur consequuntur, dicta ipsam iure nostrum numquam, obcaecati optio, praesentium quam
          similique vitae. A accusamus accusantium ad autem consectetur culpa distinctio dolor, dolores ducimus eaque eos harum hic illum
          labore laborum libero magni maiores maxime mollitia nemo neque nesciunt nihil numquam odio omnis pariatur porro quae quasi
          quibusdam quis quos ratione, reiciendis repudiandae similique tempora unde voluptatibus. Animi atque aut magni nulla voluptatem? A
          assumenda commodi consequatur deleniti dicta et, neque possimus quasi quod reiciendis tempora voluptatem! A ad fugit numquam odio
          repellat. Ab adipisci amet animi consectetur cupiditate doloribus ducimus earum eligendi fugit illum impedit incidunt ipsa ipsum
          itaque laborum laudantium modi nam, neque non nostrum nulla optio quae quaerat quas qui quo repellat sit totam, unde veritatis. Et
          expedita numquam vitae. Accusamus commodi dolore harum iste laboriosam nulla numquam quam sint ut. Ab assumenda corporis dolorem
          doloremque magnam necessitatibus numquam sunt veritatis vitae. Alias amet asperiores blanditiis culpa cum cumque deleniti
          deserunt, dignissimos dolorem doloribus eligendi error excepturi expedita facere hic ipsum itaque magni minus neque nihil nobis
          non odio, pariatur praesentium provident quae quibusdam rem reprehenderit rerum sit vel velit voluptas voluptates? Aspernatur
          atque aut beatae commodi, debitis dicta doloribus est exercitationem fugit id minima molestias nemo neque officiis optio pariatur
          possimus praesentium provident ratione reiciendis sed similique soluta temporibus totam velit veritatis vero. Ad aliquam amet
          aperiam architecto aspernatur cupiditate dignissimos distinctio dolorum ea eos et exercitationem explicabo harum illum inventore
          ipsa labore libero maxime minus nisi non numquam officiis optio pariatur porro quaerat quam quia quibusdam quisquam quos
          recusandae repellat tempore, temporibus unde veritatis voluptas, voluptate! Beatae consectetur consequuntur cum eligendi fugiat
          ipsum, labore modi non odit officia perferendis, quod quos recusandae! Accusantium architecto aspernatur atque cupiditate, dolorum
          eligendi ipsa laudantium magnam nam necessitatibus nesciunt odit officia placeat qui quo ratione sequi ut veniam vitae,
          voluptatem? Consectetur et fugiat ipsum recusandae! Et exercitationem perferendis porro repellat sequi voluptate. Ab blanditiis
          consequuntur cum dignissimos enim eveniet expedita, fuga, incidunt magni numquam perspiciatis placeat porro quibusdam quidem
          similique soluta tenetur! Architecto corporis delectus eius eligendi, enim, libero modi molestiae mollitia nisi non officia
          pariatur quo sapiente vel voluptate. Aspernatur blanditiis commodi dolorem doloremque ea eum incidunt modi odit quia quo ratione
          repudiandae, rerum ullam! Atque in repellat veniam? Architecto aut, autem consequatur, distinctio dolorum eveniet ipsa iusto
          labore laboriosam maiores molestias mollitia odit, officiis quam soluta! Aliquam aliquid assumenda at atque blanditiis consequatur
          deserunt dolor earum eligendi est et eum explicabo fuga, illum, in iure laudantium magnam maxime, minima modi necessitatibus
          officia quas quidem repellat sunt vitae voluptatem? Ab dolor ducimus eveniet id laborum laudantium necessitatibus suscipit
          voluptatem? Cumque deserunt inventore laudantium magni obcaecati, quam quasi tempore velit. Cum eveniet laboriosam mollitia nisi
          quae quas quo rerum voluptatibus! Aliquam aliquid amet culpa cum cupiditate, deleniti dicta dignissimos dolorem dolorum eveniet
          exercitationem inventore ipsam iste itaque libero magnam modi mollitia, obcaecati odio omnis optio pariatur porro quam, qui
          quisquam soluta suscipit voluptatibus. Aliquam aliquid aperiam distinctio earum esse itaque nobis, perspiciatis quae quis quod
          rem, sit soluta sunt veniam veritatis. Aliquam animi aperiam at consequatur dolorum, esse est excepturi id itaque laboriosam,
          maiores quod totam! Ad adipisci aliquam at ipsam ut. Consectetur delectus dolorum earum est harum inventore magnam nesciunt nobis,
          omnis unde? Aliquam aperiam exercitationem obcaecati perspiciatis quis! Accusamus autem dolore dolorum harum reprehenderit. A
          animi asperiores delectus dolorem, doloremque error fugiat ipsa quisquam tempore. Eligendi nesciunt non perferendis quaerat
          ratione. Debitis dolorem in iure libero nulla pariatur perspiciatis quaerat ratione sunt temporibus!
        </div>
      </ng-container>

      <ng-container footer>
        <ds-button variant="transparent" size="lg"> Secondary </ds-button>

        <div class="canvas-footer__items-group">
          <ds-button variant="secondary" size="lg"> Cancel </ds-button>
          <ds-button variant="main" size="lg"> Add </ds-button>
        </div>
      </ng-container>
    </ds-base-off-canvas-content>
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
  imports: [DsBaseOffCanvasContentComponent, DsButton, DsBadge, DsOpenMenuDirective, DsOpenMenuItemDirective],
})
class MockOffCanvasComponent {
  @Input() closeAction!: (action?: void | undefined) => void;
  @Input() data!: { headerVariant: OffCanvasVariant; footerVariant: OffCanvasVariant };
  canvasOptions!: NgbOffcanvasOptions;
}

@Component({
  selector: 'ds-off-canvas-initializer',
  template: `<ds-button (click)="show()">Show</ds-button>`,
  imports: [DsButton],
})
class OffCanvasInitializerComponent {
  headerVariant = input<OffCanvasVariant>();
  footerVariant = input<OffCanvasVariant>();
  keyboard = input(false);
  constructor(private readonly offCanvasService: OffCanvasService) {}

  show(): void {
    this.offCanvasService.open(MockOffCanvasComponent, {
      data: { headerVariant: this.headerVariant(), footerVariant: this.footerVariant() },
      settings: { keyboard: this.keyboard() },
    });
  }
}

const meta: Meta<DsBaseOffCanvasContentComponent & CustomArgs> = {
  title: 'shared components/Off Canvas',
  parameters: {
    docs: {
      description: {
        component: `
**OffCanvas** component.

### Usage Example:

#### Open offCanvas component

\`\`\`typescript
private readonly offCanvasService = inject(OffCanvasService);

show(): void {
  this.offCanvasService.open(MockOffCanvasComponent);
}
\`\`\`

#### If you want to close the offCanvas when the Escape key is pressed, add the parameter \`{ keyboard: true }\`. By default, it is set to \`false\`:

\`\`\`typescript
show(): void {
  this.offCanvasService.open(MockOffCanvasComponent, { keyboard: true } });
}
\`\`\`

#### **Use \`<ds-badge content="Esc" variant="neutral"/>\`**  to show indicator near to close button for the case when modal closable with escape.
\`\`\`html
@if (canvasOptions?.keyboard) {
  <ds-badge content="Esc" variant="neutral" />
}
\`\`\`

#### Use **\`<button class="modal-icon-button"> \`** with **\`sprOpenMenu\`** directive and **\`sprOpenMenuItem\`** to show more menu:
\`\`\`html
<button aria-label="Modal icon" class="modal-icon-button" type="button" dsOpenMenu>
  <i class="ds-icon ds-icon-control-more-horizontal"></i>

  <ng-template sprOpenMenuItem>Menu Item 1</ng-template>
  <ng-template sprOpenMenuItem>Menu Item 2</ng-template>
  <ng-template sprOpenMenuItem>Menu Item 3</ng-template>
</button>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    keyboard: {
      description: 'If true, the modal will be closed when Escape key is pressed',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
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
      imports: [OffCanvasInitializerComponent, MockOffCanvasComponent],
      providers: [OffCanvasService],
    }),
  ],
};

export const OffCanvas: StoryObj = {
  args: {
    headerVariant: 'default',
    footerVariant: 'default',
    keyboard: true,
  },
  render: (args) => {
    return {
      props: { ...args },
      template: `
        <ds-off-canvas-initializer [keyboard]="keyboard" [headerVariant]="headerVariant" [footerVariant]="footerVariant"></ds-off-canvas-initializer>
      `,
    };
  },
};

export default meta;
