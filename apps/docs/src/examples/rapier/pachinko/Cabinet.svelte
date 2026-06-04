<script
  lang="ts"
  module
>
  const cabinetMaterial = new MeshStandardMaterial({
    color: '#1f1530',
    metalness: 0.55,
    roughness: 0.32
  })
  const trimMaterial = new MeshStandardMaterial({
    color: '#5a3a8a',
    metalness: 0.6,
    roughness: 0.28,
    emissive: '#3a1f6a',
    emissiveIntensity: 0.35
  })
</script>

<script lang="ts">
  import { T } from '@threlte/core'
  import { MeshStandardMaterial } from 'three'
  import {
    CABINET_WIDTH,
    CONTROL_PANEL_HEIGHT,
    CONTROL_PANEL_TILT,
    CONTROL_PANEL_Y,
    CROWN_HEIGHT,
    CROWN_Y,
    FIELD_HEIGHT,
    SIDE_RAIL_WIDTH
  } from './gameState.svelte'

  const halfCabinetW = CABINET_WIDTH / 2
  const rail = SIDE_RAIL_WIDTH
</script>

<!-- Slab above the playfield -->
<T.Group position={[0, CROWN_Y, 0]}>
  <T.Mesh
    castShadow
    receiveShadow
    material={cabinetMaterial}
  >
    <T.BoxGeometry args={[CABINET_WIDTH, CROWN_HEIGHT, 0.5]} />
  </T.Mesh>

  <!-- Glowing trim strip along the bottom edge of the crown -->
  <T.Mesh
    position={[0, -CROWN_HEIGHT / 2 + 0.04, 0.26]}
    material={trimMaterial}
  >
    <T.BoxGeometry args={[CABINET_WIDTH, 0.08, 0.02]} />
  </T.Mesh>
</T.Group>

<!-- Side rails-->
{#each [-1, 1] as side (side)}
  <T.Group position={[side * (halfCabinetW - rail / 2), 0, 0]}>
    <T.Mesh
      castShadow
      receiveShadow
      material={cabinetMaterial}
    >
      <T.BoxGeometry args={[rail, FIELD_HEIGHT, 0.5]} />
    </T.Mesh>

    <!-- Inner glow trim on each rail edge facing the playfield -->
    <T.Mesh
      position={[-side * (rail / 2 - 0.04), 0, 0.26]}
      material={trimMaterial}
    >
      <T.BoxGeometry args={[0.06, FIELD_HEIGHT - 0.4, 0.02]} />
    </T.Mesh>
  </T.Group>
{/each}

<!-- Control panel -->
<T.Group
  position={[0, CONTROL_PANEL_Y, 0]}
  rotation={[CONTROL_PANEL_TILT, 0, 0]}
>
  <T.Mesh
    castShadow
    receiveShadow
    position={[0, -CONTROL_PANEL_HEIGHT / 2, 0]}
    material={cabinetMaterial}
  >
    <T.BoxGeometry args={[CABINET_WIDTH, CONTROL_PANEL_HEIGHT, 0.5]} />
  </T.Mesh>

  <!-- Glowing top edge of the panel -->
  <T.Mesh
    position={[0, 0, 0.26]}
    material={trimMaterial}
  >
    <T.BoxGeometry args={[CABINET_WIDTH, 0.06, 0.02]} />
  </T.Mesh>
</T.Group>
