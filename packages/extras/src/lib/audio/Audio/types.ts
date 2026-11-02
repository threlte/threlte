import type { OmitProps, Props } from '@threlte/core'
import type { Audio as ThreeAudio } from 'three'
import type { AudioProps as CommonAudioProps } from '../utils/useAudio.svelte.js'

export interface AudioProps
  extends OmitProps<Props<ThreeAudio<GainNode>>, keyof CommonAudioProps>, CommonAudioProps {
  /**
   * The `id` of the `<AudioListener>` to play through.
   * @default 'default'
   */
  id?: string
}
