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
            <div class="spr-list__item-subtext">
              Subtext
            </div>
            Chip component  when will be available
            <div class="spr-list__item-holder">
              <div class="spr-list__item-value">
                <div class="spr-list__item-label">
                  Label
                </div>
                <div class="spr-list__item-body">
                  Body
                </div>
              </div>
              <div class="spr-list__item-actions">
                Badge component  when will be available
                <div class="spr-list__icon">
                   <i class="ds-icon ds-icon-control-cross"></i>
                </div>
              </div>
            </div>
            <div class="spr-list__item-caption">
              Caption
            </div>
          </div>

          <div class="spr-list__item">
            <div class="spr-list__item-subtext">
              Subtext
            </div>
            Chip component  when will be available
            <div class="spr-list__item-holder">
              <div class="spr-list__item-value">
                <div class="spr-list__item-label">
                  Label
                </div>
                <div class="spr-list__item-body">
                  Body
                </div>
              </div>
              <div class="spr-list__item-actions">
                Badge component  when will be available
                <div class="spr-list__icon">
                   <i class="ds-icon ds-icon-control-cross"></i>
                </div>
              </div>
            </div>
            <div class="spr-list__item-caption">
              Caption
            </div>
          </div>

          <div class="spr-list__item">
            <div class="spr-list__item-subtext">
              Subtext
            </div>
            Chip component  when will be available
            <div class="spr-list__item-holder">
              <div class="spr-list__item-value">
                <div class="spr-list__item-label">
                  Label
                </div>
                <div class="spr-list__item-body">
                  Body
                </div>
              </div>
              <div class="spr-list__item-actions">
                Badge component  when will be available
                <div class="spr-list__icon">
                   <i class="ds-icon ds-icon-control-cross"></i>
                </div>
              </div>
            </div>
            <div class="spr-list__item-caption">
              Caption
            </div>
          </div>
        </div>
      `,
    };
  },
};

export default meta;
