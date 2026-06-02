import type { TemplateChannel } from '../communication-list/communication-list.model';

/** Channels shown in the create-template off-canvas (Figma labels). */
export type CreateTemplateChannel = 'email' | 'sms' | 'push' | 'popup' | 'inbox' | 'telegram';

export const CREATE_TEMPLATE_CHANNELS: readonly CreateTemplateChannel[] = [
  'email',
  'sms',
  'push',
  'popup',
  'inbox',
  'telegram',
] as const;

export const CREATE_TEMPLATE_CHANNEL_LABELS: Record<CreateTemplateChannel, string> = {
  email: 'Email',
  sms: 'SMS',
  push: 'Push',
  popup: 'Popup',
  inbox: 'Inbox',
  telegram: 'Telegram',
};

export interface CreateTemplateChannelMeta {
  label: string;
  iconClass: string;
  iconAreaClass: string;
}

export const CREATE_TEMPLATE_CHANNEL_META: Record<CreateTemplateChannel, CreateTemplateChannelMeta> = {
  email: {
    label: 'Email',
    iconClass: 'ds-icon ds-icon-chips-mail-fill',
    iconAreaClass: 'create-template-panel__icon-area--email',
  },
  sms: {
    label: 'SMS',
    iconClass: 'ds-icon ds-icon-general-message',
    iconAreaClass: 'create-template-panel__icon-area--sms',
  },
  push: {
    label: 'Push',
    iconClass: 'ds-icon ds-icon-general-bell',
    iconAreaClass: 'create-template-panel__icon-area--push',
  },
  popup: {
    label: 'Popup',
    iconClass: 'ds-icon ds-icon-general-layout',
    iconAreaClass: 'create-template-panel__icon-area--popup',
  },
  inbox: {
    label: 'Inbox',
    iconClass: 'ds-icon ds-icon-general-messages',
    iconAreaClass: 'create-template-panel__icon-area--inbox',
  },
  telegram: {
    label: 'Telegram',
    iconClass: 'ds-icon ds-icon-sent',
    iconAreaClass: 'create-template-panel__icon-area--telegram',
  },
};

export interface CreateTemplateResult {
  channel: CreateTemplateChannel;
  name: string;
  description: string;
}

/** Maps off-canvas channel selection to Communication Hub list row type. */
export function mapCreateChannelToListChannel(channel: CreateTemplateChannel): TemplateChannel {
  switch (channel) {
    case 'popup':
      return 'in-app';
    case 'inbox':
      return 'chat';
    case 'telegram':
      return 'telegram';
    default:
      return channel;
  }
}
