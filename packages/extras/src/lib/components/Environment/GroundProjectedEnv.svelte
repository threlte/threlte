<script lang="ts">
  import { Three } from '@threlte/core'
  import type { Mesh } from 'three'
  import type { Texture } from 'three'
  import { GroundProjectedEnv } from 'three/examples/jsm/objects/GroundProjectedEnv'
  import type { EnvironmentProps } from './Environment.svelte'

  type Props = EnvironmentProps

  export let groundProjection: Props['groundProjection']
  export let envMap: Texture
</script>

{#if envMap}
  <Three
    type={GroundProjectedEnv}
    args={[envMap]}
    {...groundProjection}
  />
{/if}
