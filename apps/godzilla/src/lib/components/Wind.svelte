<script context="module" lang="ts">
	const randomPos = () => Math.random()

	class Line {
		z: number
		x: number
		opacity: number
		dashOffset = 0

		constructor(index: number) {
			// this.z = Math.random() * 3
			// this.x = index / 20
			this.z = 0
			this.x = 0
			this.opacity = 0
		}
	}
</script>

<script lang="ts">
	import { T, useFrame } from '@threlte/core'
	import { Vector3, CatmullRomCurve3 } from 'three'
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras'

	export let offset = 0
	export let position: [number, number, number] = [0, 0, 0]
	let lineCount = 3
	let randomLines: number[] = new Array(lineCount).fill(0).map((_, i) => i)

	const lines: Line[] = []
	const points: Vector3[][] = []

	function genratePoints() {
		const p = []
		p.push(new Vector3(randomPos() / 1.5, randomPos() / 2, 6))
		p.push(new Vector3(randomPos() / 1.5, randomPos() / 2, 4))
		p.push(new Vector3(randomPos() / 1.5, randomPos() / 2, 0))
		p.push(new Vector3(randomPos() / 1.5, randomPos() / 2, -4))
		p.push(new Vector3(randomPos() / 1.5, randomPos() / 2, -6))
		const curve = new CatmullRomCurve3(p)
		points.push(curve.getPoints(20))
	}

	function generateLines() {
		lines.length = 0
		for (let i = 0; i < lineCount; i++) {
			lines.push(new Line(i))
			genratePoints()
		}
	}

	generateLines()

	function moveLines() {
		const pX = 0
		const pZ = 0
		const distance = 5
		position[0] = Math.random() * (pX + distance - (pX - distance)) + (pX - distance)
		position[2] = Math.random() * (pZ + distance - (pZ - distance)) + (pZ - distance)
	}

	useFrame((_, delta) => {
		if (delta < 0.5) {
			offset += 0.4 * delta
			for (let i = 0; i < randomLines.length; i++) {
				if (offset < 0.5) {
					lines[i].opacity += delta * (i * 0.2)
				} else {
					lines[i].opacity -= delta * (i * 0.2)
				}
				lines[i].dashOffset = -offset - 0.1
			}
		}
		if (offset > 3) {
			offset = 0
			for (let i = 0; i < randomLines.length; i++) {
				lines[i].opacity = 0
			}
			// moveLines()
		}
	})
</script>

<T.Group {position}>
	{#each lines as line, i}
		<T.Mesh position.x={line.x} position.z={line.z}>
			<MeshLineGeometry points={points[i]} shape="taper" />
			<MeshLineMaterial
				opacity={line.opacity}
				transparent
				dashArray={1}
				dashRatio={0.8}
				dashOffset={line.dashOffset}
				depthWrite={false}
				width={0.04}
				color="#DFD4B4"
			/>
		</T.Mesh>
	{/each}
</T.Group>
