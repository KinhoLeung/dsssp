import { default as React, CSSProperties } from 'react';
import { GraphScale, GraphTheme } from '../../types';
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
type Exact<P, I extends P> = P & Record<Exclude<keyof I, keyof P>, never>;
export type DrcGraphThemeOverride = Exact<DeepPartial<GraphTheme>, DeepPartial<GraphTheme>>;
export type DrcGraphScaleOverride = Partial<GraphScale>;
export type DRCGraphProps = {
    /**
     * Width of the SVG element in pixels
     */
    width: number;
    /**
     * Height of the SVG element in pixels
     */
    height: number;
    /**
     * Scale configuration to override default gain ranges
     * @default defaultScale
     */
    scale?: DrcGraphScaleOverride;
    /**
     * Theme override for colors and styles
     * @default defaultTheme
     */
    theme?: DrcGraphThemeOverride;
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
    /**
     * Accessible label announced for the graph by screen readers.
     * @default 'Dynamic range compression graph'
     */
    ariaLabel?: string;
};
/**
 * Renders a dynamic range (input/output) graph for DRC curves.
 * Uses a linear scale on the X axis and the standard dB scale on Y.
 */
export declare const DRCGraph: React.ForwardRefExoticComponent<DRCGraphProps & React.RefAttributes<SVGSVGElement>>;
export {};
//# sourceMappingURL=DRCGraph.d.ts.map