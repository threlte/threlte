<script lang="ts">
  import type { EquirectangularEnvironmentProps } from './types'
  import { EXRLoader, GroundedSkybox, RGBELoader } from 'three/examples/jsm/Addons.js'
  import { EquirectangularReflectionMapping, Scene, TextureLoader } from 'three'
  import { observe, T, useLoader, useThrelte } from '@threlte/core'
  import { useSuspense } from '../../suspense/useSuspense'

  let {
    ground = false,
    isBackground = false,
    loaderOptions = {},
    resource,
    scene,
    skybox = $bindable(),
    texture = $bindable()
  }: EquirectangularEnvironmentProps = $props()

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

  let background: Scene['background'] | undefined = $state()
  let environment: Scene['environment'] | undefined = $state()

  observe(
    () => [_scene],
    ([scene]) => {
      background = scene.background
      environment = scene.environment
    }
  )

  $effect(() => {
    if (isBackground && texture !== undefined) {
      _scene.background = texture
      invalidate()
      return () => {
        _scene.background = background ?? _scene.background
        invalidate()
      }
    }
  })

  $effect(() => {
    if (texture !== undefined) {
      _scene.environment = texture
      invalidate()
      return () => {
        _scene.environment = environment ?? _scene.environment
        invalidate()
      }
    }
  })

  const _url = $derived(typeof resource === 'string' ? resource : '')

  const isEXR = $derived(_url.endsWith('exr'))
  const isHDR = $derived(_url.endsWith('hdr'))

  // will default to `TextureLoader` if `resource` is a `Texture` instance
  const loader = $derived(
    useLoader(isHDR ? RGBELoader : isEXR ? EXRLoader : TextureLoader, loaderOptions)
  )

  const suspend = useSuspense()

  $effect(() => {
    const shouldLoadTexture = typeof resource === 'string'

    const texturePromise = suspend(
      shouldLoadTexture
        ? loader.load(resource, {
            transform(texture) {
              texture.mapping = EquirectangularReflectionMapping
              return texture
            }
          })
        : Promise.resolve(resource)
    )

    texturePromise.then((t) => {
      texture = t
    })

    // dispose on unmount
    // this is important to do in a `.then` because the component may unmount before the texture has loaded or another load may be started while "this" load is ongoing
    return () => {
      texturePromise.then((texture) => {
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
