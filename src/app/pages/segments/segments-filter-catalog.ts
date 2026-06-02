export type FilterCategoryId = 'all' | 'general-activity' | 'player-profile' | 'sports' | 'casino-games' | 'communications';

export interface FilterCategory {
  readonly id: FilterCategoryId;
  readonly label: string;
}

export const FILTER_CATEGORIES: readonly FilterCategory[] = [
  { id: 'all', label: 'All filters' },
  { id: 'general-activity', label: 'General activity' },
  { id: 'player-profile', label: 'Player profile' },
  { id: 'sports', label: 'Sports' },
  { id: 'casino-games', label: 'Casino & Games' },
  { id: 'communications', label: 'Communications' },
] as const;

/** Shown in the filter picker description panel until copy is provided. */
export const FILTER_DESCRIPTION_PLACEHOLDER = 'Description will be available soon.';

/** Inline segment with dotted underline (Figma filter description links). */
export interface FilterDescriptionUnderline {
  readonly underline: string;
}

export type FilterDescriptionSegment = string | FilterDescriptionUnderline;

export interface FilterDescriptionRich {
  readonly paragraphs: readonly { readonly segments: readonly FilterDescriptionSegment[] }[];
}

export type FilterDescriptionContent = string | FilterDescriptionRich;

export function isFilterDescriptionRich(
  content: FilterDescriptionContent,
): content is FilterDescriptionRich {
  return typeof content === 'object' && content !== null && 'paragraphs' in content;
}

export interface FilterCatalogItem {
  readonly id: string;
  readonly label: string;
  readonly categoryId: Exclude<FilterCategoryId, 'all'>;
  /** Subsection label segment (shown as "Category / Group"). */
  readonly group: string;
  /** Hover panel body; defaults to {@link FILTER_DESCRIPTION_PLACEHOLDER}. */
  readonly description?: FilterDescriptionContent;
}

const AVERAGE_BET_AMOUNT_DESCRIPTION: FilterDescriptionRich = {
  paragraphs: [
    {
      segments: [
        'Average bet amount is calculated based on all user betting activities across the platform, including both casino and sports betting. It reflects the mean value of bets placed.',
      ],
    },
    {
      segments: [
        'To define the timeframe, use the ',
        { underline: 'Bet Date' },
        ' filter, both filters should be used together to set a date range. By default, lifetime data is applied.',
      ],
    },
  ],
};

