import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { AccordionType } from './enums/accordion.enum';
import { SprAccordionComponent } from './spr-accordion.component';

interface CustomArgs {
  itemList: string[];
}

const meta: Meta<SprAccordionComponent & CustomArgs> = {
  title: 'shared components/Accordion',
  component: SprAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [NgbAccordionModule],
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

export const Accordion: StoryObj<SprAccordionComponent & CustomArgs> = {
  args: {
    accordionType: AccordionType.Default,
    itemList: ['First', 'Two', 'Three', 'Four'],
  },
  render: (args: SprAccordionComponent & CustomArgs) => {
    return {
      props: { ...args },
      template: `
        <spr-accordion [accordionType]="accordionType">
          <ul ngbAccordion>
            @for (item of itemList; track $index) {
              <li
                ngbAccordionItem
                [collapsed]="true">
                <div
                  ngbAccordionHeader>
                  {{ item }}
                  <button
                    class="toggle-button"
                    type="button"
                    ngbAccordionToggle>
                    <i
                      class="icon caret-icon bo-icon-arrows-chevron-down"></i>
                  </button>
                </div>

                <div ngbAccordionCollapse>
                  <div ngbAccordionBody>
                    <p>Content of the {{ item }} panel</p>
                  </div>
                </div>
              </li>
            }
          </ul>
        </spr-accordion>
        `,
    };
  },
};

export default meta;
