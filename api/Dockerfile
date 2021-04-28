# Pull base image from stock node image.
FROM node:12.20.0-alpine

# Maintainer
# MAINTAINER Post Planner Dev Team <developers@postplanner.com>

# Create app directory
WORKDIR /app

RUN apk add --update python make g++\
   && rm -rf /var/cache/apk/*

# Set NODE_ENV
ARG NODE_ENV=$NODE_ENV
# RUN echo "Build for environment: ${NODE_ENV}"

# Set NPM_TOKEN
ARG NPM_TOKEN=$NPM_TOKEN

# Install app dependencies
COPY package.json yarn.lock .npmrc ./

# Install packages
RUN yarn install

# Bundle app source
COPY . .
# COPY dist ./

# Build the app
# RUN yarn build

# Remove node_modules to make the container smaller
# RUN rm -rf node_modules

# Expose the node.js port to the Docker host.
EXPOSE 8080

# Start the app
# CMD [ "sh", "-c", "NODE_ENV=${NODE_ENV} yarn start" ]
CMD [ "sh", "-c", "DEBUG=*:error* NODE_ENV=${NODE_ENV} node --no-lazy output/boot.js" ]
