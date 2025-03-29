FROM node:alpine AS base

# Setup env variabless for yarn
ENV NODE_ENV=production YARN_VERSION=4.6.0

RUN mkdir /bot
WORKDIR /bot
COPY . /bot

CMD ["npm", "run", "start"]
