declare module 'troika-three-text'
declare module 'svelte/internal/client'

declare type LeftSidebarMenuItem = {
  title: string
  slug: string
  isDivider?: boolean
}

declare type LeftSidebarMenuCategory = {
  urlPrefix: string
  title: string
  menuItems: LeftSidebarMenuItem[]
}

declare type LeftSidebarMenu = {
  categories: LeftSidebarMenuCategory[]
}
