import { onDestroy } from 'svelte'
import type { BaseProps, MaybeInstance } from '../types'
import { resolvePropertyPath } from './resolvePropertyPath'
import { useThrelte } from '../../../context/compounds/useThrelte'

const initialValueBeforeAttach = Symbol('initialValueBeforeAttach')

export const useAttach = <T>() => {
  const { invalidate } = useThrelte()

  let isAttached = false
  let valueBeforeAttach: any = initialValueBeforeAttach
  let detachFn: (() => void) | undefined | void
  // the target that the object is attached to
  let attachedTo: any
  // the property name that the object is attached to
  let attachedKey: string | undefined

  const update = (instance: MaybeInstance<T>, parent: any, attach?: BaseProps<T>['attach']) => {
    detach()

    // maybe assign 'material' or 'geometry' automatically if not specified
    if (!attach) {
      const i = instance as any
      const isMaterial = i?.isMaterial || false
      if (isMaterial) {
        attach = 'material'
      }
      const isGeometry = i?.isBufferGeometry || i?.isGeometry || false
      if (isGeometry) {
        attach = 'geometry'
      }
    }

    if (!attach) return

    if (typeof attach === 'function') {
      detachFn = attach(parent, instance)
    } else {
      const { target, key } = resolvePropertyPath(parent, attach)
      valueBeforeAttach = target[key]
      target[key] = instance
      attachedTo = target
      attachedKey = key
    }
    isAttached = true
    invalidate()
  }

  const detach = () => {
    if (!isAttached) return

    if (detachFn) {
      detachFn()
      detachFn = undefined
    } else if (attachedTo && attachedKey && valueBeforeAttach !== initialValueBeforeAttach) {
      attachedTo[attachedKey] = valueBeforeAttach
      valueBeforeAttach = initialValueBeforeAttach
      attachedTo = undefined
      attachedKey = undefined
    }
    isAttached = false
    invalidate()
  }

  onDestroy(() => {
    detach()
  })

  return {
    update
  }
}
