# Simple container for the vulnerable Azure shim
# Builds a small image that serves POST /query on port 9001

FROM node:20-alpine

WORKDIR /app

# Copy minimal files needed to run the server
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY azure-server-vulnerable.js ./

# Health endpoint and service port
EXPOSE 9001

ENV NODE_ENV=production

CMD ["node", "azure-server-vulnerable.js"]


