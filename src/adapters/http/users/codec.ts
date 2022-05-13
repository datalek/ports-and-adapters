import * as t from "io-ts";
import { User } from "../../../domain/users/types";

export const APIUserDefinition = t.strict({
  firstName: t.string,
  lastName: t.string,
  age: t.number,
});

export const APIUser =
  t.intersection([
    APIUserDefinition,
    t.strict({ id: t.string })
  ])
export type APIUser = t.TypeOf<typeof APIUser>

export const makeAPIUser = (usr: User): APIUser => ({
  id: usr.id,
  firstName: usr.firstName,
  lastName: usr.lastName,
  age: usr.age
})
