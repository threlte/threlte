import type * as THREE from 'three'

export const intersectObjects: THREE.Object3D[] = []
export const skipRaycastIds = new Set<string>()
