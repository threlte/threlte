<script
  module
  lang="ts"
>
  import {
    Euler,
    Matrix4,
    Mesh,
    Object3D,
    Texture,
    Vector3,
    type EulerTuple,
    type Vector3Tuple
  } from 'three'

  const vertex = new Vector3()
  const matrixWorld = new Matrix4()
  const closestNormal = new Vector3()
  const vec3 = new Vector3()
  const object3d = new Object3D()
</script>

<script lang="ts">
  import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js'
  import { asyncWritable, T, useParent, type Props as ThrelteProps } from '@threlte/core'

  import type { Snippet } from 'svelte'
  import { useSuspense } from '../../suspense/useSuspense'
  import { useTexture } from '../../hooks/useTexture'

  interface Props extends ThrelteProps<Mesh> {
    src?: Texture | string
    position?: Vector3Tuple
    /** Euler for manual orientation or a single float for closest-vertex-normal orient */
    rotation?: EulerTuple | number
    scale?: Vector3Tuple | number
    polygonOffsetFactor?: number
    depthTest?: boolean
    ref?: Mesh
    children?: Snippet<[{ ref: Mesh }]>
  }

  let {
    depthTest = true,
    polygonOffsetFactor = -10,
    src,
    position,
    rotation,
    scale,
    ref = $bindable(),
    children,
    ...rest
  }: Props = $props()

  const parent = useParent()
  const mesh = new Mesh()
  const projectorPosition = new Vector3()
  const projectorRotation = new Euler()
  const projectorSize = new Vector3(1, 1, 1)

  const suspend = useSuspense()
  const map = $derived(
    typeof src === 'string'
      ? suspend(useTexture(src))
      : src
        ? asyncWritable<Texture>(Promise.resolve(src))
        : undefined
  )

  $effect.pre(() => {
    const parentNode = $parent as Mesh

    if (!('geometry' in parentNode)) {
      throw new Error('Decal must have a Mesh as parent or specify its "mesh" prop')
    }

    if (!$map && !children) return

    if (position !== undefined) {
      projectorPosition.fromArray(position)
    }

    if (scale !== undefined) {
      if (typeof scale === 'number') {
        projectorSize.setScalar(scale)
      } else {
        projectorSize.fromArray(scale)
      }
    }

    // Zero out the parents matrix world for this operation
    matrixWorld.copy(parentNode.matrixWorld)
    parentNode.matrixWorld.identity()

    if (rotation === undefined || typeof rotation === 'number') {
      object3d.matrixWorld.identity()
      object3d.position.copy(projectorPosition)

      // Thanks https://x.com/N8Programs !
      const vertices = parentNode.geometry.attributes.position.array
      if (parentNode.geometry.attributes.normal === undefined) {
        parentNode.geometry.computeVertexNormals()
      }
      const normal = parentNode.geometry.attributes.normal.array

      let distance = Infinity
      let chosenIdx = -1

      for (let i = 0, l = vertices.length; i < l; i += 3) {
        const distSquared = vertex.fromArray(vertices, i).distanceToSquared(object3d.position)

        if (distSquared < distance) {
          distance = distSquared
          chosenIdx = i
        }
      }

      closestNormal.fromArray(normal, chosenIdx)

      // Get vector tangent to normal
      object3d.lookAt(vec3.copy(object3d.position).add(closestNormal))
      object3d.rotateZ(Math.PI)
      object3d.rotateY(Math.PI)

      if (typeof rotation === 'number') {
        object3d.rotateZ(rotation)
      }

      projectorRotation.copy(object3d.rotation)
    } else {
      projectorRotation.fromArray(rotation)
    }

    mesh.geometry = new DecalGeometry(
      parentNode,
      projectorPosition,
      projectorRotation,
      projectorSize
    )

    // Reset parent's matixWorld
    parentNode.matrixWorld.copy(matrixWorld)

    return () => mesh.geometry.dispose()
  })
</script>

{#if $map || children}
  <T
    is={mesh}
    bind:ref
    material.transparent={true}
    material.polygonOffset={true}
    material.polygonOffsetFactor={polygonOffsetFactor}
    material.depthTest={depthTest}
    material.map={$map}
    {...rest}
  >
    {@render children?.({ ref: mesh })}
  </T>
{/if}
