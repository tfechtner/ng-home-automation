# Stage 1 - Build
FROM node:10.17.0-alpine as node
RUN apk add --no-cache git
RUN git clone -b develop https://${GITHUB_OAUTH}:x-oauth-basic@github.com/tfechtner/ng-home-automation.git /usr/src/app
WORKDIR /usr/src/app/frontend
RUN npm install
RUN npm run build

# Stage 2 - Host
FROM nginx:alpine as nginx
EXPOSE 8080 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
COPY --from=node /usr/src/app/frontend/dist/ng-home-automation /usr/share/nginx/html
#COPY /nginx/nginx.conf /etc/nginx/conf.d
WORKDIR /usr/share/nginx/html
