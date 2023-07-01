<script lang="ts">
  import { types, type ISheetObject, type UnknownShorthandCompoundProps } from '@theatre/core'
  import type { IScrub } from '@theatre/studio'
  import { useParent, watch, type CurrentWritable } from '@threlte/core'
  import { TransformControls } from '@threlte/extras'
  import { onDestroy, onMount, type ComponentProps } from 'svelte'
  import { RAD2DEG } from 'three/src/math/MathUtils'
  import { useStudio } from '../../studio/useStudio'
  import { getDefaultTransformer } from '../transfomers/getDefaultTransformer'
  import type Transform from './Transform.svelte'

  type Props = ComponentProps<Transform>

  export let name: Props['name'] = undefined
  export let mode: Props['mode'] = undefined

  export let sheetObject: CurrentWritable<ISheetObject>
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
      if (!values.position || !values.rotation || !values.scale || !parent) return

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

  const { studio } = useStudio()
  let scrub: IScrub | undefined

  let isSelected = false

  onMount(() => {
    return $studio?.onSelectionChange((selection) => {
      if (!$sheetObject) return
      isSelected = selection.includes($sheetObject)
    })
  })

  const onMouseDown = () => {
    if (!studio) return
    if (scrub) return
    scrub = $studio?.scrub()
  }

  const onChange = () => {
    if (!scrub) return
    scrub.capture((api) => {
      if (!$parent) return
      if (!$sheetObject) return

      const baseTarget = name ? $sheetObject.props[name] : $sheetObject.props

      api.set(baseTarget.position as any, {
        ...$parent.position
      })

      api.set(baseTarget.rotation as any, {
        x: $parent.rotation.x * RAD2DEG,
        y: $parent.rotation.y * RAD2DEG,
        z: $parent.rotation.z * RAD2DEG
      })

      api.set(baseTarget.scale as any, {
        ...$parent.scale
      })
    })
  }

  const onMouseUp = () => {
    if (!scrub) return
    scrub.commit()
    scrub = undefined
  }
</script>

{#if isSelected}
  <TransformControls
    object={$parent}
    {mode}
    on:mouseDown={onMouseDown}
    on:objectChange={onChange}
    on:mouseUp={onMouseUp}
  />
{/if}
