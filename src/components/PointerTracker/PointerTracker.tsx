import { useEffect, useRef, useState, type CSSProperties } from 'react'

import {
  calcFrequency,
  calcMagnitude,
  fastFloor,
  getCenterLine,
  limitRange,
  scaleMagnitude
} from '../../math'
import { type GraphFilter } from '../../types'
import { getPointerPosition } from '../../utils'
import { useGraph } from '../..'

export type PointerTrackerProps = {
  /**
   * Filter point to track instead of the current pointer position.
   * When provided, the tracker follows this EQ point and pointer listeners are disabled.
   */
  filter?: GraphFilter | null
  /**
   * Width of the crosshair guide lines
   * @default theme.background.tracker.lineWidth
   */
  lineWidth?: number
  /**
   * Color of the crosshair guide lines
   * @default theme.background.tracker.lineColor
   */
  lineColor?: CSSProperties['color']
  /**
   * Color of the frequency and gain labels
   * @default theme.background.tracker.labelColor
   */
  labelColor?: CSSProperties['color']
  /**
   * Background color of label containers
   * @default theme.background.tracker.backgroundColor
   */
  backgroundColor?: CSSProperties['color']
  /**
   * Number of decimal places for gain value display
   * @default scale.gainPrecision || 1
   */
  gainPrecision?: number
}

/**
 * Displays frequency and gain values at the current pointer position or a
 * provided filter point. Shows crosshair guides and value labels that follow
 * the selected tracking target.
 **/
