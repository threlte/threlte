<script module>
  const defaultLoadOptions: EnvironmentProps['loadOptions'] = {
    transform(texture) {
      texture.mapping = EquirectangularReflectionMapping
      return texture
    }
  }
</script>

<script lang="ts">
  import type { EnvironmentProps } from './types'
  import type { Scene, Texture } from 'three'
  import { EXRLoader, RGBELoader } from 'three/examples/jsm/Addons.js'
  import { EquirectangularReflectionMapping, TextureLoader } from 'three'
  import { GroundedSkybox } from 'three/examples/jsm/Addons.js'
  import { Previous } from './Previous.svelte'
  import { T, useLoader, useThrelte } from '@threlte/core'
  import { useSuspense } from '../../suspense/useSuspense'

  let {
    ground = false,
    isBackground = false,
    loadOptions = defaultLoadOptions,
    loaderOptions,
    resource,
    scene,
    skybox = $bindable()
  }: EnvironmentProps = $props()

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

  const _file = $derived(typeof resource === 'string' ? resource : '')

  const isEXR = $derived(_file.endsWith('exr'))
  const isHDR = $derived(_file.endsWith('hdr'))

  // will default to `TextureLoader` if `resource` is not a string
  const loader = $derived(
    useLoader(isHDR ? RGBELoader : isEXR ? EXRLoader : TextureLoader, loaderOptions)
  )

  const suspend = useSuspense()

  $effect(() => {
    const suspendedTexture = suspend(
      typeof resource === 'string' ? loader.load(resource, loadOptions) : Promise.resolve(resource)
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
    <T
      oncreate={() => {
        return () => {
          skybox = undefined
        }
      }}
      is={GroundedSkybox}
      bind:ref={skybox}
      args={[texture, options.height ?? 1, options.radius ?? 1, options.resolution ?? 128]}
    />
  {/if}
{/if}
