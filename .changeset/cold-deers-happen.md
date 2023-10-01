---
'@threlte/extras': major
---

## Grid component update:

- New types of grid: lines, circular and polar.
- Added background option to to the Grid
- **breaking**: renamed `axes` property to `plane`. It now accepts two letter prop `'xz' | 'xy' | 'zy'` instead of 3 letter prop `'xzy' | 'xyz' | 'zyx'`

**Migration:**
- change `axes` to `plane` in all of your `<Grid/>` components and use the new two-letter values (for example, `xzy` would become `xz`).
