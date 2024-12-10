<script
  lang="ts"
  module
>
  const loaderCache: CubeEnvironmentCache = {}
</script>

<script lang="ts">
  import type { CubeEnvironmentCache, CubeEnvironmentProps } from './types'
  import type { CubeTexture } from 'three'
  import { CubeTextureLoader } from 'three'
  import { GroundedSkybox, HDRCubeTextureLoader } from 'three/examples/jsm/Addons.js'
  import { T, useThrelte } from '@threlte/core'
  import { useSuspense } from '../../suspense/useSuspense'

  let {
    ground = false,
    isBackground = false,
    loaderOptions = {},
    resources,
    scene,
    skybox = $bindable(),
    texture = $bindable()
  }: CubeEnvironmentProps = $props()

  const { invalidate, scene: defaultScene } = useThrelte()

  const _scene = $derived(scene ?? defaultScene)

  // save lastScene and restore when scene changes and on unmount
  $effect(() => {
    const last = _scene
    const background = last.background
    const environment = last.environment
    return () => {
      last.background = background
      last.environment = environment
    }
  })

  $effect(() => {
    const initialBackground = _scene.background
    if (isBackground) {
      if (texture !== undefined) {
        _scene.background = texture
        invalidate()
      }
      return () => {
        _scene.background = initialBackground
        invalidate()
      }
    }
  })

  $effect(() => {
    const initialEnvironment = _scene.environment
    if (texture !== undefined) {
      _scene.environment = texture
      invalidate()
      return () => {
        _scene.environment = initialEnvironment
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
          loader.load(resources, resolve, undefined, reject)
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
