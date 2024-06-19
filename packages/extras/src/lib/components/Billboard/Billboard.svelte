<script context="module" lang="ts">
  import { type Stage, T, useTask, useThrelte } from '@threlte/core'

  let stage: Stage | undefined
</script>

<script lang="ts">
  import { Group, Quaternion } from 'three'

  import type { BillboardEvents, BillboardProps, BillboardSlots } from './Billboard.svelte'

  type $$Events = BillboardEvents
  type $$Slots = BillboardSlots

  let { follow = true, ref = $bindable(), ...props }: BillboardProps = $props()

  const inner = new Group()
  const localRef = new Group()

  const { camera, scheduler, renderStage } = useThrelte()

  const q = new Quaternion()

  let followObject = $derived(follow === true ? $camera : follow === false ? undefined : follow)

  stage ??= scheduler.createStage(Symbol('billboard-stage'), { before: renderStage })

  const { start, stop } = useTask(
    () => {
      // always face the follow object
      localRef.updateMatrix()
      localRef.updateWorldMatrix(false, false)
      localRef.getWorldQuaternion(q)
      followObject?.getWorldQuaternion(inner.quaternion).premultiply(q.invert())
    },
    { autoStart: false, stage }
  )

  $effect.pre(() => {
    if (follow) {
      start()
    } else {
      stop()
    }
  })
</script>

<T
  is={localRef}
  bind:ref
  matrixAutoUpdate={false}
  matrixWorldAutoUpdate={false}
  {...props}
>
  <T is={inner}>
    <slot ref={localRef} />
  </T>
</T>
