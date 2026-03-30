# Threlte Core Bugs

---

## Bug 4: `useLoader.clear` uses wrong cache keys for object inputs

**File**: `packages/core/src/lib/hooks/useLoader.ts`

When loading an object input, resources are cached with the key `[Proto, url]`:

```ts
const promises = Object.values(input).map((url) => {
  return remember(() => loadResource(url), [Proto, url])
})
```

But `clear` for object inputs uses `[Proto, key, url]` — including the object's property key — which never matches the stored cache keys:

```ts
Object.entries(input).forEach(([key, url]) => {
  clearCacheItem([Proto, key, url]) // ← [Proto, key, url] ≠ [Proto, url]
})
```

Calling `clear` on an object-loaded resource is silently a no-op; the cache entry is never removed and the resource can't be reloaded.

**Fix**: Match the cache key used at load time:

```ts
Object.values(input).forEach((url) => {
  clearCacheItem([Proto, url])
})
```

---

## Bug 5: `useLoader` always returns `undefined` for the `loader` property

**File**: `packages/core/src/lib/hooks/useLoader.ts`

The loader instance is lazily initialized inside `loadResource`, but the returned object captures the variable value at return time — which is always `undefined`:

```ts
let loader: InstanceType<Proto> | undefined

const load = (input, options) => {
  const loadResource = async (url: string) => {
    if (!loader) loader = initializeLoader()  // sets the variable
    ...
  }
  ...
}

return {
  load,
  clear,
  loader  // ← always undefined, captured before load() is ever called
}
```

The `loader` property in the return type is declared as `TLoader` (non-optional), so TypeScript gives no warning. Any user code that accesses `.loader` to configure the instance (e.g. calling methods after load) receives `undefined` and will throw at runtime.

**Fix**: Return a getter so it reflects the live variable:

```ts
return {
  load,
  clear,
  get loader() {
    return loader
  }
}
```

---

## Bug 6: `useAttach` uses live `parentObject3D.current` in cleanup instead of captured value

**File**: `packages/core/src/lib/components/T/utils/useAttach.svelte.ts`

When auto-attaching an `Object3D` to its parent, the cleanup reads `parentObject3D.current` live rather than capturing the parent at effect-run time:

```ts
if (attach === undefined && isInstanceOf(current, 'Object3D')) {
  parentObject3D.current?.add(current) // parent captured implicitly as reactive dep
  return () => {
    invalidate()
    parentObject3D.current?.remove(current) // ← live lookup, not the parent we added to
  }
}
```

Because `parentObject3D.current` is a reactive dependency of the effect, the effect re-runs whenever the parent Object3D changes (e.g. a parent `<T.Mesh>` swaps its underlying mesh). When that happens:

1. Cleanup runs — `parentObject3D.current` is already the **new** parent, so `remove` is called on the wrong object.
2. New run — `add` is called on the new parent correctly.

The child is never removed from the old parent, leaving a ghost child, and is then also added to the new parent.

The other attach branches (`Material`, `BufferGeometry`, string path) correctly capture the parent at effect time:

```ts
const p = parent.current // ← captured
p.material = current
return () => {
  p.material = originalMaterial
} // uses captured p
```

**Fix**: Capture the parent before adding:

```ts
if (attach === undefined && isInstanceOf(current, 'Object3D')) {
  const capturedParent = parentObject3D.current
  capturedParent?.add(current)
  return () => {
    invalidate()
    capturedParent?.remove(current)
  }
}
```

---

## Bug 7: `useDispose` uses live `$derived` in cleanup, so old objects are never disposed when `is` changes

**File**: `packages/core/src/lib/components/T/utils/useDispose.svelte.ts`

Inside `useDispose`, `disposable` is a `$derived`:

```ts
const disposable = $derived(getDisposable())

$effect(() => {
  if (dispose) {
    disposableObjectMounted(disposable)
    return () => disposableObjectUnmounted(disposable) // ← live $derived read
  }
  ...
})
```

When `internalRef` changes (e.g. the `is` prop on `<T>` changes), the parent `$effect.pre` in `T.svelte` re-runs and destroys its child effects, including the `$effect` above. Before the effect is re-created, the cleanup runs: `disposableObjectUnmounted(disposable)`. At that point `disposable` is a live `$derived` — accessing it triggers recomputation via `getDisposable() = () => internalRef`, which returns the **new** `internalRef`. So `disposableObjectUnmounted` is called with the new object (which has count 0 — a no-op), not the old one. The old object's mount count stays at 1 and it is never disposed on component remount.

This is the same class of bug as Bug 6 (`useAttach` live parent lookup in cleanup). The fix is to snapshot `disposable` at the start of the effect body:

