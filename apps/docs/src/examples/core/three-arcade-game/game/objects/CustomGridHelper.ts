import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments
} from 'three'

export class CustomGridHelper extends LineSegments {
  override type = 'GridHelper'
  constructor(
    width = 10,
    widthDivisions = 10,
    height = 10,
    heightDivisions = 10,
    color = 0x444444
  ) {
    const colorObj = new Color(color)

    const stepWidth = width / widthDivisions
    const stepHeigth = height / heightDivisions
    const halfSizeHeight = height / 2
    const halfSizeWidth = width / 2

    const vertices = []
    const colors: number[] = []

    for (let i = 0, j = 0, k = -halfSizeHeight; i <= heightDivisions; i++, k += stepHeigth) {
      vertices.push(-halfSizeWidth, 0, k, halfSizeWidth, 0, k)

      colorObj.toArray(colors, j)
      j += 3

      colorObj.toArray(colors, j)
      j += 3

      colorObj.toArray(colors, j)
      j += 3

      colorObj.toArray(colors, j)
      j += 3
    }

    for (let i = 0, j = 0, k = -halfSizeWidth; i <= widthDivisions; i++, k += stepWidth) {
      vertices.push(k, 0, -halfSizeHeight, k, 0, halfSizeHeight)

      colorObj.toArray(colors, j)
      j += 3

      colorObj.toArray(colors, j)
      j += 3

      colorObj.toArray(colors, j)
      j += 3

      colorObj.toArray(colors, j)
      j += 3
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))

    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))

    const material = new LineBasicMaterial({ vertexColors: true, toneMapped: false })

    super(geometry, material)
  }

  dispose() {
    this.geometry.dispose()
    ;(this.material as any).dispose()
  }
}
