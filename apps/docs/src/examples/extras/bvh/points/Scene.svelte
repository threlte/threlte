<script lang="ts">
  import {
    OrbitControls,
    useGltf,
    bvh,
    interactivity,
    type BVHOptions,
    PointsMaterial
  } from '@threlte/extras'
  import { T, useTask } from '@threlte/core'
  import { BufferAttribute, DynamicDrawUsage, Points, type Vector3Tuple } from 'three'

  let { ...rest }: BVHOptions & { firstHitOnly: boolean } = $props()

  const { raycaster } = interactivity()
  raycaster.params.Points.threshold = 0.5

  $effect(() => {
    raycaster.firstHitOnly = rest.firstHitOnly
  })

  bvh(() => rest)

  const gltf = useGltf('/models/stairs.glb')

  const points = $derived.by(() => {
    if (!$gltf) {
      return
    }

    const results = $gltf.nodes['Object'] as Points
    const array = new Float32Array(3 * results.geometry.getAttribute('position').count).fill(1)
    const attribute = new BufferAttribute(array, 3).setUsage(DynamicDrawUsage)
    results.geometry.setAttribute('color', attribute)

    return results
  })

  useTask(() => {
    if (!points) return

    const attribute = points.geometry.getAttribute('color')

    const indices = points.userData.indices as Set<number>
    if (indices.size > 0) {
      for (const index of indices) {
        let gb = attribute.getY(index)

        gb += 0.005

        if (gb >= 1) {
          gb = 1
          indices.delete(index)
        }

        attribute.setXYZ(index, 1, gb, gb)
      }

      attribute.needsUpdate = true
    }
  })

  let visible = $state(false)
  let point = $state.raw<Vector3Tuple>([0, 0, 0])
</script>

<T.PerspectiveCamera
  makeDefault
  position.x={20}
  position.y={20}
  position.z={-20}
  fov={50}
>
  <OrbitControls
    enableDamping
    enableZoom={false}
    enablePan={false}
  />
</T.PerspectiveCamera>

{#if points}
  <T
    is={points}
    rotation.x={-Math.PI / 2}
    userData.indices={new Set<number>()}
    onpointerenter={() => {
      visible = true
    }}
    onpointerleave={() => {
      visible = false
    }}
    onpointermove={(event) => {
      point = event.point.toArray()
      if (event.index) {
        points.geometry.getAttribute('color').setXYZ(event.index, 1, 0, 0)
        points.userData.indices.add(event.index)
      }
    }}
  >
    <PointsMaterial
      size={0.2}
      vertexColors
      transparent
      toneMapped={false}
      opacity={0.75}
    />
  </T>
{/if}

<T.Mesh
  position={point}
  renderOrder={1}
  {visible}
  bvh={{ enabled: false }}
>
  <T.SphereGeometry args={[0.5]} />
  <T.MeshBasicMaterial
    color="red"
    depthTest={false}
    transparent
    opacity={0.5}
  />
</T.Mesh>

<T.DirectionalLight />
