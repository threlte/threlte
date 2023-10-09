<script lang="ts">
  import { useFrame, useThrelte, watch } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { writable } from 'svelte/store'
  import type { Camera, MeshPhongMaterial, MeshStandardMaterial } from 'three'
  import { CSM } from 'three/examples/jsm/csm/CSM'
  import { useMaterials } from './useMaterials'

  export let enabled = true
  export let params: Partial<ConstructorParameters<typeof CSM>[0]> = {}
  export let camera: Camera | undefined = undefined
  export let transform: ((csm: CSM) => CSM) | undefined = undefined

  const enabledStore = writable(enabled)
  $: enabledStore.set(enabled)

  const { camera: defaultCamera, scene } = useThrelte()

  let csm: CSM | undefined

  let nextframe = true
  let thisframe = false

  useFrame(
    () => {
      if (!csm) return
      csm.update()
      if (thisframe) {
        thisframe = false
        csm.updateFrustums()
      }
      if (nextframe) {
        nextframe = false
        thisframe = true
      }
    },
    { invalidate: false }
  )

  const { materialsQueue, allMaterials } = useMaterials()

  const setupMaterial = (material: MeshPhongMaterial | MeshStandardMaterial) => {
    // material might already be set up
    if (!csm || material.defines?.USE_CSM === 1) return
    csm.setupMaterial(material)
  }

  useFrame(
    ({ invalidate }) => {
      // we're only dealing with setting up materials in here
      if (!materialsQueue.size || !csm) return
      for (const material of materialsQueue) {
        setupMaterial(material)
      }
      materialsQueue.clear()
      invalidate()
    },
    { invalidate: false }
  )

  // set the default camera
  $: if (csm) csm.camera = camera ?? $defaultCamera

  watch([enabledStore], ([enabled]) => {
    if (!enabled) {
      if (csm) {
        csm.remove()
        csm.dispose()
        csm = undefined
      }
    } else {
      csm = new CSM({
        camera: camera ?? $defaultCamera,
        parent: scene,
        ...params
      })
      csm = transform?.(csm) ?? csm
      for (const material of allMaterials) {
        setupMaterial(material)
        // if a material is set up here, we can safely remove it from the queue
        materialsQueue.delete(material)
      }
    }
  })

  onDestroy(() => {
    if (csm) {
      csm.remove()
      csm.dispose()
      csm = undefined
    }
  })
</script>

<slot />

{#if !enabled}
  <slot name="disabled" />
{/if}
