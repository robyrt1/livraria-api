FROM node:18.12.1 AS installer
WORKDIR /app
COPY . .
RUN rm -rf node_modules
RUN npm install

FROM node:18-alpine
WORKDIR /app
COPY --from=installer /app ./
CMD ["npm", "run", "dev"]