declare const AppearanceAnimationTypes: {
    readonly FADE: "fade";
};
type AppearanceAnimationType = (typeof AppearanceAnimationTypes)[keyof typeof AppearanceAnimationTypes];
declare const AppearanceAnimations: import("@angular/animations").AnimationTriggerMetadata;
export { AppearanceAnimationTypes, AppearanceAnimationType, AppearanceAnimations };
