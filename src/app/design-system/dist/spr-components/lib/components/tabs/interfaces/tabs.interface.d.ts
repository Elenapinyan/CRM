import { Params, QueryParamsHandling } from '@angular/router';
/**
 * TAB Configurations
 * **/
export interface DefaultTabConfiguration {
    tabKey: any;
    text: string;
    destroyOnHide: boolean;
}
export interface RoutingTabConfiguration extends DefaultTabConfiguration {
    routerSettings: TabRouterSettings;
}
export type TabVariant = 'tabs--level-first' | 'tabs--level-second' | 'tabs--level-third';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabType = 'default' | 'withRouting';
export type TabConfigGuard<T extends TabType> = T extends 'default' ? DefaultTabConfiguration : RoutingTabConfiguration;
/**
 * Router Settings
 * **/
export interface TabRouterSettings {
    routerLink: [string] | string | null;
    queryParams?: Params | null;
    queryParamsHandling?: QueryParamsHandling | null;
    fragment?: string;
}
