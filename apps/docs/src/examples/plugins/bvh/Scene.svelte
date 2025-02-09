<script lang="ts">
  import Stats from './Stats.svelte'
  import { BufferAttribute, DynamicDrawUsage } from 'three'
  import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
  import { MeshBVHHelper } from 'three-mesh-bvh'
  import { OrbitControls, Resize, interactivity } from '@threlte/extras'
  import { T, isInstanceOf, useLoader } from '@threlte/core'
  import { bvhRaycast } from './bvh.svelte'

  let {
    color = '#000000',
    helperVisible = false,
    wireframe = false
  }: {
    color?: string
    helperVisible?: boolean
    wireframe?: boolean
  } = $props()

  bvhRaycast()

  const fbxLoader = useLoader(FBXLoader)

  const bunnyMesh = fbxLoader.load('/models/fbx/stanford-bunny.fbx').then((bunny) => {
    const mesh = bunny.getObjectByName('Stanford_Bunny')
    if (!isInstanceOf(mesh, 'Mesh')) return

    const colorAttribute = new BufferAttribute(
      new Float32Array(3 * mesh.geometry.getAttribute('position').count).fill(1),
      3,
      true
    ).setUsage(DynamicDrawUsage)

    mesh.geometry.setAttribute('color', colorAttribute)
    return mesh
  })

  interactivity({
    filter(items) {
      return items.slice(0, 1)
    }
  })

  let controlsEnabled = $state(true)

  // these variables are only read in callbacks, so they don't need to be runes/signals
  let down = false
  let r = 0
  let g = 0
  let b = 0

  const colorAsInt = $derived(parseInt(color.substring(1), 16))

  $effect(() => {
    r = ((colorAsInt >> 16) & 255) / 255
    g = ((colorAsInt >> 8) & 255) / 255
    b = ((colorAsInt >> 0) & 255) / 255
  })
</script>

<Stats />

<T.PerspectiveCamera
  makeDefault
  position.z={2}
>
  <OrbitControls enabled={controlsEnabled} />
</T.PerspectiveCamera>

{#await bunnyMesh then mesh}
  {#if mesh !== undefined}
    {@const colorAttribute = mesh.geometry.getAttribute('color')}

    <Resize>
      <T
        is={mesh}
        onpointerdown={() => {
          down = true
          controlsEnabled = false
        }}
        onpointermove={({ face }) => {
          if (down) {
            colorAttribute.setXYZ(face.a, r, g, b)
            colorAttribute.setXYZ(face.b, r, g, b)
            colorAttribute.setXYZ(face.c, r, g, b)

            colorAttribute.needsUpdate = true
          }
        }}
        onpointerup={() => {
          if (down) {
            down = false
            controlsEnabled = true
          }
        }}
        onpointerleave={() => {
          if (down) {
            down = false
            controlsEnabled = true
          }
        }}
      >
        <T.MeshBasicMaterial
          vertexColors
          {wireframe}
        />
      </T>
      <T
        visible={helperVisible}
        is={MeshBVHHelper}
        args={[mesh]}
        color="orangered"
      />
    </Resize>
  {/if}
{/await}
