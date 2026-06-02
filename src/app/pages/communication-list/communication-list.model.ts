export type TemplateChannel = 'email' | 'sms' | 'push' | 'in-app' | 'chat' | 'telegram';

export type TemplateState = 'active' | 'inactive';

export interface CommunicationTemplateRow {
  id: number;
  type: TemplateChannel;
  name: string;
  state: TemplateState;
  /** e.g. "3 workflows" or null for em dash */
  usage: string | null;
  creator: string;
  created: string;
  modified: string;
}

export interface CommunicationFooterStats {
  email: number;
  sms: number;
  push: number;
  'in-app': number;
  chat: number;
  telegram: number;
}
