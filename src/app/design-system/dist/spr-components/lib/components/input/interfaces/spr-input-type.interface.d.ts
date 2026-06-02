export type InputType = 'text' | 'number' | 'bigNumber' | 'password';
export interface IconAddon {
    icon: string;
}
export interface TextAddon {
    text: string;
}
export type InputAddon = IconAddon | TextAddon;