/** Inventory for the segment filter picker sourced from Figma (nodes 443:11857–11861). */
export const FILTER_CATALOG: readonly FilterCatalogItem[] = [
  // ── General activity / Bet ────────────────────────────────────────────────
  {
    id: 'ga-bet-avg',
    label: 'Average bet amount',
    categoryId: 'general-activity',
    group: 'Bet',
    description: AVERAGE_BET_AMOUNT_DESCRIPTION,
  },
  { id: 'ga-bet-amt',        label: 'Bet amount',          categoryId: 'general-activity', group: 'Bet' },
  { id: 'ga-bet-count',      label: 'Bet count',           categoryId: 'general-activity', group: 'Bet' },
  { id: 'ga-bet-date',       label: 'Bet date',            categoryId: 'general-activity', group: 'Bet' },
  { id: 'ga-bet-device',     label: 'Bet device',          categoryId: 'general-activity', group: 'Bet' },
  { id: 'ga-bet-first-amt',  label: 'First bet amount',    categoryId: 'general-activity', group: 'Bet' },
  { id: 'ga-bet-first-date', label: 'First bet date',      categoryId: 'general-activity', group: 'Bet' },
  { id: 'ga-bet-last-amt',   label: 'Last bet amount',     categoryId: 'general-activity', group: 'Bet' },
  { id: 'ga-bet-last-date',  label: 'Last bet date',       categoryId: 'general-activity', group: 'Bet' },
  { id: 'ga-bet-total-amt',  label: 'Total bet amount',    categoryId: 'general-activity', group: 'Bet' },

  // ── General activity / Bonus ──────────────────────────────────────────────
  { id: 'ga-bonus-awarded',       label: 'Awarded bonus amount',    categoryId: 'general-activity', group: 'Bonus' },
  { id: 'ga-bonus-activation',    label: 'Bonus activation date',   categoryId: 'general-activity', group: 'Bonus' },
  { id: 'ga-bonus-award-date',    label: 'Bonus award date',        categoryId: 'general-activity', group: 'Bonus' },
  { id: 'ga-bonus-expiration',    label: 'Bonus expiration date',   categoryId: 'general-activity', group: 'Bonus' },
  { id: 'ga-bonus-status',        label: 'Bonus status',            categoryId: 'general-activity', group: 'Bonus' },
  { id: 'ga-bonus-type',          label: 'Bonus type',              categoryId: 'general-activity', group: 'Bonus' },
  { id: 'ga-bonus-pending',       label: 'Has pending bonuses',     categoryId: 'general-activity', group: 'Bonus' },
  { id: 'ga-bonus-used',          label: 'Is bonus used',           categoryId: 'general-activity', group: 'Bonus' },
  { id: 'ga-bonus-last-award',    label: 'Last bonus award date',   categoryId: 'general-activity', group: 'Bonus' },

  // ── General activity / Deposit ────────────────────────────────────────────
  { id: 'ga-dep-avg',          label: 'Average deposit amount',   categoryId: 'general-activity', group: 'Deposit' },
  { id: 'ga-dep-activity',     label: 'Deposit activity',         categoryId: 'general-activity', group: 'Deposit' },
  { id: 'ga-dep-amt',          label: 'Deposit amount',           categoryId: 'general-activity', group: 'Deposit' },
  { id: 'ga-dep-avg-interval', label: 'Deposit average interval', categoryId: 'general-activity', group: 'Deposit' },
  { id: 'ga-dep-count',        label: 'Deposit count',            categoryId: 'general-activity', group: 'Deposit' },
  { id: 'ga-dep-currency',     label: 'Deposit currency',         categoryId: 'general-activity', group: 'Deposit' },
  { id: 'ga-dep-date',         label: 'Deposit date',             categoryId: 'general-activity', group: 'Deposit' },
  { id: 'ga-dep-total',        label: 'Deposit total amount',     categoryId: 'general-activity', group: 'Deposit' },
  { id: 'ga-dep-type',         label: 'Deposit type',             categoryId: 'general-activity', group: 'Deposit' },
  { id: 'ga-dep-first-amt',    label: 'First deposit amount',     categoryId: 'general-activity', group: 'Deposit' },
  { id: 'ga-dep-first-date',   label: 'First deposit date',       categoryId: 'general-activity', group: 'Deposit' },
  { id: 'ga-dep-last-amt',     label: 'Last deposit amount',      categoryId: 'general-activity', group: 'Deposit' },
  { id: 'ga-dep-last-date',    label: 'Last deposit date',        categoryId: 'general-activity', group: 'Deposit' },
  { id: 'ga-dep-second-date',  label: 'Second deposit date',      categoryId: 'general-activity', group: 'Deposit' },

  // ── General activity / Login ──────────────────────────────────────────────
  { id: 'ga-login-first-date',    label: 'First login date',       categoryId: 'general-activity', group: 'Login' },
  { id: 'ga-login-first-device',  label: 'First login device',     categoryId: 'general-activity', group: 'Login' },
  { id: 'ga-login-last-date',     label: 'Last login date',        categoryId: 'general-activity', group: 'Login' },
  { id: 'ga-login-last-device',   label: 'Last login device',      categoryId: 'general-activity', group: 'Login' },
  { id: 'ga-login-date',          label: 'Login date',             categoryId: 'general-activity', group: 'Login' },
  { id: 'ga-login-pref-device',   label: 'Preferred login device', categoryId: 'general-activity', group: 'Login' },

  // ── General activity / Registration ──────────────────────────────────────
  { id: 'ga-reg-promo',    label: 'Promo code',           categoryId: 'general-activity', group: 'Registration' },
  { id: 'ga-reg-ip',       label: 'Registration IP',      categoryId: 'general-activity', group: 'Registration' },
  { id: 'ga-reg-date',     label: 'Registration date',    categoryId: 'general-activity', group: 'Registration' },
  { id: 'ga-reg-device',   label: 'Registration device',  categoryId: 'general-activity', group: 'Registration' },
  { id: 'ga-reg-source',   label: 'Registration source',  categoryId: 'general-activity', group: 'Registration' },

  // ── General activity / Session ────────────────────────────────────────────
  { id: 'ga-session-avg', label: 'Average session duration', categoryId: 'general-activity', group: 'Session' },

  // ── General activity / Top down (manual) ─────────────────────────────────
  { id: 'ga-td-activity',        label: 'Top down activity',         categoryId: 'general-activity', group: 'Top down (manual)' },
  { id: 'ga-td-amt',             label: 'Top down amount',           categoryId: 'general-activity', group: 'Top down (manual)' },
  { id: 'ga-td-avg-amt',         label: 'Top down average amount',   categoryId: 'general-activity', group: 'Top down (manual)' },
  { id: 'ga-td-avg-interval',    label: 'Top down average interval', categoryId: 'general-activity', group: 'Top down (manual)' },
  { id: 'ga-td-count',           label: 'Top down count',            categoryId: 'general-activity', group: 'Top down (manual)' },
  { id: 'ga-td-currency',        label: 'Top down currency',         categoryId: 'general-activity', group: 'Top down (manual)' },
  { id: 'ga-td-date',            label: 'Top down date',             categoryId: 'general-activity', group: 'Top down (manual)' },
  { id: 'ga-td-first-amt',       label: 'Top down first amount',     categoryId: 'general-activity', group: 'Top down (manual)' },
  { id: 'ga-td-first-date',      label: 'Top down first date',       categoryId: 'general-activity', group: 'Top down (manual)' },
  { id: 'ga-td-last-amt',        label: 'Top down last amount',      categoryId: 'general-activity', group: 'Top down (manual)' },
  { id: 'ga-td-last-date',       label: 'Top down last date',        categoryId: 'general-activity', group: 'Top down (manual)' },
  { id: 'ga-td-total',           label: 'Top down total amount',     categoryId: 'general-activity', group: 'Top down (manual)' },
  { id: 'ga-td-type',            label: 'Top down type',             categoryId: 'general-activity', group: 'Top down (manual)' },

  // ── General activity / Top up (manual) ───────────────────────────────────
  { id: 'ga-tu-activity',        label: 'Top up activity',         categoryId: 'general-activity', group: 'Top up (manual)' },
  { id: 'ga-tu-amt',             label: 'Top up amount',           categoryId: 'general-activity', group: 'Top up (manual)' },
  { id: 'ga-tu-avg-amt',         label: 'Top up average amount',   categoryId: 'general-activity', group: 'Top up (manual)' },
  { id: 'ga-tu-avg-interval',    label: 'Top up average interval', categoryId: 'general-activity', group: 'Top up (manual)' },
  { id: 'ga-tu-count',           label: 'Top up count',            categoryId: 'general-activity', group: 'Top up (manual)' },
  { id: 'ga-tu-currency',        label: 'Top up currency',         categoryId: 'general-activity', group: 'Top up (manual)' },
  { id: 'ga-tu-date',            label: 'Top up date',             categoryId: 'general-activity', group: 'Top up (manual)' },
  { id: 'ga-tu-first-amt',       label: 'Top up first amount',     categoryId: 'general-activity', group: 'Top up (manual)' },
  { id: 'ga-tu-first-date',      label: 'Top up first date',       categoryId: 'general-activity', group: 'Top up (manual)' },
  { id: 'ga-tu-last-amt',        label: 'Top up last amount',      categoryId: 'general-activity', group: 'Top up (manual)' },
  { id: 'ga-tu-last-date',       label: 'Top up last date',        categoryId: 'general-activity', group: 'Top up (manual)' },
  { id: 'ga-tu-total',           label: 'Top up total amount',     categoryId: 'general-activity', group: 'Top up (manual)' },
  { id: 'ga-tu-type',            label: 'Top up type',             categoryId: 'general-activity', group: 'Top up (manual)' },

  // ── General activity / Withdrawal ─────────────────────────────────────────
  { id: 'ga-wd-avg',          label: 'Average withdrawal amount', categoryId: 'general-activity', group: 'Withdrawal' },
  { id: 'ga-wd-first-amt',    label: 'First withdrawal amount',   categoryId: 'general-activity', group: 'Withdrawal' },
  { id: 'ga-wd-first-date',   label: 'First withdrawal date',     categoryId: 'general-activity', group: 'Withdrawal' },
  { id: 'ga-wd-last-amt',     label: 'Last withdrawal amount',    categoryId: 'general-activity', group: 'Withdrawal' },
  { id: 'ga-wd-last-date',    label: 'Last withdrawal date',      categoryId: 'general-activity', group: 'Withdrawal' },
  { id: 'ga-wd-activity',     label: 'Withdraw activity',         categoryId: 'general-activity', group: 'Withdrawal' },
  { id: 'ga-wd-amt',          label: 'Withdraw amount',           categoryId: 'general-activity', group: 'Withdrawal' },
  { id: 'ga-wd-avg-interval', label: 'Withdraw average interval', categoryId: 'general-activity', group: 'Withdrawal' },
  { id: 'ga-wd-count',        label: 'Withdraw count',            categoryId: 'general-activity', group: 'Withdrawal' },
  { id: 'ga-wd-currency',     label: 'Withdraw currency',         categoryId: 'general-activity', group: 'Withdrawal' },
  { id: 'ga-wd-date',         label: 'Withdraw date',             categoryId: 'general-activity', group: 'Withdrawal' },
  { id: 'ga-wd-total',        label: 'Withdraw total amount',     categoryId: 'general-activity', group: 'Withdrawal' },
  { id: 'ga-wd-type',         label: 'Withdraw type',             categoryId: 'general-activity', group: 'Withdrawal' },

  // ── Player profile / Balance ───────────────────────────────────────────────
  { id: 'pp-bal-bonus', label: 'Bonus balance', categoryId: 'player-profile', group: 'Balance' },
  { id: 'pp-bal-real',  label: 'Real balance',  categoryId: 'player-profile', group: 'Balance' },

  // ── Player profile / Identification ───────────────────────────────────────
  { id: 'pp-id-affiliate', label: 'Affiliate ID',    categoryId: 'player-profile', group: 'Identification' },
  { id: 'pp-id-age',       label: 'Age',             categoryId: 'player-profile', group: 'Identification' },
  { id: 'pp-id-birthday',  label: 'Birthday date',   categoryId: 'player-profile', group: 'Identification' },
  { id: 'pp-id-email',     label: 'Email address',   categoryId: 'player-profile', group: 'Identification' },
  { id: 'pp-id-firstname', label: 'First name',      categoryId: 'player-profile', group: 'Identification' },
  { id: 'pp-id-gender',    label: 'Gender',          categoryId: 'player-profile', group: 'Identification' },
  { id: 'pp-id-language',  label: 'Language',        categoryId: 'player-profile', group: 'Identification' },
  { id: 'pp-id-lastname',  label: 'Last name',       categoryId: 'player-profile', group: 'Identification' },
  { id: 'pp-id-phone',     label: 'Phone number',    categoryId: 'player-profile', group: 'Identification' },
  { id: 'pp-id-playerid',  label: 'Player ID',       categoryId: 'player-profile', group: 'Identification' },
  { id: 'pp-id-username',  label: 'Username',        categoryId: 'player-profile', group: 'Identification' },

  // ── Player profile / KPI ──────────────────────────────────────────────────
  { id: 'pp-kpi-bonus-conv',    label: 'Bonus Conversion %',         categoryId: 'player-profile', group: 'KPI' },
  { id: 'pp-kpi-bonus-usage',   label: 'Bonus Usage %',              categoryId: 'player-profile', group: 'KPI' },
  { id: 'pp-kpi-bonus-ggr',     label: 'Bonus cost to GGR ratio %',  categoryId: 'player-profile', group: 'KPI' },
  { id: 'pp-kpi-bonus-bet',     label: 'Bonus to real bet ratio %',  categoryId: 'player-profile', group: 'KPI' },
  { id: 'pp-kpi-casino-profit', label: 'Casino profitability %',     categoryId: 'player-profile', group: 'KPI' },
  { id: 'pp-kpi-days-played',   label: 'Days played',                categoryId: 'player-profile', group: 'KPI' },
  { id: 'pp-kpi-ngr',           label: 'General NGR',                categoryId: 'player-profile', group: 'KPI' },
  { id: 'pp-kpi-bonus-cost',    label: 'General Total bonus cost',   categoryId: 'player-profile', group: 'KPI' },
  { id: 'pp-kpi-gen-profit',    label: 'General profitability %',    categoryId: 'player-profile', group: 'KPI' },
  { id: 'pp-kpi-hold',          label: 'Hold %',                     categoryId: 'player-profile', group: 'KPI' },
  { id: 'pp-kpi-period',        label: 'KPI period',                 categoryId: 'player-profile', group: 'KPI' },
  { id: 'pp-kpi-net-dep',       label: 'Net deposit',                categoryId: 'player-profile', group: 'KPI' },
  { id: 'pp-kpi-total-ggr',     label: 'Total GGR',                  categoryId: 'player-profile', group: 'KPI' },
  { id: 'pp-kpi-wd-dep-ratio',  label: 'Withdrawal to deposit ratio %', categoryId: 'player-profile', group: 'KPI' },

  // ── Player profile / KYC ──────────────────────────────────────────────────
  { id: 'pp-kyc-status', label: 'KYC verification status', categoryId: 'player-profile', group: 'KYC' },

  // ── Player profile / Location ─────────────────────────────────────────────
  { id: 'pp-loc-address',  label: 'Address',            categoryId: 'player-profile', group: 'Location' },
  { id: 'pp-loc-city',     label: 'City',               categoryId: 'player-profile', group: 'Location' },
  { id: 'pp-loc-country',  label: 'Country',            categoryId: 'player-profile', group: 'Location' },
  { id: 'pp-loc-postcode', label: 'Postcode',           categoryId: 'player-profile', group: 'Location' },
  { id: 'pp-loc-currency', label: 'Preferred currency', categoryId: 'player-profile', group: 'Location' },

  // ── Player profile / Responsible gambling ────────────────────────────────
  { id: 'pp-rg-excluded', label: 'Self-excluded', categoryId: 'player-profile', group: 'Responsible gambling' },

  // ── Player profile / State ────────────────────────────────────────────────
  { id: 'pp-state-2fa',       label: '2FA enabled', categoryId: 'player-profile', group: 'State' },
  { id: 'pp-state-block',     label: 'Block',       categoryId: 'player-profile', group: 'State' },
  { id: 'pp-state-streamer',  label: 'Is streamer', categoryId: 'player-profile', group: 'State' },
  { id: 'pp-state-test',      label: 'Is test',     categoryId: 'player-profile', group: 'State' },

  // ── Player profile / Other ────────────────────────────────────────────────
  { id: 'pp-other-email-optin',    label: 'Email opted-in',          categoryId: 'player-profile', group: 'Other' },
  { id: 'pp-other-email-verify',   label: 'Email verification status', categoryId: 'player-profile', group: 'Other' },
  { id: 'pp-other-fav-game1',      label: 'Favorite game 1',         categoryId: 'player-profile', group: 'Other' },
  { id: 'pp-other-fav-game2',      label: 'Favorite game 2',         categoryId: 'player-profile', group: 'Other' },
  { id: 'pp-other-fav-game3',      label: 'Favorite game 3',         categoryId: 'player-profile', group: 'Other' },
  { id: 'pp-other-fav-prod1',      label: 'Favorite product 1',      categoryId: 'player-profile', group: 'Other' },
  { id: 'pp-other-fav-prod2',      label: 'Favorite product 2',      categoryId: 'player-profile', group: 'Other' },
  { id: 'pp-other-lifecycle',      label: 'Lifecycle',               categoryId: 'player-profile', group: 'Other' },
  { id: 'pp-other-phone-verify',   label: 'Phone verification status', categoryId: 'player-profile', group: 'Other' },
  { id: 'pp-other-sms-optin',      label: 'SMS opted-in',            categoryId: 'player-profile', group: 'Other' },
  { id: 'pp-other-tag',            label: 'Tag',                     categoryId: 'player-profile', group: 'Other' },

  // ── Sports / Bet ──────────────────────────────────────────────────────────
  { id: 'sp-bet-amt',        label: 'Bet amount',     categoryId: 'sports', group: 'Bet' },
  { id: 'sp-bet-count',      label: 'Bet count',      categoryId: 'sports', group: 'Bet' },
  { id: 'sp-bet-date',       label: 'Bet date',       categoryId: 'sports', group: 'Bet' },
  { id: 'sp-bet-type',       label: 'Bet type',       categoryId: 'sports', group: 'Bet' },
  { id: 'sp-bet-odds',       label: 'Betslip odds',   categoryId: 'sports', group: 'Bet' },
  { id: 'sp-bet-first-amt',  label: 'First bet amount', categoryId: 'sports', group: 'Bet' },
  { id: 'sp-bet-first-date', label: 'First bet date', categoryId: 'sports', group: 'Bet' },

  // ── Sports / Metrics ──────────────────────────────────────────────────────
  { id: 'sp-metrics-ggr', label: 'GGR', categoryId: 'sports', group: 'Metrics' },

  // ── Casino & Games / Bet ──────────────────────────────────────────────────
  { id: 'cg-bet-avg',        label: 'Average bet amount', categoryId: 'casino-games', group: 'Bet' },
  { id: 'cg-bet-amt',        label: 'Bet amount',         categoryId: 'casino-games', group: 'Bet' },
  { id: 'cg-bet-count',      label: 'Bet count',          categoryId: 'casino-games', group: 'Bet' },
  { id: 'cg-bet-date',       label: 'Bet date',           categoryId: 'casino-games', group: 'Bet' },
  { id: 'cg-bet-first-amt',  label: 'First bet amount',   categoryId: 'casino-games', group: 'Bet' },
  { id: 'cg-bet-first-date', label: 'First bet date',     categoryId: 'casino-games', group: 'Bet' },
  { id: 'cg-bet-last-amt',   label: 'Last bet amount',    categoryId: 'casino-games', group: 'Bet' },
  { id: 'cg-bet-last-date',  label: 'Last bet date',      categoryId: 'casino-games', group: 'Bet' },
  { id: 'cg-bet-total',      label: 'Total bet amount',   categoryId: 'casino-games', group: 'Bet' },

  // ── Casino & Games / KPI ──────────────────────────────────────────────────
  { id: 'cg-kpi-ngr',        label: 'Casino NGR',              categoryId: 'casino-games', group: 'KPI' },
  { id: 'cg-kpi-bonus-cost', label: 'Casino Total bonus cost', categoryId: 'casino-games', group: 'KPI' },

  // ── Casino & Games / GGR ──────────────────────────────────────────────────
  { id: 'cg-ggr-ngr', label: 'Casino NGR', categoryId: 'casino-games', group: 'GGR' },

  // ── Casino & Games / Type ─────────────────────────────────────────────────
  { id: 'cg-type-games',   label: 'Games',   categoryId: 'casino-games', group: 'Type' },
  { id: 'cg-type-product', label: 'Product', categoryId: 'casino-games', group: 'Type' },

  // ── Communications / Communication history ────────────────────────────────
  { id: 'cm-hist-channel',   label: 'Communication channel',    categoryId: 'communications', group: 'Communication history' },
  { id: 'cm-hist-sent-date', label: 'Communication sent date',  categoryId: 'communications', group: 'Communication history' },
  { id: 'cm-hist-workflow',  label: 'Participated in workflow', categoryId: 'communications', group: 'Communication history' },
  { id: 'cm-hist-template',  label: 'Sent template name',       categoryId: 'communications', group: 'Communication history' },

  // ── Communications / Date ─────────────────────────────────────────────────
  { id: 'cm-date-sms',   label: 'Last SMS date',           categoryId: 'communications', group: 'Date' },
  { id: 'cm-date-comm',  label: 'Last communication date', categoryId: 'communications', group: 'Date' },
  { id: 'cm-date-email', label: 'Last email date',         categoryId: 'communications', group: 'Date' },

  // ── Communications / Delivery ─────────────────────────────────────────────
  { id: 'cm-del-hard', label: 'Hard-bounced', categoryId: 'communications', group: 'Delivery' },
  { id: 'cm-del-soft', label: 'Soft-bounced', categoryId: 'communications', group: 'Delivery' },

  // ── Communications / Performance ─────────────────────────────────────────
  { id: 'cm-perf-opened', label: 'Opened', categoryId: 'communications', group: 'Performance' },
];

