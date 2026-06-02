import { FormControl } from '@angular/forms';

export type FormControlRecord<Type> = {
  [P in keyof Type]: FormControl<Type[P]>;
};
