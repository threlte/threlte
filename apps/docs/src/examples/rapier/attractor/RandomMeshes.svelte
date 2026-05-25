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
  import { MeshBasicMaterial, SphereGeometry, Vector3 } from 'three'

  interface Props {
    count?: number
    rangeX?: [number, number]
    rangeY?: [number, number]
    rangeZ?: [number, number]
  }

  let { count = 20, rangeX = [-20, 20], rangeY = [-20, 20], rangeZ = [-20, 20] }: Props = $props()

  const min = new Vector3()
  const size = new Vector3()

  const createRandomPosition = (): Parameters<Vector3['set']> => {
    min.set(rangeX[0], rangeY[0], rangeZ[0])
    size.set(rangeX[1], rangeY[1], rangeZ[1]).sub(min)
    return new Vector3().random().multiply(size).add(min).toArray()
  }

  const bodies = $derived(Array.from({ length: count }, () => createRandomPosition()))
</script>

{#each bodies as position (position)}
  <T.Group {position}>
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
