<script lang="ts">
  import HierarchicalObject from './HierarchicalObject.svelte'
  import type { SceneGraphObjectProperties } from './SceneGraphObject.svelte'

  let { object }: SceneGraphObjectProperties = $props()
</script>

<HierarchicalObject
  {object}
  onChildMount={(child) => object.add(child)}
  onChildDestroy={(child) => object.remove(child)}
>
  <slot />
</HierarchicalObject>
