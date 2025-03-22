## Description

Simple Wallet API

## Project setup
Make sure you're running NodeJS version 20.11 or higher

```bash
$ npm ci
```

## Compile and run the project

First, copy .env.example file to .env to configure database name and JWT Secret.

```bash
# development
$ npm run start

```

## Test The API
Once the project is up and running do the following steps to use the API
Refere to the API documentation at http://localhost:3000/docs for the following steps.

- Register a new account using `/api/v1/auth/signup` endpoint.
- Login to get a new access token using `/api/v1/auth/login` endpoint.
- Create a new wallet with the desired currency. POST `/api/v1/wallet`
- Use the endpoint GET `/api/v1/wallet` to list all your wallets.
- Topup wallet balance using the endpoint POST `/api/v1/wallet/topup`
- Charge the wallet using the endpoint POST `/api/v1/wallet/charge`
