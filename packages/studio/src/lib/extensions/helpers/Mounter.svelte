<script lang="ts">
  import { HierarchicalObject } from '@threlte/core'
  import type { Object3D } from 'three'

  type Props = {
    parent: Object3D
  }

  let { parent }: Props = $props()
</script>

<HierarchicalObject
  onChildMount={(child) => {
    parent.add(child)
  }}
  onChildDestroy={(child) => {
    parent.remove(child)
  }}
>
  <slot />
</HierarchicalObject>
