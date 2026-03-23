import type { Props } from '@threlte/core'
import type { AudioListener as ThreeAudioListener } from 'three'

export type AudioListenerProps = Props<ThreeAudioListener> & {
  id?: string
  masterVolume?: number
}
