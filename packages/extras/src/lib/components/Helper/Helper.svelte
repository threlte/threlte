<script lang="ts">
  import { T, SceneGraphObject, useTask, useThrelte, HierarchicalObject } from '@threlte/core'
  import type { HelperProps } from './Helper.svelte'
  import type { Object3D } from 'three'

  type Type = $$Generic<Object3D>

  let { is, ref = $bindable(), ...rest }: HelperProps<Type> = $props()

  const { scene, shouldRender } = useThrelte()

  $effect.pre(() => {
    ref?.traverse((child: Object3D) => (child.raycast = () => null))
  })

  useTask(
    () => {
      if (shouldRender()) {
        ref?.update?.()
      }
    },
    { autoInvalidate: true }
  )
</script>

<HierarchicalObject>
  <SceneGraphObject object={scene}>
    <T
      bind:ref
      {is}
      {...rest}
    />
  </SceneGraphObject>
</HierarchicalObject>
