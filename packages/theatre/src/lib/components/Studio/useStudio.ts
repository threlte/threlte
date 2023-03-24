import type { IStudio } from '@theatre/studio'
import type { CurrentWritable } from '@threlte/core'
import { getContext } from 'svelte'

export const useStudio = () => {
  const studio = getContext<CurrentWritable<IStudio | undefined>>('theatre-studio')
  if (!studio) {
    throw new Error('Theatre context not found, did you forget to wrap your app in <Theatre>?')
  }
  return { studio }
}
