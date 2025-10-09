# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install --production=false || true
COPY tsconfig.json ./
COPY src ./src
COPY sidecar.config.yaml ./
COPY policies ./policies
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/sidecar.config.yaml ./
COPY --from=base /app/policies ./policies
EXPOSE 8080
CMD ["node", "dist/index.js"]
