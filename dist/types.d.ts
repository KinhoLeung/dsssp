import { CSSProperties } from 'react';
import { directions } from './components/FrequencyResponseGraph/GraphGradient';
export type GraphGradientDirection = keyof typeof directions;
export declare const filterTypes: {
    BYPASS: number;
    PEAK: number;
    HIGHSHELF1: number;
    HIGHSHELF2: number;
    LOWSHELF1: number;
    LOWSHELF2: number;
    HIGHPASS1: number;
    HIGHPASS2: number;
    LOWPASS1: number;
    LOWPASS2: number;
    BANDPASS: number;
    NOTCH: number;
    GAIN: number;
};
export type FilterType = keyof typeof filterTypes;
export declare const filterTypeKeys: FilterType[];
export type Magnitude = {
    magnitude: number;
    frequency: number;
};
export type GraphPoint = {
    x: number;
    y: number;
};
export type BiQuadCoefficients = {
    A0: number;
    A1: number;
    A2: number;
    B1: number;
    B2: number;
};
export type LogScaleFunction = {
    x: (value: number) => number;
    ticks: (count: number) => number[];
};
export type GraphFilter = {
    type: FilterType;
    freq: number;
    gain: number;
    q: number;
};
export type DrcSettings = {
    /**
     * Threshold in dB where compression begins.
     */
    threshold: number;
    /**
     * Compression ratio. Values > 1 compress, values < 1 expand.
     */
    ratio: number;
    /**
     * Soft-knee width in dB.
     */
    knee?: number;
    /**
     * Makeup gain in dB.
     */
    makeup?: number;
    /**
     * Attack time in milliseconds.
     */
    attack?: number;
    /**
     * Release time in milliseconds.
     */
    release?: number;
};
export type GraphScale = {
    minFreq: number;
    maxFreq: number;
    /**
     * Optional frequency range used only for display/logarithmic scaling.
     * If not provided, `minFreq`/`maxFreq` are used.
     * Can be wider than the actual filter range to provide visual padding.
     */
    displayMinFreq?: number;
    displayMaxFreq?: number;
    sampleRate: number;
    minGain: number;
    maxGain: number;
    /**
     * Minimum and maximum Q values allowed when adjusting filters.
     * Used by interactive controls (e.g., FilterPoint wheel).
     */
    minQ?: number;
    maxQ?: number;
    /**
     * Optional gain range used only for display/vertical scaling.
     * If not provided, `minGain`/`maxGain` are used.
     * Can be wider than the actual gain limits to provide visual padding.
     */
    displayMinGain?: number;
    displayMaxGain?: number;
    /**
     * Decimal precision used for gain values (e.g., dragging points, trackers).
     */
    gainPrecision?: number;
    /**
     * Decimal precision used for Q values (e.g., scrolling to adjust Q).
     */
    qPrecision?: number;
    dbSteps: number;
    dbLabels: boolean;
    /**
     * Optional step size (in dB) between gain labels.
     * If not provided, uses `dbSteps`, so labels and grid lines share the same spacing.
     */
    dbLabelSteps?: number;
    /**
     * Controls display of the "dB" unit label
     * in the top-left corner of the gain axis.
     * Defaults to true when omitted.
     */
    showDbUnitLabel?: boolean;
    octaveTicks: number;
    /**
     * Optional explicit frequency grid line positions in Hz.
     * When provided, overrides auto-generated ticks from `octaveTicks`.
     */
    frequencyTicks?: number[];
    majorTicks: number[];
    octaveLabels: number[];
};
export type GraphThemeFilterColors = {
    point?: CSSProperties['color'];
    drag?: CSSProperties['color'];
    active?: CSSProperties['color'];
    background?: CSSProperties['color'];
    dragBackground?: CSSProperties['color'];
    activeBackground?: CSSProperties['color'];
    gradient?: CSSProperties['color'];
    curve?: CSSProperties['color'];
};
export type GraphTheme = {
    background: {
        grid: {
            dotted: boolean;
            lineColor: CSSProperties['color'];
            lineWidth: {
                minor: number;
                major: number;
                center: number;
                border: number;
            };
        };
        padding: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        gradient: {
            start: CSSProperties['color'];
            stop: CSSProperties['color'];
            direction: GraphGradientDirection;
        };
        label: {
            fontSize: number;
            fontFamily: string;
            color: CSSProperties['color'] | 'inherit';
        };
        tracker: {
            lineWidth: number;
            lineColor: CSSProperties['color'];
            labelColor: CSSProperties['color'];
            backgroundColor: CSSProperties['color'];
        };
    };
    curve: {
        width: number;
        color: CSSProperties['color'];
        opacity: CSSProperties['opacity'];
    };
    filters: {
        curve: {
            width: {
                normal: number;
                active: number;
            };
            opacity: {
                normal: CSSProperties['opacity'];
                active: CSSProperties['opacity'];
            };
        };
        point: {
            radius: number;
            lineWidth: number;
            backgroundOpacity: {
                drag: CSSProperties['opacity'];
                active: CSSProperties['opacity'];
                normal: CSSProperties['opacity'];
            };
            label: {
                fontSize: number;
                fontFamily: string;
                color: CSSProperties['color'] | 'inherit';
            };
        };
        zeroPoint: {
            color: CSSProperties['color'];
            background: CSSProperties['color'];
        };
        fill: boolean;
        gradientOpacity: CSSProperties['opacity'];
        defaultColor: CSSProperties['color'];
        colors: GraphThemeFilterColors[];
    };
};
//# sourceMappingURL=types.d.ts.map