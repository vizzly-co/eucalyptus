FROM node:21-alpine3.17

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY ./www ./www
COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json
COPY ./app.tsx ./app.tsx

RUN yarn install
RUN yarn build

ENTRYPOINT [ "yarn", "serve" ]