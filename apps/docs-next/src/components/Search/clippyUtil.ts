import type { Camera } from 'three'
import { Vector3 } from 'three'

export const domTo3dPos = (clippyRect: HTMLElement, camera: Camera) => {
  const boundingRect = clippyRect.getBoundingClientRect()
  const x = ((boundingRect.x + boundingRect.width / 2) / window.innerWidth) * 2 - 1
  const y = -((boundingRect.y + boundingRect.height / 2 + 80) / window.innerHeight) * 2 + 1
  const vector = new Vector3(x, y, 1)
  vector.unproject(camera)
  const direction = vector.sub(camera.position).normalize()
  const distance = -camera.position.z / direction.z

  return camera.position.clone().add(direction.multiplyScalar(distance))
}
