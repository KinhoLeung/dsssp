import { CSSProperties } from 'react';
import { GraphFilter, BiQuadCoefficients } from '../../types';
export type FilterPinProps = {
    filter: GraphFilter;
    vars: BiQuadCoefficients;
    lineWidth?: number;
    opacity?: CSSProperties['opacity'];
    color?: CSSProperties['color'];
};
export declare const FilterPin: ({ filter, vars, opacity, lineWidth, color }: FilterPinProps) => import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=FilterPin.d.ts.map