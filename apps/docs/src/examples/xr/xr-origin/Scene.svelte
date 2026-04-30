<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { OrbitControls, Text, interactivity } from '@threlte/extras'
  import {
    Controller,
    Hand,
    XR,
    XROrigin,
    pointerControls,
    useHeadset,
    useTeleport
  } from '@threlte/xr'
  import { Group } from 'three'
  import Pad from './Pad.svelte'

  interface PadTarget {
    color: string
    id: string
    label: string
    position: [number, number, number]
  }

  const pads: PadTarget[] = [
    { id: 'rose', label: 'Rose', color: '#fb7185', position: [-1.8, 0, -2.1] },
    { id: 'cyan', label: 'Cyan', color: '#22d3ee', position: [0, 0, -3.2] },
    { id: 'amber', label: 'Amber', color: '#f59e0b', position: [1.9, 0, -1.75] }
  ]

  const teleport = useTeleport()
  const headset = useHeadset()
  const feetMarker = new Group()

  let activePadId = $state('cyan')

  interactivity()
  pointerControls('left')
  pointerControls('right')

  useTask(() => {
    feetMarker.position.set(headset.position.x, 0.02, headset.position.z)
  })

  const goTo = (pad: PadTarget) => {
    activePadId = pad.id
    teleport(pad.position)
  }
</script>

<XR>
  {#snippet fallback()}
    <T.PerspectiveCamera
      makeDefault
      position={[0.2, 2.1, 3.8]}
      oncreate={(ref) => {
        ref.lookAt(0, 0.75, -1.6)
      }}
    >
      <OrbitControls
        target={[0, 0.7, -1.6]}
        enablePan={false}
      />
    </T.PerspectiveCamera>
  {/snippet}

  <T.Group
    position={[0.75, 0, 0.55]}
    rotation.y={Math.PI / 5}
  >
    <T.Mesh
      position.y={0.01}
      rotation.x={-Math.PI / 2}
      raycast={() => false}
    >
      <T.RingGeometry args={[0.22, 0.27, 48]} />
      <T.MeshStandardMaterial
        color="#fde68a"
        emissive="#f59e0b"
        emissiveIntensity={0.25}
        side={2}
      />
    </T.Mesh>

    <Text
      color="#fde68a"
      fontSize={0.085}
      anchorX="center"
      anchorY="bottom"
      position={[0, 0.16, 0]}
      raycast={() => false}
    >
      rotated rig parent
    </Text>

    <XROrigin>
      <Controller left />
      <Controller right />
      <Hand left />
      <Hand right />
    </XROrigin>
  </T.Group>
</XR>

<T is={feetMarker}>
  <T.Mesh
    rotation.x={-Math.PI / 2}
    raycast={() => false}
  >
    <T.RingGeometry args={[0.09, 0.14, 48]} />
    <T.MeshStandardMaterial
      color="#ecfeff"
      emissive="#22d3ee"
      emissiveIntensity={0.9}
      side={2}
    />
  </T.Mesh>

  <Text
    color="#cffafe"
    fontSize={0.095}
    anchorX="center"
    anchorY="bottom"
    position={[0, 0.13, 0]}
    raycast={() => false}
  >
    feet
  </Text>
</T>

<T.Mesh
  receiveShadow
  rotation.x={-Math.PI / 2}
>
  <T.CircleGeometry args={[8, 96]} />
  <T.MeshStandardMaterial color="#0f172a" />
</T.Mesh>

<T.GridHelper
  args={[16, 16, '#1f2937', '#111827']}
  position.y={0.001}
/>

{#each pads as pad}
  <Pad
    active={activePadId === pad.id}
    color={pad.color}
    label={pad.label}
    position={pad.position}
    onclick={() => goTo(pad)}
  />
{/each}

<T.Group position={[0, 1.45, 1.2]}>
  <Text
    color="#e5e7eb"
    fontSize={0.11}
    maxWidth={3.3}
    anchorX="center"
    anchorY="middle"
    textAlign="center"
    raycast={() => false}
  >
    Walk around in room-scale, then click a pad. The cyan feet marker should land exactly on the
    selected target even though the XR origin lives inside a rotated parent rig.
  </Text>
</T.Group>

<T.AmbientLight intensity={0.65} />

<T.DirectionalLight
  castShadow
  intensity={1.8}
  position={[3, 5, 2]}
  shadow.mapSize.width={1024}
  shadow.mapSize.height={1024}
  shadow.camera.top={6}
  shadow.camera.right={6}
  shadow.camera.bottom={-6}
  shadow.camera.left={-6}
/>
