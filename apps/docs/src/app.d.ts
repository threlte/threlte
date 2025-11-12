declare module 'troika-three-text'
declare module 'svelte/internal/client'

interface StarlightSidebarTopicsRouteData {
  /**
   * Indicates if the current page is associated with a topic or not.
   */
  isPageWithTopic: boolean
  /**
   * A list of all configured topics.
   */
  topics: {
    /**
     * The optional badge associated with the topic.
     */
    badge?: {
      text: string
      variant: SidebarTopicBadge['variant']
    }
    /**
     * The name of an optional icon associated with the topic set to one of Starlight’s built-in icons.
     */
    icon?: StarlightIcon
    /**
     * Indicates if the current page is part of the topic.
     */
    isCurrent: boolean
    /**
     * The label of the topic.
     */
    label: string
    /**
     * The link to the topic’s content.
     */
    link: string
  }[]
}

declare namespace App {
  type StarlightLocals = import('@astrojs/starlight').StarlightLocals
  interface Locals extends StarlightLocals {
    /**
     * Starlight Sidebar Topics data.
     *
     * @see https://starlight-sidebar-topics.netlify.app/docs/guides/custom-topic-list/
     */
    starlightSidebarTopics: StarlightSidebarTopicsRouteData
  }
}
