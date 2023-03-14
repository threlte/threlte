import type { Props, Events, Slots } from '@threlte/core'
import type { SvelteComponentTyped } from 'svelte'
import type { Audio as ThreeAudio } from 'three'
import type { AudioProps as CommonAudioProps } from '../utils/useAudio'

export type AudioProps = Props<ThreeAudio<GainNode>> &
  CommonAudioProps & {
    id?: string
  }

export type AudioEvents = Events<ThreeAudio<GainNode>>

export type AudioSlots = Slots<ThreeAudio<GainNode>>

export default class Audio extends SvelteComponentTyped<AudioProps, AudioEvents, AudioSlots> {}
