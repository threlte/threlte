<script lang="ts">
  import { T, useTask } from '@threlte/core/webgpu'
  import { CSMHelper } from 'three/examples/jsm/csm/CSMHelper.js'
  import type { CSMShadowNode } from 'three/examples/jsm/csm/CSMShadowNode.js'

  interface Props {
    csm: CSMShadowNode
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
