<script
  lang="ts"
  module
>
  const geometry = new SphereGeometry(1)
  const material = new MeshBasicMaterial({ color: 'red' })
</script>

<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, RigidBody } from '@threlte/rapier'
  import { MeshBasicMaterial, SphereGeometry, Vector3, MathUtils } from 'three'

  interface Props {
    count?: number
    rangeX?: [number, number]
    rangeY?: [number, number]
    rangeZ?: [number, number]
  }

  let { count = 20, rangeX = [-20, 20], rangeY = [-20, 20], rangeZ = [-20, 20] }: Props = $props()

  const randomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min
  }

  const createRandomPosition = (): Parameters<Vector3['set']> => {
    return new Vector3(
      randomNumber(rangeX[0], rangeX[1]),
      randomNumber(rangeY[0], rangeY[1]),
      randomNumber(rangeZ[0], rangeZ[1])
    ).toArray()
  }

  const bodies = $derived(
    Array(count)
      .fill('x')
      .map((_) => {
        return {
          id: MathUtils.generateUUID(),
          position: createRandomPosition()
        }
      })
  )
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