export type FilterPickerBlock =
  | {
      readonly kind: 'subsection';
      readonly key: string;
      readonly title: string;
      readonly categoryId: Exclude<FilterCategoryId, 'all'>;
      readonly group: string;
    }
  | { readonly kind: 'row'; readonly item: FilterCatalogItem };

/** Figma 443:11857 — Communications subsection icons (Banger / DS icon font). */
const COMMUNICATIONS_SUBSECTION_ICONS: Record<string, string> = {
  'Communication history': 'ds-icon-general-history',
  Date: 'ds-icon-control-calendar',
  Delivery: 'ds-icon-general-track',
  Performance: 'ds-icon-general-messages',
};

/** Figma 443:11859 — Casino & Games subsection icons (Banger / DS icon font). */
const CASINO_GAMES_SUBSECTION_ICONS: Record<string, string> = {
  Bet: 'ds-icon-category-table-games',
  KPI: 'ds-icon-general-chart',
  GGR: 'ds-icon-general-money-stack',
  Type: 'ds-icon-category-crash-games',
};

/** Figma 443:11860 — Sports subsection icons (Banger / DS icon font). */
const SPORTS_SUBSECTION_ICONS: Record<string, string> = {
  Bet: 'ds-icon-category-table-games',
  Metrics: 'ds-icon-general-chart',
};

