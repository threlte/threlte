<script lang="ts">
  import { T } from '@threlte/core'
  import type { Texture } from 'three'
  import { revision } from '../../lib/revision'
  import * as Addons from 'three/examples/jsm/Addons'

  export let envMap: Texture
</script>

{#if envMap}
  <T
    is={revision > 160 ? Addons.GroundedSkybox : Addons.GroundProjectedSkybox}
    args={[envMap]}
    {...$$restProps}
  />
{/if}
