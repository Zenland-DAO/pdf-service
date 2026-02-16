# ===========================================
# Zenland PDF Service Dockerfile
# Multi-stage build for smaller production image
# ===========================================

# ---- Build Stage ----
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for TypeScript)
RUN npm ci

# Copy TypeScript config and source
COPY tsconfig.json ./
COPY src/ ./src/

# Build TypeScript
RUN npm run build

# ---- Production Stage ----
FROM node:20-slim

# Install Chromium dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Set Puppeteer to use system Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Create app directory
WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy public folder for landing page
COPY src/public/ ./dist/public/

# Set environment
ENV NODE_ENV=production
ENV PORT=3002

# Expose port
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD node -e "fetch('http://localhost:3002/health').then(r => r.json()).then(d => process.exit(d.status === 'healthy' ? 0 : 1)).catch(() => process.exit(1))"

# Run the service
CMD ["node", "dist/index.js"]
