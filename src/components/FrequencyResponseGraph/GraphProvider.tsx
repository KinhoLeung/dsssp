'use client'

import type React from 'react'
import { createContext, useMemo } from 'react'

import {
  type GraphScale,
  type GraphTheme,
  type LogScaleFunction
} from '../../types'

type GraphContextProps = {
  width: number
  height: number
  outerWidth: number
  outerHeight: number
  padding: GraphTheme['background']['padding']
  theme: GraphTheme
  scale: GraphScale
  logScale: LogScaleFunction
  svgRef: React.RefObject<SVGSVGElement | null>
  clipPathId: string
}

export const GraphContext = createContext<GraphContextProps | undefined>(
  undefined
)

export const GraphProvider = ({
  children,
  svgRef,
  scale,
  logScale,
  height,
  width,
  outerHeight,
  outerWidth,
  theme,
  padding,
  clipPathId
}: {
  children: React.ReactNode
  svgRef: React.RefObject<SVGSVGElement | null>
  theme: GraphTheme
  scale: GraphScale
  height: number
  width: number
  outerHeight: number
  outerWidth: number
  padding: GraphTheme['background']['padding']
  logScale: LogScaleFunction
  clipPathId: string
}) => {
  // Memoize theme and scale separately to catch actual value changes
  const memoizedTheme = useMemo(() => theme, [JSON.stringify(theme)])

  const memoizedScale = useMemo(() => scale, [JSON.stringify(scale)])

  const contextValue = useMemo(
    () => ({
      svgRef,
      theme: memoizedTheme,
      scale: memoizedScale,
      logScale,
      height,
      width,
      outerHeight,
      outerWidth,
      padding,
      clipPathId
    }),
    [
      svgRef,
      memoizedTheme,
      memoizedScale,
      logScale,
      height,
      width,
      outerHeight,
      outerWidth,
      padding,
      clipPathId
    ]
  )

  return (
    <GraphContext.Provider value={contextValue}>
      {children}
    </GraphContext.Provider>
  )
}
