<script lang="ts">
  import type { LOD } from 'three'
  import { Detailed } from '@threlte/extras'
  import { IcosahedronGeometry } from 'three'
  import { T, useTask } from '@threlte/core'

  type DetailItem = {
    color: number
    distance: number
  }

  const items: DetailItem[] = [
    { color: 0xff_00_00, distance: 0 },
    { color: 0x00_ff_00, distance: 3 },
    { color: 0x00_00_ff, distance: 6 }
  ]

  let detailed = $state.raw<LOD>()

  let time = 0
  useTask((delta) => {
    time += delta
    detailed?.position.setZ(3 * Math.sin(time))
  })
</script>

<Detailed bind:ref={detailed}>
  {#each items as { color, distance }, i}
    {@const detail = items.length - i - 1}
    <T.Mesh
      {distance}
      geometry={new IcosahedronGeometry(1, detail)}
      material.wireframe
      material.color={color}
    />
  {/each}
</Detailed>
