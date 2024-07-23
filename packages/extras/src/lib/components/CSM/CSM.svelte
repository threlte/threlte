<script lang="ts">
  import { currentWritable, useTask, useThrelte, watch } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { writable } from 'svelte/store'
  import type { Camera, ColorRepresentation, Vector3Tuple } from 'three'
  import type { CSMParameters } from 'three/examples/jsm/csm/CSM.js'
  import { CSM } from 'three/examples/jsm/csm/CSM.js'
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
  export let lightDirection: Vector3Tuple = [1, -1, 1]

  const enabledStore = writable(enabled)
  $: enabledStore.set(enabled)

  const { camera: defaultCamera, scene, size } = useThrelte()

  const csm = currentWritable<CSM | undefined>(undefined)

  useTask(() => $csm?.update(), { autoInvalidate: false })

  const { onNewMaterial, allMaterials } = useMaterials()

  const disposeCsm = () => {
    $csm?.remove()
    $csm?.dispose()
    $csm = undefined
  }

  watch([size, csm], ([_, csm]) => {
    if (!csm) return
    csm.updateFrustums()
  })

  const cameraStore = writable<Camera | undefined>(camera)
  $: cameraStore.set(camera)

  // set any CSM props that require frustum updates
  watch([defaultCamera, cameraStore, csm], ([defaultCamera, camera, csm]) => {
    if (!csm) return
    csm.camera = camera ?? defaultCamera
    if (args.maxFar !== undefined) csm.maxFar = args.maxFar
    if (args.mode !== undefined) csm.mode = args.mode
    csm.updateFrustums()
  })

  watch(enabledStore, (enabled) => {
    if (enabled) {
      $csm = new CSM({
        camera: camera ?? $defaultCamera,
        parent: scene,
        ...args
      })
      configure?.($csm)
      for (const material of allMaterials) {
        $csm.setupMaterial(material)
      }
      onNewMaterial((material) => $csm?.setupMaterial(material))
    } else {
      onNewMaterial(undefined)
      disposeCsm()
    }
  })

  const lightIntensityStore = writable<typeof lightIntensity>(lightIntensity)
  $: lightIntensityStore.set(lightIntensity)

  const lightColorStore = writable<typeof lightColor>(lightColor)
  $: lightColorStore.set(lightColor)

  watch([csm, lightIntensityStore, lightColorStore], ([csm, intensity, color]) => {
    csm?.lights.forEach((light) => {
      if (intensity !== undefined) {
        light.intensity = intensity / Math.PI
      }
      if (color !== undefined) {
        light.color.set(color)
      }
    })
  })

  const lightDirectionStore = writable(lightDirection)
  $: lightDirectionStore.set(lightDirection)

  watch([csm, lightDirectionStore], ([csm, direction]) => {
    csm?.lightDirection.set(...direction).normalize()
  })

  onDestroy(disposeCsm)
</script>

<slot />

{#if !enabled}
  <slot name="disabled" />
{/if}
