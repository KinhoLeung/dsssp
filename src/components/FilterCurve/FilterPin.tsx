import { type CSSProperties } from 'react'

import {
  calcMagnitudeForFrequency,
  getCenterLine,
  scaleMagnitude
} from '../../math'
import { type GraphFilter, type BiQuadCoefficients } from '../../types'
import { getZeroGain } from '../../utils'
import { useGraph } from '../..'

export type FilterPinProps = {
  filter: GraphFilter
  vars: BiQuadCoefficients
  lineWidth?: number
  opacity?: CSSProperties['opacity']
  color?: CSSProperties['color']
}
export const FilterPin = ({
  filter,
  vars,
  opacity,
  lineWidth,
  color
}: FilterPinProps) => {
  const { scale, height, logScale } = useGraph()
  const { minGain, maxGain, displayMinGain, displayMaxGain, sampleRate } = scale
  const { freq, type } = filter
  let { gain, q } = filter
  const zeroGain = getZeroGain(type)
  const {
    theme: {
      filters: { point }
    }
  } = useGraph()
  if (!['LOW', 'HIGH', 'NOTCH'].some((item) => type.includes(item))) return null

  const pass1FilterType = type.includes('PASS1') || type === 'NOTCH'
  const pass2FilterType = type.includes('PASS2')

  // fake zeroGain for PASS filters
  if (pass1FilterType || pass2FilterType) gain = 0
  if (pass1FilterType) q = 0.7

  // circle radius used in the FilterPoint component
  let pointRadius = gain >= 0 || zeroGain ? point.radius : -point.radius

  let pass2UpFlag = false
  if (pass2FilterType && q > 1.1) {
    pointRadius = -point.radius
    pass2UpFlag = true
  }

  const gainMinForDisplay =
    typeof displayMinGain === 'number' ? displayMinGain : minGain
  const gainMaxForDisplay =
    typeof displayMaxGain === 'number' ? displayMaxGain : maxGain

  let pointY = pointRadius || 0
  if (pass1FilterType || pass2FilterType) {
    pointY += getCenterLine(gainMinForDisplay, gainMaxForDisplay, height)
  } else {
    pointY += scaleMagnitude(gain, gainMinForDisplay, gainMaxForDisplay, height)
  }

  const centerMagnitude = calcMagnitudeForFrequency(vars, freq, sampleRate)
  const magnitudeY = scaleMagnitude(
    centerMagnitude,
    gainMinForDisplay,
    gainMaxForDisplay,
    height
  )
  const deltaX = pointY > magnitudeY
  const x = logScale.x(freq)

  if ((gain < 0 && deltaX) || (gain >= 0 && !deltaX) || pass2UpFlag) {
    return (
      <line
        x1={x}
        x2={x}
        y1={pointY}
        y2={magnitudeY}
        stroke={color}
        strokeWidth={lineWidth}
        strokeOpacity={opacity}
      />
    )
  }
  return null
}
