import { injectPlugin } from '@threlte/core'

export type PointerControlsOptions = {}

const pluginProps = [
  'on:click',
  'on:'
]

export const pointerControls = (options: PointerControlsOptions = {}) => {
  injectPlugin('pointer-controls', ({ ref, props }) => {
    let currentRef: THREE.Mesh = ref
    let currentProps = props

    if (!(currentRef as THREE.Mesh).isMesh) return

    console.log(currentRef)

    if (!pluginProps.some((prop) => {
      for (const key in currentProps) {
        if (key === prop) return true
      }
      return false
    })) return

    console.log('match', ref)

    return {
      pluginProps,
      onRefChange(ref) {
        currentRef = ref
        console.log('ref change')
      },
      onPropsChange(props) {
        currentProps = props
        console.log('props change')
      },
    }
  })
}
