<script lang="ts">
  import { Group } from 'three'
  import { types, type ISheetObject, type UnknownShorthandCompoundProps } from '@theatre/core'
  import type { IScrub } from '@theatre/studio'
  import { watch, type CurrentWritable, T } from '@threlte/core'
  import { TransformControls } from '@threlte/extras'
  import { onMount, type ComponentProps } from 'svelte'
  import { RAD2DEG } from 'three/src/math/MathUtils'
  import { useStudio } from '../../studio/useStudio'
  import { getDefaultTransformer } from '../transfomers/getDefaultTransformer'
  import type Transform from './Transform.svelte'

  type Label = $$Generic<string | undefined>
  type Props = ComponentProps<Transform<Label>>

  export let label: Label = undefined as Label
  export let key: Props['key'] = undefined as Props['key']
  export let mode: Props['mode'] = 'translate' as Props['mode']

  export let sheetObject: CurrentWritable<ISheetObject>
  export let addProps: (props: UnknownShorthandCompoundProps) => void
  export let removeProps: (propNames: string[]) => void

  const group = new Group()

  const positionTransformer = getDefaultTransformer(group, 'position', 'position')
  const rotationTransformer = getDefaultTransformer(group, 'rotation', 'rotation')
  const scaleTransformer = getDefaultTransformer(group, 'scale', 'scale')

  const initTransform = () => {
    const positionProp = positionTransformer.transform(group.position)
    const rotationProp = rotationTransformer.transform(group.rotation)
    const scaleProp = scaleTransformer.transform(group.scale)

    if (key) {
      addProps({
        [key]: types.compound(
          {
            position: positionProp,
            rotation: rotationProp,
            scale: scaleProp
          },
          {
            label: label ?? key
          }
        )
      })
    } else {
      addProps({
        position: positionProp,
        rotation: rotationProp,
        scale: scaleProp
      })
    }
  }

  watch([sheetObject], ([sheetObject]) => {
    return sheetObject?.onValuesChange((values) => {
      if (!values.position || !values.rotation || !values.scale) return

      const object = key ? values[key] : values

      if (!object) return

      positionTransformer.apply(group, 'position', object.position)
      rotationTransformer.apply(group, 'rotation', object.rotation)
      scaleTransformer.apply(group, 'scale', object.scale)
    })
  })

  onMount(() => {
    initTransform()
    return () => {
      removeProps(key ? [key] : ['position', 'rotation', 'scale'])
    }
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
      if (!$sheetObject) return

      const baseTarget = key ? $sheetObject.props[key] : $sheetObject.props

      api.set(baseTarget.position as any, {
        ...group.position
      })

      api.set(baseTarget.rotation as any, {
        x: group.rotation.x * RAD2DEG,
        y: group.rotation.y * RAD2DEG,
        z: group.rotation.z * RAD2DEG
      })

      api.set(baseTarget.scale as any, {
        ...group.scale
      })
    })
  }

  const onMouseUp = () => {
    if (!scrub) return
    scrub.commit()
    scrub = undefined
  }

  const groupRef = group as any
</script>

<T
  is={groupRef}
  let:ref
>
  {#if isSelected}
    <TransformControls
      object={ref}
      {mode}
      on:mouseDown={onMouseDown}
      on:objectChange={onChange}
      on:mouseUp={onMouseUp}
    />
  {/if}

  <slot />
</T>
