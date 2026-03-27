FROM node:20-alpine AS base
WORKDIR /app

COPY .npmrc ./
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY shared/api-client-react/package.json ./shared/api-client-react/
COPY shared/api-zod/package.json ./shared/api-zod/
COPY shared/api-spec/package.json ./shared/api-spec/
COPY shared/db/package.json ./shared/db/

RUN npm install --ignore-scripts

COPY backend/ ./backend/
COPY shared/ ./shared/

RUN npm run build --workspace=@workspace/api-server

FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY .npmrc ./
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY shared/api-zod/package.json ./shared/api-zod/
COPY shared/db/package.json ./shared/db/

RUN npm install --omit=dev --ignore-scripts

COPY --from=base /app/backend/dist ./backend/dist
COPY --from=base /app/shared ./shared

EXPOSE 5000

CMD ["node", "backend/dist/index.js"]
