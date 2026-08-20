/* eslint-disable no-param-reassign */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent
} from 'react'

import {
  calcFrequency,
  calcMagnitude,
  getCenterLine,
  limitRange,
  scaleMagnitude,
  stripTail
} from '../../math'
import { type GraphFilter } from '../../types'
import {
  getIconStyles,
  getIconSymbol,
  getZeroGain,
  getZeroQ
} from '../../utils'
import { useGraph } from '../..'

import '../../icons/font.css'

export type FilterPointEvent = GraphFilter & {
  index: number
}

export type FilterChangeEvent = FilterPointEvent & {
  ended?: boolean
}

export type FilterPointProps = {
  /**
   * Filter parameters object defining type, frequency, gain and Q values
   */
  filter: GraphFilter
  /**
   * Index in the theme colors array
   * @default -1
   */
  index?: number
  /**
   * Enable horizontal (frequency) dragging
   * @default true
   */
  dragX?: boolean
  /**
   * Enable vertical (gain) dragging
   * @default true
   */
  dragY?: boolean
  /**
   * Enable Q adjustment with mouse wheel
   * @default true
   */
  wheelQ?: boolean
  /**
   * Minimum Q value allowed when scrolling
   * @default scale.minQ || 0.1
   */
  minQ?: number
  /**
   * Maximum Q value allowed when scrolling
   * @default scale.maxQ || 25
   */
  maxQ?: number
  /**
   * Decimal precision for gain when dragging
   * @default scale.gainPrecision || 1
   */
  gainPrecision?: number
  /**
   * Decimal precision for Q when scrolling
   * @default scale.qPrecision || 1
   */
  qPrecision?: number
  /**
   * Point radius in pixels
   * @default theme.point.radius
   */
  radius?: number
  /**
   * Manual active/hover state
   * @default false
   */
  active?: boolean
  /**
   * Point stroke width
   * @default theme.point.lineWidth
   */
  lineWidth?: number
  /**
   * Show filter type icon instead of label
   * @default false
   */
  showIcon?: boolean
  /**
   * Custom label text
   * @default ''
   */
  label?: string
  /**
   * Label font family
   * @default theme.point.label.fontFamily
   */
  labelFontFamily?: string
  /**
   * Label font size in pixels
   * @default theme.point.label.fontSize
   */
  labelFontSize?: number
  /**
   * Label text color
   * @default theme.point.label.color
   */
  labelColor?: CSSProperties['color']
  /**
   * Point stroke color
   * @default theme.colors[index].point || theme.filters.defaultColor
   */
  color?: CSSProperties['color']
  /**
   * Point stroke color when gain is zero
   * @default theme.filters.zeroPoint.color
   */
  zeroColor?: CSSProperties['color']
  /**
   * Point stroke color while dragging
   * @default theme.colors[index].drag || color
   */
  dragColor?: CSSProperties['color']
  /**
   * Point stroke color when active/hovered
   * @default theme.colors[index].active || color
   */
  activeColor?: CSSProperties['color']
  /**
   * Point fill color
   * @default theme.colors[index].background || color
   */
  background?: CSSProperties['color']
  /**
   * Point fill color when gain is zero
   * @default theme.filters.zeroPoint.background
   */
  zeroBackground?: CSSProperties['color']
  /**
   * Point fill color while dragging
   * @default theme.colors[index].drag || background
   */
  dragBackground?: CSSProperties['color']
  /**
   * Point fill color when active/hovered
   * @default theme.colors[index].activeBackground || background
   */
  activeBackground?: CSSProperties['color']
  /**
   * Point fill opacity
   * @default theme.point.backgroundOpacity.normal
   */
  backgroundOpacity?: CSSProperties['opacity']
  /**
   * Point fill opacity while dragging
   * @default theme.point.backgroundOpacity.drag
   */
  dragBackgroundOpacity?: CSSProperties['opacity']
  /**
   * Point fill opacity when active/hovered
   * @default theme.point.backgroundOpacity.active
   */
  activeBackgroundOpacity?: CSSProperties['opacity']

  /**
   * Additional CSS classes to apply to the filter point
   */
  className?: string
  /**
   * Additional inline styles to apply to the filter point
   */
  style?: CSSProperties

  // Event Handlers
  /**
   * Called when filter parameters change during drag
   * @param filterEvent Updated filter parameters with index
   */
  onChange?: (filterEvent: FilterChangeEvent) => void
  /**
   * Called when mouse enters the point
   * @param filterEvent Current filter parameters with index
   */
  onEnter?: (filterEvent: FilterPointEvent) => void
  /**
   * Called when mouse leaves the point
   * @param filterEvent Current filter parameters with index
   */
  onLeave?: (filterEvent: FilterPointEvent) => void
  /**
   * Called when the point is double-clicked
   * @param filterEvent Current filter parameters with index
   */
  onDoubleClick?: (filterEvent: FilterPointEvent) => void
  /**
   * Called when drag state changes
   * @param dragState True when dragging starts, false when it ends
   */
  onDrag?: (dragState: boolean) => void
}

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
export const FilterPoint = ({
  filter,
  index = -1,
  dragX = true,
  dragY = true,
  wheelQ = true,
  minQ,
  maxQ,
  gainPrecision,
  qPrecision,
  active = false, // manual `hovered` state
  showIcon = false,
  label = '',
  labelFontSize,
  labelFontFamily,
  labelColor,
  radius,
  lineWidth,

  color,
  zeroColor,
  dragColor,
  activeColor,

  background,
  zeroBackground,
  dragBackground,
  activeBackground,

  backgroundOpacity,
  dragBackgroundOpacity,
  activeBackgroundOpacity,
  className,
  style,

  onChange,
  onEnter,
  onLeave,
  onDoubleClick,
  onDrag
}: FilterPointProps) => {
  const {
    svgRef,
    scale,
    logScale,
    height,
    width,
    padding,
    theme: {
      filters: { zeroPoint, colors, defaultColor, point }
    }
  } = useGraph()
  const {
    minGain,
    maxGain,
    gainPrecision: scaleGainPrecision,
    minQ: scaleMinQ,
    maxQ: scaleMaxQ,
    qPrecision: scaleQPrecision,
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
  const domainMinFreq =
    displayMinFreq && displayMinFreq > 0 ? displayMinFreq : minFreq
  const domainMaxFreq =
    displayMaxFreq && displayMaxFreq > domainMinFreq ? displayMaxFreq : maxFreq
  const minX = Math.max(0, Math.min(logScale.x(minFreq), width))
  const maxX = Math.max(0, Math.min(logScale.x(maxFreq), width))
  const maxGainY = scaleMagnitude(
    maxGain,
    gainMinForDisplay,
    gainMaxForDisplay,
    height
  )
  const minGainY = scaleMagnitude(
    minGain,
    gainMinForDisplay,
    gainMaxForDisplay,
    height
  )
  const minY = Math.min(maxGainY, minGainY)
  const maxY = Math.max(maxGainY, minGainY)
  const { freq: filterFreq, gain: filterGain, q: filterQ, type } = filter
  const gainDecimals = gainPrecision ?? scaleGainPrecision ?? 1
  const qDecimals = qPrecision ?? scaleQPrecision ?? 1

  const circleRef = useRef<SVGCircleElement | null>(null)
  const labelRef = useRef<SVGTextElement | null>(null)

  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)

  const [zeroGain, passFilter, zeroQ] = useMemo(
    () => [
      getZeroGain(type),
      type.includes('PASS') || type === 'NOTCH',
      getZeroQ(type)
    ],
    [type]
  )

  const x = limitRange(logScale.x(filterFreq), minX, maxX)
  const centerY = getCenterLine(gainMinForDisplay, gainMaxForDisplay, height)
  const y = !passFilter
    ? scaleMagnitude(filterGain, gainMinForDisplay, gainMaxForDisplay, height)
    : centerY

  let offset: { x: number; y: number } = { x: 0, y: 0 }

  let cx: number
  let cy: number
  const moveFreq = useRef(filterFreq)
  const moveGain = useRef(filterGain)
  const qDragStartX = useRef(0)
  const qDragLastX = useRef(0)
  const qDragCurrent = useRef(filterQ)
  const qDragValue = useRef(filterQ)
  const qDragChanged = useRef(false)

  useEffect(() => {
    moveFreq.current = filterFreq
    moveGain.current = filterGain
    qDragCurrent.current = filterQ
    qDragValue.current = filterQ
  }, [filterFreq, filterGain, filterQ])

  const getGraphPointer = (e: MouseEvent | TouchEvent) => {
    const svg = svgRef.current
    const CTM = svg?.getScreenCTM()
    const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0]!.clientY : e.clientY
    if (!CTM) return { x: clientX, y: clientY }

    return {
      x: (clientX - CTM.e) / CTM.a - padding.left,
      y: (clientY - CTM.f) / CTM.d - padding.top
    }
  }

  const qDragMove = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const svg = svgRef.current
    if (!svg) return

    const { x } = getGraphPointer(e)
    const deltaX = x - qDragLastX.current
    qDragLastX.current = x
    const minAllowedQ = Math.max(0.0001, minQ ?? scaleMinQ ?? 0.1)
    const maxAllowedQ = maxQ ?? scaleMaxQ ?? 25
    const deltaQ = ((maxAllowedQ - minAllowedQ) * deltaX) / Math.max(width, 1)
    qDragCurrent.current = limitRange(
      qDragCurrent.current + deltaQ,
      minAllowedQ,
      maxAllowedQ
    )
    const nextQ = stripTail(qDragCurrent.current, qDecimals)

    if (nextQ === qDragValue.current) return

    qDragChanged.current = true
    qDragValue.current = nextQ
    onChange?.({ index, ...filter, q: nextQ })
  }

  const qDragEnd = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const svg = svgRef.current
    if (!svg) return

    svg.removeEventListener('mousemove', qDragMove)
    svg.removeEventListener('mouseup', qDragEnd)
    svg.removeEventListener('mouseleave', qDragEnd)

    if (!qDragChanged.current) return
    onChange?.({ index, ...filter, q: qDragValue.current, ended: true })
  }

  const startQDrag = (e: MouseEvent) => {
    const svg = svgRef.current
    if (!svg) return

    qDragChanged.current = false
    qDragCurrent.current = filterQ
    qDragValue.current = filterQ
    const { x } = getGraphPointer(e)
    qDragStartX.current = x
    qDragLastX.current = x

    svg.addEventListener('mousemove', qDragMove)
    svg.addEventListener('mouseup', qDragEnd)
    svg.addEventListener('mouseleave', qDragEnd)
  }

  const dragMove = (e: MouseEvent | TouchEvent) => {
    e.preventDefault() // Prevent scrolling on touch
    e.stopPropagation()
    if (!circleRef.current) return

    const { x, y } = getGraphPointer(e)

    if (dragX) {
      cx = limitRange(x - offset.x, minX, maxX)
      circleRef.current.setAttributeNS(null, 'cx', String(cx))
      labelRef.current?.setAttributeNS(null, 'x', String(cx))
      moveFreq.current = stripTail(
        limitRange(
          calcFrequency(cx, width, domainMinFreq, domainMaxFreq),
          minFreq,
          maxFreq
        )
      )
    }
    if (dragY) {
      if (zeroGain) {
        cy = centerY
      } else {
        cy = limitRange(y - offset.y, minY, maxY)
      }
      circleRef.current.setAttributeNS(null, 'cy', String(cy))
      labelRef.current?.setAttributeNS(null, 'y', String(cy))
      const gain = calcMagnitude(
        cy,
        gainMinForDisplay,
        gainMaxForDisplay,
        height
      )
      const limitedGain = limitRange(gain, minGain, maxGain)
      moveGain.current =
        limitedGain < 0.05 && limitedGain > -0.05
          ? 0
          : stripTail(limitedGain, gainDecimals)
    }

    onChange?.({
      index,
      ...filter,
      freq: moveFreq.current,
      ...(!passFilter ? { gain: moveGain.current } : {})
    })
  }

  const dragEnd = (e: MouseEvent | TouchEvent) => {
    e.preventDefault() // Prevent scrolling on touch
    e.stopPropagation()
    const svg = svgRef.current
    const circleEl = circleRef.current
    if (!svg || !circleEl) return

    const touchEvent = 'touches' in e

    circleEl.setAttribute(
      'fill-opacity',
      String(
        touchEvent
          ? (backgroundOpacity ?? point.backgroundOpacity.normal)
          : (activeBackgroundOpacity ?? point.backgroundOpacity.active)
      )
    )

    svg.removeEventListener('mousemove', dragMove)
    svg.removeEventListener('mouseup', dragEnd)
    svg.removeEventListener('mouseleave', dragEnd)
    // Remove touch listeners as well
    circleEl.removeEventListener('touchmove', dragMove)
    circleEl.removeEventListener('touchend', dragEnd)
    circleEl.removeEventListener('touchcancel', dragEnd)

    setDragging(false)
    onChange?.({
      index,
      ...filter,
      freq: moveFreq.current,
      gain: moveGain.current,
      ended: true
    })
    onDrag?.(false)
  }

  const dragStart = (e: MouseEvent | TouchEvent) => {
    e.preventDefault() // Prevent scrolling on touch
    e.stopPropagation()
    if ('button' in e && e.button === 2) {
      if (!zeroQ) startQDrag(e as MouseEvent)
      return
    }
    const svg = svgRef.current
    const circleEl = circleRef.current
    if (!svg || !circleEl) return

    setDragging(true)
    const { x, y } = getGraphPointer(e)

    offset = {
      x: x - parseFloat(circleEl.getAttributeNS(null, 'cx') || '0'),
      y: y - parseFloat(circleEl.getAttributeNS(null, 'cy') || '0')
    }

    circleEl.setAttribute(
      'fill-opacity',
      String(dragBackgroundOpacity || point.backgroundOpacity.drag)
    )

    svg.addEventListener('mousemove', dragMove)
    svg.addEventListener('mouseup', dragEnd)
    svg.addEventListener('mouseleave', dragEnd)
    circleEl.addEventListener('touchmove', dragMove)
    circleEl.addEventListener('touchend', dragEnd)
    circleEl.addEventListener('touchcancel', dragEnd)

    onDrag?.(true)
  }

  const handleMouseEnter = () => {
    setHovered(true)
    onEnter?.({ ...filter, index })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    onLeave?.({ ...filter, index })
  }

  const handleDoubleClick = (
    e: ReactMouseEvent<SVGCircleElement | SVGTextElement>
  ) => {
    e.stopPropagation()
    onDoubleClick?.({ ...filter, index })
  }

  useEffect(() => {
    const circle = circleRef.current
    if (!wheelQ || !circle || zeroQ) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      let newQ = filterQ
      newQ += e.deltaY > 0 ? 0.1 : -0.1
      const minAllowedQ = Math.max(0.0001, minQ ?? scaleMinQ ?? 0.1)
      const maxAllowedQ = maxQ ?? scaleMaxQ ?? 25
      newQ = stripTail(limitRange(newQ, minAllowedQ, maxAllowedQ), qDecimals)
      onChange?.({ index, ...filter, q: newQ, ended: true })
    }

    circle.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      circle.removeEventListener('wheel', handleWheel)
    }
  }, [
    wheelQ,
    zeroQ,
    filterQ,
    minQ,
    maxQ,
    scaleMinQ,
    scaleMaxQ,
    qDecimals,
    index,
    filter,
    onChange
  ])

  if (type === 'BYPASS') return null

  const strokeWidth = lineWidth || point.lineWidth
  const pointColor = color || colors?.[index]?.point || defaultColor
  const bgColor = background || colors?.[index]?.background || pointColor

  const zeroValue = filterGain === 0 && !zeroGain

  const strokeColor = zeroValue
    ? zeroColor || zeroPoint.color
    : dragging
      ? dragColor || colors?.[index]?.drag || pointColor
      : active || hovered
        ? activeColor || colors?.[index]?.active || pointColor // fallback to regular point color if active color is not defined
        : pointColor

  const fillColor = zeroValue
    ? zeroBackground || zeroPoint.background
    : dragging
      ? dragBackground || colors?.[index]?.dragBackground || bgColor
      : active || hovered
        ? activeBackground || colors?.[index]?.activeBackground || bgColor
        : bgColor

  const fillOpacity =
    active || hovered
      ? (activeBackgroundOpacity ?? point.backgroundOpacity?.active)
      : (backgroundOpacity ?? point.backgroundOpacity?.normal)

  if (label || showIcon) {
    labelColor ||= point.label.color
    labelFontSize ||= point.label.fontSize
    labelFontFamily ||= point.label.fontFamily
    if (labelColor === 'inherit') labelColor = strokeColor
  }

  let labelStyle = {}
  if (showIcon) {
    label = getIconSymbol(type)
    labelFontFamily = 'dsssp'
    labelStyle = getIconStyles(type, filterGain)
  }

  const freqText =
    filterFreq >= 1000
      ? `${stripTail(filterFreq / 1000)} kHz`
      : `${Math.round(filterFreq)} Hz`
  const ariaLabel = passFilter
    ? `${type} filter, ${freqText}, Q ${filterQ}`
    : `${type} filter, ${freqText}, ${filterGain > 0 ? '+' : ''}${filterGain} dB, Q ${filterQ}`

  return (
    <g
      role="img"
      aria-label={ariaLabel}
    >
      <circle
        ref={circleRef}
        cx={x}
        cy={y}
        r={radius || point.radius}
        fill={fillColor}
        fillOpacity={fillOpacity}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={(e) => dragStart(e as unknown as MouseEvent)}
        onContextMenu={(e) => e.preventDefault()}
        onTouchStart={(e) => dragStart(e as unknown as TouchEvent)}
        onDoubleClick={handleDoubleClick}
        style={{ cursor: 'pointer', pointerEvents: 'auto', ...style }}
        className={className}
      />
      {Boolean(label) && (
        <text
          ref={labelRef}
          aria-hidden="true"
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fill={labelColor}
          fontSize={labelFontSize}
          fontFamily={labelFontFamily}
          style={{ ...labelStyle }}
          onDoubleClick={handleDoubleClick}
          {...(showIcon
            ? { dangerouslySetInnerHTML: { __html: label } }
            : { children: label })}
        />
      )}
    </g>
  )
}
