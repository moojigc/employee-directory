FROM node:16

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN ./build.sh

ENV NODE_ENV production

CMD ["npm", "start"]
