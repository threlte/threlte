<script lang="ts">
  import HierarchicalObject from './HierarchicalObject.svelte'
  import type { SceneGraphObjectProperties } from './SceneGraphObject.svelte'

  export let object: SceneGraphObjectProperties['object']
</script>

<HierarchicalObject
  {object}
  onChildMount={(child) => object.add(child)}
  onChildDestroy={(child) => object.remove(child)}
>
  <slot />
</HierarchicalObject>
