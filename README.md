# Ports and Adapters

This project is a sample implementation demonstrating the Ports and Adapters (Hexagonal) architectural pattern in TypeScript.

It includes a fake user registration feature.

## Requirements

This project requires the following tools to works as expected. Make sure to install all the following dependencies using the recommended installation methods.

- **Deno**
  Follow the [installation](https://docs.deno.com/runtime/getting_started/installation/) page of deno website.

## Tasks

Tasks are defined in the `package.json` file. To execute a task, just run the command at the project root:

```sh
npm run <cmd>

# example
npm run dev
```

## Run the application

Follow these steps to get the app up and running locally:

1. **Install dependencies**
  Install all required packages using:

  ``` sh
  npm i
  ```

2. **Set Up Environment Variables**
  The environment configuration is defined in [config.ts](./src/config.ts) and loaded from a local `.env` file. To create your `.env` file, use the provided example:

  ``` sh
  cp .env.example .env
  ```

  Then update the values as needed for your local setup.

3. **Start the Development Server**
  Launch the application in development mode with:

  ``` sh
  npm run dev
  ```
