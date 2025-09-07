<script lang="ts">
  import { watch } from '@threlte/core'
  import { radius, regen, width, height } from './stores'
  import { AdaptedPoissonDiscSample as Sampler } from './sampling'
  // The following component started as a copy from https://fun-bit.vercel.app/
  import Bushes from './assets/bush.svelte'

  let sampler = new Sampler($radius, [width, height], undefined, Math.random)
  let points = sampler.GeneratePoints()
  addRandomValues()

  function addRandomValues() {
    for (let i = 0; i < points.length; i++) {
      points[i].push(Math.random(), Math.random())
    }
  }

  watch([regen, radius], () => {
    sampler = new Sampler($radius, [width, height], undefined, Math.random)
    points = sampler.GeneratePoints()
    addRandomValues()
  })
</script>

<Bushes transformData={points as [number, number, number, number][]} />
