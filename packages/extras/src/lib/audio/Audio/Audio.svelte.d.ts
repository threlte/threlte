import type { Props, Events } from '@threlte/core'
import type { SvelteComponent, Snippet } from 'svelte'
import type { Audio as ThreeAudio } from 'three'
import type {
  AudioProps as CommonAudioProps,
  AudioEvents as CommonAudioEvents
} from '../utils/useAudio'

export type AudioProps = Props<ThreeAudio<GainNode>> &
  CommonAudioProps & {
    id?: string
    children: AudioSnippet
  }

export type AudioEvents = Events<ThreeAudio<GainNode>> & CommonAudioEvents

export type AudioSnippet = Snippet<[{ ref: ThreeAudio<GainNode> }]>

export default class Audio extends SvelteComponent<AudioProps, AudioEvents> {}