/** Figma 443:11858 — Player profile subsection icons (Feather / DS icon font). */
const PLAYER_PROFILE_SUBSECTION_ICONS: Record<string, string> = {
  Balance: 'ds-icon-general-wallet',
  Identification: 'ds-icon-general-user-rectangle',
  KPI: 'ds-icon-general-chart',
  KYC: 'ds-icon-general-check-shield',
  Location: 'ds-icon-general-location',
  'Responsible gambling': 'ds-icon-general-lock',
  State: 'ds-icon-general-tag',
  Other: 'ds-icon-general-folder',
};

/** Figma 443:11861 — General activity subsection icons (Feather / DS icon font). */
const GENERAL_ACTIVITY_SUBSECTION_ICONS: Record<string, string> = {
  Bet: 'ds-icon-category-table-games',
  Bonus: 'ds-icon-category-bonus-buy',
  Deposit: 'ds-icon-general-money-up',
  Login: 'ds-icon-arrows-corner-up-right',
  Registration: 'ds-icon-general-user-plus',
  Session: 'ds-icon-general-history',
  'Top down (manual)': 'ds-icon-general-money-down',
  'Top up (manual)': 'ds-icon-general-money-up',
  Withdrawal: 'ds-icon-general-money-down',
};

const SUBSECTION_ICON_BY_CATEGORY: Record<Exclude<FilterCategoryId, 'all'>, string> = {
  'general-activity': 'ds-icon-general-workspace',
  'player-profile': 'ds-icon-general-user-rectangle',
  sports: 'ds-icon-general-target',
  'casino-games': 'ds-icon-general-gift',
  communications: 'ds-icon-general-message',
};

