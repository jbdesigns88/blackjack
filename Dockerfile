FROM node:18-alpine

RUN apk add --update --no-cache python3 make g++ && ln -sf python3 /usr/bin/python

WORKDIR /usr/src/app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY public ./public
COPY src ./src

EXPOSE 3000

CMD ["npm","run","start"]
