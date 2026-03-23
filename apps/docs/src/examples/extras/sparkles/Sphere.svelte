<script lang="ts">
  import { T } from '@threlte/core'
  import { Sparkles } from '@threlte/extras'

  interface Props {
    size?: number
    amount?: number
    color?: string
    emissive?: string
    [key: string]: any
  }

  let { size = 1, count = 100, color = 'white', emissive = 'white', ...rest }: Props = $props()
</script>

<T.Mesh {...rest}>
  <T.SphereGeometry args={[size, 64, 64]} />
  <T.MeshStandardMaterial
    roughness={0}
    metalness={0.1}
    {color}
    emissive={emissive || color}
    envMapIntensity={0.2}
  />
  <Sparkles
    {count}
    scale={size * 2}
    size={6}
    speed={0.4}
    color="white"
  />
</T.Mesh>
