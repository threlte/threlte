# Contributing to Threlte

The Threlte project is open to different kinds of support:

1. **Sharing**: tell people about us, whether on social media or during a casual chat.
2. **Support**: have you learned enough about Threlte to answer questions? Help people out on our [Discord support forum](https://discord.com/channels/985983540804091964/1031843197963477002).
3. **Docs PRs**: Spelling mistake? Wording off? We'd love the help. Check out [how to contribute PRs](#how-to-contribute-prs).
4. **Code PRs**: get started by reading about [how to contribute PRs](#how-to-contribute-prs).
5. **Sponsorship**: every penny counts, since we have neglegible funding; see our [GitHub sponsor page](https://github.com/sponsors/grischaerbe).

# How to contribute PRs

## Setup

If you don't already have these, install [git](https://git-scm.com/), [node](https://nodejs.org/) and [pnpm](https://pnpm.io/); then:

1. **Clone** the repo with `git clone git@github.com:threlte/threlte.git`
2. **Install** the packages by running `pnpm install:all` in the root of the repo
3. **Develop** by going to `/apps/docs` and running `pnpm run dev`

Some editor tooling:

1. **Editor Configuration**: install the [`editorconfig`](https://editorconfig.org/) extension for your editor.
2. **VSCode Users**: install the recommended extensions.

## Commiting changes

Threlte uses Git for version control and [Changesets](https://github.com/changesets/changesets) for release notes. The convention is:

- Git commits are for Threlte **maintainers**
- Changesets are for Threlte **users**.

Changes to docs do not need changesets.

### Git commits

We don't have a strict commit message policy. Here are some best practices:

- **Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)** to make it easier to read your commit message.
- **Go into technical details** if necessary to allow maintainers to understand the context of the change.
- **Use present tense exclusively** to describe the changes in the commit.

## More about contributions

### Proposing something new

If it's something changing the `core` or a new package, the team will need to discuss and think about it; otherwise, generally contributions are welcome.

If you'd like some early feedback on something there's posting in our [Discord proposals forum](https://discord.com/channels/985983540804091964/1098301342239432784), writing up [a new GitHub issue](https://github.com/threlte/threlte/issues/new/choose) or more casually the [Discord contribution chat](https://discord.com/channels/985983540804091964/986233334747254854).

_Note:_ we practice **docs-driven development**: building the docs page for a feature while developing it. This allows us to test functionality through examples and feel out the API: if its hard to explain well, there's probably something not quite right.

### Searching our backlog

We maintain our backlog in GitHub issues for transparency. You can easily find issues where PRs are welcome using the [contribute label](https://github.com/threlte/threlte/issues?q=is%3Aissue+is%3Aopen+label%3Acontribute). You can also use the [easy label](https://github.com/threlte/threlte/issues?q=is%3Aissue+is%3Aopen+label%3Acontribute+label%3Aeasy) to find a good first contribution.

Wanting a specific type of issue? Checkout our other [label descriptions](https://github.com/threlte/threlte/labels).

### Using Changesets

[Changesets](https://github.com/changesets/changesets) is a tool that helps us keep a changelog for all the packages in the monorepo and aggregate them into release notes.

To add a changeset:

1. **Run the command** `npx changeset` in your terminal
2. **Select packages** affected by your change; we have a dedicated package for the docs.
3. **Classify the change** as major, minor, or patch for each selected package.
4. **Write the changelog** as detailing WHAT the change is, WHY it was made, and HOW it affects the users.
5. **Commit the changeset file** to your Git branch so that it appears in your PR.

Make an effort to write the changelog well, because our users see this in the release notes. Provide enough detail to be clear, but keep things as concise as possible. If migration steps are required, detail them here.

A detailed guide on adding changesets can be [found here](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md).
