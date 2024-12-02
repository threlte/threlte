<script lang="ts">
  import type { CubeEnvLoaderMap, CubeEnvProps } from './types'
  import type { CubeTexture } from 'three'
  import { CubeTextureLoader } from 'three'
  import { HDRCubeTextureLoader } from 'three/examples/jsm/Addons.js'
  import { Previous } from './Previous.svelte'
  import { untrack } from 'svelte'
  import { useSuspense } from '../../suspense/useSuspense'
  import { useThrelte } from '@threlte/core'

  let { files, isBackground = false, path = '', scene }: CubeEnvProps = $props()

  const { invalidate, scene: defaultScene } = useThrelte()

  const _scene = $derived(scene ?? defaultScene)

  // save these to restore them if `_scene` changes and on unmount
  const lastBackground = $derived(_scene.background)
  const lastEnvironment = $derived(_scene.environment)

  const lastScene = new Previous(() => _scene)

  $effect(() => {
    if (lastScene.current !== undefined) {
      lastScene.current.background = lastBackground
    }
  })

  $effect(() => {
    if (lastScene.current !== undefined) {
      lastScene.current.environment = lastEnvironment
    }
  })

  // scene.environment is allowed to be null
  let environment: CubeTexture | null = $state(null)

  $effect(() => {
    if (isBackground) {
      _scene.background = environment
      invalidate()
    }
    invalidate()
    return () => {
      _scene.background = lastBackground
      invalidate()
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

  $effect(() => {
    _scene.environment = environment
    invalidate()
    return () => {
      _scene.environment = lastEnvironment
      invalidate()
    }
  })

  // anytime path changes, we need to reload because a user could have a file with the same name and extension. for example `path1/file.ext` and `path2/file.ext`
  $effect(() => {
    // threejs's loaders cache their results
    const suspendedTexture = suspend(
      new Promise<CubeTexture>((resolve, reject) => {
        // cubetexture loaders don't implement `loadAsync` over a files array :(
        loader.load(files, resolve, reject)
      })
    )
    // dispose on unmount and whenever path or file has updated
    // this is important to do in a `.then` because the component may unmount before the texture has loaded.
    return () => {
      suspendedTexture.then((texture) => {
        texture.dispose()
      })
    }
  })
</script>
