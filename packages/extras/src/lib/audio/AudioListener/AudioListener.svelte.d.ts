import type { Props } from '@threlte/core'
import type { SvelteComponentTyped } from 'svelte'
import type { AudioListener as ThreeAudioListener } from 'three'

export type AudioListenerProps = Props<ThreeAudioListener> & {
  id?: string
  masterVolume?: number
}

export default class AudioListener extends SvelteComponentTyped<AudioListenerProps> {}
