<script lang="ts">
  import { InstancedSpriteMesh } from '@threejs-kit/instanced-sprite-mesh'
  import { T, useTask, useThrelte } from '@threlte/core'
  import {
    DoubleSide,
    Matrix4,
    MeshBasicMaterial,
    type Vector2Tuple,
    type Vector3Tuple
  } from 'three'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type { InstancedSpriteProps, InstancedSpriteUserCtx } from './types.js'
  import SpriteInstance from './SpriteInstance.svelte'

  let {
    autoUpdate = true,
    baseMaterial = MeshBasicMaterial,
    fps = 15,
    billboarding,
    playmode = 'FORWARD',
    count = 1000,
    alphaTest = 0.1,
    transparent = true,
    hueShift,
    randomPlaybackOffset = false,
    spritesheet,
    ref = $bindable(),
    children,
    ...props
  }: InstancedSpriteProps = $props()

  const spriteBaseMaterial = new baseMaterial({
    transparent: transparent,
    alphaTest: alphaTest,
    // needs to be double side for shading
    side: DoubleSide
  })

  const { renderer } = useThrelte()

  const mesh = new InstancedSpriteMesh(spriteBaseMaterial, count, renderer)

  const animationMap = writable<Map<string, number>>(new Map())

  $effect.pre(() => {
    if (spritesheet) {
      mesh.spritesheet = spritesheet.spritesheet
      animationMap.set(mesh.animationMap as any)
      mesh.material.map = spritesheet.texture
      mesh.material.needsUpdate = true
    }
  })

  $effect.pre(() => {
    mesh.material.alphaTest = alphaTest
  })
  $effect.pre(() => {
    mesh.material.transparent = transparent
  })
  $effect.pre(() => {
    mesh.fps = fps
  })
  $effect.pre(() => mesh.hueShift.setGlobal(hueShift))
  // BILLBOARDING
  $effect.pre(() => {
    if (billboarding === undefined) {
      mesh.billboarding.unsetAll()
      return
    } else {
      mesh.billboarding.setAll(billboarding)
    }
  })

  // PLAYMODE
  $effect.pre(() => {
    if (playmode === undefined) {
      mesh.playmode.setAll('PAUSE')
      return
    } else {
      mesh.playmode.setAll(playmode)
    }
  })

  // RANDOM PLAYBACK OFFSET
  let previousRndOffset = $state(false)

  $effect.pre(() => {
    // going from no offset to random
    if (previousRndOffset === false && randomPlaybackOffset) {
      mesh.offset.randomizeAll(randomPlaybackOffset === true ? 100 : randomPlaybackOffset)
    }

    // going from random offset to none
    if (previousRndOffset === true && !randomPlaybackOffset) {
      for (let i = 0; i < count; i++) {
        mesh.offset.setAt(i, 0)
      }
    }
    previousRndOffset = randomPlaybackOffset ? true : false
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
  setContext<InstancedSpriteUserCtx<any>>('instanced-sprite-ctx', {
    sprite: mesh,
    count,
    animationMap,
    updatePosition
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

  mesh.update()
</script>

<T
  is={mesh}
  bind:ref
  frustumCulled={false}
  {...props}
>
  {@render children?.({ Instance: SpriteInstance })}
</T>
