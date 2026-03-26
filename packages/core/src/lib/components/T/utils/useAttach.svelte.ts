import { useThrelte } from '../../../context/compounds/useThrelte.js'
import { useParent } from './useParent.svelte.js'
import { useParentObject3D } from './useParentObject3D.svelte.js'
import { isInstanceOf, resolvePropertyPath } from '../../../utilities/index.js'
import type { BaseProps, MaybeInstance } from '../types.js'

const isObject = (ref: unknown): ref is Record<string, any> => {
  return typeof ref === 'object' && ref !== null
}

export const useAttach = <T extends MaybeInstance<any>>(
  getRef: () => T,
  getAttach: () => BaseProps<T>['attach']
) => {
  const { invalidate } = useThrelte()
  const attach = $derived(getAttach())
  const parent = useParent()
  const parentObject3D = useParentObject3D()

  $effect.pre(() => {
    invalidate()

    // Save the current ref in case it is destroyed / changed
    const ref = getRef()

    // Most common: auto-attach to parent Object3D
    if (attach === undefined && isInstanceOf(ref, 'Object3D')) {
      const currentParentObject3D = parentObject3D.current
      currentParentObject3D?.add(ref)
      return () => {
        invalidate()
        currentParentObject3D?.remove(ref)
      }
    }

    // Auto-attach to parent material or geometry
    if (attach === undefined && isObject(parent.current)) {
      const currentParent = parent.current

      if (isInstanceOf(ref, 'Material')) {
        const originalMaterial = currentParent.material
        currentParent.material = ref
        return () => {
          invalidate()
          currentParent.material = originalMaterial
        }
      } else if (isInstanceOf(ref, 'BufferGeometry')) {
        const originalGeometry = currentParent.geometry
        currentParent.geometry = ref
        return () => {
          invalidate()
          currentParent.geometry = originalGeometry
        }
      }
    }

    // Explicitly do not attach
    if (attach === false) {
      return () => {
        invalidate()
      }
    }

    // Custom attach function
    if (typeof attach === 'function') {
      const cleanup = attach({
        ref: ref as MaybeInstance<T>,
        parent: parent.current,
        parentObject3D: parentObject3D.current
      })
      return () => {
        invalidate()
        cleanup?.()
      }
    }

    // Attach to parent prop
    if (typeof attach === 'string') {
      const { target, key } = resolvePropertyPath(parent.current, attach)

      if (key in target) {
        // If the key is already in the target, we need to save
        // the value before attaching …
        const valueBeforeAttach = target[key]
        target[key] = ref
        return () => {
          invalidate()
          // … and restore it when the component unmounts
          target[key] = valueBeforeAttach
        }
      } else {
        // If the key is not in the target, we need to add it …
        target[key] = ref
        return () => {
          invalidate()
          // … and delete it when the component unmounts
          delete target[key]
        }
      }
    }

    // Attach to parent Object3D
    if (isInstanceOf(attach, 'Object3D') && isInstanceOf(ref, 'Object3D')) {
      attach.add(ref)
      return () => {
        invalidate()
        attach.remove(ref)
      }
    }

    return
  })
}
