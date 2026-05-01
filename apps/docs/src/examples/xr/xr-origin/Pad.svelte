<script lang="ts">
  import { T } from '@threlte/core'
  import { Text } from '@threlte/extras'

  interface Props {
    active?: boolean
    color: string
    label: string
    onclick?: () => void
    position: [number, number, number]
  }

  let { active = false, color, label, onclick, position }: Props = $props()
</script>

<T.Group
  {position}
  {onclick}
>
  <T.Mesh
    position.y={0.012}
    rotation.x={-Math.PI / 2}
  >
    <T.CircleGeometry args={[0.38, 48]} />
    <T.MeshStandardMaterial
      color={active ? color : '#111827'}
      emissive={color}
      emissiveIntensity={active ? 1.1 : 0.25}
      metalness={0.1}
      roughness={0.4}
    />
  </T.Mesh>

  <T.Mesh
    position.y={0.13}
    castShadow
  >
    <T.CylinderGeometry args={[0.055, 0.055, 0.26, 24]} />
    <T.MeshStandardMaterial
      {color}
      emissive={color}
      emissiveIntensity={0.2}
      metalness={0.2}
      roughness={0.45}
    />
  </T.Mesh>

  <T.Mesh
    position.y={0.021}
    rotation.x={-Math.PI / 2}
    raycast={() => false}
  >
    <T.RingGeometry args={[0.11, 0.15, 32]} />
    <T.MeshStandardMaterial
      color={active ? '#ecfeff' : '#d1d5db'}
      emissive={active ? '#67e8f9' : '#374151'}
      emissiveIntensity={active ? 0.8 : 0.1}
      side={2}
    />
  </T.Mesh>

  <Text
    color={active ? '#f9fafb' : '#d1d5db'}
    fontSize={0.11}
    anchorX="center"
    anchorY="bottom"
    position={[0, 0.32, 0]}
    raycast={() => false}
  >
    {label}
  </Text>
</T.Group>
