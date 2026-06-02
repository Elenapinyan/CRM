import { ConnectedPosition } from '@angular/cdk/overlay';
export type MenuPosition = 'top' | 'bottom' | 'left' | 'right';
export type MenuCloseTrigger = 'backdrop' | 'manual' | 'outside';
export declare const positionsMap: Record<MenuPosition, ConnectedPosition[]>;
