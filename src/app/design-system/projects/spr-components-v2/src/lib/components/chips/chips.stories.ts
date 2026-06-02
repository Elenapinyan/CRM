import { NgIf } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsChipsComponent } from './chips.component';

interface CustomArgs {
  text: string;
  leftIcon: boolean;
  rightIcon: boolean;
}

const meta: Meta<DsChipsComponent & CustomArgs> = {
  title: 'shared components/Chips',
  component: DsChipsComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Chips component** is a versatile and interactive UI element that can be used to display information, categorize items, or filter content.

- **Styles:** Available in various colors and sizes to match your application's design.
- **Icons:** Optionally display icons on either side of the chip text for added visual cues.
- **Interactivity:** Supports clickable chips for user interactions and can be disabled when needed.

Customize the chips to fit your needs by adjusting their appearance, content, and functionality.

### Color usage rules

**Canonical colors for repeating statuses (max 5)**

Use these colors only for standardized, repeating workflow/status meanings across all apps:
- **Grey** — Neutral / Draft / Archived / Inactive / Unknown
- **Blue** — Informational / New / In progress / Processing / Scheduled
- **Green** — Success / Completed / Approved / Paid / Resolved
- **Orange** — Warning / Needs attention / Requires action / At risk / Delayed
- **Red** — Error / Failed / Rejected / Blocked / Overdue / Cancelled (negative outcome)

> **Rule:** If it's a workflow state that repeats across products, it must map to one of the five meanings above.

**Non-canonical colors for labels (free interpretation)**

These colors are not allowed for standardized statuses. Use them for descriptive labels such as type/category/source/team/segment:
*Olive, Primary, Gold, Cyan, Magenta, Yellow, Purple*

> **Rule:** Labels describe what something is, not what's happening to it.<br/>
> **Examples:** Type: Deposit, Source: API, Team: Support, Segment: VIP, Category: Billing.

### Consistency rules

- Status names map to meaning, not "whatever color feels right."
- The same status meaning uses the same color everywhere, regardless of domain.

**Cancelled:**
- Cancelled → Red (negative process outcome)
- Cancelled → Grey (neutral "put away")

**Pending:**
- Pending → Blue (as a normal workflow step)
- Pending → Red (requiring action or implying risk)

**Expired:**
- Expired → Grey (harmless expiry)
- Expired → Red (problematic expiry)

### Icon guidance

Some statuses may intentionally share a similar or even the same color (e.g., several "in progress" states using Blue). To keep them clearly distinguishable, it's recommended to pair them with different icons that reinforce meaning (e.g., clock for "Scheduled", spinner/loader for "Processing", pause for "On hold").
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [NgIf],
    }),
  ],
  argTypes: {
    variant: {
      options: ['gray', 'olive', 'green', 'purple', 'blue', 'gold', 'red', 'cyan', 'orange', 'magenta', 'yellow'],
      control: {
        type: 'select',
      },
      description: 'Select the chip variant to define its visual style and significance.',
      table: {
        type: {
          summary: 'gray | olive  | green | purple | blue | gold | red | cyan | orange |magenta | yellow',
        },
        defaultValue: {
          summary: 'gray',
        },
      },
    },
    size: {
      options: ['sm', 'md'],
      control: {
        type: 'select',
      },
      description: 'Select the chip size',
      table: {
        type: {
          summary: 'sm | md',
        },
        defaultValue: {
          summary: 'md',
        },
      },
    },
    chipsStyle: {
      options: ['outline', 'filled'],
      control: {
        type: 'select',
      },
      description: 'Select the chip style',
      table: {
        type: {
          summary: 'outline | filled',
        },
        defaultValue: {
          summary: 'filled',
        },
      },
    },
    text: {
      control: {
        type: 'text',
      },
      description: 'Text displayed inside the chip',
    },
    leftIcon: {
      description: 'Display an icon to the left of the chip text',
    },
    rightIcon: {
      description: 'Display an icon to the right of the chip text',
    },
    isInteractive: {
      description: 'Enable interactive mode for the chip',
    },
    isDisabled: {
      description: 'Disable the chip to prevent user interactions',
    },
    isSelected: {
      description: 'Select chip to highlight it with additional visual effect',
    },
  },
};

export const Chips: StoryObj<DsChipsComponent & CustomArgs> = {
  args: {
    variant: 'gray',
    size: 'md',
    chipsStyle: 'filled',
    text: 'some chips text',
    leftIcon: true,
    rightIcon: false,
    isInteractive: true,
    isDisabled: false,
    isSelected: false,
  },
  render: (args: DsChipsComponent & CustomArgs) => {
    return {
      props: { ...args },
      template: `
        <ds-chips
          [size]="size"
          [variant]="variant"
          [chipsStyle]="chipsStyle"
          [isDisabled]="isDisabled"
          [isSelected]="isSelected"
          [isInteractive]="isInteractive">
          <i
            *ngIf="leftIcon"
            class="ds-icon ds-icon-control-cross"
          ></i>

          <span>{{text}}</span>

          <i
            *ngIf="rightIcon"
            class="ds-icon ds-icon-control-cross"
          ></i>
        </ds-chips>

        <br/>

        <ds-chips
          [variant]="'olive'"
          [chipsStyle]="'filled'"
          [isSelected]="chipCheck.checked"
          [isInteractive]="true"
          (click)="chipCheck.click()">
          <i class="ds-icon ds-icon-control-cross"></i>
          <span>Checkbox chip</span>
          <input #chipCheck
            style="display: none;"
            type="checkbox"/>
        </ds-chips>
        `,
    };
  },
};

export default meta;
