import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { Audio as ThreeAudio } from 'three'
import type { AudioProps as CommonAudioProps } from '../utils/useAudio'

export type AudioProps = Props<ThreeAudio<GainNode>> &
  CommonAudioProps & {
    id?: string
  }

export default class Audio extends SvelteComponent<AudioProps> {}
