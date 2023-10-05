<script lang='ts'>
  import { useThrelte, HierarchicalObject } from '@threlte/core'

  const { scene } = useThrelte()
</script>

<HierarchicalObject
  onChildMount={(child) => scene.add(child)}
  onChildDestroy={(child) => scene.remove(child)}
>
  <slot />
</HierarchicalObject>
