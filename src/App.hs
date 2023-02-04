module App where

import Control.Monad.Trans.Reader (ReaderT (runReaderT))
import Domain.Users
import Control.Monad.Reader

data Env = Env
  { envPort :: Int }

newtype App a =
  App { unApp :: ReaderT Env IO a }
  deriving (Functor, Applicative, Monad)

runApp :: App a -> Env -> IO a
runApp = runReaderT . unApp

-- Links ----------------------------------------------------------------------

instance ReadUser App where
  getUser _ = App $ return Nothing
