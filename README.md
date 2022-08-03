# TSNODE Sample API
This is a project that was written after [this post](https://tomanagle.medium.com/build-a-rest-api-with-node-js-typescript-mongodb-b6c898d70d61).


## Configs
The sampe.env is a .env file template to be configured individually after cloning.
It is to be noted that this file is only used by the api itself and not the docker files.

### RSA
The RSA keys are recommended to be written into their respective private.key / public.key files.
I have generated them for test purposes on [this page](https://travistidwell.com/jsencrypt/demo/)

### MongoDB
If you want to test it locally you can just spin up a mongodb instance of which the config is contained in the `docker-compose.yaml` with the command `docker compose up -d`.
