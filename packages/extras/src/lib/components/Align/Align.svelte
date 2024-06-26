<script lang="ts">
  import { T, useTask, useStage, useThrelte } from '@threlte/core'
  import { onMount } from 'svelte'
  import { Box3, Group, Sphere, Vector3 } from 'three'
  import type { AlignProps } from './Align.svelte'
  import { injectAlignPlugin } from './alignPlugin'

  let {
    x = 0,
    y = 0,
    z = 0,
    precise = false,
    auto = false,
    ref = $bindable(),
    calculate = $bindable(),
    align = $bindable(),
    onalign,
		children,
    ...props
  }: AlignProps = $props()

  const { invalidate, renderStage } = useThrelte()

  const group = new Group()
  const innerGroup = new Group()
  const outerGroup = new Group()

  let mounted = $state(false)

  onMount(() => {
    mounted = true
  })

  calculate = () => {
    // we're only aligning when the component mounted, meaning all child
    // component have been mounted as well.
    if (!mounted) return

    // return early if all axes are false
    if (x === false && y === false && z === false) return

    outerGroup.matrixWorld.identity()
    const box3 = new Box3().setFromObject(innerGroup, precise)
    const align = new Vector3()
    const sphere = new Sphere()
    const width = box3.max.x - box3.min.x
    const height = box3.max.y - box3.min.y
    const depth = box3.max.z - box3.min.z

    box3.getCenter(align)
    box3.getBoundingSphere(sphere)

    const vAlign = ((y || 0) * height) / 2
    const hAlign = ((x || 0) * width) / 2
    const dAlign = ((z || 0) * depth) / 2

    outerGroup.position.set(
      x === false ? 0 : -align.x + hAlign,
      y === false ? 0 : -align.y + vAlign,
      z === false ? 0 : -align.z + dAlign
    )

    onalign?.({
      boundingBox: box3,
      center: outerGroup.position.clone(),
      boundingSphere: sphere,
      container: group,
      depth,
      depthAlignment: dAlign,
      height,
      verticalAlignment: vAlign,
      width,
      horizontalAlignment: hAlign
    })
  }

  const beforeRenderStage = useStage(Symbol('before-render'), {
    before: renderStage
  })

  /**
   * We're only aligning at most *once* per frame, so even if a lot of child
   * components request aligning, it's only done *once*.
   */
  const { start: scheduleAligning, stop } = useTask(
    () => {
      calculate()
      invalidate()
      stop()
    },
    { autoStart: false, autoInvalidate: false, stage: beforeRenderStage }
  )

  /** Force a recalculation of the bounding box. */
  align = () => {
    scheduleAligning()
  }

  /**
   * We're only recalculating when the props change and the component is
   * mounted.
   */
  $effect(() => {
    if (!mounted) return
    x
    y
    z
    precise
    scheduleAligning()
  })

  /**
   * Inject the align plugin if autoAlign is true. This will automatically
   * align the object whenever a child component mounts or unmounts.
   */
  if (auto) injectAlignPlugin(scheduleAligning)
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  <T is={outerGroup}>
    <T is={innerGroup}>
			{@render children({ align: scheduleAligning, ref: group })}
    </T>
  </T>
</T>
