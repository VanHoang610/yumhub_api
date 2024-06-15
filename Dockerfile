# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --production

# Copy tsconfig.json for TypeScript configuration
COPY tsconfig.json .

# Copy the rest of the application code
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Install production dependencies
RUN npm install --only=production

# Expose the port that NestJS is listening on
EXPOSE 3001 || 3000

# Command to run the application
CMD ["node", "dist/main"]
