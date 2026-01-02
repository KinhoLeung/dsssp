import { useMemo } from 'react'

import { calcDrcMagnitudes } from '../../math'
import { type DrcSettings } from '../../types'
import { FrequencyResponseCurve } from '../FrequencyResponseCurve'
import { useGraph } from '../FrequencyResponseGraph'
import { type DefaultCurveProps } from '../types'

export type DRCCurveProps = DefaultCurveProps &
  DrcSettings & {
    /**
     * Optional input range for the curve on the X axis.
     * Defaults to the graph's display gain range.
     */
    inputMin?: number
    inputMax?: number
    /**
     * Adjusts the resolution of the curve by reducing the number of points based on the graph's width.
     * Lower values = more points = smoother curve but slower performance.
     * @default 2
     */
    resolutionFactor?: number
  }

/**
 * Renders a dynamic range compression/expansion curve from threshold/ratio settings.
 */
export const DRCCurve = ({
  threshold,
  ratio,
  knee = 0,
  makeup = 0,
  attack,
  release,
  inputMin,
  inputMax,
  resolutionFactor = 2,
  ...curveProps
}: DRCCurveProps) => {
  void attack
  void release
  const {
    scale: { minGain, maxGain, displayMinGain, displayMaxGain },
    width
  } = useGraph()

  const inputMinValue =
    typeof inputMin === 'number'
      ? inputMin
      : typeof displayMinGain === 'number'
        ? displayMinGain
        : minGain
  const inputMaxValue =
    typeof inputMax === 'number'
      ? inputMax
      : typeof displayMaxGain === 'number'
        ? displayMaxGain
        : maxGain

  const safeResolution = Math.max(1, resolutionFactor || 1)
  const steps = Math.max(2, Math.round(width / safeResolution))

  const magnitudes = useMemo(
    () =>
      calcDrcMagnitudes({
        threshold,
        ratio,
        knee,
        makeup,
        inputMin: inputMinValue,
        inputMax: inputMaxValue,
        steps
      }),
    [
      threshold,
      ratio,
      knee,
      makeup,
      inputMinValue,
      inputMaxValue,
      steps
    ]
  )

  return (
    <FrequencyResponseCurve
      magnitudes={magnitudes}
      {...curveProps}
    />
  )
}
