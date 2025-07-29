<img src="https://ljsp-docs.vercel.app/img/logo.svg" width="200" height="200"/>

# LJSP JS

[![version][version-badge]][changelog]

[changelog]: CHANGELOG.md
[version-badge]: https://img.shields.io/badge/version-2.0.0-blue.svg

# LJSP: Embrace the Lisp in JavaScript!
Whether you agree that JavaScript is a Lisp or not, you can still harness the Lisp-inspired power of LJSP in your app. LJSP derives most of its functions from Clojure libraries. Clojurians will notice the extent to which we treated the Clojure docs not only as our requirements' specification, but as a great place to copy and paste text for our docs! For this, we offer heart-felt, tremendous thanks to the Clojure community.

For information on how to use LJSP, please visit our official documentation site:
[LJSP](https://ljsp-docs.vercel.app/)

## Getting Started

This project uses [pnpm](https://pnpm.io/) as the package manager. If you don't have pnpm installed, you can install it by following the instructions on the [pnpm website](https://pnpm.io/installation).

### Installation

#### From NPM Registry

While there is a version of ljsp-core on npm, I don't really publish there anymore. If you want to use ljsp-core, I recommend installing it from GitHub.

PNPM `pnpm add ljsp-core` (recommended)

NPM `npm i ljsp-core`

YARN `yarn add ljsp-core`

#### From GitHub

You can install the latest version directly from GitHub:

PNPM:
```bash
# Using github: prefix (recommended)
pnpm add github:joe-crick/ljsp-core

# Using git+https URL
pnpm add git+https://github.com/joe-crick/ljsp-core.git
```

NPM:
```bash
# Using github: prefix
npm install github:joe-crick/ljsp-core

# Using git+https URL
npm install git+https://github.com/joe-crick/ljsp-core.git
```

YARN:
```bash
# Using github: prefix
yarn add github:joe-crick/ljsp-core

# Using git+https URL
yarn add git+https://github.com/joe-crick/ljsp-core.git
```

You can also install a specific branch, commit, or tag:

```bash
# Install from a specific branch
npm install github:joe-crick/ljsp-core#branch-name

# Install from a specific commit
npm install github:joe-crick/ljsp-core#commit-hash

# Install from a specific tag
npm install github:joe-crick/ljsp-core#v2.0.0
```

### Development

If you're contributing to this project, use these commands:

- Install dependencies: `pnpm install`
- Build the project: `pnpm run build`
- Run tests: `pnpm run test:once`
- Lint code: `pnpm run lint`
- Format code: `pnpm run prettify:all`

### USAGE

```javascript
import { log, condp, str, mult, count, instance$ } from 'ljsp-core';

log("Enter a number: ")
(function(line) {
    log(
     condp(eq, value,
       1, "one",
       2, "two",
       3, "three",
       str('unexpected value, "', value, '"')))
    log(
     condp(instance$, value,
       Number, () => mult(value, 2),
       String, () => mult(count(value), 2)))
})(Number(readLine()))
```

### Submission Guidelines

See the [CONTRIBUTING.md](CONTRIBUTING.md)

[semantic-versioning]: https://semver.org/spec/v2.0.0.html
[conventional-commits]: https://www.conventionalcommits.org/en/v1.0.0/
