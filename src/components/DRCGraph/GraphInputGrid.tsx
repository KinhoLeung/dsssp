import React from 'react'

import { useGraph } from '../FrequencyResponseGraph'

export const GraphInputGrid = () => {
  const {
    height,
    padding,
    logScale,
    scale: {
      minGain,
      maxGain,
      displayMinGain,
      displayMaxGain,
      dbSteps,
      dbLabels,
      dbLabelSteps
    },
    theme: {
      background: {
        grid: { dotted, lineColor, lineWidth },
        label: { color: labelColor, fontSize, fontFamily }
      }
    }
  } = useGraph()

  if (!dbSteps) return null

  const steps = dbSteps || maxGain
  const labelEvery =
    dbLabelSteps && dbLabelSteps > 0
      ? Math.max(1, Math.round(dbLabelSteps / steps))
      : 1

  const inputMin = typeof displayMinGain === 'number' ? displayMinGain : minGain
  const inputMax = typeof displayMaxGain === 'number' ? displayMaxGain : maxGain

  const dBs = Array.from(
    { length: (inputMax - inputMin) / steps + 1 },
    (_, i) => inputMin + i * steps
  )

  const strokeDasharray = '1,2'
  const labelY = height + padding.bottom - 4

  return (
    <>
      {dBs.map((tick, index) => {
        const tickX = logScale.x(tick)
        const tickLabel = tick > 0 ? `+${tick}` : tick
        const showLabel = dbLabels && index % labelEvery === 0

        return (
          <React.Fragment key={tick}>
            <line
              x1={tickX}
              x2={tickX}
              y1="0"
              y2={height}
              stroke={lineColor}
              strokeWidth={lineWidth.minor}
              {...(dotted ? { strokeDasharray } : {})}
            />
            {showLabel && (
              <text
                x={tickX}
                y={labelY}
                textAnchor="middle"
                fill={labelColor}
                fontSize={fontSize}
                fontFamily={fontFamily}
              >
                {tickLabel}
              </text>
            )}
          </React.Fragment>
        )
      })}
      {inputMin <= 0 && inputMax >= 0 && (
        <line
          x1={logScale.x(0)}
          x2={logScale.x(0)}
          y1="0"
          y2={height}
          stroke={lineColor}
          strokeWidth={lineWidth.center}
          {...(dotted ? { strokeDasharray } : {})}
        />
      )}
    </>
  )
}
