# syntax=docker/dockerfile:1
# check=error=true

FROM oven/bun:1.1.42-alpine

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . /app

ENV NODE_ENV=production

EXPOSE 8080

CMD ["bun","run","start"]