<script lang="ts">
  import { cubicIn, cubicOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { derived } from 'svelte/store'
  import { Instance, type Position } from 'threlte'

  export let position: Position
  let hovering = false

  const scale = tweened(1)
  const colorTween = tweened(255)
  $: if (hovering) {
    scale.set(2, {
      duration: 0,
      easing: cubicIn
    })
    colorTween.set(0, {
      duration: 0
    })
  } else {
    scale.set(1, {
      duration: 5e3,
      easing: cubicOut
    })
    colorTween.set(255, {
      duration: 5e3
    })
  }
  const color = derived(colorTween, (c) => {
    const r = Math.floor(c)
    const g = Math.floor((c / 255) * 30)
    return `rgb(${r},${g},0)`
  })
</script>

<Instance
  position={{ ...position, y: $scale * 4 }}
  scale={$scale}
  color={$color}
  on:pointerenter={() => (hovering = true)}
  on:pointerleave={() => (hovering = false)}
/>
