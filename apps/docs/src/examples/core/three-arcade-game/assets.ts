import { useGltf } from '@threlte/extras'
import { useTexture } from '@threlte/core'
import type { Mesh } from 'three'

export const arcadeMachineAsset = useGltf<{
	nodes: {
		BodyMesh: THREE.Mesh
		LeftCover: THREE.Mesh
		RightCover: THREE.Mesh
		ScreenFrame: THREE.Mesh
		joystick_base: THREE.Mesh
		joystick_stick_application: THREE.Mesh
		joystick_stick: THREE.Mesh
		joystick_cap: THREE.Mesh
		Main_Button_Enclosure: THREE.Mesh
		Main_Button: THREE.Mesh
		Screen: THREE.Mesh
	}
	materials: {
		['machine body main']: THREE.MeshStandardMaterial
		['machine body outer']: THREE.MeshStandardMaterial
		['screen frame']: THREE.MeshStandardMaterial
		['joystick base']: THREE.MeshStandardMaterial
		['joystick stick']: THREE.MeshStandardMaterial
		['joystick cap']: THREE.MeshStandardMaterial
		Screen: THREE.MeshStandardMaterial
	}
}>('/models/ball-game/archade-machine/arcade_machine_own.glb')

export const playerAsset = useGltf<{
	nodes: { Player: Mesh }
	materials: Record<string, never>
}>('/models/ball-game/player/player-simple.glb')

export const scanLinesTexture = useTexture(
	'/models/ball-game/archade-machine/textures/scanlines.png'
)

export const init = () => {
	console.log('hello')
}
