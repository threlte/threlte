<script lang="ts">
  import { T, useFrame, watch } from '@threlte/core'
  import { getContext } from 'svelte'
  import { Vector2 } from 'three'

  const spriteCtx: any = getContext('instanced-sprite-ctx')
  const { updatePosition, count, animationMap, setAnimation } = spriteCtx

  //@ts-ignore
  watch(animationMap, (anims: Map<string, number>) => {
    // console.log(anims.keys());
  })

  const posX: number[] = new Array(count).fill(0)
  const posZ: number[] = new Array(count).fill(0)

  const spread = 400
  const minCenterDistance = 5
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

  const pickAnimation = (i) => {
    const dirWords = ['Forward', 'Backward', 'Left', 'Right']

    const isHorizontal =
      Math.abs(agents[i].velocity[0] * 2) > Math.abs(agents[i].velocity[1]) ? 2 : 0
    const isLeft = agents[i].velocity[0] > 0 ? 1 : 0
    const isUp = agents[i].velocity[1] > 0 ? 0 : 1

    const secondMod = isHorizontal ? isLeft : isUp
    const chosenWord = dirWords.slice(0 + isHorizontal, 2 + isHorizontal)

    const animationName = `${agents[i].action}${chosenWord[secondMod]}`
    const animIndex = $animationMap.get(animationName)

    return animationName
  }

  const updateAgents = (delta: number) => {
    for (let i = 0; i < agents.length; i++) {
      // timer
      agents[i].timer -= delta

      // apply velocity
      posX[i] += agents[i].velocity[0] * delta
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
              .multiplyScalar(3)
            agents[i].velocity = velocityHelper.toArray()
          }

          const animIndex = pickAnimation(i)
          if (agents[i].action === 'Idle') {
            agents[i].velocity = [0, 0]
          }
          setAnimation(i, animIndex)

          if (i == 1) {
            // console.log(animIndex)
            // console.log({ animationName, agent: agents[i] })
          }
        }
      }
    }
  }

  useFrame((_, _delta) => {
    if ($animationMap.size > 0) {
      updateAgents(_delta)
    }

    for (let i = 0; i < count; i++) {
      // $camera.position.set(0 + (posX[0] || 0), 7, 15 + (posZ[0] || 0))

      updatePosition(i, [posX[i] || 0, 1, posZ[i] || 0])
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
    setAnimation(0, animIndex)
  }

  const playerMoveVector = new Vector2(0, 0)

  $: {
    if (dirs) {
      playerMoveVector.setX((dirs.left ? -1 : 0) + (dirs.right ? 1 : 0))
      playerMoveVector.setY((dirs.up ? -1 : 0) + (dirs.down ? 1 : 0))

      agents[0].velocity = playerMoveVector.normalize().multiplyScalar(3).toArray()
      const animIndex = pickAnimation(0)
      setAnimation(0, animIndex)
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

<T.DirectionalLight
  shadow.mapSize={[2048, 2048]}
  shadow.camera.far={128}
  shadow.camera.near={0.01}
  shadow.camera.left={-20}
  shadow.camera.right={20}
  shadow.camera.top={20}
  shadow.camera.bottom={-20}
  shadow.bias={-0.001}
  position={[0, 4, -10]}
  intensity={3}
  castShadow
/>
