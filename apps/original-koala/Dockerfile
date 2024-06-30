FROM node:16-alpine

WORKDIR /var/app

COPY package.json .
COPY yarn.lock .

COPY . ./

RUN yarn install
RUN yarn build

ENTRYPOINT [ "yarn", "start" ]