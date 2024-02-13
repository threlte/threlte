<script lang="ts">
  import {
    InstancedSpriteMesh,
    PLAY_MODE,
    type SpritesheetFormat
  } from '@threejs-kit/instanced-sprite-mesh'
  import { T, useTask, useThrelte, watch } from '@threlte/core'
  import {
    DoubleSide,
    Matrix4,
    MeshBasicMaterial,
    type Texture,
    type Vector2Tuple,
    type Vector3Tuple
  } from 'three'

  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type {
    InstancedSpriteEvents,
    InstancedSpriteInternalCtx,
    InstancedSpriteProps,
    InstancedSpriteSlots,
    InstancedSpriteUserCtx
  } from './InstancedSprite.svelte'
  import type { SpritesheetContext } from './Spritesheet'

  type $$Props = Required<InstancedSpriteProps>
  type $$Events = InstancedSpriteEvents
  type $$Slots = InstancedSpriteSlots

  export let autoUpdate: $$Props['autoUpdate'] = true
  export let baseMaterial: $$Props['baseMaterial'] = MeshBasicMaterial
  export let fps: $$Props['fps'] = 15
  export let billboarding: $$Props['billboarding']
  export let playmode: $$Props['playmode'] = 'FORWARD'

  export let count: $$Props['count'] = 1000
  export let filter: $$Props['filter'] = 'nearest'
  export let alphaTest: $$Props['alphaTest'] = 0.1
  export let transparent: $$Props['transparent'] = true
  export let hueShift:
    | {
        h: number
        s: number
        v: number
      }
    | undefined = undefined

  export let randomPlaybackOffset: $$Props['randomPlaybackOffset'] = false

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
  export let mesh: InstancedSpriteMesh<any, any> = new InstancedSpriteMesh(
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
    animationMap.set(mesh.animationMap as any)
  }

  const setTexture = (texture: Texture) => {
    // todo upstream types
    //@ts-ignore
    mesh.material.map = texture
    //@ts-ignore
    mesh.material.needsUpdate = true
  }

  const textureStore = writable(undefined)

  watch(textureStore, (texture) => {
    if (texture) setTexture(texture)
  })

  const spritesheetContext = getContext<SpritesheetContext>(
    'instanced-spritesheet-top-level-stores-ctx'
  )

  if (spritesheetContext) {
    watch(spritesheetContext.spritesheetStore, (s) => {
      if (s) {
        setSpritesheet(s)
      }
    })

    watch(spritesheetContext.textureStore, (t) => {
      setTexture(t)
    })
  }

  $: {
    if (!spritesheetContext && spritesheet && texture) {
      setSpritesheet(spritesheet)
      setTexture(texture)
    }
  }

  // todo upstream types
  //@ts-ignore
  $: mesh.material.alphaTest = alphaTest
  //@ts-ignore
  $: mesh.material.transparent = transparent
  $: mesh.fps = fps
  $: mesh.hueShift.setGlobal(hueShift)

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

  // RANDOM PLAYBACK OFFSET
  const rndOffsetStore = writable(randomPlaybackOffset)
  $: rndOffsetStore.set(randomPlaybackOffset)
  let previousRndOffset = false
  watch([rndOffsetStore], ([offset]) => {
    // going from no offset to random
    if (previousRndOffset === false && offset) {
      mesh.offset.randomizeAll(offset === true ? undefined : offset)
    }
    // going from random offset to none
    if (previousRndOffset === true && !offset) {
      for (let i = 0; i < count; i++) {
        mesh.offset.setAt(i, 0)
      }
    }
    previousRndOffset = offset ? true : false
  })

  // MATRIX UPDATE - POSITION AND SCALE
  let instanceMatrixNeedsUpdate = false
  const tempMatrix = new Matrix4()
  const updatePosition = (id: number, position: Vector3Tuple, scale: Vector2Tuple = [1, 1]) => {
    // Since this uses matrix updates, position and scale have to be updated at the same.
    tempMatrix.makeScale(scale[0], scale[1], 1)
    tempMatrix.setPosition(...position)
    mesh.setMatrixAt(id, tempMatrix)
    instanceMatrixNeedsUpdate = true
  }

  // Context for user facing components and hooks
  setContext<InstancedSpriteUserCtx>('instanced-sprite-ctx', {
    mesh,
    count,
    animationMap,
    updatePosition
  })

  // Internal context used for building spritesheet etc
  setContext<InstancedSpriteInternalCtx>('internal-instanced-sprite-ctx', {
    setSpritesheet,
    setTexture
  })

  useTask(() => {
    if (autoUpdate) {
      mesh.update()
    }
    if (instanceMatrixNeedsUpdate) {
      mesh.instanceMatrix.needsUpdate = true
      instanceMatrixNeedsUpdate = false
    }
  })
</script>

{#if mesh}
  <T
    is={mesh}
    frustumCulled={false}
    {...$$restProps}
  />
{/if}

<slot />
