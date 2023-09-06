<script lang="ts">
	import { T } from '@threlte/core'
	import { Collider, RigidBody } from '@threlte/rapier'
</script>

<T.Group position.y={-0.5}>
	<T.Mesh teleportSurface>
		<T.BoxGeometry args={[10, 1, 10]} />
		<T.MeshStandardMaterial />
	</T.Mesh>
</T.Group>
