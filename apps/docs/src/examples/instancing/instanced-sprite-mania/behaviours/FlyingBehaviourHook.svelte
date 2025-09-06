<script lang="ts">
  import { useTask } from '@threlte/core'

  import { Vector2 } from 'three'
  import { useDemonSprite } from '../sprites/FlyerSpritesTyped.svelte'
  import { randomPosition } from '../util'

  const { updatePosition, count, animationMap, sprite } = useDemonSprite()

  sprite.offset.randomizeAll()

  type FlyingAgent = {
    action: 'Idle' | 'Run'
    velocity: [number, number]
    timer: number
    baseHeight: number
  }

  const agents: FlyingAgent[] = []
  for (let i = 0; i < count; i++) {
    agents.push({
      action: 'Run',
      timer: 0.1,
      velocity: [0, 1],
      baseHeight: 2 + Math.random() * 15
    })
  }

  const posX: number[] = new Array(count).fill(0)
  const posY: number[] = new Array(count).fill(0)
  const posZ: number[] = new Array(count).fill(0)

  const spawnRadius = 250
  const minCenterDistance = 5
  const maxCenterDistance = spawnRadius

  for (let i = 0; i < agents.length; i++) {
    const pos = randomPosition(spawnRadius)
    posX[i] = pos.x
    posY[i] = agents[i]?.baseHeight ?? 0
    posZ[i] = pos.y
  }

  const velocityHelper = new Vector2(0, 0)

  let totalTime = 0

  const updateAgents = (delta: number) => {
    for (let i = 0; i < agents.length; i++) {
      // timer

      const agent = agents[i]!

      agent.timer -= delta
      totalTime += delta

      // apply velocity
      posX[i]! += agent.velocity[0] ?? 0 * delta
      posY[i] = agent.baseHeight ?? 0 + Math.sin(totalTime * 0.00005 + i)
      posZ[i]! += agent.velocity[1] ?? 0 * delta

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
              .multiplyScalar(2.1)
            agent.velocity = velocityHelper.toArray()

            if (velocityHelper.x > 0) {
              sprite.flipX.setAt(i, false)
            } else {
              sprite.flipX.setAt(i, true)
            }
          }
        }
      }
    }
  }

  useTask((_delta) => {
    if ($animationMap.size > 0) {
      updateAgents(_delta)
    }

    for (let i = 0; i < count; i++) {
      updatePosition(i, [posX[i] || 0, posY[i] || 0, posZ[i] || 0], [5, 5])
      sprite.animation.setAt(i, 0 as unknown as 'idle')
    }
  })
</script>
