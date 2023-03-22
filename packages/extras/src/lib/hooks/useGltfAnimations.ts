import { currentWritable, useFrame, watch, type CurrentWritable } from '@threlte/core'
import { tick } from 'svelte'
import { writable, type Writable } from 'svelte/store'
import { AnimationClip, AnimationMixer, type AnimationAction, type Object3D } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type UseGltfAnimationsReturnType<Actions extends any> = {
  gltf: Writable<GLTF | undefined>
  mixer: CurrentWritable<AnimationMixer | undefined>
  actions: CurrentWritable<Actions>
  root: RootStore
}

type Root = Object3D
type RootStore = CurrentWritable<Root | undefined>
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
    : (undefined as Callback<Actions> | undefined)

  const rootParam = isRoot(rootOrGltfOrCallback)
    ? rootOrGltfOrCallback
    : isRoot(callbackOrRoot)
    ? callbackOrRoot
    : maybeRoot

  const root = currentWritable<Root | undefined>(rootParam)
  const actions = currentWritable<Actions>({} as Actions)
  const mixer: CurrentWritable<AnimationMixer> = currentWritable(
    new AnimationMixer(undefined as unknown as Object3D)
  )

  watch([gltf, root], ([gltf, root]) => {
    // we need to wait for the tick in certain
    // situations, so the root is properly set up
    ;(async () => {
      await tick()
      const actualRoot = root ?? gltf?.scene
      if (!gltf || !gltf.scene || !gltf.animations.length) return
      // if there's a mixer, we stop all running actions
      mixer.current.stopAllAction()
      actions.set(
        gltf.animations.reduce((acc, clip) => {
          const action = mixer.current?.clipAction(clip, actualRoot)
          return {
            ...acc,
            [clip.name as T]: action
          }
        }, {} as Actions)
      )
      cb?.({
        actions: actions.current,
        mixer: mixer.current as AnimationMixer
      })
    })()
  })

  useFrame(
    (_, delta) => {
      mixer.current.update(delta)
    },
    {
      debugFrameloopMessage: 'useGltfAnimations: AnimationMixer updated'
    }
  )

  watch(mixer, (mixer) => {
    return () => {
      mixer?.stopAllAction()
    }
  })

  return {
    gltf,
    root: root,
    mixer,
    actions
  }
}
