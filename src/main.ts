import * as crypto from "crypto";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { RegisterUserUseCase } from "./useCases/RegisterUserUseCase"
import { FindUserUseCase } from "./useCases/FindUserUseCase";
import * as inmemory from "./adapters/inMemory/UserRepository";
import * as http from "./adapters/http/application";
import { parseConfig } from "./config";

pipe(
  parseConfig(process.env),
  E.map((config) => {
    const userRepository = inmemory.makeUserRepository(crypto.randomUUID, [])
    const registerUserUseCase = RegisterUserUseCase(userRepository)
    const findUserUseCase = FindUserUseCase(userRepository)

    const application = http.makeApplication(registerUserUseCase, findUserUseCase)
    http.startApplication(config, application)
  }),
  E.fold(
    (error) =>
      console.log(error),
    (_) =>
      _
  )
)
