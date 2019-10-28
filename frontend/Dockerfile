FROM node:10.17.0-alpine as node

RUN apk add --no-cache git

RUN git clone -b develop https://b559407178c9ebcfcd96db20c658fa9c279f274f:x-oauth-basic@github.com/tfechtner/ng-home-automation.git /usr/src/app

WORKDIR /usr/src/app/frontend

RUN npm install
RUN npm run build

RUN cp -R /usr/src/app/frontend/dist/* /usr/share/nginx/html

