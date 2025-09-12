import { searchActive } from './searchStore'
import { Markprompt } from '@markprompt/react'
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
    if (!container.current) return
    const observer = new MutationObserver(callback)
    observer.observe(container.current, config)

    return () => observer.disconnect()
  }, [])

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
              getTitle(ref) {
                return ref.hierarchy.lvl1.replace(/&[lg]t;/g, (match: string) =>
                  match === '&lt;' ? '<' : '>'
                )
              },
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
  const [visible, setVisible] = useState(false)

  useEffect(() => searchActive.subscribe(setVisible))

  const close = () => searchActive.set(false)

  return (
    visible && (
      <>
        <div className="pointer-events-none fixed left-0 top-0 z-50 h-full w-full">
          <div
            className="pointer-events-auto fixed left-0 top-0 h-screen w-screen bg-gray-900/70"
            onClick={close}
          />
          <dialog
            open={visible}
            className={
              'pointer-events-auto mx-auto mt-[10vh] flex max-h-[75vh] w-full max-w-[800px] flex-col gap-4 rounded-lg border border-white/20 bg-blue-900 px-0 py-2 text-white'
            }
          >
            <Search visible={visible} />
          </dialog>
        </div>
      </>
    )
  )
}
