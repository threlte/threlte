<svelte:options runes={true} />

<script lang="ts">
  import { isInstanceOf, T, useTask, useThrelte, watch } from '@threlte/core'
  import { onMount } from 'svelte'
  import {
    Color,
    Mesh,
    MeshBasicMaterial,
    RGBAFormat,
    WebGLRenderTarget,
    type Material
  } from 'three'
  import { useStudioObjectsRegistry } from '../studio-objects-registry/useStudioObjectsRegistry.svelte.js'
  import { fragmentShader } from './shader/fragment.js'
  import { vertexShader } from './shader/vertex.js'
  import { useObjectSelection } from './useObjectSelection.svelte.js'

  const { invalidate } = useThrelte()
  const objectSelection = useObjectSelection()
  const { addObject, removeObject } = useStudioObjectsRegistry()

  const { size, renderer, autoRenderTask, scene, camera } = useThrelte()

  const renderTarget = new WebGLRenderTarget($size.width, $size.height, {
    format: RGBAFormat
  })

  watch(size, (size) => {
    renderTarget.setSize(size.width, size.height)
  })

  const numberSeedToHexColor = (seed: number) => {
    let color = (Math.round(Math.abs(seed)) % 0xffffff).toString(16)
    while (color.length < 6) {
      color = `0${color}`
    }
    return `#${color}`
  }

  const MATERIAL_POOL_SIZE = 32
  const overrideMaterialPool = new Map<number, MeshBasicMaterial>()

  const getOverrideMaterial = (id: number): MeshBasicMaterial => {
    // limits the amount of cached materials. I'm worried about performance
    // impact if we had one material per object id. though it means that if two
    // meshes happen to have the same mapIndex and overlap in screen space, then
    // the edges won't get detected.
    const mapIndex = id % MATERIAL_POOL_SIZE

    if (overrideMaterialPool.has(mapIndex)) return overrideMaterialPool.get(mapIndex)!

    const newOverrideMaterial = new MeshBasicMaterial({
      color: numberSeedToHexColor(Math.random() * 10000)
    })

    overrideMaterialPool.set(mapIndex, newOverrideMaterial)

    return newOverrideMaterial
  }

  const hasMaterial = (object: any): object is { material: Material } => {
    return 'material' in object
  }

  useTask(
    () => {
      // TODO: Make perf optimizations in terms of not rendering when no objects
      // are selected
      const originalMaterials = new Map()
      const originalRenderTarget = renderer.getRenderTarget()
      const currentCameraMask = camera.current.layers.mask
      camera.current.layers.set(31)
      const currentSceneBackground = scene.background
      objectSelection.selectedObjects.forEach((object, i) => {
        if (object === camera.current) return
        object.userData.originalLayer = object.layers.mask
        object.layers.enable(31)
        object.userData.originalVisible = object.visible
        object.visible = true
        if (hasMaterial(object)) {
          originalMaterials.set(object.id, object.material)
          object.material = getOverrideMaterial(i)
        }
      })
      const originalOverrideMaterial = scene.overrideMaterial
      scene.overrideMaterial = null
      scene.background = null
      const currentClearAlpha = renderer.getClearAlpha()
      renderer.setRenderTarget(renderTarget)
      renderer.render(scene, camera.current)
      renderer.setRenderTarget(originalRenderTarget)
      camera.current.layers.mask = currentCameraMask
      renderer.setClearAlpha(currentClearAlpha)
      scene.background = currentSceneBackground
      objectSelection.selectedObjects.forEach((object) => {
        if (object === camera.current) return
        object.layers.mask = object.userData.originalLayer
        object.visible = object.userData.originalVisible
        if (hasMaterial(object)) {
          object.material = originalMaterials.get(object.id)
        }
      })
      scene.overrideMaterial = originalOverrideMaterial
    },
    {
      before: autoRenderTask,
      autoInvalidate: false
    }
  )

  const selectionMesh = new Mesh()
  selectionMesh.raycast = () => {}
  selectionMesh.position.z = -5
  selectionMesh.frustumCulled = false
  selectionMesh.userData.ignoreOverrideMaterial = true
  selectionMesh.renderOrder = 9999 // Set because of Grid overlap. Why to 9999? I don't know, but it works
  const getMesh = () => selectionMesh // "getter" to disable reactivity for performance reasons

  useTask(
    () => {
      // TODO: Make perf optimizations in terms of not rendering when no objects
      // are selected

      let scaleX = getMesh().scale.x
      let scaleY = getMesh().scale.y
      if (isInstanceOf($camera, 'PerspectiveCamera')) {
        scaleY = Math.tan((($camera.fov * Math.PI) / 180) * 0.5) * 5 * 2 // 5 being the distance of the camera to the plane
        scaleX = scaleY * $camera.aspect
      } else if (isInstanceOf($camera, 'OrthographicCamera')) {
        scaleY = ($camera.top - $camera.bottom) / $camera.zoom
        scaleX = ($camera.right - $camera.left) / $camera.zoom
      }
      if (scaleX !== getMesh().scale.x || scaleY !== getMesh().scale.y) {
        getMesh().scale.x = scaleX
        getMesh().scale.y = scaleY
        invalidate()
      }
    },
    {
      autoInvalidate: false
    }
  )

  onMount(() => {
    addObject(selectionMesh)
    return () => {
      removeObject(selectionMesh)
    }
  })
</script>

{#key $camera.uuid}
  <T is={selectionMesh} attach={$camera}>
    <T.PlaneGeometry />

    <T.ShaderMaterial
      {fragmentShader}
      {vertexShader}
      uniforms={{
        outlinedObjectsTexture: {
          value: renderTarget.texture
        },
        lineWidth: {
          value: 1.5
        },
        outlineColor: {
          value: new Color('#FFFF00')
        },
        edgeFactor: {
          value: 0.0001
        }
      }}
      depthWrite={false}
      depthTest={false}
      transparent
    />
  </T>
{/key}
