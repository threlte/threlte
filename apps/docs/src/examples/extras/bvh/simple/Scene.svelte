<script lang="ts">
  import {
    OrbitControls,
    Grid,
    useGltf,
    Environment,
    Wireframe,
    bvh,
    interactivity,
    type BVHOptions
  } from '@threlte/extras'
  import { T, useTask } from '@threlte/core'
  import { BufferAttribute, DynamicDrawUsage, Mesh, Vector3, type Face } from 'three'

  let { ...rest }: BVHOptions = $props()

  const { raycaster } = interactivity()
  raycaster.firstHitOnly = true

  bvh(() => rest)

  const gltf = useGltf('/models/stanford_bunny.glb')
  const mesh = $derived($gltf ? ($gltf.nodes['Object_2'] as Mesh) : undefined)

  $effect(() => {
    if (mesh) {
      const array = new Float32Array(3 * mesh.geometry.getAttribute('position').count).fill(1)
      const attribute = new BufferAttribute(array, 3).setUsage(DynamicDrawUsage)
      mesh.geometry.setAttribute('color', attribute)
    }
  })

  const faces = new Set<Face>()

  useTask(() => {
    const attribute = mesh?.geometry.getAttribute('color')

    if (!attribute) {
      return
    }

    for (const face of faces) {
      let gb = attribute.getY(face.a)

      gb += 0.01

      if (gb >= 1) {
        gb = 1
        faces.delete(face)
      }

      attribute.setXYZ(face.a, 1, gb, gb)
      attribute.setXYZ(face.b, 1, gb, gb)
      attribute.setXYZ(face.c, 1, gb, gb)

      attribute.needsUpdate = true
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position.x={-1.3}
  position.y={1.8}
  position.z={1.8}
  fov={50}
  oncreate={(ref) => ref.lookAt(0, 0.6, 0)}
>
  <OrbitControls
    enableDamping
    enableZoom={false}
    enablePan={false}
    target={[0, 0.6, 0]}
  />
</T.PerspectiveCamera>

{#if $gltf}
  <T
    is={$gltf.nodes['Object_2'] as Mesh}
    scale={10}
    rotation.x={-Math.PI / 2}
    position.y={-0.35}
    onpointermove={({ face }) => {
      const attribute = mesh?.geometry.getAttribute('color')

      if (face && attribute) {
        attribute.setXYZ(face.a, 1, 0, 0)
        attribute.setXYZ(face.b, 1, 0, 0)
        attribute.setXYZ(face.c, 1, 0, 0)
        faces.add(face)
      }
    }}
  >
    <T.MeshStandardMaterial
      roughness={0.1}
      metalness={0.4}
      vertexColors
    />
    <Wireframe />
  </T>
{/if}

<T.DirectionalLight />

<Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" />

<Grid
  sectionThickness={1}
  infiniteGrid
  cellColor="#dddddd"
  sectionColor="#ffffff"
  sectionSize={1}
  cellSize={0.5}
  type="circular"
  fadeOrigin={new Vector3()}
  fadeDistance={20}
  fadeStrength={10}
/>
