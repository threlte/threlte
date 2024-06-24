<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useScene } from '../../context/fragments/scene'
  import SceneGraphObject from '../../internal/SceneGraphObject.svelte'

  const { scene } = useScene()

  let { children }: { children: Snippet } = $props()
</script>

<SceneGraphObject object={scene}>
  {@render children()}
</SceneGraphObject>
