import { BufferAttribute, BufferGeometry } from 'three'

/**
 * Builds a rounded rectangle in the XY plane, centered on the origin, with UVs
 * spanning the full quad. The four inner corners come first so each arc can fan
 * off the corner it rounds.
 */
export const roundedPlaneGeometry = (
  radius: number,
  smoothness: number,
  width = 2,
  height = 2
): BufferGeometry => {
  const innerX = width / 2 - radius
  const innerY = height / 2 - radius
  const uvRadiusX = radius / width
  const uvInnerX = (width - radius) / width
  const uvRadiusY = radius / height
  const uvInnerY = (height - radius) / height

  const positions = [innerX, innerY, 0, -innerX, innerY, 0, -innerX, -innerY, 0, innerX, -innerY, 0]
  const uvs = [uvInnerX, uvInnerY, uvRadiusX, uvInnerY, uvRadiusX, uvRadiusY, uvInnerX, uvRadiusY]

  const arcVertices = [
    3 * (smoothness + 1) + 3,
    3 * (smoothness + 1) + 4,
    smoothness + 4,
    smoothness + 5,
    2 * (smoothness + 1) + 4,
    2,
    1,
    2 * (smoothness + 1) + 3,
    3,
    4 * (smoothness + 1) + 3,
    4,
    0
  ]

  const indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11].map(
    (index) => arcVertices[index]
  )

  for (let corner = 0; corner < 4; corner += 1) {
    const centerX = corner < 1 || corner > 2 ? innerX : -innerX
    const centerY = corner < 2 ? innerY : -innerY
    const uvCenterX = corner < 1 || corner > 2 ? uvInnerX : uvRadiusX
    const uvCenterY = corner < 2 ? uvInnerY : uvRadiusY

    for (let step = 0; step <= smoothness; step += 1) {
      const angle = (Math.PI / 2) * (corner + step / smoothness)
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      positions.push(centerX + radius * cos, centerY + radius * sin, 0)
      uvs.push(uvCenterX + uvRadiusX * cos, uvCenterY + uvRadiusY * sin)

      if (step < smoothness) {
        const vertex = (smoothness + 1) * corner + step + 4
        indices.push(corner, vertex, vertex + 1)
      }
    }
  }

  return new BufferGeometry()
    .setIndex(new BufferAttribute(new Uint32Array(indices), 1))
    .setAttribute('position', new BufferAttribute(new Float32Array(positions), 3))
    .setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2))
}
