import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { Group } from 'three'

export type SpaceshipProps = Props<Group> & {
  name:
    | 'Bob'
    | 'Challenger'
    | 'Dispatcher'
    | 'Executioner'
    | 'Imperial'
    | 'Insurgent'
    | 'Omen'
    | 'Pancake'
    | 'Spitfire'
    | 'Striker'
    | 'Zenith'
}

export default class Spaceship extends SvelteComponent<SpaceshipProps> {}
