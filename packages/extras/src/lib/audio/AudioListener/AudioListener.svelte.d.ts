import type { Events, Props } from '@threlte/core'
import type { Snippet, SvelteComponent } from 'svelte'
import type { AudioListener as ThreeAudioListener } from 'three'

export type AudioListenerProps = Props<ThreeAudioListener> & {
  id?: string
  masterVolume?: number
  children: AudioListenerSnippet
}

export type AudioListenerEvents = Events<ThreeAudioListener>

export type AudioListenerSnippet = Snippet<[{ ref: ThreeAudioListener }]>

export default class AudioListener extends SvelteComponent<
  AudioListenerProps,
  AudioListenerEvents
> {}
