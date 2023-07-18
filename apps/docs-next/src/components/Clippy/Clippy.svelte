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

<div class="fixed top-0 left-0 w-screen h-screen z-50 pointer-events-none">
  <div
    id="clippy-corner-area"
    class="absolute bottom-0 right-0 w-96 px-6 py-4 flex flex-col items-center"
  >
    <div
      class={'px-3 pr-4 py-1 gap-2 rounded-md flex flex-row items-center border-white/20 border justify-start group bg-blue-900 hover:bg-blue-700/30'}
    >
      <button
        class="pointer-events-auto"
        on:click={toggleDialog}
      >
        Hi friend! Need some help?
      </button>
    </div>
    <div
      class="w-64 aspect-square border border-red-500/20"
      bind:this={cornerEl}
    />
  </div>

  {#if askingQuestion}
    <div
      class={`w-screen h-screen fixed top-0 left-0  pointer-events-auto bg-gray-900/70
      `}
      on:click={toggleDialog}
      on:keypress={toggleDialog}
    />
  {/if}

  <dialog
    open={askingQuestion}
    class={`bg-blue-900 text-white w-full px-0 py-2 flex flex-col gap-4 max-w-[50%] pointer-events-auto max-h-[500px] mt-[10%] border-white/20 border rounded-lg glow-blue ${
      askingQuestion ? '' : 'hidden'
    }`}
  >
    <div
      id="clippy-dialogue-area"
      class="absolute top-0 left-0 w-64 flex flex-col items-center -translate-x-full"
    >
      <div
        class="w-full aspect-square border border-red-500/20"
        bind:this={dialogueEl}
      />
    </div>
    <div class="flex flex-col absolute -right-6 translate-x-full top-0 gap-1">
      <h2 class="font-bold">Previously asked questions:</h2>
      {#each $clippyHistory as entry}
        <button
          class="opacity-75 hover:opacity-100 text-left py-1"
          on:click={() => {
            userQuestion = entry.question
            answer = snarkdown(loadHistoryAnswer(entry.answerUuid) || '')
          }}>- {entry.question}</button
        >
      {/each}
    </div>
    <div
      class={`absolute top-40 -translate-y-full left-0 w-full h-96 ${glowClasses['blue']} pointer-events-none`}
    />
    <div class="w-full relative flex items-center flex-col gap-1">
      <div class="border-b border-blue-500/90 w-full pb-1">
        <input
          class="w-full  px-4 py-1 outline-none bg-transparent 0"
          placeholder="Search a phrase or ask an AI assistant about Threlte..."
          bind:value={userQuestion}
        />
      </div>

      <div class="flex flex-col gap-2 items-stretch  border-b border-blue-500/90 w-full pb-2">
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
            class="block cursor-pointer select-none p-2 bg-blue-900  peer-checked:bg-blue-700/30 peer-checked:font-bold hover:brightness-150"
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
            class="block cursor-pointer select-none p-2 bg-blue-900  peer-checked:bg-blue-700/30 peer-checked:font-bold  hover:brightness-150"
            >Ask AI assistant</label
          >
        </div>
      </div>

      <button
        class={`absolute right-0 mr-2 flex gap-2 duration-200 hover:bg-blue-300/20 px-1 py-1 rounded-md ${
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
