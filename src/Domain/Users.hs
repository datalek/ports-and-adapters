module Domain.Users where

newtype UserId =
  UserId String
  deriving (Show, Eq)

data User = User
  { userId :: UserId
  , userFirstName :: String
  , userLastName :: String
  , userAge :: Int }
  deriving (Show, Eq)

data UserDefinition = UserDefinition
  { userDefinitionFirstName :: String
  , userDefinitionLastName :: String
  , userDefinitionAge :: Int }
  deriving (Show, Eq)

-------------------------------------------------------------------------------
-- Ports ----------------------------------------------------------------------
-------------------------------------------------------------------------------

-- | A way to retrieve users
class (Monad m) => ReadUser m where
  getUser :: UserId -> m (Maybe User)

-- | A way to write users
class (Monad m) => WriteUser m where
  insertUser :: UserDefinition -> m User
