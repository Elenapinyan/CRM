const BadgeRadiusVariant = {
  SQUARED: 'squared',
  ROUNDED: 'rounded',
} as const;

const BadgeSizeVariant = {
  SM: 'sm',
  MD: 'md',
} as const;

const BadgeSchemeVariant = {
  NEUTRAL: 'neutral',
  GREEN: 'green',
  BLUE: 'blue',
  PURPLE: 'purple',
  PINK: 'pink',
  RED: 'red',
  ORANGE: 'orange',
  OLIVE: 'olive',
  YELLOW: 'yellow',
  AMBER: 'amber',
  CYAN: 'cyan',
  DARK: 'dark',
} as const;

type BadgeRadius = (typeof BadgeRadiusVariant)[keyof typeof BadgeRadiusVariant];
type BadgeSize = (typeof BadgeSizeVariant)[keyof typeof BadgeSizeVariant];
type BadgeVariant = (typeof BadgeSchemeVariant)[keyof typeof BadgeSchemeVariant];

export { BadgeRadiusVariant, BadgeSizeVariant, BadgeSchemeVariant, BadgeRadius, BadgeSize, BadgeVariant };
