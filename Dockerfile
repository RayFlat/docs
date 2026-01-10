# syntax=docker/dockerfile:1
# check=error=true

FROM oven/bun:1.3.5-slim

WORKDIR /app

COPY package.json ./

COPY bun.lock ./

RUN bun install --frozen-lockfile

COPY . /app

ENV NODE_ENV=production

EXPOSE 8080

ENTRYPOINT ["bun","run","start"]
