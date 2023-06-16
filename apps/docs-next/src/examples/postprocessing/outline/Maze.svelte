<script>
	import { T } from '@threlte/core';
</script>

<T.Mesh position={[6, 2, 4]} rotation.y={Math.PI / 2}>
	<T.MeshStandardMaterial color="silver" />
	<T.BoxGeometry args={[7, 4, 1]} />
</T.Mesh>
<T.Mesh position={[-6, 2, 4]} rotation.y={Math.PI / 2}>
	<T.MeshStandardMaterial color="silver" />
	<T.BoxGeometry args={[7, 4, 1]} />
</T.Mesh>

<T.Mesh position={[-4, 2, 0]}>
	<T.MeshStandardMaterial color="silver" />
	<T.BoxGeometry args={[5, 4, 1]} />
</T.Mesh>
<T.Mesh position={[4, 2, 0]}>
	<T.MeshStandardMaterial color="silver" />
	<T.BoxGeometry args={[5, 4, 1]} />
</T.Mesh>
<T.Mesh position={[-3, 2, 7]}>
	<T.MeshStandardMaterial color="silver" />
	<T.BoxGeometry args={[7, 4, 1]} />
</T.Mesh>
<T.Mesh position={[5, 2, 7]}>
	<T.MeshStandardMaterial color="silver" />
	<T.BoxGeometry args={[3, 4, 1]} />
</T.Mesh>
<T.Mesh position={[-1, 2, 3.5]}>
	<T.MeshStandardMaterial color="silver" />
	<T.BoxGeometry args={[10, 4, 1]} />
</T.Mesh>
