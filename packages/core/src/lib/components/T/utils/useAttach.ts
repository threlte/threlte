import { onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import type { BufferGeometry, Material, Object3D } from 'three'
import { useThrelte } from '../../../context/compounds/useThrelte'
import { createParentContext, useParent } from '../../../context/fragments/parent'
import {
  createParentObject3DContext,
  useParentObject3D
} from '../../../context/fragments/parentObject3D'
import { watch } from '../../../lib/storeUtils'
import type { BaseProps, MaybeInstance } from '../types'
import { resolvePropertyPath } from './resolvePropertyPath'

const isObject3D = (ref: unknown): ref is Object3D => {
  return typeof ref === 'object' && ref !== null && 'isObject3D' in ref
}

const isMaterial = (ref: unknown): ref is Material => {
  return typeof ref === 'object' && ref !== null && 'isMaterial' in ref
}

const isGeometry = (ref: unknown): ref is BufferGeometry => {
  return (
    typeof ref === 'object' && ref !== null && ('isGeometry' in ref || 'isBufferGeometry' in ref)
  )
}

const isObject = (ref: unknown): ref is Record<string, any> => {
  return typeof ref === 'object' && ref !== null
}

export const useAttach = <T extends MaybeInstance<any>>() => {
  const { invalidate } = useThrelte()

  let detachFn: (() => void) | void

  const attach = writable<BaseProps<T>['attach']>()

  const parent = useParent()
  const parentObject3D = useParentObject3D()

  const currentRef = createParentContext<T>()
  const object3D = createParentObject3DContext()

  watch([attach, currentRef, parent, parentObject3D], ([attach, ref, parent, parentObject3D]) => {
    // Always detach first
    detachFn?.()
    detachFn = undefined

    if (!ref) {
      invalidate()
      return
    }

    if (attach !== undefined) {
      // Manual attach
      if (attach) {
        if (typeof attach === 'function') {
          detachFn = attach({ ref: ref as T, parent, parentObject3D })
        } else if (isObject3D(attach) && isObject3D(ref)) {
          detachFn = () => attach?.remove(ref)
          // Add to parent Object3D
          attach?.add(ref)
        } else if (typeof attach === 'string') {
          const { target, key } = resolvePropertyPath(parent, attach)
          const valueBeforeAttach = target[key]
          detachFn = () => (target[key] = valueBeforeAttach)
          target[key] = ref
        }
      }
    } else {
      // Auto attach
      if (isObject3D(ref)) {
        // Build detach function
        detachFn = () => parentObject3D?.remove(ref)
        // Add to parent Object3D
        parentObject3D?.add(ref)
      } else if (isObject(parent)) {
        // Auto-attach to parent material or geometry
        if (isMaterial(ref)) {
          parent['material'] = ref
        } else if (isGeometry(ref)) {
          parent['geometry'] = ref
        }
      }
    }

    invalidate()
  })

  const updateAttach = (a: BaseProps<T>['attach']) => {
    attach.set(a)
  }

  const updateRef = (value: T) => {
    currentRef.set(value)
    if (isObject3D(value)) {
      object3D.set(value)
    }
  }

  onDestroy(() => {
    detachFn?.()
    invalidate()
  })

  return {
    updateRef,
    updateAttach
  }
}
