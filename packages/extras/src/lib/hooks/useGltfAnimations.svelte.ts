import { useTask } from '@threlte/core'
import { AnimationMixer, type AnimationAction, type Object3D } from 'three'
import type { ThrelteGltf } from '../types/types.js'

interface UseGltfAnimationsReturnType<Actions> {
  mixer: AnimationMixer
  actions: { readonly current: Actions }
}

/**
 * Convenience hook to use animations loaded with a <GLTF> Threlte component.
 *
 * ### Example
 *
 * ```svelte
 * <script lang="ts">
 *   import { GLTF, useGltfAnimations, type ThrelteGltf } from '@threlte/extras'
 *
 *   let gltf = $state<ThrelteGltf>()
 *
 *   const { actions } = useGltfAnimations<'All Animations'>(() => gltf)
 *
 *   // play them whenever you need
 *   export const triggerAnimation = () => {
 *     $actions['All Animations']?.play()
 *   }
 * </script>
 *
 * <GLTF bind:gltf url="/Bengal.glb" />
 * ```
 * @param callback
 * @returns
 */
export function useGltfAnimations<
  T extends string,
  Actions extends Partial<Record<T, AnimationAction>> = Partial<Record<T, AnimationAction>>
>(
  gltf: () => ThrelteGltf | undefined,
  root?: () => Object3D | undefined
): UseGltfAnimationsReturnType<Actions> {
  const mixer = new AnimationMixer(undefined as unknown as Object3D)

  let actions = $state<Actions>({} as Actions)

  $effect(() => {
    const currentGltf = gltf()
    const resolvedRoot = root?.() ?? currentGltf?.scene

    if (!currentGltf?.animations.length || !resolvedRoot) return

    const newActions: Partial<Record<T, AnimationAction>> = {}

    for (const clip of currentGltf.animations) {
      const action = mixer.clipAction(clip, resolvedRoot)
      newActions[clip.name as T] = action
    }

    actions = newActions as Actions

    return () => {
      // if there's a mixer, we stop all running actions
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
    mixer,
    actions: {
      get current() {
        return actions
      }
    }
  }
}
