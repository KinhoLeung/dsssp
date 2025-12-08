import { GraphFilter } from '../../types';
import { DefaultCurveProps } from '../types';
type CompositeCurveProps = DefaultCurveProps & {
    /**
     * Array of filters to combine into a single frequency response curve
     */
    filters: GraphFilter[];
    /**
     * Adjusts the resolution of the curve by reducing the number of points based on the graph's width.
     * Lower values = more points = smoother curve but slower performance.
     * Recommended to increase this value when rendering more than 10 filters.
     * @default 2
     */
    resolutionFactor?: number;
};
/**
 * Renders a composite frequency response curve by combining multiple filter responses.
 * Uses magnitude caching to optimize performance when filters change.
 *
 * Supports custom styling through color, opacity and line width props.
 * For better performance with many filters, adjust resolutionFactor.
 */
export declare const CompositeCurve: ({ filters, resolutionFactor, color, dotted, opacity, lineWidth, gradientId, style, easing, animate, duration, className }: CompositeCurveProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=CompositeCurve.d.ts.map