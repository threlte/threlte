import { onDestroy } from 'svelte'
import { resolve } from './resolve'
import type { Attach, Instance } from './types'

const parentIsInstance = (parent: any): parent is Instance => {
  return parent._threlte_three !== undefined
}

export const useAttach = (instance: Instance, attach?: Attach) => {
  if (!attach && instance._threlte_three.isMaterial) attach = 'material'
  if (!attach && instance._threlte_three.isGeometry) attach = 'geometry'

  if (!attach) return

  if (typeof attach === 'function') {
    const detachFn = attach(instance._threlte_three.parent, instance)
    onDestroy(() => detachFn?.())
    return
  }

  const { target, key } = resolve(instance, attach)

  instance._threlte_three.valueBeforeAttach = target[key]
  target[key] = instance

  onDestroy(() => {
    if (parentIsInstance(target)) {
      ;(target as any)[key] = instance._threlte_three.valueBeforeAttach
    } else {
      target[key] = null
    }
  })
}
