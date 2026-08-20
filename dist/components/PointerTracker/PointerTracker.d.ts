import { CSSProperties } from 'react';
export type PointerTrackerProps = {
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
 * Displays frequency and gain values at the current pointer position.
 * Shows crosshair guides and value labels that follow the pointer.
 **/
export declare const PointerTracker: ({ lineWidth, lineColor, labelColor, backgroundColor, gainPrecision }: PointerTrackerProps) => import("react").JSX.Element | null;
//# sourceMappingURL=PointerTracker.d.ts.map