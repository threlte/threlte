<script module>
  const defaultLoadOptions: EquirectangularEnvironmentProps['loadOptions'] = {
    transform(texture) {
      texture.mapping = EquirectangularReflectionMapping
      return texture
    }
  }
</script>

<script lang="ts">
  import { T, useLoader, useThrelte } from '@threlte/core'
  import type { Scene, Texture } from 'three'
  import { EquirectangularReflectionMapping, TextureLoader } from 'three'
  import { EXRLoader, GroundedSkybox, RGBELoader } from 'three/examples/jsm/Addons.js'
  import { useSuspense } from '../../suspense/useSuspense'
  import { Previous } from './Previous.svelte'
  import type { EquirectangularEnvironmentProps } from './types'

  let {
    ground = false,
    isBackground = false,
    loadOptions = defaultLoadOptions,
    loaderOptions = {},
    resource,
    scene,
    skybox = $bindable()
  }: EquirectangularEnvironmentProps = $props()

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
        initialBackground ??= _scene.background
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
      initialEnvironment ??= _scene.environment
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
      shouldLoadTexture ? loader.load(resource, loadOptions) : Promise.resolve(resource)
    )

    texturePromise.then((t) => {
      texture = t
    })

    // dispose on unmount and whenever `resource` or `loadOptions` has updated
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
