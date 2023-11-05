<script lang="ts">
  import { watch } from '@threlte/core'
  import { radius, regen, width, height } from './stores'
  import { AdaptedPoissonDiscSample as Sampler } from './sampling'
  // The following component is a copy from https://fun-bit.vercel.app/
  import Bush from './assets/bush.svelte'

  let sampler = new Sampler($radius, [width, height], undefined, Math.random)
  let points = sampler.GeneratePoints()

  watch([regen, radius], () => {
    sampler = new Sampler($radius, [width, height], undefined, Math.random)
    points = sampler.GeneratePoints()
  })
</script>

{#each points as pos}
  {@const x = pos[0] - 10}
  {@const z = pos[1] - 10}
  {@const rot = Math.random() * Math.PI * 2}
  {@const scale = Math.random() * 2 + 0.5}
  <Bush
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}
