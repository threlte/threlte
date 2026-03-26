<script lang="ts">
  import { T } from '@threlte/core'
  import { useGltf } from '../../hooks/useGltf.js'
  import type { ThrelteGltf } from '../../types/types.js'
  import type { GltfProps } from './types.js'
  import { untrack } from 'svelte'

  type Props = GltfProps & { gltf?: ThrelteGltf | undefined } & ThrelteGltf['materials']

  let {
    url,
    dracoLoader,
    meshoptDecoder,
    ktx2Loader,
    gltf = $bindable(),
    scene = $bindable(),
    animations = $bindable(),
    asset = $bindable(),
    cameras = $bindable(),
    scenes = $bindable(),
    userData = $bindable(),
    parser = $bindable(),
    materials = $bindable(),
    nodes = $bindable(),
    onload,
    onunload,
    onerror,
    children,
    ...props
  }: Props = $props()

  const loader = useGltf({
    dracoLoader,
    meshoptDecoder,
    ktx2Loader
  })

  const onLoad = (data: ThrelteGltf) => {
    if (gltf) onunload?.()

    gltf = data
    scene = data.scene
    animations = data.animations
    asset = data.asset
    cameras = data.cameras
    scenes = data.scenes
    userData = data.userData
    parser = data.parser
    materials = data.materials
    nodes = data.nodes

    onload?.(gltf)
  }

  const onError = (error: Error) => {
    gltf = undefined
    scene = undefined!
    animations = undefined!
    asset = undefined!
    cameras = undefined!
    scenes = undefined!
    userData = undefined!
    parser = undefined!
    nodes = undefined
    materials = undefined
    onerror?.(error)
  }

  const model = $derived(await loader.load(url))
  $inspect(model)

  $effect(() => {
    model
    untrack(() => {
      gltf = model
      scene = model.scene
      animations = model.animations
      asset = model.asset
      cameras = model.cameras
      scenes = model.scenes
      userData = model.userData
      parser = model.parser
      materials = model.materials
      nodes = model.nodes
    })
  })
</script>

<T
  is={model.scene}
  {...props}
>
  {@render children?.({ ref: model.scene })}
</T>
