import { injectPlugin } from '@threlte/core'

export const injectTeleportControlsPlugin = (): void => {
  injectPlugin('threlte-pointer-controls', ({ ref, props }) => {
    let currentRef: THREE.Mesh = ref
    let currentProps = props

    if (!currentRef.isMesh) return
    
    if ('teleportSurface' in currentProps) {

    } else if ('teleportBlocker' in currentProps) {
      
    }
  })
}