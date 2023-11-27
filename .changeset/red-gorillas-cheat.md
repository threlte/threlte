---
'@threlte/xr': patch
---

- Fix teleport cursor rotation when hovering on rotated objects.
- Fix useController and useHand did not populate store values if a <Controller> / <Hand> component was not created.
- Fix XR Controllers not rendering default models if unmounted and remounted.
- Fix XR Hands not properly unmounting objects in the wrist slot if they lost connnection.
- Fix hit tests not stopping when a session is exited.
- Removed some uncommon optional features from the ARButton to prevent console warnings appearing in most apps.
