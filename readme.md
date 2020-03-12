# Authentication service

This service will be responsible for authentication dos usuários da aplicação.

# Routes

## /api/auth/store

This is responsible to store users on database. On this example, i'm using Mongodb as user's login
database.

```json
{
    "user_email": "<your email here>",
    "user_password": "<your password here>"
}
```

## /api/auth/login

This route is responsible for authentication. This returns a JSON webtoken as response.
