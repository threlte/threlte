<script lang="ts">
  import { useFrame, useThrelte, watch } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { writable } from 'svelte/store'
  import type { Camera, ColorRepresentation } from 'three'
  import type { CSMParameters } from 'three/examples/jsm/csm/CSM'
  import { CSM } from 'three/examples/jsm/csm/CSM'
  import { useMaterials } from './useMaterials'

  /**
   * Whether or not CSM is enabled. If `enabled={false}`, a slot named
   * `"disabled"` will be rendered.
   */
  export let enabled = true
  /**
   * The arguments to pass to the CSM constructor.
   */
  export let args: Partial<CSMParameters> = {}
  /**
   * The camera to use for CSM. Defaults to the camera set by `makeDefault`.
   */
  export let camera: Camera | undefined = undefined
  /**
   * A configuration callback, which is triggered when CSM is activated. This
   * callback facilitates advanced configurations, such as enabling the fade
   * feature.
   */
  export let configure: ((csm: CSM) => void) | undefined = undefined

  export let lightIntensity: number | undefined = undefined

  export let lightColor: ColorRepresentation | undefined = undefined

  export let lightDirection: { x: number; y: number; z: number } = { x: 1, y: -1, z: 1 }

  const enabledStore = writable(enabled)
  $: enabledStore.set(enabled)

  const { camera: defaultCamera, scene, size } = useThrelte()

  let csm: CSM | undefined

  useFrame(() => csm?.update(), { invalidate: false })

  const { onNewMaterial, allMaterials } = useMaterials()

  const disposeCsm = () => {
    csm?.remove()
    csm?.dispose()
    csm = undefined
  }

  $: $size, csm?.updateFrustums()

  // set any CSM props that require frustum updates
  $: if (csm) {
    csm.camera = camera ?? $defaultCamera
    if (args.maxFar !== undefined) csm.maxFar = args.maxFar
    if (args.mode !== undefined) csm.mode = args.mode

    csm.updateFrustums()
  }

  watch(enabledStore, (enabled) => {
    if (enabled) {
      csm = new CSM({
        camera: camera ?? $defaultCamera,
        parent: scene,
        ...args
      })
      configure?.(csm)
      for (const material of allMaterials) {
        csm.setupMaterial(material)
      }
      onNewMaterial((material) => csm?.setupMaterial(material))
    } else {
      onNewMaterial(undefined)
      disposeCsm()
    }
  })

  const lightIntensityStore = writable<typeof lightIntensity>(lightIntensity)
  $: lightIntensityStore.set(lightIntensity)

  const lightColorStore = writable<typeof lightColor>(lightColor)
  $: lightColorStore.set(lightColor)

  watch([lightIntensityStore, lightColorStore], () => {
    csm?.lights.map((light) => {
      if ($lightIntensityStore !== undefined) light.intensity = $lightIntensityStore
      if ($lightColorStore !== undefined) light.color.set($lightColorStore)
    })
  })

  const lightDirectionStore = writable<typeof lightDirection>(lightDirection)
  $: lightDirectionStore.set(lightDirection)

  watch([lightDirectionStore], () => {
    const { x, y, z } = $lightDirectionStore
    csm?.lightDirection.set(x, y, z).normalize()
  })

  onDestroy(disposeCsm)
</script>

<slot />

{#if !enabled}
  <slot name="disabled" />
{/if}
