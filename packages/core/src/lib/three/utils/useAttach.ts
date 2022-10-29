import { onDestroy } from 'svelte'
import { resolve } from './resolve'
import type { Attach, Instance } from './types'

// const isMaterial = js.endsWith('Material')
//   $: if (isMaterial && !attach) {
//     ;(parent as any).material = object
//   }

//   const isGeometry = js.endsWith('Geometry')
//   $: if (isGeometry && !attach) {
//     ;(parent as any).geometry = object
//   }

//   const { setCamera } = useThrelteRoot()
//   const isCamera = js.endsWith('Camera')
//   $: if (isCamera) {
//     setCamera(object as any)
//   }

const parentIsInstance = (parent: any): parent is Instance => {
  return parent._threlte_three !== undefined
}

export const useAttach = (parent: any, instance: Instance, attach?: Attach) => {
  if (!attach && instance._threlte_three.isMaterial) attach = 'material'
  if (!attach && instance._threlte_three.isGeometry) attach = 'geometry'

  if (!attach) return

  if (typeof attach === 'function') {
    const detachFn = attach(parent, instance)
    onDestroy(() => detachFn?.())
    return
  }

  const { parent: resolvedParent, key } = resolve(parent, attach)

  if (parentIsInstance(resolvedParent)) {
    resolvedParent._threlte_three.previousAttach[key] = (resolvedParent as any)[key]
  }
  resolvedParent[key] = instance

  onDestroy(() => {
    if (parentIsInstance(resolvedParent)) {
      ;(resolvedParent as any)[key] = resolvedParent._threlte_three.previousAttach[key]
    } else {
      resolvedParent[key] = null
    }
  })
}
