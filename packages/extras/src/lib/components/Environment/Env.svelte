<script module>
  const defaultOnTextureLoaded = (texture: Texture): Texture => {
    texture.mapping = EquirectangularReflectionMapping
    return texture
  }
</script>

<script lang="ts">
  import type { EnvLoaderMap, EnvProps } from './types'
  import type { Scene, Texture } from 'three'
  import { EXRLoader, RGBELoader } from 'three/examples/jsm/Addons.js'
  import { EquirectangularReflectionMapping, TextureLoader } from 'three'
  import { Previous } from './Previous.svelte'
  import { useSuspense } from '../../suspense/useSuspense'
  import { useThrelte } from '@threlte/core'

  let {
    file,
    isBackground = false,
    onloadercreated,
    ontextureloaded = defaultOnTextureLoaded,
    scene
  }: EnvProps = $props()

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

  const isHDR = $derived(file.endsWith('hdr'))
  const isEXR = $derived(file.endsWith('exr'))

  const loaderMap: Partial<EnvLoaderMap> = {}

  // get the loader out of the loader map, if its not there yet, make a new one, add it to the map and return it
  const loader = $derived.by(() => {
    const loader = isHDR
      ? (loaderMap['hdr'] ??= new RGBELoader())
      : isEXR
        ? (loaderMap['exr'] ??= new EXRLoader())
        : (loaderMap['tex'] ??= new TextureLoader())
    onloadercreated?.(loader)
    return loader
  })

  const suspend = useSuspense()

  // anytime path changes, we need to reload because a user could have a file with the same name and extension. for example `path1/file.ext` and `path2/file.ext`
  $effect(() => {
    // threejs's loaders cache their results

    const suspendedTexture = suspend(loader.loadAsync(file)).then(ontextureloaded)

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
