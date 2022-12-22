<script lang="ts">
	import { T, OrbitControls } from '@threlte/core'
	import { Environment, GLTF } from '@threlte/extras'
</script>

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<T.PerspectiveCamera position={[5, 2, 5]} fov={25}>
	<OrbitControls autoRotate enableDamping />
</T.PerspectiveCamera>

<T.AmbientLight />

<GLTF url="/models/helmet/DamagedHelmet.gltf" />
