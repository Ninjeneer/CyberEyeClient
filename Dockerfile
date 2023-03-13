FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json yarn.lock ./

RUN yarn

# add app
COPY . ./

# start app
CMD ["yarn", "dev"]
