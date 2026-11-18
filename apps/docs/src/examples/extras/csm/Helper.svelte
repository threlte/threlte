<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import type { CSM } from 'three/examples/jsm/csm/CSM.js'
  import { CSMHelper } from 'three/examples/jsm/csm/CSMHelper.js'

  interface Props {
    csm: CSM
    displayFrustum: boolean
    displayPlanes: boolean
    displayShadowBounds: boolean
  }

  let { csm, displayFrustum, displayPlanes, displayShadowBounds }: Props = $props()

  const helper = $derived(new CSMHelper(csm))

  $effect(() => {
    helper.displayFrustum = displayFrustum
    helper.displayPlanes = displayPlanes
    helper.displayShadowBounds = displayShadowBounds
    helper.updateVisibility()
  })

  useTask(() => helper.update(), { autoInvalidate: false })
</script>

<T is={helper} />
