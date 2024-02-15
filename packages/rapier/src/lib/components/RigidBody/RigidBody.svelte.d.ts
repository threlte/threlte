import { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
import { SvelteComponent } from 'svelte'
import type { Euler, Vector3 } from 'three'
import type { RigidBodyTypeString } from '../../lib/parseRigidBodyType'
import type { RigidBodyEventMap } from '../../types/types'

export type Boolean3Array = [x: boolean, y: boolean, z: boolean]

export type RigidBodyProps = {
  rigidBody?: RapierRigidBody

  /**
   * Specify the type of this rigid body
   */
  type?: RigidBodyTypeString

  /** Whether or not this body can sleep.
   * default: true
   */
  canSleep?: boolean

  /** The linear velocity of this body.
   * default: zero velocity
   */
  linearVelocity?: Parameters<Vector3['set']>

  /** The angular velocity of this body.
   * Default: zero velocity.
   */
  angularVelocity?: Parameters<Euler['set']>

  /**
   * The scaling factor applied to the gravity affecting the rigid-body.
   * Default: 1.0
   */
  gravityScale?: number

  /**
   * Whether or not Continous Collision Detection is enabled for this rigid-body.
   * https://rapier.rs/docs/user_guides/javascript/rigid_bodies#continuous-collision-detection
   * @default false
   */
  ccd?: boolean

  /**
   * Locks all rotations that would have resulted from forces on the created rigid-body.
   */
  lockRotations?: boolean

  /**
   * Locks all translations that would have resulted from forces on the created rigid-body.
   */
  lockTranslations?: boolean

  /**
   * Allow rotation of this rigid-body only along specific axes.
   */
  enabledRotations?: Boolean3Array

  /**
   * Allow translations of this rigid-body only along specific axes.
   */
  enabledTranslations?: Boolean3Array

  /**
   * Dominance is a non-realistic, but sometimes useful, feature.
   * It can be used to make one rigid-body immune to forces
   * originating from contacts with some other bodies.
   *
   * Number in the range -127 to 127, default is 0
   */
  dominance?: number

  /**
   * Damping lets you slow down a rigid-body automatically. This can be used to
   * achieve a wide variety of effects like fake air friction. Larger values of
   * damping coefficients lead to a stronger slow-downs. Their default
   * values are 0.0 (no damping at all).
   */
  linearDamping?: number

  /**
   * Damping lets you slow down a rigid-body automatically. This can be used to
   * achieve a wide variety of effects like fake air friction. Larger values of
   * damping coefficients lead to a stronger slow-downs. Their default
   * values are 0.0 (no damping at all).
   */
  angularDamping?: number

  /**
   * Set the rigidBody as enabled or disabled.
   */
  enabled?: boolean
  /**
   * An arbitrary user-defined object associated with this rigid-body.
   */
  userData?: Record<string, any>
}

type RigidBodyEvents = RigidBodyEventMap

type RigidBodySlots = {
  default: {
    rigidBody: RapierRigidBody
  }
}

export default class RigidBody extends SvelteComponent<
  RigidBodyProps,
  RigidBodyEvents,
  RigidBodySlots
> {}
