FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
COPY server/package*.json server/

RUN npm run install --prefix client --only=production
RUN npm run install --prefix server --only=production

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 8000