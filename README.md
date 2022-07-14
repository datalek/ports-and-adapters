# Ports and Adapters

Simple example of ports and adapters structure.

Start the server with:

``` sh
make start
```

You can create user with the following command:

``` sh
curl --request POST 'http://localhost:8080/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "FN",
    "lastName": "LN",
    "age": 50
}'
```

You can retrieve a user with the following command:

``` sh
curl --request GET 'http://localhost:8080/users/:id'
```

