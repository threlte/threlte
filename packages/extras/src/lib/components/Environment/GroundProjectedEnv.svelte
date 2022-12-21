<script lang="ts">
  import { Three } from '@threlte/core'
  import type { Texture } from 'three'
  import { GroundProjectedEnv } from 'three/examples/jsm/objects/GroundProjectedEnv'

  export let envMap: Texture
</script>

{#if envMap}
  <Three
    type={GroundProjectedEnv}
    args={[envMap]}
    {...$$restProps}
  />
{/if}
