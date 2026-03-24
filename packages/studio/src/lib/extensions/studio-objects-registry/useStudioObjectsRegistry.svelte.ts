import { isInstanceOf } from '@threlte/core'
import { onDestroy } from 'svelte'
import type { Object3D } from 'three'
import { useStudio } from '../../internal/extensions.js'
import {
  studioObjectsRegistryScope,
  type StudioObjectsRegistryActions,
  type StudioObjectsRegistryState
} from './types.js'

export const useStudioObjectsRegistry = () => {
  const { useExtension } = useStudio()
  const extension = useExtension<Partial<StudioObjectsRegistryState>, StudioObjectsRegistryActions>(
    studioObjectsRegistryScope
  )

  const objects = $derived(extension.state.objects ?? new Set<Object3D>())

  const isOrIsChildOfStudioObject = (object: Object3D): boolean => {
    if (!extension.state.objects) return false
    if (extension.state.objects.has(object)) return true
    if (object.parent) return isOrIsChildOfStudioObject(object.parent)
    return false
  }

  const studioObjectRef = <T extends Object3D>() => {
    const objects: Object3D[] = []

    let ref = $state<T | undefined>()

    $effect(() => {
      if (!ref) return
      objects.push(ref)
      ref.traverse((node: any) => {
        if (isInstanceOf(node, 'Object3D')) {
          objects.push(node)
        }
        node.userData.ignoreOverrideMaterial = true
      })
      new Set(objects).forEach((object) => {
        extension.addObject(object)
      })
    })

    onDestroy(() => {
      new Set(objects).forEach((object) => {
        extension.removeObject(object)
      })
    })

    return {
      get ref() {
        return ref
      },
      set ref(value: T | undefined) {
        ref = value
      }
    }
  }

  return {
    /** @reactive */
    get objects() {
      return objects
    },
    addObject: extension.addObject,
    removeObject: extension.removeObject,
    isOrIsChildOfStudioObject,
    studioObjectRef
  }
}
