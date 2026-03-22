<script
  module
  lang="ts"
>
  const DEFAULT_COLOR = new Color('white')
</script>

<script lang="ts">
  import { Color, DoubleSide, RawShaderMaterial, Uniform, type ColorRepresentation } from 'three'
  import { T } from '@threlte/core'

  interface Props {
    color?: ColorRepresentation
    size?: number
    thickness?: number
  }

  const DEFAULT_SIZE = 0.03
  const DEFAULT_THICKNESS = 0.035

  const {
    color = DEFAULT_COLOR,
    size = DEFAULT_SIZE,
    thickness = DEFAULT_THICKNESS
  }: Props = $props()

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
    thickness: new Uniform(DEFAULT_THICKNESS),
    color: new Uniform(DEFAULT_COLOR)
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
    uniforms.color.value.set(color)
  })
</script>

<T.Mesh scale={size}>
  <T.PlaneGeometry />
  <T is={shaderMaterial} />
</T.Mesh>
