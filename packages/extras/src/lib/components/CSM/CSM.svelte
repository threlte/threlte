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
  export let transform: ((csm: CSM) => CSM) = (csm: CSM) => csm
  export let fade: boolean | undefined
  export let maxFar: number | undefined

  const enabledStore = writable(enabled)
  $: enabledStore.set(enabled)

  const { camera: defaultCamera, scene, size } = useThrelte()

  let csm: CSM | undefined

  const { start, stop } = useFrame(() => csm!.update(), {
    invalidate: false,
    autostart: false
  })

  const { onNewMaterial, allMaterials } = useMaterials()

  const disposeCSM = () => {
    csm?.remove()
    csm?.dispose()
    csm = undefined
  }

  $: $size, csm?.updateFrustums()

  // set the default camera
  $: if (csm) {
    csm.camera = camera ?? $defaultCamera

    if (fade !== undefined) csm.fade = fade
    if (maxFar !== undefined) csm.maxFar = maxFar

    csm.updateFrustums()
  }

  watch(enabledStore, (enabled) => {
    if (enabled) { 
      csm = transform(new CSM({
        camera: camera ?? $defaultCamera,
        parent: scene,
        ...params
      }))
      for (const material of allMaterials) {
        csm.setupMaterial(material)
      }
      start()
    } else {
      stop()
      disposeCSM()
    }
  })

  onNewMaterial((material) => csm?.setupMaterial(material))

  onDestroy(disposeCSM)
</script>

<slot />

{#if !enabled}
  <slot name="disabled" />
{/if}
