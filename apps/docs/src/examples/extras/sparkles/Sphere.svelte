<script>
  import { T } from '@threlte/core'
	import { Sparkles } from '@threlte/extras'

	export let size = 1;
	export let amount = 50;
	export let color = 'white';
	export let emissive = 'white';

</script>


<T.Mesh {...$$restProps}>
	<T.SphereGeometry args={[size, 64, 64]} />
	<T.MeshPhysicalMaterial roughness={0} color={color} emissive={emissive || color} envMapIntensity={0.2}/>
	<Sparkles count={amount} scale={size * 2} size={6} speed={.4} color="white" />
</T.Mesh>
