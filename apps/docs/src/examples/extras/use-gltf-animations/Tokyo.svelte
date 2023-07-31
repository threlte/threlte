<script lang="ts">
  import { GLTF, useGltfAnimations } from '@threlte/extras'

  const { gltf, actions } = useGltfAnimations<'Take 001'>()

  $: $actions['Take 001']?.play()
</script>

<GLTF
  bind:gltf={$gltf}
  url="/models/LittlestTokyo.glb"
  useDraco="https://www.gstatic.com/draco/v1/decoders/"
/>
