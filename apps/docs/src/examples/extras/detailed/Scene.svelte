<script lang="ts">
  import { Detailed, OrbitControls } from '@threlte/extras'
  import { IcosahedronGeometry } from 'three'
  import { T } from '@threlte/core'

  type DetailItem = {
    color: number
    distance: number
  }

  const items: DetailItem[] = [
    { color: 0xff_00_00, distance: 0 },
    { color: 0x00_ff_00, distance: 5 },
    { color: 0x00_00_ff, distance: 10 }
  ]
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={3}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Detailed>
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
