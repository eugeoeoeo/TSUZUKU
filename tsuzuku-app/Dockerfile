# ============================================================
# TSUZUKU — Production Dockerfile for Northflank
# Multi-stage build: Node.js 22 builder + Nginx Alpine runner
# ============================================================

# Stage 1: Build the Vite Single Page Application
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies with caching
COPY package*.json ./
RUN npm ci

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Serve with lightweight Nginx Alpine
FROM nginx:alpine

# Copy custom Nginx SPA configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
