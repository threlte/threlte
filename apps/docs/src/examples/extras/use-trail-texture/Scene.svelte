<script lang="ts">
  import { T } from '@threlte/core'
  import { useTrailTexture, interactivity } from '@threlte/extras'
  import { ShaderMaterial, Color, DoubleSide, type Texture } from 'three'

  interactivity()

  let {
    size = 64,
    maxAge = 750,
    radius = 0.3,
    intensity = 0.2,
    interpolate = 0,
    smoothing = 0,
    minForce = 0.3,
    amount = 0.1,
    ease
  }: {
    size?: number
    maxAge?: number
    radius?: number
    intensity?: number
    interpolate?: number
    smoothing?: number
    minForce?: number
    amount?: number
    ease?: (t: number) => number
  } = $props()

  const { texture, onPointerMove } = useTrailTexture(() => ({
    size,
    radius,
    maxAge,
    intensity,
    interpolate,
    smoothing,
    minForce,
    ease
  }))

  function createMaterial(map: Texture) {
    return new ShaderMaterial({
      uniforms: {
        map: { value: map },
        color: { value: new Color('turquoise') },
        color2: { value: new Color('magenta') },
        amount: { value: amount }
      },
      vertexShader: `
        uniform sampler2D map;
        uniform float amount;
        varying float vDisplace;
        void main() {
          float displace = texture2D(map, uv).r;
          vDisplace = displace;
          vec3 pos = position;
          pos.z += displace * amount;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform vec3 color2;
        varying float vDisplace;
        void main() {
          vec3 col = mix(color, color2, vDisplace);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      wireframe: true,
      side: DoubleSide
    })
  }

  const material = createMaterial(texture)

  $effect(() => {
    material.uniforms.amount!.value = amount
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 2.5]}
  fov={45}
/>

<T.Group rotation.x={-Math.PI * 0.3}>
  <T.Mesh
    rotation.z={Math.PI * 0.2}
    onpointermove={onPointerMove}
  >
    <T.PlaneGeometry args={[2, 2, 32, 32]} />
    <T is={material} />
  </T.Mesh>
</T.Group>
