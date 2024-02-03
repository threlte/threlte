<script lang="ts">
  import { useTask } from '@threlte/core'
  import { getContext } from 'svelte'
  import { Vector2 } from 'three'

  const spriteCtx: any = getContext('instanced-sprite-ctx')
  const { updatePosition, count, animationMap, mesh } = spriteCtx

  mesh.offset.randomizeAll()

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

  const spread = 500
  const minCenterDistance = 5
  const maxCenterDistance = spread
  const rndPosition: any = () => {
    const x = Math.random() * spread - spread / 2
    const y = Math.random() * spread - spread / 2

    if (Math.sqrt(x ** 2 + y ** 2) < minCenterDistance) {
      return rndPosition()
    }

    return { x, y }
  }

  for (let i = 0; i < agents.length; i++) {
    const pos = rndPosition()
    posX[i] = pos.x
    posY[i] = agents[i].baseHeight
    posZ[i] = pos.y
  }

  const velocityHelper = new Vector2(0, 0)

  let totalTime = 0

  const updateAgents = (delta: number) => {
    for (let i = 0; i < agents.length; i++) {
      // timer

      agents[i].timer -= delta
      totalTime += delta

      // apply velocity
      posX[i] += agents[i].velocity[0] * delta
      posY[i] = agents[i]?.baseHeight + Math.sin(totalTime * 0.00005 + i)
      posZ[i] += agents[i].velocity[1] * delta

      // roll new behaviour when time runs out or agent gets out of bounds
      if (i > 0) {
        const dist = Math.sqrt((posX[i] || 0) ** 2 + (posZ[i] || 0) ** 2)
        if (agents[i].timer < 0 || dist < minCenterDistance || dist > maxCenterDistance) {
          const runChance = 0.6 + (agents[i].action === 'Idle' ? 0.3 : 0)
          agents[i].action = Math.random() < runChance ? 'Run' : 'Idle'

          agents[i].timer = 5 + Math.random() * 5

          if (agents[i].action === 'Run') {
            velocityHelper
              .set(Math.random() - 0.5, Math.random() - 0.5)
              .normalize()
              .multiplyScalar(2.1)
            agents[i].velocity = velocityHelper.toArray()

            if (velocityHelper.x > 0) {
              mesh.flipX.setAt(i, false)
            } else {
              mesh.flipX.setAt(i, true)
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
      mesh.animation.setAt(i, 0)
    }
  })
</script>
