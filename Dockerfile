FROM node:slim AS base

# Setup env variabless for yarn
ENV NODE_ENV=production YARN_VERSION=4.2.2

# install and use yarn 4.x
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

RUN mkdir /bot
WORKDIR /bot
COPY . /bot

RUN yarn install && yarn cache clean

CMD ["yarn", "start"]
