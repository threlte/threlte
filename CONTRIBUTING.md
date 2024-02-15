# Contributing to Threlte

The Threlte project is open to different kinds of support:

1. **Sharing**: tell people about us, whether on social media or during a casual chat.
2. **Sponsorship**: every penny counts, since we have neglegible funding; see our [GitHub sponsor page](https://github.com/sponsors/grischaerbe).
3. **Support**: have you learned enough about Threlte to answer questions? Help people out on our [Discord support forum](https://discord.com/channels/985983540804091964/1031843197963477002).
4. **Proposals**: well researched and thought out ideas are welcome in our [Proposals Forums in Discord](https://discord.com/channels/985983540804091964/1098301342239432784).
5. **Contributing PRs**: read about [how to contribute PRs](#how-to-contribute-prs) if you wanna start hacking at our code or docs.

# How to contribute PRs

## Deciding what to contribute

### Searching our backlog

We maintain our backlog in GitHub issues for transparency. You can easily find issues where PRs are welcome using the [contribute label](https://github.com/threlte/threlte/issues?q=is%3Aissue+is%3Aopen+label%3Acontribute). You can also use the [easy label](https://github.com/threlte/threlte/issues?q=is%3Aissue+is%3Aopen+label%3Acontribute+label%3Aeasy) to find a good first contribution.

Unclear about an issue label? Read our [label descriptions](https://github.com/threlte/threlte/labels).

### Proposing new ideas

If you wish to propose a totally new PR, please discuss it with the team before creating a PR. Well structured and researched ideas can be posted in our [Discord proposals forum](https://discord.com/channels/985983540804091964/1098301342239432784) or writen up as [a new GitHub issue](https://github.com/threlte/threlte/issues/new/choose). If you wanna just have a casual chat an idea, drop into our [Discord contribution chat](https://discord.com/channels/985983540804091964/986233334747254854) and fire away!

## Setting up a dev environment

Setting up the repo:

1. **Clone** the repo with `git clone git@github.com:threlte/threlte.git`
2. **Install** the packages by running `pnpm install:all` in the root of the repo
3. **Develop** by going to `/apps/docs` and running `pnpm run dev`

_Note:_ we practice **docs-driven development**: building the docs page for a feature while developing it. This allows us to test functionality through examples and feel out the API: if its hard to explain well, its probably flawed.

Some editor tooling:

1. **Editor Configuration**: install the [`editorconfig`](https://editorconfig.org/) extension for your editor.
2. **VSCode Users**: install the recommended extensions.

## Commiting changes

Threlte uses Git for version control and [Changesets](https://github.com/changesets/changesets) for release notes. You will need to understand our conventions with both to commit changes. If you get confused, remember that **Git commits are for Threlte maintainers while Changesets are for Threlte users**.

### Git commits

We don't have a strict commit message policy. Here are some best practices:

- **Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)** to make it easier to read your commit message.
- **Go into technical details** if necessary to allow maintainers to understand the context of the change.
- **Use present tense exclusively** to describe the changes in the commit.

### Changesets

[Changesets](https://github.com/changesets/changesets) is a tool that helps us keep a changelog for all the packages in the monorepo and aggregate them into release notes.

To add a changeset:

1. **Run the command** `npx changeset` in your terminal
2. **Select packages** affected by your change; we have a dedicated package for the docs.
3. **Classify the change** as major, minor, or patch for each selected package.
4. **Write the changelog** as detailing WHAT the change is, WHY it was made, and HOW it affects the users.
5. **Commit the changeset file** to your Git branch so that it appears in your PR.

Make an effort to write the changelog well, because our users see this in the release notes. Provide enough detail to be clear, but keep things as concise as possible. If migration steps are required, detail them here.

A detailed guide on adding changesets can be [found here](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md).
