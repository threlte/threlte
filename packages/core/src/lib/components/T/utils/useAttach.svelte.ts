import { useParent } from '../../../context/fragments/parent.js'
import { useParentObject3D } from '../../../context/fragments/parentObject3D.js'
import { useScheduler } from '../../../context/fragments/scheduler.svelte.js'
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
  const { invalidate } = useScheduler()
  const parent = useParent()
  const parentObject3D = useParentObject3D()

  $effect.pre(() => {
    invalidate()

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
      const p = parent.current
      if (isInstanceOf(currentRef, 'Material')) {
        const originalMaterial = p.material
        p.material = currentRef
        return () => {
          invalidate()
          p.material = originalMaterial
        }
      } else if (isInstanceOf(currentRef, 'BufferGeometry')) {
        const originalGeometry = p.geometry
        p.geometry = currentRef
        return () => {
          invalidate()
          p.geometry = originalGeometry
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
