<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import { useControlsContext } from '../useControlsContext'
  import type { OrbitControlsProps } from './types'

  const parent = useParent()
  const { renderer, invalidate } = useThrelte()

  if (!isInstanceOf($parent, 'Camera')) {
    throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
  }

  // <HTML> sets canvas pointer-events to "none" if occluding, so events must be placed on the canvas parent.
  let {
    ref = $bindable(new ThreeOrbitControls($parent, renderer.domElement.parentElement!)),
    children,
    ...props
  }: OrbitControlsProps = $props()

  props.onchange
  props.onstart

  const { start, stop } = useTask(() => ref.update(), {
    autoStart: false,
    autoInvalidate: false
  })

  $effect.pre(() => {
    if (props.autoRotate || props.enableDamping) {
      start()
    } else {
      stop()
    }
  })

  const { orbitControls } = useControlsContext()
  orbitControls.set(ref)
  onDestroy(() => orbitControls.set(undefined))
</script>

<T
  is={ref}
  onchange={(event) => {
    invalidate()
    props.onchange?.(event)
  }}
  {...props}
>
  {@render children?.({ ref })}
</T>
