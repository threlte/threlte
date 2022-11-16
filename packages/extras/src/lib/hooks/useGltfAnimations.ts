import { onDestroy } from 'svelte'
import { writable, type Writable } from 'svelte/store'
import { AnimationMixer, type AnimationAction, type Object3D } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame } from '@threlte/core'

type UseGltfAnimationsReturnType<Actions extends any> = {
  gltf: Writable<GLTF | undefined>
  mixer: Writable<AnimationMixer | undefined>
  actions: Writable<Actions>
}

type Root = Object3D
const isRoot = (value: any): value is Root => !!value?.isObject3D

type GltfStore = Writable<GLTF | undefined>
const isGltfStore = (value: any): value is GltfStore =>
  !!value?.subscribe && typeof value.subscribe === 'function'

type Callback<Actions extends any> = (args: { actions: Actions; mixer: AnimationMixer }) => void
const isCallback = <Actions extends any>(value: any): value is Callback<Actions> =>
  typeof value === 'function'

/**
 * Convenience hook to use animations loaded with a <GLTF> threlte component.
 *
 * ### Example
 *
 * ```svelte
 * <script lang="ts">
 *   import { GLTF, useGltfAnimations } from '@threlte/extras'
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
  root?: Root
): UseGltfAnimationsReturnType<Actions>
export function useGltfAnimations<T extends string, Actions = Partial<Record<T, AnimationAction>>>(
  gltf: GltfStore,
  root?: Root
): UseGltfAnimationsReturnType<Actions>
export function useGltfAnimations<T extends string, Actions = Partial<Record<T, AnimationAction>>>(
  callback?: Callback<Actions>,
  root?: Root
): UseGltfAnimationsReturnType<Actions>
export function useGltfAnimations<T extends string, Actions = Partial<Record<T, AnimationAction>>>(
  gltf: GltfStore,
  callback?: Callback<Actions>,
  root?: Root
): UseGltfAnimationsReturnType<Actions>

export function useGltfAnimations<T extends string, Actions = Partial<Record<T, AnimationAction>>>(
  rootOrGltfOrCallback?: Root | GltfStore | Callback<Actions>,
  callbackOrRoot?: Callback<Actions> | Root,
  maybeRoot?: Root
): UseGltfAnimationsReturnType<Actions> {
  const gltf = isGltfStore(rootOrGltfOrCallback)
    ? rootOrGltfOrCallback
    : writable<GLTF | undefined>(undefined)

  const cb = isCallback(rootOrGltfOrCallback)
    ? rootOrGltfOrCallback
    : isCallback(callbackOrRoot)
    ? callbackOrRoot
    : undefined

  const root = isRoot(rootOrGltfOrCallback)
    ? rootOrGltfOrCallback
    : isRoot(callbackOrRoot)
    ? callbackOrRoot
    : maybeRoot

  const mixerStore = writable<AnimationMixer | undefined>(undefined)
  const actions = writable<Actions>({} as Actions)

  const unsubscribe = gltf.subscribe((gltf) => {
    if (!gltf || !gltf.scene || !gltf.animations.length) return
    const newMixer = new AnimationMixer(undefined as unknown as Object3D)
    const newActions = gltf.animations.reduce((acc, clip) => {
      const action = newMixer.clipAction(clip, root ?? gltf.scene)
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
