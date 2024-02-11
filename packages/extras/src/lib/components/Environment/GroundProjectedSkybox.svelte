<script lang="ts">
  import { T } from '@threlte/core'
  import type { Texture } from 'three'
  import { revision } from '../../lib/revision'

  export let envMap: Texture

  const url =
    revision > 160
      ? 'three/examples/jsm/objects/GroundedSkybox'
      : 'three/examples/jsm/objects/GroundProjectedSkybox'

  const module = import(/* @vite-ignore */ url)
</script>

{#if envMap}
  {#await module then result}
    <T
      is={revision > 160 ? result.GroundedSkybox : result.GroundProjectedSkybox}
      args={[envMap]}
      {...$$restProps}
    />
  {/await}
{/if}
