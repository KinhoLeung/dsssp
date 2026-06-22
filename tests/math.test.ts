import { describe, expect, it } from 'vitest'

import { calcBiQuadCoefficients, calcMagnitudeForFrequency } from '../src/math'
import type { FilterType } from '../src/types'

const responseAt = (type: FilterType, q: number, frequency: number) => {
  const coefficients = calcBiQuadCoefficients(type, 1000, 6, q, 44100)
  return calcMagnitudeForFrequency(coefficients, frequency, 44100)
}

const maxResponseDelta = (type: FilterType, lowQ: number, highQ: number) => {
  const probeFrequencies = [200, 400, 700, 1400, 2500, 5000]

  return Math.max(
    ...probeFrequencies.map((frequency) =>
      Math.abs(responseAt(type, highQ, frequency) - responseAt(type, lowQ, frequency))
    )
  )
}

describe('shelf filter Q', () => {
  it('changes second-order shelf frequency responses when Q changes', () => {
    const shelfTypes: FilterType[] = ['LOWSHELF2', 'HIGHSHELF2']

    shelfTypes.forEach((type) => {
      expect(maxResponseDelta(type, 0.5, 2)).toBeGreaterThan(0.1)
    })
  })

  it('keeps first-order shelf frequency responses independent of Q', () => {
    const shelfTypes: FilterType[] = ['LOWSHELF1', 'HIGHSHELF1']

    shelfTypes.forEach((type) => {
      expect(maxResponseDelta(type, 0.5, 2)).toBeCloseTo(0, 6)
    })
  })
})