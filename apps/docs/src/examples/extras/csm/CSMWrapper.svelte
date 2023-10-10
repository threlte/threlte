<script lang="ts">
  import { useThrelte } from '@threlte/core'
  import { CSM } from '@threlte/extras'
  import { PCFSoftShadowMap } from 'three'

  const { camera, renderer } = useThrelte()

  export let enabled = true
  export let params = {}

  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
</script>

<CSM
  {enabled}
  camera={$camera}
  {params}
  fade
>
  <slot />
</CSM>
