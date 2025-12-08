import { CSSProperties } from 'react';
import { FilterType } from './types';
export declare const getPointerPosition: (e: MouseEvent | TouchEvent) => {
    x: number;
    y: number;
};
export declare const getZeroFreq: (type: FilterType) => boolean;
export declare const getZeroGain: (type: FilterType) => boolean;
export declare const getZeroQ: (type: FilterType) => boolean;
export declare const getIconStyles: (type: FilterType | undefined | null, gain?: number) => CSSProperties;
export declare const getIconSymbol: (type: FilterType) => "&#xE908;" | "&#xE903;" | "&#xE905;" | "&#xE906;" | "&#xE904;" | "&#xE900;" | "&#xE907;" | "&#xE902;" | "&#xE901;";
//# sourceMappingURL=utils.d.ts.map