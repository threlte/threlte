import { onDestroy } from 'svelte'
import { resolve } from './resolve'
import type { Attach } from './types'

export const useAttach = <T>(instance: T, parent: any, attach?: Attach<T>) => {
  let isAttached = false
  let valueBeforeAttach: any
  let detachFn: (() => void) | undefined | void
  let attachedTo: any
  let attachedKey: string | undefined

  const update = (instance: T, parent: any, attach?: Attach<T>) => {
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
      return
    } else {
      const { target, key } = resolve(parent, attach)

      valueBeforeAttach = target[key]
      target[key] = instance
    }
    isAttached = true
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
    }
  }

  onDestroy(() => {
    detach()
  })

  return {
    update
  }
}
