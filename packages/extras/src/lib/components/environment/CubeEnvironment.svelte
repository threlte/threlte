<script
  lang="ts"
  module
>
  const loaderCache: CubeEnvironmentCache = {}
</script>

<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import type { CubeTexture, Scene, Texture } from 'three'
  import { CubeTextureLoader } from 'three'
  import { GroundedSkybox, HDRCubeTextureLoader } from 'three/examples/jsm/Addons.js'
  import { useSuspense } from '../../suspense/useSuspense'
  import { Previous } from './Previous.svelte'
  import type { CubeEnvironmentCache, CubeEnvironmentProps } from './types'

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

  // can't use ??= in some of these effects since null is valid for scene.environment and background. must explicity check for undefined

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
    const shouldLoadTexture = Array.isArray(resources)
    const promise = shouldLoadTexture
      ? new Promise<CubeTexture>((resolve, reject) => {
          loader.load(
            resources,
            (texture) => {
              resolve(loadOptions.transform?.(texture) ?? texture)
            },
            loadOptions.onProgress,
            reject
          )
        })
      : Promise.resolve(resources)

    const suspendedTexture = suspend(promise)

    suspendedTexture.then((t) => {
      texture = t
    })

    // dispose on unmount and whenever `resource` or `loadOptions` has updated
    // this is important to do in a `.then` because the component may unmount before the texture has loaded or another load may be started while "this" load is ongoing
    return () => {
      suspendedTexture.then((texture) => {
        if (shouldLoadTexture) {
        }
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
