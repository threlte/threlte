<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, useThrelte } from '@threlte/core'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import { useControlsContext } from '../useControlsContext.js'
  import type { OrbitControlsProps } from './types.js'
  import type { Event, OrthographicCamera, PerspectiveCamera } from 'three'

  let { ref = $bindable(), camera: userCamera, children, ...props }: OrbitControlsProps = $props()

  const { dom, invalidate, camera: defaultCamera } = useThrelte()
  const parent = useParent()

  const camera = $derived.by(() => {
    if (userCamera) {
      return userCamera
    }

    if (
      isInstanceOf(parent.current, 'PerspectiveCamera') ||
      isInstanceOf(parent.current, 'OrthographicCamera')
    ) {
      return parent.current
    }

    return defaultCamera.current as PerspectiveCamera | OrthographicCamera
  })

  // <HTML> sets canvas pointer-events to "none" if occluding, so events must be placed on the canvas parent.
  // svelte-ignore state_referenced_locally
  const controls = new ThreeOrbitControls(camera, dom)
  $effect.pre(() => {
    controls.object = camera
  })

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
