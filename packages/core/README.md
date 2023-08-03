<div align="right">
 <a href="https://www.npmjs.com/package/@threlte/core">
  <img alt="npm" src="https://img.shields.io/npm/v/@threlte/core?color=fe4100&labelColor=171d27&logo=npm&logoColor=white"/>
 </a>
 <a href="https://github.com/threlte/threlte/blob/main/LICENSE.md">
  <img alt="license" src="https://img.shields.io/npm/l/@threlte/core?color=fe4100&labelColor=171d27&logo=git&logoColor=white"/>
 </a>
 <a href="https://discord.com/channels/985983540804091964">
  <img alt="discord" src="https://img.shields.io/discord/985983540804091964?label=discord&color=fe4100&labelColor=171d27&logo=discord&logoColor=white"/>
 </a>
 <a href="https://threlte.xyz">
  <img alt="docs" src="https://img.shields.io/website?down_color=red&down_message=offline&label=docs&color=fe4100&labelColor=171d27&up_message=online&url=https%3A%2F%2Fthrelte.xyz&logo=svelte&logoColor=white"/>
 </a>
</div>

<a href="https://threlte.xyz">
 <img src="https://threlte.xyz/logo/threlte-banner.jpg"/>
</a>

## Rapidly Build Interactive 3D Apps for the Web

Threlte is a [Svelte](https://svelte.dev/) library that simplifies creating 3D apps for the web. It provides a **declarative**, **type-safe**, **reactive** and **interactive** API out-of-the-box.

Threlte's **3D rendering** is powered by [Three.js](https://threejs.org/), and it also provides a **physics engine** through [Rapier](https://rapier.rs/) and an **animation studio** via [Theatre.js](https://www.theatrejs.com/); see [packages](#packages) for details.

Check out our **[documentation](https://threlte.xyz)** and our **[Discord community](https://discord.gg/EqUBCfCaGm)**.

## @threlte/core

[@threlte/core](https://threlte.xyz/docs/reference/core/getting-started) provides declarative and transparent Svelte binding to [Three.js](https://threejs.org/).

This package is the heart of the Threlte library. It's an excellent starting point for those learning Threlte for the first time.

## Quickstart

### Installation

For a quick interactive setup of a fresh Threlte project, run:

```sh
npm create threlte my-project
```

Alternatively you can check out the full [installation instructions](https://threlte.xyz/docs/learn/getting-started/installation).

### Tutorial

To get a hang of the basics, we recommend following our [introductory tutorial](https://threlte.xyz/docs/learn/getting-started/your-first-scene).

### Support

Have questions? Feel free to ask in our [Discord support forum](https://discord.com/channels/985983540804091964/1031843197963477002).

## Features

 - [Clean API](https://threlte.xyz/docs/reference/core/t) transparently exposing *all* Three.js objects through declarative API.

 - [Hooks](https://threlte.xyz/docs/learn/basics/hooks) providing easy access to low-level contexts like animation frames and the rendering engine.

 - [Plugins](https://threlte.xyz/docs/learn/advanced/plugins) making it easy to extend Threlte with custom code and logic.

 - [Events](https://threlte.xyz/docs/learn/basics/events) enabling robust and Svelte-native access to state transformations in your scenes.

 - [Interactivity](https://threlte.xyz/docs/reference/extras/interactivity) makes it easy to react to user inputs on 3D objects.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- **Filing Issues** - if you have feature requestions or you think you spotted a bug, [submit an issue](https://github.com/threlte/threlte/issues/new).
- **Contributing Code** - if you would like to drop us a PR, read the [contribution guide](https://github.com/threlte/threlte/blob/main/CONTRIBUTING.md) first.

## Sponsors

[![Powered by Vercel](./assets/vercel/powered-by-vercel.svg)](https://vercel.com/?utm_source=threlte&utm_campaign=oss)

---

### License

The MIT License (MIT). Please see the [License File](LICENSE.md) for more information.
