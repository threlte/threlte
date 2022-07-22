<script lang="ts">
  import { LineSegments, useFrame } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { BufferAttribute, BufferGeometry, LineBasicMaterial } from 'three'
  import { useRapier } from '../../hooks/useRapier'

  const material = new LineBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
    depthTest: false,
    depthWrite: false
  })

  const { world } = useRapier()

  const buffers = world.debugRender()
  const vertices = new BufferAttribute(buffers.vertices, 3)
  const colors = new BufferAttribute(buffers.colors, 4)

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', vertices)
  geometry.setAttribute('color', colors)

  useFrame(() => {
    const buffers = world.debugRender()

    const vertices = new BufferAttribute(buffers.vertices, 3)
    const colors = new BufferAttribute(buffers.colors, 4)

    geometry.setAttribute('position', vertices)
    geometry.setAttribute('color', colors)
  })

  onDestroy(() => {
    geometry.dispose()
    material.dispose()
  })
</script>

<LineSegments renderOrder={Infinity} {geometry} {material} />
