<script lang="ts">
  import {
    InstancedSpriteMesh,
    parseAseprite,
    PLAY_MODE,
    type SpritesheetFormat
  } from '@threejs-kit/instanced-sprite-mesh'
  import { T, useLoader, useTask, useThrelte, watch } from '@threlte/core'
  import {
    DoubleSide,
    FileLoader,
    LinearFilter,
    Matrix4,
    MeshBasicMaterial,
    NearestFilter,
    RepeatWrapping,
    type Texture,
    type Vector2Tuple,
    type Vector3Tuple
  } from 'three'

  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { useTexture } from '../../hooks/useTexture'
  import type {
    AnimatedInstancedSpriteEvents,
    AnimatedInstancedSpriteInternalCtx,
    AnimatedInstancedSpriteProps,
    AnimatedInstancedSpriteSlots
  } from './AnimatedInstancedSprite.svelte'

  type $$Props = Required<AnimatedInstancedSpriteProps>
  type $$Events = AnimatedInstancedSpriteEvents
  type $$Slots = AnimatedInstancedSpriteSlots

  export let baseMaterial: $$Props['baseMaterial'] = MeshBasicMaterial
  export let fps: $$Props['fps'] = 15
  export let billboarding: $$Props['billboarding']
  export let playmode: $$Props['playmode'] = 'FORWARD'

  export let textureUrl: $$Props['textureUrl']
  export let count: $$Props['count'] = 1000
  export let filter: $$Props['filter'] = 'nearest'
  export let alphaTest: $$Props['alphaTest'] = 0.1
  export let transparent: $$Props['transparent'] = true

  export let texture: Texture | undefined = undefined
  export let spritesheet: SpritesheetFormat | undefined = undefined

  const spriteBaseMaterial = new baseMaterial({
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

  // todo upstream types
  let mesh: InstancedSpriteMesh<MeshBasicMaterial, SpriteAnimations> = new InstancedSpriteMesh(
    spriteBaseMaterial,
    count,
    renderer,
    {
      triGeometry: false
    }
  )

  const animationMap = writable<Map<SpriteAnimations, number>>(new Map())

  const setSpritesheet = (spritesheet: SpritesheetFormat) => {
    mesh.spritesheet = spritesheet
    // todo upstream types
    animationMap.set(mesh.animationMap)
  }

  const setTexture = (texture: Texture) => {
    mesh.material.map = $textureStore
    mesh.material.needsUpdate = true
  }

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
    setTexture($textureStore)
  })

  //
  // REACTIVE PROPS
  //

  // VANILLA
  $: mesh.material.alphaTest = alphaTest
  $: mesh.material.transparent = transparent

  // FPS
  $: mesh.fps = fps

  // BILLBOARDING
  const billboardingStore = writable<boolean | undefined>(undefined)
  $: billboardingStore.set(billboarding)
  watch([billboardingStore], () => {
    if ($billboardingStore === undefined) {
      mesh.billboarding.unsetAll()
      return
    } else {
      mesh.billboarding.setAll($billboardingStore)
    }
  })

  // PLAYMODE
  const playmodeStore = writable<keyof typeof PLAY_MODE | undefined>(undefined)
  $: playmodeStore.set(playmode)
  watch([playmodeStore], () => {
    if ($playmodeStore === undefined) {
      mesh.playmode.setAll('PAUSE')
      return
    } else {
      mesh.playmode.setAll($playmodeStore)
    }
  })

  //
  // MATRIX UPDATE - POSITION AND SCALE
  //

  let instanceMatrixNeedsUpdate = false
  const tempMatrix = new Matrix4()

  // Since this uses matrix updates, position and scale have to be updated at the same.
  const updatePosition = (id: number, position: Vector3Tuple, scale: Vector2Tuple = [1, 1]) => {
    tempMatrix.makeScale(scale[0], scale[1], 1)
    tempMatrix.setPosition(...position)
    mesh.setMatrixAt(id, tempMatrix)
    instanceMatrixNeedsUpdate = true
  }

  const setAnimation = (instanceId: number, animationId: SpriteAnimations) => {
    mesh.animation.setAt(instanceId, animationId)
  }

  setContext('instanced-sprite-ctx', {
    mesh,
    count,
    animationMap,
    updatePosition,
    setAnimation
  })

  setContext<AnimatedInstancedSpriteInternalCtx>('internal-instanced-sprite-ctx', {
    setSpritesheet,
    setTexture
  })

  useTask(() => {
    mesh.update()
    if (instanceMatrixNeedsUpdate) {
      mesh.instanceMatrix.needsUpdate = true
      instanceMatrixNeedsUpdate = false
    }
  })
</script>

{#if mesh}
  <T is={mesh} />
{/if}

<slot />
