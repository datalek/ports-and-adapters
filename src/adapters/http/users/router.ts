import express from "express";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";
import { RegisterUserUseCase } from "../../../useCases/RegisterUserUseCase";
import * as codec from "./codec";
import { sendResponse } from "../utils";

const postUsersHandler =
  (registerUserUseCase: RegisterUserUseCase): express.Handler =>
  (req, res) => {
    pipe(
      // parse body
      codec.APIUserDefinition.decode(req.body),
      // execute the use case
      E.map(registerUserUseCase),
      // make response
      sendResponse(res)(
        (error) => res.status(500).send({ error: error.message }),
        (user) => res.status(200).send(codec.makeAPIUser(user))
      )
    )
  };

export const makeRouter = (
  registerUserUseCase: RegisterUserUseCase
): express.Router => {
  const router = express.Router();

  router.use(express.json())

  router.post("/users", postUsersHandler(registerUserUseCase));

  return router
}
