---
title: Introduction
---

<script lang="ts">
import Example from '$examples/introduction/App.svelte'
</script>

# Introduction

<a id="v5-intro" href="/core-transition" style="border-bottom-width: 0;" class="block font-normal bg-brand text-white p-4 my-0 rounded-md shadow-lg">
<p class="!my-0 !py-0">Learn more about the exciting changes that are happening to threlte in version 5:</p>
<ul class="!pb-0 !mb-0">
<li>
Hundreds of new components
</li>
<li>
Better <code style="background-color: #DE3700">react-three-fiber</code> ecosystem compatibility
</li>
<li>
New prop syntax
</li>
<li>
A custom preprocessor
</li>
</ul>
</a>

Threlte is a component library for Svelte to build and render three.js scenes declaratively and state-driven in Svelte apps.

<ExampleWrapper playgroundHref="/introduction">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../examples/introduction/App.svelte)
@[code svelte|title=Scene.svelte](../examples/introduction/Scene.svelte)

</div>
</ExampleWrapper>

It's inspired by the sensible defaults of [react-three-fiber](https://github.com/pmndrs/react-three-fiber), the simplicity and effectiveness of Sveltes reactivity model and [Svelte Cubed](https://github.com/Rich-Harris/svelte-cubed).

It provides strictly typed components to quickly and easily build three.js scenes with deep reactivity and interactivity out-of-the-box.

It also aims to provide the building blocks to quickly extend Threlte when it's needed.

:::admonition type="note"
Threlte is still in active development and you should expect breaking changes. Check the release notes before updating. If you want to be on the safe side, install Threlte with `npm i @threlte/core --save-exact` to lock the versions, same goes for `@threlte/extras` and `@threlte/rapier`
:::
