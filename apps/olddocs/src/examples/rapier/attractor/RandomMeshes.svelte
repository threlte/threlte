<script
  lang="ts"
  context="module"
>
  const geometry = new SphereGeometry(1)
  const material = new MeshBasicMaterial({ color: 'red' })
</script>

<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, RigidBody } from '@threlte/rapier'
  import { MeshBasicMaterial, SphereGeometry, Vector3 } from 'three'

  export let count: number = 20
  export let rangeX: [number, number] = [-20, 20]
  export let rangeY: [number, number] = [-20, 20]
  export let rangeZ: [number, number] = [-20, 20]

  const getId = () => {
    return Math.random().toString(16).slice(2)
  }

  const randomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min
  }

  const getRandomPosition = (): Parameters<Vector3['set']> => {
    return new Vector3(
      randomNumber(rangeX[0], rangeX[1]),
      randomNumber(rangeY[0], rangeY[1]),
      randomNumber(rangeZ[0], rangeZ[1])
    ).toArray()
  }

  const generateBodies = (c: number) => {
    return Array(c)
      .fill('x')
      .map((_) => {
        return {
          id: getId(),
          position: getRandomPosition()
        }
      })
  }

  $: bodies = generateBodies(count)
</script>

{#each bodies as body (body.id)}
  <T.Group position={body.position}>
    <RigidBody>
      <Collider
        shape="ball"
        args={[0.75]}
        mass={Math.random() * 10}
      />
      <T.Mesh
        {geometry}
        {material}
      />
    </RigidBody>
  </T.Group>
{/each}
