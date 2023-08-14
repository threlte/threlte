<script lang="ts">
  import { T, createRawEventDispatcher, forwardEventHandlers, useFrame } from '@threlte/core'
  import { onMount } from 'svelte'
  import { Box3, Group, Sphere, Vector3 } from 'three'
  import type { CenterEvents, CenterProps, CenterSlots } from './Center.svelte'
  import { injectCenterPlugin } from './centerPlugin'

  type $$Props = CenterProps
  type $$Events = CenterEvents
  type $$Slots = CenterSlots

  /** Center the object on the x-axis. If a number between -1 and 1 is provided, it will be used as the alignment on the x-axis. */
  export let x: $$Props['x'] = 0
  /** Center the object on the y-axis. If a number between -1 and 1 is provided, it will be used as the alignment on the y-axis. */
  export let y: $$Props['y'] = 0
  /** Center the object on the z-axis. If a number between -1 and 1 is provided, it will be used as the alignment on the z-axis. */
  export let z: $$Props['z'] = 0
  /** See https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject */
  export let precise: $$Props['precise'] = false
  /** Injects a plugin in all child `<T>` components to automatically center whenever a component mounts or unmounts, defaults to false */
  export let autoCenter: $$Props['autoCenter'] = false

  const dispatch = createRawEventDispatcher<$$Events>()

  const containerGroup = new Group()
  const innerGroup = new Group()
  const outerGroup = new Group()

  let mounted = false
  onMount(() => {
    mounted = true
  })

  export const calculate = () => {
    // we're only centering when the component mounted, meaning all child
    // component have been mounted as well.
    if (!mounted) return

    // return early if all axes are false
    if (x === false && y === false && z === false) return

    outerGroup.matrixWorld.identity()
    const box3 = new Box3().setFromObject(innerGroup, precise)
    const center = new Vector3()
    const sphere = new Sphere()
    const width = box3.max.x - box3.min.x
    const height = box3.max.y - box3.min.y
    const depth = box3.max.z - box3.min.z

    box3.getCenter(center)
    box3.getBoundingSphere(sphere)

    const vAlign = ((y || 0) * height) / 2
    const hAlign = ((x || 0) * width) / 2
    const dAlign = ((z || 0) * depth) / 2

    outerGroup.position.set(
      x === false ? 0 : -center.x + hAlign,
      y === false ? 0 : -center.y + vAlign,
      z === false ? 0 : -center.z + dAlign
    )

    dispatch('center', {
      boundingBox: box3,
      center: outerGroup.position.clone(),
      boundingSphere: sphere,
      container: containerGroup,
      depth,
      depthAlignment: dAlign,
      height,
      verticalAlignment: vAlign,
      width,
      horizontalAlignment: hAlign
    })
  }

  /**
   * We're only centering at most *once* per frame, so even if a lot of child
   * components request centering, it's only done *once*.
   */
  const { start: scheduleCentering, stop } = useFrame(
    ({ invalidate }) => {
      calculate()
      invalidate()
      stop()
    },
    {
      autostart: false,
      invalidate: false
    }
  )

  /** Force a recalculation of the bounding box. */
  export const center = () => {
    scheduleCentering()
  }

  /**
   * We're only recalculating when the props change and the component is
   * mounted.
   */
  $: mounted === true && x, y, z, precise, scheduleCentering()

  /**
   * Inject the center plugin if autoCenter is true. This will automatically
   * center the object whenever a child component mounts or unmounts.
   */
  if (autoCenter) injectCenterPlugin(scheduleCentering)

  const component = forwardEventHandlers()
</script>

<T
  is={containerGroup}
  {...$$restProps}
  bind:this={$component}
  let:ref
>
  <T is={outerGroup}>
    <T is={innerGroup}>
      <slot
        center={scheduleCentering}
        {ref}
      />
    </T>
  </T>
</T>
