import express from "express";
import { flow, pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { makeDomainError } from "../../../domain/DomainError";
import { RegisterUserUseCase } from "../../../useCases/RegisterUserUseCase";
import * as codec from "./codec";

const postUsersHandler =
  (registerUserUseCase: RegisterUserUseCase): express.Handler =>
  (req, res) => {
    pipe(
      // parse body
      TE.fromEither(pipe(codec.APIUserDefinition.decode(req.body), E.mapLeft(makeDomainError))),
      // execute the use case
      TE.chain(flow(registerUserUseCase)),
      TE.bimap(
        (_) => {
          switch (_.kind) {
            case "InvalidInput":
              return res.status(400).send({ error: _.message, details: _.details });
            case "GenericError":
              return res.status(500).send({ error: _.message });
          }
        },
        (user) => res.status(200).send(codec.makeAPIUser(user)),
      )
    )()
  };

export const makeRouter = (
  registerUserUseCase: RegisterUserUseCase
): express.Router => {
  const router = express.Router();

  router.use(express.json())

  router.post("/users", postUsersHandler(registerUserUseCase));

  return router
}
