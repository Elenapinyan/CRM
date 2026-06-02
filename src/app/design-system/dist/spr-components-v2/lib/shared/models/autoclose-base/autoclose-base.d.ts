import { BehaviorSubject, Observable } from 'rxjs';
import { AnimationEvent } from '@angular/animations';
import * as i0 from "@angular/core";
export declare abstract class DsAutocloseBase {
    protected readonly isOpened: import("@angular/core").WritableSignal<boolean>;
    protected readonly ticks: import("@angular/core").Signal<number>;
    protected readonly paused$: BehaviorSubject<boolean>;
    /**
     * Time in seconds, then closed event will be emitted
     * @default false
     **/
    autoclose: import("@angular/core").InputSignal<boolean>;
    /**
     * Time in seconds, then closed event will be emitted
     * @default 5
     **/
    delay: import("@angular/core").InputSignal<number>;
    /**
     * Animation on dismiss
     * @default DEFAULT_ANIMATION = 'fade'
     **/
    animation: import("@angular/core").InputSignal<"fade">;
    /**
     * Pause timer on mouse hover
     * @default true
     **/
    pauseOnHover: import("@angular/core").InputSignal<boolean>;
    /**
     * Dismiss event which will be emitted when item is closed.
     **/
    readonly dismissed: import("@angular/core").OutputEmitterRef<void>;
    protected readonly timer$: Observable<{
        seconds: number;
        percents: number;
    }>;
    dismiss(): void;
    protected dismissFinished(event: AnimationEvent): void;
    private getTimer$;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsAutocloseBase, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsAutocloseBase, never, never, { "autoclose": { "alias": "autoclose"; "required": false; "isSignal": true; }; "delay": { "alias": "delay"; "required": false; "isSignal": true; }; "animation": { "alias": "animation"; "required": false; "isSignal": true; }; "pauseOnHover": { "alias": "pauseOnHover"; "required": false; "isSignal": true; }; }, { "dismissed": "dismissed"; }, never, never, true, never>;
}
