import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { Group, Vector3 } from 'three'
import type { RigidBody } from '@dimforge/rapier3d-compat'

export type AxleProps = Props<Group> & {
	side: 'left' | 'right'
	parentRigidBody: RigidBody | undefined
	anchor: Parameters<Vector3['set']>
	isSteered?: boolean
	isDriven?: boolean
}

export default class Axle extends SvelteComponentTyped<AxleProps, Events<Group>, Slots<Group>> {}
