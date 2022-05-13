import * as http from "http";
import express from "express";
import { RegisterUserUseCase } from "../../useCases/RegisterUserUseCase";
import * as users from "./users/router";
import { Config } from "../../config";

export const makeApplication = (
  registerUserUseCase: RegisterUserUseCase
): express.Application => {
  const application = express()

  application.use(express.json())

  // mount user router
  application.use(users.makeRouter(registerUserUseCase))

  return application;
}

export const startApplication = (config: Config, application: express.Application) => {
  const server = http.createServer(application);
  const [hostname, port] = [config.server.hostname, config.server.port]
  server.listen(port, hostname, () => {
    console.info(`Server is listening on port ${port}`);
  });

}
