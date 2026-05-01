<script lang="ts">
  import { Color, DoubleSide, ShaderMaterial, type ColorRepresentation } from 'three'
  import { T } from '@threlte/core'

  interface Props {
    color?: ColorRepresentation
    size?: number
    thickness?: number
  }

  const { color = new Color('white'), size = 0.03, thickness = 0.035 }: Props = $props()

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
      float d = abs(distance(vUv, vec2(0.5)) - 0.25);
      float edge = fwidth(d);
      float alpha = 1.0 - smoothstep(thickness - edge, thickness + edge, d);
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
