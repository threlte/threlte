<script lang="ts">
  import { T, useTask, useParent, useThrelte } from '@threlte/core'
  import type { Camera } from 'three'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import { onDestroy } from 'svelte'
  import { useControlsContext } from '../useControlsContext'
  import type { OrbitControlsProps } from './OrbitControls.svelte'

  let { ref = $bindable(), onchange, children, ...props }: OrbitControlsProps = $props()

  const parent = useParent()

  const isCamera = (p: any): p is Camera => {
    return p.isCamera
  }

  const { renderer, invalidate } = useThrelte()

  if (!isCamera($parent)) {
    throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
  }

  const controls = new ThreeOrbitControls($parent, renderer.domElement)

  const { start, stop } = useTask(controls.update, {
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
