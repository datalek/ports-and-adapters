import express from "express";
import * as t from "io-ts";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { makeInvalidInput } from "../../domain/DomainError";

export const sendResponse =
  (res: express.Response) =>
  <T0, T1>(left: (t0: T0) => express.Response, right: (t1: T1) => express.Response) =>
  (arg: E.Either<t.Errors, TE.TaskEither<T0, T1>>): Promise<express.Response> => {
    return pipe(
      E.mapLeft(makeInvalidInput("Input Error"))(arg),
      E.fold(
        (invalidInput) => {
          const { message, details } = invalidInput
          return Promise.resolve(res.status(400).send({ error: message, details: details }))
        },
        (te) =>
          pipe(
            te,
            TE.fold(
              (l) => TE.of(left(l)),
              (r) => TE.of(right(r))
            ),
            TE.toUnion,
            (te) => te(),
          )
      ),
    )
}

export const sendResponseFromOpt =
  (res: express.Response) =>
  <T>(fn: (t: T) => express.Response) =>
  (opt: O.Option<T>): express.Response => {
    return pipe(
      opt,
        O.fold(
        () =>
            res.status(404).send({ error: "Entity Not Found" }),
        (t) => fn(t)
        )
    )
  }
