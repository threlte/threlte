import { onDestroy } from 'svelte'
import { derived, get, writable } from 'svelte/store'
import type { FolderApi, TabPageApi, InputParams, Pane, TpPlugin } from 'tweakpane'
import * as tweakpaneDefault from 'tweakpane'
import type { PaneConfig } from 'tweakpane/dist/types/pane/pane-config'
import type { View } from '@tweakpane/core'
import * as tweakpaneCore from '@tweakpane/core'

const tp = (tweakpaneDefault as any).default ?? tweakpaneDefault
const tpC = ((tweakpaneCore as any).default ?? tweakpaneCore) as any

const className = tpC.ClassName('ph')

class TextView implements View {
  element: HTMLElement
  constructor(doc: any, config: any) {
    this.element = doc.createElement('div')
    this.element.classList.add(className())
    config.viewProps.bindClassModifiers(this.element)

    const textElement = doc.createElement('div')
    textElement.classList.add(className('t'))
    textElement.textContent = config.text
    this.element.appendChild(textElement)
  }
}

// prettier-ignore
class TextController extends (tpC.BladeController) {
	constructor(doc: any, config: any) {
		super({
			blade: tpC.createBlade(),
			view: new TextView(doc, config),
			viewProps: config.viewProps
		})
	}
}

export const TextPlugin = {
  id: 'text',
  type: 'blade',
  css: `.tp-phv {
	align-items: center;
	display: flex;
	height: var(--bld-us);
	position: relative;
}
.tp-phv::before {
	border: var(--tw-prose-body) dashed 1px;
	border-radius: var(--elm-br);
	bottom: 0;
	content: '';
	left: var(--cnt-v-p);
	opacity: 0.3;
	position: absolute;
	right: var(--cnt-v-p);
	top: 0;
}
.tp-phv_t {
	box-sizing: border-box;
	color: var(--mo-fg);
	flex: 1;
	padding: 4px;
	text-align: center;
}
`,
  accept(params: any) {
    const p = tpC.ParamsParsers
    const r = tpC.parseParams(params, {
      lineCount: p.optional.number,
      text: p.required.string,
      view: p.required.constant('text')
    })
    return r ? { params: r } : null
  },
  controller(args: any) {
    return new TextController(args.document, {
      lineCount: args.params.lineCount ?? 1,
      text: args.params.text,
      viewProps: args.viewProps
    })
  },
  api(args: any) {
    if (!(args.controller instanceof TextController)) {
      return null
    }
    return new tpC.BladeApi(args.controller)
  }
}

