import { onDestroy } from 'svelte'
import { useThrelte } from '../../hooks/useThrelte'
import { resolve } from './resolve'
import type { Props } from '../types'

export const useAttach = <T>(instance: T, parent: any, attach?: Props<T>['attach']) => {
  const { invalidate } = useThrelte()

  let isAttached = false
  let valueBeforeAttach: any
  let detachFn: (() => void) | undefined | void
  let attachedTo: any
  let attachedKey: string | undefined

  const update = (instance: T, parent: any, attach?: Props<T>['attach']) => {
    if (isAttached) {
      detach()
    }
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
      const { target, key } = resolve(parent, attach)
      valueBeforeAttach = target[key]
      target[key] = instance
    }
    isAttached = true
    invalidate()
  }

  const detach = () => {
    if (isAttached) {
      if (detachFn) {
        detachFn()
      } else if (attachedTo && attachedKey) {
        if (valueBeforeAttach) {
          attachedTo[attachedKey] = valueBeforeAttach
        } else {
          delete attachedTo[attachedKey]
        }
      }
      isAttached = false
      invalidate()
    }
  }

  onDestroy(() => {
    detach()
  })

  return {
    update
  }
}
