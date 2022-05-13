import * as t from "io-ts";
import * as E from "fp-ts/Either";
import * as PR from "io-ts/PathReporter";
import { pipe } from "fp-ts/lib/function";

export type Config = {
  server: {
    port: number,
    hostname: string,
  }
}

const EnvCodec = t.type({
  PORT: t.number,
  HOSTNAME: t.string,
})

export const parseConfig =
  (envs: Record<string, undefined | string>): E.Either<string, Config> =>
    pipe(
      EnvCodec.decode(envs),
      E.bimap(
        (errors) =>
          PR.failure(errors).join("\n"),
        (envs) => ({
          server: {
            port: envs.PORT,
            hostname: envs.HOSTNAME,
          }
        })
      )
    )
