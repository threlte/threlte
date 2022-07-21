<script lang="ts">
	import { Mesh, type Position } from '@threlte/core'
	import { Collider, ThirdPersonController } from '@threlte/rapier'
	import { MeshStandardMaterial } from 'three'
	import { CapsuleBufferGeometry } from 'three'

	export let position: Position | undefined = undefined
</script>

<ThirdPersonController {position} speed={3}>
	<Mesh geometry={new CapsuleBufferGeometry(0.35, 1.5)} material={new MeshStandardMaterial()} />
</ThirdPersonController>
