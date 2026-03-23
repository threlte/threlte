<script lang="ts">
  import { T } from '@threlte/core'
  import { useGltf, useGltfAnimations, Wireframe } from '@threlte/extras'

  let { wireframeProps } = $props()

  const gltf = useGltf('https://threejs.org/examples/models/gltf/Xbot.glb')
  let { actions } = useGltfAnimations(gltf)

  $effect(() => {
    // This effect acts like an init default pose
    $actions?.['idle']?.play()
  })
</script>

<T.Group dispose={false}>
  {#await gltf then { nodes, materials }}
    <T is={nodes.Scene}>
      <T
        is={nodes.Armature}
        name="Armature"
        scale={0.01}
      >
        <T is={nodes.mixamorigHips} />
        <T.SkinnedMesh
          name="Beta_Joints"
          geometry={nodes.Beta_Joints.geometry}
          material={materials.Beta_Joints_MAT}
          skeleton={nodes.Beta_Joints.skeleton}
          castShadow
        />
        <T.SkinnedMesh
          name="Beta_Surface"
          geometry={nodes.Beta_Surface.geometry}
          material={materials['asdf1:Beta_HighLimbsGeoSG2']}
          skeleton={nodes.Beta_Surface.skeleton}
          castShadow
        >
          <Wireframe {...wireframeProps} />
        </T.SkinnedMesh>
      </T>
    </T>
  {/await}
</T.Group>
