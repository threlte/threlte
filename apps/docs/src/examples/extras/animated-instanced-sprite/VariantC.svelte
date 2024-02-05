<script lang="ts">
  import { useTask } from '@threlte/core'
  import {
    AnimatedInstancedSprite,
    SpriteFile,
    SpriteAnimation,
    Spritesheet
  } from '@threlte/extras'
  import { Matrix4 } from 'three'

  export let billboarding = false
  export let fps: number

  // TODO - export types for instanced mesh + typed animation names??
  let spriteMesh: any

  const goblinCount = 50

  const goblinPositionSpread = 40

  const tempMatrix = new Matrix4()

  let animationNames: string[] = []
  $: {
    if (spriteMesh) {
      console.log({ spriteMesh })
      // randomize goblin positions by directly accessing the instanced sprite api without any helpers
      for (let i = 0; i < goblinCount; i++) {
        tempMatrix.makeScale(5, 5, 1)
        tempMatrix.setPosition(
          Math.random() * goblinPositionSpread - goblinPositionSpread / 2,
          0.85,
          Math.random() * goblinPositionSpread - goblinPositionSpread / 2
        )
        spriteMesh.setMatrixAt(i, tempMatrix)
      }

      // get animation names
      animationNames = Object.keys(spriteMesh.spritesheet.animations)
    }
  }

  let goblinId = 0

  useTask(() => {
    if (spriteMesh) {
      // Pick a random animation for a goblin, 1 change per frame
      spriteMesh.animation.setAt(
        goblinId,
        animationNames[Math.floor(Math.random() * animationNames.length)]
      )
    }

    goblinId++
    if (goblinId > goblinCount) goblinId = 0
  })
</script>

<Spritesheet>
  <SpriteFile
    path="/textures/sprites/goblin/Attack.png"
    options={{
      type: 'rowColumn',
      w: 8,
      h: 1
    }}
  >
    <SpriteAnimation
      name="attack"
      frameRange={[0, 8]}
    />
  </SpriteFile>

  <SpriteFile
    path="/textures/sprites/goblin/Death.png"
    options={{
      type: 'rowColumn',
      w: 4,
      h: 1
    }}
  >
    <SpriteAnimation
      name="death"
      frameRange={[0, 4]}
    />
  </SpriteFile>
  <!-- Idle, Run, TakeHit -->
  <SpriteFile
    path="/textures/sprites/goblin/Idle.png"
    options={{
      type: 'rowColumn',
      w: 4,
      h: 1
    }}
  >
    <SpriteAnimation
      name="idle"
      frameRange={[0, 4]}
    />
  </SpriteFile>

  <SpriteFile
    path="/textures/sprites/goblin/Run.png"
    options={{
      type: 'rowColumn',
      w: 8,
      h: 1
    }}
  >
    <SpriteAnimation
      name="run"
      frameRange={[0, 4]}
    />
  </SpriteFile>

  <SpriteFile
    path="/textures/sprites/goblin/TakeHit.png"
    options={{
      type: 'rowColumn',
      w: 4,
      h: 1
    }}
  >
    <SpriteAnimation
      name="takeHit"
      frameRange={[0, 4]}
    />
  </SpriteFile>

  <AnimatedInstancedSprite
    count={goblinCount}
    playmode={'FORWARD'}
    {fps}
    {billboarding}
    bind:ref={spriteMesh}
  />
</Spritesheet>
