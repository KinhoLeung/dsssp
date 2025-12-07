import { useGraph } from '.'

export const directions = {
  VERTICAL: {
    x1: '0',
    y1: '0',
    x2: '0',
    y2: '1'
  },
  HORIZONTAL: {
    x1: '0',
    y1: '0',
    x2: '1',
    y2: '0'
  },
  DIAGONAL_TL_BR: {
    x1: '0',
    y1: '0',
    x2: '1',
    y2: '1'
  },
  DIAGONAL_BL_TR: {
    x1: '0',
    y1: '1',
    x2: '1',
    y2: '0'
  }
} as const

export const GraphGradient = () => {
  const {
    width,
    height,
    outerWidth,
    outerHeight,
    padding,
    theme: {
      background: {
        gradient: { start, stop, direction },
        grid: {
          lineColor,
          lineWidth: { border: borderWidth }
        }
      }
    }
  } = useGraph()

  const id = `gBg${Math.random().toString().substring(2, 9)}`
  return (
    <>
      <linearGradient
        id={id}
        {...directions[direction]}
      >
        <stop
          offset="0%"
          stopColor={start}
        />
        <stop
          offset="100%"
          stopColor={stop}
        />
      </linearGradient>
      <rect
        x={-padding.left}
        y={-padding.top}
        width={outerWidth}
        height={outerHeight}
        fill={`url(#${id})`}
      />
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill={`url(#${id})`}
      />
      {Boolean(borderWidth) && (
        <rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={Math.max(width - borderWidth, 0)}
          height={Math.max(height - borderWidth, 0)}
          fill="none"
          stroke={lineColor}
          strokeWidth={borderWidth}
        />
      )}
    </>
  )
}