```ts
$effect(() => {
  const _disposable = disposable // capture at run time
  if (dispose) {
    disposableObjectMounted(_disposable)
    return () => disposableObjectUnmounted(_disposable)
  }
  removeObjectFromDisposal(_disposable)
})
```

---

# Unusual Patterns

---

## Pattern 1: `setIs`/`useIs` global mutable state for component identity

**File**: `packages/core/src/lib/components/T/utils/useIs.ts`, `packages/core/src/lib/components/T/T.ts`

`T.Mesh`, `T.BoxGeometry`, etc. work via a Proxy that calls `setIs(module)` in the `get` trap and immediately returns `TComp`. When Svelte then initialises `TComp`, its `is` default prop calls `useIs()` which reads and clears the module-level `currentIs` variable:

```ts
let currentIs: unknown | undefined

export const setIs = <T>(is: T) => {
  currentIs = is
}
export const useIs = <T>(): T => {
  const is = currentIs
  currentIs = undefined
  return is as T
}
```

This works because Svelte initialises components synchronously and sequentially, so `setIs` and `useIs` are always called in immediate succession. But it is a fragile coupling to Svelte's rendering order. A previous variant of this broke when Svelte 5.53+ DEV mode started triggering internal symbol lookups on the Proxy (now guarded with `if (typeof is !== 'string') return Reflect.get(_target, is)`). Any future change in how Svelte evaluates component expressions — e.g. evaluating all sibling expressions before mounting any of them — would silently cause every `<T.X>` to render as whatever `<T.Y>` was evaluated last.

**Potential Solution**: Replace the module-level singleton with per-access binding. Instead of having the Proxy `get` trap write to a global and relying on the next synchronous `useIs()` call to consume it, bind the `is` value into a dedicated wrapper component created per-access — e.g. `T.Mesh` returns a unique component function whose `is` default is closed over at Proxy-get time rather than threaded through a global channel. This removes the timing assumption entirely. A lighter alternative is to add an assertion in `useIs` that `currentIs !== undefined`, making any future regression immediately visible as a thrown error rather than silent wrong behaviour.

---

## Pattern 2: Hooks called conditionally inside `$effect.pre`

**File**: `packages/core/src/lib/components/T/T.svelte`

`useCamera` and `useDispose` are called inside conditional `$effect.pre` blocks:

```ts
$effect.pre(() => {
  if (
    isInstanceOf(internalRef, 'PerspectiveCamera') ||
    isInstanceOf(internalRef, 'OrthographicCamera')
  ) {
    useCamera(
      () => internalRef,
      () => manual,
      () => makeDefault,
      () => props
    )
  }
})

$effect.pre(() => {
  if (isDisposableObject(internalRef)) {
    useDispose(() => internalRef)
  }
})
```

Both `useCamera` and `useDispose` create their own `$effect.pre`/`$effect` calls internally. In Svelte 5 these become child effects and are cleaned up correctly when the parent re-runs. It works today, but calling hooks conditionally inside effects is explicitly discouraged in most reactive frameworks because:

- It relies on child-effect cleanup semantics that aren't part of the Svelte 5 public contract.
- `useDispose` calls `getContext` inside the effect, which works currently but is outside the normal component-initialisation phase where context access is documented to be valid.
- If `internalRef` rapidly alternates between a camera and a non-camera type, cleanup and re-registration of camera state (including the module-level `defaultCameras` Set in `useCamera.svelte.ts`) happens on every flip, which could produce unexpected intermediate states.

**Potential Solution**: Hoist the hook calls unconditionally to component initialisation time and make the hooks themselves guard on the reactive condition internally. For example, `useCamera` could contain `$effect.pre(() => { if (!isCamera(ref())) return; ... })` at its own top level rather than being called inside a conditional effect in `T.svelte`. This keeps all hook registrations unconditional from Svelte's perspective, moves the condition inside where it is a normal reactive guard, and avoids calling `getContext` outside component initialisation.

---

## Pattern 3: Module-level `defaultCameras` Set shared across all Canvas instances

**File**: `packages/core/src/lib/components/T/utils/useCamera.svelte.ts`

```ts
const defaultCameras = new Set()
```

This Set is declared at module scope, meaning it is shared across all `<Canvas>` instances in the same JS module (i.e. the entire app). If two `<Canvas>` components are mounted simultaneously and both have a `<T.PerspectiveCamera makeDefault />`, they share the same `defaultCameras` Set. Unmounting a camera in one canvas could set `defaultCamera` to `undefined` in the other canvas if it happens to be the last entry in the shared Set, because the cleanup checks `defaultCameras.size === 0` globally rather than per-canvas.

