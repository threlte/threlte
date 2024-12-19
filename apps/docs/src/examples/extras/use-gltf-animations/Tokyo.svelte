<script lang="ts">
  import { GLTF, useGltfAnimations, useDraco } from '@threlte/extras'

  const dracoLoader = useDraco()
  const { gltf, actions } = useGltfAnimations<'Take 001'>()

  $: $actions['Take 001']?.play()
</script>

<GLTF
  bind:gltf={$gltf}
  url="/models/LittlestTokyo.glb"
  {dracoLoader}
/>
