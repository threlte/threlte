import type { Readable } from 'svelte/store'
import type {
  Camera,
  Clock,
  Scene,
  ShadowMapType,
  ColorSpace,
  ToneMapping,
  WebGLRenderer
} from 'three'
import type { ThrelteFrameHandler } from '../hooks/useFrame'
import type { ThrelteRenderHandler } from '../hooks/useRender'
import type { CurrentWritable } from '../lib/storeUtils'
import type { DisposableThreeObject } from './components'

/**
 * ### `ThrelteContext`
 *
 * This is the main context of a Threlte application.
 * It's exposed to the user via the hook `useThrelte`.
 */
export type ThrelteContext = {
  // Basics
  size: Readable<Size>
  clock: Clock
  camera: CurrentWritable<Camera>
  scene: Scene
  dpr: CurrentWritable<number>
  useLegacyLights: CurrentWritable<boolean>

  // Rendering Management
  renderer?: WebGLRenderer
  frameloop: CurrentWritable<'always' | 'demand' | 'never'>
  /**
   * Invalidates the current frame when frameloop === 'demand'
   */
  invalidate: (debugFrameloopMessage?: string) => void
  /**
   * Advance one frame when frameloop === 'never'
   */
  advance: () => void

  // Color Management
  colorManagementEnabled: CurrentWritable<boolean>
  colorSpace: CurrentWritable<ColorSpace>
  toneMapping: CurrentWritable<ToneMapping>

  // Shadows
  shadows: CurrentWritable<boolean | ShadowMapType>
}

/**
 * The internal context is used to store the state of the
 * frameloop and the disposal methods. It is not exposed
 * to the user.
 */
export type ThrelteInternalContext = {
  /**
   * Render context
   */
  debugFrameloop: boolean
  frameInvalidated: boolean
  frame: number
  invalidations: Record<string, number>
  manualFrameHandlers: Set<ThrelteFrameHandler>
  autoFrameHandlers: Set<ThrelteFrameHandler>
  allFrameHandlers: Set<ThrelteFrameHandler>
  renderHandlers: Set<ThrelteRenderHandler>
  advance: boolean

  /**
   * Disposal context
   */

  /**
   * Disposes all disposable objects from disposableObjects
   * that are not mounted anymore and clears the Map entry.
   */
  dispose: (force?: boolean) => void

  /**
   * Returns an array of disposable objects.
   * Recursively checks disposable objects for properties
   * that again hold disposable objects and returns
   * them as well.
   */
  collectDisposableObjects: (
    object?: DisposableThreeObject,
    arr?: DisposableThreeObject[]
  ) => DisposableThreeObject[]

  /**
   * Add disposable objects that will be disposed on unmounting.
   */
  addDisposableObjects: (objects: DisposableThreeObject[]) => void

  /**
   * Remove disposable objects and possibly dispose them
   * in the next frame if they are not mounted anywhere else.
   */
  removeDisposableObjects: (objects: DisposableThreeObject[]) => void

  /**
   * A map of currently mounted disposable objects.
   */
  disposableObjects: Map<DisposableThreeObject, number>

  /**
   * A flag that is used to check whether the dispose method
   * should actually run.
   */
  shouldDispose: boolean
}

export type ThrelteUserContext = CurrentWritable<Record<string, any>>

export type Size = {
  width: number
  height: number
}
