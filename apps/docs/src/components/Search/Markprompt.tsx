import { searchActive } from './searchStore'
import { Markprompt } from '@markprompt/react'
import { h, Component } from 'preact'
import { useEffect, useState } from 'preact/hooks'

export default function NewMarkprompt() {
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
            open={true}
            className={
              'pointer-events-auto mt-[10vh] flex max-h-[75vh] w-full max-w-[800px] flex-col gap-4 rounded-lg border border-white/20 bg-blue-900 px-0 py-2 text-white'
            }
          >
            <div className="h-[75vh]">
              <Markprompt
                projectKey="sk_test_jRhXPf4l0JEZlzdGzRwSsTFKSYT6ZzeA"
                debug={true}
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
          </dialog>
        </div>
      </>
    )
  )
}
