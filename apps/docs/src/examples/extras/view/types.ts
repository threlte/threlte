import type * as THREE from 'three'

export type geoTypes =
  | THREE.BoxGeometry
  | THREE.SphereGeometry
  | THREE.DodecahedronGeometry
  | THREE.CylinderGeometry

export type itemType = {
  dom: HTMLElement
  geometry: geoTypes
  material: THREE.MeshStandardMaterial
}
