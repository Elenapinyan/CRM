export type ErrorMessages = Partial<Record<string, ErrorMessageValue>>;

export type ErrorMessageValue = ((...args: any) => string) | string;
