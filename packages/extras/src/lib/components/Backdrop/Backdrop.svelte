<script lang="ts">
  import type { BackdropProps } from './types.js'
  import { PlaneGeometry, type Group } from 'three'
  import type { Props } from '@threlte/core'
  import { T } from '@threlte/core'
  import { easeInExpo } from './easeInExpo.js'

  let {
    floor = 0.25,
    receiveShadow = false,
    segments = 20,
    ...props
  }: Omit<Props<typeof Group>, 'receiveShadow'> & BackdropProps = $props()

  const offset = 0.5

  let geometry = $derived.by(() => {
    const result = new PlaneGeometry(1, 1, segments, segments)
    const position = result.getAttribute('position')

    const length = segments + 1

    let i = 0

    for (let x = 0; x < length; x += 1) {
      for (let y = 0; y < length; y += 1) {
        const xOverSegments = x / segments
        position.setXYZ(
          i,
          xOverSegments - offset + +(x === 0) * -1 * floor,
          y / segments - offset,
          easeInExpo(xOverSegments)
        )
        i += 1
      }
    }
    position.needsUpdate = true
    result.computeVertexNormals()
    return result
  })
</script>

<T.Group {...props}>
  {#snippet children({ ref })}
    <T.Mesh
      {receiveShadow}
      rotation.x={-1 * 0.5 * Math.PI}
      rotation.z={0.5 * Math.PI}
    >
      <T is={geometry} />
      {@render children?.({ ref })}
    </T.Mesh>
  {/snippet}
</T.Group>
