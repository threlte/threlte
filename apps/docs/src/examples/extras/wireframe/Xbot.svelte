<script>
  import { Group } from 'three'

  import { useGltf, useGltfAnimations } from '@threlte/extras'

  let { fallback, error, children, ref = $bindable(), ...props } = $props()

  ref = new Group()

  const gltf = useGltf('https://threejs.org/examples/models/gltf/Xbot.glb')

  export const { actions, mixer } = useGltfAnimations(gltf, ref)
</script>

<T
  is={ref}
  dispose={false}
  {...props}
>
  {#await gltf}
    {@render fallback?.()}
  {:then gltf}
    <T.Group name="Scene">
      <T.Group
        name="Armature"
        scale={0.01}
      >
        <T is={gltf.nodes.mixamorigHips} />
        <T.SkinnedMesh
          name="Beta_Joints"
          geometry={gltf.nodes.Beta_Joints.geometry}
          material={gltf.materials.Beta_Joints_MAT}
          skeleton={gltf.nodes.Beta_Joints.skeleton}
        />
        <T.SkinnedMesh
          name="Beta_Surface"
          geometry={gltf.nodes.Beta_Surface.geometry}
          material={gltf.materials['asdf1:Beta_HighLimbsGeoSG2']}
          skeleton={gltf.nodes.Beta_Surface.skeleton}
        />
      </T.Group>
    </T.Group>
  {:catch err}
    {@render error?.({ error: err })}
  {/await}

  {@render children?.({ ref })}
</T>
