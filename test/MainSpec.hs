module MainSpec (spec) where

import Test.Hspec

spec :: Spec
spec = do
  describe "Main" $ do
    it "Just run" $ do
      True `shouldBe` True
