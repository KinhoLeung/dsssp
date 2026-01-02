import { useGraph } from './useGraph'

export const GraphFrequencyGrid = () => {
  const {
    height,
    logScale,
    padding,
    scale: { octaveLabels, octaveTicks, majorTicks, frequencyTicks },
    theme: {
      background: {
        grid: { dotted, lineColor, lineWidth },
        label: { color: labelColor, fontSize, fontFamily }
      }
    }
  } = useGraph()

  const autoTicks = octaveTicks ? logScale.ticks(octaveTicks) : []
  const ticks = frequencyTicks?.length ? frequencyTicks : autoTicks
  const strokeDasharray = '1,2'

  return (
    <>
      {(frequencyTicks?.length ? ticks : ticks.slice(1, -1)).map((tick) => {
        const tickX = logScale.x(tick)

        const width = majorTicks.includes(tick)
          ? lineWidth.major
          : lineWidth.minor

        return (
          <line
            key={tick}
            x1={tickX}
            x2={tickX}
            y1="0"
            y2={height}
            stroke={lineColor}
            strokeWidth={width}
            {...(dotted ? { strokeDasharray } : {})}
          />
        )
      })}

      {octaveLabels.map((octave) => {
        const octaveX = logScale.x(octave)
        return (
          <text
            key={octave}
            y={height + padding.bottom - 4}
            x={octaveX}
            textAnchor="middle"
            fill={labelColor}
            fontSize={fontSize}
            fontFamily={fontFamily}
          >
            {(octave < 1_000 ? octave : `${octave / 1000}k`) + 'Hz'}
          </text>
        )
      })}
    </>
  )
}
