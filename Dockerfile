FROM node:alpine

WORKDIR  /home/node/

COPY package.json .

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install

COPY src src/

USER node

EXPOSE 8080

CMD  [ "npm", "start" ]
