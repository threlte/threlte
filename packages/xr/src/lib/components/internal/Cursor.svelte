<script lang="ts">
  import { Color, DoubleSide, RawShaderMaterial, type ColorRepresentation } from 'three'
  import { T } from '@threlte/core'

  interface Props {
    color?: ColorRepresentation
    size?: number
    thickness?: number
  }

  let { color = new Color('white'), size = 0.03, thickness = 0.035 }: Props = $props()

  const vertexShader = `
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    attribute vec2 uv;
    attribute vec3 position;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    precision mediump float;
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

  const shaderMaterial = new RawShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    side: DoubleSide,
    transparent: true,
    depthTest: false
  })

  $effect.pre(() => {
    uniforms.thickness.value = thickness
  })
  $effect.pre(() => {
    uniforms.color.value = color
  })
</script>

<T.Mesh scale={size}>
  <T.PlaneGeometry />
  <T is={shaderMaterial} />
</T.Mesh>
