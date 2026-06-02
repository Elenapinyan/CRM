declare const BadgeRadiusVariant: {
    readonly SQUARED: "squared";
    readonly ROUNDED: "rounded";
};
declare const BadgeSizeVariant: {
    readonly SM: "sm";
    readonly MD: "md";
};
declare const BadgeSchemeVariant: {
    readonly NEUTRAL: "neutral";
    readonly GREEN: "green";
    readonly BLUE: "blue";
    readonly PURPLE: "purple";
    readonly PINK: "pink";
    readonly RED: "red";
    readonly ORANGE: "orange";
    readonly OLIVE: "olive";
    readonly YELLOW: "yellow";
    readonly AMBER: "amber";
    readonly CYAN: "cyan";
    readonly DARK: "dark";
};
type BadgeRadius = (typeof BadgeRadiusVariant)[keyof typeof BadgeRadiusVariant];
type BadgeSize = (typeof BadgeSizeVariant)[keyof typeof BadgeSizeVariant];
type BadgeVariant = (typeof BadgeSchemeVariant)[keyof typeof BadgeSchemeVariant];
export { BadgeRadiusVariant, BadgeSizeVariant, BadgeSchemeVariant, BadgeRadius, BadgeSize, BadgeVariant };
