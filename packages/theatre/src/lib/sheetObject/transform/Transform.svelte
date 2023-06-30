<script lang="ts">
  import { types, type ISheetObject, type UnknownShorthandCompoundProps } from '@theatre/core'
  import { useParent, watch, type CurrentWritable } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { getDefaultTransformer } from '../transfomers/getDefaultTransformer'

  export let name: string | undefined = undefined

  export let sheetObject: CurrentWritable<ISheetObject | undefined>
  export let addProps: (props: UnknownShorthandCompoundProps) => void
  export let removeProps: (propNames: string[]) => void

  const parent = useParent()

  if (!$parent) {
    throw new Error(
      '<Transform> must be used as a child to a component instantiating a THREE.Object3D'
    )
  }

  const positionTransformer = getDefaultTransformer($parent, 'position', 'position')
  const rotationTransformer = getDefaultTransformer($parent, 'rotation', 'rotation')
  const scaleTransformer = getDefaultTransformer($parent, 'scale', 'scale')

  const initTransform = () => {
    if (!$parent) return

    const positionProp = positionTransformer.transform($parent.position)
    const rotationProp = rotationTransformer.transform($parent.rotation)
    const scaleProp = scaleTransformer.transform($parent.scale)

    if (name) {
      addProps({
        [name]: types.compound({
          position: positionProp,
          rotation: rotationProp,
          scale: scaleProp
        })
      })
    } else {
      addProps({
        position: positionProp,
        rotation: rotationProp,
        scale: scaleProp
      })
    }
  }

  watch([parent, sheetObject], ([parent, sheetObject]) => {
    if (!parent) return

    return sheetObject?.onValuesChange((values) => {
      if (!parent) return
      const object = name ? values[name] : values

      positionTransformer.apply(parent, 'position', object.position)
      rotationTransformer.apply(parent, 'rotation', object.rotation)
      scaleTransformer.apply(parent, 'scale', object.scale)
    })
  })

  initTransform()

  onDestroy(() => {
    removeProps(name ? [name] : ['position', 'rotation', 'scale'])
  })
</script>
