import type { FilterDef } from '../types/segment';

const GREEN  = '#16a34a';
const TEAL   = '#0d9488';
const BLUE   = '#2563eb';
const PURPLE = '#7c3aed';
const AMBER  = '#d97706';
const PINK   = '#db2777';

function def(
  id: string, name: string, category: string, subCategory: string,
  dataType: FilterDef['dataType'], color: string, description: string
): FilterDef {
  return { id, name, category, subCategory, dataType, color, description };
}

export const FILTER_DEFS: FilterDef[] = [
  // General activity / Bet
  def('avg_bet_amount',   'Average bet amount',    'General activity', 'Bet', 'number', GREEN, 'Average bet amount calculated based on all user betting activities across the platform, including both casino and sports betting.'),
  def('bet_amount',       'Bet amount',            'General activity', 'Bet', 'number', GREEN, 'Total bet amount placed by the player.'),
  def('bet_count',        'Bet count',             'General activity', 'Bet', 'number', GREEN, 'Total number of bets placed by the player.'),
  def('bet_date',         'Bet date',              'General activity', 'Bet', 'date',   GREEN, 'The date of the player\'s betting activity. Use to filter players by when they last placed a bet.'),
  def('bet_device',       'Bet device',            'General activity', 'Bet', 'string', GREEN, 'Device used to place the bet (mobile, desktop, tablet).'),
  def('first_bet_amount', 'First bet amount',      'General activity', 'Bet', 'number', GREEN, 'Amount of the player\'s very first bet.'),
  def('first_bet_date',   'First bet date',        'General activity', 'Bet', 'date',   GREEN, 'Date when the player placed their first bet.'),
  def('last_bet_amount',  'Last bet amount',       'General activity', 'Bet', 'number', GREEN, 'Amount of the player\'s most recent bet.'),
  def('last_bet_date',    'Last bet date',         'General activity', 'Bet', 'date',   GREEN, 'Date when the player placed their most recent bet.'),
  def('total_bet_amount', 'Total bet amount',      'General activity', 'Bet', 'number', GREEN, 'Total cumulative bet amount across all activities.'),

  // General activity / Bonus
  def('awarded_bonus_amt',  'Awarded bonus amount',   'General activity', 'Bonus', 'number', GREEN, 'Total bonus amount awarded to the player.'),
  def('bonus_activation',   'Bonus activation date',  'General activity', 'Bonus', 'date',   GREEN, 'Date when the bonus was activated.'),
  def('bonus_award_date',   'Bonus award date',       'General activity', 'Bonus', 'date',   GREEN, 'Date when the bonus was awarded.'),
  def('bonus_expiration',   'Bonus expiration date',  'General activity', 'Bonus', 'date',   GREEN, 'Expiration date of the player\'s bonus.'),
  def('bonus_status',       'Bonus status',           'General activity', 'Bonus', 'enum',   GREEN, 'Current status of the bonus (active, expired, used).'),
  def('bonus_type',         'Bonus type',             'General activity', 'Bonus', 'enum',   GREEN, 'Type of bonus awarded to the player.'),
  def('has_pending_bonus',  'Has pending bonuses',    'General activity', 'Bonus', 'boolean',GREEN, 'Whether the player has any pending bonuses.'),
  def('last_bonus_date',    'Last bonus award date',  'General activity', 'Bonus', 'date',   GREEN, 'Date of the most recent bonus award.'),

  // General activity / Deposit
  def('avg_deposit_amt',    'Average deposit amount',  'General activity', 'Deposit', 'number', TEAL, 'Average deposit amount across all deposits.'),
  def('deposit_activity',   'Deposit activity',        'General activity', 'Deposit', 'boolean',TEAL, 'Whether the player has deposit activity.'),
  def('deposit_amount',     'Deposit amount',          'General activity', 'Deposit', 'number', TEAL, 'Amount of a deposit transaction.'),
  def('deposit_avg_int',    'Deposit average interval','General activity', 'Deposit', 'number', TEAL, 'Average interval between deposits in days.'),
  def('deposit_count',      'Deposit count',           'General activity', 'Deposit', 'number', TEAL, 'Total number of deposits made.'),
  def('deposit_currency',   'Deposit currency',        'General activity', 'Deposit', 'string', TEAL, 'Currency used for deposit.'),
  def('deposit_date',       'Deposit date',            'General activity', 'Deposit', 'date',   TEAL, 'Date of the deposit.'),
  def('deposit_total_amt',  'Deposit total amount',    'General activity', 'Deposit', 'number', TEAL, 'Total cumulative deposit amount.'),
  def('deposit_type',       'Deposit type',            'General activity', 'Deposit', 'enum',   TEAL, 'Type of deposit (card, bank, crypto, etc.).'),
  def('first_deposit_amt',  'First deposit amount',    'General activity', 'Deposit', 'number', TEAL, 'Amount of the player\'s first deposit.'),
  def('first_deposit_date', 'First deposit date',      'General activity', 'Deposit', 'date',   TEAL, 'Date of the player\'s first deposit.'),
  def('last_deposit_amt',   'Last deposit amount',     'General activity', 'Deposit', 'number', TEAL, 'Amount of the most recent deposit.'),
  def('last_deposit_date',  'Last deposit date',       'General activity', 'Deposit', 'date',   TEAL, 'Date of the most recent deposit.'),
  def('second_deposit_date','Second deposit date',     'General activity', 'Deposit', 'date',   TEAL, 'Date of the player\'s second deposit.'),

  // General activity / Login
  def('first_login_date',   'First login date',        'General activity', 'Login', 'date',   GREEN, 'Date of the player\'s first login.'),
  def('first_login_device', 'First login device',      'General activity', 'Login', 'string', GREEN, 'Device used for the first login.'),
  def('last_login_date',    'Last login date',         'General activity', 'Login', 'date',   GREEN, 'Date of the most recent login.'),
  def('last_login_device',  'Last login device',       'General activity', 'Login', 'string', GREEN, 'Device used for the most recent login.'),
  def('login_date',         'Login date',              'General activity', 'Login', 'date',   GREEN, 'Date of login activity.'),
  def('pref_login_device',  'Preferred login device',  'General activity', 'Login', 'string', GREEN, 'The device the player most commonly logs in from.'),

  // General activity / Registration
  def('promo_code',         'Promo code',              'General activity', 'Registration', 'string', GREEN, 'Promo code used during registration.'),
  def('registration_ip',    'Registration IP',         'General activity', 'Registration', 'string', GREEN, 'IP address used during registration.'),
  def('registration_date',  'Registration date',       'General activity', 'Registration', 'date',   GREEN, 'Date when the player registered.'),
  def('registration_device','Registration device',     'General activity', 'Registration', 'string', GREEN, 'Device used during registration.'),
  def('registration_source','Registration source',     'General activity', 'Registration', 'string', GREEN, 'Traffic source that referred the player.'),

  // General activity / Session
  def('avg_session_dur',    'Average session duration', 'General activity', 'Session', 'number', GREEN, 'Average duration of a player session in minutes.'),

  // General activity / Withdrawal
  def('avg_withdraw_amt',   'Average withdrawal amount','General activity', 'Withdrawal', 'number', TEAL, 'Average amount withdrawn per transaction.'),
  def('first_withdraw_amt', 'First withdrawal amount',  'General activity', 'Withdrawal', 'number', TEAL, 'Amount of the first withdrawal.'),
  def('first_withdraw_date','First withdrawal date',    'General activity', 'Withdrawal', 'date',   TEAL, 'Date of the first withdrawal.'),
  def('last_withdraw_amt',  'Last withdrawal amount',   'General activity', 'Withdrawal', 'number', TEAL, 'Amount of the most recent withdrawal.'),
  def('last_withdraw_date', 'Last withdrawal date',     'General activity', 'Withdrawal', 'date',   TEAL, 'Date of the most recent withdrawal.'),
  def('withdraw_activity',  'Withdrawal activity',      'General activity', 'Withdrawal', 'boolean',TEAL, 'Whether the player has withdrawal activity.'),
  def('withdraw_amount',    'Withdraw amount',          'General activity', 'Withdrawal', 'number', TEAL, 'Amount withdrawn in a transaction.'),
  def('withdraw_count',     'Withdraw count',           'General activity', 'Withdrawal', 'number', TEAL, 'Total number of withdrawals.'),
  def('withdraw_currency',  'Withdraw currency',        'General activity', 'Withdrawal', 'string', TEAL, 'Currency used for withdrawal.'),
  def('withdraw_date',      'Withdraw date',            'General activity', 'Withdrawal', 'date',   TEAL, 'Date of withdrawal.'),
  def('withdraw_total_amt', 'Withdraw total amount',    'General activity', 'Withdrawal', 'number', TEAL, 'Total cumulative withdrawal amount.'),
  def('withdraw_type',      'Withdraw type',            'General activity', 'Withdrawal', 'enum',   TEAL, 'Type of withdrawal method.'),

  // Player profile / Identification
  def('affiliate_id',       'Affiliate ID',            'Player profile', 'Identification', 'string', BLUE, 'Affiliate ID associated with the player.'),
  def('age',                'Age',                     'Player profile', 'Identification', 'number', BLUE, 'Player\'s age in years.'),
  def('birthday_date',      'Birthday date',           'Player profile', 'Identification', 'date',   BLUE, 'Player\'s date of birth.'),
  def('email_address',      'Email address',           'Player profile', 'Identification', 'string', BLUE, 'Player\'s email address.'),
  def('first_name',         'First name',              'Player profile', 'Identification', 'string', BLUE, 'Player\'s first name.'),
  def('gender',             'Gender',                  'Player profile', 'Identification', 'enum',   BLUE, 'Player\'s gender.'),
  def('language',           'Language',                'Player profile', 'Identification', 'string', BLUE, 'Player\'s preferred language.'),
  def('last_name',          'Last name',               'Player profile', 'Identification', 'string', BLUE, 'Player\'s last name.'),
  def('phone_number',       'Phone number',            'Player profile', 'Identification', 'string', BLUE, 'Player\'s phone number.'),
  def('player_id',          'Player ID',               'Player profile', 'Identification', 'string', BLUE, 'Unique player identifier.'),
  def('username',           'Username',                'Player profile', 'Identification', 'string', BLUE, 'Player\'s username.'),

  // Player profile / Balance
  def('real_balance',       'Real balance',            'Player profile', 'Balance', 'number', BLUE, 'Player\'s current real money balance.'),

  // Player profile / Location
  def('address',            'Address',                 'Player profile', 'Location', 'string', BLUE, 'Player\'s street address.'),
  def('city',               'City',                    'Player profile', 'Location', 'string', BLUE, 'Player\'s city of residence.'),
  def('country',            'Country',                 'Player profile', 'Location', 'string', BLUE, 'Player\'s country.'),
  def('postcode',           'Postcode',                'Player profile', 'Location', 'string', BLUE, 'Player\'s postal code.'),
  def('pref_currency',      'Preferred currency',      'Player profile', 'Location', 'string', BLUE, 'Player\'s preferred currency.'),

  // Player profile / State
  def('twofa_enabled',      '2FA enabled',             'Player profile', 'State', 'boolean', BLUE, 'Whether the player has two-factor authentication enabled.'),
  def('block',              'Block',                   'Player profile', 'State', 'boolean', BLUE, 'Whether the player\'s account is blocked.'),
  def('is_streamer',        'Is streamer',             'Player profile', 'State', 'boolean', BLUE, 'Whether the player is classified as a streamer.'),
  def('is_test',            'Is test',                 'Player profile', 'State', 'boolean', BLUE, 'Whether the account is a test account.'),

  // Player profile / KYC
  def('kyc_status',         'KYC verification status', 'Player profile', 'KYC', 'enum', BLUE, 'Player\'s Know Your Customer verification status.'),

  // Player profile / Responsible gambling
  def('self_excluded',      'Self-excluded',           'Player profile', 'Responsible gambling', 'boolean', BLUE, 'Whether the player has self-excluded from the platform.'),

  // Player profile / Other
  def('email_opted_in',     'Email opted-in',          'Player profile', 'Other', 'boolean', BLUE, 'Whether the player has opted in to email marketing.'),
  def('email_verified',     'Email verification status','Player profile', 'Other', 'enum',   BLUE, 'Status of the player\'s email verification.'),
  def('fav_game_1',         'Favorite game 1',         'Player profile', 'Other', 'string', BLUE, 'Player\'s top favorite game.'),
  def('fav_game_2',         'Favorite game 2',         'Player profile', 'Other', 'string', BLUE, 'Player\'s second favorite game.'),
  def('fav_game_3',         'Favorite game 3',         'Player profile', 'Other', 'string', BLUE, 'Player\'s third favorite game.'),
  def('lifecycle',          'Lifecycle',               'Player profile', 'Other', 'enum',   BLUE, 'Player\'s lifecycle stage.'),
  def('phone_verified',     'Phone verification status','Player profile', 'Other', 'enum',  BLUE, 'Status of the player\'s phone verification.'),
  def('sms_opted_in',       'SMS opted-in',            'Player profile', 'Other', 'boolean',BLUE, 'Whether the player has opted in to SMS marketing.'),
  def('tag',                'Tag',                     'Player profile', 'Other', 'string', BLUE, 'Player tag or label.'),

  // Sports / Bet
  def('sports_bet_amount',  'Bet amount',              'Sports', 'Bet', 'number', AMBER, 'Total amount bet on sports.'),
  def('sports_bet_count',   'Bet count',               'Sports', 'Bet', 'number', AMBER, 'Number of sports bets placed.'),
  def('sports_bet_date',    'Bet date',                'Sports', 'Bet', 'date',   AMBER, 'Date of sports bet activity.'),
  def('sports_bet_type',    'Bet type',                'Sports', 'Bet', 'enum',   AMBER, 'Type of sports bet (single, multi, system).'),
  def('betslip_odds',       'Betslip odds',            'Sports', 'Bet', 'number', AMBER, 'Odds on the betslip.'),
  def('sports_first_bet_amt','First bet amount',       'Sports', 'Bet', 'number', AMBER, 'First sports bet amount.'),
  def('sports_first_bet_dt','First bet date',          'Sports', 'Bet', 'date',   AMBER, 'Date of first sports bet.'),
  def('sports_last_bet_amt','Last bet amount',         'Sports', 'Bet', 'number', AMBER, 'Most recent sports bet amount.'),
  def('sports_last_bet_dt', 'Last bet date',           'Sports', 'Bet', 'date',   AMBER, 'Date of most recent sports bet.'),
  def('sports_total_bet',   'Total bet amount',        'Sports', 'Bet', 'number', AMBER, 'Total sports bet amount.'),

  // Casino & Games / Bet
  def('casino_avg_bet',     'Average bet amount',      'Casino & Games', 'Bet', 'number', PURPLE, 'Average bet amount in casino games.'),
  def('casino_bet_amount',  'Bet amount',              'Casino & Games', 'Bet', 'number', PURPLE, 'Amount bet in casino games.'),
  def('casino_bet_count',   'Bet count',               'Casino & Games', 'Bet', 'number', PURPLE, 'Number of casino bets.'),
  def('casino_bet_date',    'Bet date',                'Casino & Games', 'Bet', 'date',   PURPLE, 'Date of casino bet activity.'),
  def('casino_bet_type',    'Bet type',                'Casino & Games', 'Bet', 'enum',   PURPLE, 'Type of casino bet.'),
  def('casino_first_bet_a', 'First bet amount',        'Casino & Games', 'Bet', 'number', PURPLE, 'First casino bet amount.'),
  def('casino_first_bet_d', 'First bet date',          'Casino & Games', 'Bet', 'date',   PURPLE, 'Date of first casino bet.'),
  def('casino_last_bet_a',  'Last bet amount',         'Casino & Games', 'Bet', 'number', PURPLE, 'Most recent casino bet amount.'),
  def('casino_last_bet_d',  'Last bet date',           'Casino & Games', 'Bet', 'date',   PURPLE, 'Date of most recent casino bet.'),
  def('casino_total_bet',   'Total bet amount',        'Casino & Games', 'Bet', 'number', PURPLE, 'Total casino bet amount.'),

  // Casino & Games / GGR
  def('total_ggr',          'Total GGR',               'Casino & Games', 'GGR', 'number', PURPLE, 'Total Gross Gaming Revenue across all games.'),
  def('casino_ngr',         'Casino NGR',              'Casino & Games', 'GGR', 'number', PURPLE, 'Casino Net Gaming Revenue.'),
  def('casino_total_bonus', 'Casino Total bonus cost', 'Casino & Games', 'GGR', 'number', PURPLE, 'Total casino bonus costs.'),
  def('general_ngr',        'General NGR',             'Casino & Games', 'GGR', 'number', PURPLE, 'Overall Net Gaming Revenue.'),
  def('general_profitability','General profitability %','Casino & Games', 'GGR', 'number', PURPLE, 'Overall profitability percentage.'),
  def('hold_pct',           'Hold %',                  'Casino & Games', 'GGR', 'number', PURPLE, 'House edge percentage.'),
  def('kpi_period',         'KPI period',              'Casino & Games', 'GGR', 'enum',   PURPLE, 'Time period for KPI calculation.'),
  def('net_deposit',        'Net deposit',             'Casino & Games', 'GGR', 'number', PURPLE, 'Net deposit (deposits minus withdrawals).'),
  def('wd_deposit_ratio',   'Withdrawal to deposit ratio %', 'Casino & Games', 'GGR', 'number', PURPLE, 'Ratio of withdrawals to deposits.'),

  // Casino & Games / KPI
  def('bonus_conversion',   'Bonus Conversion %',      'Casino & Games', 'KPI', 'number', PURPLE, 'Percentage of bonuses converted to real money.'),
  def('bonus_usage',        'Bonus Usage %',           'Casino & Games', 'KPI', 'number', PURPLE, 'Percentage of bonuses used.'),
  def('bonus_cost_ggr',     'Bonus cost to GGR ratio %','Casino & Games', 'KPI', 'number', PURPLE, 'Ratio of bonus cost to GGR.'),
  def('bonus_real_bet',     'Bonus to real bet ratio %','Casino & Games', 'KPI', 'number', PURPLE, 'Ratio of bonus to real money bets.'),
  def('casino_profit_pct',  'Casino profitability %',  'Casino & Games', 'KPI', 'number', PURPLE, 'Casino profitability percentage.'),
  def('days_played',        'Days played',             'Casino & Games', 'KPI', 'number', PURPLE, 'Number of days the player was active.'),

  // Casino & Games / Type
  def('games',              'Games',                   'Casino & Games', 'Type', 'enum',   PURPLE, 'Specific casino games played.'),
  def('product',            'Product',                 'Casino & Games', 'Type', 'enum',   PURPLE, 'Casino product type.'),

  // Communications / Communication history
  def('comm_channel',       'Communication channel',   'Communications', 'Communication history', 'enum',   PINK, 'Channel used for communication (email, SMS, push).'),
  def('comm_sent_date',     'Communication sent date', 'Communications', 'Communication history', 'date',   PINK, 'Date when a communication was sent.'),
  def('participated_wf',    'Participated in workflow','Communications', 'Communication history', 'boolean',PINK, 'Whether the player participated in a workflow.'),
  def('sent_template',      'Sent template name',      'Communications', 'Communication history', 'string', PINK, 'Name of the template sent to the player.'),

  // Communications / Data
  def('last_sms_date',      'Last SMS date',           'Communications', 'Data', 'date',   PINK, 'Date of the most recent SMS sent.'),
  def('last_comm_date',     'Last communication date', 'Communications', 'Data', 'date',   PINK, 'Date of the most recent communication.'),
  def('last_email_date',    'Last email date',         'Communications', 'Data', 'date',   PINK, 'Date of the most recent email sent.'),

  // Communications / Delivery
  def('hard_bounced',       'Hard-bounced',            'Communications', 'Delivery', 'boolean', PINK, 'Whether the player\'s email has hard bounced.'),
  def('soft_bounced',       'Soft-bounced',            'Communications', 'Delivery', 'boolean', PINK, 'Whether the player\'s email has soft bounced.'),

  // Communications / Performance
  def('email_opened',       'Opened',                  'Communications', 'Performance', 'boolean', PINK, 'Whether the player has opened a communication.'),
];

export const CATEGORIES = ['All filters', 'General activity', 'Player profile', 'Sports', 'Casino & Games', 'Communications'];

export const CONDITIONS_BY_TYPE: Record<FilterDef['dataType'], string[]> = {
  number:  ['equal', 'not equal', 'greater', 'greater or equal', 'less', 'less and equal'],
  date:    ['within', 'not within', 'equal', 'greater or equal', 'less and equal'],
  string:  ['equal', 'not equal', 'contains', 'not contains'],
  boolean: ['is true', 'is false'],
  enum:    ['equal', 'not equal'],
};
