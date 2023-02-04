module Main where

import App
import UseCases.FindUserById
import Domain.Users

main :: IO ()
main = do
  let env = Env { envPort = 8080 }
  let program = findUserById (UserId "uid")
  _ <- runApp program env
  putStrLn "hello world"
