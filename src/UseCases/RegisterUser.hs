module UseCases.RegisterUser where

import Domain.Users

registerUser
  :: WriteUser m
  => UserDefinition
  -> m User
registerUser userDefinition = do
  user <- insertUser userDefinition
  return user
