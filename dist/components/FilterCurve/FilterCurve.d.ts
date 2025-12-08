import { CSSProperties } from 'react';
import { BiQuadCoefficients, GraphFilter } from '../../types';
import { DefaultCurveProps } from '../types';
export type ActiveStateProps = {
    /**
     * Active state (trigger it to highlight the curve along with hovered FilterPoint)
     * @default false
     */
    active?: boolean;
    /**
     * Active curve color
     * @default theme.colors[index].active || color || theme.filters.defaultColor || '#00FF00'
     */
    activeColor?: string;
    /**
     * Active curve opacity
     * @default theme.filters.curve.opacity.active || 0.7
     */
    activeOpacity?: CSSProperties['opacity'];
    /**
     * Active curve line width
     * @default theme.filters.curve.width.active || 1.5
     */
    activeLineWidth?: number;
};
export type FilterCurveProps = DefaultCurveProps & ActiveStateProps & {
    /**
     * Filter parameters object defining type, frequency, gain and Q values
     */
    filter: GraphFilter;
    /**
     * Index in the theme colors array. Used for consistent coloring across
     * multiple filters when no explicit color is provided
     * @default -1
     */
    index?: number;
    /**
     * Renders a vertical pin connecting the curve to its corresponding FilterPoint
     * Useful for NOTCH, LOWPASS, and HIGHPASS filter types
     * @default false
     */
    showPin?: boolean;
    /**
     * Show Bypass curve
     * For most use cases showing zero curve is not necessary
     * @default false
     */
    showBypass?: boolean;
    /**
     * @override
     * Curve color
     * @default theme.colors[index].curve || theme.filters.defaultColor || '#00FF00'
     */
    color?: string;
    /**
     * @override
     * Curve opacity
     * @default theme.filters.curve.opacity.normal || 0.5
     */
    opacity?: CSSProperties['opacity'];
    /**
     * @override
     * Curve line width
     * @default theme.filters.curve.width.normal || 1.5
     */
    lineWidth?: number;
    /**
     * Adjusts the resolution of the curve by reducing the number of points based on the graph's width.
     * Lower values = more points = smoother curve but slower performance.
     * @default 2
     */
    resolutionFactor?: number;
    /**
     * Callback invoked when the BiQuad parameters for the specified filter change.
     * Useful for syncing filter parameters with Web Audio API nodes.
     * @param index - The index of the filter whose parameters changed
     * @param vars - The newly calculated BiQuad function parameters for the filter
     */
    onChange?: (index: number, vars: BiQuadCoefficients) => void;
};
/**
 * Renders a frequency response curve for a single filter.
 * Visualizes filter's magnitude response and provides interactive controls
 * when used with FilterPoint component.
 *
 * Features:
 * - BiQuad coefficient calculation
 * - Active state support
 * - Optional vertical pin
 * - Performance optimization
 **/
export declare const FilterCurve: ({ filter, index, resolutionFactor, color, dotted, opacity, lineWidth, gradientId, showPin, showBypass, active, activeColor, activeOpacity, activeLineWidth, style, easing, animate, duration, className, onChange }: FilterCurveProps) => import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=FilterCurve.d.ts.map