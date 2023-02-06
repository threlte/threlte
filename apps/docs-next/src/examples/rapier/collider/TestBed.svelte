<script lang="ts">
	import { T } from '@threlte/core'

	import { HTML } from '@threlte/extras'
	import { AutoColliders } from '@threlte/rapier'
	import { BoxGeometry, MeshStandardMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	export let title: string
	export let useGround = true
</script>

{#if useGround}
	<AutoColliders shape={'cuboid'} position={[1, -0.5, 0]}>
		<T.Mesh
			receiveShadow
			geometry={new BoxGeometry(12, 1, 10)}
			material={new MeshStandardMaterial()}
		/>
	</AutoColliders>
{/if}

<HTML
	transform
	rotation={{ z: 90 * DEG2RAD, x: -90 * DEG2RAD }}
	position={{ x: 5.8 }}
	pointerEvents={'none'}
	scale={0.6}
>
	<div class="transform -translate-y-1/2 text-black w-[500px]">
		<h2>{title}</h2>
		<div class="leading-normal">
			<slot name="text" />
		</div>
	</div>
</HTML>

<slot />
