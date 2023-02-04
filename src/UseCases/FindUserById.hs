module UseCases.FindUserById where

import Domain.Users

findUserById
  :: ReadUser m
  => UserId
  -> m (Maybe User)
findUserById usrId = do
  maybeUsr <- getUser usrId
  return maybeUsr
