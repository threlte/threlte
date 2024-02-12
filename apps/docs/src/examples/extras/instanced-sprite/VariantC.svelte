<script lang="ts">
  import { useTask } from '@threlte/core'
  import { InstancedSprite, Spritesheet } from '@threlte/extras'
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

<Spritesheet
  let:File
  let:Animation
>
  <File
    textureUrl="/textures/sprites/goblin/Attack.png"
    options={{
      type: 'rowColumn',
      width: 8,
      height: 1
    }}
  >
    <Animation
      name="attack"
      frameRange={[0, 8]}
    />
  </File>

  <File
    textureUrl="/textures/sprites/goblin/Death.png"
    options={{
      type: 'rowColumn',
      width: 4,
      height: 1
    }}
  >
    <Animation
      name="death"
      frameRange={[0, 4]}
    />
  </File>
  <File
    textureUrl="/textures/sprites/goblin/Idle.png"
    options={{
      type: 'rowColumn',
      width: 4,
      height: 1
    }}
  >
    <Animation
      name="idle"
      frameRange={[0, 4]}
    />
  </File>

  <File
    textureUrl="/textures/sprites/goblin/Run.png"
    options={{
      type: 'rowColumn',
      width: 8,
      height: 1
    }}
  >
    <Animation
      name="run"
      frameRange={[0, 4]}
    />
  </File>

  <File
    textureUrl="/textures/sprites/goblin/TakeHit.png"
    options={{
      type: 'rowColumn',
      width: 4,
      height: 1
    }}
  >
    <Animation
      name="takeHit"
      frameRange={[0, 4]}
    />
  </File>

  <InstancedSprite
    count={goblinCount}
    playmode={'FORWARD'}
    {fps}
    {billboarding}
    bind:ref={spriteMesh}
  />
</Spritesheet>
