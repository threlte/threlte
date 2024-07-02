<script lang="ts">
  import { types } from '../../theatre'
  import type { IScrub } from '@theatre/studio'
  import { T, watch } from '@threlte/core'
  import { TransformControls } from '@threlte/extras'
  import { onMount, type ComponentProps } from 'svelte'
  import { Group } from 'three'
  import type { TransformControls as TC } from 'three/examples/jsm/controls/TransformControls.js'
  import { RAD2DEG } from 'three/src/math/MathUtils.js'
  import { useStudio } from '../../studio/useStudio'
  import { getDefaultTransformer } from '../transfomers/getDefaultTransformer'
  import type { TransformProps } from './Transform.svelte'
  import { useSheet } from '../useSheet'

  type Label = $$Generic<string | undefined>

  let {
    label,
    key,
    mode = 'translate',
    space,
    translationSnap,
    rotationSnap,
    scaleSnap,
    children
  }: TransformProps<Label> = $props()

  const { sheetObject, addProps, removeProps } = useSheet()

  let controls = $state<TC | undefined>(undefined)

  $effect.pre(() => {
    if (controls) {
      if (translationSnap) {
        controls.setTranslationSnap(translationSnap)
      } else {
        controls.setTranslationSnap(null)
      }
      if (rotationSnap) {
        controls.setRotationSnap(rotationSnap)
      } else {
        controls.setRotationSnap(null)
      }
      if (scaleSnap) {
        controls.setScaleSnap(scaleSnap)
      } else {
        controls.setScaleSnap(null)
      }
    }
  })

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
      let object = values

      if (key) {
        if (!values[key]) return
        object = values[key]
      } else {
        if (!values.position || !values.rotation || !values.scale) return
      }

      // sanity check
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

  const studio = useStudio()
  let scrub: IScrub | undefined
  let isSelected = $state(false)

  watch([studio], ([studio]) => {
    return studio?.onSelectionChange((selection) => {
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

<T is={groupRef}>
  {#if isSelected}
    <TransformControls
      object={groupRef}
      {mode}
      {space}
      bind:controls
      onmouseDown={onMouseDown}
      onobjectChange={onChange}
      onmouseUp={onMouseUp}
    />
  {/if}

  {@render children?.()}
</T>
