import { CSSProperties } from 'react';
import { GraphFilter } from '../../types';
export type FilterGradientProps = {
    /**
     * Gradient Id. It is required to connect the gradient to the filter curve.
     */
    id: string;
    /**
     * Filter to render. Leave it empty to assign the gradient to composite curves.
     */
    filter?: GraphFilter;
    /**
     * Index of the color in the theme colors array to use if no `color` prop is provided
     */
    index?: number;
    /**
     * Stop color of the gradient.
     *
     * (Start color is always transparent.)
     * @default theme.filters.colors[index].gradient || theme.filters.defaultColor || '#00FF00'
     */
    color?: string;
    /**
     * Stop opacity of the gradient.
     *
     * (Start opacity is always 0, unless `fill` flag was used.)
     * @default theme.filters.gradientOpacity || 0.7
     */
    opacity?: number;
    /**
     * Use static fill color for the gradient
     * @default theme.filters.staticGradient || false
     */
    fill?: boolean;
    /**
     * Additional CSS classes to apply to the filter gradient
     */
    className?: string;
    /**
     * Additional inline styles to apply to the filter gradient
     */
    style?: CSSProperties;
};
/**
 * Creates a linear gradient for filter curve fills.
 * Gradient direction automatically adjusts based on filter gain.
 * Used in conjunction with FilterCurve component.
 */
export declare const FilterGradient: ({ id, filter, index, opacity, color, fill, className, style }: FilterGradientProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilterGradient.d.ts.map