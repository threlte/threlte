<script lang='ts'>

import { T } from '@threlte/core'

const vertexShader = `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }
`

const fragmentShader = `
varying vec2 vUv;
void main () { gl_FragColor = vec4(1., 1., 1., pow(vUv.y - 1., 2.)); }
`

const width = 0.002

</script>

<T.Mesh
  {...$$restProps}
  rotation.x={-Math.PI / 2}
  position.z={-0.1}
>
  <T.CylinderGeometry args={[width, width, 0.2, 16, 1, true]} />
  <T.ShaderMaterial transparent {vertexShader} {fragmentShader} />
</T.Mesh>
