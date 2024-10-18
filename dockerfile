FROM node:21-alpine3.20

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN npx prisma generate

EXPOSE 3001