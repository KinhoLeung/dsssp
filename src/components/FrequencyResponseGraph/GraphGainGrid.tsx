import React from 'react'

import { getCenterLine, scaleMagnitude } from '../../math'
import { useGraph } from '.'

export const GraphGainGrid = () => {
  const {
    height,
    width,
    padding,
    scale: {
      minGain,
      maxGain,
      displayMinGain,
      displayMaxGain,
      dbSteps,
      dbLabels,
      dbLabelSteps,
      showDbUnitLabel
    },
    theme: {
      background: {
        grid: { dotted, lineColor, lineWidth },
        label: { color: labelColor, fontSize, fontFamily }
      }
    }
  } = useGraph()

  if (!dbSteps) return null

  const steps = dbSteps || maxGain // default to maxGain if not provided, showing only the center line
  const labelEvery =
    dbLabelSteps && dbLabelSteps > 0
      ? Math.max(1, Math.round(dbLabelSteps / steps))
      : 1

  const gainMinForDisplay =
    typeof displayMinGain === 'number' ? displayMinGain : minGain
  const gainMaxForDisplay =
    typeof displayMaxGain === 'number' ? displayMaxGain : maxGain

  const dBs = Array.from(
    { length: (maxGain - minGain) / steps + 1 },
    (_, i) => {
      return maxGain - i * steps
    }
  )

  const centerY = getCenterLine(gainMinForDisplay, gainMaxForDisplay, height)
  const strokeDasharray = '1,2'
  const gainLabelX = 4 - padding.left
  const unitLabelY = -padding.top / 2

  return (
    <>
      {dBs.map((tick, index) => {
        const tickY = scaleMagnitude(
          tick,
          gainMinForDisplay,
          gainMaxForDisplay,
          height
        )
        const tickLabel = tick > 0 ? `+${tick}` : tick

        const showLabel = dbLabels && index % labelEvery === 0

        return (
          <React.Fragment key={tick}>
            <line
              x1="0"
              x2={width}
              y1={tickY}
              y2={tickY}
              stroke={lineColor}
              strokeWidth={lineWidth.minor}
              {...(dotted ? { strokeDasharray } : {})}
            />
            {showLabel && (
              <text
                x={gainLabelX}
                y={tickY}
                fill={labelColor}
                fontSize={fontSize}
                fontFamily={fontFamily}
                textAnchor="start"
                dominantBaseline="middle"
              >
                {tickLabel}
              </text>
            )}
          </React.Fragment>
        )
      })}
      <line
        id="centerLine"
        x1="0"
        x2={width}
        y1={centerY}
        y2={centerY}
        stroke={lineColor}
        strokeWidth={lineWidth.center}
        {...(dotted ? { strokeDasharray } : {})}
      />
      {showDbUnitLabel !== false && dbLabels && (
        <text
          y={unitLabelY}
          x={gainLabelX}
          fill={labelColor}
          fontSize={fontSize}
          fontFamily={fontFamily}
          dominantBaseline="middle"
        >
          dB
        </text>
      )}
    </>
  )
}
