<script lang="ts">
  import {
    isInstanceOf,
    observe,
    T,
    useStage,
    useTask,
    useThrelte,
    type Plugin
  } from '@threlte/core'
  import { Box3, Group, Sphere, Vector3 } from 'three'
  import InjectPlugin from '../InjectPlugin/InjectPlugin.svelte'
  import type { AlignProps } from './types.js'

  const { renderStage } = useThrelte()

  let {
    x = 0,
    y = 0,
    z = 0,
    precise = false,
    auto = false,
    ref = $bindable(),
    onalign,
    children,
    stage = useStage('<Align>', { before: renderStage }),
    ...props
  }: AlignProps = $props()

  const group = new Group()
  const innerGroup = new Group()
  const outerGroup = new Group()

  const calculate = () => {
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

  /**
   * We're only aligning at most *once* per frame, so even if a lot of child
   * components request aligning, it's only done *once*.
   */
  const { start: scheduleAligning, stop } = useTask(
    () => {
      calculate()
      stop()
    },
    { autoStart: false, stage }
  )

  /** Manually trigger aligning */
  export const align = scheduleAligning

  observe(() => [x, y, z, precise], scheduleAligning)

  const plugin: Plugin = (args) => {
    if (!isInstanceOf(args.ref, 'Object3D')) return
    observe.pre(
      () => [args.ref],
      () => {
        if (auto) scheduleAligning()
        return () => {
          if (auto) scheduleAligning()
        }
      }
    )
  }
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  <T is={outerGroup}>
    <T is={innerGroup}>
      <InjectPlugin
        name="align"
        {plugin}
      >
        {@render children?.({ align: scheduleAligning, ref: group })}
      </InjectPlugin>
    </T>
  </T>
</T>
