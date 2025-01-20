<script lang="ts">
  import { cubicIn, cubicOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { derived } from 'svelte/store'
  import { Instance } from '@threlte/extras'

  export let position: [x: number, z: number]
  let hovering = false

  const scale = tweened(1)
  const r = tweened(255)
  const g = tweened(255)
  const b = tweened(255)
  $: if (hovering) {
    scale.set(2, {
      duration: 0,
      easing: cubicIn
    })
    r.set(254, { duration: 0 })
    g.set(61, { duration: 0 })
    b.set(0, { duration: 0 })
  } else {
    scale.set(1, {
      duration: 5e3,
      easing: cubicOut
    })
    r.set(255, { duration: 5e3 })
    g.set(255, { duration: 5e3 })
    b.set(255, { duration: 5e3 })
  }

  const color = derived([r, g, b], ([r, g, b]) => {
    return `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`
  })
</script>

<Instance
  position.x={position[0]}
  position.z={position[1]}
  position.y={$scale * 4}
  scale={$scale}
  color={$color}
  onpointerenter={() => (hovering = true)}
  onpointerleave={() => (hovering = false)}
/>
