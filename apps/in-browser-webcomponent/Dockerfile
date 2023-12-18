FROM node:21-alpine3.17

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY . .

RUN yarn install

RUN mkdir -p ./dist
RUN yarn build

ENTRYPOINT [ "yarn", "serve" ]