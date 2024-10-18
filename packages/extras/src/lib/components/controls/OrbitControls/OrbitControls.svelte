<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import { useControlsContext } from '../useControlsContext'
  import type { OrbitControlsProps } from './OrbitControls.svelte'

  let { ref = $bindable(), onchange, children, ...props }: OrbitControlsProps = $props()

  const parent = useParent()

  const { renderer, invalidate } = useThrelte()

  if (!isInstanceOf($parent, 'Camera')) {
    throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
  }

  // `<HTML> sets canvas pointer-events to "none" if occluding, so events must be placed on the canvas parent.
  const controls = new ThreeOrbitControls($parent, renderer.domElement.parentElement!)

  const { start, stop } = useTask(() => controls.update(), {
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
  orbitControls.set(controls)
  onDestroy(() => orbitControls.set(undefined))
</script>

<T
  is={controls}
  bind:ref
  onchange={(event) => {
    invalidate()
    onchange?.(event)
  }}
  {...props}
>
  {@render children?.({ ref: controls })}
</T>
