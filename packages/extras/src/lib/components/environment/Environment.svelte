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
  import type { Texture } from 'three'
  import { EquirectangularReflectionMapping, TextureLoader } from 'three'
  import { EXRLoader, GroundedSkybox, RGBELoader } from 'three/examples/jsm/Addons.js'
  import { useSuspense } from '../../suspense/useSuspense'
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

  let texture: Texture | undefined = $state()

  // save lastScene and restore when scene changes.
  $effect(() => {
    const last = _scene
    const background = last.background
    const environment = last.environment
    return () => {
      last.background = background
      last.environment = environment
    }
  })

  // can't use ??= in some of these effects since null is valid for scene.environment and scene.background. must explicity check for undefined

  $effect(() => {
    if (isBackground) {
      if (texture !== undefined) {
        const initialBackground = _scene.background
        _scene.background = texture
        invalidate()
        return () => {
          _scene.background = initialBackground
          invalidate()
        }
      }
    }
  })

  $effect(() => {
    if (texture !== undefined) {
      const initialEnvironment = _scene.environment
      _scene.environment = texture
      invalidate()
      return () => {
        _scene.environment = initialEnvironment
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
