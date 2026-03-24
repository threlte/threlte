import { getCollection, type CollectionEntry } from 'astro:content'

type ReferenceCategoryKey = NonNullable<CollectionEntry<'reference'>['data']['category']>

const referenceSidebarMenuCategoryOrder: ReferenceCategoryKey[] = [
  '@threlte/core',
  '@threlte/extras',
  '@threlte/gltf',
  '@threlte/rapier',
  '@threlte/theatre',
  '@threlte/xr',
  '@threlte/flex',
  '@threlte/studio',
  'Documentation'
]

const getReferenceSidebarMenu = async (): Promise<LeftSidebarMenu> => {
  const referenceCollection = await getCollection('reference')

  const categoryNames = [...new Set(referenceCollection.map((item) => item.data.category))]

  const categories = categoryNames.map((category): LeftSidebarMenuCategory => {
    const items = referenceCollection.filter(
      (item) => item.data.showInSidebar && item.data.category === category
    )

    let menuItems: LeftSidebarMenuItem[]

    if (category === '@threlte/extras') {
      const ungrouped = items
        .filter((item) => !item.data.group && !item.data.isDivider)
        .sort((a, b) => a.data.title.localeCompare(b.data.title))
        .map((item): LeftSidebarMenuItem => ({ title: item.data.title, slug: item.id, isDivider: false }))

      const groupMap = new Map<string, LeftSidebarMenuItem[]>()
      for (const item of items) {
        if (!item.data.group) continue
        if (!groupMap.has(item.data.group)) groupMap.set(item.data.group, [])
        groupMap.get(item.data.group)!.push({ title: item.data.title, slug: item.id, isDivider: false })
      }

      for (const groupItems of groupMap.values()) {
        groupItems.sort((a, b) => a.title.localeCompare(b.title))
      }

      const sortedGroups = [...groupMap.entries()].sort(([a], [b]) => a.localeCompare(b))

      menuItems = [
        ...ungrouped,
        ...sortedGroups.flatMap(([group, groupItems]) => [
          { title: group, slug: '', isDivider: true },
          ...groupItems
        ])
      ]
    } else {
      menuItems = items
        .sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
        .map((item): LeftSidebarMenuItem => ({
          title: item.data.title,
          slug: item.id,
          isDivider: item.data.isDivider ?? false
        }))
    }

    return {
      urlPrefix: '/docs/reference',
      menuItems,
      title: category
    }
  })

  categories.sort((a, b) => {
    return (
      referenceSidebarMenuCategoryOrder.indexOf(a.title as ReferenceCategoryKey) -
      referenceSidebarMenuCategoryOrder.indexOf(b.title as ReferenceCategoryKey)
    )
  })

  return {
    categories
  }
}

type LearnCategoryKey = CollectionEntry<'learn'>['data']['category']

const learnSidebarMenuCategoryOrder: LearnCategoryKey[] = [
  'Getting Started',
  'Basics',
  'Advanced',
  'More',
  'Preprocessing'
]

const getLearnSidebarMenu = async (): Promise<LeftSidebarMenu> => {
  const learnCollection = await getCollection('learn')

  const categoryNames = [...new Set(learnCollection.map((item) => item.data.category))]

  const categories = categoryNames.map((category): LeftSidebarMenuCategory => {
    const menuItems = learnCollection
      .filter((item) => item.data.showInSidebar && item.data.category === category)
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
      .map((item): LeftSidebarMenuItem => {
        return {
          title: item.data.title,
          slug: item.id,
          isDivider: item.data.isDivider ?? false
        }
      })
    return {
      urlPrefix: '/docs/learn',
      menuItems,
      title: category
    }
  })

  categories.sort((a, b) => {
    return (
      learnSidebarMenuCategoryOrder.indexOf(a.title as LearnCategoryKey) -
      learnSidebarMenuCategoryOrder.indexOf(b.title as LearnCategoryKey)
    )
  })

  return {
    categories
  }
}

const getExamplesSidebarMenu = async (): Promise<LeftSidebarMenu> => {
  const learnCollection = await getCollection('examples')

  // Trying to find the category names by looking at the directory structure. An
  // example in the dir 'src/content/examples/Animation System/transitions.mdx'
  // would have a category name of "Animation System".
  const categoryNames = [
    ...new Set(
      learnCollection
        .filter((item) => {
          // only use items that are nested in a subdirectory
          return item.id.split('/').length > 1
        })
        .map((item) => {
          return item.id.split('/')[0] as string
        })
    )
  ].sort((a, b) => a.localeCompare(b))

  const categories = categoryNames.map((category): LeftSidebarMenuCategory => {
    const menuItems = learnCollection
      .filter((item) => item.id.startsWith(category))
      .map((item): LeftSidebarMenuItem => {
        // Removes the file extension from item.id and finds last item in array
        // when splitting on '/'. This is the title of the example.
        const title = item.id.split('/').pop()?.split('.')[0] as string
        return {
          title,
          slug: item.id,
          isDivider: false
        }
      })
      .sort((a, b) => a.title.localeCompare(b.title))
    return {
      urlPrefix: '/docs/examples',
      menuItems,
      title: category as Exclude<typeof category, undefined>
    }
  })

  return {
    categories
  }
}

export const getLeftSidebarMenu = async (): Promise<
  Record<'learn' | 'reference' | 'examples', LeftSidebarMenu>
> => {
  const reference = await getReferenceSidebarMenu()
  const learn = await getLearnSidebarMenu()
  const examples = await getExamplesSidebarMenu()

  return {
    reference,
    learn,
    examples
  }
}
