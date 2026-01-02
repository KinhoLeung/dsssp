import type React from 'react'
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type CSSProperties
} from 'react'
import merge from 'deepmerge'

import { defaultScale, defaultTheme } from '../../defaults'
import { getLogScaleFn } from '../../math'
import { type GraphScale, type GraphTheme } from '../../types'

import { GraphFrequencyGrid } from './GraphFrequencyGrid'
import { GraphGainGrid } from './GraphGainGrid'
import { GraphGradient } from './GraphGradient'
import { GraphProvider } from './GraphProvider'

// Recursive type DeepPartial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Helper type Exact to ensure the absence of additional keys
type Exact<P, I extends P> = P & Record<Exclude<keyof I, keyof P>, never>

export type GraphThemeOverride = Exact<
  DeepPartial<GraphTheme>,
  DeepPartial<GraphTheme>
>

export type GraphScaleOverride = Partial<GraphScale>

export type FrequencyResponseGraphProps = {
  /**
   * Width of the SVG element in pixels
   */
  width: number
  /**
   * Height of the SVG element in pixels
   */
  height: number
  /**
   * Scale configuration to override default frequency and gain ranges
   * @default defaultScale
   */
  scale?: GraphScaleOverride
  /**
   * Theme override for colors and styles
   * @default defaultTheme
   */
  theme?: GraphThemeOverride
  /**
   * Child components to render inside the graph
   */
  children?: React.ReactNode
  /**
   * Additional CSS classes to apply to the graph container
   */
  className?: string
  /**
   * Additional inline styles to apply to the graph container
   */
  style?: CSSProperties
}

/**
 * This component renders a frequency response graph with customizable dimensions, scaling and theming.
 * It provides the base SVG container and context for rendering filter curves, points and other graph elements.
 *
 * Uses deep merge to combine default theme/scale with provided overrides. Arrays are completely replaced rather than merged.
 */
export const FrequencyResponseGraph = forwardRef<
  SVGSVGElement,
  FrequencyResponseGraphProps
>((props, forwardedRef): React.ReactElement => {
  const ref = useRef<SVGSVGElement>(null)
  useImperativeHandle(forwardedRef, () => ref.current!)

  const {
    width,
    height,
    scale = {},
    theme = {},
    style = {},
    className = '',
    children
  } = props
  const mergedTheme: GraphTheme = merge(defaultTheme, theme as GraphTheme)
  const mergedScale: GraphScale = merge(defaultScale, scale, {
    arrayMerge: (_, source) => source // overwrite arrays
  })
  const {
    background: { padding }
  } = mergedTheme

  const { minFreq, maxFreq, displayMinFreq, displayMaxFreq } = mergedScale

  const logMinFreq =
    displayMinFreq && displayMinFreq > 0 ? displayMinFreq : minFreq
  const logMaxFreq =
    displayMaxFreq && displayMaxFreq > logMinFreq ? displayMaxFreq : maxFreq

  const graphWidth = Math.max(width - padding.left - padding.right, 0)
  const graphHeight = Math.max(height - padding.top - padding.bottom, 0)

  const logScale = getLogScaleFn(logMinFreq, logMaxFreq, graphWidth)

  FrequencyResponseGraph.displayName = 'FrequencyResponseGraph'

  const outerWidth = width
  const outerHeight = height
  const graphTransform = `translate(${padding.left}, ${padding.top})`

  const graphId = `frequency-response-graph-${String(Math.random()).slice(2, 9)}`
  const clipPathId = `${graphId}-clip`
  const resetStyles = `
  #${graphId} * {
    pointer-events: none;
  }`

  return (
    <svg
      ref={ref}
      id={graphId}
      className={className}
      viewBox={`0 0 ${outerWidth} ${outerHeight}`}
      style={{
        width: outerWidth,
        height: outerHeight,
        position: 'relative',
        verticalAlign: 'middle',
        userSelect: 'none',
        ...style
      }}
    >
      <defs>
        <style>{resetStyles}</style>
        <clipPath id={clipPathId}>
          <rect
            x="0"
            y="0"
            width={graphWidth}
            height={graphHeight}
          />
        </clipPath>
      </defs>
      <GraphProvider
        svgRef={ref}
        width={graphWidth}
        height={graphHeight}
        outerWidth={outerWidth}
        outerHeight={outerHeight}
        padding={padding}
        theme={mergedTheme}
        scale={mergedScale}
        logScale={logScale}
        clipPathId={clipPathId}
      >
        <g transform={graphTransform}>
          <GraphGradient />
          <GraphGainGrid />
          <GraphFrequencyGrid />
          {children}
        </g>
      </GraphProvider>
    </svg>
  )
})
