<script lang="ts">
  import type { CubeTexture, Scene } from 'three'
  import { CubeTextureLoader } from 'three'
  import { HDRCubeTextureLoader } from 'three/examples/jsm/Addons.js'
  import { Previous } from './Previous.svelte'
  import { observe, useThrelte } from '@threlte/core'
  import { untrack } from 'svelte'
  import { useSuspense } from '../../suspense/useSuspense'

  type CubeFiles = [
    positiveX: string,
    negativeX: string,
    positiveY: string,
    negativeY: string,
    positiveZ: string,
    negativeZ: string
  ]

  type Props = {
    files: CubeFiles
    isBackground?: boolean
    onprogress?: (event: ProgressEvent) => void
    path?: string
    scene?: Scene
  }

  let { files, isBackground, onprogress, path = '', scene }: Props = $props()

  const { invalidate, scene: defaultScene } = useThrelte()

  const _scene = $derived(scene ?? defaultScene)
  const savedBackground = $derived(_scene.background)

  const savedEnvironment = $derived(_scene.environment)

  const lastScene = new Previous(() => _scene)

  $effect(() => {
    if (lastScene.current !== undefined) {
      lastScene.current.background = savedBackground

      lastScene.current.environment = savedEnvironment
    }
  })

  const firstFile = $derived(files[0])

  const isHDR = $derived(firstFile.endsWith('hdr'))

  const loaderMap: Partial<{ hdr: HDRCubeTextureLoader; tex: CubeTextureLoader }> = {}

  // if its not in the loaderMap, create the loader instance then put it into the map then return it
  const loader = $derived(
    isHDR
      ? (loaderMap['hdr'] ??= new HDRCubeTextureLoader())
      : (loaderMap['tex'] ??= new CubeTextureLoader())
  )

  const suspend = useSuspense()

  let texture: CubeTexture | undefined = $state()

  $effect(() => {
    if (texture !== undefined) {
      _scene.environment = texture
      invalidate()
    }
    return () => {
      _scene.environment = untrack(() => savedEnvironment)
      invalidate()
    }
  })

  $effect(() => {
    if (isBackground) {
      if (texture !== undefined) {
        _scene.background = texture
      }
    } else {
      _scene.background = untrack(() => savedBackground)
    }
    invalidate()
    return () => {
      _scene.background = untrack(() => savedBackground)
      invalidate()
    }
  })

  // anytime path changes, we need to reload because a user could have a file with the same name and extension at `path1/file.ext` and `path2/file.ext`
  observe(
    () => [path, files],
    ([path, files]) => {
      loader.setPath(path)
      // threejs's loaders cache their results
      suspend(
        new Promise<CubeTexture>((resolve, reject) => {
          // cubetexture loaders don't implement `loadAsync` over a files array :(
          loader.load(files, resolve, onprogress, reject)
        })
      ).then((t) => {
        texture = t
      })
    }
  )
</script>
