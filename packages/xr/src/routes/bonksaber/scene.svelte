<script lang='ts'>

import * as THREE from 'three'
import { T, useThrelte } from '@threlte/core'
import { XR } from '$lib'
import Sabers from './sabers.svelte'
import Blocks from './blocks.svelte'

const { scene } = useThrelte()

scene.background = new THREE.Color('black')

</script>

<XR>
  <Sabers />
  <Blocks />
</XR>

<T.AmbientLight />
<T.DirectionalLight />

<!-- floor -->
<T.Mesh position.y={-50}>
  <T.CylinderGeometry args={[2, 2, 100]} />
  <T.MeshStandardMaterial color='white' />
</T.Mesh>
