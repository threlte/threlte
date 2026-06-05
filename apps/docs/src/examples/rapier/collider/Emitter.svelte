<script lang="ts">
  import { useTask } from '@threlte/core'
  import { Quaternion, type QuaternionTuple, type Vector3Tuple } from 'three'
  import Particle from './Particle.svelte'
  import { SvelteSet } from 'svelte/reactivity'

  interface Body {
    mounted: number
    position: Vector3Tuple
    quaternion: QuaternionTuple
  }

  let bodies = new SvelteSet<Body>()

  let lastBodyMounted = 0
  let bodyEveryMilliseconds = 100
  let longevityMilliseconds = 8000

  const quaternion = new Quaternion()

  useTask(() => {
    const now = performance.now()
    if (lastBodyMounted + bodyEveryMilliseconds < now) {
      const body: Body = {
        mounted: now,
        position: [0, 15, 0],
        quaternion: quaternion.random().toArray()
      }
      bodies.add(body)
      lastBodyMounted = now
    }

    bodies.forEach((body) => {
      if (body.mounted + longevityMilliseconds < now) {
        bodies.delete(body)
      }
    })
  })
</script>

{#each bodies as body (body)}
  <Particle {...body} />
{/each}
