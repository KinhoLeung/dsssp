/**
 * SVG Path transition timing functions
 */
export declare const easing: {
    readonly linear: (t: number) => number;
    readonly easeIn: (t: number) => number;
    readonly easeOut: (t: number) => number;
    readonly easeInOut: (t: number) => number;
    readonly elastic: (t: number) => number;
    readonly bounce: (t: number) => number;
};
export type EasingFunction = (typeof easing)[keyof typeof easing];
export type EasingType = keyof typeof easing;
/**
 * Get easing function by name
 */
export declare const getEasing: (type: EasingType) => EasingFunction;
//# sourceMappingURL=easing.d.ts.map