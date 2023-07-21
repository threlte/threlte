<script lang="ts">
  // import { Canvas } from '@threlte/core'
  // import Scene from './Scene.svelte'
  import snarkdown from 'snarkdown'
  import { clippyStores } from './clippyStores'
  import { loadHistoryAnswer, loadHistoryMeta, saveClippyAnswerToHistory } from './clippyHistory'
  import SearchbarButton from './SearchbarButton.svelte'

  let SearchOrama: any
  let searchType: 'ai' | 'query' = 'query'

  const { clippyHistory, clippyRect, clippyRectEl, clippyDialogueRect } = clippyStores

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
  }

  let cornerEl: HTMLElement
  let dialogueEl: HTMLElement

  $: {
    if (clippyRect && askingQuestion) {
      clippyRect.set(dialogueEl)
    }
    if (clippyRect && !askingQuestion) {
      clippyRect.set(cornerEl)
    }
    clippyRectEl.set(cornerEl)
    clippyDialogueRect.set(dialogueEl)
  }

  function handleEnterQuestion(e: any) {
    if (e.key === 'Enter' && askingQuestion && !fetchingAnswer) {
      sendQuestion(userQuestion)
    }
  }
</script>

<svelte:window on:keydown={handleEnterQuestion} />

<SearchbarButton
  on:click={() => {
    askingQuestion = true
  }}
/>

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
    open={askingQuestion}
    class={`glow-blue pointer-events-auto mt-[10%] flex max-h-[500px] w-full max-w-[50%] flex-col gap-4 rounded-lg border border-white/20 bg-blue-900 px-0 py-2 text-white ${
      askingQuestion ? '' : 'hidden'
    }`}
  >
    <div class="absolute -right-6 top-0 flex translate-x-full flex-col gap-1">
      <h2 class="font-bold">Previously asked questions:</h2>
      {#each $clippyHistory as entry}
        <button
          class="py-1 text-left opacity-75 hover:opacity-100"
          on:click={() => {
            userQuestion = entry.question
            answer = snarkdown(loadHistoryAnswer(entry.answerUuid) || '')
          }}>- {entry.question}</button
        >
      {/each}
    </div>
    <div
      class={`absolute top-40 left-0 h-96 w-full -translate-y-full ${glowClasses['blue']} pointer-events-none`}
    />
    <div class="relative flex w-full flex-col items-center gap-1">
      <div class="w-full border-b border-blue-500/90 pb-1">
        <input
          class="0  w-full bg-transparent px-4 py-1 outline-none"
          placeholder="Search a phrase or ask an AI assistant about Threlte..."
          bind:value={userQuestion}
        />
      </div>

      <div class="flex w-full flex-col items-stretch  gap-2 border-b border-blue-500/90 pb-2">
        <div class="px-2">
          <input
            type="radio"
            name="searchType"
            class="peer hidden"
            id="search-docs-radio"
            bind:group={searchType}
            value={'query'}
          />
          <label
            for="search-docs-radio"
            class="block cursor-pointer select-none bg-blue-900 p-2  hover:brightness-150 peer-checked:bg-blue-700/30 peer-checked:font-bold"
          >
            Search docs</label
          >
        </div>

        <div class="px-2">
          <input
            type="radio"
            name="searchType"
            id="search-ai-radio"
            class="peer hidden"
            bind:group={searchType}
            value={'ai'}
          />
          <label
            for="search-ai-radio"
            class="block cursor-pointer select-none bg-blue-900 p-2  hover:brightness-150 peer-checked:bg-blue-700/30  peer-checked:font-bold"
            >Ask AI assistant</label
          >
        </div>
      </div>

      <button
        class={`absolute right-0 mr-2 flex gap-2 rounded-md px-1 py-1 duration-200 hover:bg-blue-300/20 ${
          userQuestion.length > 3 ? 'opacity-90' : 'opacity-0'
        } ${fetchingAnswer ? 'hidden' : ''}
        `}
        on:click={() => {
          sendQuestion(userQuestion)
        }}
      >
        <span>Ask</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          aria-labelledby="title"
          aria-describedby="desc"
          role="img"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          class="w-6"
        >
          <title>Enter Key</title>
          <desc>A line styled icon from Orion Icon Library.</desc>
          <rect
            data-name="layer2"
            x="2"
            y="2"
            width="60"
            height="60"
            rx="7.8"
            ry="7.8"
            fill="none"
            stroke="#ffffff"
            stroke-miterlimit="10"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
          />
          <path
            data-name="layer1"
            fill="none"
            stroke="#ffffff"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M16 32h30v-8"
            stroke-linejoin="round"
            stroke-linecap="round"
          />
          <path
            data-name="layer1"
            fill="none"
            stroke="#ffffff"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M24 40l-8-8 8-8"
            stroke-linejoin="round"
            stroke-linecap="round"
          />
        </svg></button
      >
    </div>
    <form
      method="dialog"
      class="overflow-y-scroll px-4 pb-4"
    >
      <div class="flex flex-col items-center">
        {#if fetchingAnswer}
          <div class="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
          </div>
        {/if}
        <div class="w-full">
          {#if SearchOrama && searchType == 'query'}
            <svelte:component
              this={SearchOrama}
              {oramaQuery}
            />
          {/if}
          {#if searchType == 'ai'}
            {@html answer}
          {/if}
        </div>
      </div>
    </form>
  </dialog>
</div>

<!-- <div class="fixed h-screen w-screen top-0 left-0 z-50 pointer-events-none">
  <Canvas>
    <Scene />
  </Canvas>
</div> -->
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
