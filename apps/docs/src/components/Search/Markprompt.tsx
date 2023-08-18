import { searchActive } from './searchStore'
import { Markprompt } from '@markprompt/react'
import { h, Component } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import hljs from 'highlight.js'
//@ts-ignore
import hljs_svelte from 'highlightjs-svelte'

function Search({ visible }: { visible: boolean }) {
  const container = useRef(null)

  const callback = (mutationList: any) => {
    for (const mutation of mutationList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'data-loading-state' &&
        mutation.target.className === 'MarkpromptContentPlain'
      ) {
        const value = mutation.target.attributes.getNamedItem('data-loading-state')

        if (value.nodeValue === 'done') {
          mutation.target.querySelectorAll('pre').forEach((el: HTMLElement) => {
            if (!el.classList.contains('hljs') && el.innerHTML.length > 20) {
              hljs.highlightElement(el)
            }
          })
        }
      }
    }
  }

  const config = { attributes: true, childList: true, subtree: true }

  useEffect(() => {
    const observer = new MutationObserver(callback)

    if (container.current) {
      observer.observe(container.current, config)
    }

    return () => observer.disconnect()
  }, [container.current])

  return (
    visible && (
      <>
        <div
          className="h-[75vh]"
          ref={container}
        >
          <Markprompt
            projectKey="q5trazVG0x8ktiY63vB3imwnZJ9bHbyN"
            close={{
              visible: false
            }}
            search={{
              enabled: true,
              provider: {
                name: 'algolia',
                apiKey: 'b14257a2e455fc213a51ce63942dd721',
                appId: 'ZEJ3L4CHC0',
                indexName: 'threlte'
              }
            }}
            references={{
              heading: 'Visit sources this answer was generated from:',
              getHref: (ref) => {
                const baseUrl = `/docs${ref.file.path.replace('.mdx', '').replace('.md', '')}`
                if (ref.meta?.leadHeading?.slug) {
                  return `${baseUrl}#${ref.meta.leadHeading.slug}`
                }
                return baseUrl
              },
              getLabel: (ref) => {
                if (JSON.stringify(ref.file.meta.title) === '{}') {
                  return ref.file.meta.name
                }

                if (ref.meta?.leadHeading?.value) {
                  return `${ref.file.meta.category} - ${ref.meta.leadHeading.value}`
                }
                return `${ref.file.meta.category} - ${ref.file.meta.title}`
              }
            }}
            display="plain"
          />
        </div>
      </>
    )
  )
}

export default function SearchDialog() {
  // Visibility
  const [visible, setVisible] = useState(false)

  const unsubscribe = searchActive.subscribe((v) => {
    setVisible(v)
  })
  useEffect(() => {
    return () => unsubscribe()
  })

  const close = () => searchActive.set(false)

  return (
    visible && (
      <>
        <div className="pointer-events-none fixed top-0 left-0 z-50 h-full w-full">
          <div
            className="pointer-events-auto fixed top-0 left-0 h-screen  w-screen bg-gray-900/70"
            onClick={close}
          />
          <dialog
            open={visible}
            className={
              'pointer-events-auto mt-[10vh] flex max-h-[75vh] w-full max-w-[800px] flex-col gap-4 rounded-lg border border-white/20 bg-blue-900 px-0 py-2 text-white'
            }
          >
            <Search visible={visible} />
          </dialog>
        </div>
      </>
    )
  )
}
