<script
  lang="ts"
  module
>
  const pegGeometry = new CylinderGeometry(0.07, 0.07, 0.4, 12)

  const PEG_BASE_EMISSIVE = 0.4
  const PEG_FLASH_EMISSIVE = 3.5
  const PEG_EMISSIVE_DECAY_PER_SEC = 9
  const PEG_CONTACT_THRESHOLD = 1.5
</script>

<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Collider, RigidBody } from '@threlte/rapier'
  import { CylinderGeometry, MeshStandardMaterial } from 'three'
  import {
    CHANNEL_X,
    FIELD_HEIGHT,
    FIELD_WIDTH,
    windmills,
    WINDMILL_CLEARANCE
  } from './gameState.svelte'

  interface Peg {
    x: number
    y: number
    material: MeshStandardMaterial
    onContact: (event: { totalForceMagnitude: number }) => void
  }

  const pegs: Peg[] = []
  const rows = 14
  const cols = 9
  const horizontalSpacing = 0.55
  const verticalSpacing = 0.5
  const fieldLeft = -FIELD_WIDTH / 2 + 0.6
  const fieldRight = CHANNEL_X - 0.7
  const fieldBottom = -FIELD_HEIGHT / 2 + 1.4
  const fieldTop = FIELD_HEIGHT / 2 - 1.6

  const insideWindmillClearance = (x: number, y: number) =>
    windmills.some(({ position: [wx, wy] }) => {
      const dx = x - wx
      const dy = y - wy
      return dx * dx + dy * dy < WINDMILL_CLEARANCE * WINDMILL_CLEARANCE
    })

  for (let r = 0; r < rows; r += 1) {
    const y = fieldBottom + r * verticalSpacing
    if (y > fieldTop) break
    const offset = r % 2 === 0 ? 0 : horizontalSpacing / 2
    for (let c = 0; c < cols; c += 1) {
      const x = fieldLeft + c * horizontalSpacing + offset
      if (x > fieldRight) break
      if (insideWindmillClearance(x, y)) continue

      const material = new MeshStandardMaterial({
        color: '#e8d68a',
        metalness: 0.85,
        roughness: 0.22,
        emissive: '#ffe080',
        emissiveIntensity: PEG_BASE_EMISSIVE
      })

      const onContact = (event: { totalForceMagnitude: number }) => {
        if (event.totalForceMagnitude < PEG_CONTACT_THRESHOLD) return
        material.emissiveIntensity = PEG_FLASH_EMISSIVE
      }

      pegs.push({ x, y, material, onContact })
    }
  }

  useTask((delta) => {
    const decay = PEG_EMISSIVE_DECAY_PER_SEC * delta

    for (const peg of pegs) {
      if (peg.material.emissiveIntensity > PEG_BASE_EMISSIVE) {
        peg.material.emissiveIntensity = Math.max(
          PEG_BASE_EMISSIVE,
          peg.material.emissiveIntensity - decay
        )
      }
    }
  })
</script>

<RigidBody type="fixed">
  {#each pegs as peg (peg)}
    <T.Group
      position={[peg.x, peg.y, 0.05]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <Collider
        shape="cylinder"
        args={[0.2, 0.07]}
        restitution={0.6}
        friction={0.05}
        contactForceEventThreshold={PEG_CONTACT_THRESHOLD}
        oncontact={peg.onContact}
      />
      <T.Mesh
        castShadow
        geometry={pegGeometry}
        material={peg.material}
      />
    </T.Group>
  {/each}
</RigidBody>
