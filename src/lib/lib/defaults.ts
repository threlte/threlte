import { Euler, MeshBasicMaterial, Object3D, Vector3 } from 'three'

export const defaults = {
  position: new Vector3(),
  scale: new Vector3(1, 1, 1),
  rotation: new Euler(),
  lookAt: new Vector3(),
  object3d: {
    inViewport: false
  },
  mesh: {
    material: (): MeshBasicMaterial => new MeshBasicMaterial(),
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
    color: 0xffffff
  },
  lights: {
    ambientLight: {
      color: 0xffffff,
      intensity: 1
    },
    directionalLight: {
      color: 0xffffff,
      intensity: 1,
      castShadow: false
    },
    pointLight: {
      color: 0xffffff,
      intensity: 1,
      distance: 0,
      decay: 1,
      castShadow: false
    },
    hemisphereLight: {
      skyColor: 0xffffff,
      groundColor: 0xffffff,
      position: Object3D.DefaultUp,
      intensity: 1
    },
    spotLight: {
      position: Object3D.DefaultUp,
      color: 0xffffff,
      intensity: 1,
      angle: Math.PI / 3,
      decay: 1,
      distance: 0,
      penumbra: 0
    }
  }
}
