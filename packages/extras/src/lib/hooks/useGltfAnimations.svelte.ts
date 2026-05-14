import { useTask, isInstanceOf } from '@threlte/core'
import { fromStore, toStore, type Readable, type Writable } from 'svelte/store'
import { AnimationMixer, Object3D, type AnimationAction } from 'three'
import type { ThrelteGltf } from '../types/types.js'

type UseGltfAnimationsReturnType<Actions> = {
  gltf: Writable<ThrelteGltf | undefined>
  mixer: AnimationMixer
  actions: Readable<Actions>
  root: Writable<Object3D | undefined>
}

const isStore = (value: unknown): value is Writable<ThrelteGltf | undefined> =>
  typeof (value as { subscribe?: unknown })?.subscribe === 'function'

const isGetter = <T>(value: unknown): value is () => T => typeof value === 'function'

/**
 * Convenience hook to use animations loaded with the `<GLTF>` component or the
 * `useGltf` hook.
 *
 * Pass `gltf` as a getter so reads are tracked through runes automatically.
 * The optional `root` getter binds animations to a different `Object3D` than
 * the gltf's own scene — useful when retargeting clips onto a separate rig.
 *
 * ### Example with `useGltf`
 *
 * ```svelte
 * <script lang="ts">
 *   import { useGltf, useGltfAnimations } from '@threlte/extras'
 *
 *   const gltf = useGltf('/Bengal.glb')
 *   const { actions } = useGltfAnimations<'Run' | 'Idle'>(() => $gltf)
 *
 *   $effect(() => {
 *     $actions.Run?.play()
 *   })
 * </script>
 * ```
 *
 * ### Example with `<GLTF>` and `bind:gltf`
 *
 * ```svelte
 * <script lang="ts">
 *   import { GLTF, useGltfAnimations, type ThrelteGltf } from '@threlte/extras'
 *
 *   let gltf = $state<ThrelteGltf | undefined>()
 *   const { actions } = useGltfAnimations<'Run'>(() => gltf)
 * </script>
 *
 * <GLTF url="/Bengal.glb" bind:gltf />
 * ```
 */
export function useGltfAnimations<
  T extends string,
  Actions extends Partial<Record<T, AnimationAction>> = Partial<Record<T, AnimationAction>>
>(
  gltf: () => ThrelteGltf | undefined,
  root?: () => Object3D | undefined
): UseGltfAnimationsReturnType<Actions>
/**
 * @deprecated Pass `gltf` as a getter function instead. This signature will be
 * removed in Threlte 9.
 *
 * ```ts
 * // Before
 * const { gltf, actions } = useGltfAnimations()
 * // <GLTF url="/model.glb" bind:gltf={$gltf} />
 *
 * // After
 * let gltf = $state<ThrelteGltf>()
 * const { actions } = useGltfAnimations(() => gltf)
 * // <GLTF url="/model.glb" bind:gltf />
 * ```
 */
export function useGltfAnimations<
  T extends string,
  Actions extends Partial<Record<T, AnimationAction>> = Partial<Record<T, AnimationAction>>
>(root?: Object3D): UseGltfAnimationsReturnType<Actions>
/**
 * @deprecated Pass `gltf` as a getter function instead. This signature will be
 * removed in Threlte 9.
 *
 * ```ts
 * // Before
 * const gltf = useGltf('/model.glb')
 * const { actions } = useGltfAnimations(gltf)
 *
 * // After
 * const gltf = useGltf('/model.glb')
 * const { actions } = useGltfAnimations(() => $gltf)
 * ```
 */
export function useGltfAnimations<
  T extends string,
  Actions extends Partial<Record<T, AnimationAction>> = Partial<Record<T, AnimationAction>>
>(gltf: Writable<ThrelteGltf | undefined>, root?: Object3D): UseGltfAnimationsReturnType<Actions>

export function useGltfAnimations<
  T extends string,
  Actions extends Partial<Record<T, AnimationAction>> = Partial<Record<T, AnimationAction>>
>(
  gltf?: (() => ThrelteGltf | undefined) | Writable<ThrelteGltf | undefined> | Object3D,
  root?: (() => Object3D | undefined) | Object3D
): UseGltfAnimationsReturnType<Actions> {
  const gltfStore = isStore(gltf) ? fromStore(gltf) : undefined
  let _gltf = $derived<ThrelteGltf | undefined>(isGetter(gltf) ? gltf() : gltfStore?.current)
  let _root = $derived<Object3D | undefined>(
    isInstanceOf(gltf, 'Object3D') ? gltf : isGetter(root) ? root() : undefined
  )

  const actualRoot = $derived(_root ?? _gltf?.scene)

  let actions = $state.raw<Actions>({} as Actions)

  const mixer = new AnimationMixer(undefined as unknown as Object3D)

  $effect(() => {
    if (!_gltf || _gltf.animations.length === 0 || !actualRoot) return

    const newActions: Partial<Record<T, AnimationAction>> = {}

    for (const clip of _gltf.animations) {
      const action = mixer.clipAction(clip, actualRoot)
      newActions[clip.name as T] = action
    }

    actions = newActions as Actions

    return () => {
      for (const action of Object.values(newActions) as AnimationAction[]) {
        action.stop()
        mixer.uncacheClip(action.getClip())
      }
    }
  })

  useTask(
    (delta) => {
      mixer.update(delta)
    },
    { running: () => Object.keys(actions).length > 0 }
  )

  return {
    /**
     * @deprecated This property will be removed in Threlte 9
     */
    gltf: {
      ...toStore(() => _gltf),
      set(value) {
        _gltf = value
      },
      update(updater) {
        _gltf = updater(_gltf)
      }
    },

    /**
     * @deprecated This property will be removed in Threlte 9
     */
    root: {
      ...toStore(() => _root),
      set(value) {
        _root = value
      },
      update(updater) {
        _root = updater(_root)
      }
    },
    mixer,
    actions: toStore(() => actions)
  }
}
