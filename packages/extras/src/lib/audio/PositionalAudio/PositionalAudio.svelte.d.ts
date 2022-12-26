import type { Props } from '@threlte/core'
import type { SvelteComponentTyped } from 'svelte'
import type { Audio as ThreeAudio, PositionalAudio as ThreePositionalAudio } from 'three'

export type PositionalAudioProps = Props<ThreePositionalAudio> & {
  id?: string
  volume?: number
  refDistance?: number
  rolloffFactor?: number
  distanceModel?: string
  maxDistance?: number
  directionalCone?: {
    coneInnerAngle: number
    coneOuterAngle: number
    coneOuterGain: number
  }
  // TODO unknown is used here to be able to directly use
  // the function in a svelte event handler: on:click={play}
  // as otherwise TypeScript will complain about the type
  // of the argument 'delay'. It's not a perfect solution though.
  play?: (delay?: number | any) => Promise<ThreeAudio>
  pause?: () => ThreeAudio
  stop?: () => ThreeAudio
}

export default class PositionalAudio extends SvelteComponentTyped<PositionalAudioProps> {}
