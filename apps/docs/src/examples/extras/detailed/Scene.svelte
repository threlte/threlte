<script lang="ts">
  import { Detailed } from '@threlte/extras'
  import { IcosahedronGeometry } from 'three'
  import { T, useTask } from '@threlte/core'

  type DetailItem = {
    color: number
    distance: number
  }

  const items: DetailItem[] = [
    { color: 0xff_00_00, distance: 0 },
    { color: 0x00_ff_00, distance: 5 },
    { color: 0x00_00_ff, distance: 10 }
  ]

  let time = $state(0)
  const z = $derived(5 + 10 * Math.sin(time))

  useTask((delta) => {
    time += delta
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={18}
/>

<Detailed position.z={z}>
  {#each items as { color, distance }, i}
    {@const detail = items.length - i - 1}
    <T.Mesh
      {distance}
      geometry={new IcosahedronGeometry(1, detail)}
      material.wireframe={true}
      material.color={color}
    />
  {/each}
</Detailed>
