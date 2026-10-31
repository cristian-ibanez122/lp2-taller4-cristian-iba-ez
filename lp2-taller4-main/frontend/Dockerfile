
FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --no-frozen-lockfile

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_USE_SAMPLE_DATA=false

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"] 
