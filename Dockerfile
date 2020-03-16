FROM node:13.10.1-alpine as build

ENV NODE_ENV=production

COPY . /project/

WORKDIR /project

RUN yarn config set registry https://registry.npm.taobao.org/

RUN yarn

RUN yarn run build

FROM nginx:stable-alpine

COPY --from=build /project/dist /usr/share/nginx/html/

EXPOSE 80
