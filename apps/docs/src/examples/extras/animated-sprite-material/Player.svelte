<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { AnimatedSpriteMaterial, Suspense } from '@threlte/extras'
  import { Mesh, MeshStandardMaterial } from 'three'

  const keyboard = { x: 0 }
  const pressed = new Set<string>()

  let animation = 'IdleRight'

  export const playerPosition: [number, number, number] = [-2.0, -2.75, 0.01]
  const mesh = new Mesh()
  mesh.position.set(...playerPosition)

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

  useTask((delta) => {
    if (keyboard.x > 0) {
      animation = 'RunLeft'
    } else if (keyboard.x < 0) {
      animation = 'RunRight'
    } else {
      animation = animation.replace('Run', 'Idle')
    }

    if (keyboard.x === 0) return
    playerPosition[0] += -keyboard.x * (delta * 2)
    mesh.position.set(...playerPosition)
  })

  let play: () => void
  let pause: () => void
</script>

<svelte:window
  on:keydown={handleKeydown}
  on:keyup={handleKeyup}
/>

<Suspense>
  <T is={mesh}>
    <AnimatedSpriteMaterial
      is={new MeshStandardMaterial()}
      bind:play
      bind:pause
      {animation}
      textureUrl="/textures/sprites/player.png"
      dataUrl="/textures/sprites/player.json"
    />
    <T.PlaneGeometry args={[0.5, 0.5]} />
  </T>
</Suspense>
