import { ToastType } from '../enums/toast-type.enum';

export const TOAST_CLASSES_BY_CONTEXT: { [type in ToastType]: string } = {
  [ToastType.Success]: 'bg-success',
  [ToastType.Danger]: 'bg-danger',
  [ToastType.Warning]: 'bg-warning',
  [ToastType.Info]: 'bg-info',
};

export const TOAST_ICON_BY_TYPE: { [type in ToastType]: string } = {
  [ToastType.Success]: 'control-check-circle',
  [ToastType.Danger]: 'general-blocked',
  [ToastType.Warning]: 'general-warning',
  [ToastType.Info]: 'general-info',
};
