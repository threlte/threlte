import type { ISequence, IRafDriver } from '@theatre/core'

// theatre native options
export type TheatreSequenceOptions = Required<NonNullable<Parameters<ISequence['play']>[0]>>
export type PlaybackRange = TheatreSequenceOptions['range'] | undefined
export type IterationCount = TheatreSequenceOptions['iterationCount'] | undefined
export type PlaybackDirection = TheatreSequenceOptions['direction'] | undefined

export type SequenceAudioOptions = Parameters<ISequence['attachAudio']>[0]

// threlte specific options
export type Autoreset = undefined | 'always' | 'onMount' | 'onDestroy'

// all options
export interface SequenceOptions {
  key?: string
  // theatre options
  rate?: number
  range?: PlaybackRange
  iterationCount?: IterationCount
  direction?: PlaybackDirection
  rafDriver?: IRafDriver
  audio?: SequenceAudioOptions
}
