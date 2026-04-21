<script lang="ts">
  import type { Vector } from '@dimforge/rapier3d-compat'
  import { T, useTask, type Task } from '@threlte/core'
  import { BufferGeometry, DoubleSide, Group, Mesh, Vector3 } from 'three'

  interface Props {
    origin: Vector
    impulse: Vector
    length?: number | undefined
    color?: string | undefined
    multiplier?: number | undefined
    afterTask: Task | undefined
  }

  let { origin, impulse, length, color, multiplier, afterTask }: Props = $props()

  let combinedColor = $derived(color ?? 'red')

  const geometry = new BufferGeometry()

  const tempV3 = new Vector3()

  const startAtObject = new Mesh()
  const endAtObject = new Group()

  useTask(
    () => {
      const from = new Vector3(origin.x, origin.y, origin.z)
      if (length) {
        tempV3.set(impulse.x, impulse.y, impulse.z).normalize().multiplyScalar(length)
      } else {
        tempV3.set(impulse.x, impulse.y, impulse.z)
      }
      if (multiplier) {
        tempV3.multiplyScalar(multiplier)
      }
      const to = from.clone().add(tempV3)

      const points = []
      points.push(from)
      points.push(to)
      geometry.setFromPoints(points)

      if (!startAtObject || !endAtObject) return
      startAtObject.position.copy(from)
      endAtObject.position.copy(to)
      endAtObject.lookAt(from)
    },
    {
      after: afterTask ?? []
    }
  )
</script>

<T.Line
  renderOrder={1}
  frustumCulled={false}
>
  <T is={geometry} />
  <T.LineBasicMaterial
    color={combinedColor}
    depthTest={false}
    depthWrite={false}
    side={DoubleSide}
    transparent
    opacity={1}
  />
</T.Line>

<!-- Marking the start -->
<T
  is={startAtObject}
  frustumCulled={false}
>
  <T.SphereGeometry args={[0.03]} />
  <T.MeshBasicMaterial
    color={combinedColor}
    depthTest={false}
    depthWrite={false}
  />
</T>

<!-- Marking the end -->
<T
  is={endAtObject}
  frustumCulled={false}
>
  <T.Mesh rotation.x={(-90 * Math.PI) / 180}>
    <T.ConeGeometry args={[0.03, 0.1]} />
    <T.MeshBasicMaterial
      color={combinedColor}
      depthTest={false}
      depthWrite={false}
    />
  </T.Mesh>
</T>
