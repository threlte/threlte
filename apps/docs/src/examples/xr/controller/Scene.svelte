<script lang="ts">
  import * as THREE from 'three'
  import { T, useThrelte } from '@threlte/core'
  import { XR } from '@threlte/xr'
  import Controller from './Controller.svelte'

  const { scene } = useThrelte()

  scene.fog = new THREE.Fog('black', 1.5, 2)
  scene.background = new THREE.Color('black')
</script>

<XR>
  <Controller left />
  <Controller right />
</XR>

<T.AmbientLight intensity={1.5} />
<T.DirectionalLight intensity={1.5} />
