import { default as React } from 'react';
import { GraphScale, GraphTheme, LogScaleFunction } from '../../types';
type GraphContextProps = {
    width: number;
    height: number;
    outerWidth: number;
    outerHeight: number;
    padding: GraphTheme['background']['padding'];
    theme: GraphTheme;
    scale: GraphScale;
    logScale: LogScaleFunction;
    svgRef: React.RefObject<SVGSVGElement | null>;
    clipPathId: string;
};
export declare const GraphContext: React.Context<GraphContextProps | undefined>;
export declare const GraphProvider: ({ children, svgRef, scale, logScale, height, width, outerHeight, outerWidth, theme, padding, clipPathId }: {
    children: React.ReactNode;
    svgRef: React.RefObject<SVGSVGElement | null>;
    theme: GraphTheme;
    scale: GraphScale;
    height: number;
    width: number;
    outerHeight: number;
    outerWidth: number;
    padding: GraphTheme["background"]["padding"];
    logScale: LogScaleFunction;
    clipPathId: string;
}) => React.JSX.Element;
export {};
//# sourceMappingURL=GraphProvider.d.ts.map