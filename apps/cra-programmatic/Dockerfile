FROM node:21-alpine3.17

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json
COPY ./src ./src
COPY ./public ./public

RUN yarn install
RUN yarn build

ENTRYPOINT [ "yarn", "serve" ]