declare const AlertTypes: {
    readonly INFO: "info";
    readonly SUCCESS: "success";
    readonly WARNING: "warning";
    readonly DANGER: "danger";
};
type AlertType = (typeof AlertTypes)[keyof typeof AlertTypes];
declare const DEFAULT_ICON = "ds-icon-general-info";
export { DEFAULT_ICON, AlertTypes, AlertType };
