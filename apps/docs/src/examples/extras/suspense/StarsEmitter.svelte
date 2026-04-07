<script lang="ts">
  import { T } from '@threlte/core'
  import { InstancedMesh } from '@threlte/extras'
  import Star from './Star.svelte'
</script>

<InstancedMesh>
  <T.BoxGeometry args={[0.1, 0.1, 30]} />
  <T.MeshBasicMaterial
    color="white"
    transparent
    opacity={0.2}
  />

  {#each { length: 40 }}
    <Star />
  {/each}
</InstancedMesh>
