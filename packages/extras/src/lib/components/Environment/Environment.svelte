<script lang="ts">
  import type { EnvironmentProperties } from '$lib/types/components'
  import { useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
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

  import GroundProjectedEnv from './GroundProjectedEnv.svelte'

  export let path: EnvironmentProperties['path'] = undefined
  export let files: EnvironmentProperties['files']
  export let isBackground: EnvironmentProperties['isBackground'] = undefined
  export let groundProjection: EnvironmentProperties['groundProjection'] = undefined
  export let format: EnvironmentProperties['format'] = undefined
  export let encoding: EnvironmentProperties['encoding'] = undefined

  const { scene, invalidate, renderer } = useThrelte()

  let previousSceneEnvironment = scene.environment
  let previousSceneBackground = scene.background

  $: isCubeMap = Array.isArray(files)
  $: envPath = `${path || ''}${files}`

  let previousEnvPath: string = envPath
  let previousEnvMap: Texture
  let previousFormat: string | undefined

  const pickLoader = () => {
    const inferredFormat =
      format || (Array.isArray(files) ? files[0] : files).split('.').pop() == 'hdr' ? 'hdr' : 'ldr'

    if (isCubeMap && inferredFormat == 'ldr') return new CubeTextureLoader()
    if (!isCubeMap && inferredFormat == 'ldr') return new TextureLoader()
    if (isCubeMap && inferredFormat == 'hdr') return new HDRCubeTextureLoader()
    if (!isCubeMap && inferredFormat == 'hdr') return new RGBELoader()
    return new TextureLoader()
  }

  const loadEnvironment = () => {
    if (!renderer)
      throw new Error(
        'Threlte renderer undefined. Component <Environment/> must be a descendant of <Canvas/>.'
      )
    const loader: any = pickLoader()
    loader.setDataType?.(FloatType)

    loader.setPath(path || '').load(files, (texture: any) => {
      texture.mapping = isCubeMap ? CubeReflectionMapping : EquirectangularReflectionMapping
      texture.encoding = encoding || isCubeMap ? LinearEncoding : sRGBEncoding
      previousEnvMap = texture
      scene.environment = previousEnvMap
      if (isBackground) scene.background = previousEnvMap
      invalidate()
    })
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
      invalidate('Removing Environment as scene.background')
    }

    if (isBackground && !scene.background && previousEnvMap) {
      scene.background = previousEnvMap
      invalidate('Adding Environment as scene.background')
    }
  }

  onDestroy(() => {
    scene.environment = previousSceneEnvironment
    scene.background = previousSceneBackground
    if (previousEnvMap) previousEnvMap.dispose()
    groundProjection = undefined
    invalidate('Environment destroyed')
  })
</script>

{#if groundProjection}
  <GroundProjectedEnv
    {groundProjection}
    currentEnvMap={previousEnvMap}
  />
{/if}
