<script lang="ts">
  import { T } from '@threlte/core'
  import { pointerState, teleportState } from '../../internal/stores'

  export let handedness: 'left' | 'right'

  $: selecting = $teleportState[handedness].selecting
  $: intersection = $teleportState[handedness].intersection
  $: visible = $pointerState[handedness].enabled || (selecting && intersection === undefined)
</script>

<T.Group {visible}>
  <slot name="pointer-ray">
    <T.Mesh
      rotation.x={-Math.PI / 2}
      position.z={-0.1}
    >
      <T.CylinderGeometry
        args={[0.002, 0.002, 0.2, 16, 1, false]}
      />
      <T.RawShaderMaterial
        transparent
        vertexShader={`
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          attribute vec2 uv;
          attribute vec3 position;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);
          }
        `}
        fragmentShader={`
          varying mediump vec2 vUv;
          void main() {
            gl_FragColor = vec4(1., 1., 1., pow(vUv.y - 1., 2.));
          }
        `}
      />
    </T.Mesh>
  </slot>
</T.Group>

