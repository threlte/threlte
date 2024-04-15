<script lang="ts">
  import { InstancedSpriteMesh, PLAY_MODE } from '@threejs-kit/instanced-sprite-mesh'
  import { T, useTask, useThrelte, watch } from '@threlte/core'
  import {
    DoubleSide,
    Matrix4,
    Mesh,
    MeshBasicMaterial,
    type Vector2Tuple,
    type Vector3Tuple
  } from 'three'

  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type {
    InstancedSpriteProps,
    InstancedSpriteSlots,
    InstancedSpriteUserCtx
  } from './InstancedSprite.svelte'
  import SpriteInstance from './SpriteInstance.svelte'

  type $$Props = Required<InstancedSpriteProps>

  type $$Slots = InstancedSpriteSlots

  const g = new Mesh()
  g.material

  export let autoUpdate: $$Props['autoUpdate'] = true
  export let baseMaterial: $$Props['baseMaterial'] = MeshBasicMaterial
  export let fps: $$Props['fps'] = 15
  export let billboarding: $$Props['billboarding']
  export let playmode: $$Props['playmode'] = 'FORWARD'
  export let count: $$Props['count'] = 1000
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

  export let spritesheet: $$Props['spritesheet']

  const spriteBaseMaterial = new baseMaterial({
    transparent: transparent,
    alphaTest: alphaTest,
    // needs to be double side for shading
    side: DoubleSide
  })

  const { renderer } = useThrelte()

  export let ref = new InstancedSpriteMesh(spriteBaseMaterial, count, renderer)

  const animationMap = writable<Map<string, number>>(new Map())

  $: {
    if (spritesheet) {
      ref.spritesheet = spritesheet.spritesheet
      animationMap.set(ref.animationMap as any)
      ref.material.map = spritesheet.texture
      ref.material.needsUpdate = true
    }
  }

  $: ref.material.alphaTest = alphaTest
  $: ref.material.transparent = transparent
  $: ref.fps = fps
  $: ref.hueShift.setGlobal(hueShift)

  // BILLBOARDING
  const billboardingStore = writable<boolean | undefined>(undefined)
  $: billboardingStore.set(billboarding)
  watch([billboardingStore], () => {
    if ($billboardingStore === undefined) {
      ref.billboarding.unsetAll()
      return
    } else {
      ref.billboarding.setAll($billboardingStore)
    }
  })

  // PLAYMODE
  const playmodeStore = writable<keyof typeof PLAY_MODE | undefined>(undefined)
  $: playmodeStore.set(playmode)
  watch([playmodeStore], () => {
    if ($playmodeStore === undefined) {
      ref.playmode.setAll('PAUSE')
      return
    } else {
      ref.playmode.setAll($playmodeStore)
    }
  })

  // RANDOM PLAYBACK OFFSET
  const rndOffsetStore = writable(randomPlaybackOffset)
  $: rndOffsetStore.set(randomPlaybackOffset)
  let previousRndOffset = false
  watch([rndOffsetStore], ([offset]) => {
    // going from no offset to random
    if (previousRndOffset === false && offset) {
      ref.offset.randomizeAll(offset === true ? 100 : offset)
    }
    // going from random offset to none
    if (previousRndOffset === true && !offset) {
      for (let i = 0; i < count; i++) {
        ref.offset.setAt(i, 0)
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
    ref.setMatrixAt(id, tempMatrix)
    instanceMatrixNeedsUpdate = true
  }

  // Context for user facing components and hooks
  setContext<InstancedSpriteUserCtx<any>>('instanced-sprite-ctx', {
    sprite: ref,
    count,
    animationMap,
    updatePosition
  })

  useTask(() => {
    if (autoUpdate) {
      ref.update()
    }
    if (instanceMatrixNeedsUpdate) {
      ref.instanceMatrix.needsUpdate = true
      instanceMatrixNeedsUpdate = false
    }
  })

  const proxySpritefileComponent = new Proxy(SpriteInstance, {
    construct(_target, [args]) {
      return new SpriteInstance(args)
    }
  })
</script>

<T
  is={ref}
  frustumCulled={false}
  {...$$restProps}
>
  <slot Instance={proxySpritefileComponent} />
</T>
