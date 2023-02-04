module Adapters.Memory where

import Prelude
import App
import Domain.Users

instance ReadUser App where
  getUser _ = App $ return Nothing
