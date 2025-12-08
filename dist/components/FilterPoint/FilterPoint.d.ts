import { CSSProperties } from 'react';
import { GraphFilter } from '../../types';
export type FilterChangeEvent = GraphFilter & {
    index: number;
    ended?: boolean;
};
export type FilterPointProps = {
    /**
     * Filter parameters object defining type, frequency, gain and Q values
     */
    filter: GraphFilter;
    /**
     * Index in the theme colors array
     * @default -1
     */
    index?: number;
    /**
     * Enable horizontal (frequency) dragging
     * @default true
     */
    dragX?: boolean;
    /**
     * Enable vertical (gain) dragging
     * @default true
     */
    dragY?: boolean;
    /**
     * Enable Q adjustment with mouse wheel
     * @default true
     */
    wheelQ?: boolean;
    /**
     * Minimum Q value allowed when scrolling
     * @default scale.minQ || 0.1
     */
    minQ?: number;
    /**
     * Maximum Q value allowed when scrolling
     * @default scale.maxQ || 25
     */
    maxQ?: number;
    /**
     * Decimal precision for gain when dragging
     * @default scale.gainPrecision || 1
     */
    gainPrecision?: number;
    /**
     * Decimal precision for Q when scrolling
     * @default scale.qPrecision || 1
     */
    qPrecision?: number;
    /**
     * Point radius in pixels
     * @default theme.point.radius
     */
    radius?: number;
    /**
     * Manual active/hover state
     * @default false
     */
    active?: boolean;
    /**
     * Point stroke width
     * @default theme.point.lineWidth
     */
    lineWidth?: number;
    /**
     * Show filter type icon instead of label
     * @default false
     */
    showIcon?: boolean;
    /**
     * Custom label text
     * @default ''
     */
    label?: string;
    /**
     * Label font family
     * @default theme.point.label.fontFamily
     */
    labelFontFamily?: string;
    /**
     * Label font size in pixels
     * @default theme.point.label.fontSize
     */
    labelFontSize?: number;
    /**
     * Label text color
     * @default theme.point.label.color
     */
    labelColor?: CSSProperties['color'];
    /**
     * Point stroke color
     * @default theme.colors[index].point || theme.filters.defaultColor
     */
    color?: CSSProperties['color'];
    /**
     * Point stroke color when gain is zero
     * @default theme.filters.zeroPoint.color
     */
    zeroColor?: CSSProperties['color'];
    /**
     * Point stroke color while dragging
     * @default theme.colors[index].drag || color
     */
    dragColor?: CSSProperties['color'];
    /**
     * Point stroke color when active/hovered
     * @default theme.colors[index].active || color
     */
    activeColor?: CSSProperties['color'];
    /**
     * Point fill color
     * @default theme.colors[index].background || color
     */
    background?: CSSProperties['color'];
    /**
     * Point fill color when gain is zero
     * @default theme.filters.zeroPoint.background
     */
    zeroBackground?: CSSProperties['color'];
    /**
     * Point fill color while dragging
     * @default theme.colors[index].drag || background
     */
    dragBackground?: CSSProperties['color'];
    /**
     * Point fill color when active/hovered
     * @default theme.colors[index].activeBackground || background
     */
    activeBackground?: CSSProperties['color'];
    /**
     * Point fill opacity
     * @default theme.point.backgroundOpacity.normal
     */
    backgroundOpacity?: CSSProperties['opacity'];
    /**
     * Point fill opacity while dragging
     * @default theme.point.backgroundOpacity.drag
     */
    dragBackgroundOpacity?: CSSProperties['opacity'];
    /**
     * Point fill opacity when active/hovered
     * @default theme.point.backgroundOpacity.active
     */
    activeBackgroundOpacity?: CSSProperties['opacity'];
    /**
     * Additional CSS classes to apply to the filter point
     */
    className?: string;
    /**
     * Additional inline styles to apply to the filter point
     */
    style?: CSSProperties;
    /**
     * Called when filter parameters change during drag
     * @param filterEvent Updated filter parameters with index
     */
    onChange?: (filterEvent: FilterChangeEvent) => void;
    /**
     * Called when mouse enters the point
     * @param filterEvent Current filter parameters with index
     */
    onEnter?: (filterEvent: FilterChangeEvent) => void;
    /**
     * Called when mouse leaves the point
     * @param filterEvent Current filter parameters with index
     */
    onLeave?: (filterEvent: FilterChangeEvent) => void;
    /**
     * Called when drag state changes
     * @param dragState True when dragging starts, false when it ends
     */
    onDrag?: (dragState: boolean) => void;
};
/**
 * Interactive control point for filter parameters manipulation.
 * Provides drag-and-drop frequency/gain control and Q-factor adjustment via mouse wheel.
 *
 * Features:
 * - Horizontal/vertical dragging
 * - Mouse wheel Q control
 * - Multiple states (hover, drag, active)
 * - Optional filter type icon or custom label
 *
 * Uses `defaultColor` from the theme as a fallback when filter colors are not specified.
 *
 */
export declare const FilterPoint: ({ filter, index, dragX, dragY, wheelQ, minQ, maxQ, gainPrecision, qPrecision, active, showIcon, label, labelFontSize, labelFontFamily, labelColor, radius, lineWidth, color, zeroColor, dragColor, activeColor, background, zeroBackground, dragBackground, activeBackground, backgroundOpacity, dragBackgroundOpacity, activeBackgroundOpacity, className, style, onChange, onEnter, onLeave, onDrag }: FilterPointProps) => import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=FilterPoint.d.ts.map