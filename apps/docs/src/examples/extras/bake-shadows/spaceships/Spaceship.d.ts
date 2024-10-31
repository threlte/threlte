import type { Component } from 'svelte'
import type { Group } from 'three'
import type { Props } from '@threlte/core'

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

declare const Spaceship: Component<SpaceshipProps>
