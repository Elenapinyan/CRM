import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsBreadcrumbs } from './breadcrumbs';
import { BreadcrumbItem } from './breadcrumbs.options';
import { RouterTestingModule } from '@angular/router/testing';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<DsBreadcrumbs> = {
  title: 'shared components/Breadcrumbs',
  component: DsBreadcrumbs,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The **Breadcrumbs** component is used to display selected routes.
        `,
      },
    },
  },
  argTypes: {
    disableRouting: {
      control: 'boolean',
      description: 'Choose the alert type to define its visual style and significance.',
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

export const Breadcrumbs: StoryObj<DsBreadcrumbs> = {
  args: {
    items: [
      {
        name: 'Route 1',
        path: '/home/route-1',
      },
      {
        name: 'Route 2',
        path: '/home/route-2',
      },
      {
        name: 'Route 3',
        path: '/home/route-3',
      },
    ] as BreadcrumbItem[],
    disableRouting: false,
  },
  render: (args) => {
    const [, setArgs] = useArgs();

    function addItem(): void {
      const newItem = {
        name: 'Route ' + (args.items.length + 1),
        path: '/home/route-' + (args.items.length + 1),
      };

      setArgs({ items: [...args.items, newItem] });
    }
    return {
      props: {
        ...args,
        addItem,
      },
      template: `
        <div style="width: 100%">
          <ds-breadcrumbs [items]='items' [disableRouting]="disableRouting" />

          <button class="storybook-button" (click)="addItem()">Add Item</button>
        </div>
      `,
    };
  },
};

export default meta;