export const useTweakpane = (config?: Omit<PaneConfig, 'container' | 'document'>) => {
  if (typeof window === 'undefined') throw new Error('useTweakpane can only be used in the browser')
  let disposed = false

  const pane = new tp.Pane(config) as Pane
  pane.registerPlugin({
    plugin: TextPlugin as TpPlugin
  })
  const unsubscriptions = new Set<() => void>()

  const action = (node: HTMLElement) => {
    node.append(pane.element)

    // THIS IS TO ENSURE THAT CSS IS HANDLED EQUALLY
    // IN A PLAYGROUND AND IN A REGULAR EXAMPLE
    node.style.top = '1.5rem'
    node.style.right = '1.5rem'
    node.style.width = 'calc(100% - 3rem)'
    node.style.maxWidth = '300px'
    node.style.position = 'absolute'
    node.style.zIndex = '1'
    node.style.setProperty('--tp-base-background-color', 'hsla(230, 0%, 90%, 1.00')
    node.style.setProperty('--tp-base-shadow-color', 'hsla(0, 0%, 0%, 0.0')
    node.style.setProperty('--tp-button-background-color', 'hsla(230, 0%, 75%, 1.00')
    node.style.setProperty('--tp-button-background-color-active', 'hsla(230, 0%, 60%, 1.00')
    node.style.setProperty('--tp-button-background-color-focus', 'hsla(230, 0%, 65%, 1.00')
    node.style.setProperty('--tp-button-background-color-hover', 'hsla(230, 0%, 70%, 1.00')
    node.style.setProperty('--tp-button-foreground-color', 'hsla(230, 10%, 0%, 1.00')
    node.style.setProperty('--tp-container-background-color', 'hsla(230, 0%, 30%, 0.20')
    node.style.setProperty('--tp-container-background-color-active', 'hsla(230, 0%, 30%, 0.32')
    node.style.setProperty('--tp-container-background-color-focus', 'hsla(230, 0%, 30%, 0.28')
    node.style.setProperty('--tp-container-background-color-hover', 'hsla(230, 0%, 30%, 0.24')
    node.style.setProperty('--tp-container-foreground-color', 'hsla(230, 0%, 30%, 1.00')
    node.style.setProperty('--tp-groove-foreground-color', 'hsla(230, 0%, 30%, 0.10')
    node.style.setProperty('--tp-input-background-color', 'hsla(230, 0%, 30%, 0.10')
    node.style.setProperty('--tp-input-background-color-active', 'hsla(230, 0%, 30%, 0.22')
    node.style.setProperty('--tp-input-background-color-focus', 'hsla(230, 0%, 30%, 0.18')
    node.style.setProperty('--tp-input-background-color-hover', 'hsla(230, 0%, 30%, 0.14')
    node.style.setProperty('--tp-input-foreground-color', 'hsla(230, 0%, 30%, 1.00')
    node.style.setProperty('--tp-label-foreground-color', 'hsla(230, 0%, 30%, 0.70')
    node.style.setProperty('--tp-monitor-background-color', 'hsla(230, 0%, 30%, 0.10')
    node.style.setProperty('--tp-monitor-foreground-color', 'hsla(230, 0%, 30%, 1')

    return {
      destroy() {
        if (disposed) return
        pane.dispose()
        unsubscriptions.forEach((unsubscribe) => unsubscribe())
        disposed = true
      }
    }
  }

  const addButton = (options: {
    title: string
    label?: string
    onClick: () => void
    parent?: FolderApi | TabPageApi
  }) => {
    const button = (options.parent ? options.parent : pane).addButton({
      title: options.title,
      label: options.label ?? options.title
    })
    button.on('click', options.onClick)
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  const addInput = <Value extends any>(options: {
    label: string
    value: Value
    params?: InputParams
    parent?: FolderApi | TabPageApi
  }) => {
    const inputStore = writable({
      updatedAt: Date.now(),
      value: options.value
    })

    const userStore = writable({
      updatedAt: Date.now(),
      value: options.value
    })

    const store = writable<Value>(options.value)
    const input = (options.parent ? options.parent : pane).addInput(
      {
        [options.label]: get(store)
      },
      options.label,
      options.params
    )

    input.on('change', (e: { value: Value }) => {
      inputStore.set({
        updatedAt: Date.now(),
        value: e.value
      })
    })

    unsubscriptions.add(
      userStore.subscribe((v) => {
        input.controller_.binding.target.write(v.value)
        input.refresh()
      })
    )

    const value = derived([inputStore, userStore], ([inputStore, userStore]) => {
      if (inputStore.updatedAt > userStore.updatedAt) {
        return inputStore.value
      }
      return userStore.value
    })

    return {
      subscribe: value.subscribe,
      set: (value: Value) => userStore.set({ updatedAt: Date.now(), value }),
      update: (fn: (value: Value) => Value) =>
        userStore.update((v) => ({ updatedAt: Date.now(), value: fn(v.value) }))
    }
  }

  onDestroy(() => {
    if (disposed) return
    pane.dispose()
    unsubscriptions.forEach((unsubscribe) => unsubscribe())
    disposed = true
  })

  return {
    addFolder: pane.addFolder.bind(pane),
    addSeparator: pane.addSeparator.bind(pane),
    addButton,
    addInput,
    action,
    pane
  }
}
