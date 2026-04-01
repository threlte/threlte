import { useThrelte } from '../../../context/compounds/useThrelte.js'
import { useParent } from './useParent.svelte.js'
import { useParentObject3D } from './useParentObject3D.svelte.js'
import { isInstanceOf } from '../../../utilities/isInstanceOf.js'
import { resolvePropertyPath } from '../../../utilities/resolvePropertyPath.js'
import type { BaseProps, MaybeInstance } from '../types.js'

const isObject = (ref: unknown): ref is Record<string, any> => {
  return typeof ref === 'object' && ref !== null
}

export const useAttach = <T extends MaybeInstance<any>>(
  ref: () => T,
  attach: () => BaseProps<T>['attach']
) => {
  const { invalidate } = useThrelte()
  const parent = useParent()
  const parentObject3D = useParentObject3D()

  $effect.pre(() => {
    invalidate()

    // Save the current ref in case it is destroyed / changed
    const currentRef = ref()
    const currentAttach = attach()

    // Most common: auto-attach to parent Object3D
    if (currentAttach === undefined && isInstanceOf(currentRef, 'Object3D')) {
      const currentParent = parentObject3D.current
      currentParent?.add(currentRef)
      return () => {
        invalidate()
        currentParent?.remove(currentRef)
      }
    }

    // Auto-attach to parent material or geometry
    if (currentAttach === undefined && isObject(parent.current)) {
      const currentParent = parent.current

      if (isInstanceOf(currentRef, 'Material')) {
        const originalMaterial = currentParent.material
        currentParent.material = currentRef
        return () => {
          invalidate()
          currentParent.material = originalMaterial
        }
      } else if (isInstanceOf(currentRef, 'BufferGeometry')) {
        const originalGeometry = currentParent.geometry
        currentParent.geometry = currentRef
        return () => {
          invalidate()
          currentParent.geometry = originalGeometry
        }
      }
    }

    // Explicitly do not attach
    if (currentAttach === false) {
      return () => {
        invalidate()
      }
    }

    // Custom attach function
    if (typeof currentAttach === 'function') {
      const cleanup = currentAttach({
        ref: currentRef as MaybeInstance<T>,
        parent: parent.current,
        parentObject3D: parentObject3D.current
      })
      return () => {
        invalidate()
        cleanup?.()
      }
    }

    // Attach to parent prop
    if (typeof currentAttach === 'string') {
      const { target, key } = resolvePropertyPath(parent.current, currentAttach)

      if (key in target) {
        // If the key is already in the target, we need to save
        // the value before attaching …
        const valueBeforeAttach = target[key]
        target[key] = currentRef
        return () => {
          invalidate()
          // … and restore it when the component unmounts
          target[key] = valueBeforeAttach
        }
      } else {
        // If the key is not in the target, we need to add it …
        target[key] = currentRef
        return () => {
          invalidate()
          // … and delete it when the component unmounts
          delete target[key]
        }
      }
    }

    // Attach to parent Object3D
    if (isInstanceOf(currentAttach, 'Object3D') && isInstanceOf(currentRef, 'Object3D')) {
      currentAttach.add(currentRef)
      return () => {
        invalidate()
        currentAttach.remove(currentRef)
      }
    }

    return
  })
}
