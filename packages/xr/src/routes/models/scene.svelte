<script lang='ts'>

import { base } from '$app/paths'
import Inspector from 'three-inspect'
import { T, useThrelte } from '@threlte/core'
import { useGltf } from '@threlte/extras'
import { XR, Controllers, Hands } from '$lib'
import Cylinder from './cylinder.svelte'

const { scene, camera, renderer } = useThrelte()

camera.current.position.z = 1.75
camera.current.lookAt(0, 1.75, 1)

const viveController = useGltf(`${base}/htc_vive_controller.glb`)

if (localStorage.getItem('debug')) {
  new Inspector({
    scene,
    camera: camera.current as THREE.PerspectiveCamera,
    renderer
  })
}

</script>

<XR>
  {#if $viveController}
    <Controllers
      modelLeft={$viveController.scene.clone()}
      modelRight={$viveController.scene.clone()}
    >
      <Cylinder slot='left' color='red' />
      <Cylinder slot='right' color='red' />
    </Controllers>
  {/if}

  <Hands>
    <Cylinder slot='left' color='orange' length={0.5} />
    <Cylinder slot='right' color='orange' length={0.5} />
  </Hands>
</XR>

<T.Mesh rotation={[-Math.PI / 2, 0, 0]}>
  <T.CircleGeometry args={[1]} />
  <T.MeshBasicMaterial />
</T.Mesh>

<T.AmbientLight />
<T.DirectionalLight />
