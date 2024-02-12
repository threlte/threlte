import type { Props, Events, Slots } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { Audio as ThreeAudio } from 'three'
import type {
  AudioProps as CommonAudioProps,
  AudioEvents as CommonAudioEvents
} from '../utils/useAudio'

export type AudioProps = Props<ThreeAudio<GainNode>> &
  CommonAudioProps & {
    id?: string
  }

export type AudioEvents = Events<ThreeAudio<GainNode>> & CommonAudioEvents

export type AudioSlots = Slots<ThreeAudio<GainNode>>

export default class Audio extends SvelteComponent<AudioProps, AudioEvents, AudioSlots> {}
