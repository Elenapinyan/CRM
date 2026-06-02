import { PipeTransform } from '@angular/core';
import { TabConfigGuard, TabType } from '../interfaces';
import * as i0 from "@angular/core";
export declare class GetTypedContextPipe<Type extends TabType, Config extends TabConfigGuard<Type>> implements PipeTransform {
    transform(config: Config, isActive: boolean): Config & {
        isActive: boolean;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<GetTypedContextPipe<any, any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<GetTypedContextPipe<any, any>, "getTypedContext", true>;
}
