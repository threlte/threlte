# [sv](https://svelte.dev/docs/cli/overview) community add-on: [threlte](https://threlte.xyz)

> [!IMPORTANT]
> Svelte maintainers have not reviewed community add-ons for malicious code. Use at your discretion

## Usage

To install the add-on, run:

```shell
npx sv add @joanofxyz/sv-add-threlte
```

## What you get

- `@threlte/core` - The core 3D rendering framework
- Optional packages: extras, rapier, theatre, xr, flex, studio, gltf, uikit
- Optional demo page with a 3D rotating cube

## Options

### `demo`

Include a demo page with a 3D rotating cube.

Default: `false`

```shell
npx sv add threlte="demo:false"
```

### `packages`

Which Threlte packages to install. Use multiple times to select multiple packages.

Default: `extras`

```shell
npx sv add threlte="packages:extras,rapier,theatre"
```
