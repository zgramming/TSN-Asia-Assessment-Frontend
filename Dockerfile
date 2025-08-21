# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Build Next.js app
RUN npm run build 

# Expose port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]
