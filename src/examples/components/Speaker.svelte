<script lang="ts">
  import { Group, Mesh } from 'threlte'
  import type { Position, Rotation, Scale } from 'threlte'
  import { spring } from 'svelte/motion'
  import { BoxBufferGeometry, ConeBufferGeometry, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'

  export let volume: number = 0

  const smoothVolume = spring(volume)

  export let position: Position | undefined = undefined
  export let rotation: Rotation | undefined = undefined
  export let scale: Scale | undefined = undefined
</script>

<Group {position} {rotation} {scale}>
  <Group>
    <!-- CASE -->
    <Mesh
      castShadow
      receiveShadow
      position={{ y: 2.5 }}
      geometry={new BoxBufferGeometry(3, 5, 3)}
      material={new MeshStandardMaterial({
        color: 0xeedbcb
      })}
    />

    <!-- CONE -->
    <Mesh
      geometry={new ConeBufferGeometry(1, 1, 10)}
      position={{ z: 1.1, y: 3.5 }}
      scale={1 + volume}
      rotation={{ x: DEG2RAD * -90 }}
      material={new MeshStandardMaterial({
        flatShading: true,
        color: 0x111111
      })}
    />
  </Group>
</Group>
