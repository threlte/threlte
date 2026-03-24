import type { Props } from '@threlte/core'
import type { Audio as ThreeAudio } from 'three'
import type { AudioProps as CommonAudioProps } from '../utils/useAudio.js'

export type AudioProps = Props<ThreeAudio<GainNode>> &
  CommonAudioProps & {
    id?: string
  }
