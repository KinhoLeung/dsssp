import { CSSProperties } from 'react';
import { FilterType, GraphFilter } from '../../types';
export type FilterIconProps = {
    /**
     * Filter type to display
     * Can be provided directly or via filter prop
     */
    type?: FilterType;
    /**
     * Filter gain value to adjust icon appearance
     * Can be provided directly or via filter prop
     */
    gain?: number;
    /**
     * Filter object containing type and gain
     * Alternative to providing type and gain separately
     */
    filter?: GraphFilter;
    /**
     * Icon size in pixels
     * @default 24
     */
    size?: number;
    /**
     * Icon color
     * @default '#FFFFFF'
     */
    color?: string;
    /**
     * Additional CSS classes to apply to the filter icon
     */
    className?: string;
    /**
     * Additional inline styles to apply to the filter icon
     */
    style?: CSSProperties;
};
export type FilterTypedIconProps = Omit<FilterIconProps, 'type'>;
/**
 * Renders filter type icons using custom font symbols.
 * Icons automatically adjust their appearance based on filter gain.
 */
export declare const FilterIcon: ({ color, size, gain, type, filter, className, ...style }: FilterIconProps) => import("react").JSX.Element;
export declare const BypassIcon: (props: FilterTypedIconProps) => import("react").JSX.Element;
export declare const LowPassIcon: (props: FilterTypedIconProps) => import("react").JSX.Element;
export declare const HighPassIcon: (props: FilterTypedIconProps) => import("react").JSX.Element;
export declare const LowShelfIcon: (props: FilterTypedIconProps) => import("react").JSX.Element;
export declare const HighShelfIcon: (props: FilterTypedIconProps) => import("react").JSX.Element;
export declare const BandPassIcon: (props: FilterTypedIconProps) => import("react").JSX.Element;
export declare const NotchIcon: (props: FilterTypedIconProps) => import("react").JSX.Element;
export declare const PeakIcon: (props: FilterTypedIconProps) => import("react").JSX.Element;
export declare const GainIcon: (props: FilterTypedIconProps) => import("react").JSX.Element;
//# sourceMappingURL=FilterIcon.d.ts.map