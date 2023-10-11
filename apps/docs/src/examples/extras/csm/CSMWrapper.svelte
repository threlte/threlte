<script lang="ts">
  import { useThrelte } from '@threlte/core'
  import { CSM } from '@threlte/extras'
  import { PCFSoftShadowMap, Vector3 } from 'three'

  const { camera, renderer } = useThrelte()

  export let enabled = true
  export let lightDirection: { x: number; y: number; z: number }

  let params = {
    lightDirection: new Vector3()
  }

  $: params.lightDirection.set(lightDirection.x, lightDirection.y, lightDirection.z).normalize()

  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
</script>

<CSM
  {enabled}
  camera={$camera}
  {params}
  configure={(csm) => {
    // advanced CSM configuration can be handle here. configure has to return csm
    return csm
  }}
>
  <slot />
</CSM>
