# syntax=docker/dockerfile:1
# check=error=true

FROM oven/bun:1.2.19-slim

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . /app

ENV NODE_ENV=production

EXPOSE 8080

CMD ["bun","run","start"]
