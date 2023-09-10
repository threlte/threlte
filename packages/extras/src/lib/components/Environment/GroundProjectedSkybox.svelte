<script lang="ts">
  import { T } from '@threlte/core'
  import type { Texture } from 'three'
  import { GroundProjectedSkybox } from 'three/examples/jsm/objects/GroundProjectedSkybox.js'

  export let envMap: Texture
</script>

{#if envMap}
  <T is={GroundProjectedSkybox} args={[envMap]} {...$$restProps} />
{/if}
