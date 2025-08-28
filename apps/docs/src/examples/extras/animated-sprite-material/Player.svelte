<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { AnimatedSpriteMaterial, Suspense } from '@threlte/extras'
  import { Mesh, MeshStandardMaterial } from 'three'

  type Props = {
    position: [number, number, number]
  }
  let { position = $bindable() }: Props = $props()

  const keyboard = { x: 0 }
  const pressed = new Set<string>()

  let sprite = $state.raw<AnimatedSpriteMaterial>()
  let animation = $state('IdleRight')

  const mesh = new Mesh()
  mesh.position.set(...position)

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

    if (e.key === 'q') sprite?.play()
    if (e.key === 'e') sprite?.pause()
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
    position[0] += -keyboard.x * (delta * 2)
    mesh.position.set(...position)
  })
</script>

<svelte:window
  onkeydown={handleKeydown}
  onkeyup={handleKeyup}
/>

<Suspense>
  <T is={mesh}>
    <AnimatedSpriteMaterial
      is={new MeshStandardMaterial()}
      {animation}
      textureUrl="/textures/sprites/player.png"
      dataUrl="/textures/sprites/player.json"
      bind:this={sprite}
    />
    <T.PlaneGeometry args={[0.5, 0.5]} />
  </T>
</Suspense>
