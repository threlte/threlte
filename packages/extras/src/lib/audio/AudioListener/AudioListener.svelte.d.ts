import type { Events, Props, Slots } from '@threlte/core'
import type { SvelteComponentTyped } from 'svelte'
import type { AudioListener as ThreeAudioListener } from 'three'

export type AudioListenerProps = Props<ThreeAudioListener> & {
  id?: string
  masterVolume?: number
}

export type AudioListenerEvents = Events<ThreeAudioListener>

export type AudioListenerSlots = Slots<ThreeAudioListener>

export default class AudioListener extends SvelteComponentTyped<
  AudioListenerProps,
  AudioListenerEvents,
  AudioListenerSlots
> {}