/** Icon pill background tone per filter category (Figma accent tokens). */
const SUBSECTION_ICON_TONE_BY_CATEGORY: Record<Exclude<FilterCategoryId, 'all'>, string> = {
  'general-activity': 'segment-filter-picker__subsection-icon--olive',
  'player-profile': 'segment-filter-picker__subsection-icon--blue',
  sports: 'segment-filter-picker__subsection-icon--purple',
  'casino-games': 'segment-filter-picker__subsection-icon--amber',
  communications: 'segment-filter-picker__subsection-icon--pink',
};

export function subsectionIconClass(
  categoryId: Exclude<FilterCategoryId, 'all'>,
  group?: string,
): string {
  if (categoryId === 'general-activity' && group) {
    return GENERAL_ACTIVITY_SUBSECTION_ICONS[group] ?? SUBSECTION_ICON_BY_CATEGORY[categoryId];
  }
  if (categoryId === 'player-profile' && group) {
    return PLAYER_PROFILE_SUBSECTION_ICONS[group] ?? SUBSECTION_ICON_BY_CATEGORY[categoryId];
  }
  if (categoryId === 'sports' && group) {
    return SPORTS_SUBSECTION_ICONS[group] ?? SUBSECTION_ICON_BY_CATEGORY[categoryId];
  }
  if (categoryId === 'casino-games' && group) {
    return CASINO_GAMES_SUBSECTION_ICONS[group] ?? SUBSECTION_ICON_BY_CATEGORY[categoryId];
  }
  if (categoryId === 'communications' && group) {
    return COMMUNICATIONS_SUBSECTION_ICONS[group] ?? SUBSECTION_ICON_BY_CATEGORY[categoryId];
  }
  return SUBSECTION_ICON_BY_CATEGORY[categoryId] ?? 'ds-icon-general-workspace';
}