**Potential Solution**: Move `defaultCameras` inside `createCameraContext` so each Canvas gets its own Set, and pass it (or the camera context itself) as an argument to `useCamera`. This is the standard fix for any module-level state that is logically per-instance.

---

## Pattern 4: Nested `$effect.pre` inside `untrack` in `useProps`

**File**: `packages/core/src/lib/components/T/utils/useProps.svelte.ts`

```ts
$effect.pre(() => {
  const _object = object()
  const _props = props()
  const _pluginProps = pluginProps()

  untrack(() => {
    for (const key in _props) {
      $effect.pre(() => {
        if (_pluginProps?.includes(key) || ignoredProps.has(key)) return
        return setProp(_object, key, _props[key])
      })
    }
  })
})
```

The outer effect tracks `object`, `props` (reference), and `pluginProps`. Inside `untrack()`, it creates one child `$effect.pre` per prop key, each of which individually tracks `_props[key]` so individual prop changes only re-run the relevant inner effect rather than all N of them.

The concern: every time `object()`, `props()` (reference), or `pluginProps()` changes, the outer effect tears down and rebuilds **all N inner effects** even if only one prop changed. For objects with many props this is a non-trivial amount of churn. The `untrack()` also makes the data flow hard to follow — `_pluginProps` is captured from the outer scope but used inside inner effects, so changes to `pluginProps` trigger a full rebuild of all inner effects rather than re-evaluating individually.

**Potential Solution**: If the full rebuild cost on `object` or `props`-reference changes is acceptable, the data flow could be simplified by collapsing to a single flat `$effect.pre` that iterates all props on every run — straightforward to reason about and only loses the per-key granularity. If per-key granularity is important, a keyed reactive map (e.g. a `Map<string, () => void>` of per-key stop functions maintained imperatively) would avoid the `untrack` + nested-effect indirection while still only re-running the changed key's setter.

---

## Pattern 5: Mixed `watch` (deprecated) and `$effect.pre` for the same settings in `renderer`

**File**: `packages/core/src/lib/context/fragments/renderer.svelte.ts`

The renderer syncs props into stores with `$effect.pre`, then applies Three.js side effects with `watch`:

```ts
// hop 1: prop → store
$effect.pre(() => {
  context.colorSpace.set(options.colorSpace ?? 'srgb')
})

// hop 2: store → Three.js
watch([context.colorSpace], ([colorSpace]) => {
  if ('outputColorSpace' in renderer) renderer.outputColorSpace = colorSpace
})
```

This two-hop chain mixes a deprecated API (`watch`) with the current one (`$effect.pre`) for the same settings. The indirection makes it harder to trace reactivity — a change in `options.colorSpace` triggers `$effect.pre`, which updates the store, which triggers `watch`, which updates the renderer. Each setting could be a single `$effect.pre` that reads the prop directly and applies the side effect.

**Potential Solution**: Merge each two-hop pair into a single `$effect.pre` that both updates the store and applies the Three.js side effect:

```ts
$effect.pre(() => {
  const cs = options.colorSpace ?? 'srgb'
  context.colorSpace.set(cs)
  if ('outputColorSpace' in renderer) renderer.outputColorSpace = cs
})
```

The public stores remain writable for external consumers who set them directly; those writes still flow through their own `watch`/subscribe chains. The `watch` calls in `renderer.svelte.ts` are only needed to cover that external-write path — the internal prop-sync path can be collapsed.

---

## Pattern 6: `observe` captures initial store/non-store classification and never updates it

**File**: `packages/core/src/lib/utilities/observe.svelte.ts`

```ts
const stores = dependencies().map((d) => {
  if (isStore(d)) return fromStore(d)
  return signal
})

const deps = $derived(
  dependencies().map((d, i) => {
    if (stores[i] === signal) return d
    else return (stores[i] as { current: any }).current
  })
)
```

`stores` is computed once at call time — it classifies each dependency as either a store (gets a `fromStore` wrapper) or a plain reactive value (gets `signal`). The `$derived` re-evaluates `dependencies()` reactively but still uses the initial `stores` array to decide how to read each dependency.

If a dependency at index `i` changes from a non-store to a store (or vice versa) after initialisation, the classification is permanently wrong for that slot. In practice users pass a fixed array literal so this doesn't occur, but it means `observe` has a hidden assumption that the dependency types are stable for the lifetime of the observer.

**Potential Solution**: Either enforce the constraint explicitly (document and/or throw in dev if the type at a given index changes), or re-classify per evaluation inside the `$derived`. The latter requires caching `fromStore` wrappers by identity to avoid creating new wrappers on every reactive update:

