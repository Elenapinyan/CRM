import { Meta, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'shared components/List',
  parameters: {
    docs: {
      description: {
        component: `
        **List** component.
        `,
      },
    },
  },
};

export const List: StoryObj = {
  render: () => {
    return {
      template: `
        <div class="spr-list">
          <div class="spr-list__item">
            <div class="spr-list__item-header">
              Parameter 1
            </div>
            <div class="spr-list__item-value">
              <div class="spr-list__item-value-main">
                Value
              </div>
              <div class="spr-list__item-value-caption">
                Caption
              </div>
            </div>
          </div>
          <div class="spr-list__item">
            <div class="spr-list__item-header">
              Parameter 2
            </div>
            <div class="spr-list__item-value">
              <div class="spr-list__item-value-main">
                Value
              </div>
              <div class="spr-list__item-value-caption">
                Caption
              </div>
            </div>
          </div>
          <div class="spr-list__item">
            <div class="spr-list__item-header">
              Parameter 3
            </div>
            <div class="spr-list__item-value">
              <div class="spr-list__item-value-main">
                Value
              </div>
              <div class="spr-list__item-value-caption">
                Caption
              </div>
            </div>
          </div>
        </div>
      `,
    };
  },
};

export default meta;
