<script lang="ts">
  import { useStage, useTask, useThrelte } from '@threlte/core'
  import { rendering } from './state'
  import { onDestroy } from 'svelte'

  const { shouldRender, renderStage, renderer } = useThrelte()

  const afterRenderStage = useStage('after-render', {
    after: renderStage
  })

  useTask(
    () => {
      rendering.set(shouldRender())
    },
    {
      autoInvalidate: false,
      stage: afterRenderStage
    }
  )

  const div = document.createElement('div')

  if (renderer.domElement.parentElement) {
    renderer.domElement.parentElement.appendChild(div)

    renderer.domElement.parentElement.style.position = 'relative'
    div.style.position = 'absolute'
    div.style.top = '0'
    div.style.left = '0'
    div.style.width = '100%'
    div.style.height = '30px'
    div.style.display = 'flex'
    div.style.alignItems = 'center'
    div.style.justifyContent = 'center'
    div.style.textAlign = 'center'
    div.style.fontFamily = 'monospace'
    div.style.color = 'white'

    onDestroy(() => {
      div.remove()
    })
  } else {
    console.warn('Renderer has no parent element')
  }

  $: div.style.backgroundColor = $rendering ? '#2AC944' : '#FE3D00'
  $: div.innerHTML = $rendering ? 'rendering' : '<strike>rendering</strike>'
</script>
