import type { SegmentFilterMenuOption } from './segments-filter-shared';

export interface ListFilterOption {
  readonly key: string;
  readonly label: string;
}

/** Static LIST options from ng-crm i18n + placeholders for remote-key filters. */
export const LIST_FILTER_OPTIONS: Readonly<Record<string, readonly ListFilterOption[]>> = {
  communication_channel: [
    { key: 'sms', label: 'SMS' },
    { key: 'email', label: 'Email' },
    { key: 'push_notification', label: 'Push notification' },
  ],
  bet_type_sports: [
    { key: 'multi', label: 'Multi' },
    { key: 'single', label: 'Single' },
    { key: 'system', label: 'System' },
  ],
  gender: [
    { key: 'female', label: 'Female' },
    { key: 'male', label: 'Male' },
  ],
  user_lifecycle: [
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
  ],
  user_registration_device: [
    { key: 'desktop', label: 'Desktop' },
    { key: 'mobile', label: 'Mobile' },
  ],
  user_registration_source: [
    { key: 'affiliate', label: 'Affiliate' },
    { key: 'organic', label: 'Organic' },
  ],
  player_block: [
    { key: 'login', label: 'Login' },
    { key: 'bet', label: 'Bet' },
    { key: 'deposit', label: 'Deposit' },
    { key: 'withdrawal', label: 'Withdrawal' },
  ],
  deposit_activity: [
    { key: 'first', label: 'First deposit' },
    { key: 'repeat', label: 'Repeat deposit' },
  ],
  withdraw_activity: [
    { key: 'first', label: 'First withdrawal' },
    { key: 'repeat', label: 'Repeat withdrawal' },
  ],
  correction_down_activity: [
    { key: 'manual', label: 'Manual' },
    { key: 'automatic', label: 'Automatic' },
  ],
  correction_up_activity: [
    { key: 'manual', label: 'Manual' },
    { key: 'automatic', label: 'Automatic' },
  ],
  bonus_status: [
    { key: 'active', label: 'Active' },
    { key: 'expired', label: 'Expired' },
    { key: 'cancelled', label: 'Cancelled' },
  ],
  bonus_type: [
    { key: 'deposit', label: 'Deposit bonus' },
    { key: 'free_spins', label: 'Free spins' },
    { key: 'cashback', label: 'Cashback' },
  ],
  bet_device: [
    { key: 'desktop', label: 'Desktop' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'tablet', label: 'Tablet' },
  ],
  login_first_device: [
    { key: 'desktop', label: 'Desktop' },
    { key: 'mobile', label: 'Mobile' },
  ],
  login_last_device: [
    { key: 'desktop', label: 'Desktop' },
    { key: 'mobile', label: 'Mobile' },
  ],
  login_preferred_device: [
    { key: 'desktop', label: 'Desktop' },
    { key: 'mobile', label: 'Mobile' },
  ],
  deposit_source: [
    { key: 'card', label: 'Card' },
    { key: 'bank', label: 'Bank transfer' },
    { key: 'crypto', label: 'Crypto' },
  ],
  withdraw_source: [
    { key: 'card', label: 'Card' },
    { key: 'bank', label: 'Bank transfer' },
    { key: 'crypto', label: 'Crypto' },
  ],
  correction_down_source: [
    { key: 'manual', label: 'Manual' },
    { key: 'system', label: 'System' },
  ],
  correction_up_source: [
    { key: 'manual', label: 'Manual' },
    { key: 'system', label: 'System' },
  ],
  deposit_currency: [
    { key: 'EUR', label: 'EUR' },
    { key: 'USD', label: 'USD' },
    { key: 'GBP', label: 'GBP' },
  ],
  withdraw_currency: [
    { key: 'EUR', label: 'EUR' },
    { key: 'USD', label: 'USD' },
    { key: 'GBP', label: 'GBP' },
  ],
  correction_down_currency: [
    { key: 'EUR', label: 'EUR' },
    { key: 'USD', label: 'USD' },
  ],
  correction_up_currency: [
    { key: 'EUR', label: 'EUR' },
    { key: 'USD', label: 'USD' },
  ],
  user_currency: [
    { key: 'EUR', label: 'EUR' },
    { key: 'USD', label: 'USD' },
    { key: 'GBP', label: 'GBP' },
  ],
  player_country: [
    { key: 'DE', label: 'Germany' },
    { key: 'GB', label: 'United Kingdom' },
    { key: 'US', label: 'United States' },
    { key: 'AU', label: 'Australia' },
    { key: 'AT', label: 'Austria' },
    { key: 'BE', label: 'Belgium' },
    { key: 'BR', label: 'Brazil' },
    { key: 'CA', label: 'Canada' },
    { key: 'CL', label: 'Chile' },
    { key: 'CN', label: 'China' },
    { key: 'CO', label: 'Colombia' },
    { key: 'CZ', label: 'Czech Republic' },
    { key: 'DK', label: 'Denmark' },
    { key: 'EG', label: 'Egypt' },
    { key: 'FI', label: 'Finland' },
    { key: 'FR', label: 'France' },
    { key: 'GR', label: 'Greece' },
    { key: 'HK', label: 'Hong Kong' },
    { key: 'HU', label: 'Hungary' },
    { key: 'IN', label: 'India' },
    { key: 'ID', label: 'Indonesia' },
    { key: 'IE', label: 'Ireland' },
    { key: 'IL', label: 'Israel' },
    { key: 'IT', label: 'Italy' },
    { key: 'JP', label: 'Japan' },
    { key: 'KZ', label: 'Kazakhstan' },
    { key: 'KE', label: 'Kenya' },
    { key: 'LV', label: 'Latvia' },
    { key: 'LT', label: 'Lithuania' },
    { key: 'MY', label: 'Malaysia' },
    { key: 'MX', label: 'Mexico' },
    { key: 'NL', label: 'Netherlands' },
    { key: 'NZ', label: 'New Zealand' },
    { key: 'NG', label: 'Nigeria' },
    { key: 'NO', label: 'Norway' },
    { key: 'PE', label: 'Peru' },
    { key: 'PH', label: 'Philippines' },
    { key: 'PL', label: 'Poland' },
    { key: 'PT', label: 'Portugal' },
    { key: 'RO', label: 'Romania' },
    { key: 'SA', label: 'Saudi Arabia' },
    { key: 'SG', label: 'Singapore' },
    { key: 'ZA', label: 'South Africa' },
    { key: 'KR', label: 'South Korea' },
    { key: 'ES', label: 'Spain' },
    { key: 'SE', label: 'Sweden' },
    { key: 'CH', label: 'Switzerland' },
    { key: 'TW', label: 'Taiwan' },
    { key: 'TH', label: 'Thailand' },
    { key: 'TR', label: 'Turkey' },
    { key: 'UA', label: 'Ukraine' },
    { key: 'AE', label: 'United Arab Emirates' },
    { key: 'VN', label: 'Vietnam' },
  ],
  user_language: [
    { key: 'en', label: 'English' },
    { key: 'de', label: 'German' },
    { key: 'es', label: 'Spanish' },
  ],
  kyc_verification_status: [
    { key: 'verified', label: 'Verified' },
    { key: 'pending', label: 'Pending' },
    { key: 'rejected', label: 'Rejected' },
  ],
  email_verification_status: [
    { key: 'verified', label: 'Verified' },
    { key: 'unverified', label: 'Unverified' },
  ],
  phone_verification_status: [
    { key: 'verified', label: 'Verified' },
    { key: 'unverified', label: 'Unverified' },
  ],
  games: [
    { key: 'game-1', label: 'Book of Dead' },
    { key: 'game-2', label: 'Starburst' },
    { key: 'game-3', label: 'Gonzo Quest' },
  ],
  product: [
    { key: 'casino', label: 'Casino' },
    { key: 'live_casino', label: 'Live casino' },
    { key: 'sports', label: 'Sports' },
  ],
  bet_game: [
    { key: 'game-1', label: 'Book of Dead' },
    { key: 'game-2', label: 'Starburst' },
  ],
  bet_product: [
    { key: 'casino', label: 'Casino' },
    { key: 'live_casino', label: 'Live casino' },
  ],
  casino_bet_game: [
    { key: 'game-1', label: 'Book of Dead' },
    { key: 'game-2', label: 'Starburst' },
  ],
  casino_bet_product: [
    { key: 'casino', label: 'Casino' },
    { key: 'live_casino', label: 'Live casino' },
  ],
  sport_bet_sport: [
    { key: 'football', label: 'Football' },
    { key: 'basketball', label: 'Basketball' },
    { key: 'tennis', label: 'Tennis' },
  ],
  sport_bet_live_pre_match: [
    { key: 'live', label: 'Live' },
    { key: 'pre_match', label: 'Pre-match' },
  ],
  favorite_game_1: [
    { key: 'game-1', label: 'Book of Dead' },
    { key: 'game-2', label: 'Starburst' },
  ],
  favorite_game_2: [
    { key: 'game-1', label: 'Book of Dead' },
    { key: 'game-2', label: 'Starburst' },
  ],
  favorite_game_3: [
    { key: 'game-1', label: 'Book of Dead' },
    { key: 'game-2', label: 'Starburst' },
  ],
  favorite_game_category_1: [
    { key: 'slots', label: 'Slots' },
    { key: 'table', label: 'Table games' },
  ],
  favorite_game_category_2: [
    { key: 'slots', label: 'Slots' },
    { key: 'table', label: 'Table games' },
  ],
  participated_in_workflow: [
    { key: 'wf-1', label: 'Welcome series' },
    { key: 'wf-2', label: 'Reactivation' },
  ],
  sent_template_name: [
    { key: 'tpl-1', label: 'Welcome email' },
    { key: 'tpl-2', label: 'Bonus reminder' },
  ],
};

const DEFAULT_LIST_OPTIONS: readonly ListFilterOption[] = [
  { key: 'option_a', label: 'Option A' },
  { key: 'option_b', label: 'Option B' },
  { key: 'option_c', label: 'Option C' },
];

export function listOptionsForApiKey(apiKey?: string): readonly ListFilterOption[] {
  if (!apiKey) {
    return DEFAULT_LIST_OPTIONS;
  }
  return LIST_FILTER_OPTIONS[apiKey] ?? DEFAULT_LIST_OPTIONS;
}

export function listOptionLabels(apiKey: string | undefined, keys: readonly string[]): string {
  const options = listOptionsForApiKey(apiKey);
  const labels = keys.map((k) => options.find((o) => o.key === k)?.label ?? k);
  if (labels.length > 7) {
    return `${labels.length} options`;
  }
  return labels.join(', ');
}

export function defaultListSelection(apiKey?: string): readonly string[] {
  const options = listOptionsForApiKey(apiKey);
  return options.length ? [options[0].key] : [];
}
