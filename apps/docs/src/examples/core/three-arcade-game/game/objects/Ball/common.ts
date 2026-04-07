import { MeshBasicMaterial, SphereGeometry } from 'three'

export const ballMaterial = new MeshBasicMaterial({
  color: 'blue'
})

export const ballGeometry = new SphereGeometry(0.2)
