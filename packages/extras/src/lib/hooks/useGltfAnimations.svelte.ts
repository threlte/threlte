import { useTask } from '@threlte/core'
import { AnimationMixer, type AnimationAction, type Object3D } from 'three'
import type { ThrelteGltf } from '../types/types.js'

type UseGltfAnimationsReturnType<Actions> = {
  gltf: { current: ThrelteGltf | undefined }
  mixer: AnimationMixer
  actions: { current: Actions }
  root: { current: Object3D | undefined }
}

const isRoot = (value: any): value is Object3D => !!value?.isObject3D

/**
 * Convenience hook to use animations loaded with a <GLTF> Threlte component.
 *
 * ### Example
 *
 * ```svelte
 * <script lang="ts">
 *   import { GLTF, useGltfAnimations } from '@threlte/extras'
 *
 *   const { gltf, actions } = useGltfAnimations<'All Animations'>()
 *
 *   // play them whenever you need
 *   export const triggerAnimation = () => {
 *     actions.current['All Animations']?.play()
 *   }
 * </script>
 *
 * <GLTF url={'/Bengal.glb'} bind:gltf={$gltf} />
 * ```
 * @param callback
 * @returns
 */
export function useGltfAnimations<
  T extends string,
  Actions extends Partial<Record<T, AnimationAction>> = Partial<Record<T, AnimationAction>>
>(root?: Object3D): UseGltfAnimationsReturnType<Actions>
export function useGltfAnimations<
  T extends string,
  Actions extends Partial<Record<T, AnimationAction>> = Partial<Record<T, AnimationAction>>
>(gltf: { current: ThrelteGltf | undefined }, root?: Object3D): UseGltfAnimationsReturnType<Actions>

export function useGltfAnimations<
  T extends string,
  Actions extends Partial<Record<T, AnimationAction>> = Partial<Record<T, AnimationAction>>
>(
  rootOrGltf?: Object3D | { current: ThrelteGltf | undefined },
  maybeRoot?: Object3D
): UseGltfAnimationsReturnType<Actions> {
  let gltf = $derived(rootOrGltf && 'current' in rootOrGltf ? rootOrGltf?.current : undefined)

  const root = $state<Object3D | undefined>(
    isRoot(rootOrGltf) ? rootOrGltf : isRoot(maybeRoot) ? maybeRoot : undefined
  )

  const actualRoot = $derived(root ?? gltf?.scene)

  let actions = $state<Actions>({} as Actions)

  const mixer = new AnimationMixer(undefined as unknown as Object3D)

  $effect(() => {
    if (!gltf) return
    if (gltf.animations.length === 0) return
    if (!actualRoot) return

    // if there's a mixer, we stop all running actions
    const newActions = gltf.animations.reduce((acc, clip) => {
      const action = mixer.clipAction(clip, actualRoot)
      return {
        ...acc,
        [clip.name as T]: action
      }
    }, {} as Actions)
    actions = newActions

    return () => {
      Object.values(newActions).forEach((a) => {
        const action = a as AnimationAction
        action.stop()
        mixer.uncacheClip(action.getClip())
      })
    }
  })

  useTask(
    (delta) => {
      mixer.update(delta)
    },
    { running: () => Object.keys(actions).length > 0 }
  )

  return {
    gltf: {
      get current() {
        return gltf
      },
      set current(value: ThrelteGltf | undefined) {
        gltf = value
      }
    },
    root: {
      get current() {
        return root
      }
    },
    mixer,
    actions: {
      get current() {
        return actions
      }
    }
  }
}
