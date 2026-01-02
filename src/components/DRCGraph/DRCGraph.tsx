import type React from 'react'
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type CSSProperties
} from 'react'
import merge from 'deepmerge'

import { defaultScale, defaultTheme } from '../../defaults'
import { getLinearScaleFn } from '../../math'
import { type GraphScale, type GraphTheme } from '../../types'
import {
  GraphGainGrid,
  GraphGradient,
  GraphProvider
} from '../FrequencyResponseGraph'
import { GraphInputGrid } from './GraphInputGrid'

// Recursive type DeepPartial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Helper type Exact to ensure the absence of additional keys
type Exact<P, I extends P> = P & Record<Exclude<keyof I, keyof P>, never>

export type DrcGraphThemeOverride = Exact<
  DeepPartial<GraphTheme>,
  DeepPartial<GraphTheme>
>

export type DrcGraphScaleOverride = Partial<GraphScale>

export type DRCGraphProps = {
  /**
   * Width of the SVG element in pixels
   */
  width: number
  /**
   * Height of the SVG element in pixels
   */
  height: number
  /**
   * Scale configuration to override default gain ranges
   * @default defaultScale
   */
  scale?: DrcGraphScaleOverride
  /**
   * Theme override for colors and styles
   * @default defaultTheme
   */
  theme?: DrcGraphThemeOverride
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
 * Renders a dynamic range (input/output) graph for DRC curves.
 * Uses a linear scale on the X axis and the standard dB scale on Y.
 */
export const DRCGraph = forwardRef<SVGSVGElement, DRCGraphProps>(
  (props, forwardedRef): React.ReactElement => {
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

    const { minGain, maxGain, displayMinGain, displayMaxGain } = mergedScale
    const inputMin =
      typeof displayMinGain === 'number' ? displayMinGain : minGain
    const inputMax =
      typeof displayMaxGain === 'number' ? displayMaxGain : maxGain

    const graphWidth = Math.max(width - padding.left - padding.right, 0)
    const graphHeight = Math.max(height - padding.top - padding.bottom, 0)

    const linearScale = getLinearScaleFn(inputMin, inputMax, graphWidth)

    DRCGraph.displayName = 'DRCGraph'

    const outerWidth = width
    const outerHeight = height
    const graphTransform = `translate(${padding.left}, ${padding.top})`

    const graphId = `drc-graph-${String(Math.random()).slice(2, 9)}`
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
          logScale={linearScale}
          clipPathId={clipPathId}
        >
          <g transform={graphTransform}>
            <GraphGradient />
            <GraphGainGrid />
            <GraphInputGrid />
            {children}
          </g>
        </GraphProvider>
      </svg>
    )
  }
)
