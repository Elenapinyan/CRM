export type WidgetInfo = {
  label: string | undefined;
  type: string | undefined;
  isOnlyLifetime: boolean | undefined;
};

export type WidgetInfoMap = Map<string, WidgetInfo>;
