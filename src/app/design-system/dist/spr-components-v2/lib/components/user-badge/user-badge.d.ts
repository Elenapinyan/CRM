import * as i0 from "@angular/core";
export declare class SprUserBadge {
    /**
     * Use this property to provide a content.
     * @required
     **/
    content: import("@angular/core").InputSignal<string>;
    /**
     * Use this property to provide an image url. In case if url isn't specified, initials are displayed.
     * @optional
     **/
    imageSrc: import("@angular/core").InputSignal<string | undefined>;
    protected readonly initials: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprUserBadge, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprUserBadge, "ds-user-badge, [ds-user-badge], [dsUserBadge]", never, { "content": { "alias": "content"; "required": true; "isSignal": true; }; "imageSrc": { "alias": "imageSrc"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
