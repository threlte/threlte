<script lang="ts">
  import { useFrame, useThrelte, watch } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { writable } from 'svelte/store'
  import type { Camera } from 'three'
  import { CSM } from 'three/examples/jsm/csm/CSM'
  import { useMaterials } from './useMaterials'

  export let enabled = true
  export let params: Partial<ConstructorParameters<typeof CSM>[0]> = {}
  export let camera: Camera | undefined = undefined
  export let configure: (csm: CSM) => CSM = (csm: CSM) => csm

  const enabledStore = writable(enabled)
  $: enabledStore.set(enabled)

  const { camera: defaultCamera, scene, size } = useThrelte()

  let csm: CSM | undefined

  useFrame(() => csm?.update(), { invalidate: false })

  const { onNewMaterial, allMaterials } = useMaterials()

  const disposeCSM = () => {
    csm?.remove()
    csm?.dispose()
    csm = undefined
  }

  $: $size, csm?.updateFrustums()

  // set any CSM props that require frustum updates
  $: if (csm) {
    csm.camera = camera ?? $defaultCamera
    if (params.maxFar !== undefined) csm.maxFar = params.maxFar
    if (params.mode !== undefined) csm.mode = params.mode

    csm.updateFrustums()
  }

  watch(enabledStore, (enabled) => {
    if (enabled) {
      csm = configure(
        new CSM({
          camera: camera ?? $defaultCamera,
          parent: scene,
          ...params
        })
      )
      for (const material of allMaterials) {
        csm.setupMaterial(material)
      }
      onNewMaterial((material) => csm?.setupMaterial(material))
    } else {
      onNewMaterial(null)
      disposeCSM()
    }
  })

  onDestroy(disposeCSM)
</script>

<slot />

{#if !enabled}
  <slot name="disabled" />
{/if}
