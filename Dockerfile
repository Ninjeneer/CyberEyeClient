# stage1 - build react app first 
FROM node:alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
RUN yarn
COPY . /app
CMD ["yarn", "dev"]
