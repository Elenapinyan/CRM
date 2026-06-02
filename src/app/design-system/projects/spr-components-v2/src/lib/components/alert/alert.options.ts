const AlertTypes = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

type AlertType = (typeof AlertTypes)[keyof typeof AlertTypes];

const DEFAULT_ICON = 'ds-icon-general-info';

export { DEFAULT_ICON, AlertTypes, AlertType };
