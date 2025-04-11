# Musical Juggling Websites

Template and examples of websites using the [MusicalJuggling library](https://github.com/kunchtler/mj-lib).

Such examples are contained within branches of this repo.

## Install dependencies.

It is assumed you have pnpm installed on your machine. See the [installation page](https://pnpm.io/installation) in their documentation. The rest of the installation should also work with npm, although pnpm version locking isn't accessible to npm.

If using a too old node version (may happen on a Linux distro like Ubuntu), an error message will appear. A newer node version can be installed with :

```sh
pnpm env use --global lts
```

Fork this repository, and then use :

```sh
pnpm install
```

In addition to that, you need to build and link the [MusicalJuggling library](https://github.com/kunchtler/mj-lib) by hand.

### Starting and building the project

Command shortcuts (specified in `package.json`) are available to start the project locally :

```sh
pnpm dev
```

and to build the project :

```sh
pnpm build
```

### Note to VSCode users :

-   It is strongly advised to install the ESLint and Prettier extensions.
-   We use the so-called flat layout to configure ESLint's rules, which are not active by default in VSCode's ESLint extension. The `eslint.experimental.useFlatConfig` flag should be set to true.
-   We strongly advise to enable the `editor.formatOnSave` flag to automatically format a document on save.

