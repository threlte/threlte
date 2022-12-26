import type { Props } from '@threlte/core'
import type { SvelteComponentTyped } from 'svelte'
import type { PositionalAudio, Audio } from 'three'

export type AudioInstanceProps<T extends Audio<GainNode> | PositionalAudio> = Props<Audio> & {
  id?: string
  volume?: number
  play?: (delay?: number | any) => Promise<T>
  pause?: () => T
  stop?: () => T
}

export default class AudioInstance<
  T extends Audio<GainNode> | PositionalAudio
> extends SvelteComponentTyped<AudioInstanceProps<T>> {}
