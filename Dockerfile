FROM node:13.10.1-alpine as build

ENV SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass

COPY . /project/

WORKDIR /project

RUN yarn config set registry https://registry.npm.taobao.org/

RUN yarn

RUN yarn run build

FROM nginx:stable-alpine

COPY --from=build /project/dist /usr/share/nginx/html/

EXPOSE 80
