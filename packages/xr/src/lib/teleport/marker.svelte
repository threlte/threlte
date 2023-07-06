<script lang='ts'>

import { T } from '@threlte/core'

const fragmentShader = `
uniform float time;
uniform float size;
varying vec2 vUv;
void main(){
  float sinx = sin(time) / 8. + 0.3;
  float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - sinx));

  // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - size));
  gl_FragColor = vec4(strength);
}`

const vertexShader = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

let material: THREE.ShaderMaterial

</script>

<T.Mesh
  name='Teleport Marker'
  renderOrder={9999}
  {...$$restProps}
>
  <T.PlaneGeometry
    args={[0.5, 0.5]}
    on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
  />
  <T.ShaderMaterial
    {fragmentShader}
    {vertexShader}
    bind:ref={material}
    uniforms={{ size: 10 }}
    transparent
    polygonOffset
    polygonOffsetFactor={-1}
  />
</T.Mesh>
