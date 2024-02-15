<script lang="ts">
  import { useCache, useParent, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import type { Scene } from 'three'
  import {
    CubeReflectionMapping,
    CubeTextureLoader,
    EquirectangularReflectionMapping,
    FloatType,
    LinearEncoding,
    sRGBEncoding,
    Texture,
    TextureLoader
  } from 'three'
  import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
  import type { EnvironmentProps } from './Environment.svelte'
  import GroundProjectedSkybox from './GroundProjectedSkybox.svelte'
  import { useSuspense } from '../../suspense/useSuspense'

  type Props = EnvironmentProps

  export let path: NonNullable<Props['path']> = ''
  export let files: NonNullable<Props['files']>
  export let isBackground: Props['isBackground'] = undefined
  export let groundProjection: Props['groundProjection'] = undefined
  export let format: Props['format'] = undefined
  export let encoding: Props['encoding'] = undefined

  const isScene = (obj: any): obj is Scene => !!obj.isScene

  const { scene: globalScene, invalidate } = useThrelte()
  const parent = useParent()
  let scene = globalScene
  if (isScene($parent)) scene = $parent

  let previousSceneEnvironment = scene.environment
  let previousSceneBackground = scene.background

  $: isCubeMap = Array.isArray(files)
  $: envPath = `${path}${files}`

  let previousEnvPath: string = envPath
  let previousEnvMap: Texture
  let previousFormat: string | undefined

  const pickLoader = (): new () => any => {
    const inferredFormat =
      format || (Array.isArray(files) ? files[0] : files).split('.').pop() == 'hdr' ? 'hdr' : 'ldr'

    if (isCubeMap && inferredFormat == 'ldr') return CubeTextureLoader
    if (!isCubeMap && inferredFormat == 'ldr') return TextureLoader
    if (isCubeMap && inferredFormat == 'hdr') return HDRCubeTextureLoader
    if (!isCubeMap && inferredFormat == 'hdr') return RGBELoader
    return TextureLoader
  }

  const { remember } = useCache()

  const suspend = useSuspense()

  const loadEnvironment = async () => {
    const LoaderType = pickLoader()
    const loader: any = new LoaderType()
    loader.setDataType?.(FloatType)

    const filesKey = Array.isArray(files) ? files.join(',') : files
    const cacheKey = [LoaderType, path, filesKey]

    const texture = (await remember(async () => {
      return suspend(
        new Promise((resolve, reject) => {
          loader.setPath(path).load(files, (texture: any) => {
            resolve(texture)
          })
        })
      )
    }, cacheKey)) as any

    texture.mapping = isCubeMap ? CubeReflectionMapping : EquirectangularReflectionMapping
    texture.encoding = encoding || isCubeMap ? LinearEncoding : sRGBEncoding
    previousEnvMap = texture
    scene.environment = previousEnvMap
    if (isBackground) scene.background = previousEnvMap

    invalidate()

    previousFormat = format || undefined
    previousEnvPath = envPath
  }

  $: {
    if (envPath != previousEnvPath || format != previousFormat) {
      if (previousEnvMap) {
        previousEnvMap.dispose()
      }
      loadEnvironment()
      groundProjection = groundProjection
    }

    if (!isBackground && scene.background) {
      scene.background = null
      invalidate()
    }

    if (isBackground && !scene.background && previousEnvMap) {
      scene.background = previousEnvMap
      invalidate()
    }
  }

  onDestroy(() => {
    scene.environment = previousSceneEnvironment
    scene.background = previousSceneBackground
    if (previousEnvMap) previousEnvMap.dispose()
    groundProjection = undefined
    invalidate()
  })
</script>

{#if groundProjection}
  <GroundProjectedSkybox
    {...groundProjection}
    envMap={previousEnvMap}
  />
{/if}