export const PointerTracker = (props: PointerTrackerProps) => {
  const {
    filter,
    lineWidth,
    lineColor,
    labelColor,
    backgroundColor,
    gainPrecision
  } = props
  const trackFilter = 'filter' in props
  const {
    svgRef,
    width,
    height,
    padding,
    logScale,
    scale,
    theme: {
      background: {
        tracker,
        label: { fontSize, fontFamily }
      }
    }
  } = useGraph()

  const {
    minGain,
    maxGain,
    displayMinGain,
    displayMaxGain,
    minFreq,
    maxFreq,
    displayMinFreq,
    displayMaxFreq
  } = scale
  const gainMinForDisplay =
    typeof displayMinGain === 'number' ? displayMinGain : minGain
  const gainMaxForDisplay =
    typeof displayMaxGain === 'number' ? displayMaxGain : maxGain
  const gainDigits = gainPrecision ?? scale.gainPrecision ?? 1
  const domainMinFreq =
    displayMinFreq && displayMinFreq > 0 ? displayMinFreq : minFreq
  const domainMaxFreq =
    displayMaxFreq && displayMaxFreq > domainMinFreq ? displayMaxFreq : maxFreq

  const color = labelColor || tracker.labelColor
  const fillColor = backgroundColor || tracker.backgroundColor
  const strokeColor = lineColor || tracker.lineColor
  const strokeWidth = lineWidth || tracker.lineWidth
  const strokeDasharray = '1,2'

  const fontSizePadding = (fontSize || 0) + 3

  const [freqWidth, setFreqWidth] = useState(0)
  const [gainWidth, setGainWidth] = useState(0)
  const [freqLabel, setFreqLabel] = useState(0)
  const [gainLabel, setGainLabel] = useState(0)
  const [trackMouse, setTrackMouse] = useState(false)
  const [mouse, setMouse] = useState({ x: -50, y: -50 })

  const freqLabelRef = useRef<SVGTextElement | null>(null)
  const gainLabelRef = useRef<SVGTextElement | null>(null)

  const getFilterPoint = (targetFilter: GraphFilter) => {
    if (targetFilter.type === 'BYPASS') return null

    const minX = limitRange(logScale.x(minFreq), 0, width)
    const maxX = limitRange(logScale.x(maxFreq), 0, width)
    const x = limitRange(logScale.x(targetFilter.freq), minX, maxX)
    const passFilter =
      targetFilter.type.includes('PASS') || targetFilter.type === 'NOTCH'
    const y = passFilter
      ? getCenterLine(gainMinForDisplay, gainMaxForDisplay, height)
      : scaleMagnitude(
          targetFilter.gain,
          gainMinForDisplay,
          gainMaxForDisplay,
          height
        )
    const gain = passFilter
      ? 0
      : Number(
          calcMagnitude(
            y,
            gainMinForDisplay,
            gainMaxForDisplay,
            height
          ).toFixed(gainDigits)
        )

    return {
      x,
      y: limitRange(y, 0, height),
      freq: fastFloor(targetFilter.freq),
      gain
    }
  }

  const mouseMove = (e: MouseEvent | TouchEvent) => {
    e.preventDefault() // Prevent scrolling on touch
    const { x, y } = getPointerPosition(e)
    const plotX = Math.min(Math.max(x - padding.left, 0), width)
    const plotY = Math.min(Math.max(y - padding.top, 0), height)
    setMouse({ x: plotX, y: plotY })

    const newGain = calcMagnitude(
      plotY,
      gainMinForDisplay,
      gainMaxForDisplay,
      height
    ).toFixed(gainDigits)
    if (newGain !== String(gainLabel)) {
      setGainLabel(Number(newGain))
    }

    const newFreq = fastFloor(
      calcFrequency(plotX, width, domainMinFreq, domainMaxFreq)
    )
    if (newFreq !== freqLabel) {
      setFreqLabel(newFreq)
    }
  }

  useEffect(() => {
    if (!freqLabelRef.current) return
    const w = fastFloor(freqLabelRef.current.getBBox().width)
    if (w !== freqWidth) {
      setFreqWidth(w)
    }
  }, [freqLabel])

  useEffect(() => {
    if (!gainLabelRef.current) return
    const w = fastFloor(gainLabelRef.current.getBBox().width)
    if (w !== gainWidth) {
      setGainWidth(w)
    }
  }, [gainLabel])

  const handleMouseEnter = () => setTrackMouse(true)
  const handleMouseLeave = () => setTrackMouse(false)
  const handleTouchStart = () => setTrackMouse(true)
  const handleTouchEnd = () => setTrackMouse(false)
  const handleTouchCancel = () => setTrackMouse(false)

  useEffect(() => {
    if (trackFilter) return

    const svg = svgRef.current
    if (!svg) return
    svg.addEventListener('mouseenter', handleMouseEnter)
    svg.addEventListener('mouseleave', handleMouseLeave)
    svg.addEventListener('mousemove', mouseMove)
    svg.addEventListener('touchstart', handleTouchStart)
    svg.addEventListener('touchmove', mouseMove)
    svg.addEventListener('touchend', handleTouchEnd)
    svg.addEventListener('touchcancel', handleTouchCancel)

    return () => {
      svg.removeEventListener('mouseenter', handleMouseEnter)
      svg.removeEventListener('mouseleave', handleMouseLeave)
      svg.removeEventListener('mousemove', mouseMove)
      svg.removeEventListener('touchstart', handleTouchStart)
      svg.removeEventListener('touchmove', mouseMove)
      svg.removeEventListener('touchend', handleTouchEnd)
      svg.removeEventListener('touchcancel', handleTouchCancel)
    }
  }, [svgRef.current, trackFilter])

  useEffect(() => {
    if (trackFilter) return

    setTrackMouse(true)
  }, [trackFilter])

  useEffect(() => {
    if (!trackFilter || !filter) return

    const point = getFilterPoint(filter)
    if (!point) return

    setMouse({ x: point.x, y: point.y })
    setFreqLabel(point.freq)
    setGainLabel(point.gain)
  }, [
    filter,
    trackFilter,
    logScale,
    minFreq,
    maxFreq,
    width,
    height,
    gainMinForDisplay,
    gainMaxForDisplay,
    gainDigits
  ])

  const point = trackFilter && filter ? getFilterPoint(filter) : null
  const visible = trackFilter ? Boolean(point) : trackMouse
  const pointer = point || {
    x: mouse.x,
    y: mouse.y,
    freq: freqLabel,
    gain: gainLabel
  }

  if (!visible) return null

  const freqRectWidth = freqWidth + 6
  const gainRectWidth = gainWidth + 6
  const freqRectX = limitRange(
    pointer.x - freqWidth / 2 - 3,
    0,
    Math.max(0, width - freqRectWidth)
  )
  const freqRectY = Math.max(0, height - fontSizePadding - 1)
  const gainRectY = limitRange(
    pointer.y - fontSizePadding / 2,
    0,
    Math.max(0, height - fontSizePadding)
  )

  return (
    <g aria-hidden="true">
      <rect
        width={freqRectWidth}
        height={fontSizePadding}
        fill={fillColor}
        stroke={strokeColor}
        x={freqRectX}
        y={freqRectY}
      ></rect>
      <text
        ref={freqLabelRef}
        x={freqRectX + 3}
        y={height - 4}
        fill={color}
        fontSize={fontSize}
        fontFamily={fontFamily}
      >
        {pointer.freq}
      </text>

      <rect
        width={gainRectWidth}
        height={fontSizePadding}
        fill={fillColor}
        stroke={strokeColor}
        x={0.5}
        y={gainRectY}
      ></rect>
      <text
        ref={gainLabelRef}
        x={3}
        y={gainRectY + fontSizePadding - 4}
        fill={color}
        fontSize={fontSize}
        fontFamily={fontFamily}
      >
        {pointer.gain > 0 ? `+${pointer.gain}` : pointer.gain}
      </text>

      <line
        x1={gainWidth + 7}
        x2={width}
        y1={pointer.y}
        y2={pointer.y}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeLinecap="round"
      />

      <line
        x1={pointer.x}
        x2={pointer.x}
        y1={0}
        y2={Math.max(0, height - fontSizePadding - 1)}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeLinecap="round"
      />
    </g>
  )
}
