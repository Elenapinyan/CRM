import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as i0 from "@angular/core";
export declare class DisabledNgbFormatter extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct | null;
    format(date: NgbDateStruct | null): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DisabledNgbFormatter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DisabledNgbFormatter>;
}
