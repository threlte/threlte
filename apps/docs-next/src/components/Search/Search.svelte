<script lang="ts">
  // import { Canvas } from '@threlte/core'
  // import Scene from './Scene.svelte'
  import snarkdown from 'snarkdown'
  import { loadHistoryMeta, saveClippyAnswerToHistory } from './clippyHistory'
  import SearchbarButton from './SearchbarButton.svelte'
  import { focusTrap } from '$lib/focusTrap'
  import Markprompt from './Markprompt.svelte'

  let SearchOrama: any
  let searchType: 'ai' | 'query' = 'query'

  let askingQuestion = false

  let userQuestion = ''

  let response = ''

  let answer = ''
  let references = ''

  let fetchingAnswer = false

  let oramaQuery = ''

  loadHistoryMeta()

  $: {
    const parts = response.split('___START_RESPONSE_STREAM___')

    if (parts.length >= 2 && parts[1] && parts[0]) {
      answer = snarkdown(parts[1])
      console.log(answer, references)

      references = snarkdown(parts[0])
    }
  }

  const glowClasses = {
    orange:
      '[background-image:radial-gradient(closest-side,rgba(255,146,112,0.1)_0%,transparent_100%)]',
    blue: '[background-image:radial-gradient(closest-side,rgba(123,175,224,0.12)_0%,transparent_100%)]',
    green:
      '[background-image:radial-gradient(closest-side,rgba(135,230,151,0.12)_0%,transparent_100%)]'
  }

  async function askClippy(question: string) {
    fetchingAnswer = true
    response = ''
    const res = await fetch('https://api.markprompt.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: question,
        iDontKnowMessage: `I'm sorry, I don't think I can help you with that. Feel free to ask the community on Discord: https://discord.gg/EqUBCfCaGm`,
        projectKey: 'sk_test_MWgsGFl6V2FdFnBBIVAMXhC1BVwl3u5T',
        model: 'gpt-3.5-turbo'
      })
    })

    if (!res.ok || !res.body) {
      console.error('Error:', await res.text())
      return
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { value, done } = await reader.read()
      const chunk = decoder.decode(value)
      response = response + chunk
      if (done) {
        break
      }
    }

    const parts = response.split('___START_RESPONSE_STREAM___')

    console.info('Answer:', parts[1])
    console.info('References:', parts[0])

    fetchingAnswer = false
    saveClippyAnswerToHistory(question, parts[1] || '')
  }

  const sendQuestion = async (query: string) => {
    if (searchType == 'ai') {
      askClippy(query)
    } else {
      if (!SearchOrama) {
        SearchOrama = (await import('./SearchOrama.svelte')).default
      }
      oramaQuery = query
    }
  }

  function toggleDialog() {
    askingQuestion = !askingQuestion
    isFocused = !isFocused
  }

  function handleEnterQuestion(e: any) {
    if (e.key === 'Enter' && askingQuestion && !fetchingAnswer) {
      sendQuestion(userQuestion)
    }
  }

  let dialogElement: HTMLDialogElement

  let isFocused = false
</script>

<svelte:window on:keydown={handleEnterQuestion} />

<SearchbarButton on:click={toggleDialog} />

<div class="pointer-events-none fixed top-0 left-0 z-50 h-screen w-screen">
  {#if askingQuestion}
    <div
      class={`pointer-events-auto fixed top-0 left-0 h-screen  w-screen bg-gray-900/70
      `}
      on:click={toggleDialog}
      on:keypress={toggleDialog}
    />
  {/if}

  <dialog
    use:focusTrap={isFocused}
    open={askingQuestion}
    class={`glow-blue pointer-events-auto mt-[10%] flex max-h-[500px] w-full max-w-[50%] flex-col gap-4 rounded-lg border border-white/20 bg-blue-900 px-0 py-2 text-white ${
      askingQuestion ? '' : 'hidden'
    }`}
    bind:this={dialogElement}
  >
    <Markprompt />

    <div
      class={`absolute top-40 left-0 h-96 w-full -translate-y-full ${glowClasses['blue']} pointer-events-none`}
    />
  </dialog>
</div>

<style>
  /* https://loading.io/css/ */
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
</style>
