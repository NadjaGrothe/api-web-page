# Api Web Page

### Table of Contents

- [Introduction](#introduction)
- [Built with](#built-with)
- [Prerequisites](#prerequisites)
- [Running the project](#running-the-project)
- [Deployment](#deployment)
- [Known Issues](#known-issues)
- [Improvements](#improvements)

## Introduction

This is a simple web page that consumes the [Edamam API](https://developer.edamam.com/edamam-docs-recipe-api) to search for recipes.

### Built with

The project has been generated with the vite react typescript template. More information can be found [here](https://vitejs.dev/guide/).

It is using `yarn` as package manager and is running on the `v18.17.1` node version managed via `nvm`.

Components are using the `Ant Design` library. More information can be found [here](https://ant.design/).

### Prerequisites

Assure nvm (node version manager) is installed locally. Steps how to do so can be found [here](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).

Assure yarn is installed locally. Steps how to do so can be found [here](https://classic.yarnpkg.com/en/docs/install#mac-stable).

Sign up to the [`Recipe Search API` by Edamam](https://developer.edamam.com/edamam-recipe-api) as a developer and create a new application in the [developer dashboard](https://developer.edamam.com/admin/applications).

### Running the project

Make a copy of the `.env.sample` file and rename it to `.env`. Add your Edamam Application ID and Applications key to the corresponding variables.

Assure `nvm` is set-up locally and run

```
nvm use
```

Install dependencies

```
yarn
```

Run the project locally

```
yarn dev
```

### Deployment

### Known Issues

### Improvements
