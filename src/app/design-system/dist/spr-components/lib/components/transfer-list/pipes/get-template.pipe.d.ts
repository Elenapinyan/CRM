import { PipeTransform, QueryList, TemplateRef } from '@angular/core';
import { TransferListContext, TransferListItem, TransferListTemplateType } from '../interfaces/transfer-list.interface';
import { SprTransferListTemplateDirective } from '../directives/spr-transfer-list-template.directive';
import * as i0 from "@angular/core";
export declare class GetTemplatePipe implements PipeTransform {
    transform(templates: QueryList<SprTransferListTemplateDirective> | undefined, templateType: TransferListTemplateType): TemplateRef<TransferListContext<TransferListItem>> | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<GetTemplatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<GetTemplatePipe, "getTemplate", true>;
}
