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

    if (attach) {
      if (typeof attach === 'function') {
        return attach({
          ref: ref as T,
          parent: parent.current,
          parentObject3D: parentObject3D.current
        })
      } else if (isInstanceOf(attach, 'Object3D') && isInstanceOf(ref, 'Object3D')) {
        // Add to parent Object3D
        attach?.add(ref)
        return () => attach?.remove(ref)
      } else if (typeof attach === 'string') {
        const { target, key } = resolvePropertyPath(parent.current, attach)
        const valueBeforeAttach = target[key]
        target[key] = ref
        return () => (target[key] = valueBeforeAttach)
      }
    } else if (attach !== false && isInstanceOf(ref, 'Object3D')) {
      // Add to parent Object3D
      parentObject3D.current?.add(ref)
      // Build detach function
      return () => parentObject3D.current?.remove(ref)
    } else if (isObject(parent.current)) {
      // Auto-attach to parent material or geometry
      if (isInstanceOf(ref, 'Material')) {
        parent.current.material = ref
      } else if (isInstanceOf(ref, 'BufferGeometry')) {
        parent.current.geometry = ref
      }
    }
  })
}
