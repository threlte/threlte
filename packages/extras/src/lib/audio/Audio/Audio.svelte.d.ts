import type { Props } from '@threlte/core'
import type { SvelteComponentTyped } from 'svelte'
import type { Audio as ThreeAudio } from 'three'

export type AudioProps = Props<ThreeAudio> & {
  id?: string
  volume?: number
  // TODO unknown is used here to be able to directly use
  // the function in a svelte event handler: on:click={play}
  // as otherwise TypeScript will complain about the type
  // of the argument 'delay'. It's not a perfect solution though.
  play?: (delay?: number | any) => Promise<ThreeAudio>
  pause?: () => ThreeAudio
  stop?: () => ThreeAudio
}

export default class Audio extends SvelteComponentTyped<AudioProps> {}
