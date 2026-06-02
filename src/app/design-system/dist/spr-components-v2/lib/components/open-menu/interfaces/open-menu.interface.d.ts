export type MenuPlacement = 'top' | 'top-start' | 'top-left' | 'top-end' | 'top-right' | 'bottom' | 'bottom-start' | 'bottom-left' | 'bottom-end' | 'bottom-right' | 'start' | 'left' | 'start-top' | 'left-top' | 'start-bottom' | 'left-bottom' | 'end' | 'right' | 'end-top' | 'right-top' | 'end-bottom' | 'right-bottom';
export type SubMenuPlacement = Extract<MenuPlacement, 'top' | 'right' | 'left'>;
