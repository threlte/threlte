<script lang="ts">
  import {
    InstancedSpriteMesh,
    parseAseprite,
    type SpritesheetFormat
  } from '@threejs-kit/instanced-sprite-mesh'
  import { T, useFrame, useLoader, useThrelte, watch } from '@threlte/core'
  import {
    DoubleSide,
    FileLoader,
    LinearFilter,
    Matrix4,
    MeshBasicMaterial,
    NearestFilter,
    RepeatWrapping,
    type Texture,
    type Vector3Tuple
  } from 'three'

  import { useTexture } from '../../hooks/useTexture'
  import { onDestroy, setContext } from 'svelte'
  import { writable } from 'svelte/store'

  export let textureUrl: $$Props['textureUrl']
  export let dataUrl: $$Props['dataUrl'] = ''
  // export let autoplay: $$Props['autoplay'] = true;
  export let count: $$Props['count'] = 1000
  export let fps: $$Props['fps'] = 15
  export let filter: $$Props['filter'] = 'nearest'
  export let alphaTest: $$Props['alphaTest'] = 0.1
  export let transparent: $$Props['transparent'] = true

  export let texture: Texture | undefined = undefined
  export let spritesheet: SpritesheetFormat | undefined = undefined

  $: console.log({ spritesheet })

  const baseMaterial = new MeshBasicMaterial({
    transparent: transparent,
    alphaTest: alphaTest,
    // needs to be double side for shading
    side: DoubleSide
  })

  type SpriteAnimations =
    | 'RunRight'
    | 'RunLeft'
    | 'RunForward'
    | 'IdleRight'
    | 'IdleLeft'
    | 'IdleForward'
    | 'RunBackward'
    | 'IdleBackward'

  const { renderer } = useThrelte()

  const mesh: InstancedSpriteMesh<MeshBasicMaterial, SpriteAnimations> = new InstancedSpriteMesh(
    baseMaterial,
    count,
    renderer,
    {
      triGeometry: true,
      spritesheet
    }
  )

  $: mesh.material.alphaTest = alphaTest
  $: mesh.material.transparent = transparent

  const textureStore = texture
    ? writable(texture)
    : useTexture(textureUrl, {
        transform: (value: Texture) => {
          value.matrixAutoUpdate = false
          value.generateMipmaps = false
          value.premultiplyAlpha = false
          value.wrapS = value.wrapT = RepeatWrapping
          value.magFilter = value.minFilter = filter === 'nearest' ? NearestFilter : LinearFilter
          return value
        }
      })

  watch(textureStore, () => {
    mesh.material.map = $textureStore
    mesh.material.needsUpdate = true
  })

  const jsonStore = spritesheet
    ? writable(spritesheet)
    : useLoader(FileLoader).load(dataUrl, {
        transform: (file) => {
          if (typeof file !== 'string') return
          try {
            return JSON.parse(file)
          } catch {
            return
          }
        }
      })

  const animationMap = writable<Map<SpriteAnimations, number>>(new Map())

  watch(jsonStore, (rawSpritesheet) => {
    if (rawSpritesheet && !spritesheet) {
      const spritesheet = parseAseprite(rawSpritesheet)
      mesh.spritesheet = spritesheet
      animationMap.set(mesh.animationMap)
    }

    if (spritesheet) {
      mesh.spritesheet = spritesheet
      animationMap.set(mesh.animationMap)
    }
  })

  $: mesh.fps = fps

  let initialized = false

  $: {
    if ($textureStore && mesh.material && !initialized && mesh) {
      mesh.castShadow = true
    }
  }

  let dirtyInstanceMatrix = false

  const tempMatrix = new Matrix4()

  const updatePosition = (id: number, position: Vector3Tuple) => {
    tempMatrix.setPosition(...position)
    mesh.setMatrixAt(id, tempMatrix)
    dirtyInstanceMatrix = true
  }

  const setAnimation = (instanceId: number, animationId: SpriteAnimations) => {
    mesh.play(animationId, true, 'REVERSE').at(instanceId)
  }

  setContext('instanced-sprite-ctx', {
    mesh,
    count,
    animationMap,
    updatePosition,
    setAnimation
  })

  useFrame(() => {
    mesh.update()
  })

  useFrame(({ clock }) => {
    if (dirtyInstanceMatrix) {
      mesh.instanceMatrix.needsUpdate = true
      dirtyInstanceMatrix = false
    }
  })

  let j = 0
</script>

<T is={mesh} />

<slot />
