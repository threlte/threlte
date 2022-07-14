---
title: Reactivity
---

# Reactivity

[Open the reactivity example in a Svelte REPL](https://svelte.dev/repl/117298a99a5546e18b08b43c3a121274?version=3.46.2)

Just like [Svelte Cubed](https://github.com/Rich-Harris/svelte-cubed) and unlike [react-three-fiber](https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls) it is encouraged to use your component state to drive your three.js scene.
By using props instead of manipulating three.js objects directly, the unified render loop is able to tell that your scene needs rerendering and Svelte can make use of component optimizations.
