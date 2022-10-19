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

  let previousEnvPath: string = ''
  let currentEnvMap: Texture
  let previousFormat: string | undefined

  const pickLoader = () => {
    if (!format)
      format = (Array.isArray(files) ? files[0] : files).split('.').pop() == 'hdr' ? 'hdr' : 'ldr'

    if (isCubeMap && format == 'ldr') return new CubeTextureLoader()
    if (!isCubeMap && format == 'ldr') return new TextureLoader()
    if (isCubeMap && format == 'hdr') return new HDRCubeTextureLoader()
    if (!isCubeMap && format == 'hdr') return new RGBELoader()
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
      currentEnvMap = texture
      scene.environment = currentEnvMap
      if (isBackground) scene.background = currentEnvMap
      invalidate()
    })
    previousFormat = format || undefined
  }

  $: {
    if (envPath != previousEnvPath || format != previousFormat) {
      if (currentEnvMap) {
        currentEnvMap.dispose()
      }
      loadEnvironment()
      previousEnvPath = envPath
    }

    if (!isBackground && scene.background) {
      scene.background = null
      invalidate('Removing Environment as scene.background')
    }

    if (isBackground && !scene.background && currentEnvMap) {
      scene.background = currentEnvMap
      invalidate('Adding Environment as scene.background')
    }
  }

  onDestroy(() => {
    scene.environment = previousSceneEnvironment
    scene.background = previousSceneBackground
    if (currentEnvMap) currentEnvMap.dispose()
    groundProjection = undefined
    invalidate('Environment destroyed')
  })
</script>

{#if groundProjection}
  <GroundProjectedEnv
    {groundProjection}
    {currentEnvMap}
  />
{/if}
