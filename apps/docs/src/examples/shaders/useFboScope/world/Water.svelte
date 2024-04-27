<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { PlaneGeometry, RepeatWrapping, TextureLoader, Vector3 } from 'three'
  import { Water } from 'three/examples/jsm/objects/Water.js'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  const waterGeometry = new PlaneGeometry(10000, 10000)

  const water = new Water(waterGeometry, {
    textureWidth: 1024,
    textureHeight: 1024,
    waterNormals: new TextureLoader().load('/textures/waternormals.jpg', function (texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping
      texture.needsUpdate = true
    }),
    sunDirection: new Vector3(),
    waterColor: 0x001e0f,
    distortionScale: 1.7
  })

  water.rotation.x = -DEG2RAD * 90
  water.material.uniforms['size'].value = 1000

  useTask((delta) => {
    water.material.uniforms['time'].value += delta
  })
</script>

<T is={water} />
