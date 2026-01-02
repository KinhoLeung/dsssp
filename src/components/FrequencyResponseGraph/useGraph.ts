import { useContext } from 'react'

import { GraphContext } from './GraphProvider'

export const useGraph = () => {
  const context = useContext(GraphContext)
  if (context === undefined) {
    throw new Error(
      'useGraph must be used within an FrequencyResponseGraphProvider'
    )
  }
  return context
}
