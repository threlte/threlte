<script lang="ts">
  import type { Object3D } from 'three'
  import HierarchicalObject from './HierarchicalObject.svelte'
  import type { SceneGraphObjectProperties } from './SceneGraphObject.svelte'

  let { object, children }: SceneGraphObjectProperties = $props()

  const onChildMount = (obj: Object3D) => {
    object.add(obj)
  }
  const onChildDestroy = (obj: Object3D) => {
    object.remove(obj)
  }
</script>

<HierarchicalObject
  {object}
  {onChildMount}
  {onChildDestroy}
>
  {@render children()}
</HierarchicalObject>