export function subsectionIconToneClass(categoryId: Exclude<FilterCategoryId, 'all'>): string {
  return SUBSECTION_ICON_TONE_BY_CATEGORY[categoryId];
}

/** Accent tone for filter preview stripe and icon pill (matches picker category colors). */
export type FilterCategoryTone = 'olive' | 'blue' | 'purple' | 'amber' | 'pink';

const CATEGORY_TONE_BY_CATEGORY: Record<Exclude<FilterCategoryId, 'all'>, FilterCategoryTone> = {
  'general-activity': 'olive',
  'player-profile': 'blue',
  sports: 'purple',
  'casino-games': 'amber',
  communications: 'pink',
};

export function categoryFilterTone(categoryId: Exclude<FilterCategoryId, 'all'>): FilterCategoryTone {
  return CATEGORY_TONE_BY_CATEGORY[categoryId];
}

export function filterPickerBlocks(items: readonly FilterCatalogItem[]): readonly FilterPickerBlock[] {
  const blocks: FilterPickerBlock[] = [];
  let prevKey = '';
  for (const item of items) {
    const key = `${item.categoryId}::${item.group}`;
    if (key !== prevKey) {
      prevKey = key;
      blocks.push({
        kind: 'subsection',
        key,
        title: `${categoryLabel(item.categoryId)} / ${item.group}`,
        categoryId: item.categoryId,
        group: item.group,
      });
    }
    blocks.push({ kind: 'row', item });
  }
  return blocks;
}

export function categoryLabel(id: Exclude<FilterCategoryId, 'all'>): string {
  return FILTER_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function filterDescriptionContent(item: FilterCatalogItem): FilterDescriptionContent {
  const description = item.description;
  if (description === undefined) {
    return FILTER_DESCRIPTION_PLACEHOLDER;
  }
  if (typeof description === 'string') {
    const text = description.trim();
    return text || FILTER_DESCRIPTION_PLACEHOLDER;
  }
  return description;
}

export function filterCatalogItems(query: string, category: FilterCategoryId): readonly FilterCatalogItem[] {
  const q = query.trim().toLowerCase();
  let rows = FILTER_CATALOG as FilterCatalogItem[];
  if (category !== 'all') {
    rows = rows.filter((i) => i.categoryId === category);
  }
  if (!q) {
    return rows;
  }
  return rows.filter(
    (i) =>
      i.label.toLowerCase().includes(q) ||
      i.group.toLowerCase().includes(q) ||
      categoryLabel(i.categoryId).toLowerCase().includes(q),
  );
}
