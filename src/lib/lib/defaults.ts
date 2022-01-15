import { Euler, MeshBasicMaterial, Vector3 } from 'three'

export const defaults = {
	position: new Vector3(),
	scale: new Vector3(1, 1, 1),
	rotation: new Euler(),
	mesh: {
		material: () => new MeshBasicMaterial(),
		castShadow: false,
		receiveShadow: false,
		frustumCulled: true,
		renderOrder: 0
	},
	camera: {
		fov: 30,
		near: 0.1,
		far: 1000,
		zoom: 1
	},
	fog: {
		density: 0.00025,
		near: 1,
		far: 1000,
		color: 'white'
	},
	lights: {
		ambientLight: {
			color: 'white',
			intensity: 1
		},
		directionalLight: {
			color: 'white',
			intensity: 1,
			castShadow: false
		},
		pointLight: {
			color: 'white',
			intensity: 1,
			distance: 0,
			decay: 1,
			castShadow: false
		}
	}
}
