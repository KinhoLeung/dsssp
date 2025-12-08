import { default as React, CSSProperties } from 'react';
import { GraphScale, GraphTheme } from '../../types';
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
type Exact<P, I extends P> = P & Record<Exclude<keyof I, keyof P>, never>;
export type GraphThemeOverride = Exact<DeepPartial<GraphTheme>, DeepPartial<GraphTheme>>;
export type GraphScaleOverride = Partial<GraphScale>;
export type FrequencyResponseGraphProps = {
    /**
     * Width of the SVG element in pixels
     */
    width: number;
    /**
     * Height of the SVG element in pixels
     */
    height: number;
    /**
     * Scale configuration to override default frequency and gain ranges
     * @default defaultScale
     */
    scale?: GraphScaleOverride;
    /**
     * Theme override for colors and styles
     * @default defaultTheme
     */
    theme?: GraphThemeOverride;
    /**
     * Child components to render inside the graph
     */
    children?: React.ReactNode;
    /**
     * Additional CSS classes to apply to the graph container
     */
    className?: string;
    /**
     * Additional inline styles to apply to the graph container
     */
    style?: CSSProperties;
};
/**
 * This component renders a frequency response graph with customizable dimensions, scaling and theming.
 * It provides the base SVG container and context for rendering filter curves, points and other graph elements.
 *
 * Uses deep merge to combine default theme/scale with provided overrides. Arrays are completely replaced rather than merged.
 */
export declare const FrequencyResponseGraph: React.ForwardRefExoticComponent<FrequencyResponseGraphProps & React.RefAttributes<SVGSVGElement>>;
export {};
//# sourceMappingURL=FrequencyResponseGraph.d.ts.map