import type { Props, Events, Slots } from '@threlte/core'
import type { SvelteComponentTyped } from 'svelte'
import type { Audio as ThreeAudio } from 'three'
import type { AudioSource } from '../useAudioSource'
import type { AudioVolume, AudioPlaybackRate } from '../useAudio'

export type AudioProps = Omit<Props<ThreeAudio<GainNode>>, 'source'> & {
  source: AudioSource
  id?: string
  volume?: AudioVolume
  playbackRate?: AudioPlaybackRate
  autoplay?: boolean
  loop?: boolean
}

export type AudioEvents = Events<ThreeAudio<GainNode>>

export type AudioSlots = Slots<ThreeAudio<GainNode>>

export default class Audio extends SvelteComponentTyped<AudioProps, AudioEvents, AudioSlots> {}
