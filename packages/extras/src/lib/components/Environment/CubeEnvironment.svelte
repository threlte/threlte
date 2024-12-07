<script
  lang="ts"
  module
>
  const loaderCache: CubeEnvironmentCache = {}
</script>

<script lang="ts">
  import type { CubeEnvironmentCache, CubeEnvironmentProps } from './types'
  import type { CubeTexture, Scene, Texture } from 'three'
  import { CubeTextureLoader } from 'three'
  import { GroundedSkybox } from 'three/examples/jsm/Addons.js'
  import { HDRCubeTextureLoader } from 'three/examples/jsm/Addons.js'
  import { Previous } from './Previous.svelte'
  import { T, useThrelte } from '@threlte/core'
  import { useSuspense } from '../../suspense/useSuspense'

  let {
    ground = false,
    isBackground = false,
    loadOptions = {},
    loaderOptions = {},
    resources,
    scene,
    skybox = $bindable()
  }: CubeEnvironmentProps = $props()

  const { invalidate, scene: defaultScene } = useThrelte()

  const _scene = $derived(scene ?? defaultScene)

  let initialBackground: Scene['background'] | undefined
  let initialEnvironment: Scene['environment'] | undefined

  const lastScene = new Previous(() => _scene)

  let texture: Texture | undefined = $state()

  $effect(() => {
    if (lastScene.current !== undefined) {
      if (initialBackground !== undefined) {
        lastScene.current.background = initialBackground
        initialBackground = undefined
      }
      if (initialEnvironment !== undefined) {
        lastScene.current.environment = initialEnvironment
        initialEnvironment = undefined
      }
    }
  })

  $effect(() => {
    if (isBackground) {
      if (texture !== undefined) {
        if (initialBackground === undefined) {
          initialBackground = _scene.background
        }
        _scene.background = texture
        invalidate()
      }
      return () => {
        if (initialBackground !== undefined) {
          _scene.background = initialBackground
        }
        invalidate()
      }
    }
  })

  $effect(() => {
    if (texture !== undefined) {
      if (initialEnvironment === undefined) {
        initialEnvironment = _scene.environment
      }
      _scene.environment = texture
      invalidate()
      return () => {
        if (initialEnvironment !== undefined) {
          _scene.environment = initialEnvironment
        }
        invalidate()
      }
    }
  })

  const first = $derived(Array.isArray(resources) ? resources[0] : resources)

  // will default to `CubeTextureLoader` if `resources` is a CubeTexture instance
  const loader = $derived.by(() => {
    let loader = (loaderCache.tex ??= new CubeTextureLoader())
    if (typeof first === 'string' && first.endsWith('hdr')) {
      loader = loaderCache.hdr ??= new HDRCubeTextureLoader()
    }
    return loaderOptions.extend?.(loader) ?? loader
  })

  const suspend = useSuspense()

  $effect(() => {
    const suspendedTexture = suspend(
      Array.isArray(resources)
        ? new Promise<CubeTexture>((resolve, reject) => {
            loader.load(
              resources,
              (data) => {
                resolve(loadOptions?.transform?.(data) ?? data)
              },
              loadOptions?.onProgress,
              reject
            )
          })
        : Promise.resolve(resources)
    )

    suspendedTexture.then((t) => {
      texture = t
    })

    // dispose on unmount and whenever path or file has updated
    // this is important to do in a `.then` because the component may unmount before the texture has loaded.
    return () => {
      suspendedTexture.then((texture) => {
        texture.dispose()
      })
    }
  })
</script>

{#if ground !== false}
  {@const options = ground === true ? {} : ground}
  {#if texture !== undefined}
    {@const args = [texture, options.height ?? 1, options.radius ?? 1, options.resolution ?? 128]}
    <T
      oncreate={() => {
        return () => {
          skybox = undefined
        }
      }}
      is={GroundedSkybox}
      bind:ref={skybox}
      {args}
    />
  {/if}
{/if}
