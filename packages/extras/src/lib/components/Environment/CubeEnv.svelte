<script lang="ts">
  import type { CubeEnvLoaderMap, CubeEnvProps } from './types'
  import type { CubeTexture, Scene } from 'three'
  import { CubeTextureLoader } from 'three'
  import { HDRCubeTextureLoader } from 'three/examples/jsm/Addons.js'
  import { Previous } from './Previous.svelte'
  import { useSuspense } from '../../suspense/useSuspense'
  import { useThrelte } from '@threlte/core'

  let { files, isBackground = false, path = '', scene }: CubeEnvProps = $props()

  const { invalidate, scene: defaultScene } = useThrelte()

  const _scene = $derived(scene ?? defaultScene)

  let initialBackground: Scene['background'] | undefined
  let initialEnvironment: Scene['environment'] | undefined

  const lastScene = new Previous(() => _scene)

  let environment: CubeTexture | undefined = $state()

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
      if (environment !== undefined) {
        if (initialBackground === undefined) {
          initialBackground = _scene.background
        }
        _scene.background = environment
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
    if (environment !== undefined) {
      if (initialEnvironment === undefined) {
        initialEnvironment = _scene.environment
      }
      _scene.environment = environment
      invalidate()
      return () => {
        if (initialEnvironment !== undefined) {
          _scene.environment = initialEnvironment
        }
        invalidate()
      }
    }
  })

  const firstFile = $derived(files[0])

  const firstFileIsHDR = $derived(firstFile.endsWith('hdr'))

  const loaderMap: Partial<CubeEnvLoaderMap> = {}

  // get the loader out of the loader map, if its not there yet, make a new one
  const loader = $derived.by(() => {
    const loader = firstFileIsHDR
      ? (loaderMap['hdr'] ??= new HDRCubeTextureLoader())
      : (loaderMap['tex'] ??= new CubeTextureLoader())
    loader.setPath(path)
    return loader
  })

  const suspend = useSuspense()

  // anytime path changes, we need to reload because a user could have a file with the same name and extension. for example `path1/file.ext` and `path2/file.ext`
  $effect(() => {
    // threejs's loaders cache their results
    const suspendedTexture = suspend(
      new Promise<CubeTexture>((resolve, reject) => {
        // cubetexture loaders don't implement `loadAsync` over a files array :(
        loader.load(files, resolve, reject)
      })
    )
    suspendedTexture.then((texture) => {
      environment = texture
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
