<script lang="ts">
  import { T } from '@threlte/core'
  import type { Texture } from 'three'
  import { GroundProjectedEnv } from 'three/examples/jsm/objects/GroundProjectedEnv'

  export let envMap: Texture
</script>

{#if envMap}
  <T
    is={GroundProjectedEnv}
    args={[envMap]}
    {...$$restProps}
  />
{/if}
