FROM node:10.15.3-alpine as build

ENV SASS_BINARY_SITE https://npm.taobao.org/mirrors/node-sass
COPY . /srv/source

WORKDIR /srv/source
RUN cd /srv/source/web && npm ci && npx umi build

FROM nginx:stable-alpine

COPY --from=build /srv/source /usr/share/nginx/html/

EXPOSE 80