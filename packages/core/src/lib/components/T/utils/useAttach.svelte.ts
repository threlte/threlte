import { fromStore } from 'svelte/store'
import { useThrelte } from '../../../context/compounds/useThrelte'
import { createParentContext, useParent } from '../../../context/fragments/parent'
import {
  createParentObject3DContext,
  useParentObject3D
} from '../../../context/fragments/parentObject3D'
import { isInstanceOf, resolvePropertyPath } from '../../../utilities'
import type { BaseProps, MaybeInstance } from '../types'

const isObject = (ref: unknown): ref is Record<string, any> => {
  return typeof ref === 'object' && ref !== null
}

export const useAttach = <T extends MaybeInstance<any>>(
  getRef: () => T,
  getAttach: () => BaseProps<T>['attach']
) => {
  const { invalidate } = useThrelte()
  const ref = $derived(getRef())
  const attach = $derived(getAttach())
  const parent = fromStore(useParent())
  const parentObject3D = fromStore(useParentObject3D())
  const currentRef = createParentContext<T>()
  const object3D = createParentObject3DContext()

  $effect.pre(() => {
    currentRef.set(ref)

    if (isInstanceOf(ref, 'Object3D')) {
      object3D.set(ref)
    }

    invalidate()
  })

  $effect.pre(() => {
    invalidate()

    // Save the current ref in case it is destroyed / changed
    const current = ref

    // Most common: auto-attach to parent Object3D
    if (attach === undefined && isInstanceOf(current, 'Object3D')) {
      parentObject3D.current?.add(current)
      return () => {
        invalidate()
        parentObject3D.current?.remove(current)
      }
    }

    // Auto-attach to parent material or geometry
    if (attach === undefined && isObject(parent.current)) {
      const p = parent.current
      if (isInstanceOf(current, 'Material')) {
        const originalMaterial = p.material
        p.material = current
        return () => {
          invalidate()
          p.material = originalMaterial
        }
      } else if (isInstanceOf(current, 'BufferGeometry')) {
        const originalGeometry = p.geometry
        p.geometry = current
        return () => {
          invalidate()
          p.geometry = originalGeometry
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
        ref: current as MaybeInstance<T>,
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
      const valueBeforeAttach = target[key]
      target[key] = current
      return () => {
        invalidate()
        target[key] = valueBeforeAttach
      }
    }

    // Attach to parent Object3D
    if (isInstanceOf(attach, 'Object3D') && isInstanceOf(current, 'Object3D')) {
      attach.add(current)
      return () => {
        invalidate()
        attach.remove(current)
      }
    }

    return
  })
}
