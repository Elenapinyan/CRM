export interface SmsTemplateLanguage {
  id: string;
  label: string;
}

export const SMS_TEMPLATE_LANGUAGES: readonly SmsTemplateLanguage[] = [
  { id: 'eng', label: 'ENG' },
  { id: 'ind', label: 'IND' },
  { id: 'fin', label: 'FIN' },
  { id: 'por', label: 'POR' },
  { id: 'spa', label: 'SPA' },
  { id: 'tur', label: 'TUR' },
] as const;

export const SMS_TEMPLATE_VARIABLES: readonly string[] = [
  'Username',
  'First name',
  'Last name',
  'Email',
  'Phone',
  'Birthday',
  'Current rank level',
  'Next rank level',
  'XP collected',
  'XP to next level',
  'Level-up date',
] as const;

export const SMS_CHARS_PER_MESSAGE = 160;

export interface SmsTemplateDraft {
  name: string;
  description: string;
}

export function computeSmsStats(message: string): { characters: number; smsCount: number } {
  const characters = message.length;
  const smsCount = characters === 0 ? 0 : Math.ceil(characters / SMS_CHARS_PER_MESSAGE);
  return { characters, smsCount };
}
