interface UserIdBrand {
  readonly UserId: unique symbol;
}

export type UserId =
  string & { _tag: UserIdBrand }

export type User =
  { id: UserId
  , firstName: string
  , lastName: string
  , age: number }

export type UserDefinition =
  Omit<User, "id">;
