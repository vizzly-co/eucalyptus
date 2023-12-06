FROM node:21-alpine3.17

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY ./src ./src
COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json

RUN yarn install
RUN yarn build

ENTRYPOINT [ "yarn", "start" ]