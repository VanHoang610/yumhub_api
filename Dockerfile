# Stage 1: Build the application
FROM node:14 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production
RUN npm install @nestjs/cli -g

COPY --from=build /app/dist ./dist

EXPOSE 3001
CMD ["npm", "start"]
