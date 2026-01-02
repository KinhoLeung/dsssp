import { fireEvent, render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { FilterPoint } from '.'
import { FrequencyResponseGraph, type GraphFilter } from '../..'

beforeEach(() => {
  ;(SVGSVGElement.prototype as unknown as { getScreenCTM: () => unknown }).getScreenCTM =
    () => ({ a: 1, d: 1, e: 0, f: 0 })
})

describe('FilterPoint Q interactions', () => {
  it('does not adjust Q via wheel for filter types without Q support', () => {
    const onChange = vi.fn()
    const filter: GraphFilter = { type: 'GAIN', freq: 1000, gain: 0, q: 1 }

    const { container } = render(
      <FrequencyResponseGraph width={800} height={400}>
        <FilterPoint filter={filter} onChange={onChange} />
      </FrequencyResponseGraph>
    )

    const circle = container.querySelector('circle')
    expect(circle).not.toBeNull()

    fireEvent.wheel(circle!, { deltaY: 100 })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not adjust Q via right-click drag for filter types without Q support', () => {
    const onChange = vi.fn()
    const filter: GraphFilter = { type: 'GAIN', freq: 1000, gain: 0, q: 1 }

    const { container } = render(
      <FrequencyResponseGraph width={800} height={400}>
        <FilterPoint filter={filter} onChange={onChange} />
      </FrequencyResponseGraph>
    )

    const svg = container.querySelector('svg')
    const circle = container.querySelector('circle')
    expect(svg).not.toBeNull()
    expect(circle).not.toBeNull()

    fireEvent.mouseDown(circle!, { button: 2, clientX: 100, clientY: 100 })
    fireEvent.mouseMove(svg!, { clientX: 200, clientY: 100 })
    fireEvent.mouseUp(svg!, { clientX: 200, clientY: 100 })

    expect(onChange).not.toHaveBeenCalled()
  })

  it('adjusts Q via wheel for filter types with Q support', () => {
    const onChange = vi.fn()
    const filter: GraphFilter = { type: 'PEAK', freq: 1000, gain: 0, q: 1 }

    const { container } = render(
      <FrequencyResponseGraph width={800} height={400}>
        <FilterPoint filter={filter} onChange={onChange} />
      </FrequencyResponseGraph>
    )

    const circle = container.querySelector('circle')
    expect(circle).not.toBeNull()

    fireEvent.wheel(circle!, { deltaY: 100 })
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0]?.[0]).toMatchObject({
      type: 'PEAK',
      q: 1.1,
      ended: true
    })
  })
})

