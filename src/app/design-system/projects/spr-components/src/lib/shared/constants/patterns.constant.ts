export const NO_SPACES_REGEX = /^[\S]*$/;
export const DEFAULT_NAME = /^[.a-zA-Z0-9_-]+$/;
export const NUMBER_REGEX = /^[0-9\.,]+$/;
export const RESTRICTED_NUMBER_INPUT_REGEX = /[^\.,0-9]/g;
export const COMMA_REGEX = /,/g;
export const POINT_REGEX = /\./g;
export const VALID_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const ONLY_NUMBERS_DOTS_HYPHENS = /^[0-9.-]*$/;

export const FORBIDDEN_SYMBOLS_WITH_NO_SPACES_REGEX = /[-=±/!@#$%^&*()_+{}\[\]:;<>,.?~\\|'"`]/;
export const FORBIDDEN_SYMBOLS_WITH_SPACES_REGEX = /[-=±/!@#$%^&*()_+{}\[\]:;<>,.?~\\|'"` ]/;
export const FORBIDDEN_SYMBOLS_WITH_NO_NUMBERS_REGEX = /[-=±/!@#$%^&*()_+{}\[\]:;<>,.?~\\|'"`0-9]/;
