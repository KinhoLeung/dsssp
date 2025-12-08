import { DefaultCurveProps } from '../types';
import { Magnitude } from '../../types';
export type FrequencyResponseCurveProps = DefaultCurveProps & {
    /**
     * Array of magnitude values defining the curve shape
     */
    magnitudes: Magnitude[];
};
/**
 * Renders a frequency response curve from an array of magnitude values.
 * This is the basic curve component used internally by `CompositeCurve` and `FilterCurve`.
 * Can also be used directly to render custom frequency response curves.
 *
 * Uses `theme.curve` values as defaults for styling, when color/opacity/width are not specified.
 * Supports optional gradient fills and dotted line styles.
 */
export declare const FrequencyResponseCurve: ({ magnitudes, dotted, color, opacity, lineWidth, gradientId, className, style, animate, easing, duration }: FrequencyResponseCurveProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FrequencyResponseCurve.d.ts.map