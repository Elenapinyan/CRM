import { InjectionToken } from '@angular/core';
interface TopBarDefaultOptions {
    iconName?: string;
    declineBtn?: string | null;
    confirmBtn?: string | null;
    title?: string;
    subtitle?: string;
}
export declare const TOP_BAR_DEFAULT_OPTIONS: InjectionToken<TopBarDefaultOptions>;
export {};
