<script
  lang="ts"
  context="module"
>
  const isObject3D = (value: any): value is Object3D => {
    return value && value.isObject3D
  }

  let isScrubbing = false
</script>

<script lang="ts">
  import type { ISheetObject } from '@theatre/core'
  import type { IScrub } from '@theatre/studio'
  import {
    InteractiveObject,
    TransformControls,
    useFrame,
    useParent,
    useThrelte
  } from '@threlte/core'
  import type { Object3D } from 'three'
  import { DEG2RAD, RAD2DEG } from 'three/src/math/MathUtils'
  import { globalStudio } from '../consts'
  import Object from '../Object/Object.svelte'

  export let name: string

  const parent = useParent()
  const { invalidate } = useThrelte()

  let selected = false
  let theatreObject: ISheetObject<any> | undefined = undefined

  const { start, stop } = useFrame(() => {}, { autostart: false })

  $: if (selected) {
    start()
  } else {
    stop()
  }

  let isMouseDown = false

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  let scrub: IScrub | undefined = undefined
  const onMouseDown = () => {
    scrub = $globalStudio?.scrub()
    isMouseDown = true
    isScrubbing = true
  }
  const onMouseUp = async () => {
    await wait(100)
    isScrubbing = false
    isMouseDown = false
    scrub?.commit()
    scrub = undefined
  }
  const onChange = () => {
    scrub?.capture(({ set }) => {
      if (!$parent) return
      if (!selected) return
      if (!theatreObject) return
      const { position, rotation, scale } = $parent

      set(theatreObject.props, {
        position: {
          x: position.x,
          y: position.y,
          z: position.z
        },
        rotation: {
          x: rotation.x * RAD2DEG,
          y: rotation.y * RAD2DEG,
          z: rotation.z * RAD2DEG
        },
        scale: {
          x: scale.x,
          y: scale.y,
          z: scale.z
        }
      })
    })
  }

  $globalStudio?.onSelectionChange((newSelection) => {
    if (!theatreObject) return
    if (newSelection.includes(theatreObject)) {
      selected = true
    } else {
      selected = false
    }
  })

  let mode: 'translate' | 'rotate' | 'scale' = 'translate'
  const onKeyPress = (e: KeyboardEvent) => {
    if (!selected) return
    if (e.key === 't') {
      mode = 'translate'
    }
    if (e.key === 'r') {
      mode = 'rotate'
    }
    if (e.key === 's') {
      mode = 'scale'
    }
  }
</script>

<svelte:window on:keypress={onKeyPress} />

{#if $parent && isObject3D($parent)}
  <Object
    bind:object={theatreObject}
    objectName={name}
    props={{
      position: { x: $parent.position.x, y: $parent.position.y, z: $parent.position.z },
      rotation: {
        x: $parent.rotation.x * RAD2DEG,
        y: $parent.rotation.y * RAD2DEG,
        z: $parent.rotation.z * RAD2DEG
      },
      scale: { x: $parent.scale.x, y: $parent.scale.y, z: $parent.scale.z }
    }}
    onValuesChange={(values) => {
      if (!$parent) return
      $parent.position.set(values.position.x, values.position.y, values.position.z)
      $parent.rotation.set(
        values.rotation.x * DEG2RAD,
        values.rotation.y * DEG2RAD,
        values.rotation.z * DEG2RAD
      )
      $parent.scale.set(values.scale.x, values.scale.y, values.scale.z)
      invalidate()
    }}
    let:object
  >
    <InteractiveObject
      object={$parent}
      interactive
      on:click={() => {
        // wait for the TransformControls to commit its changes
        if (isMouseDown || isScrubbing) return
        selected = !selected
        if (selected) {
          $globalStudio?.setSelection([object])
        } else {
          $globalStudio?.setSelection([])
        }
      }}
    />
  </Object>
{/if}

{#if selected && isObject3D($parent)}
  <TransformControls
    {mode}
    on:change={onChange}
    on:mouseDown={onMouseDown}
    on:mouseUp={onMouseUp}
  />
{/if}
