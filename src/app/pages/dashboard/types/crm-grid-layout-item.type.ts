import type { KtdGridLayoutItem } from '@katoid/angular-grid-layout';

export type CrmGridLayoutItem = KtdGridLayoutItem & {
  label?: string;
  type?: string;
  isPlaceholder?: boolean;
  isOnlyLifetime?: boolean;
};
