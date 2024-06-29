<script lang="ts">
  import { T, SceneGraphObject, useTask, useThrelte } from '@threlte/core'
  import type { HelperProps } from './Helper.svelte'
  import type { Object3D } from 'three'
  import { untrack } from 'svelte'

  type Type = $$Generic<Object3D>

  let { is, ref = $bindable(), ...rest }: HelperProps<Type> = $props()

  let localRef = $state<HelperProps<Type>['ref']>()

  $effect.pre(() => {
    if (untrack(() => ref) !== localRef) {
      ref = untrack(() => localRef)
    }
  })

  const { scene, shouldRender } = useThrelte()

  $effect.pre(() => localRef?.traverse((child: Object3D) => (child.raycast = () => null)))

  useTask(
    () => {
      if (shouldRender()) {
        localRef?.update?.()
      }
    },
    { autoInvalidate: false }
  )
</script>

<SceneGraphObject object={scene}>
  <T
    bind:ref={localRef}
    {is}
    {...rest}
  />
</SceneGraphObject>
