# Contributing to Threlte

## Ways to contribute

- **Improve documentation:** fix incomplete or missing docs, bad wording, examples or explanations
- **Give feedback:** we are constantly working on making Threlte better, please share how you use Threlte, what features are missing and what is done good via GitHub Discussions or Discord
- **Share Threlte:** share link to Threlte docs with anyone who could be interested, share Threlte on Twitter
- **Contribute to codebase:** propose new feature via GitHub Issues or find an [existing one](https://github.com/threlte/threlte/labels/help%20wanted) that you are interested in and work on it
- **Give us a code review:** help us identify problems with [source code](https://github.com/threlte/threlte) or make Threlte more performant

## Contributing workflow

- Decide what you want to contribute
- If you want to implement a new feature, discuss it with a maintainer ([Discord](https://discord.gg/EqUBCfCaGm) or [Discussions](https://github.com/threlte/threlte/discussions)) before jumping into code
- After finalizing your work, please follow our commit convention
- Submit a PR if everything is fine
- Get a code review and fix all issues noticed by a maintainer
- PR is merged, and we're done!

## Commit convention

Threlte is a monorepo and it is important to write clear commit messages to keep the git history clean.

This repo uses [changesets](https://github.com/changesets/changesets) to make commits easier. In order to commit changes you made, you should run the command `npx changeset`. Once you have done that, the changesets cli will guide you through the process of documenting your changes.

## Git branches

- **main** - This branch reflects what is being published on npm.

## Get started with Threlte locally

- Install [editorconfig](https://editorconfig.org/) extension for your editor
- **vscode users only** - install recommended extensions
- Fork the [repository](https://github.com/threlte/threlte), clone or download your fork
- Install dependencies at the root of the repository with `pnpm run install:all` **(make sure to install with pnpm)**
- After the dependencies have been installed:

**If developing a package [e.g. packages/core, packages/extras]**

1. run `pnpm run dev` in the repository root
2. implement the components or hooks in question in the docs or any other app. The packages are linked by source, so any change in a package source is reflected instantaneously in any dependent app or package.

**If developing an app [apps/docs]**

1. run `pnpm run dev` in the repository root
