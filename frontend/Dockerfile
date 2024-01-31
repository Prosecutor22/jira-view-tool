# First stage: Build react optimize folder
FROM node:lts AS build

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci

COPY . /app
ENV CI=false

RUN npm run build

# Second stage: Run React served by nginx as Production 
FROM nginx:alpine

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/build .

CMD ["nginx", "-g", "daemon off;"]