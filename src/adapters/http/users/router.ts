import express from "express";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";
import { RegisterUserUseCase } from "../../../useCases/RegisterUserUseCase";
import * as codec from "./codec";
import { sendResponse, sendResponseFromOpt } from "../utils";
import { FindUserUseCase } from "../../../useCases/FindUserUseCase";

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

const getUserHandler =
  (findUserUseCase: FindUserUseCase): express.Handler =>
  (req, res) =>
    pipe(
      // parse userId
      codec.APIUserId.decode(req.params.userId),
      // execute the use case
      E.map(findUserUseCase),
      // make response
      sendResponse(res)(
        (error) => res.status(500).send({ error: error.message }),
        sendResponseFromOpt(res)((user) => res.status(200).send(codec.makeAPIUser(user)))
      )
    )

export const makeRouter = (
  registerUserUseCase: RegisterUserUseCase,
  findUserUseCase: FindUserUseCase
): express.Router => {
  const router = express.Router();

  router.use(express.json())

  router.get("/users/:userId", getUserHandler(findUserUseCase))
  router.post("/users", postUsersHandler(registerUserUseCase));

  return router
}
