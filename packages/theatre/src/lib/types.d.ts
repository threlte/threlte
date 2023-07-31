import type { ISequence } from '@theatre/core'

type Autoreset = undefined | 'always' | 'onMount' | 'onDestroy'

type TheatreSequenceOptions = Required<NonNullable<Parameters<ISequence['play']>[0]>>
type PlaybackRange = TheatreSequenceOptions['range'] | undefined
type IterationCount = TheatreSequenceOptions['iterationCount'] | undefined
type PlaybackDirection = TheatreSequenceOptions['direction'] | undefined

type SequenceAudioOptions = Parameters<ISequence['attachAudio']>[0]
