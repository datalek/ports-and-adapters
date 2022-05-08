
export type UserId =
  string & { _tag: "UserId" }

export interface User
  { id: UserId
  , firstName: string
  , lastName: string
  , age: number }

export type UserDefinition =
  Omit<User, "id">;
