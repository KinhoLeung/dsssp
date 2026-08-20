import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import '@fontsource/iosevka-etoile'

import { DRCGraph, DRCCurve } from '.'
import { type DrcSettings } from '../..'

type DRCGraphStoryArgs = ComponentProps<typeof DRCGraph> & DrcSettings

const meta: Meta<DRCGraphStoryArgs> = {
  title: 'Container/DRCGraph',
  component: DRCGraph,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    scale: { control: { type: 'object' } },
    theme: { control: { type: 'object' } },
    threshold: { control: { type: 'range', min: -60, max: 0, step: 1 } },
    ratio: { control: { type: 'range', min: 1, max: 20, step: 0.5 } },
    knee: { control: { type: 'range', min: 0, max: 24, step: 1 } },
    makeup: { control: { type: 'range', min: -12, max: 12, step: 0.5 } },
    attack: { control: { type: 'range', min: 0, max: 200, step: 1 } },
    release: { control: { type: 'range', min: 10, max: 1000, step: 10 } }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const defaultProps = {
  width: 800,
  height: 400,
  scale: {
    minGain: -60,
    maxGain: 6,
    displayMinGain: -60,
    displayMaxGain: 6,
    dbSteps: 6,
    dbLabelSteps: 12,
    octaveTicks: 0,
    octaveLabels: [],
    majorTicks: []
  }
}

export const Default: Story = {
  args: {
    ...defaultProps,
    threshold: -18,
    ratio: 4,
    knee: 6,
    makeup: 0,
    attack: 10,
    release: 200
  },
  render: (args) => {
    const { threshold, ratio, knee, makeup, attack, release, ...graphProps } =
      args
    return (
      <DRCGraph {...graphProps}>
        <DRCCurve
          threshold={threshold}
          ratio={ratio}
          knee={knee}
          makeup={makeup}
          attack={attack}
          release={release}
        />
      </DRCGraph>
    )
  }
}
