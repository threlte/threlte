<script lang="ts">
  import { Color, DoubleSide, ShaderMaterial, type ColorRepresentation } from 'three'
  import { T } from '@threlte/core'

  export let color: ColorRepresentation = new Color('white')
  export let size = 0.03
  export let thickness = 0.035

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float thickness;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      float radius = 0.1;
      float dist = length(vUv - vec2(0.5));
      float alpha = 1.0 - step(thickness, abs(distance(vUv, vec2(0.5)) - 0.25));
      gl_FragColor = vec4(color, alpha);
    }
  `

  const uniforms = {
    thickness: { value: thickness },
    color: { value: color }
  }

  const shaderMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    side: DoubleSide,
    transparent: true,
    depthTest: false
  })

  $: shaderMaterial.uniforms.thickness!.value = thickness
  $: shaderMaterial.uniforms.color!.value = color
</script>

<T.Mesh
  scale={size}
  rotation={[-Math.PI / 2, 0, 0]}
>
  <T.PlaneGeometry />
  <T is={shaderMaterial} />
</T.Mesh>
