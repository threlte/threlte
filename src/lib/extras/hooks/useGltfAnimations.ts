import { onDestroy } from 'svelte'
import { get, writable, type Writable } from 'svelte/store'
import { AnimationMixer, type AnimationAction } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame } from '../../hooks/useFrame'

/**
 * Convenience hook to use animations loaded with a <GLTF> threlte component.
 *
 * ### Example
 *
 * ```svelte
 * <script lang="ts">
 *   import { GLTF } from 'threlte'
 *   import { useGltfAnimations } from '../lib/useAnimations'
 *
 *   const { gltf, mixer, actions } = useGltfAnimations<'action-a' | 'action-b'>((a) => {
 *     a['action-a']?.play()
 *   })
 *
 *   $: if ($mixer) $mixer.timeScale = 10
 *   $: $actions['action-a']?.play()
 * </script>
 *
 * <GLTF url={'/model.glb'} bind:gltf={$gltf} />
 * ```
 * @param callback
 * @returns
 */

export const useGltfAnimations = <T extends string, Actions = Partial<Record<T, AnimationAction>>>(
  callback?: (args: { actions: Actions; mixer: AnimationMixer }) => void
): {
  gltf: Writable<GLTF | undefined>
  mixer: Writable<AnimationMixer | undefined>
  actions: Writable<Actions>
} => {
  const gltf = writable<GLTF | undefined>(undefined)

  const mixer = writable<AnimationMixer | undefined>(undefined)
  const actions = writable<Actions>({} as Actions)

  const unsubscribe = gltf.subscribe((gltf) => {
    if (!gltf?.scene || !gltf.animations.length) return
    const newMixer = new AnimationMixer(gltf.scene)
    const newActions = gltf.animations.reduce((acc, clip) => {
      const action = newMixer.clipAction(clip, newMixer.getRoot())
      return {
        ...acc,
        [clip.name as T]: action
      }
    }, {} as Actions)
    mixer.set(newMixer)
    actions.set(newActions)
    callback?.({
      actions: newActions,
      mixer: newMixer
    })
  })
  onDestroy(unsubscribe)

  useFrame(
    (_, delta) => {
      const mx = get(mixer)
      if (!mx) return
      mx.update(delta)
    },
    {
      debugFrameloopMessage: 'useGltfAnimations: AnimationMixer updated'
    }
  )

  return {
    gltf,
    mixer,
    actions
  }
}