```ts
const wrapperCache = new Map<Readable<any>, { current: any }>()
const getWrapper = (d: Readable<any>) => {
  if (!wrapperCache.has(d)) wrapperCache.set(d, fromStore(d))
  return wrapperCache.get(d)!
}
const deps = $derived(dependencies().map((d) => (isStore(d) ? getWrapper(d).current : d)))
```

This removes the frozen classification entirely at the cost of a Map lookup per dependency per reactive update — negligible in practice.

---

## Pattern 7: `parentObject3D` writable never cleared when ref changes from Object3D to non-Object3D

**File**: `packages/core/src/lib/components/T/utils/useAttach.svelte.ts`, `packages/core/src/lib/context/fragments/parentObject3D.ts`

`createParentObject3DContext` returns a writable that is set when the ref is an `Object3D`, but is never explicitly cleared when the ref changes to a non-Object3D type:

```ts
$effect.pre(() => {
  currentRef.set(ref)

  if (isInstanceOf(ref, 'Object3D')) {
    object3D.set(ref)
    // ← no else branch to clear object3D when ref is not an Object3D
  }

  invalidate()
})
```

The `parentObject3DContext` is derived as `object3D ?? parentObject3D`. If `object3D` was set to a Mesh and then `ref` changes to a Material, `object3D` still holds the stale Mesh. Child components continue to see the old Mesh as their parent Object3D rather than falling through to the actual grandparent. In practice this only triggers if `is` is changed from an Object3D type to a non-Object3D type on the same `<T>` component, which is unusual but not impossible with dynamic `is` bindings.

**Potential Solution**: Add an `else` branch that clears `object3D` when `ref` is not an `Object3D`:

```ts
if (isInstanceOf(ref, 'Object3D')) {
  object3D.set(ref)
} else {
  object3D.set(undefined)
}
```

The derived `object3D ?? parentObject3D` will then correctly fall through to the grandparent when the current ref is not an `Object3D`.

---

## Pattern 9: `useThrelteUserContext` mutates store value in-place on `merge`

**File**: `packages/core/src/lib/hooks/useThrelteUserContext.ts`

When `options.existing === 'merge'`, the `update` callback mutates the existing namespace entry in-place and returns the same top-level `ctx` reference:

```ts
if (options.existing === 'merge') {
  const v = typeof value === 'function' ? value() : value
  Object.assign(ctx[namespace] as Record<string, unknown>, v)
  return ctx // ← same object reference
}
```

`writable.update` always notifies subscribers regardless of reference equality, so basic `subscribe` callbacks do fire. However, Svelte 5 `$derived` uses reference equality to short-circuit: if the store emits the same object reference as last time, downstream `$derived` values that depend on the namespace entry won't re-evaluate. Any code that does `$derived(userCtxStore, ctx => ctx[namespace])` (which is exactly what the read-only overload returns) will miss the merge update because `ctx[namespace]` is the same reference before and after. Replacing the pattern with a shallow clone (`return { ...ctx, [namespace]: { ...ctx[namespace], ...v } }`) would make the notification meaningful to all consumers.

**Potential Solution**: Return a shallow-cloned top-level object with a new namespace entry on merge, so that every subscriber (including `$derived`) sees a meaningfully new reference:

```ts
if (options.existing === 'merge') {
  const v = typeof value === 'function' ? value() : value
  return { ...ctx, [namespace]: { ...(ctx[namespace] as object), ...v } }
}
```

This matches the immutable-update convention used everywhere else in the store.

---

## Pattern 10: `useStage` silently ignores `options` when stage already exists

**File**: `packages/core/src/lib/hooks/useStage.ts`

```ts
export function useStage(key: Key, options?: CreateStageOptions) {
  const { scheduler } = useThrelte()
  return scheduler.getStage(key) ?? scheduler.createStage(key, options)
}
```

If two components call `useStage` with the same key but different `options` (e.g., different `before`/`after` ordering constraints), the second call silently returns the already-created stage and discards the options. There is no warning, no error, and no way for the caller to know their ordering constraints were ignored. The JSDoc even documents this as intended ("If the stage already exists, it is returned"), but in practice a component author who calls `useStage('my-stage', { after: mainStage })` conditionally or after a sibling already created it gets a stage with unexpected ordering and no feedback.

**Potential Solution**: Emit a `console.warn` in dev mode when `options` are supplied but the stage already exists, so authors discover the conflict at development time rather than in production. The warning could include the stage key and what options were silently ignored. If stricter behaviour is preferred, throw instead.

---

## Pattern 11: `usePlugins` initializes plugins once, non-reactively

