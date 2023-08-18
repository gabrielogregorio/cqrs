FROM node:16-alpine

WORKDIR /usr/src/app

RUN apk update && apk add bash
RUN apk add make
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip

COPY package*.json yarn.lock ./

RUN yarn

EXPOSE 3000

CMD ["yarn", "d"]
