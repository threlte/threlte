<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, useThrelte } from '@threlte/core'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import { useControlsContext } from '../useControlsContext.js'
  import type { OrbitControlsProps } from './types.js'
  import type { Event } from 'three'

  let { ref = $bindable(), children, ...props }: OrbitControlsProps = $props()

  const parent = useParent()
  const { dom, invalidate } = useThrelte()

  if (!isInstanceOf($parent, 'Camera')) {
    throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
  }

  // <HTML> sets canvas pointer-events to "none" if occluding, so events must be placed on the canvas parent.
  const controls = new ThreeOrbitControls($parent, dom)

  const { orbitControls } = useControlsContext()

  useTask(
    () => {
      controls.update()
    },
    {
      running: () => props.autoRotate ?? props.enableDamping ?? false
    }
  )

  $effect.pre(() => {
    const handleChange = (event: Event<any, ThreeOrbitControls>) => {
      invalidate()
      props.onchange?.(event)
    }

    orbitControls.set(controls)
    controls.addEventListener('change', handleChange)
    return () => {
      orbitControls.set(undefined)
      controls.removeEventListener('change', handleChange)
    }
  })
</script>

<T
  is={controls}
  bind:ref
  {...props}
>
  {@render children?.({ ref: controls })}
</T>
