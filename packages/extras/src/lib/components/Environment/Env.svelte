<script lang="ts">
  import type { Loader, Scene } from 'three'
  import { HDRCubeTextureLoader, EXRLoader, RGBELoader } from 'three/examples/jsm/Addons.js'
  import { Previous } from './Previous.svelte'
  import { CubeTextureLoader, TextureLoader } from 'three'
  import { isInstanceOf, useCache, useScene } from '@threlte/core'

  type Props = {
    scene?: Scene
    path?: string
    files?: string | string[]
  }

  let { scene, path = '/', files = [] }: Props = $props()

  const CUBE_FACES_COUNT = 6
  const isCubeMap = $derived(_files.length === CUBE_FACES_COUNT)
  const first = $derived(_files.at(0))
  const firstIsHdr = $derived(first?.endsWith('hdr'))
  const firstIsExr = $derived(first?.endsWith('exr'))

  const { scene: defaultScene } = useScene()

  const _scene = $derived(scene ?? defaultScene)
  const savedBackground = $derived(_scene.background)
  const savedBackgroundBlurriness = $derived(_scene.backgroundBlurriness)
  const savedBackgroundIntensity = $derived(_scene.backgroundIntensity)
  const savedBackgroundRotation = $derived(_scene.backgroundRotation.clone())

  const savedEnvironment = $derived(_scene.environment)
  const savedEnvironmentIntensity = $derived(_scene.environmentIntensity)
  const savedEnvironmentRotation = $derived(_scene.environmentRotation.clone())

  const lastScene = new Previous(() => _scene)

  $effect(() => {
    if (lastScene.current !== undefined) {
      lastScene.current.background = savedBackground
      lastScene.current.backgroundBlurriness = savedBackgroundBlurriness
      lastScene.current.backgroundIntensity = savedBackgroundIntensity
      lastScene.current.backgroundRotation.copy(savedBackgroundRotation)

      lastScene.current.environment = savedEnvironment
      lastScene.current.environmentIntensity = savedEnvironmentIntensity
      lastScene.current.environmentRotation.copy(savedEnvironmentRotation)
    }
  })

  type X = HDRCubeTextureLoader extends Loader ? true : false

  const { remember } = useCache()

  const _files = $derived(Array.isArray(files) ? files : [files])

  const loader = $derived(
    new (isCubeMap
      ? firstIsHdr
        ? HDRCubeTextureLoader
        : CubeTextureLoader
      : firstIsExr
        ? EXRLoader
        : firstIsHdr
          ? RGBELoader
          : TextureLoader)()
  )

  $effect(() => {
    loader.load(_files)
  })
</script>
