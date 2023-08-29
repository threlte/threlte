<script lang='ts'>

import { T } from '@threlte/core'

const vertexShader = `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }
`

const fragmentShader = `
varying vec2 vUv;
void main() { gl_FragColor = vec4(1., 1., 1., pow(vUv.y - 1., 2.)); }
`

</script>

<T.Mesh
  {...$$restProps}
  rotation.x={-Math.PI / 2}
  position.z={-0.1}
>
  {@const radius = 0.002}
  {@const height = 0.2}
  {@const radialSegments = 16}
  {@const heightSegments = 1}
  <T.CylinderGeometry args={[radius, radius, height, radialSegments, heightSegments, true]} />
  <T.ShaderMaterial transparent {vertexShader} {fragmentShader} />
</T.Mesh>
