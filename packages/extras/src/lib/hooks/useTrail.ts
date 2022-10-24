import { useFrame } from '@threlte/core'
import { onDestroy } from 'svelte'
import { get, writable } from 'svelte/store'
import { Object3D, Quaternion, Vector3 } from 'three'

type TrailPoint = {
  id: number
  position: Vector3
  scale: Vector3
  created: number
  age: number
}

export const useTrail = <T>(params?: {
  maxAge?: number
  minDistance?: number
  local?: boolean
  interval?: number
}) => {
  const objectStore = writable<T | undefined>(undefined)
  let object = get(objectStore)
  const unsubscribe = objectStore.subscribe((value) => {
    object = value
  })
  onDestroy(unsubscribe)

  const maxAge = params?.maxAge ?? 1000
  const minDistance = params?.minDistance ?? 0.1
  const local = params?.local ?? true
  const interval = params?.interval ?? 1

  const points = writable<TrailPoint[]>([])

  let currentFrame = 0
  let lastPoint: TrailPoint | undefined = undefined

  const updatePoints = (point?: TrailPoint) => {
    points.update((points) => {
      if (points.length === 0 && point) {
        return [point]
      }

      const filteredPoints = points.filter((point) => {
        const absoluteAge = Date.now() - point.created
        return absoluteAge < maxAge
      })
      if (filteredPoints.length === 0) return filteredPoints

      const agedPoints = filteredPoints.map((point) => {
        return {
          ...point,
          age: (Date.now() - point.created) / maxAge
        } as TrailPoint
      })

      if (point) {
        return [point, ...agedPoints]
      } else {
        return agedPoints
      }
    })
  }

  let currentPointIndex = 0

  useFrame(() => {
    if (!object || !(object instanceof Object3D)) return

    if (currentFrame % interval === 0) {
      const point: TrailPoint = {
        id: currentPointIndex,
        position: local ? object.position.clone() : object.getWorldPosition(new Vector3()),
        scale: local ? object.scale.clone() : object.getWorldScale(new Vector3()),
        created: Date.now(),
        age: 0
      }

      const distance = lastPoint?.position.distanceTo(point.position)

      updatePoints(distance && distance > minDistance ? point : undefined)

      lastPoint = point
      currentPointIndex += 1
    } else {
      updatePoints()
    }

    currentFrame += 1
  })

  return {
    points,
    object: objectStore
  }
}
