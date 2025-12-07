import { type CSSProperties } from 'react'

import { type directions } from './components/FrequencyResponseGraph/GraphGradient'

export type GraphGradientDirection = keyof typeof directions

export const filterTypes = {
  BYPASS: 0x00,
  PEAK: 0x06,
  HIGHSHELF1: 0x01,
  HIGHSHELF2: 0x02,
  LOWSHELF1: 0x03,
  LOWSHELF2: 0x04,
  HIGHPASS1: 0x07,
  HIGHPASS2: 0x08,
  LOWPASS1: 0x09,
  LOWPASS2: 0x0a,
  BANDPASS: 0x0b,
  NOTCH: 0x05,
  GAIN: 0x0c
  // ONEPOLE_HP: 0x0d,
  // ONEPOLE_LP: 0x0e
  // COEFFICIENTS: 0x10
}

export type FilterType = keyof typeof filterTypes
export const filterTypeKeys = Object.keys(filterTypes) as FilterType[]

export type Magnitude = {
  magnitude: number
  frequency: number
}

export type GraphPoint = {
  x: number
  y: number
}

export type BiQuadCoefficients = {
  A0: number
  A1: number
  A2: number
  B1: number
  B2: number
}

export type LogScaleFunction = {
  x: (value: number) => number
  ticks: (count: number) => number[]
}

export type GraphFilter = {
  type: FilterType
  freq: number
  gain: number
  q: number
}

export type GraphScale = {
  minFreq: number
  maxFreq: number
  /**
   * Optional frequency range used only for display/logarithmic scaling.
   * If not provided, `minFreq`/`maxFreq` are used.
   * Can be wider than the actual filter range to provide visual padding.
   */
  displayMinFreq?: number
  displayMaxFreq?: number
  sampleRate: number
  minGain: number
  maxGain: number
  /**
   * Minimum and maximum Q values allowed when adjusting filters.
   * Used by interactive controls (e.g., FilterPoint wheel).
   */
  minQ?: number
  maxQ?: number
  /**
   * Optional gain range used only for display/vertical scaling.
   * If not provided, `minGain`/`maxGain` are used.
   * Can be wider than the actual gain limits to provide visual padding.
   */
  displayMinGain?: number
  displayMaxGain?: number
  /**
   * Decimal precision used for gain values (e.g., dragging points, trackers).
   */
  gainPrecision?: number
  /**
   * Decimal precision used for Q values (e.g., scrolling to adjust Q).
   */
  qPrecision?: number
  dbSteps: number
  dbLabels: boolean
  /**
   * Optional step size (in dB) between gain labels.
   * If not provided, uses `dbSteps`, so labels and grid lines share the same spacing.
   */
  dbLabelSteps?: number
  /**
   * Controls display of the "dB" unit label
   * in the top-left corner of the gain axis.
   * Defaults to true when omitted.
   */
  showDbUnitLabel?: boolean
  octaveTicks: number
  /**
   * Optional explicit frequency grid line positions in Hz.
   * When provided, overrides auto-generated ticks from `octaveTicks`.
   */
  frequencyTicks?: number[]
  majorTicks: number[]
  octaveLabels: number[]
}

export type GraphThemeFilterColors = {
  // point colors for each state
  point?: CSSProperties['color']
  drag?: CSSProperties['color']
  active?: CSSProperties['color']
  // background colors for each state
  background?: CSSProperties['color']
  dragBackground?: CSSProperties['color']
  activeBackground?: CSSProperties['color']
  // gradient stop color
  // gradient's start color is always transparent, unless `fill` prop is set to true
  gradient?: CSSProperties['color']
  // curve color
  curve?: CSSProperties['color']
}

export type GraphTheme = {
  background: {
    grid: {
      dotted: boolean
      lineColor: CSSProperties['color']
      lineWidth: {
        minor: number
        major: number
        center: number
        border: number
      }
    }
    padding: {
      top: number
      right: number
      bottom: number
      left: number
    }
    gradient: {
      start: CSSProperties['color']
      stop: CSSProperties['color']
      direction: GraphGradientDirection
    }

    label: {
      fontSize: number
      fontFamily: string
      color: CSSProperties['color'] | 'inherit'
    }
    tracker: {
      lineWidth: number
      lineColor: CSSProperties['color']
      labelColor: CSSProperties['color']
      backgroundColor: CSSProperties['color']
    }
  }

  curve: {
    width: number
    color: CSSProperties['color']
    opacity: CSSProperties['opacity']
  }

  filters: {
    curve: {
      width: {
        normal: number
        active: number
      }

      opacity: {
        normal: CSSProperties['opacity']
        active: CSSProperties['opacity']
      }
    }

    point: {
      radius: number
      lineWidth: number
      backgroundOpacity: {
        drag: CSSProperties['opacity']
        active: CSSProperties['opacity']
        normal: CSSProperties['opacity']
      }
      label: {
        fontSize: number
        fontFamily: string
        color: CSSProperties['color'] | 'inherit'
      }
    }

    zeroPoint: {
      color: CSSProperties['color']
      background: CSSProperties['color']
    }

    fill: boolean
    gradientOpacity: CSSProperties['opacity']

    defaultColor: CSSProperties['color']
    colors: GraphThemeFilterColors[]
  }
}
