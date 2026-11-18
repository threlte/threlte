import type * as THREE from 'three/webgpu'

export type geoTypes =
  | THREE.BoxGeometry
  | THREE.SphereGeometry
  | THREE.DodecahedronGeometry
  | THREE.CylinderGeometry

export type itemType = {
  dom: HTMLElement | undefined
  geometry: geoTypes
  material: THREE.MeshStandardMaterial
}
