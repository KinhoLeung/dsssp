import { CSSProperties } from 'react';
import { GraphFilter } from '../../types';
export type PointerTrackerProps = {
    /**
     * Filter point to track instead of the current pointer position.
     * When provided, the tracker follows this EQ point and pointer listeners are disabled.
     */
    filter?: GraphFilter | null;
    /**
     * Width of the crosshair guide lines
     * @default theme.background.tracker.lineWidth
     */
    lineWidth?: number;
    /**
     * Color of the crosshair guide lines
     * @default theme.background.tracker.lineColor
     */
    lineColor?: CSSProperties['color'];
    /**
     * Color of the frequency and gain labels
     * @default theme.background.tracker.labelColor
     */
    labelColor?: CSSProperties['color'];
    /**
     * Background color of label containers
     * @default theme.background.tracker.backgroundColor
     */
    backgroundColor?: CSSProperties['color'];
    /**
     * Number of decimal places for gain value display
     * @default scale.gainPrecision || 1
     */
    gainPrecision?: number;
};
/**
 * Displays frequency and gain values at the current pointer position or a
 * provided filter point. Shows crosshair guides and value labels that follow
 * the selected tracking target.
 **/
export declare const PointerTracker: (props: PointerTrackerProps) => import("react").JSX.Element | null;
//# sourceMappingURL=PointerTracker.d.ts.map