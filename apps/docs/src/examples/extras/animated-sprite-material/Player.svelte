<script lang="ts">
  import * as THREE from 'three'
  import { T, useTask } from '@threlte/core'
  import { AnimatedSpriteMaterial } from '@threlte/extras'

  const keyboard = { x: 0 }
  const pressed = new Set<string>()

  let animation = 'IdleLeft'

  const handleKey = (key: string, value: 0 | 1) => {
    switch (key.toLowerCase()) {
      case 'a':
      case 'arrowleft':
        return (keyboard.x = +value)
      case 'd':
      case 'arrowright':
        return (keyboard.x = -value)
    }
    return
  }

  const handleKeydown = (e: KeyboardEvent) => {
    pressed.add(e.key)
    pressed.forEach((key) => handleKey(key, 1))
  }

  const handleKeyup = (e: KeyboardEvent) => {
    pressed.delete(e.key)
    handleKey(e.key, 0)
    pressed.forEach((key) => handleKey(key, 1))

    if (e.key === 'q') play()
    if (e.key === 'e') pause()
  }

  let ref: THREE.Mesh

  useTask(() => {
    ref.position.x += -keyboard.x * 0.03

    if (keyboard.x > 0) {
      animation = 'RunLeft'
    } else if (keyboard.x < 0) {
      animation = 'RunRight'
    } else {
      animation = animation.replace('Run', 'Idle')
    }
  })

  let play: () => void
  let pause: () => void
</script>

<svelte:window
  on:keydown={handleKeydown}
  on:keyup={handleKeyup}
/>

<T.Mesh
  bind:ref
  position.y={-2.75}
  position.x={0.5}
  position.z={0.01}
>
  <AnimatedSpriteMaterial
    is={new THREE.MeshStandardMaterial()}
    bind:play
    bind:pause
    {animation}
    textureUrl="/textures/sprites/player.png"
    dataUrl="/textures/sprites/player.json"
  />
  <T.PlaneGeometry args={[0.5, 0.5]} />
</T.Mesh>
