<script lang='ts'>
  import { Group, Color } from 'three'
  import { T, useFrame } from '@threlte/core'
  import { pointerState } from '../../internal/stores';

  export let handedness: 'left' | 'right'

  let ref = new Group()

  $: pointer = $pointerState[handedness].pointer
  $: hovering = $pointerState[handedness].hovering

  const { start, stop } = useFrame(() => {
    ref.position.lerp(pointer, 0.3)
  }, {
    autostart: false
  })

  $: if (hovering) {
    ref.position.copy(pointer)
    start()
  } else {
    stop()
  }

  useFrame((ctx) => {
    // save previous rotation in case we're locking an axis
    const prevRotation = ref.rotation.clone()

    // always face the camera
    ctx.camera.current.getWorldQuaternion(ref.quaternion)

    // readjust any axis that is locked
    ref.rotation.x = prevRotation.x
    ref.rotation.y = prevRotation.y
    ref.rotation.z = prevRotation.z
  })

</script>

<T
  is={ref}
  visible={hovering}
>
  <slot name='pointer-cursor'>
    <T.Sprite scale={0.025}>
      <T.ShaderMaterial
        depthTest={false}
        transparent
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float thickness;
          uniform vec3 color;
      
          varying vec2 vUv;
      
          void main() {
            float radius = 0.5;
            float dist = length(vUv - vec2(0.5));
            float alpha = 1.0 - step(thickness, abs(distance(vUv, vec2(0.5)) - 0.25));
            gl_FragColor = vec4(color, alpha);
          }
        `}
        uniforms={{
          thickness: { value: 0.05 },
          color: { value: new Color('white') },
        }}
      />
    </T.Sprite>
  </slot>
</T>
