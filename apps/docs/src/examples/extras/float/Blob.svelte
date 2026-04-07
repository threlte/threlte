<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Float } from '@threlte/extras'
  import { Spring } from 'svelte/motion'

  type Props = {
    children?: Snippet<[{ hovering: boolean }]>
  }

  let { children }: Props = $props()

  const scale = new Spring(1)

  let hovering = $state(false)

  const onPointerEnter = () => {
    hovering = true
    scale.set(1.1)
  }

  const onPointerLeave = () => {
    hovering = false
    scale.set(1)
  }
</script>

<Float
  floatIntensity={5}
  scale={scale.current}
  rotationIntensity={2}
  rotationSpeed={[1, 0.5, 0.2]}
  onpointerenter={onPointerEnter}
  onpointerleave={onPointerLeave}
>
  {@render children?.({ hovering })}
</Float>
