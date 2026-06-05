<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { BufferAttribute, BufferGeometry, LineSegments } from 'three'
  import { useRapier } from '../../hooks/useRapier.js'
  import type { DebugProps } from './types.js'

  let { ref = $bindable(new LineSegments()), ...props }: DebugProps = $props()

  const { world, debug } = useRapier()

  const geometry = new BufferGeometry()
  let positionAttribute = new BufferAttribute(new Float32Array(0), 3)
  let colorAttribute = new BufferAttribute(new Float32Array(0), 4)
  geometry.setAttribute('position', positionAttribute)
  geometry.setAttribute('color', colorAttribute)

  useTask(() => {
    const { vertices, colors } = world.debugRender()

    if (positionAttribute.array.length === vertices.length) {
      positionAttribute.array.set(vertices)
      colorAttribute.array.set(colors)
      positionAttribute.needsUpdate = true
      colorAttribute.needsUpdate = true
    } else {
      // rapier returns matched vertex/color counts, so they always resize together
      geometry.dispose()
      positionAttribute = new BufferAttribute(vertices, 3)
      colorAttribute = new BufferAttribute(colors, 4)
      geometry.setAttribute('position', positionAttribute)
      geometry.setAttribute('color', colorAttribute)
    }
  })

  $effect(() => {
    debug.set(true)

    return () => {
      debug.set(false)
      geometry.dispose()
    }
  })
</script>

<T
  is={ref}
  frustumCulled={false}
  renderOrder={Infinity}
  {...props}
>
  <T is={geometry} />
  <T.LineBasicMaterial vertexColors />
</T>