**File**: `packages/core/src/lib/components/T/utils/usePlugins.ts`

```ts
export const usePlugins = (args: () => Parameters<Plugin>[0]) => {
  const plugins = getContext<PluginContext | undefined>(pluginContextKey)
  if (!plugins) return

  const pluginsProps: string[] = []
  const pluginsArray = Object.values(plugins) // snapshot at init

  if (pluginsArray.length > 0) {
    const pluginArgs = args() // args evaluated once
    for (let i = 0; i < pluginsArray.length; i++) {
      const plugin = pluginsArray[i]
      const p = plugin(pluginArgs) // plugin initialized once
      if (p && p.pluginProps) pluginsProps.push(...p.pluginProps)
    }
  }

  return { pluginsProps }
}
```

`Object.values(plugins)` takes a snapshot of the plugin registry at the moment `usePlugins` is called (component initialisation). If plugins are added to the context after this point they are never seen. `args()` is also called once — if the T component's `ref`, `props`, or other args change, the already-initialised plugins receive no notification through this path (they must set up their own internal reactivity). The returned `pluginsProps` array is a plain array, not reactive, so `useProps` must treat it as a fixed list for the lifetime of the component. This is largely by design, but it means plugin authors cannot conditionally declare `pluginProps` based on reactive state — any prop a plugin may ever want to reserve must be declared at init time.

**Potential Solution**: Document the constraint explicitly in the plugin authoring guide so that authors know all props they may ever intercept must be declared synchronously at plugin init. If dynamic `pluginProps` become necessary in the future, the return value of `plugin(pluginArgs)` would need to be reactive (e.g. a store or `$derived`-backed object), and `useProps` would need to subscribe to it — a significant but self-contained change.

---

## Pattern 8: `dispose()` called unawaited every animation frame

**File**: `packages/core/src/lib/context/fragments/renderer.svelte.ts`

```ts
renderer.setAnimationLoop((time) => {
  dispose() // async, not awaited
  scheduler.run(time)
  resetFrameInvalidation()
})
```

`dispose` is an `async` function that starts with `await tick()`. Calling it without `await` means a new in-flight Promise is created on every frame. Each frame, `dispose()` suspends at `await tick()`, `scheduler.run` executes synchronously, and then on the next microtask tick each pending `dispose` resumes and checks `shouldDispose`. JavaScript's single-threaded model prevents true concurrency, so multiple in-flight instances don't corrupt state — but it does mean disposal runs are queued as microtasks and can pile up. It also makes the intent of the code harder to follow: it looks like fire-and-forget but relies on the microtask queue resolving before the next frame for correctness.

**Potential Solution**: Guard against overlapping runs with a boolean flag so at most one `dispose` call is in-flight at a time:

```ts
let disposing = false
renderer.setAnimationLoop((time) => {
  if (!disposing && context.shouldDispose) {
    disposing = true
    dispose().finally(() => {
      disposing = false
    })
  }
  scheduler.run(time)
  resetFrameInvalidation()
})
```

Alternatively, evaluate whether the `await tick()` inside `dispose` is still necessary. If `shouldDispose` is already set synchronously before the animation loop fires, a synchronous disposal path would let the call be awaited naturally and eliminate the piling concern entirely.

---

## Pattern 12: `useEvents.svelte.ts` is dead code with the same live-ref-in-cleanup bug as `useAttach`

**File**: `packages/core/src/lib/components/T/utils/useEvents.svelte.ts`

`useEvents` is defined but never imported or called anywhere in the codebase (confirmed by search — the only reference to it is its own file). It was presumably replaced when `T.svelte` was simplified, but the file was not removed.

Additionally, the implementation has the same class of bug as Bug 6 and Bug 7: `ref` and `prop` are `$derived` values accessed live inside cleanup closures rather than being captured at effect-run time:

```ts
$effect.pre(() => {
  if (typeof prop !== 'function' || !isEventDispatcher(ref)) return
  const name = key.slice(2)
  ref.addEventListener(name, prop)
  return () => ref.removeEventListener(name, prop) // ← live $derived reads
})
```

When `ref` changes, the cleanup calls `ref.removeEventListener(name, prop)` on the **new** object (which never had the listener), leaving the old object with a stale listener attached. Similarly when `prop` changes, the old handler is never removed. The file should either be deleted or the pattern corrected before it's brought back into use.

**Potential Solution**: Delete the file — it is not used anywhere. If it is revived, apply the same snapshot fix used in Bug 6 and Bug 7: capture both `ref` and `prop` as local variables at the start of the effect body so the cleanup closure closes over the values that were live when the listener was added, not the values at cleanup time.
