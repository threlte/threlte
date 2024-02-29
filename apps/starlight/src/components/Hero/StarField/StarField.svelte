<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import {
    BufferGeometry,
    Float32BufferAttribute,
    PointsMaterial,
    Vector3,
    type Shader,
    type WebGLRenderer
  } from 'three'

  export let amount = 100
  export let radius = 100
  export let color = '#ffffff'
  export let opacity = 1
  export let size = 0.1
  export let speed = 1
  export let direction: [number, number, number] = [0, 0, 1]

  const geometry = new BufferGeometry()

  const diameter = radius * 2
  const vertices = []
  for (let i = 0; i < amount; i++) {
    const x = Math.random() * diameter - radius
    const y = Math.random() * diameter - radius
    const z = Math.random() * diameter - radius
    vertices.push(x, y, z)
  }

  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))

  const material = new PointsMaterial({
    transparent: true
  })

  const settings = {
    elapsedTime: 0,
    direction: new Vector3(direction[0], direction[1], direction[2]).normalize()
  }

  const onBeforeCompile = (shader: Shader, renderer: WebGLRenderer) => {
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
