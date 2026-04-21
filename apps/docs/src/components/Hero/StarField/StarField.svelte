<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { untrack } from 'svelte'
  import {
    BufferGeometry,
    Float32BufferAttribute,
    PointsMaterial,
    Vector3,
    type WebGLProgramParametersWithUniforms
  } from 'three'

  interface Props {
    amount?: number
    radius?: number
    color?: string
    opacity?: number
    size?: number
    speed?: number
    direction?: [number, number, number]
  }

  let {
    amount = 100,
    radius = 100,
    color = '#ffffff',
    opacity = 1,
    size = 0.1,
    speed = 1,
    direction = [0, 0, 1]
  }: Props = $props()

  const geometry = new BufferGeometry()

  const diameter = $derived(radius * 2)

  untrack(() => {
    const vertices = []
    for (let i = 0; i < amount; i++) {
      const x = Math.random() * diameter - radius
      const y = Math.random() * diameter - radius
      const z = Math.random() * diameter - radius
      vertices.push(x, y, z)
    }

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
  })

  const material = $state(
    new PointsMaterial({
      transparent: true
    })
  )

  const settings = {
    elapsedTime: 0,
    direction: new Vector3().fromArray(untrack(() => direction)).normalize()
  }

  const onBeforeCompile = (shader: WebGLProgramParametersWithUniforms) => {
    shader.uniforms.elapsedTime = {
      get value() {
        return settings.elapsedTime
      }
    }
    shader.uniforms.spawnRadius = {
      get value() {
        return radius
      }
    }
    shader.uniforms.speed = {
      get value() {
        return speed
      }
    }
    shader.uniforms.direction = {
      get value() {
        return direction
      }
    }

    shader.vertexShader = 'uniform float elapsedTime;' + shader.vertexShader
    shader.fragmentShader = 'uniform float elapsedTime;' + shader.fragmentShader
    shader.vertexShader = 'uniform float spawnRadius;' + shader.vertexShader
    shader.fragmentShader = 'uniform float spawnRadius;' + shader.fragmentShader
    shader.vertexShader = 'uniform vec3 direction;' + shader.vertexShader
    shader.vertexShader = 'uniform float speed;' + shader.vertexShader
    shader.vertexShader = 'varying float distanceToCenter;' + shader.vertexShader
    shader.fragmentShader = 'varying float distanceToCenter;' + shader.fragmentShader

    shader.vertexShader = shader.vertexShader.replace(
      '#include <project_vertex>',
      `
				// move stars in one direction
				transformed.x += speed * elapsedTime * direction.x;
				transformed.y += speed * elapsedTime * direction.y;
				transformed.z += speed * elapsedTime * direction.z;

				// constrain stars inside cube
				// (ex: if a star goes to far on one side, it'll be put back to the other side)
				transformed.xyz = mod(transformed.xyz, spawnRadius * 2.0) - spawnRadius;

				#include <project_vertex>
			`
    )

    shader.vertexShader = shader.vertexShader.replace(
      'gl_PointSize = size;',
      `
				// hide points that are outside sphere shape
				distanceToCenter = distance(vec3(0.0, 0.0, 0.0), transformed);
				gl_PointSize = size * step(distanceToCenter, spawnRadius);
			`
    )

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <premultiplied_alpha_fragment>',
      `
				#include <premultiplied_alpha_fragment>
				float	opacity = clamp(smoothstep(spawnRadius, spawnRadius * 0.9, distanceToCenter), 0.0, 1.0);
				gl_FragColor = vec4(gl_FragColor.rgb, gl_FragColor.a * opacity);
			`
    )
  }

  material.onBeforeCompile = onBeforeCompile

  useTask((delta) => {
    settings.elapsedTime += delta
  })
</script>

<T.Points>
  <T is={geometry} />
  <T
    is={material}
    {size}
    {color}
    {opacity}
  />
</T.Points>
