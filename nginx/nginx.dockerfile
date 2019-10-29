FROM nginx:alpine as nginx
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
COPY --from=node /usr/src/app/frontend/dist/ng-home-automation /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN ls
