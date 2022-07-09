<script lang="ts">
  import type { SceneGraphObjectProperties } from '../types/components'
  import HierarchicalObject from './HierarchicalObject.svelte'

  export let object: SceneGraphObjectProperties['object']
</script>

<HierarchicalObject
  {object}
  onChildMount={(child) => object.add(child)}
  onChildDestroy={(child) => object.remove(child)}
>
  <slot />
</HierarchicalObject>
