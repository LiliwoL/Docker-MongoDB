FROM node:latest

WORKDIR /app

COPY ./node_app/package.json ./

RUN npm install

RUN chown -Rh node:node ./

USER node

EXPOSE 666

CMD [ "sh", "-c", "npm install && npm run start" ]

#FOR PROD
# CMD [ "sh", "-c", "npm install && npm run build" ]