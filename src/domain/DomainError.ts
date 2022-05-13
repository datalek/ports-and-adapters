import { Errors } from "io-ts";
import * as PR from 'io-ts/PathReporter'

type BaseError = {
  message: string,
  causedBy: Error | undefined,
}

export type NotFoundError =
  BaseError & { kind: "NotFound" }

export type NotImplemented =
  BaseError & { kind: "NotImplemented" }
export const makeNotImplemented =
  (): NotImplemented => ({
    message: "Not yet implemented :D",
    causedBy: undefined,
    kind: "NotImplemented"
  })

export type GenericError =
  BaseError & { kind: "GenericError" }

export type InvalidInput =
  BaseError & {
    kind: "InvalidInput",
    details: ReadonlyArray<string>
  }
export const makeInvalidInput =
  (message: string): InvalidInput => ({
    message,
    details: [],
    causedBy: undefined,
    kind: "InvalidInput"
  })

export type DomainError =
  | NotFoundError
  | NotImplemented
  | InvalidInput
  | GenericError

/**
 * Create a DomainError given an Errors
 */
export const makeDomainError = (errors: Errors): DomainError => {
  const errorMsg = PR.failure(errors)
  return {
    details: errorMsg,
    message: "Invalid Format",
    causedBy: undefined,
    kind: "InvalidInput"
  }
}
