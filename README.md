# Ports and Adapters

This project is a sample implementation demonstrating the Ports and Adapters (Hexagonal) architectural pattern in TypeScript.

It includes a fake user registration feature.

## Requirements

This project requires the following tools to works as expected. Make sure to install all the following dependencies using the recommended installation methods.

- **Node.js**
  Use [nodenv](https://github.com/nodenv/nodenv) to install the required version of `Node.js`.

  ```sh
  nodenv install $(node -p "require('./package.json').engines.node")
  # check that the installed version is correct
  node --version
  ```

- **npm**
  When you install `Node.js`, `npm` (Node Package Manager) is included by default — you don’t need to install it separately.

## Tasks

Tasks are defined in the `package.json` file. To execute a task, just run the command at the project root:

```sh
npm run <cmd>

# example
npm run dev
```
