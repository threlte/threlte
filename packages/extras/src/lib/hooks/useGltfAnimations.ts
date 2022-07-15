import { onDestroy } from 'svelte'
import { writable, type Writable } from 'svelte/store'
import { AnimationMixer, type AnimationAction } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame } from '@threlte/core'

/**
 * Convenience hook to use animations loaded with a <GLTF> threlte component.
 *
 * ### Example
 *
 * ```svelte
 * <script lang="ts">
 *   import { GLTF } from '@threlte/core'
 *   import { useGltfAnimations } from '@threlte/extras'
 *
 *   const { gltf, actions } = useGltfAnimations<'All Animations'>(({ actions }) => {
 *     // Either play your animations as soon as they are loaded
 *     actions['All Animations']?.play()
 *   })
 *
 *   // Or play them whenever you need
 *   export const triggerAnimation = () => {
 *     $actions['All Animations']?.play()
 *   }
 * </script>
 *
 * <GLTF url={'/Bengal.glb'} bind:gltf={$gltf} />
 * ```
 * @param callback
 * @returns
 */

export function useGltfAnimations<T extends string, Actions = Partial<Record<T, AnimationAction>>>(
  callback?: (args: { actions: Actions; mixer: AnimationMixer }) => void
): {
  gltf: Writable<GLTF | undefined>
  mixer: Writable<AnimationMixer | undefined>
  actions: Writable<Actions>
}
export function useGltfAnimations<T extends string, Actions = Partial<Record<T, AnimationAction>>>(
  gltf: Writable<GLTF | undefined>,
  callback?: (args: { actions: Actions; mixer: AnimationMixer }) => void
): {
  gltf: Writable<GLTF | undefined>
  mixer: Writable<AnimationMixer | undefined>
  actions: Writable<Actions>
}
export function useGltfAnimations<T extends string, Actions = Partial<Record<T, AnimationAction>>>(
  gltfOrCallback?:
    | Writable<GLTF | undefined>
    | ((args: { actions: Actions; mixer: AnimationMixer }) => void),
  callback?: (args: { actions: Actions; mixer: AnimationMixer }) => void
): {
  gltf: Writable<GLTF | undefined>
  mixer: Writable<AnimationMixer | undefined>
  actions: Writable<Actions>
} {
  const gltf =
    gltfOrCallback && typeof gltfOrCallback !== 'function'
      ? gltfOrCallback
      : writable<GLTF | undefined>(undefined)

  const cb = gltfOrCallback && typeof gltfOrCallback === 'function' ? gltfOrCallback : callback

  const mixerStore = writable<AnimationMixer | undefined>(undefined)
  const actions = writable<Actions>({} as Actions)

  const unsubscribe = gltf.subscribe((gltf) => {
    if (!gltf || !gltf.scene || !gltf.animations.length) return
    const newMixer = new AnimationMixer(gltf.scene)
    const newActions = gltf.animations.reduce((acc, clip) => {
      const action = newMixer.clipAction(clip, newMixer.getRoot())
      return {
        ...acc,
        [clip.name as T]: action
      }
    }, {} as Actions)
    mixerStore.set(newMixer)
    actions.set(newActions)
    cb?.({
      actions: newActions,
      mixer: newMixer
    })
  })
  onDestroy(unsubscribe)

  let mixer: AnimationMixer | undefined = undefined
  const unsubscribeMixer = mixerStore.subscribe((m) => (mixer = m))
  onDestroy(unsubscribeMixer)

  useFrame(
    (_, delta) => {
      if (!mixer) return
      mixer.update(delta)
    },
    {
      debugFrameloopMessage: 'useGltfAnimations: AnimationMixer updated'
    }
  )

  return {
    gltf,
    mixer: mixerStore,
    actions
  }
}
