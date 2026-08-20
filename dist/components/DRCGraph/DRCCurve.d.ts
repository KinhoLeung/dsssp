import { DrcSettings } from '../../types';
import { DefaultCurveProps } from '../types';
export type DRCCurveProps = DefaultCurveProps & DrcSettings & {
    /**
     * Optional input range for the curve on the X axis.
     * Defaults to the graph's display gain range.
     */
    inputMin?: number;
    inputMax?: number;
    /**
     * Adjusts the resolution of the curve by reducing the number of points based on the graph's width.
     * Lower values = more points = smoother curve but slower performance.
     * @default 2
     */
    resolutionFactor?: number;
};
/**
 * Renders a dynamic range compression/expansion curve from threshold/ratio settings.
 */
export declare const DRCCurve: ({ threshold, ratio, knee, makeup, attack, release, inputMin, inputMax, resolutionFactor, ...curveProps }: DRCCurveProps) => import("react").JSX.Element;
//# sourceMappingURL=DRCCurve.d.ts.map