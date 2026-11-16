# Production Dockerfile for Kaushal Setu (SIH 2026)
FROM node:20-alpine AS base

WORKDIR /app
COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "start"]
