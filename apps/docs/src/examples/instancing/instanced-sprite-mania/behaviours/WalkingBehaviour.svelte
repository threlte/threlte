<script lang="ts">
  import { T, useTask, watch } from '@threlte/core'
  import { useInstancedSprite } from '@threlte/extras'
  import { Vector2 } from 'three'

  const { updatePosition, count, sprite } = useInstancedSprite()

  const posX: number[] = new Array(count).fill(0)
  const posZ: number[] = new Array(count).fill(0)

  const spread = 40
  const minCenterDistance = 3
  const maxCenterDistance = spread
  const rndPosition: any = () => {
    const x = Math.random() * spread - spread / 2
    const y = Math.random() * spread - spread / 2

    /** min distance from 0,0. Recursive reroll if too close */

    if (Math.sqrt(x ** 2 + y ** 2) < minCenterDistance) {
      return rndPosition()
    }

    return { x, y }
  }

  /** update from 1 because 0 is user controlled and set at 0,0 */
  for (let i = 1; i < count; i++) {
    const pos = rndPosition()
    posX[i] = pos.x
    posZ[i] = pos.y
  }

  type Agent = {
    action: 'Idle' | 'Run'
    velocity: [number, number]
    timer: number
  }

  const agents: Agent[] = []
  for (let i = 0; i < count; i++) {
    agents.push({
      action: 'Run',
      timer: 0.1,
      velocity: [0, 1]
    })
  }

  const velocityHelper = new Vector2(0, 0)

  const pickAnimation = (i: number) => {
    const dirWords = ['Forward', 'Backward', 'Left', 'Right']
    const agent = agents[i] as Agent

    const isHorizontal = Math.abs(agent.velocity[0] * 2) > Math.abs(agent.velocity[1]) ? 2 : 0
    const isLeft = agent.velocity[0] > 0 ? 1 : 0
    const isUp = agent.velocity[1] > 0 ? 0 : 1

    const secondMod = isHorizontal ? isLeft : isUp
    const chosenWord = dirWords.slice(0 + isHorizontal, 2 + isHorizontal)

    const animationName = `${agent.action}${chosenWord[secondMod]}`

    return animationName
  }

  const updateAgents = (delta: number) => {
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i] as Agent

      // timer
      agent.timer -= delta

      // apply velocity
      posX[i] += agent.velocity[0] * delta
      posZ[i] += agent.velocity[1] * delta

      // roll new behaviour when time runs out or agent gets out of bounds
      if (i > 0) {
        const dist = Math.sqrt((posX[i] || 0) ** 2 + (posZ[i] || 0) ** 2)
        if (agent.timer < 0 || dist < minCenterDistance || dist > maxCenterDistance) {
          const runChance = 0.6 + (agent.action === 'Idle' ? 0.3 : 0)
          agent.action = Math.random() < runChance ? 'Run' : 'Idle'

          agent.timer = 5 + Math.random() * 5

          if (agent.action === 'Run') {
            velocityHelper
              .set(Math.random() - 0.5, Math.random() - 0.5)
              .normalize()
              .multiplyScalar(3)
            agent.velocity = velocityHelper.toArray()
          }

          const animIndex = pickAnimation(i)
          if (agent.action === 'Idle') {
            agent.velocity = [0, 0]
          }
          sprite.animation.setAt(i, animIndex)
        }
      }
    }
  }

  useTask((delta) => {
    updateAgents(delta)

    for (let i = 0; i < count; i++) {
      updatePosition(i, [posX[i] || 0, 0.5, posZ[i] || 0])
    }
  })

  let dirs = {
    up: false,
    down: false,
    left: false,
    right: false
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'a' || e.key === 'ArrowLeft') dirs.left = true
    if (e.key === 'd' || e.key === 'ArrowRight') dirs.right = true
    if (e.key === 'w' || e.key === 'ArrowUp') dirs.up = true
    if (e.key === 's' || e.key === 'ArrowDown') dirs.down = true
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'a' || e.key === 'ArrowLeft') dirs.left = false
    if (e.key === 'd' || e.key === 'ArrowRight') dirs.right = false
    if (e.key === 'w' || e.key === 'ArrowUp') dirs.up = false
    if (e.key === 's' || e.key === 'ArrowDown') dirs.down = false

    const animIndex = pickAnimation(0)
    sprite.animation.setAt(0, animIndex)
  }

  const playerMoveVector = new Vector2(0, 0)

  $: {
    if (dirs) {
      playerMoveVector.setX((dirs.left ? -1 : 0) + (dirs.right ? 1 : 0))
      playerMoveVector.setY((dirs.up ? -1 : 0) + (dirs.down ? 1 : 0))
      ;(agents[0] as Agent).velocity = playerMoveVector.normalize().multiplyScalar(3).toArray()
      const animIndex = pickAnimation(0)
      sprite.animation.setAt(0, animIndex)
    }
  }
</script>

<svelte:window
  on:keydown={handleKeyDown}
  on:keyup={handleKeyUp}
/>

<T.Mesh
  position.x={posX[0]}
  position.y={1.3}
  position.z={posZ[0]}
>
  <T.SphereGeometry args={[0.15, 3, 2]} />
  <T.MeshBasicMaterial color="lime" />
</T.Mesh>
