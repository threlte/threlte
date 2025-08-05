<script lang="ts">
  import Sphere from './Sphere.svelte'
  import { T } from '@threlte/core'
	import { ContactShadows, Environment, OrbitControls } from '@threlte/extras'

</script>

<T.PerspectiveCamera
	makeDefault
	position={[0,0, 12]}
	fov={30}
>
	<OrbitControls
		enableDamping
		autoRotateSpeed={0.85}
		zoomSpeed={0.75}
		minPolarAngle={Math.PI / 2.5}
		maxPolarAngle={Math.PI / 2.55}
	 />
</T.PerspectiveCamera>

<Environment
	path="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/"
	files="evening_road_01_2k.hdr"
	isBackground={false}
	groundProjection={{ height: 5, radius: 40, scale: 20 }}
/>

<ContactShadows
	renderOrder={2}
	color="black"
	resolution={1024}
	frames={1}
	scale={10}
	blur={1.5}
	opacity={0.65}
	far={0.5}
/>

<Sphere color="white" amount={50} emissive="green" position={[1, 1, -1]} />
<Sphere color="white" amount={30} emissive="purple" position={[-1.5, 0.5, -2]} size={0.5} />
<Sphere color="lightpink" amount={20} emissive="orange" position={[-1, 0.25, 1]} size={0.25} />
