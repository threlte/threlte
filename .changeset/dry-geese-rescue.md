---
"@threlte/xr": minor
"@threlte/docs": patch
---

Added handFactory and controllerFactory optional param to XR.svelte. These factories will be used in place of the default in setupHands/setupController respectively. This allows the user to prevent the default behavior of fetching from the online profiles repository, if for example their app is intended for offline use.
