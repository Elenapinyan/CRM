// hack to detect if type is any
type IsAny<Type> = 0 extends 1 & Type ? true : false;

// double typecheck to detect if type is unknown
type IsUnknown<Type> = IsAny<Type> extends true ? false : [unknown] extends [Type] ? ([Type] extends [unknown] ? true : false) : false;

type BreadcrumbItem<Payload = unknown> = {
  name: string;
  path: string | string[];
} & (IsAny<Payload> extends true ? { payload?: Payload } : IsUnknown<Payload> extends true ? { payload?: Payload } : { payload: Payload });

export { BreadcrumbItem };
