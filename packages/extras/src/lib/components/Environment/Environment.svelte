<script module>
  const defaultOnTextureLoaded = (texture: Texture) => {
    texture.mapping = EquirectangularReflectionMapping
    return texture
  }
</script>

<script lang="ts">
  import type { EnvProps } from './types'
  import type { Scene, Texture } from 'three'
  import { EXRLoader, RGBELoader } from 'three/examples/jsm/Addons.js'
  import { EquirectangularReflectionMapping, TextureLoader } from 'three'
  import { Previous } from './Previous.svelte'
  import { useSuspense } from '../../suspense/useSuspense'
  import { useLoader, useThrelte } from '@threlte/core'

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

  const isEXR = $derived(file.endsWith('exr'))
  const isHDR = $derived(file.endsWith('hdr'))

  const loader = $derived(
    useLoader<typeof EXRLoader | typeof RGBELoader | typeof TextureLoader>(
      isHDR ? RGBELoader : isEXR ? EXRLoader : TextureLoader,
      {
        extend(loader) {
          onloadercreated?.(loader)
        }
      }
    )
  )

  const suspend = useSuspense()

  // anytime path changes, we need to reload because a user could have a file with the same name and extension. for example `path1/file.ext` and `path2/file.ext`
  $effect(() => {
    const suspendedTexture = suspend(loader.load(file)).then((texture) => {
      ontextureloaded(texture)
      return texture
    })

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
