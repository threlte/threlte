/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
	BufferGeometry,
	Color,
	Float32BufferAttribute,
	LineBasicMaterial,
	LineSegments
} from 'three'

export class CustomGridHelper extends LineSegments {
	constructor(
		width = 10,
		widthDivisions = 10,
		height = 10,
		heightDivisions = 10,
		color = 0x444444
	) {
		// @ts-ignore
		color = new Color()

		const stepWidth = width / widthDivisions
		const stepHeigth = height / heightDivisions
		const halfSizeHeight = height / 2
		const halfSizeWidth = width / 2

		const vertices = [],
			// @ts-ignore
			colors = []

		for (let i = 0, j = 0, k = -halfSizeHeight; i <= heightDivisions; i++, k += stepHeigth) {
			vertices.push(-halfSizeWidth, 0, k, halfSizeWidth, 0, k)

			// @ts-ignore
			color.toArray(colors, j)
			j += 3
			// @ts-ignore
			color.toArray(colors, j)
			j += 3
			// @ts-ignore
			color.toArray(colors, j)
			j += 3
			// @ts-ignore
			color.toArray(colors, j)
			j += 3
		}

		for (let i = 0, j = 0, k = -halfSizeWidth; i <= widthDivisions; i++, k += stepWidth) {
			vertices.push(k, 0, -halfSizeHeight, k, 0, halfSizeHeight)

			// @ts-ignore
			color.toArray(colors, j)
			j += 3
			// @ts-ignore
			color.toArray(colors, j)
			j += 3
			// @ts-ignore
			color.toArray(colors, j)
			j += 3
			// @ts-ignore
			color.toArray(colors, j)
			j += 3
		}

		const geometry = new BufferGeometry()
		geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
		// @ts-ignore
		geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))

		const material = new LineBasicMaterial({ vertexColors: true, toneMapped: false })

		super(geometry, material)

		this.type = 'GridHelper'
	}

	dispose() {
		this.geometry.dispose()
		// @ts-ignore
		this.material.dispose()
	}
}
