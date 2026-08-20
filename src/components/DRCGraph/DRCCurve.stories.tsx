import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { DRCCurve, DRCGraph } from '.'

const meta: Meta<typeof DRCCurve> = {
  title: 'Components/DRCCurve',
  component: DRCCurve,
  decorators: [
    (Story) => (
      <DRCGraph
        width={800}
        height={400}
        scale={{
          minGain: -60,
          maxGain: 6,
          displayMinGain: -60,
          displayMaxGain: 6,
          dbSteps: 6,
          dbLabelSteps: 12
        }}
      >
        <Story />
      </DRCGraph>
    )
  ],
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    threshold: { control: { type: 'range', min: -60, max: 0, step: 1 } },
    ratio: { control: { type: 'range', min: 1, max: 20, step: 0.5 } },
    knee: { control: { type: 'range', min: 0, max: 24, step: 1 } },
    makeup: { control: { type: 'range', min: -12, max: 12, step: 0.5 } },
    attack: { control: { type: 'range', min: 0, max: 200, step: 1 } },
    release: { control: { type: 'range', min: 10, max: 1000, step: 10 } },
    color: { control: { type: 'color' } },
    lineWidth: { control: { type: 'range', min: 0.5, max: 4, step: 0.1 } },
    resolutionFactor: {
      control: { type: 'range', min: 1, max: 50, step: 0.5 }
    },
    animate: { control: { type: 'boolean' } },
    easing: {
      control: { type: 'select' },
      options: ['linear', 'easeIn', 'easeOut', 'easeInOut']
    },
    duration: { control: { type: 'range', min: 0, max: 1000, step: 50 } }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    threshold: -18,
    ratio: 4,
    knee: 6,
    makeup: 0,
    attack: 10,
    release: 200
  }
}
