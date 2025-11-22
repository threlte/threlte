<script lang="ts">
  import { T, useStage, useTask, useThrelte } from '@threlte/core'
  import { Group, Quaternion } from 'three'
  import type { BillboardProps } from './types.js'

  let { follow = true, ref = $bindable(), children, ...props }: BillboardProps = $props()

  const inner = new Group()
  const localRef = new Group()

  const { camera, renderStage } = useThrelte()

  const q = new Quaternion()

  let followObject = $derived(follow === true ? $camera : follow === false ? undefined : follow)

  const stage = useStage('<Billboard>', { before: renderStage })

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
  {...props}
>
  <T is={inner}>
    {@render children?.({ ref: localRef })}
  </T>
</T>
