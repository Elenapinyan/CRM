import { Pipe, PipeTransform } from '@angular/core';
import { TabConfigGuard, TabType } from '../interfaces';

@Pipe({
  name: 'getTypedContext',
  standalone: true,
})
export class GetTypedContextPipe<Type extends TabType, Config extends TabConfigGuard<Type>> implements PipeTransform {
  transform(config: Config, isActive: boolean): Config & { isActive: boolean } {
    return { ...config, isActive };
  }
}
