
<script lang="ts">
  import { T, HierarchicalObject, useThrelte } from '@threlte/core'
  import { useHeadset } from '../hooks/useHeadset'

  const { scene } = useThrelte()
  const headset = useHeadset()
</script>

<HierarchicalObject
  onChildMount={(child) => { scene.add(child) }}
  onChildDestroy={(child) => { scene.remove(child) }}
>
	<T is={headset}>
		<slot />
	</T>
</HierarchicalObject>
