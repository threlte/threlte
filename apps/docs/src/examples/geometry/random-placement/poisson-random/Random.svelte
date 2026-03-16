<script lang="ts">
  import { radius, width, height } from './stores'
  import { AdaptedPoissonDiscSample as Sampler } from './sampling'
  // The following component started as a copy from https://fun-bit.vercel.app/
  import Bushes from './assets/bush.svelte'

  const sampler = $derived(new Sampler($radius, [width, height], undefined, Math.random))

  const points = $derived.by(() => {
    const results = sampler.GeneratePoints()
    for (const result of results) {
      result.push(Math.random(), Math.random())
    }

    return results
  })
</script>

<Bushes transformData={points as [number, number, number, number][]} />
