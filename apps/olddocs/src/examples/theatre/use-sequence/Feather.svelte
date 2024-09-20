<script lang="ts">
  import { T } from '@threlte/core'
  import { GLTF, interactivity } from '@threlte/extras'
  import { SheetObject, useSequence } from '@threlte/theatre'

  interactivity()

  const { play, pause, position, length } = useSequence()

  let baseline: number | undefined = undefined
</script>

<T.Group
  onpointerenter={pause}
  onpointerleave={() => {
    play()
    baseline = undefined
  }}
  onpointerdown={(event) => {
    baseline = event.intersections[0].point.y
  }}
  onpointermove={(event) => {
    if (baseline) {
      const current = event.intersections[0].point.y
      const progress = (baseline - current) / 2
      $position = $position + progress * $length
      baseline = current
    }
  }}
  onpointerup={() => (baseline = undefined)}
>
  <SheetObject key="Feather">
    {#snippet children({ Transform })}
      <Transform>
        <GLTF url="/models/feather.glb" />
      </Transform>
    {/snippet}
  </SheetObject>
</T.Group>
