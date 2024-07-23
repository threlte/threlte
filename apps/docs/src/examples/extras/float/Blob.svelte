<script lang="ts">
  import { T } from '@threlte/core'
  import { Float } from '@threlte/extras'
  import { onDestroy } from 'svelte'
  import { spring } from 'svelte/motion'
  import { Color, MeshPhysicalMaterial, type BufferGeometry } from 'three'

  export let geometry: BufferGeometry

  const red = new Color(0xfe3d00)
  const blue = new Color(0x0000ff)

  let material = new MeshPhysicalMaterial({
    color: red,
    reflectivity: 1,
    metalness: 0.9,
    roughness: 0.2
  })
  onDestroy(() => {
    material.dispose()
  })

  const scale = spring(1)

  const onPointerEnter = () => {
    material.color = blue
    scale.set(1.1)
  }

  const onPointerLeave = () => {
    material.color = red
    scale.set(1)
  }
</script>

<Float
  floatIntensity={5}
  scale={$scale}
  rotationIntensity={2}
  rotationSpeed={[1, 0.5, 0.2]}
>
  <T.Mesh
    {geometry}
    {material}
    onpointerenter={onPointerEnter}
    onpointerleave={onPointerLeave}
  />
</Float>
