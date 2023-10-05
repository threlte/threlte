<script lang="ts">
  import { T } from '@threlte/core'

  const vertexShader = `
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  attribute vec2 uv;
  attribute vec3 position;
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }
  `

  const fragmentShader = `
  varying mediump vec2 vUv;
  void main() { gl_FragColor = vec4(1., 1., 1., pow(vUv.y - 1., 2.)); }
  `

  const radius = 0.002
  const height = 0.2
  const radialSegments = 16
  const heightSegments = 1
  const openEnded = false
</script>

<T.Mesh
  {...$$restProps}
  rotation.x={-Math.PI / 2}
  position.z={-0.1}
>
  <T.CylinderGeometry
    args={[radius, radius, height, radialSegments, heightSegments, openEnded]}
  />
  <T.RawShaderMaterial
    transparent
    {vertexShader}
    {fragmentShader}
  />
</T.Mesh>
