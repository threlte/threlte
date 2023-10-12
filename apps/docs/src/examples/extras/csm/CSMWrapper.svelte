<script lang="ts">
  import { CSM } from '@threlte/extras'
  import { Vector3 } from 'three'

  export let enabled = true
  export let lightDirection: { x: number; y: number; z: number }

  let args = {
    lightDirection: new Vector3()
  }

  $: args.lightDirection.set(lightDirection.x, lightDirection.y, lightDirection.z).normalize()
</script>

<CSM
  {enabled}
  {args}
  configure={(csm) => {
    // advanced CSM configuration callback
    csm.fade = true
  }}
>
  <slot />
</CSM>
