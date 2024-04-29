import { onDestroy } from 'svelte'
import { Set } from 'svelte/reactivity'
import type { Object3D } from 'three'
import { useStudio } from '../../internal/extensions'
import {
  studioObjectsRegistryScope,
  type StudioObjectsRegistryActions,
  type StudioObjectsRegistryState
} from './types'

const isObject3D = (object: any): object is Object3D => {
  return 'isObject3D' in object
}
export const useStudioObjectsRegistry = () => {
  const { useExtension } = useStudio()
  const extension = useExtension<Partial<StudioObjectsRegistryState>, StudioObjectsRegistryActions>(
    studioObjectsRegistryScope
  )

  const addObject = (object: Object3D) => {
    extension.run('addObject', object)
  }

  const removeObject = (object: Object3D) => {
    extension.run('removeObject', object)
  }

  const objects = $derived(extension.state.objects ?? new Set<Object3D>())

  const isOrIsChildOfStudioObject = (object: Object3D): boolean => {
    console.log(extension.state.objects)
    extension.state.objects?.forEach((o) => console.log(o))
    if (!extension.state.objects) return false
    if (extension.state.objects.has(object)) return true
    if (object.parent) return isOrIsChildOfStudioObject(object.parent)
    return false
  }

  const studioObjectRef = <T extends Object3D>() => {
    const objects = new Set<Object3D>()

    let ref = $state<T | undefined>()

    const studioObjectsRegistry = useStudioObjectsRegistry()

    $effect(() => {
      if (!ref) return
      objects.add(ref)
      ref.traverse((node: any) => {
        if (isObject3D(node)) {
          objects.add(node)
        }
        node.userData.ignoreOverrideMaterial = true
      })
      objects.forEach((object) => {
        studioObjectsRegistry.addObject(object)
      })
    })

    onDestroy(() => {
      objects.forEach((object) => {
        studioObjectsRegistry.removeObject(object)
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
    addObject,
    removeObject,
    get objects() {
      return objects
    },
    isOrIsChildOfStudioObject,
    studioObjectRef
  }
}
