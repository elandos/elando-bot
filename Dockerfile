FROM node:8-alpine

WORKDIR /app
COPY public ./public
COPY dist ./dist
COPY package.json .
RUN npm install --production

CMD ["node", "dist/bot.js"]