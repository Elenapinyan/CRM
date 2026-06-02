import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { AccordionType } from './enums/accordion.enum';
import { DsAccordionComponent } from './accordion.component';
import { DsButton } from '../button';

interface CustomArgs {
  itemList: string[];
}

const meta: Meta<DsAccordionComponent & CustomArgs> = {
  title: 'shared components/Accordion',
  component: DsAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [NgbAccordionModule, DsButton],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The **Accordion component** is a collapsible container for content. It can be used to organize sections of content in a way that improves usability and accessibility.

- **Accordion Types:** Default or nested.
- For both types, the content of each accordion item can be customized freely. You can manually add any HTML, components, or dynamic content inside each accordion panel for maximum flexibility.
        `,
      },
    },
  },

  argTypes: {
    accordionType: {
      options: ['default', 'nested', 'flexible', 'custom'],
      control: {
        type: 'select',
      },
      description: 'Determines the style of the accordion. Choose between a default accordion or a nested accordion.',
      table: {
        type: {
          summary: 'default | nested | flexible | custom',
        },
        defaultValue: {
          summary: 'default',
        },
      },
    },
    itemList: {
      description:
        'An array representing the items in the accordion. Each item will be displayed as a separate accordion panel. You can customize the list by adding or removing items as needed.',
    },
  },
};

export const Accordion: StoryObj<DsAccordionComponent & CustomArgs> = {
  args: {
    accordionType: AccordionType.Default,
    itemList: ['First', 'Two', 'Three', 'Four'],
  },
  render: (args: DsAccordionComponent & CustomArgs) => {
    return {
      props: { ...args },
      template: `
        <ds-accordion [accordionType]="accordionType">
          <ul ngbAccordion>
            @for (item of itemList; track $index) {
              <li
                ngbAccordionItem
                [collapsed]="true">
                <div
                  ngbAccordionHeader>
                  {{ item }}

                  <ds-button
                    ngbAccordionToggle
                    variant="transparent"
                    class="accordion__toggle-button"
                    [isIcon]="true"
                    size="lg"
                    type="button">
                      <i class="ds-icon ds-icon-arrows-chevron-down accordion__toggle-button-icon"></i>
                  </ds-button>
                </div>

                <div ngbAccordionCollapse>
                  <div ngbAccordionBody>
                    <p class="storybook-title">Content of the {{ item }} panel</p>
                  </div>
                </div>
              </li>
            }
          </ul>
        </ds-accordion>
        `,
    };
  },
};

export default meta;
