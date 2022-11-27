<script>
  import {Mesh} from '@threlte/core'
	import { Sparkles } from '@threlte/extras'
  import { MeshPhysicalMaterial } from 'three'
  import { SphereGeometry } from 'three'
	export let size = 1;
	export let amount = 50;
	export let color = 'white';
	export let emissive = 'white';
</script>


<Mesh
	geometry={new SphereGeometry(size, 64, 64)}
	material={new MeshPhysicalMaterial({
		roughness: 0,
		color: color,
		emissive: emissive || color,
		envMapIntensity: 0.2
		})
	}
	{...$$restProps}
>
<Sparkles count={amount} scale={size * 2} size={6} speed={0.4} color="white" />
</Mesh>
