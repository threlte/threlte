<script lang="ts">
  import HierarchicalObject from './HierarchicalObject.svelte'
  import type { SceneGraphObjectProperties } from './SceneGraphObject.svelte'

  let { object, children }: SceneGraphObjectProperties = $props()
</script>

<HierarchicalObject
  {object}
  onChildMount={(child) => object.add(child)}
  onChildDestroy={(child) => object.remove(child)}
>
  {@render children()}
</HierarchicalObject>
