<script lang="ts">
  import { observe, useTask, useThrelte } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import type { Camera, ColorRepresentation, Vector3Tuple } from 'three'
  import type { CSMParameters } from 'three/examples/jsm/csm/CSM.js'
  import { CSM } from 'three/examples/jsm/csm/CSM.js'
  import { useMaterials } from './useMaterials.svelte.js'

  interface Props {
    /**
     * Whether or not CSM is enabled. If `enabled={false}`, a slot named
     * `"disabled"` will be rendered.
     */
    enabled?: boolean
    /**
     * The arguments to pass to the CSM constructor.
     */
    args?: Partial<CSMParameters>
    /**
     * The camera to use for CSM. Defaults to the camera set by `makeDefault`.
     */
    camera?: Camera | undefined
    /**
     * A configuration callback, which is triggered when CSM is activated. This
     * callback facilitates advanced configurations, such as enabling the fade
     * feature.
     */
    configure?: ((csm: CSM) => void) | undefined

    lightIntensity?: number | undefined
    lightColor?: ColorRepresentation | undefined
    lightDirection?: Vector3Tuple
    children?: Snippet
    fallback?: Snippet
  }

  let {
    enabled = true,
    args = {},
    camera,
    configure,
    lightIntensity,
    lightColor,
    lightDirection = [1, -1, 1],
    children,
    fallback
  }: Props = $props()

  const { camera: defaultCamera, scene, size } = useThrelte()

  let csm = $state.raw<CSM>()

  useTask(() => csm?.update(), { autoInvalidate: false })

  const { onNewMaterial, allMaterials } = useMaterials()

  const disposeCsm = () => {
    csm?.remove()
    csm?.dispose()
    csm = undefined
  }

  observe(
    () => [enabled],
    ([enabled]) => {
      if (enabled) {
        const nextCSM = new CSM({
          camera: camera ?? $defaultCamera,
          parent: scene,
          ...args
        })
        configure?.(nextCSM)
        for (const material of allMaterials) {
          nextCSM.setupMaterial(material)
        }
        onNewMaterial((material) => nextCSM.setupMaterial(material))
        csm = nextCSM
      } else {
        onNewMaterial(undefined)
        disposeCsm()
      }
    }
  )

  observe(
    () => [size, csm],
    ([, csm]) => {
      csm?.updateFrustums()
    }
  )

  // set any CSM props that require frustum updates
  observe(
    () => [defaultCamera, camera, csm],
    ([defaultCamera, camera, csm]) => {
      if (!csm) return
      csm.camera = camera ?? defaultCamera
      if (args.maxFar !== undefined) csm.maxFar = args.maxFar
      if (args.mode !== undefined) csm.mode = args.mode
      csm.updateFrustums()
    }
  )

  observe(
    () => [csm, lightIntensity, lightColor],
    ([csm, intensity, color]) => {
      csm?.lights.forEach((light) => {
        if (intensity !== undefined) {
          light.intensity = intensity / Math.PI
        }
        if (color !== undefined) {
          light.color.set(color)
        }
      })
    }
  )

  observe(
    () => [csm, lightDirection],
    ([csm, direction]) => {
      csm?.lightDirection.set(...direction).normalize()
    }
  )

  $effect.pre(() => {
    return disposeCsm
  })
</script>

{@render children?.()}

{#if !enabled}
  {@render fallback?.()}
{/if}
