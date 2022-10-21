<script lang="ts">
	import { AmbientLight, OrbitControls, PerspectiveCamera } from '@threlte/core'
	import { Environment, GLTF } from '@threlte/extras'
</script>

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<PerspectiveCamera position={{ x: 5, y: 2, z: 5 }} fov={25}>
	<OrbitControls autoRotate enableDamping />
</PerspectiveCamera>

<AmbientLight />

<GLTF url="/models/helmet/DamagedHelmet.gltf" />
